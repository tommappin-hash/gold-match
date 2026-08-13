import { createFileRoute } from "@tanstack/react-router";
import { type ChangeEvent, type FormEvent, useState } from "react";
import { ALL_SERVICES, type Service, formatServiceLabel } from "~/data/dentists";
import { createCheckoutSession } from "~/routes/api/create-checkout";
import { saveDentistRegistration } from "~/routes/api/save-registration";

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
  photos: { url: string; caption?: string }[];
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
    photos: [],
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [payError, setPayError] = useState<string | null>(null);
  const [referrer, setReferrer] = useState("");
  const [photoError, setPhotoError] = useState<string | null>(null);

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

  const MAX_PHOTOS = 6;
  const MAX_PHOTO_BYTES = 5 * 1024 * 1024; // 5MB
  const MAX_DIM = 1600; // downscale longest side to keep payloads lean

  const downscaleImage = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject(new Error("Could not read the image file."));
      reader.onload = () => {
        const img = new Image();
        img.onerror = () => reject(new Error("That file doesn't look like a valid image."));
        img.onload = () => {
          const scale = Math.min(1, MAX_DIM / Math.max(img.width, img.height));
          const w = Math.max(1, Math.round(img.width * scale));
          const h = Math.max(1, Math.round(img.height * scale));
          const canvas = document.createElement("canvas");
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext("2d");
          if (!ctx) return reject(new Error("Your browser doesn't support image processing."));
          ctx.drawImage(img, 0, 0, w, h);
          resolve(canvas.toDataURL("image/jpeg", 0.82));
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    });

  const handlePhotoSelect = async (e: ChangeEvent<HTMLInputElement>) => {
    setPhotoError(null);
    const files = e.target.files ? Array.from(e.target.files) : [];
    e.target.value = ""; // allow re-selecting the same file later
    if (files.length === 0) return;
    if (form.photos.length + files.length > MAX_PHOTOS) {
      setPhotoError(`You can upload up to ${MAX_PHOTOS} photos.`);
      return;
    }
    try {
      const processed: { url: string; caption?: string }[] = [];
      for (const f of files) {
        if (f.size > MAX_PHOTO_BYTES) {
          setPhotoError(`"${f.name}" is larger than 5MB. Please choose a smaller file.`);
          continue;
        }
        const url = await downscaleImage(f);
        processed.push({ url, caption: f.name.replace(/\.[^.]+$/, "") });
      }
      if (processed.length > 0) {
        setForm((prev) => ({ ...prev, photos: [...prev.photos, ...processed] }));
      }
    } catch (err: any) {
      setPhotoError(err.message || "Failed to process photo.");
    }
  };

  const removePhoto = (index: number) => {
    setForm((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }));
    setPhotoError(null);
  };

  const saveAndRedirect = async (stripeUrl: string) => {
    setSubmitting(true);
    setPayError(null);
    try {
      // Save registration to DB first. TanStack server fns require the
      // payload under `data:` — the client wrapper reads opts.data.
      const saveResult = await saveDentistRegistration({
        data: {
          practiceName: form.practiceName,
          email: form.email,
          phone: form.phone,
          website: form.website,
          addressLine1: form.addressLine1,
          addressLine2: form.addressLine2,
          city: form.city,
          state: form.state,
          zipCode: form.zipCode,
          bio: form.bio,
          services: form.services,
          photos: form.photos,
        },
      });
      if (!saveResult.success) {
        setPayError(saveResult.error || "Failed to save registration. Please try again.");
        setSubmitting(false);
        return;
      }
      // Redirect to Stripe (append dentistId for password setup flow)
      const url = new URL(stripeUrl, window.location.origin);
      url.searchParams.set("dentist_id", saveResult.dentistId);
      window.location.href = url.toString();
    } catch (err: any) {
      setSubmitting(false);
      setPayError(err.message || "Failed to save registration. Please try again.");
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validateStep(step);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    // For the form submit on step 3, just trigger save via the link
  };


  return (
    <div className="min-h-dvh bg-gray-50">
      <div className="mx-auto max-w-2xl px-6 py-16">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900">
            List Your Practice
          </h1>
          <p className="mt-3 text-gray-600">
            Join Gold Dentistry Network and connect with patients looking for gold
            restorations. One-time fee — no commissions.
          </p>
          <p className="mt-2 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-4 py-2">
            🦷 <strong>Easy Gold Crowns</strong> will be advertising in your area to drive patients to your listing.
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

                {/* Practice photos */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Practice Photos
                  </label>
                  <p className="mt-1 text-xs text-gray-400">
                    Upload photos of your practice (optional). JPG, PNG up to 5MB each — we'll
                    optimize them automatically. Up to 6 photos.
                  </p>
                  <div className="mt-2">
                    <label className="relative flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 px-6 py-4 text-sm text-gray-500 hover:border-amber-400 hover:text-amber-600 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                      </svg>
                      Choose Files
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        multiple
                        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                        onChange={handlePhotoSelect}
                      />
                    </label>
                    {photoError && (
                      <p className="mt-2 text-sm text-red-600">{photoError}</p>
                    )}
                    {form.photos.length > 0 && (
                      <ul className="mt-3 space-y-2">
                        {form.photos.map((p, i) => (
                          <li key={i} className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700">
                            <img src={p.url} alt="" className="h-10 w-10 rounded object-cover" />
                            <span className="flex-1 truncate">{p.caption || `Photo ${i + 1}`}</span>
                            <button
                              type="button"
                              onClick={() => removePhoto(i)}
                              className="text-xs font-medium text-red-600 hover:text-red-800"
                            >
                              Remove
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Payment */}
            {step === 3 && (() => {
              const showFounder = referrer.trim().length > 0;
              const price = showFounder ? "$24.50" : "$49";
              const stripeLink = showFounder
                ? "https://buy.stripe.com/6oUbJ1bJWbcR3VpeJG93y01"
                : "https://buy.stripe.com/00w3cvaFS5SxbnRfNK93y00";
              const priceLabel = showFounder ? "Founding Member — 50% off" : "Standard";

              return (
              <div className="space-y-5">
                <h2 className="text-lg font-semibold text-gray-900">
                  Payment
                </h2>

                {/* Founders / referrer question */}
                <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Are you a current Easy Gold Crown customer or were you referred by one?
                  </label>
                  <p className="text-xs text-gray-500 mb-3">
                    Enter the name of the customer who referred you, or write "I am a current customer" to unlock the Founding Member rate.
                  </p>
                  <input
                    type="text"
                    value={referrer}
                    onChange={(e) => setReferrer(e.target.value)}
                    placeholder="Referring dentist name or 'I am a current customer'"
                    className="block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 text-sm"
                  />
                </div>

                {/* Price display */}
                <div className={`rounded-xl border p-6 ${showFounder ? "border-green-200 bg-green-50" : "border-amber-200 bg-amber-50"}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        One-Time Listing Fee
                      </h3>
                      <p className="mt-1 text-sm text-gray-600">
                        Single payment. No monthly charges. No commissions.
                      </p>
                    </div>
                    <div className="text-right">
                      {showFounder && (
                        <span className="block text-xs font-medium text-green-700 line-through">$49</span>
                      )}
                      <span className={`text-2xl font-bold ${showFounder ? "text-green-600" : "text-amber-600"}`}>
                        {price}
                      </span>
                      <span className="block text-xs font-medium text-gray-500">{priceLabel}</span>
                    </div>
                  </div>
                </div>

                {/* Real Stripe payment */}
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-6 text-center">
                  {payError && (
                    <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                      {payError}
                    </div>
                  )}
                  <p className="text-sm text-gray-600">
                    Click the button below to complete your payment securely via
                    Stripe. You'll be redirected to Stripe's checkout page.
                  </p>
                  <button
                    type="button"
                    onClick={() => saveAndRedirect(stripeLink)}
                    disabled={submitting}
                    className="mt-4 inline-flex items-center gap-2 rounded-xl bg-amber-500 px-8 py-3 text-lg font-semibold text-white shadow-md transition-all hover:bg-amber-600 disabled:opacity-50"
                  >
                    {submitting ? "Saving..." : `Pay ${price} with Stripe →`}
                  </button>
                  <p className="mt-3 text-xs text-gray-400">
                    After payment, you'll be redirected back to confirm your
                    listing.
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
                    I agree to the Gold Dentistry Network terms of service and understand
                    that my listing will be reviewed before going live. I
                    confirm that I am a licensed dental professional offering
                    gold restoration services.
                  </span>
                </label>
              </div>
              );
            })()}

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
                <a
                  href="https://buy.stripe.com/00w3cvaFS5SxbnRfNK93y00"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-8 py-3 text-sm font-semibold text-white shadow-md hover:bg-amber-600 transition-colors"
                >
                  Pay $49 with Stripe →
                </a>
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
