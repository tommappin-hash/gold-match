import { createServerFn } from "@tanstack/react-start";
import { sql } from "../../db";

function getSessionFromCookies(cookieHeader: string): { dentistId: string; token: string } | null {
  const cookies = cookieHeader.split(";").map((c) => c.trim());
  for (const cookie of cookies) {
    const [name, ...rest] = cookie.split("=");
    if (name === "gdn_session") {
      const value = rest.join("=");
      const [dentistId, token] = value.split(":");
      if (dentistId && token) return { dentistId, token };
    }
  }
  return null;
}

/** Upload a photo to the gallery */
export const uploadPhoto = createServerFn({ method: "POST" })
  .validator((data: { imageData: string; caption?: string; cookieHeader?: string }) => data)
  .handler(async ({ data, context }: any) => {
    try {
      const cookieHeader = data.cookieHeader || context?.request?.headers?.get?.("cookie") || context?.req?.headers?.get?.("cookie") || "";
      const session = getSessionFromCookies(cookieHeader);
      if (!session) return { success: false, error: "Not authenticated." };

      const db = sql();
      const rows = await db`SELECT id FROM dentists WHERE id = ${session.dentistId}::uuid AND session_token = ${session.token}`;
      if (rows.length === 0) return { success: false, error: "Session invalid." };

      const result = await db`
        INSERT INTO gallery_photos (dentist_id, caption, image_data)
        VALUES (${session.dentistId}::uuid, ${data.caption || null}, ${data.imageData})
        RETURNING id, caption, created_at
      `;

      return {
        success: true,
        photo: {
          id: result[0].id.toString(),
          caption: result[0].caption,
          createdAt: String(result[0].created_at),
        },
      };
    } catch (err: any) {
      console.error("uploadPhoto error:", err.message || err);
      return { success: false, error: err.message || "Failed to upload photo." };
    }
  });

/** Get all photos for the currently authenticated dentist */
export const getPhotos = createServerFn()
  .validator((data: { cookieHeader?: string }) => data)
  .handler(async ({ data, context }: any) => {
  try {
    const cookieHeader = data.cookieHeader || context?.request?.headers?.get?.("cookie") || context?.req?.headers?.get?.("cookie") || "";
    const session = getSessionFromCookies(cookieHeader);
    if (!session) return { photos: [] };

    const db = sql();
    const rows = await db`SELECT id, caption, image_data, created_at FROM gallery_photos WHERE dentist_id = ${session.dentistId}::uuid ORDER BY created_at DESC`;

    return {
      photos: rows.map((r: any) => ({
        id: r.id.toString(),
        caption: r.caption || "",
        imageData: r.image_data,
        createdAt: String(r.created_at),
      })),
    };
  } catch (err: any) {
    console.error("getPhotos error:", err.message || err);
    return { photos: [] };
  }
});

/** Delete a photo */
export const deletePhoto = createServerFn()
  .validator((data: { photoId: string; cookieHeader?: string }) => data)
  .handler(async ({ data, context }: any) => {
    try {
      const cookieHeader = data.cookieHeader || context?.request?.headers?.get?.("cookie") || context?.req?.headers?.get?.("cookie") || "";
      const session = getSessionFromCookies(cookieHeader);
      if (!session) return { success: false, error: "Not authenticated." };

      const db = sql();
      await db`DELETE FROM gallery_photos WHERE id = ${data.photoId}::uuid AND dentist_id = ${session.dentistId}::uuid`;
      return { success: true };
    } catch (err: any) {
      console.error("deletePhoto error:", err.message || err);
      return { success: false, error: "Failed to delete photo." };
    }
  });
