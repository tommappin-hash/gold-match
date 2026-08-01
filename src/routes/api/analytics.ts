import { createServerFn } from "@tanstack/react-start";

export const trackPageView = createServerFn().handler(
  async (opts: { data: { path: string } }) => {
    if (process.env.DATABASE_URL) {
      try {
        const { sql } = await import("~/db");
        await sql`INSERT INTO page_views (path, count) VALUES (${opts.data.path}, 1) ON CONFLICT (path) DO UPDATE SET count = page_views.count + 1`;
      } catch (err) {
        console.error("Failed to track page view:", err);
      }
    }
  },
);

export const getAllPageViews = createServerFn().handler(async () => {
  if (process.env.DATABASE_URL) {
    try {
      const { sql } = await import("~/db");
      const rows = await sql`SELECT path, count FROM page_views ORDER BY count DESC`;
      return rows as { path: string; count: number }[];
    } catch (err) {
      console.error("Failed to get page views:", err);
    }
  }
  return [];
});
