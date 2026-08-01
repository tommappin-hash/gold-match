import { createFileRoute, Link } from "@tanstack/react-router";
import { getBookContent, trackBookView, type TocEntry } from "./api/book";
import { trackPageView } from "./api/analytics";

export const Route = createFileRoute("/book")({
  loader: async () => {
    trackPageView({ data: { path: "/book" } }).catch(() => {});
    trackBookView({ data: { path: "/book" } }).catch(() => {});
    return getBookContent();
  },
  component: BookPage,
});

function BookPage() {
  const data = Route.useLoaderData();
  const { html, toc } = data;

  return (
    <div className="min-h-dvh bg-gray-50">
      {/* Hero Banner */}
      <section className="bg-gradient-to-br from-amber-500 via-amber-600 to-yellow-600 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-amber-100">
            Free Book
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Caries: The Mother Wound of Restorative Dentistry
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-amber-50 max-w-2xl mx-auto">
            Why the first restoration matters — and how gold changes the equation for patients, dentists, and the future of caries treatment.
          </p>
          <a
            href="/book.pdf"
            download
            onClick={() => { trackBookView({ data: { path: "/book.pdf" } }).catch(() => {}); }}
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-base font-semibold text-amber-700 shadow-lg transition-all hover:bg-amber-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
              <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z" />
              <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
            </svg>
            Download Free PDF
          </a>
          <p className="mt-3 text-sm text-amber-100/70">
            167 KB PDF — formatted for printing and reading offline.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="mx-auto max-w-4xl px-6 py-12">
        <div className="flex gap-10">
          {/* Sidebar TOC */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <nav className="sticky top-8 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Contents</h3>
              <ul className="space-y-1.5">
                {toc.map((entry) => (
                  <li key={entry.id}>
                    <a
                      href={`#${entry.id}`}
                      className={`block text-sm transition-colors hover:text-amber-600 ${
                        entry.level === "part"
                          ? "font-semibold text-gray-800 mt-2 first:mt-0"
                          : "pl-3 text-gray-600 border-l-2 border-transparent hover:border-amber-300"
                      }`}
                    >
                      {entry.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Book Content */}
          <article className="min-w-0 flex-1">
            <div className="rounded-2xl bg-white p-8 sm:p-12 shadow-sm border border-gray-200">
              <div
                className="max-w-none
                  [&_p]:text-gray-700 [&_p]:leading-relaxed [&_p]:mb-4
                  [&_blockquote]:border-l-4 [&_blockquote]:border-amber-500 [&_blockquote]:bg-amber-50 [&_blockquote]:py-1 [&_blockquote]:px-4 [&_blockquote]:rounded-r-lg [&_blockquote]:not-italic [&_blockquote]:text-gray-700 [&_blockquote]:mb-4
                  [&_strong]:text-gray-900
                  [&_em]:italic
                  [&_.book-part-title]:text-2xl [&_.book-part-title]:font-bold [&_.book-part-title]:text-amber-600 [&_.book-part-title]:mt-12 [&_.book-part-title]:mb-6 [&_.book-part-title]:pb-3 [&_.book-part-title]:border-b-2 [&_.book-part-title]:border-amber-200 [&_.book-part-title:first-child]:mt-0
                  [&_.book-chapter-title]:text-xl [&_.book-chapter-title]:font-semibold [&_.book-chapter-title]:text-gray-900 [&_.book-chapter-title]:mt-8 [&_.book-chapter-title]:mb-4 [&_.book-chapter-title]:scroll-mt-24
                  [&_hr]:my-8 [&_hr]:border-gray-200
                "
                dangerouslySetInnerHTML={{ __html: html }}
              />
            </div>

            {/* Bottom CTA */}
            <div className="mt-10 rounded-2xl bg-amber-50 border border-amber-200 p-8 text-center">
              <h3 className="text-xl font-bold text-gray-900">Ready to find a gold dentist?</h3>
              <p className="mt-2 text-gray-600">
                Search our directory of dentists who offer gold crowns, bridges, inlays, and onlays.
              </p>
              <Link
                to="/dentists"
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-3 font-semibold text-white shadow-md transition-all hover:bg-amber-600"
              >
                Find a Dentist
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                  <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </article>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-12">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} Gold Dentistry Network. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
