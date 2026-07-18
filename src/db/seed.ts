/**
 * Database seed runner.
 *
 * Inserts sample dentists, patients, and connections for development/testing.
 * Uses ON CONFLICT DO NOTHING — safe to call multiple times.
 *
 * Usage:
 *   import { seed } from "~/db/seed";
 *   await seed();
 */
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { sql } from "~/db";
import { splitSqlStatements } from "./splitter";

let seeded = false;

export async function seed(): Promise<{ success: boolean; message: string }> {
  if (seeded) {
    return { success: true, message: "Seed data already applied this session." };
  }

  try {
    const seedPath = join(import.meta.dirname, "seed.sql");
    const seedSql = await readFile(seedPath, "utf8");

    const neon = sql();
    const statements = splitSqlStatements(seedSql);

    for (const stmt of statements) {
      await neon(stmt);
    }

    seeded = true;
    return {
      success: true,
      message: `Seed data applied — ${statements.length} statements executed.`,
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { success: false, message: `Seed failed: ${message}` };
  }
}
