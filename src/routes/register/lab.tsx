import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

const ALL_SERVICES = ["crowns", "bridges", "inlays", "onlays"] as const;
const SERVICE_LABELS: Record<string, string> = {
  crowns: "Crowns", bridges: "Bridges", inlays: "Inlays", onlays: "Onlays",
};

type Step = 1 | 2 | 3;

export const Route = createFileRoute("/register/lab")({
  component: LabRegistration,
});

function LabRegistration() {
  const [step, setStep] = useState<Step>(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    labName: "", email: "", phone: "", website: "",
    city: "", state: "", zipCode: "",
    bio: "", services: [] as string[],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [submitting, setSubmitting] = useState(false);

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

  function next() { if (validateStep(step)) setStep((s) => Math.min(3, s + 1) as Step); }
  function prev() { setStep((s) => Math.max(1, s - 1) as Step); }

  async function handleSubmit() {
    if (!validateStep(3)) return;
    setSubmitting(true);
    try {
      const { createLab } = await import("../api/labs");
      await createLab({
        labName: form.labName,
        email: form.email,
        phone: form.phone,
        website: form.website,
        city: form.city,
        state: form.state,
        zipCode: form.zipCode,
        bio: form.bio,
        services: form.services,
      });
      setSubmitted(true);
    } catch (err) {
      console.error("Submit failed:", err);
      setErrors({ submit: "Something went wrong. Please try again." });
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="min-h-dvh bg-gray-50 flex items-center justify-center">
        <div className="mx-auto max-w-lg px-6 py-16 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <span className="text-3xl">✓</span>
          </div>
          <h1 className="mt-6 text-2xl font-bold text-gray-900">Submitted!</h1>
          <p className="mt-3 text-gray-600">Your lab listing has been submitted for review. We'll publish it shortly — usually within one business day.</p>
          <div className="mt-8 rounded-xl bg-white p-6 shadow-sm border border-gray-200 text-left">
            <h2 className="font-semibold text-gray-900">{form.labName}</h2>
            <p className="mt-1 text-sm text-gray-500">{form.email}</p>
            <p className="text-sm text-gray-500">{[form.city, form.state, form.zipCode].filter(Boolean).join(", ")}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {form.services.map((s) => <span key={s} className="rounded-full bg-amber-50 px-2 py-0.5 text-xs text-amber-700">{SERVICE_LABELS[s]}</span>)}
            </div>
          </div>
          <Link to="/labs" className="mt-6 inline-block text-amber-600 hover:text-amber-700 font-medium">← View all labs</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-gray-50">
      <div className="mx-auto max-w-2xl px-6 py-16">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900">List Your Lab</h1>
          <p className="mt-3 text-gray-600">Free, open to all gold dental labs. No fees, no catch.</p>
          <div className="mt-8 flex items-center justify-center gap-2">
            {[1,2,3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${step >= s ? "bg-amber-500 text-white ring-4 ring-amber-200" : "bg-gray-200 text-gray-500"}`}>{s}</div>
                <span className="hidden sm:inline text-sm font-medium">{["Lab Info","Location","Services & Bio"][s-1]}</span>
                {s < 3 && <div className="hidden sm:block h-px w-6 bg-gray-200" />}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-white p-8 shadow-sm border border-gray-200">
          <form onSubmit={(e) => e.preventDefault()}>
            {step === 1 && (
              <div className="space-y-5">
                <h2 className="text-lg font-semibold text-gray-900">Lab Information</h2>
                <div><label className="block text-sm font-medium text-gray-700">Lab Name *</label><input type="text" value={form.labName} onChange={(e) => update("labName", e.target.value)} className="mt-1 block w-full rounded-lg border px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 border-gray-300 focus:border-amber-500 focus:ring-amber-500/20" placeholder="e.g. Precision Gold Lab" />{errors.labName && <p className="mt-1 text-xs text-red-500">{errors.labName}</p>}</div>
                <div><label className="block text-sm font-medium text-gray-700">Email *</label><input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className="mt-1 block w-full rounded-lg border px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 border-gray-300 focus:border-amber-500 focus:ring-amber-500/20" placeholder="info@yourlab.com" />{errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}</div>
                <div><label className="block text-sm font-medium text-gray-700">Phone *</label><input type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} className="mt-1 block w-full rounded-lg border px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 border-gray-300 focus:border-amber-500 focus:ring-amber-500/20" placeholder="(555) 123-4567" />{errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}</div>
                <div><label className="block text-sm font-medium text-gray-700">Website</label><input type="text" value={form.website} onChange={(e) => update("website", e.target.value)} className="mt-1 block w-full rounded-lg border px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 border-gray-300 focus:border-amber-500 focus:ring-amber-500/20" placeholder="https://yourlab.com" /></div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5">
                <h2 className="text-lg font-semibold text-gray-900">Location</h2>
                <div><label className="block text-sm font-medium text-gray-700">City *</label><input type="text" value={form.city} onChange={(e) => update("city", e.target.value)} className="mt-1 block w-full rounded-lg border px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 border-gray-300 focus:border-amber-500 focus:ring-amber-500/20" />{errors.city && <p className="mt-1 text-xs text-red-500">{errors.city}</p>}</div>
                <div><label className="block text-sm font-medium text-gray-700">State *</label><input type="text" value={form.state} onChange={(e) => update("state", e.target.value)} className="mt-1 block w-full rounded-lg border px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 border-gray-300 focus:border-amber-500 focus:ring-amber-500/20" placeholder="e.g. IL" />{errors.state && <p className="mt-1 text-xs text-red-500">{errors.state}</p>}</div>
                <div><label className="block text-sm font-medium text-gray-700">ZIP Code *</label><input type="text" value={form.zipCode} onChange={(e) => update("zipCode", e.target.value)} className="mt-1 block w-full rounded-lg border px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 border-gray-300 focus:border-amber-500 focus:ring-amber-500/20" />{errors.zipCode && <p className="mt-1 text-xs text-red-500">{errors.zipCode}</p>}</div>
              </div>
            )}

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
                  {errors.services && <p className="mt-1 text-xs text-red-500">{errors.services}</p>}
                </fieldset>
                <div><label className="block text-sm font-medium text-gray-700">Lab Bio *</label><textarea rows={4} value={form.bio} onChange={(e) => update("bio", e.target.value)} className="mt-2 block w-full rounded-lg border px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 border-gray-300 focus:border-amber-500 focus:ring-amber-500/20" placeholder="Tell dentists about your gold lab..." />{errors.bio && <p className="mt-1 text-xs text-red-500">{errors.bio}</p>}</div>
              </div>
            )}

            {Object.keys(errors).length > 0 && (
              <div className="mt-4 rounded-lg bg-red-50 border border-red-200 p-3"><p className="text-sm text-red-600">Please fix the errors above.</p></div>
            )}

            <div className="mt-8 flex items-center justify-between">
              <div>{step > 1 && <button type="button" onClick={prev} className="text-sm font-medium text-gray-500 hover:text-gray-700">← Back</button>}</div>
              {step < 3 ? (
                <button type="button" onClick={next} className="rounded-lg bg-amber-500 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-600">Continue →</button>
              ) : (
                <button type="button" onClick={handleSubmit} disabled={submitting} className="rounded-lg bg-amber-500 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-600 disabled:opacity-50">{submitting ? "Submitting..." : "Submit Listing"}</button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
