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
  note?: string;
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
        id: "CFG-018",
        shortTitle: "Donovan et al. 2004 — 1,314 cast gold restorations, up to 52 years at 95.4%",
        citation:
          "Donovan T, Simonsen RJ, Guertin G, Tucker RV. Retrospective clinical evaluation of 1,314 cast gold restorations in service from 1 to 52 years. Journal of Esthetic and Restorative Dentistry, 2004;16(3):194–204.",
        url: "https://pubmed.ncbi.nlm.nih.gov/15597641/",
        urlLabel: "PubMed · PMID 15597641",
        meta: ["Up to 52-year follow-up", "1,314 cast gold restorations"],
        takeaway:
          "The definitive cast-gold longevity record: 1,314 cast gold restorations (inlays, onlays, partial and full veneer crowns) placed by one master practitioner survived at 95.4% overall — 45% still in service after 25–52 years, and 94.1% of those beyond 40 years still going. Gold is not a repair you repeat; it's a restoration you retire with.",
        note: "Accuracy note: this cohort mixes restoration types (inlays, onlays and crowns — not inlays alone) and comes from a single elite operator; the 95.4% is overall survival across 1–52 years of service. I phrase it as \"cast gold restorations,\" never just \"inlays.\"",
      },
      {
        id: "CFG-016",
        shortTitle: "Makhija et al. 2016 — what dentists actually choose for crowns (National Dental PBRN)",
        citation:
          "Makhija SK, Lawson NC, Gilbert GH, Litaker MS, McClelland JA, Louis DR, Gordan VV, Pihlstrom DJ, Meyerowitz C, Mungia R, McCracken MS; National Dental PBRN Collaborative Group. Dentist material selection for single-unit crowns: findings from the National Dental Practice-Based Research Network. Journal of Dentistry, 2016;55:40–7.",
        url: "https://pubmed.ncbi.nlm.nih.gov/27693778/",
        urlLabel: "PubMed · PMID 27693778",
        meta: ["1,777 US dentists surveyed", "National Dental PBRN"],
        takeaway:
          "1,777 US dentists surveyed (83% response). Top 3 choices for a posterior crown: all-zirconia 32%, porcelain-fused-to-metal 31%, lithium disilicate 21% — ceramic-based materials dominate the crown market; full-metal (the category gold crowns sit in) was a rare choice. This is the citation for \"when a filling fails, the usual crown is ceramic.\"",
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
      {
        id: "CFG-017",
        shortTitle: "Kopperud et al. 2016 — the Post-Amalgam Era (Norway)",
        citation:
          "Kopperud SE, Staxrud F, Espelid I, Tveit AB. The Post-Amalgam Era: Norwegian Dentists' Experiences with Composite Resins and Repair of Defective Amalgam Restorations. International Journal of Environmental Research and Public Health, 2016;13(4):441.",
        url: "https://pubmed.ncbi.nlm.nih.gov/27110804/",
        urlLabel: "PubMed · PMID 27110804",
        meta: ["National survey", "Norway, post-amalgam"],
        takeaway:
          "Norway banned amalgam in 2008; one year later, a national survey (61.3% of all dentists) found composite was the preferred material for 99.1% — and secondary caries was the most commonly reported cause of failure, at 72.7%, followed by fracture at 25.1%. Only 45.8% of dentists expected Class II composites to last ≥10 years, and 71.2% expected better longevity if the restoration had been amalgam. Real-world proof that when composite becomes the default, recurrent decay at the margin becomes the dominant failure mode — the exact problem gold seals.",
      },
      {
        id: "CFG-019",
        shortTitle: "Monasky & Taylor 1971 — the keystone wear study",
        citation:
          "Monasky GE, Taylor DF. Studies on the wear of porcelain, enamel, and gold. Journal of Prosthetic Dentistry, 1971;25(3):299–306.",
        url: "https://pubmed.ncbi.nlm.nih.gov/5276853/",
        urlLabel: "PubMed · PMID 5276853",
        meta: ["1971 foundation study", "Wear science"],
        takeaway:
          "The 1971 foundation study that first measured how porcelain, enamel, and gold wear against one another. It documented porcelain's \"repeated clinical observations of excessive wear of opposing teeth\" — the original science behind the hardness argument: ceramic is hard on the tooth it meets, while gold has been measured for 55 years as kind to opposing enamel.",
        note:
          "This 1971 paper is an index item without an abstract in PubMed. It is cited for its qualitative finding (porcelain's excessive wear of opposing teeth), not for specific wear figures, which are not quoted here.",
      },
      {
        id: "CFG-020",
        shortTitle: "Schulman & Pentel 1981 — the rational use of materials in occlusion",
        citation:
          "Schulman A, Pentel L. The rational use of materials in occlusion. Dental Clinics of North America, 1981;25(3):455–68.",
        url: "https://pubmed.ncbi.nlm.nih.gov/7021236/",
        urlLabel: "PubMed · PMID 7021236",
        meta: ["1981 doctrine", "Materials & occlusion"],
        takeaway:
          "The 1981 NYU doctrine paper on why the choice of restorative material profoundly influences the success of restored function — restoring function means the material must return the tooth to appropriate anatomic and functional form. Together with the 1971 wear study, it forms the archival spine of the hardness-and-occlusion argument.",
      },
      {
        id: "CFG-027",
        shortTitle: "Branco et al. 2020 — state-of-the-art wear review",
        citation:
          "Branco AC, Colaço R, Figueiredo-Pina CG, Serro AP. A State-of-the-Art Review on the Wear of the Occlusal Surfaces of Natural Teeth and Prosthetic Crowns. Materials (Basel), 2020;13(16):3525.",
        url: "https://pubmed.ncbi.nlm.nih.gov/32785120/",
        urlLabel: "PubMed · PMID 32785120 · open access",
        meta: ["State-of-the-art review", "Enamel wear"],
        takeaway:
          "A 2020 review of two decades of occlusal-wear research, with this summary line verbatim: \"Metallic materials induce lower wear on antagonist enamel than the other classes of materials, because of their low hardness and high ductility.\" It groups restoration materials into ceramic, resin-composite, and metallic — and the metallic class wears the opposing tooth the least.",
        note:
          "Accuracy note: the review compares material classes — it says metallic materials (as a class) wear opposing enamel least, not gold alone. For gold-specific numbers against zirconia and lithium disilicate, pair with Kwon 2015 (CFG-007) and Lee 2014 (CFG-013).",
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
  {
    number: "05",
    title: "Caries epidemiology — where decay actually happens",
    blurb:
      "Caries is not spread evenly across the mouth. These studies map where decay strikes and why so many fillings are replacements.",
    refs: [
      {
        id: "CFG-021",
        shortTitle: "Demirci, Tuncer & Yuceokur 2010 — caries prevalence by tooth surface",
        citation:
          "Demirci M, Tuncer S, Yuceokur AA. Prevalence of caries on individual tooth surfaces and its distribution by age and gender in university clinic patients. European Journal of Dentistry, 2010;4(3):270–79.",
        url: "https://pubmed.ncbi.nlm.nih.gov/20613915/",
        urlLabel: "PubMed · PMID 20613915",
        meta: ["Caries epidemiology", "University clinic patients"],
        takeaway:
          "This study maps caries across individual tooth surfaces and shows the chewing (molar) surfaces carry the heaviest burden of first-presenting decay. The back teeth are where a durable first treatment matters most.",
        note:
          "Accuracy note: the widely shared \"57% of caries first presents in molars\" figure is calculated from Table 1 of this paper, not a number printed in it. The study is a university-clinic sample, so it reflects referred patients rather than the general public.",
      },
      {
        id: "CFG-024",
        shortTitle: "Eltahlah et al. 2018 — why restorations are replaced",
        citation:
          "Eltahlah D, Lynch CD, Chadwick BL, Blum IR, Wilson NHF. An update on the reasons for placement and replacement of direct restorations. Journal of Dentistry, 2018;72:1–7.",
        url: "https://pubmed.ncbi.nlm.nih.gov/29522787/",
        urlLabel: "PubMed · PMID 29522787",
        meta: ["Systematic review", "86,720 restorations"],
        takeaway:
          "A systematic review of 25 studies covering 86,720 restorations: 57.3% were replacements rather than first-time placements, and secondary caries was the most common reason for replacing a restoration (up to 59%). Fillings are most often replaced because decay returns at the margin — the exact failure gold's seal prevents.",
      },
    ],
  },
  {
    number: "06",
    title: "Biocompatibility — what the alloy does in the body",
    blurb:
      "The corrosion and ion-release science behind gold's biologic safety, and where the allergy risk really sits.",
    refs: [
      {
        id: "CFG-022",
        shortTitle: "Wataha 2000 — the biocompatibility anchor",
        citation:
          "Wataha JC. Biocompatibility of dental casting alloys: a review. Journal of Prosthetic Dentistry, 2000;83(2):223–34.",
        url: "https://pubmed.ncbi.nlm.nih.gov/10668036/",
        urlLabel: "PubMed · PMID 10668036",
        meta: ["Review", "Biocompatibility"],
        takeaway:
          "The review that anchors gold's biologic safety: the single most relevant property of a casting alloy to its safety is its corrosion, and the alloys with the highest allergy and toxicity risk are the base metals (nickel and cobalt). High-noble gold is the least corrosive, lowest-ion-release material we place.",
        note:
          "Accuracy note: \"least corrosive / lowest release\" is supported; the review does not support a blanket \"100% biocompatible\" claim. Gold allergy is documented but rare, so gold is described as among the most biocompatible materials rather than completely without risk.",
      },
      {
        id: "CFG-023",
        shortTitle: "Muris et al. 2015 — palladium sensitization",
        citation:
          "Muris J, Goossens A, Gonçalo M, et al. Sensitization to palladium and nickel in Europe and the relationship with oral disease and dental alloys. Contact Dermatitis, 2015;72(5):286–96.",
        url: "https://pubmed.ncbi.nlm.nih.gov/25580524/",
        urlLabel: "PubMed · PMID 25580524",
        meta: ["Patch-test clinics", "Metal sensitization"],
        takeaway:
          "Real sensitization numbers, with the right context: across six European dermatology clinics, 24.3% of referred patch-test patients reacted to palladium and 25.2% to nickel, but reaction to one metal alone was 6–7% for each. The metals behind dental-alloy allergy are the base metals; gold and the high-noble alloys are not in that risk group.",
        note:
          "Accuracy note: these are patients already referred to allergy clinics — the most allergy-prone population there is — so the percentages are a ceiling, not a general-population figure. Nickel is the restricted base metal; high-noble gold is the lowest-corroding choice.",
      },
    ],
  },
  {
    number: "07",
    title: "Implants — the Brånemark era and the gold benchmark",
    blurb:
      "Gold was the original material of implant dentistry — the framework and screws of the Brånemark osseointegration era — and it remains the benchmark newer systems are measured against.",
    refs: [
      {
        id: "CFG-025",
        shortTitle: "Gold in implant superstructures — the UCLA abutment",
        citation:
          "Lewis SG, Beumer J, Hornburg W, Moy P. The \"UCLA\" abutment. International Journal of Oral & Maxillofacial Implants, 1988;3(3):183–9.",
        url: "https://pubmed.ncbi.nlm.nih.gov/3074050/",
        urlLabel: "PubMed · PMID 3074050",
        meta: ["Implant superstructures", "Cast gold UCLA abutment"],
        takeaway:
          "In the origins of implant dentistry — the Brånemark osseointegration era — the superstructure and retention screws were gold, and the UCLA abutment was cast in gold. Cobalt-chromium only arrived in 1991 as a preliminary alternative to that gold standard, and newer abutments are still measured against the traditional cast-gold UCLA abutment.",
        note:
          "Additional sources: Kallus & Bessing 1994 (PMID 8206552), Hulterström & Nilsson 1991 (PMID 1687920), Park et al. 2014 (PMID 24605206). \"Gold\" here refers to the gold cylinders, screws, and cast-gold UCLA abutment — not a claim that one specific gold-alloy class was always used.",
      },
      {
        id: "CFG-026",
        shortTitle: "The Brånemark original protocol — a cast gold-alloy framework",
        citation:
          "Astrand P, Ahlqvist J, Gunne J, Nilson H. Implant treatment of patients with edentulous jaws: a 20-year follow-up. Clinical Implant Dentistry and Related Research, 2008;10(4):207–17.",
        url: "https://pubmed.ncbi.nlm.nih.gov/18384411/",
        urlLabel: "PubMed · PMID 18384411",
        meta: ["20-year follow-up", "99.2% implant survival"],
        takeaway:
          "The original Brånemark osseointegration protocol — the one whose 20-year data shows 99.2% implant survival — restored those implants with a cast gold-alloy framework, gold cylinders, and gold retention screws. The Brånemark Clinic's own publications still call gold the \"conventional\" framework decades later; titanium was the later alternative they tested against it.",
        note:
          "Additional sources (all Brånemark-era): Jemt et al. 2002 (PMID 12475159), Jemt 1995 (PMID 7472725), Aparicio 1994 (PMID 7751108), Nilner & Lekholm 1985 (PMID 3904066), Taylor et al. 1999 (PMID 10612915), Eisenmann et al. 2004 (PMID 15623055). The sources document the original protocol's cast gold-alloy framework; they do not quote a personal alloy-preference statement from Brånemark.",
      },
    ],
  },
  {
    number: "08",
    title: "Parafunction — the stress-era surge (media & industry reports)",
    blurb:
      "The demand-side story: a stress-era wave of grinding and cracked teeth that makes a durable, stress-surviving restoration matter. These are media and industry reports, not peer-reviewed literature — cited as phenomenon reports, never as science.",
    refs: [
      {
        id: "Media-001",
        shortTitle: "NYT Well — cracked teeth, pandemic stress",
        citation:
          "\"The pandemic's grinding: dentists report a wave of cracked, chipped teeth\" — The New York Times (Well), 2020-09-08.",
        url: "https://www.nytimes.com/2020/09/08/well/live/dentists-tooth-teeth-cracks-fractures-coronavirus-stress-grinding.html",
        urlLabel: "The New York Times · Sept 2020",
        meta: ["Media report", "Parafunction"],
        takeaway:
          "Mainstream reporting (paywalled) — dentists nationwide reported a surge of cracked and fractured teeth from stress-related grinding during COVID.",
      },
      {
        id: "Media-002",
        shortTitle: "Chicago Tribune — grinding persists into 2022",
        citation:
          "Chicago Tribune coronavirus/dental coverage (2022-01-20).",
        url: "https://www.chicagotribune.com/coronavirus/ct-dental-problems-grinding-covid-tt-20220120-c37kznud55cnfc3eqjx3gu75cq-story.html",
        urlLabel: "Chicago Tribune · Jan 2022",
        meta: ["Media report", "Parafunction"],
        takeaway:
          "The stressed-mouth phenomenon did not end with 2020 — grinding-related dental damage continued to be reported into 2022.",
      },
      {
        id: "Media-003",
        shortTitle: "USA Today — cracked-tooth reports up",
        citation:
          "USA Today, 2020-09-11.",
        url: "https://www.usatoday.com/story/news/health/2020/09/11/reports-cracked-teeth-other-tooth-problems-up-amid-covid-19-stress/5761843002/",
        urlLabel: "USA Today · Sept 2020",
        meta: ["Media report", "Parafunction"],
        takeaway:
          "National reporting on the same wave — cracked teeth and other stress-related tooth problems up amid COVID.",
      },
      {
        id: "Media-004",
        shortTitle: "Sydney Morning Herald — \"new pandemic of broken teeth\"",
        citation:
          "Sydney Morning Herald (Australia), 2022-04-06.",
        url: "https://www.smh.com.au/national/covid-grind-causes-new-pandemic-of-broken-teeth-dentists-warn-20220406-p5aba0.html",
        urlLabel: "Sydney Morning Herald · Apr 2022",
        meta: ["Media report", "Parafunction"],
        takeaway:
          "The phenomenon went global — Australian dentists warned of a \"new pandemic of broken teeth\" from covid grinding.",
      },
      {
        id: "Media-005",
        shortTitle: "South China Morning Post — unprecedented dental problems",
        citation:
          "South China Morning Post (Hong Kong), 2022.",
        url: "https://www.scmp.com/lifestyle/health-wellness/article/3166078/pandemic-stress-triggering-unprecedented-dental-problems",
        urlLabel: "South China Morning Post · 2022",
        meta: ["Media report", "Parafunction"],
        takeaway:
          "Asian coverage of the same surge — pandemic stress triggering unprecedented dental problems.",
      },
      {
        id: "Media-006",
        shortTitle: "ADA News / HPI poll — stress-related oral conditions",
        citation:
          "ADA News, 2021-03: HPI poll — dentists see increased prevalence of stress-related oral health conditions.",
        url: "https://adanews.ada.org/ada-news/2021/march/hpi-poll-dentists-see-increased-prevalence-of-stress-related-oral-health-conditions/",
        urlLabel: "ADA News · Mar 2021",
        meta: ["Industry survey", "Parafunction"],
        takeaway:
          "Industry survey data (ADA Health Policy Institute) — the profession's own numbers confirming the stress-oral-health surge.",
      },
    ],
  },
  {
    number: "09",
    title: "The competitor's own words — Christensen's zirconia admissions (media & industry)",
    blurb:
      "Gordon Christensen helped popularize zirconia. His own 2026 clinical-evaluation newsletter and a 2024 podcast capture, in his own voice, where the material's margins and cement fall short — and where gold has held up. These are media and industry sources, not peer-reviewed literature: cited with attribution, never as science.",
    refs: [
      {
        id: "Media-007",
        shortTitle: "Christensen Clinician's Report — zirconia cementation issues (Sept 2026)",
        citation:
          "Christensen GJ (ed.). Solving Zirconia Cementation Issues with Conventional Glass Ionomer Cements. Clinician's Report, September 2026, Vol 19, Issue 9.",
        url: "https://www.cliniciansreport.org",
        urlLabel: "Clinician's Report · cliniciansreport.org",
        meta: ["Industry newsletter", "Zirconia cementation"],
        takeaway:
          "The champion of zirconia describes the material's failure points in his own clinical-evaluation newsletter: roughly 1 in 20 zirconia crowns debonding in their research, carious lesions observed at zirconia margins after short-term service, and digital-workflow margins that can be open up to 100 µm — a gap the cement is left to fill, while the resin cements used to fill it shrink 2–6% as they set.",
        note:
          "Media/industry source — a clinical-evaluation newsletter, not peer-reviewed literature. The figures are quoted as reported in the Sept 2026 issue (Vol 19, Issue 9, a purchased print copy) and have not been independently replicated.",
      },
      {
        id: "Media-008",
        shortTitle: "Dentistry Unmasked podcast — Christensen on the lost focus (Dec 2024)",
        citation:
          "\"Dentistry has lost focus: Reinstating prevention over the big case with Dr. Gordon Christensen!\" — Dentistry Unmasked: A Roundtable Podcast, Dec 17, 2024.",
        url: "https://dentistryunmasked.podbean.com/e/dentistry-has-lost-focus-reinstating-prevention-over-the-big-case-with-dr-gordon-christensen/",
        urlLabel: "Dentistry Unmasked podcast · Dec 2024",
        meta: ["Podcast interview", "Industry voice"],
        takeaway:
          "On a 2024 podcast, Gordon Christensen describes what he finds when failing zirconia restorations come out — caries deep inside the margin — and tells the room his own 67-year-old gold crowns are still in his mouth. A co-host draws the conclusion unprompted: dentists should be asking their labs for gold.",
        note:
          "Media/industry source — a podcast interview, not peer-reviewed literature. The account is a listener's summary of the conversation, not a verbatim transcript; the episode has no published transcript.",
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
          Reference Library · Evidence &amp; Sources
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

        {/* At a glance */}
        <figure className="mt-10 text-center">
          <img
            src="/field-kit/social/treatment-scenarios-2026-v3.png"
            alt="Infographic comparing four filling materials over 50 years — gold costs $755 once and lasts 50+ years; composite, amalgam and ceramic paths cost $6,000+ in repeat visits. Gold saves approximately $6,000."
            className="mx-auto max-w-xl rounded-2xl shadow-lg ring-1 ring-gray-200"
          />
          <figcaption className="mt-4 text-sm text-gray-500">
            One cavity, one decision, fifty years — four material paths and what
            each costs over a lifetime.
          </figcaption>
        </figure>

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
            <p className="text-3xl font-bold text-amber-600">27</p>
            <p className="mt-1 text-sm font-medium text-gray-600">
              Peer-reviewed evidence entries
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-5 text-center shadow-sm">
            <p className="text-3xl font-bold text-amber-600">8</p>
            <p className="mt-1 text-sm font-medium text-gray-600">
              Media &amp; industry reports
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

                  {ref.note && (
                    <div className="mt-3 rounded-lg border border-gray-200 bg-gray-50 p-3">
                      <p className="text-xs leading-relaxed text-gray-600">
                        {ref.note}
                      </p>
                    </div>
                  )}
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
