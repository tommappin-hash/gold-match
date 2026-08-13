import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { type FormEvent, useState } from "react";
import { formatServiceLabel, sampleDentists } from "~/data/dentists";
import { submitConnection } from "~/routes/api/connections";
import { trackPageView } from "~/routes/api/analytics";

export const Route = createFileRoute("/dentists/$id")({
  loader: async ({ params }) => {
    trackPageView({ data: { path: `/dentists/${params.id}` } }).catch(() => {});
    // Try the server function first, fall back to mock data
    try {
      const { getDentistById } = await import("~/routes/api/dentists");
      const dentist = await getDentistById({ data: params.id });
      if (dentist) return dentist;
    } catch (err) {
      console.error("getDentistById failed:", err);
    }
    // Fallback to mock data directly
    const dentist = sampleDentists.find((d) => d.id === params.id);
    if (!dentist) throw notFound();
    return dentist;
  },
  component: DentistProfile,
});

function DentistProfile() {
  const dentist = Route.useLoaderData();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [connectionSent, setConnectionSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const handleConnect = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSending(true);
    try {
      await submitConnection({ data: {
        dentistId: dentist.id,
        patientName: name,
        patientEmail: email,
        message,
      },
      });
      setConnectionSent(true);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-dvh bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-5xl px-6 py-4">
          <Link
            to="/dentists"
            className="inline-flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-amber-600 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
              <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
            </svg>
            Back to all dentists
          </Link>
        </div>
      </div>
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <div className="rounded-2xl bg-white p-8 shadow-sm border border-gray-200">
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{dentist.practiceName}</h1>
              <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-gray-500">
                <span className="inline-flex items-center gap-1.5">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                    <path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003h.001zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clipRule="evenodd" />
                  </svg>
                  {dentist.addressLine1}, {dentist.city}, {dentist.state} {dentist.zipCode}
                </span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {dentist.services.map((s) => (
                  <span key={s} className="rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800">
                    {formatServiceLabel(s)}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-2xl bg-white p-8 shadow-sm border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">About the Practice</h2>
              <p className="mt-3 leading-relaxed text-gray-600">{dentist.bio}</p>
            </div>
            {dentist.photos.length > 0 && (
              <div className="rounded-2xl bg-white p-8 shadow-sm border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Photos</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {dentist.photos.map((photo, i) => (
                    <div key={i} className="overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
                      {photo.url && (
                        <img src={photo.url} alt={photo.caption || "Practice photo"} className="h-auto w-full" loading="lazy" />
                      )}
                      {!photo.url && (
                        <div className="p-8 text-center text-sm text-gray-400">🦷 {photo.caption || "Practice photo"}</div>
                      )}
                      {photo.caption && (
                        <div className="px-3 py-2 text-sm text-gray-600">{photo.caption}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="rounded-2xl bg-gradient-to-br from-amber-50 to-white p-8 shadow-sm border border-amber-200">
              <h2 className="text-lg font-semibold text-gray-900">Request a Connection</h2>
              <p className="mt-2 text-sm text-gray-600">
                Interested in {dentist.practiceName}? Fill out this form and the practice will reach out.
              </p>
              {connectionSent ? (
                <div className="mt-6 rounded-xl bg-green-50 border border-green-200 p-6 text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="mx-auto h-10 w-10 text-green-500">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                  </svg>
                  <h3 className="mt-3 text-lg font-semibold text-green-800">Request Sent!</h3>
                  <p className="mt-1 text-sm text-green-700">Your connection request has been sent to {dentist.practiceName}. They will reach out to you at {email}.</p>
                  <button type="button" onClick={() => { setConnectionSent(false); setName(""); setEmail(""); setMessage(""); }} className="mt-4 text-sm font-medium text-green-700 underline hover:text-green-800">
                    Send another request
                  </button>
                </div>
              ) : (
                <form className="mt-6 space-y-4" onSubmit={handleConnect}>
                  {error && <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">{error}</div>}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Your Name</label>
                    <input type="text" id="name" required value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20" placeholder="Jane Smith" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                    <input type="email" id="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20" placeholder="jane@example.com" />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                    <textarea id="message" rows={3} required value={message} onChange={(e) => setMessage(e.target.value)} className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20" placeholder="I'm interested in gold crowns for my back molars..." />
                  </div>
                  <button type="submit" disabled={sending} className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-3 font-semibold text-white shadow-md transition-all hover:bg-amber-600 disabled:opacity-60 disabled:cursor-not-allowed">
                    {sending ? "Sending..." : "Send Request"}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                      <path d="M3.105 2.289a.75.75 0 00-.826.95l1.437 5.036a.75.75 0 00.579.527l7.5 1.5a.75.75 0 010 1.466l-7.5 1.5a.75.75 0 00-.579.527l-1.437 5.036a.75.75 0 00.826.95 57.933 57.933 0 0016.393-8.022.75.75 0 000-1.318A57.933 57.933 0 003.105 2.289z" />
                    </svg>
                  </button>
                </form>
              )}
            </div>
          </div>
          <div className="space-y-6">
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
              <h3 className="font-semibold text-gray-900">Contact</h3>
              <div className="mt-4 space-y-3">
                <a href={`tel:${dentist.phone}`} className="flex items-center gap-3 text-sm text-gray-600 hover:text-amber-600 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 flex-shrink-0 text-gray-400">
                    <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z" clipRule="evenodd" />
                  </svg>
                  {dentist.phone}
                </a>
                <a href={`mailto:${dentist.email}`} className="flex items-center gap-3 text-sm text-gray-600 hover:text-amber-600 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 flex-shrink-0 text-gray-400">
                    <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" /><path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
                  </svg>
                  {dentist.email}
                </a>
                {dentist.website && (
                  <a href={dentist.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-gray-600 hover:text-amber-600 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 flex-shrink-0 text-gray-400">
                      <path d="M12.232 4.232a2.5 2.5 0 013.536 3.536l-1.225 1.225a.75.75 0 001.061 1.06l1.224-1.224a4 4 0 00-5.656-5.656l-3 3a4 4 0 00.225 5.865.75.75 0 00.977-1.138 2.5 2.5 0 01-.142-3.667l3-3z" /><path d="M11.603 7.963a.75.75 0 00-.977 1.138 2.5 2.5 0 01.142 3.667l-3 3a2.5 2.5 0 01-3.536-3.536l1.225-1.225a.75.75 0 00-1.061-1.06l-1.224 1.224a4 4 0 105.656 5.656l3-3a4 4 0 00-.225-5.865z" />
                    </svg>
                    {dentist.website.replace(/^https?:\/\//, "")}
                  </a>
                )}
              </div>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
              <h3 className="font-semibold text-gray-900">Location</h3>
              <div className="mt-3 rounded-lg border border-gray-200 bg-gray-50 p-6 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="mx-auto h-10 w-10 text-amber-400">
                  <path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003h.001zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clipRule="evenodd" />
                </svg>
                <p className="mt-2 text-sm text-gray-600">{dentist.addressLine1}<br />{dentist.city}, {dentist.state} {dentist.zipCode}</p>
              </div>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
              <h3 className="font-semibold text-gray-900">At a Glance</h3>
              <dl className="mt-3 space-y-3 text-sm">
                <div className="flex justify-between"><dt className="text-gray-500">Services</dt><dd className="font-medium text-gray-900">{dentist.services.length}</dd></div>
                <div className="flex justify-between"><dt className="text-gray-500">Location</dt><dd className="font-medium text-gray-900">{dentist.city}, {dentist.state}</dd></div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
