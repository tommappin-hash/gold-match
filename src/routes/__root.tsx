import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router";
import { type ReactNode, useState } from "react";

import appCss from "~/styles/app.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "GoldMatch — Find Gold Dentistry Near You" },
      {
        name: "description",
        content:
          "GoldMatch connects patients seeking gold crowns, bridges, inlays, and onlays with dentists who specialize in gold restorations.",
      },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  notFoundComponent: () => (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-4 text-center">
      <span className="text-6xl">🦷</span>
      <h1 className="text-3xl font-bold text-gray-900">Page not found</h1>
      <p className="text-gray-500">
        The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-600"
      >
        Back to Home
      </Link>
    </div>
  ),
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Nav />
      <Outlet />
    </RootDocument>
  );
}

function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl">🦷</span>
          <span className="text-xl font-bold text-gray-900">
            Gold<span className="text-amber-500">Match</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden sm:flex items-center gap-6">
          <Link
            to="/"
            className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
            activeProps={{ className: "text-amber-600 font-semibold" }}
          >
            Home
          </Link>
          <Link
            to="/dentists"
            className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
            activeProps={{ className: "text-amber-600 font-semibold" }}
          >
            Find Dentists
          </Link>
          <Link
            to="/for-dentists"
            className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
            activeProps={{ className: "text-amber-600 font-semibold" }}
          >
            For Dentists
          </Link>
          <Link
            to="/register/dentist"
            className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-amber-600"
          >
            List Your Practice
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="sm:hidden rounded-lg p-2 text-gray-600 hover:bg-gray-100"
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="sm:hidden border-t border-gray-100 bg-white px-6 py-4 space-y-3">
          <Link
            to="/"
            className="block rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-amber-50 hover:text-amber-700"
            activeProps={{ className: "bg-amber-50 text-amber-700 font-semibold" }}
            onClick={() => setMobileOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/dentists"
            className="block rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-amber-50 hover:text-amber-700"
            activeProps={{ className: "bg-amber-50 text-amber-700 font-semibold" }}
            onClick={() => setMobileOpen(false)}
          >
            Find Dentists
          </Link>
          <Link
            to="/for-dentists"
            className="block rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-amber-50 hover:text-amber-700"
            activeProps={{ className: "bg-amber-50 text-amber-700 font-semibold" }}
          >
            For Dentists
          </Link>
          <Link
            to="/register/dentist"
            className="block rounded-lg bg-amber-500 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-amber-600"
          >
            List Your Practice
          </Link>
        </div>
      )}
    </nav>
  );
}

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
