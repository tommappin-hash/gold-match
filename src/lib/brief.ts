import { createServerFn } from "@tanstack/react-start";
import { createHash, timingSafeEqual } from "node:crypto";
import { marked } from "marked";
import { BRIEF_PASSPHRASE } from "./briefPassphrase";

/**
 * Server side of the Versalius Mundi collaboration brief.
 *
 * The packet text lives in src/content/versalius/*.md (copies of the files in
 * /home/team/shared/versalius/production/). It is only rendered and returned to
 * the browser after the passphrase has been given — the gate is server-side, so
 * the packet is not in the page source before it is unlocked.
 */

const rawDocs = import.meta.glob("../content/versalius/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

function rawDoc(name: string): string {
  const key = Object.keys(rawDocs).find((k) => k.endsWith(`/${name}.md`));
  return key ? rawDocs[key] : "";
}

/** The session token a correct passphrase earns. Not the passphrase itself. */
function briefToken(): string {
  return createHash("sha256")
    .update(`versalius-brief-v1|${BRIEF_PASSPHRASE.trim().toLowerCase()}`)
    .digest("hex");
}

function tokenMatches(token: unknown): boolean {
  if (typeof token !== "string" || token.length !== 64) return false;
  const a = Buffer.from(token, "utf8");
  const b = Buffer.from(briefToken(), "utf8");
  return a.length === b.length && timingSafeEqual(a, b);
}

function toHtml(md: string, opts: { dropStatusLine?: boolean } = {}): string {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  // Drop the document's own `# Title` — the page supplies the heading.
  const firstHeading = lines.findIndex((l) => l.trim().length > 0);
  if (firstHeading >= 0 && lines[firstHeading].startsWith("# ")) {
    lines.splice(firstHeading, 1);
  }
  let body = lines.join("\n");
  if (opts.dropStatusLine) {
    body = body.replace(/^\*\*Status:\*\*.*$/m, "").replace(/^\*\*Drafted:\*\*/m, "**Drafted:**");
  }
  return marked.parse(body, { async: false }) as string;
}

export interface BriefDoc {
  key: string;
  html: string;
}

/** Check the passphrase. Returns a token the browser keeps in a cookie. */
export const openBrief = createServerFn({ method: "POST" })
  .validator((data: { passphrase: string }) => data)
  .handler(async ({ data }) => {
    const given = String(data?.passphrase ?? "")
      .trim()
      .toLowerCase();
    if (!given) return { ok: false as const };
    const ok = given === BRIEF_PASSPHRASE.trim().toLowerCase();
    return ok ? { ok: true as const, token: briefToken() } : { ok: false as const };
  });

/** Return the four packet documents, rendered, only to an unlocked session. */
export const readBrief = createServerFn({ method: "POST" })
  .validator((data: { token: string }) => data)
  .handler(async ({ data }) => {
    if (!tokenMatches(data?.token)) return { ok: false as const, docs: [] as BriefDoc[] };
    const docs: BriefDoc[] = [
      { key: "spine", html: toHtml(rawDoc("message-spine")) },
      { key: "season", html: toHtml(rawDoc("episode-plan")) },
      { key: "schedule", html: toHtml(rawDoc("shooting-schedule")) },
      { key: "deal", html: toHtml(rawDoc("revenue-share-sheet"), { dropStatusLine: true }) },
    ];
    return { ok: true as const, docs };
  });

async function ensureTable() {
  const { sql } = await import("~/db");
  const db = sql();
  await db`
    CREATE TABLE IF NOT EXISTS versalius_brief_feedback (
      id SERIAL PRIMARY KEY,
      kind TEXT NOT NULL,
      section TEXT,
      name TEXT,
      lands TEXT,
      doesnt TEXT,
      wants TEXT,
      why TEXT,
      comment TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
  return db;
}

/** A note left at the end of one of the packet sections. */
export const saveBriefNote = createServerFn({ method: "POST" })
  .validator((data: { token: string; section: string; comment: string }) => data)
  .handler(async ({ data }) => {
    if (!tokenMatches(data?.token)) return { ok: false as const, error: "Locked." };
    const comment = String(data?.comment ?? "").trim();
    if (!comment) return { ok: false as const, error: "Nothing written yet." };
    try {
      const db = await ensureTable();
      await db`
        INSERT INTO versalius_brief_feedback (kind, section, comment)
        VALUES ('section_note', ${String(data.section ?? "").slice(0, 120)}, ${comment.slice(0, 8000)})
      `;
      return { ok: true as const };
    } catch (e: any) {
      console.error("saveBriefNote failed:", e?.message || e);
      return { ok: false as const, error: "That didn't save. Try once more." };
    }
  });

/** The closing form. */
export const saveBriefResponse = createServerFn({ method: "POST" })
  .validator(
    (data: {
      token: string;
      name: string;
      lands: string;
      doesnt: string;
      wants: string;
      why: string;
    }) => data,
  )
  .handler(async ({ data }) => {
    if (!tokenMatches(data?.token)) return { ok: false as const, error: "Locked." };
    const name = String(data?.name ?? "").trim();
    if (!name) return { ok: false as const, error: "Add your name first." };
    try {
      const db = await ensureTable();
      await db`
        INSERT INTO versalius_brief_feedback (kind, name, lands, doesnt, wants, why)
        VALUES (
          'response',
          ${name.slice(0, 120)},
          ${String(data.lands ?? "").slice(0, 8000)},
          ${String(data.doesnt ?? "").slice(0, 8000)},
          ${String(data.wants ?? "").slice(0, 20)},
          ${String(data.why ?? "").slice(0, 8000)}
        )
      `;
      return { ok: true as const };
    } catch (e: any) {
      console.error("saveBriefResponse failed:", e?.message || e);
      return { ok: false as const, error: "That didn't save. Try once more." };
    }
  });
