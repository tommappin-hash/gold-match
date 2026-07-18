import { createFileRoute } from "@tanstack/react-router";
import { type FormEvent, useState } from "react";
import { ALL_SERVICES, type Service, formatServiceLabel } from "~/data/dentists";
import { createCheckoutSession } from "~/routes/api/create-checkout";

export const Route = createFileRoute("/register/dentist")({
  component: DentistRegister,
});

type FormData = {
  practiceName: string;
  email: string;
  phone: string;
  website: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zipCode: string;
  bio: string;
  services: Service[];
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const STEPS = ["Practice Info", "Location", "Services & Bio", "Payment"] as const;

function DentistRegister() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>({
    practiceName: "",
    email: "",
    phone: "",
    website: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
    bio: "",
    services: [],
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const update = (field: keyof FormData, value: string | Service[]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const toggleService = (s: Service) => {
    const next = form.services.includes(s)
      ? form.services.filter((x) => x !== s)
      : [...form.services, s];
    update("services", next);
  };

  const validateStep = (s: number): FormErrors => {
    const e: FormErrors = {};
    if (s === 0) {
      if (!form.practiceName.trim()) e.practiceName = "Practice name is required";
      if (!form.email.trim()) e.email = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
        e.email = "Please enter a valid email";
      if (!form.phone.trim()) e.phone = "Phone is required";
    }
    if (s === 1) {
      if (!form.addressLine1.trim()) e.addressLine1 = "Address is required";
      if (!form.city.trim()) e.city = "City is required";
      if (!form.state.trim()) e.state = "State is required";
      if (!form.zipCode.trim()) e.zipCode = "ZIP code is required";
    }
    if (s === 2) {
      if (form.services.length === 0) e.services = "Select at least one service" as any;
      if (!form.bio.trim()) e.bio = "Bio is required";
    }
    return e;
  };

  const handleNext = () => {
    const validationErrors = validateStep(step);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const handleBack = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validateStep(step);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    try {
      const result = await createCheckoutSession({
        practiceName: form.practiceName,
        practiceEmail: form.email,
      });
      // Redirect to Stripe Checkout (or mock success page)
      if (result.url) {
        window.location.href = result.url;
      }
    } catch (err: any) {
      setSubmitting(false);
      setErrors({ practiceName: err.message || "Payment failed. Please try again." } as any);
    }
  };


  return (
    <div className="min-h-dvh bg-gray-50">
      <div className="mx-auto max-w-2xl px-6 py-16">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900">
            List Your Practice
          </h1>
          <p className="mt-3 text-gray-600">
            Join GoldMatch and connect with patients looking for gold
            restorations. One-time fee — no commissions.
          </p>

          {/* Step indicators */}
          <div className="mt-8 flex items-center justify-center gap-2">
            {STEPS.map((label, i) => (
              <div key={label} className="flex items-center gap-2">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                    i < step
                      ? "bg-amber-500 text-white"
                      : i === step
                        ? "bg-amber-500 text-white ring-4 ring-amber-200"
                        : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {i < step ? "✓" : i + 1}
                </div>
                <span
                  className={`hidden sm:inline text-sm font-medium ${
                    i <= step ? "text-gray-900" : "text-gray-400"
                  }`}
                >
                  {label}
                </span>
                {i < STEPS.length - 1 && (
                  <div
                    className={`hidden sm:block h-px w-8 ${
                      i < step ? "bg-amber-500" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-white p-8 shadow-sm border border-gray-200">
          <form onSubmit={step === STEPS.length - 1 ? handleSubmit : undefined}>
            {/* Step 0: Practice Info */}
            {step === 0 && (
              <div className="space-y-5">
                <h2 className="text-lg font-semibold text-gray-900">
                  Practice Information
                </h2>
                <InputField
                  label="Practice Name"
                  required
                  value={form.practiceName}
                  onChange={(v) => update("practiceName", v)}
                  error={errors.practiceName}
                  placeholder="e.g. Golden State Dental Studio"
                />
                <InputField
                  label="Email Address"
                  required
                  type="email"
                  value={form.email}
                  onChange={(v) => update("email", v)}
                  error={errors.email}
                  placeholder="dr@yourpractice.com"
                />
                <InputField
                  label="Phone"
                  required
                  type="tel"
                  value={form.phone}
                  onChange={(v) => update("phone", v)}
                  error={errors.phone}
                  placeholder="(555) 123-4567"
                />
                <InputField
                  label="Website"
                  value={form.website}
                  onChange={(v) => update("website", v)}
                  placeholder="https://yourpractice.com"
                />
              </div>
            )}

            {/* Step 1: Location */}
            {step === 1 && (
              <div className="space-y-5">
                <h2 className="text-lg font-semibold text-gray-900">
                  Practice Location
                </h2>
                <InputField
                  label="Address Line 1"
                  required
                  value={form.addressLine1}
                  onChange={(v) => update("addressLine1", v)}
                  error={errors.addressLine1}
                  placeholder="123 Main St, Suite 100"
                />
                <InputField
                  label="Address Line 2"
                  value={form.addressLine2}
                  onChange={(v) => update("addressLine2", v)}
                  placeholder="Building B (optional)"
                />
                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-2">
                    <InputField
                      label="City"
                      required
                      value={form.city}
                      onChange={(v) => update("city", v)}
                      error={errors.city}
                      placeholder="San Francisco"
                    />
                  </div>
                  <InputField
                    label="State"
                    required
                    value={form.state}
                    onChange={(v) => update("state", v)}
                    error={errors.state}
                    placeholder="CA"
                  />
                </div>
                <InputField
                  label="ZIP Code"
                  required
                  value={form.zipCode}
                  onChange={(v) => update("zipCode", v)}
                  error={errors.zipCode}
                  placeholder="94108"
                />
              </div>
            )}

            {/* Step 2: Services & Bio */}
            {step === 2 && (
              <div className="space-y-5">
                <h2 className="text-lg font-semibold text-gray-900">
                  Services & Bio
                </h2>

                <fieldset>
                  <legend className="block text-sm font-medium text-gray-700 mb-3">
                    Services Offered <span className="text-red-500">*</span>
                  </legend>
                  <div className="grid grid-cols-2 gap-2">
                    {ALL_SERVICES.map((s) => {
                      const selected = form.services.includes(s);
                      return (
                        <label
                          key={s}
                          className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 transition-colors ${
                            selected
                              ? "border-amber-500 bg-amber-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={selected}
                            onChange={() => toggleService(s)}
                            className="h-4 w-4 rounded border-gray-300 text-amber-500 focus:ring-amber-500"
                          />
                          <span className="text-sm font-medium text-gray-900">
                            {formatServiceLabel(s)}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                  {errors.services && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.services}
                    </p>
                  )}
                </fieldset>

                <div>
                  <label
                    htmlFor="bio"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Practice Bio <span className="text-red-500">*</span>
                  </label>
                  <p className="mt-1 text-xs text-gray-400">
                    Tell patients about your experience with gold restorations.
                  </p>
                  <textarea
                    id="bio"
                    rows={4}
                    value={form.bio}
                    onChange={(e) => update("bio", e.target.value)}
                    className={`mt-2 block w-full rounded-lg border px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 ${
                      errors.bio
                        ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
                        : "border-gray-300 focus:border-amber-500 focus:ring-amber-500/20"
                    }`}
                    placeholder="Dr. Smith has over 15 years of experience specializing in gold restorations..."
                  />
                  {errors.bio && (
                    <p className="mt-1 text-sm text-red-600">{errors.bio}</p>
                  )}
                </div>

                {/* Photo upload placeholder */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Practice Photos
                  </label>
                  <p className="mt-1 text-xs text-gray-400">
                    Upload photos of your practice (optional). JPG, PNG up to 5MB.
                  </p>
                  <div className="mt-2 flex items-center gap-4">
                    <label className="flex cursor-pointer items-center gap-2 rounded-lg border-2 border-dashed border-gray-300 px-6 py-4 text-sm text-gray-500 hover:border-amber-400 hover:text-amber-600 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                      </svg>
                      Choose Files
                      <input type="file" accept="image/*" multiple className="hidden" disabled />
                    </label>
                    <span className="text-xs text-gray-400">No files chosen</span>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Payment */}
            {step === 3 && (
              <div className="space-y-5">
                <h2 className="text-lg font-semibold text-gray-900">
                  Payment
                </h2>

                <div className="rounded-xl border border-amber-200 bg-amber-50 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        One-Time Listing Fee
                      </h3>
                      <p className="mt-1 text-sm text-gray-600">
                        Single payment. No monthly charges. No commissions.
                      </p>
                    </div>
                    <span className="text-2xl font-bold text-amber-600">
                      $49
                    </span>
                  </div>
                </div>

                {/* Mock payment form */}
                <div className="space-y-4 rounded-xl border border-gray-200 p-6">
                  <p className="text-sm font-medium text-gray-700">
                    Card Details
                  </p>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      placeholder="4242 4242 4242 4242"
                      className="block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                      readOnly
                      value="4242 4242 4242 4242"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">
                        Expiry
                      </label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                        readOnly
                        value="12/28"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">
                        CVC
                      </label>
                      <input
                        type="text"
                        placeholder="123"
                        className="block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                        readOnly
                        value="***"
                      />
                    </div>
                  </div>
                  <p className="text-xs text-gray-400">
                    🔒 Payment processing will be handled by Stripe when
                    connected. This is a mock payment form for demonstration.
                  </p>
                </div>

                {/* Terms checkbox */}
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    className="mt-0.5 h-4 w-4 rounded border-gray-300 text-amber-500 focus:ring-amber-500"
                  />
                  <span className="text-sm text-gray-600">
                    I agree to the GoldMatch terms of service and understand
                    that my listing will be reviewed before going live. I
                    confirm that I am a licensed dental professional offering
                    gold restoration services.
                  </span>
                </label>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="mt-8 flex items-center justify-between">
              {step > 0 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  ← Back
                </button>
              ) : (
                <div />
              )}

              {step < STEPS.length - 1 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="rounded-lg bg-amber-500 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-600 transition-colors"
                >
                  Continue →
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-lg bg-amber-500 px-8 py-3 text-sm font-semibold text-white shadow-md hover:bg-amber-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? "Processing..." : "Pay $49 & List Practice"}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function InputField({
  label,
  required,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
}: {
  label: string;
  required?: boolean;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`mt-1 block w-full rounded-lg border px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 ${
          error
            ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
            : "border-gray-300 focus:border-amber-500 focus:ring-amber-500/20"
        }`}
        placeholder={placeholder}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
