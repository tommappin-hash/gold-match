import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/for-dentists")({
  component: ForDentists,
});

const FAQS = [
  {
    q: "What is Gold Dentistry Network?",
    a: "Gold Dentistry Network is a curated marketplace that connects patients specifically looking for gold dental restorations (crowns, bridges, inlays, onlays) with dentists who offer them. We solve the painful search problem — most directories don't filter for gold work, and patients waste hours calling around.",
  },
  {
    q: "Is there a lab credit available for new members?",
    a: "Yes! New dentists who aren't yet a lab client can list their practice for the full $49 fee and receive a $24.50 credit on their first lab case. It's our way of making Gold Dentistry Network a win-win — you get listed and get a discount on your first crown, bridge, inlay, or onlay case.",
  },
  {
    q: "How much does it cost to list my practice?",
    a: "A single one-time fee of $49. That's it. No monthly charges, no commissions on patient connections, no hidden fees. You pay once and your listing stays active.",
  },
  {
    q: "What happens after I sign up?",
    a: "After you complete your listing and pay the one-time fee, we review your practice to verify it's a legitimate dental practice offering gold restorations. Once approved (typically 1-2 business days), your listing goes live and patients can find and connect with you.",
  },
  {
    q: "How do patient connections work?",
    a: "Patients browse the directory, find your practice, and submit a connection request with their name, email, and a message about their needs. You receive these requests in your dashboard and can follow up directly with the patient.",
  },
  {
    q: "What services can I list?",
    a: "You can list any combination of gold crowns, gold bridges, gold inlays, and gold onlays. If you offer additional gold services, you can mention them in your bio.",
  },
  {
    q: "Can I update my listing later?",
    a: "Yes! You can update your practice details, bio, services, and photos anytime via your dashboard. Listing management features are being added.",
  },
  {
    q: "Is Gold Dentistry Network available in my area?",
    a: "Gold Dentistry Network is available nationwide across the United States. Patients can search by city, state, or ZIP code to find dentists near them.",
  },
];

function ForDentists() {
  return (
    <div className="min-h-dvh bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-amber-50 via-white to-amber-50">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-4 py-1.5 text-sm font-medium text-amber-800">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500" />
            </span>
            For Dental Professionals
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Connect with Patients Seeking{" "}
            <span className="text-amber-500">Gold Restorations</span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-gray-600 max-w-2xl mx-auto">
            Gold Dentistry Network sends qualified, motivated leads directly to your practice.
            These patients already know they want gold — they just need to find
            you. One low fee, zero commissions.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/register/dentist"
              className="rounded-xl bg-amber-500 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-amber-200 transition-all hover:bg-amber-600 hover:shadow-xl hover:shadow-amber-200"
            >
              List Your Practice — $49
            </Link>
            <a
              href="#how-it-works"
              className="rounded-xl border border-gray-300 bg-white px-8 py-3.5 text-base font-semibold text-gray-700 shadow-sm transition-all hover:bg-gray-50"
            >
              How It Works
            </a>
          </div>
        </div>
      </section>

      {/* Why Gold Dentistry Network */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-center text-3xl font-bold text-gray-900">
            Why List on Gold Dentistry Network?
          </h2>
          <p className="mt-4 text-center text-gray-600">
            Gold dentistry is a niche — but the patients looking for it are
            highly motivated. Here's why joining Gold Dentistry Network is worth it.
          </p>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Qualified Leads",
                desc: "Every patient on Gold Dentistry Network is specifically looking for gold restorations. No tire-kickers — just people ready to book.",
                icon: "🎯",
              },
              {
                title: "No Commissions",
                desc: "You pay once and keep every connection. Unlike other marketplaces, we never take a cut of your patient relationships.",
                icon: "💰",
              },
              {
                title: "Niche Visibility",
                desc: "Stand out in a focused directory instead of competing with every general dentist in your city on broad platforms.",
                icon: "🔍",
              },
              {
                title: "Simple Setup",
                desc: "Create your listing in under 5 minutes. Add your services, bio, and photos — we handle the rest.",
                icon: "⚡",
              },
              {
                title: "Patient-Ready",
                desc: "Patients can search by location and filter by the exact service they need — crowns, bridges, inlays, onlays.",
                icon: "🦷",
              },
              {
                title: "Direct Contact",
                desc: "Connection requests come straight to your dashboard with the patient's name, email, and message. Follow up on your terms.",
                icon: "📬",
              },
            ].map((benefit) => (
              <div
                key={benefit.title}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-amber-200 hover:shadow-md"
              >
                <span className="text-3xl">{benefit.icon}</span>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {benefit.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="bg-gray-50 py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-center text-3xl font-bold text-gray-900">
            How Gold Dentistry Network Works
          </h2>
          <p className="mt-4 text-center text-gray-600">
            Three simple steps to start receiving patient connections.
          </p>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {[
              {
                step: "1",
                title: "Create Your Listing",
                desc: "Fill out your practice details, services, bio, and photos. Takes under 5 minutes.",
              },
              {
                step: "2",
                title: "Pay $49 Once",
                desc: "One-time fee covers your listing permanently. No monthly charges, no commissions.",
              },
              {
                step: "3",
                title: "Receive Connections",
                desc: "Patients find you, submit connection requests, and you follow up directly.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100">
                  <span className="text-2xl font-bold text-amber-600">
                    {item.step}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-semibold text-gray-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-16 rounded-2xl bg-amber-50 border border-amber-200 p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900">
              Ready to connect with patients seeking gold restorations?
            </h3>
            <p className="mt-3 text-gray-600">
              Join Gold Dentistry Network today. $49 one-time fee. No commissions, no
              monthly charges.
            </p>
            <Link
              to="/register/dentist"
              className="mt-6 inline-block rounded-xl bg-amber-500 px-8 py-3.5 text-base font-semibold text-white shadow-md transition-all hover:bg-amber-600"
            >
              List Your Practice Now
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-lg px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-gray-600">
            One fee. No surprises. No percentages.
          </p>
          <div className="mt-10 rounded-2xl border-2 border-amber-500 bg-white p-8 shadow-2xl shadow-amber-100">
            <p className="text-sm font-semibold uppercase tracking-wider text-amber-600">
              Lifetime Listing
            </p>
            <div className="mt-4 flex items-baseline justify-center gap-1">
              <span className="text-4xl font-bold text-gray-900">$49</span>
              <span className="text-gray-500">one-time</span>
            </div>
            <ul className="mt-8 space-y-3 text-left">
              {[
                "Public practice listing with full profile",
                "Service tags (crowns, bridges, inlays, onlays)",
                "Practice photos and bio",
                "Direct patient connection requests",
                "Dashboard to manage incoming leads",
                "No commissions on patient referrals",
                "New members: $24.50 lab credit on first case",
              ].map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
            <Link
              to="/register/dentist"
              className="mt-8 block rounded-xl bg-amber-500 px-6 py-3.5 text-base font-semibold text-white shadow-md transition-all hover:bg-amber-600"
            >
              Get Listed for $49
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-2xl px-6">
          <h2 className="text-center text-3xl font-bold text-gray-900">
            Frequently Asked Questions
          </h2>
          <dl className="mt-12 divide-y divide-gray-200">
            {FAQS.map((faq) => (
              <div key={faq.q} className="py-6">
                <dt className="text-lg font-semibold text-gray-900">
                  {faq.q}
                </dt>
                <dd className="mt-3 leading-relaxed text-gray-600">{faq.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-br from-amber-500 to-amber-600 py-16">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="text-3xl font-bold text-white">
            Attract Patients Who Want Gold
          </h2>
          <p className="mt-4 text-amber-100">
            Your $49 listing puts you in front of patients who already know they
            want gold restorations. They're ready — they just need to find you.
          </p>
          <Link
            to="/register/dentist"
            className="mt-8 inline-block rounded-xl bg-white px-8 py-3.5 text-base font-bold text-amber-600 shadow-lg transition-all hover:bg-amber-50"
          >
            Start My Listing
          </Link>
        </div>
      </section>
    </div>
  );
}
