import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getLabs, type Lab } from "../api/labs";

const ALL_SERVICES = ["crowns", "bridges", "inlays", "onlays"] as const;
const SERVICE_LABELS: Record<string, string> = {
  crowns: "Crowns", bridges: "Bridges", inlays: "Inlays", onlays: "Onlays",
};

const isSample = (lab: Lab) => ["Precision Gold Lab", "Bay Area Gold Works", "Lone Star Dental Gold", "Heritage Gold Studio"].includes(lab.labName);

export const Route = createFileRoute("/labs/")({
  component: LabsDirectory,
});

function LabsDirectory() {
  const [labs, setLabs] = useState<Lab[]>([]);
  const [search, setSearch] = useState("");
  const [serviceFilter, setServiceFilter] = useState<string>("");
  const [selectedLab, setSelectedLab] = useState<Lab | null>(null);

  useEffect(() => { getLabs().then(setLabs).catch(() => {}); }, []);

  const filtered = labs.filter((l) => {
    const q = search.toLowerCase();
    const matchesSearch = !q || l.labName.toLowerCase().includes(q) || (l.city || "").toLowerCase().includes(q) || (l.state || "").toLowerCase().includes(q) || (l.zipCode || "").includes(q);
    const matchesService = !serviceFilter || l.services.includes(serviceFilter);
    return matchesSearch && matchesService;
  });

  return (
    <div className="min-h-dvh bg-gray-50">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-amber-600">For Dentists</p>
          <h1 className="mt-2 text-3xl font-bold text-gray-900">Find a Gold Lab</h1>
          <p className="mt-3 text-gray-600">Connect with dental labs that specialize in gold restorations.</p>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name, city, state, or ZIP..." className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20" />
          <select value={serviceFilter} onChange={(e) => setServiceFilter(e.target.value)} className="rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20">
            <option value="">All Services</option>
            {ALL_SERVICES.map((s) => <option key={s} value={s}>{SERVICE_LABELS[s]}</option>)}
          </select>
        </div>

        {selectedLab && (
          <div className="mt-6 rounded-2xl bg-white p-8 shadow-sm border border-amber-300">
            <button onClick={() => setSelectedLab(null)} className="text-sm font-medium text-amber-600 hover:text-amber-700 mb-4">← Back to all labs</button>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{selectedLab.labName}</h2>
                <p className="mt-1 text-gray-500">{[selectedLab.city, selectedLab.state, selectedLab.zipCode].filter(Boolean).join(", ")}</p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {selectedLab.services.map((s) => (
                <span key={s} className="rounded-full bg-amber-50 px-3 py-1 text-sm text-amber-700">{SERVICE_LABELS[s] || s}</span>
              ))}
            </div>
            {selectedLab.acceptingNewDentists && (
              <p className="mt-3 text-sm font-medium text-green-600">● Currently accepting new dentists</p>
            )}
            {selectedLab.bio && (
              <div className="mt-6 border-t pt-6">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">About</h3>
                <p className="mt-2 text-gray-700 leading-relaxed">{selectedLab.bio}</p>
              </div>
            )}
            <div className="mt-6 border-t pt-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Contact</h3>
              <div className="mt-3 flex flex-wrap gap-4">
                {selectedLab.email && <a href={`mailto:${selectedLab.email}`} className="text-amber-600 hover:text-amber-700 font-medium">✉ {selectedLab.email}</a>}
                {selectedLab.phone && <a href={`tel:${selectedLab.phone}`} className="text-amber-600 hover:text-amber-700 font-medium">☎ {selectedLab.phone}</a>}
                {selectedLab.website && <a href={selectedLab.website} target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:text-amber-700 font-medium">🌐 {selectedLab.website.replace(/^https?:\/\//, "")}</a>}
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 divide-y divide-gray-100 rounded-xl border border-gray-200 bg-white">
          {filtered.length === 0 ? null : filtered.map((lab) => (
            <div
              key={lab.id}
              onClick={() => setSelectedLab(lab)}
              className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 px-5 py-3 cursor-pointer transition-colors hover:bg-amber-50/50"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="font-medium text-gray-900 truncate">
                  {lab.labName}
                </span>
                <span className="text-sm text-gray-400 shrink-0">
                  {[lab.city, lab.state].filter(Boolean).join(", ")}
                </span>
              </div>
              <span className="text-sm font-medium text-amber-600 shrink-0">
                View Details →
              </span>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-12 text-center text-gray-500">No labs found matching your search.</div>
        )}

        <div className="mt-12 text-center border-t pt-8">
          <p className="text-sm text-gray-500 mb-3">Are you a dental lab?</p>
          <Link to="/for-labs" className="rounded-lg bg-amber-500 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-600">List Your Lab</Link>
        </div>
      </div>
    </div>
  );
}
