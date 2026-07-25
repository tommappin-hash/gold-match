import { createServerFn } from "@tanstack/react-start";
import { createHash, randomBytes, timingSafeEqual } from "node:crypto";
import { sql } from "../db";

const SESSION_COOKIE = "gdn_session";
const SALT_ROUNDS = 16;

function hashPassword(password: string, salt: string): string {
  return createHash("sha256")
    .update(salt + password)
    .digest("hex");
}

function generateSalt(): string {
  return randomBytes(SALT_ROUNDS).toString("hex");
}

function generateSessionToken(): string {
  return randomBytes(32).toString("hex");
}

/** Set session cookie via the response headers */
function setSessionCookie(dentistId: string, token: string) {
  return {
    "Set-Cookie": `${SESSION_COOKIE}=${dentistId}:${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${60 * 60 * 24 * 7}`,
  };
}

function clearSessionCookie() {
  return {
    "Set-Cookie": `${SESSION_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`,
  };
}

/** Parse session cookie from request headers */
function getSessionFromCookies(cookieHeader: string): { dentistId: string; token: string } | null {
  const cookies = cookieHeader.split(";").map((c) => c.trim());
  for (const cookie of cookies) {
    const [name, ...rest] = cookie.split("=");
    if (name === SESSION_COOKIE) {
      const value = rest.join("=");
      const [dentistId, token] = value.split(":");
      if (dentistId && token) return { dentistId, token };
    }
  }
  return null;
}

/** Lookup dentist by email only — returns dentistId regardless of password state */
export const lookupDentistFn = createServerFn()
  .validator((data: { email: string }) => data)
  .handler(async ({ data }) => {
    const db = sql();
    const rows = await db`SELECT id, email FROM dentists WHERE email = ${data.email}`;
    if (rows.length === 0) {
      return { found: false, error: "Account not found." };
    }
    return { found: true, dentistId: rows[0].id.toString(), email: rows[0].email };
  });

/** Login: validate email + password, return session cookie */
export const loginFn = createServerFn()
  .validator((data: { email: string; password: string }) => data)
  .handler(async ({ data }) => {
    try {
      const db = sql();
      // Check dentists first
      let rows = await db`SELECT id, email, password_hash, password_salt, session_token, practice_name FROM dentists WHERE email = ${data.email}`;
      let accountType = "dentist";
      if (rows.length === 0) {
        // Check labs
        rows = await db`SELECT id, email, password_hash, password_salt, session_token, lab_name FROM labs WHERE email = ${data.email}`;
        accountType = "lab";
      }
      if (rows.length === 0) {
        return { success: false, error: "Invalid email or password." };
      }
      const account = rows[0];
      if (!account.password_hash || !account.password_salt) {
        return { success: false, accountType, dentistId: account.id.toString(), error: "No password set for this account. Please complete registration." };
      }
      const hash = hashPassword(data.password, account.password_salt);
      if (!timingSafeEqual(Buffer.from(hash), Buffer.from(account.password_hash))) {
        return { success: false, error: "Invalid email or password." };
      }
      const newToken = generateSessionToken();
      if (accountType === "dentist") {
        await db`UPDATE dentists SET session_token = ${newToken} WHERE id = ${account.id}`;
      } else {
        await db`UPDATE labs SET session_token = ${newToken} WHERE id = ${account.id}`;
      }
      const cookie = setSessionCookie(account.id.toString(), newToken);
      return { success: true, accountType, dentistId: account.id.toString(), cookie };
    } catch (err: any) {
      if (err.message?.includes("DATABASE_URL")) return { success: false, error: "Database not configured." };
      return { success: false, error: "Login failed." };
    }
  });

/** Logout: clear session */
export const logoutFn = createServerFn().handler(async () => {
  const cookie = clearSessionCookie();
  return { success: true, cookie };
});

/** Check current session — used by protected routes */
export const checkSessionFn = createServerFn().handler(async ({ context }: any) => {
  try {
    const cookieHeader = context?.req?.headers?.get?.("cookie") || "";
    const session = getSessionFromCookies(cookieHeader);
    if (!session) return { authenticated: false };

    const db = sql();
    const rows = await db`SELECT id, email, practice_name FROM dentists WHERE id = ${session.dentistId}::uuid AND session_token = ${session.token}`;
    if (rows.length === 0) return { authenticated: false };

    return {
      authenticated: true,
      dentist: {
        id: rows[0].id.toString(),
        email: rows[0].email,
        practiceName: rows[0].practice_name,
      },
    };
  } catch {
    return { authenticated: false };
  }
});

/** Set password after registration (existing dentist, no password set yet) */
export const setPasswordFn = createServerFn()
  .validator((data: { dentistId: string; password: string }) => data)
  .handler(async ({ data }) => {
    try {
      const db = sql();
      const salt = generateSalt();
      const hash = hashPassword(data.password, salt);
      const token = generateSessionToken();
      await db`UPDATE dentists SET password_hash = ${hash}, password_salt = ${salt}, session_token = ${token} WHERE id = ${data.dentistId}::uuid`;
      const cookie = setSessionCookie(data.dentistId, token);
      return { success: true, cookie };
    } catch (err: any) {
      console.error("setPasswordFn error:", err.message || err);
      if (err.message?.includes("DATABASE_URL")) {
        return { success: false, error: "Database not configured." };
      }
      return { success: false, error: err.message || "Failed to set password." };
    }
  });
