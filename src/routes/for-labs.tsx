import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/for-labs")({
  component: ForLabs,
});

function ForLabs() {
  return (
    <div className="min-h-dvh bg-gray-50">
      <div className="mx-auto max-w-4xl px-6 py-20">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900">Offer Milled Gold.<br />We Handle the Rest.</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Strategy Milling handles the precision milling. You handle the design, delivery, and dentist relationships. Gold Dentistry Network brings you the referrals.
          </p>
          <Link to="/register/lab" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-amber-500 px-8 py-3.5 text-base font-semibold text-white shadow-md hover:bg-amber-600">
            List Your Lab →
          </Link>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-3">
          <div className="rounded-2xl bg-white p-8 shadow-sm border border-gray-200 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100"><span className="text-xl">⚙️</span></div>
            <h3 className="mt-4 font-semibold text-gray-900">Strategy Milling Network</h3>
            <p className="mt-2 text-sm text-gray-500">Partner with the leading CAD/CAM gold milling center. No equipment investment — they mill, you deliver.</p>
          </div>
          <div className="rounded-2xl bg-white p-8 shadow-sm border border-gray-200 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100"><span className="text-xl">🔗</span></div>
            <h3 className="mt-4 font-semibold text-gray-900">Dentist Referrals</h3>
            <p className="mt-2 text-sm text-gray-500">Get listed on Gold Dentistry Network and be discovered by dentists actively searching for gold labs.</p>
          </div>
          <div className="rounded-2xl bg-white p-8 shadow-sm border border-gray-200 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-green-100"><span className="text-xl">💰</span></div>
            <h3 className="mt-4 font-semibold text-gray-900">One-Time Fee</h3>
            <p className="mt-2 text-sm text-gray-500">$49 to list — no commissions, no monthly charges. Strategy Milling partners list free.</p>
          </div>
        </div>

        <div className="mt-16 rounded-2xl bg-white p-8 shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">How It Works</h2>
          <div className="mt-6 space-y-4">
            <div className="flex gap-4">
              <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 text-sm font-bold text-amber-700">1</span>
              <div><p className="font-semibold text-gray-900">List your lab</p><p className="text-sm text-gray-500">Create your profile — lab name, location, services, and bio. Under 5 minutes.</p></div>
            </div>
            <div className="flex gap-4">
              <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 text-sm font-bold text-amber-700">2</span>
              <div><p className="font-semibold text-gray-900">Get discovered</p><p className="text-sm text-gray-500">Dentists search by location and services on Gold Dentistry Network. Your lab profile appears.</p></div>
            </div>
            <div className="flex gap-4">
              <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 text-sm font-bold text-amber-700">3</span>
              <div><p className="font-semibold text-gray-900">Receive referrals</p><p className="text-sm text-gray-500">Dentists contact you directly. No middleman. No commission. You keep 100% of your cases.</p></div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link to="/register/lab" className="rounded-xl bg-amber-500 px-8 py-3.5 text-base font-semibold text-white shadow-md hover:bg-amber-600">List Your Lab — $49 One-Time</Link>
          <p className="mt-3 text-sm text-gray-400">Strategy Milling partners: free listing with verified account email.</p>
        </div>
      </div>
    </div>
  );
}
