import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { checkSessionFn, changePasswordFn } from "../../lib/auth";
import { createServerFn } from "@tanstack/react-start";
import { sql as getDb } from "../../db";

const SERVICES = ["crowns", "bridges", "inlays", "onlays"] as const;
type Service = (typeof SERVICES)[number];

/** Server function to fetch the current dentist/lab profile */
const getProfileFn = createServerFn()
  .validator((data: { cookieHeader?: string }) => data)
  .handler(async ({ data, context }: any) => {
    const cookieHeader =
      data.cookieHeader ||
      context?.request?.headers?.get?.("cookie") ||
      context?.req?.headers?.get?.("cookie") ||
      "";
    const cookies = cookieHeader.split(";").map((c: string) => c.trim());
    let session: { accountId: string; token: string } | null = null;
    for (const c of cookies) {
      const [name, ...rest] = c.split("=");
      if (name === "gdn_session") {
        const value = rest.join("=");
        const [id, tok] = value.split(":");
        if (id && tok) session = { accountId: id, token: tok };
        break;
      }
    }
    if (!session) return { error: "Not authenticated" };

    const db = getDb();
    // Check dentists
    let rows = await db`SELECT id, practice_name, email, phone, website, address_line1, city, state, zip_code, bio, services FROM dentists WHERE id = ${session.accountId}::uuid AND session_token = ${session.token}`;
    if (rows.length > 0) {
      const r = rows[0];
      return {
        accountType: "dentist",
        profile: {
          name: r.practice_name || "",
          email: r.email || "",
          phone: r.phone || "",
          website: r.website || "",
          address_line1: r.address_line1 || "",
          city: r.city || "",
          state: r.state || "",
          zip_code: r.zip_code || "",
          bio: r.bio || "",
          services: (r.services || []) as string[],
        },
      };
    }
    // Check labs
    rows = await db`SELECT id, lab_name, email, phone, website, address_line1, city, state, zip_code, bio, services FROM labs WHERE id = ${session.accountId}::uuid AND session_token = ${session.token}`;
    if (rows.length > 0) {
      const r = rows[0];
      return {
        accountType: "lab",
        profile: {
          name: r.lab_name || "",
          email: r.email || "",
          phone: r.phone || "",
          website: r.website || "",
          address_line1: r.address_line1 || "",
          city: r.city || "",
          state: r.state || "",
          zip_code: r.zip_code || "",
          bio: r.bio || "",
          services: (r.services || []) as string[],
        },
      };
    }
    return { error: "Session invalid" };
  });

/** Server function to save profile */
const updateProfileFn = createServerFn({ method: "POST" })
  .validator(
    (data: {
      accountType: string;
      accountId: string;
      name: string;
      phone: string;
      website: string;
      address_line1: string;
      city: string;
      state: string;
      zip_code: string;
      bio: string;
      services: string[];
    }) => data
  )
  .handler(async ({ data }) => {
    try {
      const db = getDb();
      const servicesArr = data.services.length > 0 ? data.services : null;
      if (data.accountType === "lab") {
        await db`
          UPDATE labs SET
            lab_name = ${data.name},
            phone = ${data.phone || null},
            website = ${data.website || null},
            address_line1 = ${data.address_line1 || null},
            city = ${data.city || null},
            state = ${data.state || null},
            zip_code = ${data.zip_code || null},
            bio = ${data.bio || null},
            services = ${servicesArr},
            updated_at = NOW()
          WHERE id = ${data.accountId}::uuid
        `;
      } else {
        await db`
          UPDATE dentists SET
            practice_name = ${data.name},
            phone = ${data.phone || null},
            website = ${data.website || null},
            address_line1 = ${data.address_line1 || null},
            city = ${data.city || null},
            state = ${data.state || null},
            zip_code = ${data.zip_code || null},
            bio = ${data.bio || null},
            services = ${servicesArr},
            updated_at = NOW()
          WHERE id = ${data.accountId}::uuid
        `;
      }
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || "Failed to save profile" };
    }
  });

export const Route = createFileRoute("/dashboard/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const [account, setAccount] = useState<{
    id: string;
    accountType: string;
  } | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    website: "",
    address_line1: "",
    city: "",
    state: "",
    zip_code: "",
    bio: "",
    services: [] as string[],
  });
  const [msg, setMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [saving, setSaving] = useState(false);

  // Change password state
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pwMsg, setPwMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [pwLoading, setPwLoading] = useState(false);

  useEffect(() => {
    checkSessionFn({ data: { cookieHeader: document.cookie } }).then((s) => {
      if (!s.authenticated) {
        navigate({ to: "/login" });
      } else {
        setAccount({
          id: s.account.id,
          accountType: s.account.accountType,
        });
        // Fetch profile
        getProfileFn({ data: { cookieHeader: document.cookie } }).then((res: any) => {
          if (res.profile) {
            setProfile(res.profile);
            setForm({
              name: res.profile.name || "",
              phone: res.profile.phone || "",
              website: res.profile.website || "",
              address_line1: res.profile.address_line1 || "",
              city: res.profile.city || "",
              state: res.profile.state || "",
              zip_code: res.profile.zip_code || "",
              bio: res.profile.bio || "",
              services: res.profile.services || [],
            });
          }
          setChecking(false);
        });
      }
    });
  }, []);

  function toggleService(svc: string) {
    setForm((f) => ({
      ...f,
      services: f.services.includes(svc)
        ? f.services.filter((s) => s !== svc)
        : [...f.services, svc],
    }));
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!account) return;
    setSaving(true);
    setMsg(null);
    try {
      const result = await updateProfileFn({
        data: {
          accountType: account.accountType,
          accountId: account.id,
          ...form,
        },
      });
      if (result.success) {
        setMsg({ type: "success", text: "Profile saved!" });
      } else {
        setMsg({ type: "error", text: result.error || "Failed to save." });
      }
    } catch (err: any) {
      setMsg({ type: "error", text: err.message || "Save failed." });
    } finally {
      setSaving(false);
    }
  }

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setPwMsg({ type: "error", text: "New passwords do not match." });
      return;
    }
    if (newPassword.length < 6) {
      setPwMsg({ type: "error", text: "Password must be at least 6 characters." });
      return;
    }
    if (!account) return;
    setPwLoading(true);
    setPwMsg(null);
    try {
      const result = await changePasswordFn({
        data: {
          accountId: account.id,
          accountType: account.accountType,
          oldPassword,
          newPassword,
        },
      });
      if (result.success) {
        setPwMsg({ type: "success", text: "Password changed!" });
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setPwMsg({ type: "error", text: result.error || "Failed to change password." });
      }
    } catch (err: any) {
      setPwMsg({ type: "error", text: err.message || "Password change failed." });
    } finally {
      setPwLoading(false);
    }
  }

  if (checking) {
    return (
      <div className="min-h-dvh bg-gray-50 flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-amber-200 border-t-amber-500" />
      </div>
    );
  }

  if (!account) return null;

  const label = account.accountType === "lab" ? "Lab" : "Practice";

  return (
    <div className="min-h-dvh bg-gray-50">
      <div className="mx-auto max-w-2xl px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{label} Settings</h1>
            <p className="mt-2 text-gray-600">Update your profile and listing details.</p>
          </div>
          <Link
            to="/dashboard"
            className="text-sm text-amber-600 hover:text-amber-700 font-medium"
          >
            ← Back to Dashboard
          </Link>
        </div>

        {/* Profile Form */}
        <form onSubmit={handleSave} className="rounded-2xl bg-white p-8 shadow-sm border border-gray-200 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Profile Information</h2>

          {msg && (
            <div
              className={`rounded-lg p-4 mb-6 text-sm ${
                msg.type === "success"
                  ? "bg-green-50 border border-green-200 text-green-700"
                  : "bg-red-50 border border-red-200 text-red-700"
              }`}
            >
              {msg.text}
            </div>
          )}

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {account.accountType === "lab" ? "Lab" : "Practice"} Name
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Bio</label>
              <textarea
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
                rows={4}
                placeholder="Tell patients about your practice and experience with gold restorations..."
                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="text"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Website</label>
              <input
                type="text"
                value={form.website}
                onChange={(e) => setForm({ ...form, website: e.target.value })}
                placeholder="https://"
                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                value={form.address_line1}
                onChange={(e) => setForm({ ...form, address_line1: e.target.value })}
                placeholder="Street address"
                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
              />
              <div className="mt-2 grid grid-cols-3 gap-2">
                <input
                  type="text"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  placeholder="City"
                  className="rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                />
                <input
                  type="text"
                  value={form.state}
                  onChange={(e) => setForm({ ...form, state: e.target.value })}
                  placeholder="State"
                  maxLength={2}
                  className="rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                />
                <input
                  type="text"
                  value={form.zip_code}
                  onChange={(e) => setForm({ ...form, zip_code: e.target.value })}
                  placeholder="Zip"
                  className="rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                />
              </div>
            </div>

            <fieldset>
              <legend className="block text-sm font-medium text-gray-700 mb-2">
                Services Offered
              </legend>
              <div className="flex flex-wrap gap-2">
                {SERVICES.map((svc) => (
                  <label
                    key={svc}
                    className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm cursor-pointer transition-colors ${
                      form.services.includes(svc)
                        ? "border-amber-500 bg-amber-50 text-amber-700"
                        : "border-gray-300 text-gray-600 hover:border-gray-400"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={form.services.includes(svc)}
                      onChange={() => toggleService(svc)}
                      className="sr-only"
                    />
                    {svc.charAt(0).toUpperCase() + svc.slice(1)}
                  </label>
                ))}
              </div>
            </fieldset>
          </div>

          <div className="mt-8">
            <button
              type="submit"
              disabled={saving}
              className="w-full rounded-lg bg-amber-500 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-amber-600 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>

        {/* Change Password */}
        <form onSubmit={handleChangePassword} className="rounded-2xl bg-white p-8 shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Change Password</h2>

          {pwMsg && (
            <div
              className={`rounded-lg p-4 mb-6 text-sm ${
                pwMsg.type === "success"
                  ? "bg-green-50 border border-green-200 text-green-700"
                  : "bg-red-50 border border-red-200 text-red-700"
              }`}
            >
              {pwMsg.text}
            </div>
          )}

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700">Current Password</label>
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                required
                minLength={6}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                required
                minLength={6}
              />
            </div>
          </div>

          <div className="mt-8">
            <button
              type="submit"
              disabled={pwLoading}
              className="w-full rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition-all hover:bg-gray-50 disabled:opacity-50"
            >
              {pwLoading ? "Changing..." : "Change Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
