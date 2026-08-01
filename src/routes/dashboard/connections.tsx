import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { checkSessionFn } from "../../lib/auth";
import { createServerFn } from "@tanstack/react-start";
import { sql as getDb } from "../../db";

type ConnRow = {
  id: string;
  dentist_id: string;
  patient_name: string;
  patient_email: string;
  message: string;
  status: string;
  created_at: string;
};

/** Server function: get connections for the authenticated dentist/lab */
const getConnectionsFn = createServerFn()
  .validator((data: { cookieHeader?: string }) => data)
  .handler(async ({ data, context }: any) => {
    const cookieHeader =
      data.cookieHeader ||
      context?.request?.headers?.get?.("cookie") ||
      context?.req?.headers?.get?.("cookie") ||
      "";
    const cookies = cookieHeader.split(";").map((c: string) => c.trim());
    let session: { accountId: string; token: string } | null = null;
    for (const c of cookies) {
      const [name, ...rest] = c.split("=");
      if (name === "gdn_session") {
        const value = rest.join("=");
        const [id, tok] = value.split(":");
        if (id && tok) session = { accountId: id, token: tok };
        break;
      }
    }
    if (!session) return { connections: [] };

    const db = getDb();
    // Verify session
    const dentistCheck = await db`SELECT id FROM dentists WHERE id = ${session.accountId}::uuid AND session_token = ${session.token}`;
    if (dentistCheck.length === 0) {
      const labCheck = await db`SELECT id FROM labs WHERE id = ${session.accountId}::uuid AND session_token = ${session.token}`;
      if (labCheck.length === 0) return { connections: [] };
      // Labs don't have connections for now
      return { connections: [] };
    }

    const rows = await db`
      SELECT id, dentist_id, patient_name, patient_email, message, status, created_at
      FROM connections
      WHERE dentist_id = ${session.accountId}::uuid
      ORDER BY created_at DESC
    `;
    return {
      connections: rows.map((r: ConnRow) => ({
        id: r.id,
        patientName: r.patient_name,
        patientEmail: r.patient_email,
        message: r.message,
        status: r.status,
        createdAt: r.created_at,
      })),
    };
  });

/** Server function: update connection status */
const updateConnectionFn = createServerFn({ method: "POST" })
  .validator((data: { connectionId: string; status: string; cookieHeader?: string }) => data)
  .handler(async ({ data, context }: any) => {
    const cookieHeader =
      data.cookieHeader ||
      context?.request?.headers?.get?.("cookie") ||
      context?.req?.headers?.get?.("cookie") ||
      "";
    const cookies = cookieHeader.split(";").map((c: string) => c.trim());
    let session: { accountId: string; token: string } | null = null;
    for (const c of cookies) {
      const [name, ...rest] = c.split("=");
      if (name === "gdn_session") {
        const value = rest.join("=");
        const [id, tok] = value.split(":");
        if (id && tok) session = { accountId: id, token: tok };
        break;
      }
    }
    if (!session) return { success: false, error: "Not authenticated" };

    const db = getDb();
    await db`
      UPDATE connections SET status = ${data.status}
      WHERE id = ${data.connectionId}::uuid AND dentist_id = ${session.accountId}::uuid
    `;
    return { success: true };
  });

export const Route = createFileRoute("/dashboard/connections")({
  component: DashboardConnections,
});

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  accepted: "bg-green-100 text-green-800",
  declined: "bg-red-100 text-red-800",
};

function DashboardConnections() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [connections, setConnections] = useState<any[]>([]);
  const [loadingConnections, setLoadingConnections] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    checkSessionFn({ data: { cookieHeader: document.cookie } }).then((s) => {
      if (!s.authenticated) window.location.href = "/login";
      else {
        setSession(s);
        setLoading(false);
      }
    });
  }, []);

  async function loadConnections() {
    try {
      const result = await getConnectionsFn({ data: { cookieHeader: document.cookie } });
      setConnections(result.connections || []);
    } catch (err: any) {
      setError(err.message || "Failed to load connections");
    } finally {
      setLoadingConnections(false);
    }
  }

  useEffect(() => {
    if (loading) return;
    loadConnections();
  }, [loading]);

  async function handleUpdate(connectionId: string, status: string) {
    try {
      const result = await updateConnectionFn({
        data: { connectionId, status, cookieHeader: document.cookie },
      });
      if (result.success) {
        setConnections((prev) =>
          prev.map((c) => (c.id === connectionId ? { ...c, status } : c))
        );
      }
    } catch {
      // ignore
    }
  }

  if (loading) {
    return (
      <div className="min-h-dvh bg-gray-50 flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-amber-200 border-t-amber-500" />
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-gray-50">
      <div className="mx-auto max-w-4xl px-6 py-16">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Connection Requests</h1>
            <p className="mt-2 text-gray-600">
              Review and manage patient requests to connect with your practice.
            </p>
          </div>
          <Link to="/dashboard" className="text-sm text-gray-500 hover:text-amber-600 transition-colors">
            ← Back to Dashboard
          </Link>
        </div>

        <div className="mt-10">
          {loadingConnections ? (
            <div className="rounded-2xl bg-white p-12 text-center shadow-sm border border-gray-200">
              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-amber-200 border-t-amber-500" />
              <p className="mt-4 text-sm text-gray-500">Loading connections...</p>
            </div>
          ) : error ? (
            <div className="rounded-2xl bg-red-50 border border-red-200 p-6 text-center">
              <p className="text-red-700">{error}</p>
            </div>
          ) : connections.length === 0 ? (
            <div className="rounded-2xl bg-white p-12 text-center shadow-sm border border-gray-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="mx-auto h-12 w-12 text-gray-300"
              >
                <path d="M3.105 2.289a.75.75 0 00-.826.95l1.437 5.036a.75.75 0 00.579.527l7.5 1.5a.75.75 0 010 1.466l-7.5 1.5a.75.75 0 00-.579.527l-1.437 5.036a.75.75 0 00.826.95 57.933 57.933 0 0016.393-8.022.75.75 0 000-1.318A57.933 57.933 0 003.105 2.289z" />
              </svg>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">No connection requests yet</h3>
              <p className="mt-2 text-sm text-gray-500">
                When patients request to connect with your practice, they'll appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {connections.map((conn) => (
                <div key={conn.id} className="rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-gray-900">{conn.patientName}</h3>
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            STATUS_COLORS[conn.status] || "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {conn.status}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">{conn.patientEmail}</p>
                      <p className="mt-3 text-sm text-gray-700 leading-relaxed">{conn.message}</p>
                      <p className="mt-3 text-xs text-gray-400">
                        Received:{" "}
                        {new Date(conn.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    {conn.status === "pending" && (
                      <div className="ml-4 flex gap-2">
                        <button
                          type="button"
                          onClick={() => handleUpdate(conn.id, "accepted")}
                          className="rounded-lg bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700 hover:bg-green-100 transition-colors"
                        >
                          Accept
                        </button>
                        <button
                          type="button"
                          onClick={() => handleUpdate(conn.id, "declined")}
                          className="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-100 transition-colors"
                        >
                          Decline
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
