import { createServerFn } from "@tanstack/react-start";
import { sampleDentists, type Dentist, type Service } from "~/data/dentists";

/**
 * Whether sample/mock dentist data may be returned by these server functions.
 *
 * TRUST: this directory's pitch is "find a REAL gold dentist", so it must never
 * list invented practices to the public. If a stale Neon connection (see the
 * stale-connection note in src/db.ts) or a missing DATABASE_URL ever triggered
 * the mock fallback in production, real patients would be shown fake practices
 * with fake phone numbers and websites. That cannot happen.
 *
 * Sample data is therefore dev-only and opt-in: it is returned only when
 * VITE_ENABLE_SAMPLE_DATA="true" is explicitly set for a local/dev build. The
 * flag defaults off, so a production build can never return sample data no
 * matter how the query path behaves.
 */
const sampleDataEnabled = import.meta.env.VITE_ENABLE_SAMPLE_DATA === "true";

/**
 * Server function to fetch all dentists from the database.
 * Falls back to sample data only in dev when VITE_ENABLE_SAMPLE_DATA is set.
 */
export const getDentists = createServerFn().handler(async (): Promise<Dentist[]> => {
  if (process.env.DATABASE_URL) {
    try {
      const { sql } = await import("~/db");
      const rows = await sql()`
        SELECT id, practice_name, email, phone, website,
               address_line1, city, state, zip_code, latitude, longitude,
               bio, services, photos, listing_status, payment_status
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
        listingStatus: r.listing_status,
        paymentStatus: r.payment_status,
      }));
    } catch (err) {
      console.error("DB query failed:", err);
      if (!sampleDataEnabled) return [];
    }
  }
  // Dev-only, opt-in fallback (see sampleDataEnabled note above).
  return sampleDataEnabled ? sampleDentists : [];
});

/**
 * Server function to fetch a single dentist by ID.
 * Returns null when not found; falls back to sample data only in dev when
 * VITE_ENABLE_SAMPLE_DATA is set.
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
                 bio, services, photos, listing_status, payment_status
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
          listingStatus: r.listing_status,
          paymentStatus: r.payment_status,
        } as Dentist;
      } catch (err) {
        console.error("DB query failed:", err);
        if (!sampleDataEnabled) return null;
      }
    }
    // Dev-only, opt-in fallback (see sampleDataEnabled note above).
    return sampleDataEnabled
      ? sampleDentists.find((d) => d.id === id) || null
      : null;
  });

export type StateCount = { state: string; count: number };

/**
 * Server function to fetch dentist counts grouped by state.
 * Returns empty array when DATABASE_URL is not set — never shows mock data publicly.
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
      console.error("DB query failed:", err);
    }
  }
  // Return empty — never show mock data on the public homepage
  return [];
});
