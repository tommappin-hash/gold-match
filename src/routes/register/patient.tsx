import { createFileRoute } from "@tanstack/react-router";
import { type FormEvent, useState } from "react";

export const Route = createFileRoute("/register/patient")({
  component: PatientRegister,
});

type FormData = {
  name: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  zipCode: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

function PatientRegister() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    zipCode: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const validate = (): FormErrors => {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Please enter a valid email";
    if (!form.city.trim()) e.city = "City is required";
    if (!form.state.trim()) e.state = "State is required";
    if (!form.zipCode.trim()) e.zipCode = "ZIP code is required";
    return e;
  };

  const update = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    // Simulate server call — will be replaced with createServerFn when DB connects
    await new Promise((r) => setTimeout(r, 800));
    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-dvh bg-gray-50 flex items-center justify-center px-6">
        <div className="max-w-md w-full rounded-2xl bg-white p-8 shadow-sm border border-gray-200 text-center">
          <span className="text-5xl">🎉</span>
          <h1 className="mt-4 text-2xl font-bold text-gray-900">
            Welcome to GoldMatch!
          </h1>
          <p className="mt-3 text-gray-600">
            Your account has been created. You can now save favorite dentists
            and send connection requests.
          </p>
          <div className="mt-8 flex flex-col gap-3">
            <a
              href="/dentists"
              className="rounded-xl bg-amber-500 px-6 py-3 font-semibold text-white shadow-sm hover:bg-amber-600 transition-colors"
            >
              Browse Dentists
            </a>
            <a
              href="/"
              className="text-sm text-gray-500 hover:text-amber-600 transition-colors"
            >
              Back to Home
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-gray-50">
      <div className="mx-auto max-w-lg px-6 py-16">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900">
            Create Your Account
          </h1>
          <p className="mt-3 text-gray-600">
            Sign up to save dentists and request connections. It's free.
          </p>
        </div>

        <div className="rounded-2xl bg-white p-8 shadow-sm border border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                className={`mt-1 block w-full rounded-lg border px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 ${
                  errors.name
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
                    : "border-gray-300 focus:border-amber-500 focus:ring-amber-500/20"
                }`}
                placeholder="Jane Smith"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                className={`mt-1 block w-full rounded-lg border px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 ${
                  errors.email
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
                    : "border-gray-300 focus:border-amber-500 focus:ring-amber-500/20"
                }`}
                placeholder="jane@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone <span className="text-gray-400">(optional)</span>
              </label>
              <input
                type="tel"
                id="phone"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                placeholder="(555) 123-4567"
              />
            </div>

            {/* Location */}
            <fieldset className="space-y-4">
              <legend className="text-sm font-medium text-gray-700">
                Your Location <span className="text-red-500">*</span>
              </legend>
              <div>
                <input
                  type="text"
                  placeholder="City"
                  value={form.city}
                  onChange={(e) => update("city", e.target.value)}
                  className={`block w-full rounded-lg border px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 ${
                    errors.city
                      ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
                      : "border-gray-300 focus:border-amber-500 focus:ring-amber-500/20"
                  }`}
                />
                {errors.city && (
                  <p className="mt-1 text-sm text-red-600">{errors.city}</p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <input
                    type="text"
                    placeholder="State (e.g. CA)"
                    value={form.state}
                    onChange={(e) => update("state", e.target.value)}
                    className={`block w-full rounded-lg border px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 ${
                      errors.state
                        ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
                        : "border-gray-300 focus:border-amber-500 focus:ring-amber-500/20"
                    }`}
                  />
                  {errors.state && (
                    <p className="mt-1 text-sm text-red-600">{errors.state}</p>
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="ZIP Code"
                    value={form.zipCode}
                    onChange={(e) => update("zipCode", e.target.value)}
                    className={`block w-full rounded-lg border px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 ${
                      errors.zipCode
                        ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
                        : "border-gray-300 focus:border-amber-500 focus:ring-amber-500/20"
                    }`}
                  />
                  {errors.zipCode && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.zipCode}
                    </p>
                  )}
                </div>
              </div>
            </fieldset>

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-xl bg-amber-500 px-6 py-3 font-semibold text-white shadow-md transition-all hover:bg-amber-600 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <a href="#" className="font-medium text-amber-600 hover:text-amber-700">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
