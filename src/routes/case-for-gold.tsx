import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/case-for-gold")({
  component: CaseForGoldPage,
});

type Reference = {
  id: string;
  shortTitle: string;
  citation: string;
  url: string;
  urlLabel: string;
  meta: string[];
  takeaway: string;
};

type Theme = {
  number: string;
  title: string;
  blurb: string;
  refs: Reference[];
};

const THEMES: Theme[] = [
  {
    number: "01",
    title: "Longevity — how long restorations actually last",
    blurb:
      "The first question a patient should be able to answer: how long will this repair last? These studies measure gold's record in decades.",
    refs: [
      {
        id: "CFG-001",
        shortTitle: "Hickel & Manhart 2001",
        citation:
          "Hickel R, Manhart J. Longevity of restorations in posterior teeth and reasons for failure. Journal of Adhesive Dentistry, 2001.",
        url: "https://pubmed.ncbi.nlm.nih.gov/11317384/",
        urlLabel: "PubMed · PMID 11317384",
        meta: ["Review", "Restoration longevity baseline"],
        takeaway:
          "The cornerstone review of restoration longevity — a systematic look at how long posterior restorations really last and why they fail, the baseline against which gold's record is measured.",
      },
      {
        id: "CFG-002",
        shortTitle: "Studer et al. 2000",
        citation:
          "Studer SP, Wettstein F, Lehner C, Zullo TG, Schärer P. Long-term survival estimates of cast gold inlays and onlays with their analysis of failures. Journal of Oral Rehabilitation, 2000;27(6):461–72.",
        url: "https://pubmed.ncbi.nlm.nih.gov/10888273/",
        urlLabel: "PubMed · PMID 10888273",
        meta: ["30-year follow-up", "303 gold restorations"],
        takeaway:
          "University of Zürich followed 303 gold inlays/onlays for up to 30 years: survival was ~96% at 10 years, 87% at 20 years and 73% at 30 years — gold is measured in decades, not in the 7–10 years quoted for composite.",
      },
      {
        id: "CFG-003",
        shortTitle: "Bandlish & Mariatos 2009",
        citation:
          "Bandlish LK, Mariatos G. Long-term survivals of 'direct-wax' cast gold onlays: a retrospective study in a general dental practice. British Dental Journal, 2009;207(3):111–5.",
        url: "https://pubmed.ncbi.nlm.nih.gov/19662053/",
        urlLabel: "PubMed · PMID 19662053",
        meta: ["General practice", "20-year survival"],
        takeaway:
          "In an ordinary London general practice — not a university clinic — 194 cast gold onlays survived at 97% (10 years) and 94% (20 years); the authors called them \"a highly successful treatment option.\"",
      },
      {
        id: "CFG-014",
        shortTitle: "Olley, Andiappan & Frost 2018 — up to 50-year follow-up",
        citation:
          "Olley RC, Andiappan M, Frost PM. An up to 50-year follow-up of crown and veneer survival in a dental practice. Journal of Prosthetic Dentistry, 2018;119(6):935–41.",
        url: "https://pubmed.ncbi.nlm.nih.gov/28969914/",
        urlLabel: "PubMed · PMID 28969914",
        meta: ["Up to 50-year follow-up", "Posterior gold crowns"],
        takeaway:
          "A London practice followed restorations annually for up to 50 years — metal-ceramic crowns averaged ~47.5 years of survival, and the posterior gold crowns had 100% survival at 50 years. Gold is the restoration that outlives the practice.",
      },
      {
        id: "CFG-004",
        shortTitle: "Passia, Stampf & Strub 2013 — Gold vs CAD/CAM zirconia RCT",
        citation:
          "Passia N, Stampf S, Strub JR. Five-year results of a prospective randomised controlled clinical trial of posterior CAD/CAM ZrSiO₄-ceramic crowns. Journal of Oral Rehabilitation, 2013;40(8):609–17.",
        url: "https://pubmed.ncbi.nlm.nih.gov/23745725/",
        urlLabel: "PubMed · PMID 23745725",
        meta: ["Randomized controlled trial", "5-year survival"],
        takeaway:
          "The head-to-head RCT: over 5 years, gold crowns survived at 92% vs 73% for CAD/CAM zirconia crowns, with better margins and less discoloration — the trial authors concluded these zirconia crowns \"cannot be recommended\" for posterior teeth.",
      },
    ],
  },
  {
    number: "02",
    title: "Marginal integrity — the seal where decay gets in",
    blurb:
      "Recurrent decay begins at the margin — the junction between the restoration and the tooth. These studies show how gold holds that seal.",
    refs: [
      {
        id: "CFG-005",
        shortTitle: "Kidd & McLean 1979",
        citation:
          "Kidd EAM, McLean JD. The cavity sealing ability of cemented cast gold restorations assessed in vitro by an acidified gel artificial caries technique. British Dental Journal, 1979.",
        url: "https://www.nature.com/articles/4804278",
        urlLabel: "Nature · DOI 10.1038/sj.bdj.4804278",
        meta: ["Classic laboratory experiment"],
        takeaway:
          "The classic experiment from the leading cariology researcher of her generation: when artificial caries was generated around cemented cast gold restorations, the gold margin sealed — the original laboratory proof that gold keeps decay out of the margin where it starts.",
      },
      {
        id: "CFG-006",
        shortTitle: "Stappert et al. 2008",
        citation:
          "Stappert CF, Chitmongkolsuk S, Silva NR, Att W, Strub JR. Effect of mouth-motion fatigue and thermal cycling on the marginal accuracy of partial coverage restorations made of various dental materials. Dental Materials, 2008;24(9):1248–57.",
        url: "https://pubmed.ncbi.nlm.nih.gov/18395785/",
        urlLabel: "PubMed · PMID 18395785",
        meta: ["Simulated years of chewing"],
        takeaway:
          "Under simulated years of chewing and temperature swings, cast-gold partial-coverage restorations kept the most accurate margins of all materials tested — the margin is where bacteria exploit weakness, and gold held it best.",
      },
    ],
  },
  {
    number: "03",
    title: "Materials compared — what happens in the opposing arch and at the margin",
    blurb:
      "Gold does not just last — it is also kind to the rest of the mouth. These studies compare gold with the ceramics and composite resins most often recommended in its place.",
    refs: [
      {
        id: "CFG-007",
        shortTitle: "Kwon, Oh & Cho 2015",
        citation:
          "Kwon MS, Oh SY, Cho SA. Two-body wear comparison of zirconia crown, gold crown, and enamel against zirconia. Journal of the Mechanical Behavior of Biomedical Materials, 2015;47:21–8.",
        url: "https://pubmed.ncbi.nlm.nih.gov/25837341/",
        urlLabel: "PubMed · PMID 25837341",
        meta: ["Wear test", "Opposing tooth protection"],
        takeaway:
          "In wear tests, enamel opposing zirconia lost ~0.47 mm³ of tooth while gold lost ~0.01 mm³ — the authors warn zirconia is not for heavy grinders; gold doesn't destroy the opposing tooth.",
      },
      {
        id: "CFG-013",
        shortTitle: "Lee et al. 2014 — enamel vs lithium disilicate vs gold",
        citation:
          "Lee A, Swain M, He L, Lyons K. Wear behavior of human enamel against lithium disilicate glass ceramic and type III gold. Journal of Prosthetic Dentistry, 2014;112(6):1399–405.",
        url: "https://pubmed.ncbi.nlm.nih.gov/25311791/",
        urlLabel: "PubMed · PMID 25311791",
        meta: ["Wear lab comparison", "Enamel protection"],
        takeaway:
          "Head-to-head in the wear lab: Type III gold had a significantly lower friction coefficient and caused far less damage to opposing enamel than lithium disilicate ceramic — enamel against the ceramic cracked and furrowed, while enamel against gold wore gently.",
      },
      {
        id: "CFG-008",
        shortTitle: "Esquivel-Upshaw et al. 2018",
        citation:
          "Esquivel-Upshaw JF, Kim MJ, Hsu SM, Abdulhameed N, Jenkins R, Neal D, Ren F, Clark AE. Randomized clinical study of wear of enamel antagonists against polished monolithic zirconia crowns. Journal of Dentistry, 2018;68:19–27.",
        url: "https://pubmed.ncbi.nlm.nih.gov/29042241/",
        urlLabel: "PubMed · PMID 29042241",
        meta: ["Randomized clinical trial", "Real mouths"],
        takeaway:
          "A randomized clinical trial in real mouths: at one year, polished zirconia crowns wore the opposing enamel about the same as metal-ceramic crowns — useful, honest data for the \"which material is kindest to the other teeth\" debate.",
      },
      {
        id: "CFG-009",
        shortTitle: "Baader et al. 2016",
        citation:
          "Baader K, Hiller KA, Buchalla W, Schmalz G, Federlin M. Self-adhesive luting of partial ceramic crowns: selective enamel etching leads to higher survival after 6.5 years in vivo. Journal of Adhesive Dentistry, 2016;18(3):225–31.",
        url: "https://www.semanticscholar.org/paper/Self-adhesive-Luting-of-Partial-Ceramic-Crowns%3A-to-Baader-Hiller/61b5b582eb4f7d4b45a3f529538d632aeef2fefe",
        urlLabel: "Semantic Scholar · DOI 10.3290/j.jad.a35549",
        meta: ["6.5-year clinical study"],
        takeaway:
          "A 6.5-year clinical study of ceramic partial crowns showing their survival depends on a fragile enamel bond (selective etching) — ceramics live or die by adhesion; gold is cemented, not bonded, and doesn't depend on that etch.",
      },
      {
        id: "CFG-010",
        shortTitle: "Federlin et al. 2004/2005",
        citation:
          "Federlin M, Sipoș C, Hiller KA, Thonemann B, Schmalz G. Partial ceramic crowns: influence of preparation design and luting material on margin integrity — a scanning electron microscopic study. Clinical Oral Investigations, 2004/2005.",
        url: "https://www.semanticscholar.org/paper/Partial-ceramic-crowns.-Influence-of-preparation-on-Federlin-%C8%98ipo%C8%99/f5d26c641910059712fac95f8b387d0214fd54ad",
        urlLabel: "Semantic Scholar · DOI 10.1007/s00784-004-0276-1",
        meta: ["Scanning electron microscopy"],
        takeaway:
          "For ceramic partial crowns, how the tooth is prepared and which cement is used changed how well the margin sealed — ceramic margin quality is technique-sensitive, while gold's fit is established by the casting itself.",
      },
      {
        id: "CFG-011",
        shortTitle: "Zarone et al. 2019",
        citation:
          "Zarone F, Di Mauro MI, Ausiello P, Ruggiero G, Sorrentino R. Current status on lithium disilicate and zirconia: a narrative review. BMC Oral Health, 2019;19:134.",
        url: "https://link.springer.com/article/10.1186/s12903-019-0838-x",
        urlLabel: "BMC Oral Health · DOI 10.1186/s12903-019-0838-x",
        meta: ["Narrative review"],
        takeaway:
          "A broad review of the two ceramic materials most often recommended in place of gold — lithium disilicate and zirconia — the reference point for understanding what modern alternatives actually offer.",
      },
      {
        id: "CFG-012",
        shortTitle: "Beun et al. 2007",
        citation:
          "Beun S, Glorieux T, Devaux J, Vreven J, Leloup G. Characterization of nanofilled compared to universal and microfilled composites. Dental Materials, 2007;23(1):51–9.",
        url: "https://pubmed.ncbi.nlm.nih.gov/16423384/",
        urlLabel: "PubMed · PMID 16423384",
        meta: ["Materials science", "Composite resins"],
        takeaway:
          "A materials-science look at the composite resins used for today's standard fillings — the very materials whose mechanical limits keep the \"replace in 7–10 years\" cycle going.",
      },
    ],
  },
  {
    number: "04",
    title: "Background — the tissue gold protects",
    blurb:
      "Before the materials, the tissue: enamel is the tooth's outer armor, and it is what a durable restoration is designed to protect.",
    refs: [
      {
        id: "CFG-015",
        shortTitle: "Tooth Enamel — ScienceDirect Topics (background resource)",
        citation:
          "Tooth Enamel — topic overview. ScienceDirect Topics: Medicine and Dentistry (encyclopedia reference page, not a peer-reviewed study).",
        url: "https://www.sciencedirect.com/topics/medicine-and-dentistry/tooth-enamel",
        urlLabel: "ScienceDirect Topics · Medicine and Dentistry",
        meta: ["Encyclopedia topic page", "Background resource"],
        takeaway:
          "Background reading on the tooth's outer armor — enamel is the hardest substance in the human body, and it's the tissue a gold restoration is designed to protect for a lifetime.",
      },
    ],
  },
];

function CaseForGoldPage() {
  return (
    <main className="min-h-dvh bg-gray-50">
      {/* Page header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link to="/" className="text-lg font-bold text-gray-900">
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

      <article className="mx-auto max-w-4xl px-6 py-14 sm:py-20">
        {/* Hero */}
        <p className="text-sm font-semibold uppercase tracking-widest text-amber-600">
          Reference Library · Peer-Reviewed Evidence
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          The Case for Gold
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-gray-600">
          Caries is the #1 disease in the world, and it deserves better than a
          placeholder. The evidence assembled here makes the case for a durable
          first treatment — gold placed at the first presentation of decay,
          sealing the margin where bacteria exploit weakness.
        </p>

        {/* Why this library exists */}
        <div className="mt-10 rounded-2xl border border-amber-200 bg-amber-50 p-7 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900">
            Why this evidence exists
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-gray-700">
            The usual and customary first treatment for a cavity is a composite
            filling that lasts 7–10 years — little more than a placeholder until
            decay returns, and the patient returns as well, to pay again. A gold
            restoration placed at that same first presentation extends the repair
            to 30+ years by sealing the margin where recurrent decay begins. The
            mission of Gold Dentistry Network is to upgrade that first treatment.
            This library is the published evidence behind that mission — assembled
            so patients, dentists, and labs can weigh the record for themselves.
          </p>
        </div>

        {/* At a glance */}
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-white p-5 text-center shadow-sm">
            <p className="text-3xl font-bold text-amber-600">15</p>
            <p className="mt-1 text-sm font-medium text-gray-600">
              References in this library
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-5 text-center shadow-sm">
            <p className="text-3xl font-bold text-amber-600">4</p>
            <p className="mt-1 text-sm font-medium text-gray-600">
              Themes: longevity, margin, materials, background
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-5 text-center shadow-sm">
            <p className="text-3xl font-bold text-amber-600">30+</p>
            <p className="mt-1 text-sm font-medium text-gray-600">
              Years of documented gold survival
            </p>
          </div>
        </div>

        {/* Themes */}
        {THEMES.map((theme) => (
          <section key={theme.number} className="mt-16">
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-sm font-bold text-amber-600">
                {theme.number}
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                {theme.title}
              </h2>
            </div>
            <p className="mt-2 max-w-3xl text-sm text-gray-500">
              {theme.blurb}
            </p>

            <div className="mt-6 space-y-5">
              {theme.refs.map((ref) => (
                <div
                  key={ref.id}
                  className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-md bg-amber-100 px-2 py-0.5 font-mono text-xs font-bold text-amber-800">
                      {ref.id}
                    </span>
                    <span className="text-sm font-semibold text-gray-900">
                      {ref.shortTitle}
                    </span>
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-gray-700">
                    {ref.citation}
                  </p>

                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    {ref.meta.map((m) => (
                      <span
                        key={m}
                        className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600"
                      >
                        {m}
                      </span>
                    ))}
                  </div>

                  <a
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-amber-700 underline underline-offset-2 hover:text-amber-800"
                  >
                    View the source
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="h-3.5 w-3.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                      />
                    </svg>
                  </a>
                  <span className="mt-2 block text-xs text-gray-400">
                    {ref.urlLabel}
                  </span>

                  <div className="mt-4 rounded-lg border-l-4 border-amber-500 bg-amber-50 p-4">
                    <p className="text-sm leading-relaxed text-gray-800">
                      <span className="font-semibold text-amber-800">
                        What this means for you:{" "}
                      </span>
                      {ref.takeaway}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* Library note */}
        <p className="mt-14 text-center text-sm text-gray-500">
          This library is maintained and growing. New peer-reviewed evidence is
          added as it is sourced and verified.
        </p>

        {/* CTA */}
        <div className="mt-10 rounded-2xl bg-amber-50 p-7 text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            Ready to explore your options?
          </h2>
          <p className="mt-2 text-gray-600">
            Connect with a dentist who places gold restorations — or a lab that
            makes them.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link
              to="/dentists"
              className="inline-flex rounded-xl bg-amber-500 px-6 py-3 font-semibold text-white hover:bg-amber-600"
            >
              Find a dentist
            </Link>
            <Link
              to="/labs"
              className="inline-flex rounded-xl border border-amber-300 bg-white px-6 py-3 font-semibold text-amber-700 hover:bg-amber-100"
            >
              Find a lab
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
