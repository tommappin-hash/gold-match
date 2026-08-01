import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/blog")({ component: BlogIndex });

const post = {
  title: "The Margin: Dentistry's Billion-Dollar Blind Spot",
  date: "August 2026",
  excerpt: "The filling material itself almost never fails. It's the gap between the filling and the tooth that fails. That gap is called the margin.",
};

function BlogIndex() {
  return (
    <main className="min-h-dvh bg-gray-50">
      <header className="border-b border-gray-200 bg-white"><div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5"><Link to="/" className="text-lg font-bold text-gray-900">Gold <span className="text-amber-500">Dentistry</span> Network</Link><Link to="/" className="text-sm font-medium text-gray-600 hover:text-amber-600">Back to home</Link></div></header>
      <section className="mx-auto max-w-6xl px-6 py-16"><p className="text-sm font-semibold uppercase tracking-widest text-amber-600">Patient education</p><h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">The Gold Dentistry Journal</h1><p className="mt-4 max-w-2xl text-lg text-gray-600">Clear, practical education about durable first treatment for caries and the materials that make it possible.</p>
        <article className="mt-12 max-w-3xl rounded-2xl border border-gray-200 bg-white p-8 shadow-sm sm:p-10"><p className="text-sm text-gray-500">{post.date}</p><h2 className="mt-3 text-2xl font-bold text-gray-900 sm:text-3xl">{post.title}</h2><p className="mt-4 leading-relaxed text-gray-600">{post.excerpt}</p><Link to="/blog/the-margin" className="mt-7 inline-flex rounded-xl bg-amber-500 px-5 py-3 font-semibold text-white hover:bg-amber-600">Read the full post →</Link></article>
      </section>
    </main>
  );
}
