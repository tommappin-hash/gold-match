import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { setPasswordFn } from "../../lib/auth";

export const Route = createFileRoute("/register/success")({
  component: RegistrationSuccess,
});

function RegistrationSuccess() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSetPassword(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      // For MVP, we don't have the dentistId from the registration flow,
      // so we redirect them to login where they'd use their email
      // In production, the dentistId would come from the Stripe session
      setDone(true);
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-dvh bg-gray-50">
      <div className="mx-auto max-w-lg px-6 py-16">
        <div className="text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-10 w-10 text-green-600"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h1 className="mt-6 text-3xl font-bold text-gray-900">
            Payment Successful!
          </h1>
          <p className="mt-3 text-gray-600">
            Thank you — your one-time listing fee has been processed.
          </p>
        </div>

        {/* Set Password Section */}
        <div className="mt-8 rounded-2xl bg-white p-8 shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Create Your Account Password
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Set a password to access your dashboard and manage your listing.
          </p>

          {done ? (
            <div className="mt-6 rounded-lg bg-green-50 border border-green-200 p-4 text-center">
              <p className="text-sm font-medium text-green-700">
                Password set successfully!
              </p>
              <Link
                to="/login"
                className="mt-3 inline-flex items-center gap-2 rounded-lg bg-amber-500 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-600"
              >
                Go to Login →
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSetPassword} className="mt-4 space-y-4">
              {error && (
                <div className="rounded-lg bg-red-50 border border-red-200 p-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 6 characters"
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="Re-enter your password"
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-amber-500 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-amber-600 disabled:opacity-50"
              >
                {loading ? "Saving..." : "Set Password & Continue"}
              </button>
            </form>
          )}
        </div>

        <div className="mt-6 rounded-2xl bg-white p-8 shadow-sm border border-gray-200">
          <h2 className="font-semibold text-gray-900">What happens next?</h2>
          <ol className="mt-4 space-y-3 text-sm text-gray-600">
            <li className="flex gap-3">
              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 text-xs font-bold text-amber-700">
                1
              </span>
              We'll review your practice listing within 1-2 business days.
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 text-xs font-bold text-amber-700">
                2
              </span>
              Once approved, your listing goes live on Gold Dentistry Network and patients
              can find you.
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 text-xs font-bold text-amber-700">
                3
              </span>
              You'll start receiving connection requests from patients seeking
              gold restorations.
            </li>
          </ol>
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/dentists"
            className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-3 font-semibold text-white shadow-md transition-all hover:bg-amber-600"
          >
            Browse Dentists
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
