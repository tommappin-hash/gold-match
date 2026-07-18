/**
 * Database migration runner.
 *
 * Reads and executes schema.sql against the Neon Postgres database.
 * Safe to call multiple times — all statements use IF NOT EXISTS.
 *
 * Usage (from a server function or API route):
 *   import { migrate } from "~/db/migrate";
 *   await migrate();
 */
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { sql } from "~/db";
import { splitSqlStatements } from "./splitter";

let migrated = false;

export async function migrate(): Promise<{ success: boolean; message: string }> {
  if (migrated) {
    return { success: true, message: "Migration already applied this session." };
  }

  try {
    const schemaPath = join(import.meta.dirname, "schema.sql");
    const schemaSql = await readFile(schemaPath, "utf8");

    const neon = sql();
    const statements = splitSqlStatements(schemaSql);

    for (const stmt of statements) {
      await neon(stmt);
    }

    migrated = true;
    return {
      success: true,
      message: `Migration applied — ${statements.length} statements executed.`,
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { success: false, message: `Migration failed: ${message}` };
  }
}

/**
 * Check if the database has been migrated by testing for the dentists table.
 */
export async function isMigrated(): Promise<boolean> {
  try {
    const neon = sql();
    const result = await neon(
      `SELECT EXISTS (
        SELECT FROM information_schema.tables
        WHERE table_schema = 'public' AND table_name = 'dentists'
      ) as exists`
    );
    return result[0]?.exists ?? false;
  } catch {
    return false;
  }
}
