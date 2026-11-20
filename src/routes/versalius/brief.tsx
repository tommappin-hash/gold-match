import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";

import { BRIEF_COOKIE } from "../../lib/briefPassphrase";
import { openBrief, readBrief, saveBriefNote, saveBriefResponse } from "../../lib/brief";

export const Route = createFileRoute("/versalius/brief")({
  head: () => ({
    meta: [
      { title: "Versalius Mundi — A Brief for Lauren and Alex" },
      { name: "robots", content: "noindex, nofollow, noarchive, nosnippet" },
      { name: "googlebot", content: "noindex, nofollow" },
      {
        name: "description",
        content: "A private production brief.",
      },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
  }),
  component: BriefPage,
});

type Doc = { key: string; html: string };

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const hit = document.cookie
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${name}=`));
  return hit ? decodeURIComponent(hit.slice(name.length + 1)) : null;
}

function writeCookie(name: string, value: string) {
  const maxAge = 60 * 60 * 24 * 30;
  document.cookie = `${name}=${encodeURIComponent(value)}; Path=/; Max-Age=${maxAge}; SameSite=Lax`;
}

/* ------------------------------------------------------------------ page */

function BriefPage() {
  const [status, setStatus] = useState<"checking" | "locked" | "open">("checking");
  const [token, setToken] = useState<string>("");
  const [docs, setDocs] = useState<Doc[]>([]);
  const [passphrase, setPassphrase] = useState("");
  const [wrong, setWrong] = useState(false);
  const [busy, setBusy] = useState(false);

  const unlock = useCallback(async (tok: string) => {
    const res: any = await readBrief({ data: { token: tok } });
    if (res?.ok) {
      setToken(tok);
      setDocs(res.docs || []);
      setStatus("open");
    } else {
      setStatus("locked");
    }
  }, []);

  useEffect(() => {
    const saved = readCookie(BRIEF_COOKIE);
    if (!saved) {
      setStatus("locked");
      return;
    }
    unlock(saved).catch(() => setStatus("locked"));
  }, [unlock]);

  async function submitPassphrase(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setWrong(false);
    try {
      const res: any = await openBrief({ data: { passphrase } });
      if (res?.ok && res.token) {
        writeCookie(BRIEF_COOKIE, res.token);
        await unlock(res.token);
      } else {
        setWrong(true);
      }
    } catch {
      setWrong(true);
    } finally {
      setBusy(false);
    }
  }

  if (status === "checking") {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-[#0A1628] px-6 text-center">
        <p className="font-outfit text-sm tracking-[0.2em] text-[#6B8DBF] uppercase">
          Opening the brief…
        </p>
      </div>
    );
  }

  if (status === "locked") {
    return (
      <div className="flex min-h-dvh flex-col justify-center bg-[#0A1628] px-6 py-12">
        <div className="mx-auto w-full max-w-md">
          <p className="font-outfit text-[11px] font-semibold tracking-[0.28em] text-[#C8910B] uppercase">
            Versalius Mundi
          </p>
          <h1 className="font-bangers mt-3 text-4xl leading-[1.05] tracking-wide text-white">
            A brief for{" "}
            <span className="bg-gradient-to-r from-[#C8910B] via-[#E5B83C] to-[#C8910B] bg-clip-text text-transparent">
              Lauren and Alex
            </span>
          </h1>
          <p className="mt-4 font-serif text-[15px] leading-relaxed text-[#6B8DBF]">
            This page is private. Type the passphrase Tom sent you and it will stay open
            on this phone.
          </p>

          <form onSubmit={submitPassphrase} className="mt-7">
            <label
              htmlFor="passphrase"
              className="font-outfit text-[11px] font-semibold tracking-[0.2em] text-[#6B8DBF] uppercase"
            >
              Passphrase
            </label>
            <input
              id="passphrase"
              type="password"
              autoComplete="off"
              autoCapitalize="none"
              autoCorrect="off"
              value={passphrase}
              onChange={(e) => setPassphrase(e.target.value)}
              className="mt-2 w-full rounded-xl border border-[#1A3A7A] bg-[#0D1B3E] px-4 py-3.5 font-outfit text-base text-white outline-none focus:border-[#C8910B]"
            />
            <button
              type="submit"
              disabled={busy || !passphrase.trim()}
              className="mt-3 w-full rounded-xl bg-[#C8910B] px-4 py-3.5 font-outfit text-base font-semibold text-[#0A1628] disabled:opacity-40"
            >
              {busy ? "Checking…" : "Open the brief"}
            </button>
            {wrong && (
              <p className="mt-3 font-outfit text-sm text-[#E5B83C]">
                That's not it. Check the spelling with Tom and try again.
              </p>
            )}
          </form>
        </div>
      </div>
    );
  }

  const spine = docs.find((d) => d.key === "spine")?.html ?? "";
  const world = docs.find((d) => d.key === "world")?.html ?? "";
  const season = docs.find((d) => d.key === "season")?.html ?? "";
  const schedule = docs.find((d) => d.key === "schedule")?.html ?? "";
  const deal = docs.find((d) => d.key === "deal")?.html ?? "";

  return (
    <div className="min-h-dvh bg-[#0A1628] text-white">
      <div className="mx-auto w-full max-w-2xl px-5 pt-10 pb-16 sm:px-8">
        <header>
          <p className="font-outfit text-[11px] font-semibold tracking-[0.28em] text-[#C8910B] uppercase">
            Gold Dentistry Network
          </p>
          <h1 className="font-bangers mt-2 text-[40px] leading-[0.95] tracking-wide sm:text-6xl">
            <span className="bg-gradient-to-r from-[#C8910B] via-[#E5B83C] to-[#C8910B] bg-clip-text text-transparent">
              Versalius Mundi
            </span>
          </h1>
          <p className="mt-3 font-outfit text-sm tracking-[0.12em] text-[#6B8DBF] uppercase">
            The whole packet, and a place to answer it
          </p>
        </header>

        {/* The margin scene — the one place the gold glow belongs. */}
        <figure className="mt-7">
          <div className="relative overflow-hidden rounded-2xl border border-[#1A3A7A]">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-10"
              style={{
                background:
                  "radial-gradient(120% 70% at 50% 96%, rgba(200,145,11,0.30), rgba(200,145,11,0) 62%)",
              }}
            />
            <img
              src="/versalius/brief/margin-scene.jpg"
              alt="The margin scene: a dental arch with the gold margin glowing at the edge of the restoration."
              className="block w-full"
              loading="eager"
            />
          </div>
          <figcaption className="mt-2 font-outfit text-[11px] tracking-[0.16em] text-[#6B8DBF] uppercase">
            The margin — where this whole argument lives
          </figcaption>
        </figure>

        {/* 1 — Welcome */}
        <Section n="1" title="Welcome">
          <div className="space-y-4 font-serif text-[16px] leading-[1.75] text-[#C3D3EA]">
            <p>
              Versalius Mundi is an animated series. Twelve shorts and one pilot, built to
              carry a single argument to people who will never read a dental paper: that the
              first repair on a tooth is a decision, and it is usually made once, badly, by
              default.
            </p>
            <p>
              Tom has spent his life at the bench. He could make this himself and it would
              sound like a man at a bench. He thinks your generation will say it better to
              your generation — that is the whole reason this is in your hands and not his.
            </p>
            <p className="text-white">
              Nothing is decided. Nothing is signed. Nobody has agreed to anything, including
              Tom. Read it and tell him what you actually think — and if the answer is no,
              that is a good answer. It stays a good answer. He would far rather have a real
              no than a polite yes.
            </p>
          </div>

          <figure className="mt-6 flex items-center gap-4 rounded-2xl border border-[#1A3A7A] bg-[#0D1B3E] p-4">
            <img
              src="/versalius/brief/aureal.jpg"
              alt="Aureal, the gold elemental: a gold-armoured character whose glow sits at the margin."
              className="h-20 w-20 flex-none rounded-xl object-cover"
              loading="lazy"
            />
            <figcaption className="font-serif text-sm leading-relaxed text-[#6B8DBF]">
              <span className="font-outfit block text-[11px] font-semibold tracking-[0.18em] text-[#C8910B] uppercase">
                Aureal
              </span>
              The gold elemental. Nobody outside this page has met her yet — she debuts in the
              pilot, and not before.
            </figcaption>
          </figure>
        </Section>

        {/* 2 — What this has to say */}
        <Section
          n="2"
          title="What this has to say"
          lead="Six lines. Every episode has to land them, in this order, in plain words. This is the constraint you would be working inside — not a script."
        >
          <Doc html={spine} />
          <SectionNote token={token} section="What this has to say" />
        </Section>

        {/* 3 — The world */}
        <Section
          n="3"
          title="The world"
          summary="Tom's own map of Vesalius Mundi — the whole oral environment, and who stands where."
          lead="Not our invention: Tom's hand-drawn page, transcribed and ruled on. It says who exists, who is a defender, who is a villain — and, plainly, which questions are still open."
        >
          <Doc html={world} />
          <SectionNote token={token} section="The world" />
        </Section>

        {/* 4 — The season */}
        <Section
          n="4"
          title="The season"
          summary="Twelve shorts and one pilot over fourteen weeks — and who does what."
          lead="One season: twelve shorts and one flagship pilot, over fourteen weeks. The shorts earn attention; the pilot is the thing worth arriving for."
        >
          <Doc html={season} />
          <SectionNote token={token} section="The season" />
        </Section>

        {/* 5 — The schedule */}
        <Section
          n="5"
          title="The schedule"
          summary="No start date yet — what fits in a week, and what gets dropped first."
        >
          <Callout>
            <strong className="font-semibold text-white">There is no start date.</strong> Day
            1 is the Monday Tom says go — and he has not said it. What follows is a shape,
            not a deadline: it shows what fits in a week, and what gets dropped first when one
            goes badly.
          </Callout>
          <Doc html={schedule} />
          <SectionNote token={token} section="The schedule" />
        </Section>

        {/* 6 — The deal */}
        <Section n="6" title="What the deal is">
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-[#C8910B] px-3 py-1 font-outfit text-[11px] font-semibold tracking-[0.18em] text-[#E5B83C] uppercase">
              Draft — for discussion
            </span>
          </div>
          <p className="mb-5 font-serif text-[16px] leading-[1.75] text-[#C3D3EA]">
            Nothing here is agreed and nothing here is signed. Three of these decisions are
            Tom's and are still open — they are marked as open in the sheet below. If any of
            it is wrong, say so in the box at the end; that is exactly what this is for.
          </p>
          <Doc html={deal} />
          <SectionNote token={token} section="What the deal is" />
        </Section>

        {/* 7 — Your thoughts */}
        <Section
          n="7"
          title="Your thoughts"
          lead="Four questions. Short answers are fine, honest ones are better. Tom reads every word and nothing here is public."
        >
          <ResponseForm token={token} />
        </Section>

        <footer className="mt-14 border-t border-[#1A3A7A] pt-6">
          <p className="font-outfit text-[11px] tracking-[0.22em] text-[#6B8DBF] uppercase">
            Versalius Mundi — a Gold Dentistry Network project
          </p>
        </footer>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------- pieces */

function Section({
  n,
  title,
  lead,
  summary,
  children,
}: {
  n: string;
  title: string;
  lead?: string;
  /** When given, the section starts closed and this one line shows instead. */
  summary?: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  if (!summary) {
    return (
      <section className="mt-12 border-t border-[#1A3A7A] pt-9">
        <div className="flex items-baseline gap-3">
          <span className="font-outfit text-sm font-semibold text-[#C8910B]">{n}</span>
          <h2 className="font-bangers text-3xl leading-tight tracking-wide text-white sm:text-4xl">
            {title}
          </h2>
        </div>
        {lead && (
          <p className="mt-3 font-serif text-[16px] leading-[1.75] text-[#C3D3EA]">{lead}</p>
        )}
        <div className="mt-5">{children}</div>
      </section>
    );
  }

  const bodyId = `section-body-${n}`;

  return (
    <section className="mt-12 border-t border-[#1A3A7A] pt-9">
      <div className="relative flex items-center gap-3">
        <span className="font-outfit text-sm font-semibold text-[#C8910B]">{n}</span>
        <h2 className="font-bangers flex-1 text-3xl leading-tight tracking-wide text-white sm:text-4xl">
          {title}
        </h2>
        <span
          aria-hidden
          className={`flex-none rounded-full border px-3 py-1 font-outfit text-[11px] font-semibold tracking-[0.18em] uppercase ${
            open ? "border-[#C8910B] text-[#E5B83C]" : "border-[#1A3A7A] text-[#6B8DBF]"
          }`}
        >
          {open ? "Close" : "Open"}
        </span>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={bodyId}
          className="absolute inset-0 h-full w-full cursor-pointer rounded-lg active:bg-[#0D1B3E]/60"
        >
          <span className="sr-only">{open ? `Close ${title}` : `Open ${title}`}</span>
        </button>
      </div>

      {open ? (
        <div id={bodyId}>
          {lead && (
            <p className="mt-3 font-serif text-[16px] leading-[1.75] text-[#C3D3EA]">{lead}</p>
          )}
          <div className="mt-5">{children}</div>
        </div>
      ) : (
        <p id={bodyId} className="mt-2 font-serif text-[15px] leading-relaxed text-[#6B8DBF]">
          {summary}
        </p>
      )}
    </section>
  );
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-5 rounded-2xl border border-[#1A3A7A] bg-[#0D1B3E] p-4 font-serif text-[15px] leading-relaxed text-[#C3D3EA]">
      {children}
    </div>
  );
}

function Doc({ html }: { html: string }) {
  return <div className="vm-prose" dangerouslySetInnerHTML={{ __html: html }} />;
}

function SectionNote({ token, section }: { token: string; section: string }) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "saved" | "error">("idle");

  async function send() {
    if (state === "sending" || !text.trim()) return;
    setState("sending");
    try {
      const res: any = await saveBriefNote({ data: { token, section, comment: text } });
      if (res?.ok) {
        setState("saved");
        setText("");
      } else {
        setState("error");
      }
    } catch {
      setState("error");
    }
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-6 w-full rounded-xl border border-dashed border-[#1A3A7A] px-4 py-3 text-left font-outfit text-sm text-[#6B8DBF] active:border-[#C8910B]"
      >
        + Note on this section
      </button>
    );
  }

  return (
    <div className="mt-6 rounded-2xl border border-[#1A3A7A] bg-[#0D1B3E] p-4">
      <label
        htmlFor={`note-${section}`}
        className="font-outfit text-[11px] font-semibold tracking-[0.18em] text-[#C8910B] uppercase"
      >
        Your note on “{section}”
      </label>
      <textarea
        id={`note-${section}`}
        rows={4}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What you'd change, or what you'd keep."
        className="mt-2 w-full resize-y rounded-xl border border-[#1A3A7A] bg-[#0A1628] px-3 py-3 font-serif text-[15px] leading-relaxed text-white outline-none focus:border-[#C8910B]"
      />
      <div className="mt-3 flex items-center gap-3">
        <button
          type="button"
          onClick={send}
          disabled={state === "sending" || !text.trim()}
          className="rounded-xl bg-[#C8910B] px-4 py-2.5 font-outfit text-sm font-semibold text-[#0A1628] disabled:opacity-40"
        >
          {state === "sending" ? "Saving…" : "Save this note"}
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="font-outfit text-sm text-[#6B8DBF]"
        >
          Close
        </button>
      </div>
      {state === "saved" && (
        <p className="mt-3 font-serif text-sm text-[#E5B83C]">
          Saved. That note is with Tom — you can add another any time.
        </p>
      )}
      {state === "error" && (
        <p className="mt-3 font-serif text-sm text-[#E5B83C]">
          That didn't save. Try once more.
        </p>
      )}
    </div>
  );
}

function ResponseForm({ token }: { token: string }) {
  const [name, setName] = useState("");
  const [lands, setLands] = useState("");
  const [doesnt, setDoesnt] = useState("");
  const [wants, setWants] = useState("");
  const [why, setWhy] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "saved" | "error">("idle");

  async function send(e: React.FormEvent) {
    e.preventDefault();
    if (state === "sending" || !name.trim()) return;
    setState("sending");
    try {
      const res: any = await saveBriefResponse({
        data: { token, name, lands, doesnt, wants, why },
      });
      if (res?.ok) setState("saved");
      else setState("error");
    } catch {
      setState("error");
    }
  }

  if (state === "saved") {
    return (
      <div className="rounded-2xl border border-[#C8910B]/50 bg-[#0D1B3E] p-5">
        <p className="font-bangers text-2xl tracking-wide text-[#E5B83C]">Saved. Thank you.</p>
        <p className="mt-2 font-serif text-[15px] leading-relaxed text-[#C3D3EA]">
          Tom has it. Nothing happens next unless he writes back to you — and if you want to
          change anything, reply to him directly.
        </p>
      </div>
    );
  }

  const label =
    "font-outfit text-[11px] font-semibold tracking-[0.18em] text-[#C8910B] uppercase";
  const field =
    "mt-2 w-full rounded-xl border border-[#1A3A7A] bg-[#0A1628] px-3 py-3 font-serif text-[15px] leading-relaxed text-white outline-none focus:border-[#C8910B]";

  return (
    <form onSubmit={send} className="space-y-6">
      <div>
        <label htmlFor="f-name" className={label}>
          1 · Your name
        </label>
        <input
          id="f-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Lauren / Alex / other"
          className={field}
        />
      </div>

      <div>
        <label htmlFor="f-lands" className={label}>
          2 · What lands for you
        </label>
        <textarea
          id="f-lands"
          rows={4}
          value={lands}
          onChange={(e) => setLands(e.target.value)}
          className={field}
        />
      </div>

      <div>
        <label htmlFor="f-doesnt" className={label}>
          3 · What doesn't
        </label>
        <textarea
          id="f-doesnt"
          rows={4}
          value={doesnt}
          onChange={(e) => setDoesnt(e.target.value)}
          className={field}
        />
      </div>

      <fieldset>
        <legend className={label}>4 · Do you want this project?</legend>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {[
            { v: "yes", t: "Yes" },
            { v: "maybe", t: "Maybe" },
            { v: "no", t: "No" },
          ].map((o) => (
            <label
              key={o.v}
              className={`cursor-pointer rounded-xl border px-3 py-3 text-center font-outfit text-sm font-semibold ${
                wants === o.v
                  ? "border-[#C8910B] bg-[#C8910B] text-[#0A1628]"
                  : "border-[#1A3A7A] bg-[#0D1B3E] text-[#C3D3EA]"
              }`}
            >
              <input
                type="radio"
                name="wants"
                value={o.v}
                checked={wants === o.v}
                onChange={() => setWants(o.v)}
                className="sr-only"
              />
              {o.t}
            </label>
          ))}
        </div>
        <label htmlFor="f-why" className={`${label} mt-4 block`}>
          And why
        </label>
        <textarea
          id="f-why"
          rows={3}
          value={why}
          onChange={(e) => setWhy(e.target.value)}
          className={field}
        />
      </fieldset>

      <button
        type="submit"
        disabled={state === "sending" || !name.trim()}
        className="w-full rounded-xl bg-[#C8910B] px-4 py-3.5 font-outfit text-base font-semibold text-[#0A1628] disabled:opacity-40"
      >
        {state === "sending" ? "Sending…" : "Send to Tom"}
      </button>
      {state === "error" && (
        <p className="font-serif text-sm text-[#E5B83C]">
          That didn't save. Try once more.
        </p>
      )}
    </form>
  );
}
