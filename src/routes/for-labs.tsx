import { createFileRoute, Link } from "@tanstack/react-router";
import { trackPageView } from "./api/analytics";
export const Route = createFileRoute("/for-labs")({
  loader: () => {
    trackPageView({ data: { path: "/for-labs" } }).catch(() => {});
  },
  component: ForLabs,
});
function ForLabs() {
  return (
    <div className="min-h-dvh bg-gray-50">
      <div className="mx-auto max-w-4xl px-6 py-20">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900">You offer gold.<br />We bring the dentists.</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Gold Dentistry Network is an open directory of gold dental labs — cast or milled, large or small. If you offer gold restorations to dentistry, you belong here. Free to list. No catch.
          </p>
          <Link to="/register/lab" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-amber-500 px-8 py-3.5 text-base font-semibold text-white shadow-md hover:bg-amber-600">
            List Your Lab — Free →
          </Link>
        </div>
        <div className="mt-16 grid gap-8 sm:grid-cols-3">
          <div className="rounded-2xl bg-white p-8 shadow-sm border border-gray-200 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100"><span className="text-xl">🔗</span></div>
            <h3 className="mt-4 font-semibold text-gray-900">Get Discovered</h3>
            <p className="mt-2 text-sm text-gray-500">Dentists searching for gold labs find you. No middleman, no commission — they contact you directly.</p>
          </div>
          <div className="rounded-2xl bg-white p-8 shadow-sm border border-gray-200 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-green-100"><span className="text-xl">🏷️</span></div>
            <h3 className="mt-4 font-semibold text-gray-900">Completely Free</h3>
            <p className="mt-2 text-sm text-gray-500">No listing fee. No monthly charge. No per-lead cost. We just want more gold in more mouths.</p>
          </div>
          <div className="rounded-2xl bg-white p-8 shadow-sm border border-gray-200 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100"><span className="text-xl">⚙️</span></div>
            <h3 className="mt-4 font-semibold text-gray-900">Cast or Milled</h3>
            <p className="mt-2 text-sm text-gray-500">We welcome both. Some dentists still prefer cast gold, and that's fine. The mission is gold, not the method.</p>
          </div>
        </div>
        <div className="mt-16 rounded-2xl bg-white p-8 shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">How It Works</h2>
          <div className="mt-6 space-y-4">
            <div className="flex gap-4">
              <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 text-sm font-bold text-amber-700">1</span>
              <div><p className="font-semibold text-gray-900">List your lab</p><p className="text-sm text-gray-500">Create your profile — lab name, location, services, and bio. Under 5 minutes. Free.</p></div>
            </div>
            <div className="flex gap-4">
              <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 text-sm font-bold text-amber-700">2</span>
              <div><p className="font-semibold text-gray-900">Get discovered</p><p className="text-sm text-gray-500">Dentists search by location and services. Your lab profile appears alongside every other gold lab in the country.</p></div>
            </div>
            <div className="flex gap-4">
              <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 text-sm font-bold text-amber-700">3</span>
              <div><p className="font-semibold text-gray-900">Receive referrals</p><p className="text-sm text-gray-500">Dentists contact you directly. No middleman. No commission. You keep 100% of your cases.</p></div>
            </div>
          </div>
        </div>
        <div className="mt-12 text-center">
          <Link to="/register/lab" className="rounded-xl bg-amber-500 px-8 py-3.5 text-base font-semibold text-white shadow-md hover:bg-amber-600">List Your Lab — Free</Link>
          <p className="mt-3 text-sm text-gray-400">Open to all gold dental labs. No strings attached.</p>
        </div>
      </div>
    </div>
  );
}
