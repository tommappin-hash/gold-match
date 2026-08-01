import { createServerFn } from "@tanstack/react-start";
import { sql } from "../../db";

export interface Lab {
  id: string;
  labName: string;
  email: string;
  phone: string | null;
  website: string | null;
  city: string | null;
  state: string | null;
  zipCode: string | null;
  bio: string | null;
  services: string[];
  acceptingNewDentists: boolean;
  strategyMillingPartner: boolean;
  listingStatus: string;
  createdAt: string;
}

function mapLab(row: any): Lab {
  return {
    id: String(row.id),
    labName: row.lab_name,
    email: row.email,
    phone: row.phone,
    website: row.website,
    city: row.city,
    state: row.state,
    zipCode: row.zip_code,
    bio: row.bio,
    services: row.services || [],
    acceptingNewDentists: row.accepting_new_dentists,
    strategyMillingPartner: row.strategy_milling_partner,
    listingStatus: row.listing_status,
    createdAt: String(row.created_at),
  };
}

export const getLabs = createServerFn().handler(async () => {
  try {
    const db = sql();
    const rows = await db`SELECT * FROM labs WHERE listing_status = 'approved' ORDER BY strategy_milling_partner DESC, lab_name ASC`;
    return rows.map(mapLab);
  } catch (e: any) {
    if (e.message?.includes("DATABASE_URL")) return [];
    return [];
  }
});

export const getLabById = createServerFn()
  .validator((id: string) => id)
  .handler(async ({ data }) => {
    try {
      const db = sql();
      const rows = await db`SELECT * FROM labs WHERE id = ${data}::uuid AND listing_status = 'approved'`;
      if (rows.length === 0) return null;
      return mapLab(rows[0]);
    } catch {
      return null;
    }
  });

export const createLab = createServerFn()
  .validator((data: {
    labName: string;
    email: string;
    phone: string;
    website: string;
    city: string;
    state: string;
    zipCode: string;
    bio: string;
    services: string[];
  }) => data)
  .handler(async ({ data }) => {
    const db = sql();
    const result = await db`
      INSERT INTO labs (lab_name, email, phone, website, city, state, zip_code, bio, services, accepting_new_dentists, strategy_milling_partner, listing_status)
      VALUES (${data.labName}, ${data.email}, ${data.phone}, ${data.website || null}, ${data.city}, ${data.state}, ${data.zipCode}, ${data.bio}, ${data.services}, true, false, 'pending')
      RETURNING id, lab_name, email, phone, website, city, state, zip_code, bio, services
    `;
    return { success: true, submission: result[0] };
  });
