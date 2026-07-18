/**
 * In-memory connection store (client-safe mock data).
 * Used when DATABASE_URL is not set. Replace with DB queries once connected.
 */
export interface Connection {
  id: string;
  dentistId: string;
  patientName: string;
  patientEmail: string;
  message: string;
  status: "pending" | "accepted" | "declined";
  createdAt: string;
}

// In-memory store (server-side only, via /api/connections server function)
export const connections: Connection[] = [];
