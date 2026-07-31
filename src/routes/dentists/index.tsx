import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ALL_SERVICES,
  type Dentist,
  type Service,
  formatServiceLabel,
} from "~/data/dentists";
import { getDentists } from "~/routes/api/dentists";

export const Route = createFileRoute("/dentists/")({
  loader: () => getDentists(),
  component: Directory,
});

function Directory() {
  const allDentists = Route.useLoaderData();
  const [locationQuery, setLocationQuery] = useState("");
  const [selectedServices, setSelectedServices] = useState<Set<Service>>(
    new Set(),
  );

  const toggleService = (s: Service) => {
    setSelectedServices((prev) => {
      const next = new Set(prev);
      if (next.has(s)) next.delete(s);
      else next.add(s);
      return next;
    });
  };

  const activeCount = useMemo(
    () => allDentists.filter((d) => d.listingStatus === "active").length,
    [allDentists],
  );

  const filtered = useMemo(() => {
    let results = allDentists.filter((d) => d.listingStatus === "active");

    if (locationQuery.trim()) {
      const q = locationQuery.toLowerCase().trim();
      results = results.filter(
        (d) =>
          d.city.toLowerCase().includes(q) ||
          d.state.toLowerCase().includes(q) ||
          d.zipCode.includes(q) ||
          `${d.city}, ${d.state}`.toLowerCase().includes(q),
      );
    }

    if (selectedServices.size > 0) {
      results = results.filter((d) =>
        Array.from(selectedServices).every((s) => d.services.includes(s)),
      );
    }

    return results;
  }, [locationQuery, selectedServices, allDentists]);

  return (
    <div className="min-h-dvh bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Find a Gold Dentist
          </h1>
          <p className="mt-2 text-gray-600">
            Browse {activeCount} gold dentistry specialists across the United
            States.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
            >
              <path
                fillRule="evenodd"
                d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003h.001zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="text"
              placeholder='Search by city, state, or ZIP (e.g. "San Francisco, CA")'
              value={locationQuery}
              onChange={(e) => setLocationQuery(e.target.value)}
              className="block w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 text-gray-900 placeholder:text-gray-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
            />
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {ALL_SERVICES.map((s) => {
              const selected = selectedServices.has(s);
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => toggleService(s)}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                    selected
                      ? "bg-amber-500 text-white shadow-sm"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {formatServiceLabel(s)}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6 divide-y divide-gray-100 rounded-xl border border-gray-200 bg-white">
          {filtered.length === 0 ? null : filtered.map((dentist) => (
            <Link
              key={dentist.id}
              to="/dentists/$id"
              params={{ id: dentist.id }}
              className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 px-5 py-3 transition-colors hover:bg-amber-50/50"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="font-medium text-gray-900 truncate">
                  {dentist.practiceName}
                </span>
                <span className="text-sm text-gray-400 shrink-0">
                  {dentist.city}, {dentist.state}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-amber-600 shrink-0">
                  View Profile →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-16 rounded-2xl bg-white p-12 text-center shadow-sm border border-gray-200">
            <span className="text-5xl">😢</span>
            <h3 className="mt-4 text-lg font-semibold text-gray-900">
              No dentists found
            </h3>
            <p className="mt-2 text-gray-500">
              Try adjusting your search or filters to find more dentists.
            </p>
            <button
              type="button"
              onClick={() => {
                setLocationQuery("");
                setSelectedServices(new Set());
              }}
              className="mt-4 text-sm font-medium text-amber-600 hover:text-amber-700"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
