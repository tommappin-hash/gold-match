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

/** Set session cookie via the response headers.
 *  NOTE: Our cookies are set client-side via document.cookie (RPC architecture),
 *  so HttpOnly MUST NOT be present — HttpOnly cookies cannot be set by JavaScript. */
function setSessionCookie(accountId: string, token: string) {
  return {
    "Set-Cookie": `${SESSION_COOKIE}=${accountId}:${token}; Path=/; SameSite=Lax; Max-Age=${60 * 60 * 24 * 7}`,
  };
}

function clearSessionCookie() {
  return {
    "Set-Cookie": `${SESSION_COOKIE}=; Path=/; SameSite=Lax; Max-Age=0`,
  };
}

/** Parse session cookie from request headers */
function getSessionFromCookies(cookieHeader: string): { accountId: string; token: string } | null {
  const cookies = cookieHeader.split(";").map((c) => c.trim());
  for (const cookie of cookies) {
    const [name, ...rest] = cookie.split("=");
    if (name === SESSION_COOKIE) {
      const value = rest.join("=");
      const [accountId, token] = value.split(":");
      if (accountId && token) return { accountId, token };
    }
  }
  return null;
}

/** Lookup an account (dentist or lab) by email — returns accountId and accountType regardless of password state */
export const lookupAccountFn = createServerFn({ method: "POST" })
  .validator((data: { email: string }) => data)
  .handler(async ({ data }) => {
    const db = sql();
    // Check dentists first
    let rows = await db`SELECT id, email FROM dentists WHERE email = ${data.email}`;
    if (rows.length > 0) {
      return { found: true, accountId: rows[0].id.toString(), email: rows[0].email, accountType: "dentist" };
    }
    // Check labs
    rows = await db`SELECT id, email FROM labs WHERE email = ${data.email}`;
    if (rows.length > 0) {
      return { found: true, accountId: rows[0].id.toString(), email: rows[0].email, accountType: "lab" };
    }
    return { found: false, error: "Account not found." };
  });

/** @deprecated Use lookupAccountFn instead — kept for backward compatibility */
export const lookupDentistFn = lookupAccountFn;

/** Login: validate email + password, return session cookie */
export const loginFn = createServerFn({ method: "POST" })
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
        return { success: false, accountType, accountId: account.id.toString(), error: "No password set for this account. Please complete registration." };
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
      return { success: true, accountType, accountId: account.id.toString(), cookie };
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

/** Check current session — used by protected routes. Checks both dentists and labs.
 *  Uses the cookieHeader pattern for RPC compatibility:
 *  - Client callers pass { cookieHeader: document.cookie }
 *  - SSR loaders call with no args; context fallback provides the cookie. */
export const checkSessionFn = createServerFn({ method: "POST" })
  .validator((data: { cookieHeader?: string }) => data)
  .handler(async ({ data, context }: any) => {
    try {
      const cookieHeader = data.cookieHeader
        || context?.request?.headers?.get?.("cookie")
        || context?.req?.headers?.get?.("cookie")
        || "";
      const session = getSessionFromCookies(cookieHeader);
      if (!session) return { authenticated: false };

      const db = sql();

      // Check dentists first
      let rows = await db`SELECT id, email, practice_name FROM dentists WHERE id = ${session.accountId}::uuid AND session_token = ${session.token}`;
      if (rows.length > 0) {
        return {
          authenticated: true,
          accountType: "dentist",
          dentist: {
            id: rows[0].id.toString(),
            email: rows[0].email,
            practiceName: rows[0].practice_name,
          },
          account: {
            id: rows[0].id.toString(),
            email: rows[0].email,
            name: rows[0].practice_name,
            accountType: "dentist",
          },
        };
      }

      // Check labs
      rows = await db`SELECT id, email, lab_name FROM labs WHERE id = ${session.accountId}::uuid AND session_token = ${session.token}`;
      if (rows.length > 0) {
        return {
          authenticated: true,
          accountType: "lab",
          lab: {
            id: rows[0].id.toString(),
            email: rows[0].email,
            labName: rows[0].lab_name,
          },
          account: {
            id: rows[0].id.toString(),
            email: rows[0].email,
            name: rows[0].lab_name,
            accountType: "lab",
          },
        };
      }

      return { authenticated: false };
    } catch {
      return { authenticated: false };
    }
  });

/** Set password after registration (existing account, no password set yet).
 *  accountType defaults to "dentist" for backward compatibility. */
export const setPasswordFn = createServerFn({ method: "POST" })
  .validator((data: { accountId: string; password: string; accountType?: string }) => data)
  .handler(async ({ data }) => {
    try {
      const db = sql();
      const salt = generateSalt();
      const hash = hashPassword(data.password, salt);
      const token = generateSessionToken();
      const accountType = data.accountType || "dentist";

      if (accountType === "lab") {
        await db`UPDATE labs SET password_hash = ${hash}, password_salt = ${salt}, session_token = ${token} WHERE id = ${data.accountId}::uuid`;
      } else {
        await db`UPDATE dentists SET password_hash = ${hash}, password_salt = ${salt}, session_token = ${token} WHERE id = ${data.accountId}::uuid`;
      }
      const cookie = setSessionCookie(data.accountId, token);
      return { success: true, cookie };
    } catch (err: any) {
      console.error("setPasswordFn error:", err.message || err);
      if (err.message?.includes("DATABASE_URL")) {
        return { success: false, error: "Database not configured." };
      }
      return { success: false, error: err.message || "Failed to set password." };
    }
  });

/** Change password for an authenticated account (dentist or lab).
 *  Validates old password before updating. */
export const changePasswordFn = createServerFn({ method: "POST" })
  .validator((data: { accountId: string; accountType: string; oldPassword: string; newPassword: string }) => data)
  .handler(async ({ data }) => {
    try {
      const db = sql();

      // Lookup current credentials from the appropriate table
      let rows;
      if (data.accountType === "lab") {
        rows = await db`SELECT id, password_hash, password_salt FROM labs WHERE id = ${data.accountId}::uuid`;
      } else {
        rows = await db`SELECT id, password_hash, password_salt FROM dentists WHERE id = ${data.accountId}::uuid`;
      }
      if (rows.length === 0) {
        return { success: false, error: "Account not found." };
      }
      const account = rows[0];

      if (!account.password_hash || !account.password_salt) {
        return { success: false, error: "No password set for this account." };
      }

      // Verify old password
      const oldHash = hashPassword(data.oldPassword, account.password_salt);
      if (!timingSafeEqual(Buffer.from(oldHash), Buffer.from(account.password_hash))) {
        return { success: false, error: "Current password is incorrect." };
      }

      // Set new password
      const salt = generateSalt();
      const hash = hashPassword(data.newPassword, salt);
      const token = generateSessionToken();

      if (data.accountType === "lab") {
        await db`UPDATE labs SET password_hash = ${hash}, password_salt = ${salt}, session_token = ${token} WHERE id = ${data.accountId}::uuid`;
      } else {
        await db`UPDATE dentists SET password_hash = ${hash}, password_salt = ${salt}, session_token = ${token} WHERE id = ${data.accountId}::uuid`;
      }

      const cookie = setSessionCookie(data.accountId, token);
      return { success: true, cookie };
    } catch (err: any) {
      console.error("changePasswordFn error:", err.message || err);
      if (err.message?.includes("DATABASE_URL")) {
        return { success: false, error: "Database not configured." };
      }
      return { success: false, error: err.message || "Failed to change password." };
    }
  });
