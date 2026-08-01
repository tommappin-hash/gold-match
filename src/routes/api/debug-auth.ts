import { createServerFn } from "@tanstack/react-start";
import { sql } from "../../db";

export const debugAuth = createServerFn()
  .validator((data: { email: string }) => data)
  .handler(async ({ data }) => {
    const results: any = { steps: [] };

    try {
      const url = process.env.DATABASE_URL;
      results.steps.push({
        step: "DATABASE_URL",
        exists: !!url,
        prefix: url ? url.substring(0, 30) + "..." : null,
      });

      if (!url) return { ...results, error: "DATABASE_URL not set" };

      const db = sql();

      // Query the dentist by email
      const rows = await db`SELECT id, email, practice_name, password_hash, password_salt FROM dentists WHERE email = ${data.email}`;
      results.steps.push({ step: "query", rowCount: rows.length });

      if (rows.length > 0) {
        results.steps.push({
          step: "found",
          id: String(rows[0].id),
          email: rows[0].email,
          practiceName: rows[0].practice_name,
          hasPassword: !!rows[0].password_hash,
        });
      }

      // List ALL dentists
      const all = await db`SELECT id, email, practice_name FROM dentists`;
      results.steps.push({
        step: "allDentists",
        count: all.length,
        emails: all.map((r) => r.email),
      });

      return results;
    } catch (e: any) {
      return { ...results, error: e.message, stack: e.stack?.substring(0, 500) };
    }
  });

export const insertDentist = createServerFn()
  .validator((data: { email: string; practiceName: string }) => data)
  .handler(async ({ data }) => {
    try {
      const db = sql();
      const result = await db`
        INSERT INTO dentists (practice_name, email, city, state, zip_code, listing_status, payment_status)
        VALUES (${data.practiceName}, ${data.email}, '-', '-', '-', 'active', 'unpaid')
        ON CONFLICT (email) DO UPDATE SET practice_name = EXCLUDED.practice_name
        RETURNING id
      `;
      return { success: true, id: String(result[0].id) };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  });
