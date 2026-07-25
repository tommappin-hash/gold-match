import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

const ALL_SERVICES = ["crowns", "bridges", "inlays", "onlays"] as const;
const SERVICE_LABELS: Record<string, string> = {
  crowns: "Crowns", bridges: "Bridges", inlays: "Inlays", onlays: "Onlays",
};

type Step = 1 | 2 | 3 | 4;

export const Route = createFileRoute("/register/lab")({
  component: LabRegistration,
});

function LabRegistration() {
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState({
    labName: "", email: "", phone: "", website: "",
    city: "", state: "", zipCode: "",
    bio: "", services: [] as string[],
  });
  const [isStrategy, setIsStrategy] = useState(false);
  const [strategyEmail, setStrategyEmail] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function update(field: string, value: any) { setForm((f) => ({ ...f, [field]: value })); }
  function toggleService(s: string) {
    setForm((f) => ({ ...f, services: f.services.includes(s) ? f.services.filter((x) => x !== s) : [...f.services, s] }));
  }

  function validateStep(s: Step): boolean {
    const e: Record<string, string> = {};
    if (s >= 1) { if (!form.labName) e.labName = "Required"; if (!form.email) e.email = "Required"; if (!form.phone) e.phone = "Required"; }
    if (s >= 2) { if (!form.city) e.city = "Required"; if (!form.state) e.state = "Required"; if (!form.zipCode) e.zipCode = "Required"; }
    if (s >= 3) { if (form.services.length === 0) e.services = "Select at least one"; if (!form.bio) e.bio = "Required"; }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function next() { if (validateStep(step)) setStep((s) => Math.min(4, s + 1) as Step); }
  function prev() { setStep((s) => Math.max(1, s - 1) as Step); }

  return (
    <div className="min-h-dvh bg-gray-50">
      <div className="mx-auto max-w-2xl px-6 py-16">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900">List Your Lab</h1>
          <p className="mt-3 text-gray-600">Join Gold Dentistry Network and get discovered by dentists searching for gold labs.</p>
          <div className="mt-8 flex items-center justify-center gap-2">
            {[1,2,3,4].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${step >= s ? "bg-amber-500 text-white ring-4 ring-amber-200" : "bg-gray-200 text-gray-500"}`}>{s}</div>
                <span className="hidden sm:inline text-sm font-medium">{["Lab Info","Location","Services & Bio","Payment"][s-1]}</span>
                {s < 4 && <div className="hidden sm:block h-px w-6 bg-gray-200" />}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-white p-8 shadow-sm border border-gray-200">
          <form onSubmit={(e) => e.preventDefault()}>
            {/* Step 1: Lab Info */}
            {step === 1 && (
              <div className="space-y-5">
                <h2 className="text-lg font-semibold text-gray-900">Lab Information</h2>
                <div><label className="block text-sm font-medium text-gray-700">Lab Name *</label><input type="text" value={form.labName} onChange={(e) => update("labName", e.target.value)} className="mt-1 block w-full rounded-lg border px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 border-gray-300 focus:border-amber-500 focus:ring-amber-500/20" placeholder="e.g. Precision Gold Lab" /></div>
                <div><label className="block text-sm font-medium text-gray-700">Email *</label><input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className="mt-1 block w-full rounded-lg border px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 border-gray-300 focus:border-amber-500 focus:ring-amber-500/20" placeholder="info@yourlab.com" /></div>
                <div><label className="block text-sm font-medium text-gray-700">Phone *</label><input type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} className="mt-1 block w-full rounded-lg border px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 border-gray-300 focus:border-amber-500 focus:ring-amber-500/20" placeholder="(555) 123-4567" /></div>
                <div><label className="block text-sm font-medium text-gray-700">Website</label><input type="text" value={form.website} onChange={(e) => update("website", e.target.value)} className="mt-1 block w-full rounded-lg border px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 border-gray-300 focus:border-amber-500 focus:ring-amber-500/20" placeholder="https://yourlab.com" /></div>
              </div>
            )}

            {/* Step 2: Location */}
            {step === 2 && (
              <div className="space-y-5">
                <h2 className="text-lg font-semibold text-gray-900">Location</h2>
                <div><label className="block text-sm font-medium text-gray-700">City *</label><input type="text" value={form.city} onChange={(e) => update("city", e.target.value)} className="mt-1 block w-full rounded-lg border px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 border-gray-300 focus:border-amber-500 focus:ring-amber-500/20" /></div>
                <div><label className="block text-sm font-medium text-gray-700">State *</label><input type="text" value={form.state} onChange={(e) => update("state", e.target.value)} className="mt-1 block w-full rounded-lg border px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 border-gray-300 focus:border-amber-500 focus:ring-amber-500/20" placeholder="e.g. IL" /></div>
                <div><label className="block text-sm font-medium text-gray-700">ZIP Code *</label><input type="text" value={form.zipCode} onChange={(e) => update("zipCode", e.target.value)} className="mt-1 block w-full rounded-lg border px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 border-gray-300 focus:border-amber-500 focus:ring-amber-500/20" /></div>
              </div>
            )}

            {/* Step 3: Services & Bio */}
            {step === 3 && (
              <div className="space-y-5">
                <h2 className="text-lg font-semibold text-gray-900">Services &amp; Bio</h2>
                <fieldset><legend className="block text-sm font-medium text-gray-700 mb-3">Services *</legend>
                  <div className="grid grid-cols-2 gap-2">
                    {ALL_SERVICES.map((s) => {
                      const selected = form.services.includes(s);
                      return <label key={s} className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 ${selected ? "border-amber-500 bg-amber-50" : "border-gray-200 hover:border-gray-300"}`}><input type="checkbox" checked={selected} onChange={() => toggleService(s)} className="h-4 w-4 rounded border-gray-300 text-amber-500 focus:ring-amber-500" /><span className="text-sm font-medium text-gray-900">{SERVICE_LABELS[s]}</span></label>;
                    })}
                  </div>
                </fieldset>
                <div><label className="block text-sm font-medium text-gray-700">Lab Bio *</label><textarea rows={4} value={form.bio} onChange={(e) => update("bio", e.target.value)} className="mt-2 block w-full rounded-lg border px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 border-gray-300 focus:border-amber-500 focus:ring-amber-500/20" placeholder="Tell dentists about your gold lab..." /></div>
              </div>
            )}

            {/* Step 4: Payment */}
            {step === 4 && (
              <div className="space-y-5">
                <h2 className="text-lg font-semibold text-gray-900">Payment</h2>

                {/* Strategy Milling partner check */}
                <div className="rounded-xl border border-blue-200 bg-blue-50 p-5">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" checked={isStrategy} onChange={(e) => setIsStrategy(e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span className="text-sm font-medium text-blue-800">I'm a Strategy Milling partner</span>
                  </label>
                  {isStrategy && (
                    <div className="mt-3">
                      <input type="email" value={strategyEmail} onChange={(e) => setStrategyEmail(e.target.value)} placeholder="Enter your Strategy Milling account email" className="block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
                      <p className="mt-1 text-xs text-blue-600">We'll verify your partnership. Strategy Milling partners list for free.</p>
                    </div>
                  )}
                </div>

                {!isStrategy ? (
                  <div className="rounded-xl border border-amber-200 bg-amber-50 p-6">
                    <div className="flex items-center justify-between">
                      <div><h3 className="font-semibold text-gray-900">One-Time Listing Fee</h3><p className="text-sm text-gray-600">Single payment. No monthly charges.</p></div>
                      <span className="text-2xl font-bold text-amber-600">$49</span>
                    </div>
                    <a href="https://buy.stripe.com/00w3cvaFS5SxbnRfNK93y00" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-amber-600 w-full justify-center">Pay $49 with Stripe →</a>
                  </div>
                ) : (
                  <div className="rounded-xl border border-green-200 bg-green-50 p-6 text-center">
                    <p className="text-green-700 font-semibold">✓ Strategy Milling Partner — Free Listing</p>
                    <p className="mt-1 text-sm text-green-600">Your listing will be approved after verification.</p>
                    <button type="button" className="mt-4 rounded-xl bg-green-600 px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-green-700">Submit for Verification</button>
                  </div>
                )}
              </div>
            )}

            {Object.keys(errors).length > 0 && (
              <div className="mt-4 rounded-lg bg-red-50 border border-red-200 p-3"><p className="text-sm text-red-600">Please fix the errors above.</p></div>
            )}

            <div className="mt-8 flex items-center justify-between">
              <div>{step > 1 && <button type="button" onClick={prev} className="text-sm font-medium text-gray-500 hover:text-gray-700">← Back</button>}</div>
              {step < 4 && <button type="button" onClick={next} className="rounded-lg bg-amber-500 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-600">Continue →</button>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
