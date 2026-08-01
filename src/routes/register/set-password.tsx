import { createFileRoute, Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useState } from "react";
import { setPasswordFn } from "../../lib/auth";

export const Route = createFileRoute("/register/set-password")({
  validateSearch: (search: Record<string, unknown>) => ({
    dentistId: (search.dentistId as string) || "",
    email: (search.email as string) || "",
  }),
  component: SetPasswordPage,
});

function SetPasswordPage() {
  const navigate = useNavigate();
  const { dentistId, email } = Route.useSearch();
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
    if (!dentistId) {
      setError("Missing dentist ID. Please use the link from your registration confirmation.");
      return;
    }
    setLoading(true);
    try {
      const result = await setPasswordFn({ data: { accountId: dentistId, password } });
      if (result.success && result.cookie) {
        document.cookie = result.cookie["Set-Cookie"];
        setDone(true);
      } else {
        setError(result.error || "Failed to set password.");
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-dvh bg-gray-50 flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2">
            <span className="text-2xl">🦷</span>
            <span className="text-xl font-bold text-gray-900">
              Gold<span className="text-amber-500"> Dentistry Network</span>
            </span>
          </Link>
        </div>

        <div className="rounded-2xl bg-white p-8 shadow-sm border border-gray-200">
          {done ? (
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-8 w-8 text-green-600">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                </svg>
              </div>
              <h1 className="mt-4 text-2xl font-bold text-gray-900">Account Created!</h1>
              <p className="mt-2 text-sm text-gray-600">
                Your password has been set. You can now log in.
              </p>
              <Link
                to="/login"
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-amber-500 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-amber-600"
              >
                Sign In →
              </Link>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-gray-900">Set Your Password</h1>
              <p className="mt-2 text-sm text-gray-600">
                {email ? (
                  <>Create a password for <strong>{email}</strong> to access your dashboard.</>
                ) : (
                  "Create a password to access your practice dashboard."
                )}
              </p>

              <form onSubmit={handleSetPassword} className="mt-6 space-y-5">
                {error && (
                  <div className="rounded-lg bg-red-50 border border-red-200 p-4">
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
                  {loading ? "Saving..." : "Set Password"}
                </button>

                {!dentistId && (
                  <p className="text-xs text-gray-400 text-center">
                    No dentist ID provided. Use the link from your registration email.
                  </p>
                )}
              </form>
            </>
          )}
        </div>

        <div className="mt-6 text-center">
          <Link to="/" className="text-sm text-gray-500 hover:text-gray-700">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
