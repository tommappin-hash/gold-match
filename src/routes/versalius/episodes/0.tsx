import { createFileRoute, Link } from "@tanstack/react-router";
import { trackPageView } from "../../api/analytics";

export const Route = createFileRoute("/versalius/episodes/0")({
  loader: () => {
    trackPageView({ data: { path: "/versalius/episodes/0" } }).catch(() => {});
  },
  component: EpisodeZero,
});

const beats = [
  {
    title: "Establish: The Patient Arrives",
    time: "0:00–0:25",
    desc: "MARTHA (68, sharp, a little skeptical) settles into the chair. Tech Sycophant (the dentist) reviews her chart. Ledger King's ghost-image flickers faintly in the corner of the screen. Martha mentions two old fillings — one she forgets about, the other 'reminds me it's there.'",
    textCard: "The difference between a filling and a defense.",
  },
  {
    title: "The Flashback — 30 Years Ago",
    time: "0:25–0:55",
    desc: "Young Tech Sycophant explains the new composite: tooth-colored, insurance-covered. COMPO appears — young, eager. 'I've got this.' AUREAL appears in the background, watching — the gold option was never offered. As Compo cures, a tiny gap forms at the shrinkage zone. sePHen mutters: '...They didn't ask.'",
    textCard: "Some compromises you feel. Some you don't.",
  },
  {
    title: "The Margin War — 30 Years of Battle",
    time: "0:55–1:25",
    desc: "Zoom IN to microscopic. Montage: chewing forces, sugar cascade, pH plunge (sePHen shrieks, color shifts to alarm-red), TOOB swarming at the gap. Compo, battered: 'That little gap... it only got wider.' The Shrinkage Vulnerability Zone is now visible.",
    textCard: "Bacteria don't need a big door. A crack is an invitation.",
  },
  {
    title: "Two Fillings, Two Stories",
    time: "1:25–2:00",
    desc: "Tech Sycophant examines: 'The margin has started to open up.' Martha asks about the other one. The gold inlay appears — placed 30 years ago. AUREAL stands beside it: 'I don't shrink. I don't leak. I endure.' Zero gap. Perfect seal. The comparison matters.",
    textCard: "One defense lasted 30 years. The other is asking to be replaced.",
  },
  {
    title: "Tech Sycophant's Choice",
    time: "2:00–2:35",
    desc: "Ledger King whispers: 'Keep it simple. Keep it profitable.' Tech Sycophant hesitates, then looks at the screen: Compo, exhausted. Aureal, unchanged. He makes the choice: 'Same mouth, same forces, same time. Different outcomes.' The Margin Contract widget appears.",
    textCard: "Whatever we do next, you're part of the defense.",
  },
  {
    title: "Close: The Long Defense",
    time: "2:35–3:00",
    desc: "AUREAL addresses the viewer: 'Your teeth are not commodities. Your restorations are not equivalents. The margin is where the war begins. And you are the commander — whether you were told so or not.' Final shot: Aureal's glow holds the line. Perfect. Thirty years.",
    textCard: "Gold Dentistry Network / Versalius Mundi — Episode 1: The Margin Contract — coming soon",
  },
];

const appearances = [
  { name: "Martha", role: "Patient, 68 — sharp, skeptical" },
  { name: "Tech Sycophant", role: "Present-day dentist + flashback cameo" },
  { name: "Aureal", role: "Gold elemental — full speak at end" },
  { name: "Compo", role: "Composite — flashback + present battle" },
  { name: "sePHen", role: "pH scout — color-shift warning" },
  { name: "TOOB", role: "Order of Oralis Bacteria — swarming" },
  { name: "Ledger King", role: "Insurance shadow echo" },
  { name: "Masseter Muscle", role: "Rhythmic chewing forces" },
];

export default function EpisodeZero() {
  return (
    <div className="min-h-dvh bg-[#0A1628] text-white font-outfit">
      <div className="mx-auto max-w-4xl px-6 py-20">
        <Link
          to="/versalius"
          className="text-sm text-[#C8910B]/60 transition-colors hover:text-[#C8910B]"
        >
          ← Versalius Mundi
        </Link>

        <div className="mt-6">
          <p className="font-outfit text-sm font-medium uppercase tracking-widest text-[#C8910B]">
            Episode 0 — Pilot
          </p>
          <h1 className="mt-2 font-bangers text-5xl tracking-wider text-white sm:text-6xl">
            The Long Defense
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-blue-200/80">
            Martha has two fillings placed 30 years ago. One she forgets about. The
            other reminds her it's there every time she flosses. Same mouth, same
            forces, same time — two different outcomes. This is the story of why.
          </p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-blue-200/40">
            <span>⏱️ ~3–4 minutes</span>
            <span>🎬 Motion storyboard, 9:16 vertical</span>
            <span>📅 In Production</span>
          </div>
        </div>

        {/* Video Placeholder */}
        <div className="mt-10 overflow-hidden rounded-2xl border border-[#1A3A7A]/40 bg-[#0D1B3E]">
          <div className="flex aspect-[9/16] max-h-[640px] items-center justify-center bg-gradient-to-br from-[#0D1B3E] via-[#0A1628] to-[#11244D] mx-auto">
            <div className="text-center px-6">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#C8910B]/20 ring-1 ring-[#C8910B]/30">
                <svg
                  className="h-10 w-10 text-[#C8910B]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <p className="mt-4 font-bangers text-2xl tracking-wide text-white">
                &ldquo;The Long Defense&rdquo; — In Production
              </p>
              <p className="mt-1 text-sm text-blue-200/50">
                Motion storyboard. Format: 9:16 vertical. Runtime: ~3–4 min.
              </p>
              <p className="mt-2 text-xs italic text-[#C8910B]/70 font-outfit">
                &ldquo;The margin is where the war begins.&rdquo; — Aureal
              </p>
            </div>
          </div>
        </div>

        {/* Beat-by-Beat Summary */}
        <section className="mt-16">
          <h2 className="font-bangers text-3xl tracking-wider text-white">
            Beat-by-Beat Summary
          </h2>
          <p className="mt-2 text-sm text-blue-200/40">
            Adapted from the pilot script &ldquo;The Long Defense&rdquo; by Reid.
          </p>
          <div className="mt-8 space-y-6">
            {beats.map((beat, i) => (
              <div
                key={i}
                className="rounded-xl border border-[#1A3A7A]/40 bg-[#0D1B3E]/50 p-5"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#C8910B]/10 text-sm font-bold text-[#C8910B] font-bangers">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-outfit font-semibold text-white">{beat.title}</h3>
                      <span className="rounded-full border border-[#1A3A7A]/40 bg-[#0A1628] px-2 py-0.5 text-xs text-blue-200/40">
                        {beat.time}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-blue-100/70">
                      {beat.desc}
                    </p>
                    {beat.textCard && (
                      <div className="mt-3 border-l-2 border-[#C8910B]/40 pl-4">
                        <p className="font-outfit text-xs font-medium uppercase tracking-wider text-[#C8910B]/80">
                          Text Card
                        </p>
                        <p className="mt-0.5 text-sm italic text-blue-100/50">
                          &ldquo;{beat.textCard}&rdquo;
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Character Appearances */}
        <section className="mt-16">
          <h2 className="font-bangers text-3xl tracking-wider text-white">
            Characters in This Episode
          </h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {appearances.map((char) => (
              <div
                key={char.name}
                className="flex items-center gap-3 rounded-lg border border-[#1A3A7A]/40 bg-[#0D1B3E]/50 p-4"
              >
                <div className="h-10 w-10 flex-shrink-0 rounded-full bg-[#0A1628] flex items-center justify-center font-bangers text-sm text-[#C8910B]">
                  {char.name[0]}
                </div>
                <div>
                  <p className="font-outfit font-semibold text-white">{char.name}</p>
                  <p className="text-xs text-blue-200/40">{char.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Navigation */}
        <div className="mt-16 flex items-center justify-between border-t border-[#1A3A7A]/40 pt-8">
          <span className="text-sm text-blue-200/20">← Previous</span>
          <Link
            to="/versalius/characters"
            className="text-sm font-semibold text-[#C8910B] transition-colors hover:text-[#C8910B]/80"
          >
            Meet the Characters →
          </Link>
        </div>
      </div>
    </div>
  );
}
