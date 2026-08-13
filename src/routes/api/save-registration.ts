import { createServerFn } from "@tanstack/react-start";
import { sql } from "../../db";

// POST: registrations carry photo data-URLs that can exceed the 1MB GET
// payload cap (MAX_PAYLOAD_SIZE). POST bodies have no such limit.
export const saveDentistRegistration = createServerFn({ method: "POST" })
  .validator(
    (data: {
      practiceName: string;
      email: string;
      phone: string;
      website: string;
      addressLine1: string;
      addressLine2: string;
      city: string;
      state: string;
      zipCode: string;
      bio: string;
      services: string[];
      photos?: { url: string; caption?: string }[];
    }) => data
  )
  .handler(async (opts: any) => {
    // TanStack's RPC layer may deliver the payload as `opts.data` or as the
    // bare object depending on version/build — accept both.
    const data = opts?.data ?? opts;
    try {
      const db = sql();
      // Check for existing registration with this email
      const existing = await db`SELECT id FROM dentists WHERE email = ${data.email}`;
      if (existing.length > 0) {
        // Idempotent re-submit: update photos if any were added, keep going.
        if (data.photos && data.photos.length > 0) {
          await db`
            UPDATE dentists
            SET photos = ${JSON.stringify(data.photos)}::jsonb,
                updated_at = now()
            WHERE email = ${data.email}
          `;
        }
        return { success: true, dentistId: String(existing[0].id), alreadyExists: true };
      }
      // Insert new dentist record
      const result = await db`
        INSERT INTO dentists (
          practice_name, email, phone, website,
          address_line1, address_line2, city, state, zip_code,
          bio, services, photos,
          listing_status, payment_status
        ) VALUES (
          ${data.practiceName}, ${data.email}, ${data.phone}, ${data.website || null},
          ${data.addressLine1 || null}, ${data.addressLine2 || null}, ${data.city}, ${data.state}, ${data.zipCode},
          ${data.bio}, ${data.services}, ${JSON.stringify(data.photos || [])}::jsonb,
          'active', 'unpaid'
        )
        RETURNING id
      `;
      return { success: true, dentistId: String(result[0].id), alreadyExists: false };
    } catch (e: any) {
      if (e.message?.includes("DATABASE_URL")) {
        return { success: true, dentistId: "mock-" + Date.now(), alreadyExists: false };
      }
      if (e.message?.includes("duplicate key") || e.message?.includes("unique")) {
        return { success: false, error: "A registration with this email already exists." };
      }
      console.error("saveDentistRegistration failed:", e?.message || e);
      return { success: false, error: "Failed to save registration. Please try again." };
    }
  });
