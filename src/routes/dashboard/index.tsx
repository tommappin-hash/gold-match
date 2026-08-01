import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { checkSessionFn, logoutFn } from "../../lib/auth";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardIndex,
});

function DashboardIndex() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkSessionFn({ data: { cookieHeader: document.cookie } }).then((s) => {
      if (!s.authenticated) window.location.href = "/login";
      else {
        setSession(s);
        setLoading(false);
      }
    });
  }, []);

  async function handleLogout() {
    const result = await logoutFn();
    if (result.cookie) {
      document.cookie = result.cookie["Set-Cookie"];
    }
    window.location.href = "/";
  }

  if (loading) {
    return (
      <div className="min-h-dvh bg-gray-50 flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-amber-200 border-t-amber-500" />
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="min-h-dvh bg-gray-50">
      <div className="mx-auto max-w-4xl px-6 py-16">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="mt-2 text-gray-600">
              Welcome back, {session.account?.name || "Doctor"}. Manage your {session.account?.accountType === "lab" ? "lab" : "practice"}{" "}
              listing and view incoming patient connections.
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
          >
            Sign Out
          </button>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <Link
            to="/dashboard/connections"
            className="group rounded-2xl bg-white p-8 shadow-sm border border-gray-200 hover:border-amber-300 hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6 text-amber-600">
                  <path d="M3.105 2.289a.75.75 0 00-.826.95l1.437 5.036a.75.75 0 00.579.527l7.5 1.5a.75.75 0 010 1.466l-7.5 1.5a.75.75 0 00-.579.527l-1.437 5.036a.75.75 0 00.826.95 57.933 57.933 0 0016.393-8.022.75.75 0 000-1.318A57.933 57.933 0 003.105 2.289z" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 group-hover:text-amber-600 transition-colors">
                  Connection Requests
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  View and manage patient requests to connect with your practice.
                </p>
              </div>
            </div>
          </Link>

          <Link
            to="/dashboard/settings"
            className="group rounded-2xl bg-white p-8 shadow-sm border border-gray-200 hover:border-amber-300 hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6 text-amber-600">
                  <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
                  <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 group-hover:text-amber-600 transition-colors">
                  {session.account?.accountType === "lab" ? "Lab" : "Practice"} Settings
                </h2>
                <p className="mt-1 text-sm text-gray-500">Edit your profile, services, and listing details.</p>
              </div>
            </div>
          </Link>

          <a
            href={session.account?.accountType === "lab" ? `/labs/${session.account?.id}` : `/dentists/${session.account?.id}`}
            className="group rounded-2xl bg-white p-8 shadow-sm border border-gray-200 hover:border-amber-300 hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6 text-amber-600">
                  <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                  <path fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 group-hover:text-amber-600 transition-colors">
                  View Public Profile
                </h2>
                <p className="mt-1 text-sm text-gray-500">See how patients view your listing on the directory.</p>
              </div>
            </div>
          </a>
        </div>

        <div className="mt-6">
          <Link to="/dentists" className="text-sm text-gray-500 hover:text-amber-600 transition-colors">
            ← Back to directory
          </Link>
        </div>
      </div>
    </div>
  );
}
