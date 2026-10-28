import { createFileRoute } from "@tanstack/react-router";
import { trackPageView } from "./api/analytics";

export const Route = createFileRoute("/about")({
  loader: () => {
    trackPageView({ data: { path: "/about" } }).catch(() => {});
  },
  component: AboutPage,
});

function AboutPage() {
  return (
    <main className="min-h-dvh bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-amber-50 via-white to-amber-50">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center">
          <span className="inline-flex items-center rounded-full bg-amber-100 px-4 py-1.5 text-sm font-semibold text-amber-800">
            Our Story
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            A father, three sons, and a craft that puts the tooth first.
          </h1>
        </div>
      </section>

      {/* Body copy */}
      <article className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
        <div className="space-y-6 text-lg leading-relaxed text-gray-700">
          <p>
            There&rsquo;s a line of my dad&rsquo;s our family still repeats:
            &ldquo;How does anyone fix anything in their house without a dental
            lab in the basement?&rdquo; For us it wasn&rsquo;t a figure of
            speech. The Mappin lab started in the basement of the family home,
            and it grew bench by bench until it took over the corner where we
            used to roller-skate. I helped him lay it out, cutting little paper
            benches to scale so the workflow made sense. I was a kid, but I was
            already learning the part that never changes: fit comes first.
          </p>
          <p>
            My father, Don Mappin Sr., CDT, gave the profession more than the
            bench. He ran his own laboratory, served as president of the
            Pennsylvania Association of Dental Laboratories, and became a
            District Two Delegate to the NADL. He pushed &mdash; without
            success, but with conviction &mdash; to write minimum standards into
            Pennsylvania law. He wore a T-shirt that said &ldquo;Get your teeth
            into legislation.&rdquo; That was him: the standards man, the one
            who read every prescription and stayed vigilant about safety.
          </p>
          <p>
            My brother Don Jr. went the other way &mdash; out talking to people
            &mdash; and built Atlantic Precious Metal Refining, a scrap refinery
            that kept him close to the labs and the metal. My brother Scott runs
            Strategy Milling, and he&rsquo;s the one who brought milled gold to
            the marketplace.
          </p>
          <p>
            I&rsquo;m the technician in the middle. After the Air Force, I came
            back to the lab and never really left. I worked in several labs,
            opened my own and ran it nine years, then joined Don Jr. at the
            refinery. That&rsquo;s where I saw it: digital gold design and
            milling had improved on the old technology &ldquo;by an order of
            magnitude.&rdquo; That landed me at Easy Gold Crowns &mdash; a
            doctor-facing service for flat-fee gold restorations, launched in
            2019, with the seven years since spent refining the digital design
            and polishing workflow.
          </p>
          <p>
            Which is why this page exists. Easy Gold Crowns serves the dentist.
            Gold Dentistry Network is the other side of the same idea &mdash;
            the patient-facing bridge. A patient who wants the best first
            treatment for a tooth shouldn&rsquo;t have to hunt for a dentist who
            places gold, or a lab that can fabricate it. This network exists so
            finding one is the easy part.
          </p>
          <p>
            We&rsquo;re a family that grew up at the bench. From my dad to Scott
            to me, the point never changed: the tooth comes first.
          </p>
        </div>

        {/* JDT feature link */}
        <div className="mt-12 rounded-2xl border border-amber-200 bg-amber-50 p-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-amber-600">
            Featured in the Journal of Dental Technology
          </p>
          <p className="mt-3 text-gray-600">
            The Mappin family legacy, told in the JDT&rsquo;s 75th-anniversary
            issue.
          </p>
          <a
            href="/jdt-oct-2026-mappin-family.pdf"
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-3 font-semibold text-white shadow-md transition-all hover:bg-amber-600"
          >
            Read the family feature in the Journal of Dental Technology
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>
      </article>
    </main>
  );
}
