import { createServerFn } from "@tanstack/react-start";
import { sampleDentists, type Dentist, type Service } from "~/data/dentists";

/**
 * Server function to fetch all dentists from the database.
 * Falls back to sampleDentists mock data when DATABASE_URL is not set.
 */
export const getDentists = createServerFn().handler(async () => {
  if (process.env.DATABASE_URL) {
    try {
      const { sql } = await import("~/db");
      const rows = await sql()`
        SELECT id, practice_name, email, phone, website,
               address_line1, city, state, zip_code, latitude, longitude,
               bio, services, photos
        FROM dentists
        WHERE listing_status = 'active'
        ORDER BY practice_name
      `;
      return rows.map((r: any): Dentist => ({
        id: r.id,
        practiceName: r.practice_name,
        email: r.email,
        phone: r.phone,
        website: r.website || "",
        addressLine1: r.address_line1,
        city: r.city,
        state: r.state,
        zipCode: r.zip_code,
        lat: r.latitude || 0,
        lng: r.longitude || 0,
        bio: r.bio,
        services: (r.services || []) as Service[],
        photos: (r.photos || []) as { url: string; caption: string }[],
      }));
    } catch (err) {
      console.error("DB query failed, falling back to mock data:", err);
    }
  }
  // Fallback to mock data
  return sampleDentists;
});

/**
 * Server function to fetch a single dentist by ID.
 * Falls back to sampleDentists mock data when DATABASE_URL is not set.
 */
export const getDentistById = createServerFn()
  .handler(async (opts: { data: string }) => {
    const id = opts.data;
    if (process.env.DATABASE_URL) {
      try {
        const { sql } = await import("~/db");
        const rows = await sql()`
          SELECT id, practice_name, email, phone, website,
                 address_line1, city, state, zip_code, latitude, longitude,
                 bio, services, photos
          FROM dentists
          WHERE id = ${id}
        `;
        if (rows.length === 0) return null;
        const r = rows[0] as any;
        return {
          id: r.id,
          practiceName: r.practice_name,
          email: r.email,
          phone: r.phone,
          website: r.website || "",
          addressLine1: r.address_line1,
          city: r.city,
          state: r.state,
          zipCode: r.zip_code,
          lat: r.latitude || 0,
          lng: r.longitude || 0,
          bio: r.bio,
          services: (r.services || []) as Service[],
          photos: (r.photos || []) as { url: string; caption: string }[],
        } as Dentist;
      } catch (err) {
        console.error("DB query failed, falling back to mock data:", err);
      }
    }
    // Fallback to mock data
    return sampleDentists.find((d) => d.id === id) || null;
  });

export type StateCount = { state: string; count: number };

/**
 * Server function to fetch dentist counts grouped by state.
 * Falls back to sampleDentists mock data when DATABASE_URL is not set.
 */
export const getDentistsByState = createServerFn().handler(async (): Promise<StateCount[]> => {
  if (process.env.DATABASE_URL) {
    try {
      const { sql } = await import("~/db");
      const rows = await sql()`
        SELECT state, COUNT(*)::int as count
        FROM dentists
        WHERE listing_status = 'active'
        GROUP BY state
        ORDER BY count DESC, state
      `;
      return rows.map((r: any) => ({
        state: r.state,
        count: r.count,
      }));
    } catch (err) {
      console.error("DB query failed, falling back to mock data:", err);
    }
  }
  // Fallback to mock data
  const counts: Record<string, number> = {};
  for (const d of sampleDentists) {
    counts[d.state] = (counts[d.state] || 0) + 1;
  }
  return Object.entries(counts)
    .map(([state, count]) => ({ state, count }))
    .sort((a, b) => b.count - a.count || a.state.localeCompare(b.state));
});
