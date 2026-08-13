import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/blog/")({ component: BlogIndex });

function BlogIndex() {
  const posts = [
    {
      id: "the-margin",
      title: "The Margin: Dentistry's Billion-Dollar Blind Spot",
      date: "August 2026",
      excerpt:
        "The filling material is not the weakest link; it's the second, if it's composite. The real failure happens at the margin.",
    },
    {
      id: "the-substitute",
      title: "The Substitute: What We Traded Away",
      date: "August 2026",
      excerpt:
        "Every substitute for gold widened the margin. The intentions were good. The physics didn't cooperate. It's time for a course correction.",
    },
  ];

  return (
    <main className="min-h-dvh bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link
            to="/"
            className="text-lg font-bold text-gray-900"
          >
            Gold <span className="text-amber-500">Dentistry</span> Network
          </Link>
          <Link
            to="/"
            className="text-sm font-medium text-gray-600 hover:text-amber-600"
          >
            Back to home
          </Link>
        </div>
      </header>

      {/* Section header */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <p className="text-sm font-semibold uppercase tracking-widest text-amber-600">
          Patient education
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          The Gold Dentistry Journal
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-gray-600">
          Clear, practical education about durable first treatment for caries
          and the materials that make it possible.
        </p>

        {/* Article 1 — inlined full content */}
        <article className="mt-12 max-w-3xl">
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm sm:p-10">
            <p className="text-sm text-gray-500">{posts[0].date}</p>
            <h2 className="mt-3 text-2xl font-bold text-gray-900 sm:text-3xl">
              {posts[0].title}
            </h2>
            <p className="mt-4 text-gray-600">{posts[0].excerpt}</p>
            <Link to="/blog/the-margin" className="mt-5 inline-flex font-semibold text-amber-700 hover:text-amber-800">Read more →</Link>

            {/* Full article body */}
            <div className="prose prose-gray mt-8 max-w-none text-gray-700">
              <p className="text-xl leading-relaxed text-gray-600">
                When you get a cavity filled, what are you actually paying for?
              </p>

              <p>
                Most people would say "a filling." But that's not quite right.
                What you're really paying for is a <strong>seal</strong> — a
                barrier between your tooth and the bacteria that want to destroy
                it.
              </p>
              <p>
                Here's what nobody tells you: the filling material is not the
                weakest link; it's the second, if it's composite. It's the{" "}
                <strong>gap</strong> between the filling and the tooth that
                fails. That gap is called the margin. And the margin is where
                dentistry's billion-dollar blind spot lives.
              </p>

              <figure className="my-8">
                <img
                  src="/images/onlay-18-in-vivo-2.jfif"
                  alt="Gold onlay in vivo — tooth #18 with milled gold restoration showing margin integrity at the gumline"
                  className="w-full rounded-xl border border-gray-200 shadow-sm"
                />
                <figcaption className="mt-3 text-center text-sm text-gray-400">
                  Milled gold onlay, tooth #18. The margin — where the restoration
                  meets the tooth — is invisible to the naked eye at less than 12
                  microns. That's where the battle against recurrent decay is won
                  or lost. Photo: Dr. Jake Modrey.
                </figcaption>
              </figure>

              <h2 className="mb-6">The Numbers That Matter</h2>
              <p>
                Not all margins are equal. The table below shows measured marginal
                gap for indirect restorations — where precision can be quantified
                in the laboratory — and the observed clinical failure rate for
                direct composite, where the margin cannot be measured in vivo but
                the consequences speak for themselves.
              </p>

              <div className="my-8 overflow-x-auto rounded-xl border border-gray-200 bg-white">
                <table className="w-full text-left text-sm">
                  <thead className="bg-amber-50">
                    <tr>
                      <th className="px-5 py-3 font-semibold">Material &amp; Method</th>
                      <th className="px-5 py-3 font-semibold">Marginal Integrity</th>
                      <th className="px-5 py-3 font-semibold">Evidence</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t bg-green-50/30">
                      <td className="px-5 py-3 font-medium">Gold — milled (indirect)</td>
                      <td className="px-5 py-3">11.7 μm mean gap</td>
                      <td className="px-5 py-3 text-xs text-gray-500">Johnson et al., J Prosthodont. 2017</td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-5 py-3">Gold — cast (indirect)</td>
                      <td className="px-5 py-3">22.7–43.6 μm</td>
                      <td className="px-5 py-3 text-xs text-gray-500">Johnson et al. 2017</td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-5 py-3">Pressed ceramic (indirect)</td>
                      <td className="px-5 py-3">38 μm</td>
                      <td className="px-5 py-3 text-xs text-gray-500">Azar et al., Braz Oral Res. 2018</td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-5 py-3">Milled ceramic (indirect)</td>
                      <td className="px-5 py-3">45–83 μm</td>
                      <td className="px-5 py-3 text-xs text-gray-500">Azar 2018; Svanborg, Biomater Investig Dent. 2020</td>
                    </tr>
                    <tr className="border-t bg-red-50/30">
                      <td className="px-5 py-3 font-medium">Composite resin (direct)</td>
                      <td className="px-5 py-3">
                        <span className="font-semibold text-red-700">72.7%</span> fail from secondary caries
                      </td>
                      <td className="px-5 py-3 text-xs text-gray-500">Kopperud et al., IJERPH. 2016 — Norway post-amalgam survey of 2,026 dentists</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-xs text-gray-400 mt-1">
                Milled gold margins measured with cement space included. Direct composite
                marginal gap cannot be measured with equivalent precision in functioning
                teeth — the failure rate serves as the clinical proxy.
              </p>

              <p className="mb-6"></p>

              <p>
                The hierarchy is clear: milled gold achieves the tightest measured
                margin, cast gold follows, and ceramics trail behind. But the real
                story is the gap between any indirect restoration and direct composite.
                When 72.7% of composite failures originate at the margin — the very
                interface that milled gold can seal to within 12 microns — the difference
                stops being academic and becomes clinical.
              </p>

              <p className="mb-6">
                Norway didn't choose composite. The 2008 amalgam ban forced it. One
                year later, 71% of Norwegian dentists admitted amalgam lasted longer.
                Composite is simply the default.
              </p>

              <h2>The Composite Cycle</h2>
              <ol>
                <li>
                  <strong>Year 0:</strong> Cavity detected. Composite placed.
                  Margin is "good enough."
                </li>
                <li>
                  <strong>Year 3–5:</strong> Microscopic leakage begins. You
                  can't feel it.
                </li>
                <li>
                  <strong>Year 7–10:</strong> Recurrent decay becomes visible;
                  the filling needs replacement.
                </li>
                <li>
                  <strong>Repeat:</strong> Each replacement removes more healthy
                  tooth, eventually requiring a crown, root canal, or implant.
                </li>
              </ol>

              <p className="mb-6"></p>

              <p className="mb-6">
                The composite didn't "fail." The margin did. The margin was
                designed to fail — not by malice, but by physics.
              </p>

              <h2>What Gold Actually Costs</h2>
              <p>
                A traditional cast gold inlay or onlay typically costs $800–$1,500
                out of pocket. Over 30 years:
              </p>
              <ul>
                <li>
                  <strong>Composite path:</strong> $200 filling → $250
                  replacement → $350 replacement → $1,200 crown →{" "}
                  <strong>$2,000+ total</strong>, plus progressive tooth
                  destruction.
                </li>
                <li>
                  <strong>Traditional gold path:</strong> $900 inlay at year 0 →{" "}
                  <strong>$900 total</strong>, intact tooth at year 30.
                </li>
              </ul>
              <p className="mb-6">The composite is a subscription. The gold is a purchase.</p>

              <h2>The First-Aid Problem</h2>
              <p>
                The first presentation of caries is the best opportunity for a
                definitive repair: the cavity is smallest, the tooth is
                strongest, and the preparation is most conservative. If you place
                gold at that moment, you may never touch that tooth again. If you
                place composite, you have signed that tooth up for escalating
                interventions.
              </p>

              <p className="mb-6"></p>

              <h2>What You Can Do</h2>
              <ol>
                <li>
                  Ask your dentist about gold. If they don't offer it, ask why.
                </li>
                <li>
                  Use our directory to{" "}
                  <Link
                    to="/dentists"
                    className="font-semibold text-amber-700 underline"
                  >
                    find a dentist near you
                  </Link>
                  .
                </li>
                <li>
                  Think long-term. The cheapest filling is the one you never
                  have to replace.
                </li>
              </ol>
            </div>
          </div>
        </article>

        <article className="mt-8 max-w-3xl rounded-2xl border border-gray-200 bg-white p-8 shadow-sm sm:p-10">
          <p className="text-sm text-gray-500">{posts[1].date}</p>
          <h2 className="mt-3 text-2xl font-bold text-gray-900 sm:text-3xl">{posts[1].title}</h2>
          <p className="mt-4 text-gray-600">{posts[1].excerpt}</p>
          <Link to="/blog/the-substitute" className="mt-5 inline-flex font-semibold text-amber-700 hover:text-amber-800">Read more →</Link>
        </article>

        {/* CTA */}
        <div className="mt-12 max-w-3xl rounded-2xl bg-amber-50 p-7 text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            Ready to explore your options?
          </h2>
          <p className="mt-2 text-gray-600">
            Connect with a dentist who understands margin integrity.
          </p>
          <Link
            to="/dentists"
            className="mt-5 inline-flex rounded-xl bg-amber-500 px-6 py-3 font-semibold text-white hover:bg-amber-600"
          >
            Find a dentist
          </Link>
        </div>
      </section>
    </main>
  );
}
