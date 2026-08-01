import { createFileRoute, Link } from "@tanstack/react-router";
import { trackPageView } from "../api/analytics";

export const Route = createFileRoute("/versalius/characters")({
  loader: () => {
    trackPageView({ data: { path: "/versalius/characters" } }).catch(() => {});
  },
  component: CharactersPage,
});

const allCharacters = [
  {
    name: "Enamel Demure",
    title: "The Crystalline Guardian",
    alignment: "Hero",
    desc: "Enamel Demure is the first line of defense — a crystalline armor of pure hydroxyapatite, regal and luminous. She stands at the outermost perimeter, absorbing the first blows of acid, sugar, and bacteria. When she falls, the battle moves inward.",
    abilities: ["Crystalline Armor", "First-Strike Absorption", "Remineralization Recall", "Translucent Majesty"],
    gradient: "from-blue-200 via-white to-blue-100",
    hasArt: true,
    art: "/versalius/art/enamel-demure.png",
    quote: "I am the wall. Behind me, everything is vulnerable.",
  },
  {
    name: "Aureal",
    title: "The Gold Elemental",
    alignment: "Hero",
    desc: "Aureal is the embodiment of gold dental alloy — noble, precise, and unyielding. She stands no taller than a toothbrush bristle, but her presence fills the margin zone. At the Front Line, size is irrelevant. Integrity is everything. When the Margin Contract is threatened, Aureal seals it with permanence that lasts decades. No shrinkage, no corrosion, no compromise.",
    abilities: ["Perfect Marginal Seal", "30+ Year Durability", "Biocompatible Aura", "Wears at Enamel's Pace"],
    gradient: "from-[#C8910B] to-amber-600",
    hasArt: true,
    art: "/versalius/art/aureal-portrait.png",
    quote: "I don't shrink. I don't leak. I endure.",
  },
  {
    name: "Denteen",
    title: "The Sensitive Youth",
    alignment: "Hero (Protected)",
    desc: "Denteen is the dentin — younger, softer, protected by Enamel Demure above. He feels everything through his tubule senses: hot, cold, sweet, pressure. When the enamel is breached, Denteen is the first to know — and the first to scream.",
    abilities: ["Shock Absorption", "Tubule Sensitivity", "Deep Connection", "Regenerative Potential"],
    gradient: "from-yellow-100 via-amber-50 to-orange-100",
    hasArt: true,
    art: "/versalius/art/denteen.png",
    quote: "I feel everything. When the wall cracks, I know before anyone else.",
  },
  {
    name: "Compo",
    title: "The Composite Filler",
    alignment: "Hero (Flawed)",
    desc: "Compo is fast, aesthetic, and insurance-approved. But his bonds are vulnerable — when moisture seeps in and polymerization shrinkage strikes, the margin opens and the bacteria return. A tragic hero fighting his own chemistry.",
    abilities: ["Tooth-Matched Camouflage", "Rapid Bonding", "Minimal Prep Required", "Shrinkage Vulnerability"],
    gradient: "from-gray-400 to-gray-500",
    hasArt: true,
    art: "/versalius/art/compo-portrait.png",
    quote: "That little gap... it only got wider.",
  },
  {
    name: "sePHen",
    title: "The pH Scout",
    alignment: "Neutral Guide",
    desc: "sePHen reads the acidity at the Front Line with uncanny precision. When pH drops below 5.5 — the critical threshold — she warns of incoming demineralization. Her color shifts to alarm-red when danger strikes.",
    abilities: ["pH Sensing", "Demineralization Foresight", "Buffer Capacity Analysis", "Color-Shift Warning"],
    gradient: "from-green-400 to-teal-500",
    hasArt: true,
    art: "/versalius/art/sephen-portrait.png",
    quote: "...They didn't ask.",
  },
  {
    name: "Tech Sycophant",
    title: "The Dentist",
    alignment: "Antagonist → Redemption Arc",
    desc: "Tech Sycophant is the dentist — torn between what insurance covers and what the evidence shows. In 'The Long Defense,' he faces the comparison: same mouth, same forces, same time — two different outcomes. He makes the choice to tell the truth.",
    abilities: ["Clinical Authority", "Insurance Navigation", "Evidence-Based Reckoning", "The Hard Conversation"],
    gradient: "from-blue-500 to-indigo-600",
    hasArt: false,
    quote: "The gold next to it... that's the comparison that matters.",
  },
  {
    name: "TOOB",
    title: "The Order of Oralis Bacteria",
    alignment: "Villain",
    desc: "TOOB is the Order of Oralis Bacteria — Mutans Streptococci and their allies — organizing at every breach point. They don't need a big door; a microscopic gap at the margin is all the invitation they require. When the pH drops, TOOB feasts.",
    abilities: ["Acidogenic Swarming", "Biofilm Fortress", "Margin Breach Exploitation", "Pulp Invasion Route"],
    gradient: "from-red-500 to-rose-700",
    hasArt: false,
    quote: "A crack is an invitation. We accepted.",
  },
  {
    name: "The Veneer",
    title: "The Hidden Force",
    alignment: "Antagonist",
    desc: "The Veneer is the hidden force behind commoditized dentistry — insurance systems, profit machinery, the apparatus that makes short-term restorations the default. It appears beautiful, polished, inevitable. But underneath, it conceals the decay of patient sovereignty and the erosion of clinical choice.",
    abilities: ["Aesthetic Deception", "Systemic Lock-In", "Default Bias", "Longevity Suppression"],
    gradient: "from-[#7C3AED] to-violet-900",
    hasArt: true,
    art: "/versalius/art/the-veneer.png",
    quote: "Beautiful on the surface. Decay runs deep.",
  },
  {
    name: "Ledger King",
    title: "The Insurance Shadow Echo",
    alignment: "Villain",
    desc: "Ledger King keeps the books on every restoration. He profits from the cycle: fill, fail, refill, crown, extract. Appears as a shadow echo whispering 'keep it simple, keep it profitable.' He fears Aureal because gold breaks his spreadsheet.",
    abilities: ["Recurring Revenue Model", "Obsolescence Planning", "Prior Authorization Whisper", "Longevity Suppression"],
    gradient: "from-emerald-600 to-green-900",
    hasArt: false,
    quote: "Keep it simple. Keep it profitable.",
  },
  {
    name: "Martha",
    title: "The Patient",
    alignment: "Human",
    desc: "Martha, 68, is sharp and a little skeptical. Two fillings placed 30 years ago — one she forgets about, the other reminds her it's there. She is every patient who deserves to know the difference between a filling and a defense.",
    abilities: ["Patient Sovereignty", "Body Awareness", "Asks the Right Questions", "30-Year Perspective"],
    gradient: "from-sky-400 to-blue-600",
    hasArt: false,
    quote: "And the other one?",
  },
  {
    name: "Masseter Muscle",
    title: "The Chewing Force",
    alignment: "Neutral Force",
    desc: "The Masseter Muscle is the relentless, rhythmic crushing force that tests every restoration, every day, for decades. Animated as a powerful, mechanical entity — not malicious, but indifferent. It doesn't care what material you chose.",
    abilities: ["Rhythmic Crushing Force", "30-Year Endurance Test", "Margin Stress Amplifier", "Indifferent to Material Choice"],
    gradient: "from-orange-500 to-red-600",
    hasArt: false,
    quote: "No quote. It just chews.",
  },
];

export default function CharactersPage() {
  return (
    <div className="min-h-dvh bg-[#0A1628] text-white font-outfit">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="text-center">
          <Link
            to="/versalius"
            className="text-sm text-[#C8910B]/60 transition-colors hover:text-[#C8910B]"
          >
            ← Versalius Mundi
          </Link>
          <h1 className="mt-4 font-bangers text-5xl tracking-wider text-white sm:text-6xl">
            Character Gallery
          </h1>
          <p className="mt-3 text-lg text-blue-200/70 font-outfit">
            Every dental material, every biological force, and every economic
            pressure has a face in Versalius Mundi.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {allCharacters.map((char) => (
            <div
              key={char.name}
              className="overflow-hidden rounded-2xl border border-[#1A3A7A]/40 bg-[#0D1B3E]/50 transition-all hover:border-[#1A73E8]/60"
            >
              <div className="grid sm:grid-cols-5">
                <div
                  className={`flex items-center justify-center bg-gradient-to-br ${char.gradient} p-3 sm:col-span-2`}
                >
                  {char.hasArt ? (
                    <img
                      src={char.art}
                      alt={`${char.name} portrait`}
                      className="h-auto w-full rounded-lg object-contain max-h-[400px]"
                    />
                  ) : (
                    <div className="text-center">
                      <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-white/10 text-4xl font-bold text-white/40 font-bangers">
                        {char.name[0]}
                      </div>
                      <p className="mt-2 text-xs font-medium uppercase tracking-widest text-white/50">
                        Art Coming
                      </p>
                    </div>
                  )}
                </div>
                <div className="sm:col-span-3 p-6 sm:p-8">
                  <div className="flex items-center gap-3">
                    <h2 className="font-bangers text-xl tracking-wide text-white">
                      {char.name}
                    </h2>
                    <span className="rounded-full bg-[#0A1628] px-2.5 py-0.5 text-xs font-medium text-blue-200/60">
                      {char.alignment}
                    </span>
                  </div>
                  <p className="mt-1 text-sm font-semibold text-[#C8910B]">
                    {char.title}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-blue-100/70">
                    {char.desc}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {char.abilities.map((a) => (
                      <span
                        key={a}
                        className="rounded-full border border-[#1A3A7A]/40 bg-[#0A1628]/50 px-3 py-1 text-xs text-blue-200/60"
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                  {char.quote && (
                    <blockquote className="mt-4 border-l-2 border-[#C8910B]/40 pl-4 text-sm italic text-blue-200/40">
                      &ldquo;{char.quote}&rdquo;
                    </blockquote>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            to="/versalius/world"
            className="text-sm font-semibold text-[#C8910B] transition-colors hover:text-[#C8910B]/80"
          >
            Explore the World Bible →
          </Link>
        </div>
      </div>
    </div>
  );
}
