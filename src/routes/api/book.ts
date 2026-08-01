import { createServerFn } from "@tanstack/react-start";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { marked } from "marked";

export const trackBookView = createServerFn().handler(async (opts: { data: { path: string } }) => {
  if (process.env.DATABASE_URL) {
    try {
      const { sql } = await import("~/db");
      await sql`UPDATE page_views SET count = count + 1 WHERE path = ${opts.data.path}`;
    } catch (err) {
      console.error("Failed to track page view:", err);
    }
  }
});

export const getBookViews = createServerFn().handler(async () => {
  if (process.env.DATABASE_URL) {
    try {
      const { sql } = await import("~/db");
      const rows = await sql`SELECT path, count FROM page_views ORDER BY path`;
      return rows as { path: string; count: number }[];
    } catch (err) {
      console.error("Failed to get page views:", err);
    }
  }
  return [];
});

const BOOK_DIR = "/home/team/shared/book";
const FILES = [
  "prologue-draft-1.md",
  "part-1-draft-1.md",
  "part-2-draft-1.md",
  "part-3-draft-1.md",
  "part-4-draft-1.md",
];

export interface TocEntry {
  id: string;
  title: string;
  level: "part" | "chapter";
}

export interface BookData {
  html: string;
  toc: TocEntry[];
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export const getBookContent = createServerFn().handler(async (): Promise<BookData> => {
  const toc: TocEntry[] = [];
  let combinedMd = "";

  for (const file of FILES) {
    const raw = readFileSync(join(BOOK_DIR, file), "utf-8");

    // Process lines: add anchor IDs to headings, extract TOC
    const lines = raw.split("\n");
    const processedLines: string[] = [];

    for (const line of lines) {
      if (line.startsWith("# ")) {
        // Part title
        const title = line.replace(/^# /, "").replace(/ — Draft.*$/, "").trim();
        const id = slugify(title);
        toc.push({ id, title, level: "part" });
        processedLines.push(`<h1 id="${id}" class="book-part-title">${title}</h1>`);
        processedLines.push("");
      } else if (line.startsWith("## ")) {
        // Chapter title
        const title = line.replace(/^## /, "").trim();
        const id = slugify(title);
        toc.push({ id, title, level: "chapter" });
        processedLines.push(`<h2 id="${id}" class="book-chapter-title">${title}</h2>`);
        processedLines.push("");
      } else {
        processedLines.push(line);
      }
    }

    combinedMd += processedLines.join("\n") + "\n\n";
  }

  // Convert remaining markdown (blockquotes, emphasis, paragraphs) using marked
  const html = marked.parse(combinedMd, { async: false }) as string;

  return { html, toc };
});
