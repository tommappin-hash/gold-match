import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getAllPageViews } from "../api/analytics";
import { checkSessionFn } from "../../lib/auth";

export const Route = createFileRoute("/dashboard/analytics")({
  component: DashboardAnalytics,
});

function DashboardAnalytics() {
  const [pageViews, setPageViews] = useState<{ path: string; count: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkSessionFn({ data: { cookieHeader: document.cookie } }).then((s) => {
      if (!s.authenticated) {
        window.location.href = "/login";
      } else {
        getAllPageViews().then((rows) => setPageViews(rows || [])).finally(() => setLoading(false));
      }
    }).catch(() => {
      window.location.href = "/login";
    });
  }, []);

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
            <h1 className="text-3xl font-bold text-gray-900">Site Analytics</h1>
            <p className="mt-2 text-gray-600">
              Page view counts across the Gold Dentistry Network site.
            </p>
          </div>
          <Link
            to="/dashboard"
            className="text-sm text-gray-500 hover:text-amber-600 transition-colors"
          >
            ← Back to Dashboard
          </Link>
        </div>

        <div className="mt-10 rounded-2xl bg-white shadow-sm border border-gray-200 overflow-hidden">
          {pageViews.length === 0 ? (
            <div className="p-12 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="mx-auto h-12 w-12 text-gray-300"
              >
                <path d="M15.5 2A1.5 1.5 0 0014 3.5v13a1.5 1.5 0 001.5 1.5h1a1.5 1.5 0 001.5-1.5v-13A1.5 1.5 0 0016.5 2h-1zM9.5 6A1.5 1.5 0 008 7.5v9A1.5 1.5 0 009.5 18h1a1.5 1.5 0 001.5-1.5v-9A1.5 1.5 0 0010.5 6h-1zM3.5 10A1.5 1.5 0 002 11.5v5A1.5 1.5 0 003.5 18h1A1.5 1.5 0 006 16.5v-5A1.5 1.5 0 004.5 10h-1z" />
              </svg>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                No page views yet
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Data will appear here as visitors browse the site.
              </p>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Page Path
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">
                    Views
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {pageViews.map((pv) => (
                  <tr
                    key={pv.path}
                    className="transition-colors hover:bg-amber-50/30"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {pv.path}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="inline-flex items-center rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-700">
                        {pv.count.toLocaleString()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="mt-4 rounded-xl bg-amber-50 border border-amber-100 p-4">
          <p className="text-sm text-amber-700">
            <strong>Note:</strong> This is a simple page view counter. Views are
            tracked server-side on every page load. Data updates in real time.
          </p>
        </div>
      </div>
    </div>
  );
}
