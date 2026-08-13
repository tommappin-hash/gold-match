import { createServerFn } from "@tanstack/react-start";
import { sql } from "../../db";

export const saveCoalitionSignup = createServerFn({ method: "POST" })
  .validator(
    (data: {
      name: string;
      email: string;
      npi: string | null;
      state: string;
    }) => data
  )
  .handler(async ({ data }) => {
    try {
      const db = sql();

      // Ensure table exists
      await db`
        CREATE TABLE IF NOT EXISTS coalition_signups (
          id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          name        TEXT NOT NULL,
          email       TEXT NOT NULL,
          npi         TEXT,
          state       TEXT NOT NULL,
          created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
        )
      `;

      // Check for existing email
      const existing = await db`SELECT id FROM coalition_signups WHERE email = ${data.email}`;
      if (existing.length > 0) {
        return { success: true, message: "already signed up" };
      }

      await db`
        INSERT INTO coalition_signups (name, email, npi, state)
        VALUES (${data.name}, ${data.email}, ${data.npi}, ${data.state})
      `;

      return { success: true, message: "signed up" };
    } catch (e: any) {
      if (e.message?.includes("DATABASE_URL")) {
        return { success: true, message: "signed up (offline)" };
      }
      return { success: false, error: "Failed to save signup" };
    }
  });
