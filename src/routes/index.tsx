import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const navigate = useNavigate();

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/dentists" });
  };

  return (
    <div className="min-h-dvh">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-white to-amber-100/50">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:py-40">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-1.5 text-sm font-semibold text-amber-800">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-600" />
              </span>
              The curated marketplace for gold dentistry
            </span>
            <h1 className="mt-8 text-5xl font-bold tracking-tight text-gray-900 sm:text-7xl">
              Find a dentist who offers{" "}
              <span className="bg-gradient-to-r from-amber-500 to-yellow-600 bg-clip-text text-transparent">
                gold
              </span>{" "}
              restorations near you
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-gray-600 sm:text-2xl">
              GoldMatch connects patients who want gold crowns, bridges, inlays,
              and onlays with dentists who specialize in them. No more calling
              around — find the right provider in minutes.
            </p>

            {/* Quick search bar on hero */}
            <form onSubmit={handleQuickSearch} className="mt-10">
              <div className="mx-auto flex max-w-xl items-center gap-3">
                <div className="relative flex-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003h.001zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <input
                    type="text"
                    placeholder="Enter your city, state, or ZIP code..."
                    className="w-full rounded-xl border border-gray-300 bg-white py-4 pl-12 pr-4 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-4 text-lg font-semibold text-white shadow-lg shadow-amber-500/25 transition-all hover:bg-amber-600 hover:shadow-xl hover:shadow-amber-500/30"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Search
                </button>
              </div>
            </form>

            <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 rounded-xl border-2 border-amber-200 px-6 py-3 font-semibold text-amber-700 transition-all hover:border-amber-400 hover:bg-amber-50"
              >
                How It Works
              </a>
              <Link
                to="/dentists"
                className="text-sm font-medium text-amber-600 hover:text-amber-700"
              >
                Browse all {""} dentists →
              </Link>
            </div>
            <p className="mt-4 text-sm text-gray-400">
              Free for patients. No account required to search.
            </p>
          </div>
        </div>

        <div className="absolute -top-40 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-amber-200/20 blur-3xl" />
        <div className="absolute -bottom-20 left-0 -z-10 h-[400px] w-[400px] rounded-full bg-yellow-100/30 blur-3xl" />
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              How GoldMatch works
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Three simple steps to find the right gold dentist for you.
            </p>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-3">
            {[
              {
                step: "1",
                title: "Search by location",
                desc: "Enter your city, state, or ZIP code to find gold dentistry specialists near you — or anywhere you're willing to travel.",
              },
              {
                step: "2",
                title: "Filter by service",
                desc: "Looking for gold crowns? Bridges? Inlays or onlays? Filter results to find exactly the specialist you need.",
              },
              {
                step: "3",
                title: "Connect directly",
                desc: "View full practice profiles, read bios, and send a connection request. Free and no commitment.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="relative rounded-2xl border border-gray-100 bg-gray-50/50 p-8 transition-shadow hover:shadow-md"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500 text-lg font-bold text-white">
                  {item.step}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Patients */}
      <section className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Gold isn't just classic — it's clinically superior
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-gray-600">
                Dental gold alloys have been the gold standard (literally) for
                over a century. They're biocompatible, incredibly durable
                (lasting 30+ years), and gentle on opposing teeth. Unlike
                porcelain, gold won't chip or fracture — and it wears at the
                same rate as natural enamel.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Lasts 2-3× longer than porcelain restorations",
                  "Minimal tooth preparation preserves more healthy structure",
                  "Perfect marginal fit reduces decay risk",
                  "Biocompatible — ideal for patients with metal sensitivities",
                  "No chipping, no fracturing, no surprises",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-gray-700">
                    <svg
                      className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-amber-500/10 p-8 sm:p-12">
              <blockquote className="text-lg font-medium text-gray-900">
                "I drove 3 hours for my gold crowns and it was worth every mile.
                GoldMatch saved me from calling a dozen offices."
              </blockquote>
              <p className="mt-4 text-sm text-gray-500">
                — GoldMatch patient, Austin TX
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials / Stats */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Why patients choose gold
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Gold restorations have stood the test of time — and for good reason.
            </p>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: "30+", label: "Year average lifespan" },
              { value: "0.1%", label: "Fracture rate (vs. 7% for porcelain)" },
              { value: "97%", label: "Survival rate at 15 years" },
              { value: "50+", label: "Dentists listed on GoldMatch" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-gray-100 bg-gray-50/50 p-6 text-center"
              >
                <p className="text-4xl font-bold text-amber-500">{stat.value}</p>
                <p className="mt-2 text-sm text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              {
                quote:
                  "My gold inlays from Dr. Chen have been going strong for 18 years. Best dental decision I ever made.",
                author: "Sarah L., San Francisco",
              },
              {
                quote:
                  "I found a gold specialist 45 minutes from home who did beautiful work. The directory made it so easy.",
                author: "Michael R., Nashville",
              },
              {
                quote:
                  "After two failed porcelain crowns, I switched to gold on the recommendation of a GoldMatch dentist. Zero issues since.",
                author: "Pat D., Chicago",
              },
            ].map((t) => (
              <div
                key={t.author}
                className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
              >
                <svg
                  className="h-8 w-8 text-amber-300"
                  fill="currentColor"
                  viewBox="0 0 32 32"
                >
                  <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-1.1.9-2 2-2V8zm12 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.1.9-2 2-2V8z" />
                </svg>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">
                  "{t.quote}"
                </p>
                <p className="mt-3 text-xs font-medium text-gray-500">
                  — {t.author}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Dentists */}
      <section className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Are you a dentist who offers gold work?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              List your practice on GoldMatch and connect with patients actively
              seeking the gold restorations you provide.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Qualified leads",
                desc: "Every inquiry comes from a patient who specifically wants gold work — no tire-kickers, no insurance-only shoppers.",
              },
              {
                title: "Highlight your specialty",
                desc: "Showcase your gold crown, bridge, inlay, and onlay expertise. Patients filter by services — they'll find you.",
              },
              {
                title: "One-time fee",
                desc: "A single, affordable listing fee. No commissions, no monthly charges, no per-lead costs.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-gray-200 bg-white p-6"
              >
                <h3 className="font-semibold text-gray-900">{item.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              to="/for-dentists"
              className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-3 font-semibold text-white shadow-md transition-all hover:bg-amber-600"
            >
              Learn More
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-12">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} GoldMatch. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
