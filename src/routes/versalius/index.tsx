import { createFileRoute, Link } from "@tanstack/react-router";
import { trackPageView } from "../api/analytics";

export const Route = createFileRoute("/versalius/")({
  loader: () => {
    trackPageView({ data: { path: "/versalius" } }).catch(() => {});
  },
  component: VersaliusLanding,
});

const characters = [
  {
    name: "Enamel Demure",
    title: "The Crystalline Guardian",
    desc: "First line of defense — crystalline armor of pure hydroxyapatite, regal and luminous.",
    gradient: "from-blue-200 via-white to-blue-100",
    hasArt: false,
  },
  {
    name: "Aureal",
    title: "The Gold Elemental",
    desc: "Gold alloy hero. 'I don't shrink. I don't leak. I endure.'",
    gradient: "from-[#C8910B] to-amber-600",
    hasArt: true,
    art: "/versalius/art/aureal-portrait.png",
  },
  {
    name: "Compo",
    title: "The Composite Filler",
    desc: "Fast and aesthetic, but polymerization shrinkage opens a gap bacteria exploit.",
    gradient: "from-gray-400 to-gray-500",
    hasArt: true,
    art: "/versalius/art/compo-portrait.png",
  },
  {
    name: "The Veneer",
    title: "The Hidden Force",
    desc: "Insurance systems, profit machinery — appears beautiful, conceals decay.",
    gradient: "from-[#7C3AED] to-violet-900",
    hasArt: false,
  },
];

export default function VersaliusLanding() {
  return (
    <div className="min-h-dvh bg-[#0A1628] text-white font-outfit">
      {/* In Production banner */}
      <div className="border-b border-[#C8910B]/30 bg-gradient-to-r from-[#C8910B]/15 via-[#E5B83C]/10 to-[#C8910B]/15 px-6 py-3 text-center">
        <span className="inline-flex flex-wrap items-center justify-center gap-2 text-sm font-semibold tracking-wide text-[#C8910B]">
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <circle cx="12" cy="12" r="9" />
            <path strokeLinecap="round" d="M12 7v5l3 3" />
          </svg>
          In Production — episodes coming soon. Meet the world while we build.
        </span>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden px-6 py-24 sm:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A73E8]/10 via-[#0A1628] to-[#0A1628]" />
        <div className="absolute -top-40 right-0 h-96 w-96 rounded-full bg-[#C8910B]/10 blur-3xl" />
        <div className="absolute -bottom-20 left-0 h-80 w-80 rounded-full bg-[#1A73E8]/10 blur-3xl" />
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="font-outfit text-sm font-medium uppercase tracking-widest text-[#C8910B]">
            An Animated Series
          </p>
          <h1 className="mt-4 font-bangers text-7xl tracking-wider sm:text-8xl">
            <span className="bg-gradient-to-r from-[#C8910B] via-[#E5B83C] to-[#C8910B] bg-clip-text text-transparent">
              Versalius Mundi
            </span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-blue-200/80 max-w-2xl mx-auto">
            Enter the microscopic battlefield inside every tooth. Where dental
            materials become superheroes, bacteria launch invasions, and the
            patient's sovereignty hangs in the balance. This is the story your
            dentist never told you.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              to="/versalius/episodes/0"
              className="inline-flex items-center gap-2 rounded-full bg-[#C8910B] px-8 py-4 font-bangers text-lg tracking-wider text-[#0A1628] shadow-lg shadow-[#C8910B]/25 transition-all hover:bg-[#E5B83C]"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                  clipRule="evenodd"
                />
              </svg>
              Explore &ldquo;The Long Defense&rdquo; pilot
            </Link>
            <Link
              to="/versalius/characters"
              className="rounded-full border border-[#1A73E8]/40 px-8 py-4 font-outfit font-semibold text-blue-200 transition-all hover:border-[#1A73E8] hover:text-white"
            >
              Meet the Characters
            </Link>
          </div>
        </div>
      </section>

      {/* Character Preview Cards */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center font-bangers text-4xl tracking-wider text-white">
            The Cast of Versalius Mundi
          </h2>
          <p className="mt-3 text-center text-blue-200/60 font-outfit">
            Heroes, villains, and everything in between — all at microscopic
            scale.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {characters.map((char) => (
              <div
                key={char.name}
                className="group relative overflow-hidden rounded-2xl border border-[#1A3A7A]/40 bg-[#0D1B3E]/50 p-6 transition-all hover:border-[#1A73E8]/60 hover:bg-[#0D1B3E]"
              >
                <div
                  className={`flex h-40 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br ${char.gradient}`}
                >
                  {char.hasArt ? (
                    <img
                      src={char.art}
                      alt={char.name}
                      className="h-full w-full object-cover opacity-90"
                    />
                  ) : (
                    <span className="font-bangers text-4xl text-white/30">
                      {char.name[0]}
                    </span>
                  )}
                </div>
                <h3 className="mt-4 font-bangers text-lg tracking-wide text-white">
                  {char.name}
                </h3>
                <p className="mt-1 text-sm font-semibold text-[#C8910B]/80">
                  {char.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-blue-100/60">
                  {char.desc}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              to="/versalius/characters"
              className="text-sm font-semibold text-[#C8910B] transition-colors hover:text-[#C8910B]/80"
            >
              View full character gallery →
            </Link>
          </div>
        </div>
      </section>

      {/* World Bible Teaser */}
      <section className="border-t border-[#1A3A7A]/40 px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-bangers text-4xl tracking-wider text-white">
            Explore the World
          </h2>
          <p className="mt-3 text-blue-200/60 font-outfit">
            Understand the Front Line, the Margin Contract, and the forces that
            shape every restoration.
          </p>
          <Link
            to="/versalius/world"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#C8910B]/30 bg-[#C8910B]/10 px-6 py-3 text-sm font-semibold text-[#C8910B] transition-all hover:bg-[#C8910B]/20"
          >
            📖 Open the World Bible
          </Link>
        </div>
      </section>

      {/* Footer link back */}
      <div className="border-t border-[#1A3A7A]/40 px-6 py-8 text-center">
        <Link
          to="/"
          className="text-sm text-blue-200/30 transition-colors hover:text-blue-200/60"
        >
          ← Back to Gold Dentistry Network
        </Link>
      </div>
    </div>
  );
}
