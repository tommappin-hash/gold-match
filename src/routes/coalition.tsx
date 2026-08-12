import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { saveCoalitionSignup } from "~/routes/api/coalition";

export const Route = createFileRoute("/coalition")({ component: CoalitionPage });

const STUDIES = [
  {
    category: "Marginal Integrity",
    studies: [
      {
        citation: "Johnson GH, Lepe X, Patterson A, Schäfer O.",
        title: "Marginal gap of milled versus cast gold restorations.",
        journal: "J Prosthodont. 2017;26(1):56–63.",
        findings: [
          "Milled gold: 11.7 μm mean marginal gap",
          "Cast gold: 22.7–43.6 μm",
          "CAD/CAM-milled gold achieves a significantly tighter margin than traditional cast gold",
        ],
      },
      {
        citation: "Azar B, Eckert S, Kunkela J, Ingr T, Mounajjed R.",
        title: "Marginal fit of pressed versus milled ceramic restorations.",
        journal: "Braz Oral Res. 2018;32:e16.",
        findings: [
          "Pressed ceramic: 38 μm mean marginal gap",
          "Milled ceramic: 45–83 μm",
          "Gold outperforms both by a factor of 3–7×",
        ],
      },
      {
        citation: "Svanborg P.",
        title: "Marginal and internal fit of milled ceramic crowns.",
        journal: "Biomater Investig Dent. 2020;7(1):134–140.",
        findings: [
          "Confirmed milled ceramic marginal gaps in the 45–83 μm range across multiple ceramic types",
        ],
      },
    ],
  },
  {
    category: "Clinical Failure Rates",
    studies: [
      {
        citation: "Kopperud SE, Tveit AB, Gaarden T, Sandvik L, Espelid I.",
        title: "Longevity of posterior dental restorations and reasons for failure.",
        journal: "Eur J Oral Sci. 2012;120(6):539–548.",
        findings: [
          "Secondary caries was the most common reason for composite restoration failure",
        ],
      },
      {
        citation: "Kopperud SE, Staxrud F, Espelid I, Tveit AB.",
        title: "The post-amalgam era: Norwegian dentists' experiences with composite resins.",
        journal: "Int J Environ Res Public Health. 2016;13(4):441.",
        findings: [
          "Survey of 2,026 Norwegian dentists after the 2008 amalgam ban",
          "72.7% of composite failures attributed to secondary caries at the margin",
          "71% of respondents reported amalgam lasted longer than composite",
        ],
      },
    ],
  },
  {
    category: "Material Science",
    studies: [
      {
        citation: "Anusavice KJ, Shen C, Rawls HR.",
        title: "Phillips' Science of Dental Materials. 12th ed.",
        journal: "Elsevier; 2013.",
        findings: [
          "Ch. 11: Composition, microstructure, and corrosion resistance of gold alloys",
          "Ch. 13: Zinc phosphate and resin-modified glass ionomer bonding to gold",
        ],
      },
      {
        citation: "Donovan TE, Chee WWL.",
        title: "A review of contemporary dental materials and their clinical performance.",
        journal: "J Calif Dent Assoc. 2013;41(4):269–278.",
        findings: [
          "Review of long-term clinical data across material classes",
        ],
      },
    ],
  },
  {
    category: "Economics & Ethics",
    studies: [
      {
        citation: "Mjör IA, Gordan VV.",
        title: "Failure, repair, refurbishing, and longevity of restorations.",
        journal: "Oper Dent. 2002;27(5):528–534.",
        findings: [
          "Documents the repeat restoration cycle — each replacement enlarges the preparation",
        ],
      },
      {
        citation: "Christensen GJ.",
        title: "The coming demise of the cast gold restoration?",
        journal: "J Am Dent Assoc. 2013;144(2):187–190.",
        findings: [
          "Named the decline of cast gold as a loss to the profession and to patients",
        ],
      },
    ],
  },
];

function CoalitionPage() {
  const [form, setForm] = useState({ name: "", email: "", npi: "", state: "" });
  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await saveCoalitionSignup({
        data: { ...form, npi: form.npi || null },
      });
      if (res.success) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <main className="min-h-dvh bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link to="/" className="text-lg font-bold text-gray-900">
            Gold <span className="text-amber-500">Dentistry</span> Network
          </Link>
          <Link to="/" className="text-sm font-medium text-gray-600 hover:text-amber-600">
            Back to home
          </Link>
        </div>
      </header>

      <article className="mx-auto max-w-4xl px-6 py-14 sm:py-20">
        <p className="text-sm font-semibold uppercase tracking-widest text-amber-600">
          Reference Library & Coalition
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          The Evidence for Gold
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-gray-600">
          A collection of peer-reviewed research supporting the re-evaluation of
          gold as a first-treatment material for caries. Organized for
          clinicians, educators, and code committee members.
        </p>

        {/* Mission */}
        <p className="mt-10 max-w-3xl text-base leading-relaxed text-gray-700">
          The mission is straightforward: reform procedure codes so they
          distinguish materials by their documented clinical outcomes. When a
          gold restoration that lasts 30+ years and a composite that fails at
          the margin in 7–10 share the same code, the system is not neutral —
          it is actively steering clinicians and patients away from the most
          durable treatment. The evidence assembled here supports that change.
          The coalition demonstrates that the profession is ready for it.
        </p>

        {/* Why / How / What */}
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900">Why</h3>
            <ul className="mt-3 space-y-2 text-sm text-gray-600">
              <li>• Current procedure codes do not distinguish a 30-year gold restoration from a 7–10-year composite</li>
              <li>• This creates a structural disincentive against the most durable treatment</li>
              <li>• Veracity — the ethical obligation to present patients with truthful information about treatment options — is incompatible with codes that ignore material-specific outcomes</li>
            </ul>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900">How</h3>
            <ul className="mt-3 space-y-2 text-sm text-gray-600">
              <li>• By organizing the published evidence in one place — accessible to any clinician, educator, or committee member</li>
              <li>• By building a coalition of dentists whose names demonstrate professional demand for code reform</li>
              <li>• No fees, no dues, no lobbying — just a list of signatures backed by data</li>
            </ul>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900">What</h3>
            <ul className="mt-3 space-y-2 text-sm text-gray-600">
              <li>• A reference library of 8 key studies across 4 categories</li>
              <li>• A coalition signup for licensed dentists</li>
              <li>• When the codes are opened for review, the coalition's numbers and the evidence behind them are presented together</li>
            </ul>
          </div>
        </div>

        {/* Reference Library */}
        <h2 className="mt-16 text-2xl font-bold text-gray-900">Reference Library</h2>
        <p className="mt-2 text-sm text-gray-500">
          Eight peer-reviewed studies organized by category. Each entry includes
          the full citation and key findings relevant to material-specific
          outcomes.
        </p>

        <div className="mt-8 space-y-10">
          {STUDIES.map((group) => (
            <div key={group.category}>
              <h3 className="text-lg font-semibold text-amber-700">{group.category}</h3>
              <div className="mt-3 space-y-4">
                {group.studies.map((s, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
                  >
                    <p className="text-sm font-medium text-gray-900">{s.citation}</p>
                    <p className="text-sm italic text-gray-600">{s.title}</p>
                    <p className="text-xs text-gray-400">{s.journal}</p>
                    <ul className="mt-3 space-y-1">
                      {s.findings.map((f, j) => (
                        <li key={j} className="text-sm text-gray-700 flex gap-2">
                          <span className="text-amber-600 shrink-0">→</span> {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Coalition Signup */}
        <div id="join" className="mt-16 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm sm:p-10">
          <h2 className="text-2xl font-bold text-gray-900">Join the Coalition</h2>
          <p className="mt-3 text-gray-600">
            Add your name to the list of dentists who agree that procedure codes
            should reflect material-specific clinical outcomes. No fees, no dues.
          </p>

          {status === "success" ? (
            <div className="mt-6 rounded-xl bg-green-50 p-6 text-center">
              <p className="text-lg font-semibold text-green-800">Thank you.</p>
              <p className="mt-1 text-sm text-green-700">
                Your name has been added to the coalition. You will receive no
                more than two emails per year — one to update coalition numbers,
                and one if a code change is proposed for review.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-medium text-gray-700">Full Name</span>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                    placeholder="Dr. Jane Smith"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-gray-700">Email Address</span>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                    placeholder="jane@practice.com"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-gray-700">
                    NPI Number{" "}
                    <span className="font-normal text-gray-400">(optional)</span>
                  </span>
                  <input
                    type="text"
                    value={form.npi}
                    onChange={(e) => setForm({ ...form, npi: e.target.value })}
                    className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                    placeholder="1234567890"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-gray-700">State</span>
                  <input
                    type="text"
                    required
                    value={form.state}
                    onChange={(e) => setForm({ ...form, state: e.target.value })}
                    className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                    placeholder="CA"
                    maxLength={2}
                  />
                </label>
              </div>

              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                />
                <span className="text-sm text-gray-600">
                  I agree that procedure codes should reflect material-specific
                  clinical outcomes.
                </span>
              </label>

              {status === "error" && (
                <p className="text-sm text-red-600">
                  Something went wrong. Please try again or email us directly.
                </p>
              )}

              <button
                type="submit"
                disabled={!agreed || status === "submitting"}
                className="rounded-xl bg-amber-500 px-6 py-3 text-sm font-semibold text-white hover:bg-amber-600 disabled:opacity-50"
              >
                {status === "submitting" ? "Submitting…" : "Join the Coalition"}
              </button>

              <p className="text-xs text-gray-400">
                Your information will only be used to demonstrate coalition
                membership to code committees. We will never share, sell, or
                publish your contact details. You will receive no more than two
                emails per year.
              </p>
            </form>
          )}
        </div>

        {/* Veracity */}
        <div className="mt-12 rounded-2xl border border-amber-200 bg-amber-50 p-8">
          <h2 className="text-xl font-bold text-gray-900">A Note on Veracity</h2>
          <p className="mt-3 text-sm text-gray-700 leading-relaxed">
            Section 3 of the ADA Principles of Ethics and Code of Professional
            Conduct states: "Dentists shall be honest in all dealings with
            patients." Veracity compels us to present patients with a truthful
            picture of their treatment options — including the expected longevity
            of each material. When the published evidence shows a 30-year gold
            restoration and a 7–10-year composite, withholding that information
            is not compatible with veracity.
          </p>
          <p className="mt-3 text-sm font-medium text-gray-800">
            We believe the codes should reflect this.
          </p>
        </div>
      </article>
    </main>
  );
}
