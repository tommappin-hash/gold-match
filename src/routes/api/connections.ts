import { createServerFn } from "@tanstack/react-start";
import { connections } from "~/data/connections";

/**
 * Submit a connection request from a patient to a dentist.
 * Stores in-memory when DATABASE_URL is not set.
 */
export const submitConnection = createServerFn()
  .validator(
    (data: {
      dentistId: string;
      patientName: string;
      patientEmail: string;
      message: string;
    }) => data,
  )
  .handler(async ({ data }) => {
    // Validate
    if (
      !data.dentistId ||
      !data.patientName.trim() ||
      !data.patientEmail.trim() ||
      !data.message.trim()
    ) {
      throw new Error("All fields are required.");
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.patientEmail)) {
      throw new Error("Invalid email address.");
    }

    const connection = {
      id: `conn_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      dentistId: data.dentistId,
      patientName: data.patientName.trim(),
      patientEmail: data.patientEmail.trim(),
      message: data.message.trim(),
      status: "pending" as const,
      createdAt: new Date().toISOString(),
    };

    // Try DB first, fall back to in-memory
    if (process.env.DATABASE_URL) {
      try {
        const { sql } = await import("~/db");
        await sql()`
          INSERT INTO connections (dentist_id, patient_name, patient_email, message)
          VALUES (${connection.dentistId}, ${connection.patientName}, ${connection.patientEmail}, ${connection.message})
        `;
      } catch (err) {
        // DB insert failed — fall through to in-memory
        console.error("DB insert failed, using in-memory store:", err);
        connections.push(connection);
      }
    } else {
      connections.push(connection);
    }

    return { success: true, connectionId: connection.id };
  });

/**
 * List all connections (optionally filtered by dentist).
 * Reads from DB or in-memory store.
 */
export const listConnections = createServerFn()
  .validator((data: { dentistId?: string }) => data)
  .handler(async ({ data }) => {
    if (process.env.DATABASE_URL) {
      try {
        const { sql } = await import("~/db");
        const rows = await sql()`
          SELECT id, dentist_id, patient_name, patient_email, message, status, created_at
          FROM connections
          ${data.dentistId ? sql`WHERE dentist_id = ${data.dentistId}` : sql``}
          ORDER BY created_at DESC
        `;
        return rows.map((r: any) => ({
          id: r.id,
          dentistId: r.dentist_id,
          patientName: r.patient_name,
          patientEmail: r.patient_email,
          message: r.message,
          status: r.status,
          createdAt: String(r.created_at),
        }));
      } catch {
        // Fall through to in-memory
      }
    }

    const filtered = data.dentistId
      ? connections.filter((c) => c.dentistId === data.dentistId)
      : connections;
    return filtered.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  });
