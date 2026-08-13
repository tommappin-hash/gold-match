import { createServerFn } from "@tanstack/react-start";
import { sql } from "../../db";
import { createHash, randomBytes, timingSafeEqual } from "node:crypto";

const SESSION_COOKIE = "gdn_session";

function hashPassword(password: string, salt: string): string {
  return createHash("sha256").update(salt + password).digest("hex");
}

function generateSessionToken(): string {
  return randomBytes(32).toString("hex");
}

export const handleLogin = createServerFn({ method: "POST" })
  .validator((data: { email: string; password: string }) => data)
  .handler(async ({ data }) => {
    try {
      const db = sql();
      let rows = await db`SELECT id, email, password_hash, password_salt FROM dentists WHERE email = ${data.email}`;
      let accountType: "dentist" | "lab" = "dentist";

      if (rows.length === 0) {
        rows = await db`SELECT id, email, password_hash, password_salt FROM labs WHERE email = ${data.email}`;
        accountType = "lab";
      }

      if (rows.length === 0) {
        return { success: false, error: "Invalid email or password." };
      }

      const account = rows[0];
      if (!account.password_hash || !account.password_salt) {
        return {
          success: false,
          noPassword: true,
          dentistId: String(account.id),
          accountType,
          email: account.email,
          error: "No password set for this account. Please complete registration.",
        };
      }

      const hash = hashPassword(data.password, account.password_salt);
      if (!timingSafeEqual(Buffer.from(hash), Buffer.from(account.password_hash))) {
        return { success: false, error: "Invalid email or password." };
      }

      const token = generateSessionToken();
      if (accountType === "dentist") {
        await db`UPDATE dentists SET session_token = ${token} WHERE id = ${account.id}`;
      } else {
        await db`UPDATE labs SET session_token = ${token} WHERE id = ${account.id}`;
      }

      return {
        success: true,
        accountType,
        cookie: `${SESSION_COOKIE}=${String(account.id)}:${token}; Path=/; SameSite=Lax; Max-Age=604800`,
        dentistId: String(account.id),
      };
    } catch (e: any) {
      if (e.message?.includes("DATABASE_URL")) {
        return { success: false, error: "Database not configured." };
      }
      return { success: false, error: "Login failed. Please try again." };
    }
  });
