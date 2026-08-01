import { createFileRoute, Link } from "@tanstack/react-router";
import { trackPageView } from "../api/analytics";

export const Route = createFileRoute("/versalius/world")({
  loader: () => {
    trackPageView({ data: { path: "/versalius/world" } }).catch(() => {});
  },
  component: WorldBible,
});

const glossary = [
  {
    term: "The Front Line",
    category: "Battleground",
    desc: "The margin — the interface where restorative material meets natural tooth structure. This is the most critical zone in dentistry. A sealed margin means no bacterial infiltration; a compromised margin means recurrent decay, sensitivity, and eventual restoration failure. In Versalius Mundi, the Front Line is where every battle is won or lost.",
    related: ["Margin Contract", "Aureal", "Compo"],
  },
  {
    term: "Margin Contract",
    category: "Core Concept",
    desc: "The sacred bond between restorative material and tooth. When sealed perfectly — as with a well-placed gold restoration — the contract holds for 30+ years. No bacteria can cross. When compromised — as with polymerization shrinkage in composite — micro-gaps form, pH drops, and the invasion begins. The Margin Contract is the central conflict of Versalius Mundi.",
    related: ["Aureal", "Front Line", "Shrinkage Vulnerability Zone"],
  },
  {
    term: "Shrinkage Vulnerability Zone (SVZ)",
    category: "Hazard Zone",
    desc: "The microscopic gap that forms when composite resin cures and shrinks by 2-5% by volume. This pulls the material away from the cavity walls, creating pathways for bacteria, fluids, and acids. The SVZ is Compo's fatal flaw — invisible to the naked eye, devastating at the microscopic scale. Gold does not shrink and therefore has no SVZ.",
    related: ["Compo", "Front Line", "TOOB"],
  },
  {
    term: "TOOB (The Order of Oralis Bacteria)",
    category: "Antagonist Force",
    desc: "The collective of acidogenic bacteria — primarily Mutans Streptococci — that organize at every breach in the margin. TOOB doesn't need a big door; a microscopic gap is all the invitation they require. When pH drops, TOOB feasts and multiplies. In Versalius Mundi, TOOB is a swarming villain, not a passive anatomical feature.",
    related: ["Front Line", "SVZ", "sePHen"],
  },
  {
    term: "pH Critical Threshold (5.5)",
    category: "Science",
    desc: "The pH level below which tooth enamel and dentin begin to demineralize. Normal oral pH is around 7.0. When acidogenic bacteria metabolize sugars in a leaking margin, pH can plummet to 4.5 or lower. sePHen monitors pH continuously at the Front Line. When it drops below 5.5, alarm bells ring.",
    related: ["sePHen", "Front Line", "TOOB"],
  },
  {
    term: "The Veneer",
    category: "Hidden System",
    desc: "The Veneer is the systemic force behind commoditized dentistry — the insurance algorithms, the profit machinery, the apparatus that makes short-term restorations the default. It appears beautiful, polished, and inevitable on the surface. But underneath, it conceals the erosion of patient sovereignty and the suppression of clinical choice. The Veneer is why patients are rarely offered gold — not because it's inferior, but because it breaks the cycle of repeat treatments.",
    related: ["Tech Sycophant", "Ledger King", "Patient Sovereignty"],
  },
  {
    term: "Polymerization Shrinkage",
    category: "Material Science",
    desc: "The volumetric contraction that occurs when composite resin monomers link into polymer chains during curing. Modern composites shrink 2-5%, pulling away from cavity walls and creating the Shrinkage Vulnerability Zone. This is Compo's tragic flaw — not a moral failing, but a chemical inevitability. Gold, by contrast, undergoes no polymerization and no shrinkage.",
    related: ["Compo", "SVZ", "Margin Contract"],
  },
  {
    term: "The Reimbursement Cycle",
    category: "Economics",
    desc: "The insurance-driven pattern where cheaper, shorter-lasting restorations are incentivized because they guarantee future treatment. Composite lasts 7-10 years, then needs replacement (often larger). The cycle: fill → fail → refill → crown → extract → implant. Tech Sycophant and Ledger King profit from this cycle. Aureal breaks it by lasting 30+ years.",
    related: ["Tech Sycophant", "Ledger King", "Aureal"],
  },
  {
    term: "Patient Sovereignty",
    category: "Ethics",
    desc: "The principle that patients have the right to choose the most durable, longest-lasting treatment — not just what insurance covers. In Versalius Mundi, patient sovereignty is the ultimate stake. When patients understand the Margin Contract, they can demand gold. Education is the first line of defense.",
    related: ["Aureal", "Margin Contract", "The Veneer"],
  },
];

export default function WorldBible() {
  return (
    <div className="min-h-dvh bg-[#0A1628] text-white font-outfit">
      <div className="mx-auto max-w-4xl px-6 py-20">
        <Link
          to="/versalius"
          className="text-sm text-[#C8910B]/60 transition-colors hover:text-[#C8910B]"
        >
          ← Versalius Mundi
        </Link>
        <h1 className="mt-4 font-bangers text-5xl tracking-wider text-white sm:text-6xl">
          The World Bible
        </h1>
        <p className="mt-3 text-lg leading-relaxed text-blue-200/70">
          A glossary of the people, places, forces, and concepts that shape the
          universe of Versalius Mundi. Everything here is rooted in real dental
          science — the characters are the metaphor.
        </p>

        <div className="mt-12 space-y-8">
          {glossary.map((entry) => (
            <div
              key={entry.term}
              className="rounded-2xl border border-[#1A3A7A]/40 bg-[#0D1B3E]/50 p-6 sm:p-8"
            >
              <div className="flex items-center gap-3">
                <h2 className="font-bangers text-xl tracking-wide text-white">{entry.term}</h2>
                <span className="rounded-full border border-[#C8910B]/30 bg-[#C8910B]/10 px-2.5 py-0.5 text-xs font-medium text-[#C8910B]">
                  {entry.category}
                </span>
              </div>
              <p className="mt-4 leading-relaxed text-blue-100/70">
                {entry.desc}
              </p>
              {entry.related.length > 0 && (
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span className="text-xs text-blue-200/40">Related:</span>
                  {entry.related.map((r) => (
                    <span
                      key={r}
                      className="rounded-full border border-[#1A3A7A]/40 bg-[#0A1628]/50 px-2.5 py-0.5 text-xs text-blue-200/60"
                    >
                      {r}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 flex items-center justify-between border-t border-[#1A3A7A]/40 pt-8">
          <Link
            to="/versalius/characters"
            className="text-sm font-semibold text-[#C8910B] transition-colors hover:text-[#C8910B]/80"
          >
            ← Character Gallery
          </Link>
          <Link
            to="/versalius/episodes/0"
            className="text-sm font-semibold text-[#C8910B] transition-colors hover:text-[#C8910B]/80"
          >
            Watch Episode 0 →
          </Link>
        </div>
      </div>
    </div>
  );
}
