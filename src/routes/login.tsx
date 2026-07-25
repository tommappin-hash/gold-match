import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { loginFn, setPasswordFn, lookupDentistFn } from "../lib/auth";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [noPassword, setNoPassword] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setNoPassword(false);
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }
    setLoading(true);
    try {
      const result = await loginFn({ data: { email, password } });
      if (result.success && result.cookie) {
        document.cookie = result.cookie["Set-Cookie"];
        navigate({ to: "/dashboard" });
      } else if (result.error?.includes("No password set")) {
        setNoPassword(true);
      } else {
        setError(result.error || "Login failed.");
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSetPassword(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      const lookup = await lookupDentistFn({ data: { email } });
      if (!lookup.found) {
        setError("Account not found. Check your email or register first.");
        setLoading(false);
        return;
      }
      const result = await setPasswordFn({ data: { dentistId: lookup.dentistId, password } });
      if (result.success && result.cookie) {
        document.cookie = result.cookie["Set-Cookie"];
        navigate({ to: "/dashboard" });
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
          <h1 className="text-2xl font-bold text-gray-900">Dentist Login</h1>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to manage your practice listing and view patient connections.
          </p>

          <form onSubmit={noPassword ? handleSetPassword : handleLogin} className="mt-6 space-y-5">
            {error && (
              <div className="rounded-lg bg-red-50 border border-red-200 p-4">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {noPassword && (
              <div className="rounded-lg bg-amber-50 border border-amber-200 p-4">
                <p className="text-sm text-amber-700 font-medium">No password set yet!</p>
                <p className="text-xs text-amber-600 mt-1">
                  Your account exists but needs a password. Choose one below to activate your account.
                </p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="dr@yourpractice.com"
                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                {noPassword ? "Choose Password" : "Password"}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={noPassword ? "Create a new password" : "Enter your password"}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                required
              />
            </div>

            {noPassword && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                  required
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-amber-500 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-amber-600 disabled:opacity-50"
            >
              {loading ? (noPassword ? "Setting up..." : "Signing in...") : (noPassword ? "Set Password & Sign In" : "Sign In")}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Don't have an account?{" "}
              <Link
                to="/register/dentist"
                className="font-medium text-amber-600 hover:text-amber-700"
              >
                List your practice
              </Link>
            </p>
            <p className="mt-2 text-sm text-gray-500">
              First time signing in?{" "}
              <button
                type="button"
                onClick={() => { setNoPassword(true); setError(""); }}
                className="font-medium text-amber-600 hover:text-amber-700 underline bg-transparent border-none cursor-pointer"
              >
                Set up your password
              </button>
            </p>
          </div>
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
