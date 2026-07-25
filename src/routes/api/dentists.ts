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
