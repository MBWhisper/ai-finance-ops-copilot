import Link from "next/link"

export const metadata = {
  title: "About Mo | AI Finance Ops",
  description:
    "Meet Mo, the founder behind AI Finance Ops. A builder from Morocco who got tired of spreadsheet chaos and decided to fix it.",
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <div className="mx-auto max-w-5xl px-6 pt-8" />

      {/* ── HERO ── */}
      <section className="mx-auto max-w-5xl px-6 pb-16 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full mb-6">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            The Founder
          </div>
          <h1 className="font-serif text-5xl md:text-6xl leading-[1.08] tracking-tight text-white">
            Built by a<br />
            <em className="not-italic text-emerald-400">founder,</em><br />
            for founders.
          </h1>
          <p className="mt-6 text-lg text-gray-400 leading-relaxed max-w-lg">
            I&apos;m Mo — a full-stack builder from Morocco. I got tired of spending more
            time updating spreadsheets than actually growing my business. So I built the
            tool I always needed.
          </p>
          <div className="flex items-center gap-4 mt-8 text-sm text-gray-500">
            <span>📍 Morocco</span>
            <span className="h-1 w-1 rounded-full bg-gray-600" />
            <span>Full-Stack Developer</span>
            <span className="h-1 w-1 rounded-full bg-gray-600" />
            <span>Bootstrapped</span>
          </div>
        </div>

        {/* Photo */}
        <div className="relative">
          <div className="absolute -inset-3 border border-gray-800 rounded-2xl" />
          <img
            src="/founder.jpg"
            alt="Mo — Founder of AI Finance Ops"
            className="relative rounded-2xl w-full aspect-[4/5] object-cover shadow-2xl"
            id="founder-photo"
          />
          <div className="absolute -bottom-4 -right-4 bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 shadow-lg flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/50" />
            <span className="text-xs font-medium text-gray-300">Building in public</span>
          </div>
        </div>
      </section>

      <hr className="border-gray-800 mx-auto max-w-5xl" />

      {/* ── CHAPTER 1: PROBLEM ── */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="flex items-center gap-3 mb-10">
          <span className="flex h-6 w-6 items-center justify-center rounded-full border border-gray-700 text-[10px] text-gray-500">01</span>
          <span className="text-xs font-semibold tracking-widest uppercase text-gray-600">The Problem That Started It</span>
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl leading-[1.1] tracking-tight text-white mb-6">
              I was drowning in spreadsheets.
            </h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              Every Monday morning, the same ritual: open five different spreadsheets, copy-paste numbers
              from Stripe, manually calculate MRR, try to remember where last month&apos;s invoice went.
              Two hours gone — before I&apos;d written a single line of code.
            </p>
            <p className="text-gray-400 leading-relaxed mb-4">
              As a founder managing multiple projects simultaneously, the financial overhead was killing
              my momentum. I wasn&apos;t running a business — I was maintaining a spreadsheet graveyard.
            </p>
            <div className="my-8 pl-6 border-l-4 border-emerald-500 py-4 bg-gray-900/50 rounded-r-xl">
              <p className="font-serif italic text-lg text-gray-300">
                &ldquo;I spent more time updating spreadsheets than actually growing my business.
                Something had to change.&rdquo;
              </p>
            </div>
            <p className="text-gray-400 leading-relaxed">
              I looked for solutions. The enterprise tools were either too complex, too expensive, or
              built for accountants — not for builders. So I built it myself.
            </p>
          </div>

          {/* Stats */}
          <div className="md:sticky md:top-24 self-start border border-gray-800 bg-gray-900/50 rounded-2xl p-8 space-y-6">
            {[
              { icon: (
                <svg key="time" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-400"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              ), label: "Time Lost Weekly", value: "8+ hrs", sub: "on manual finance tasks before" },
              { icon: (
                <svg key="save" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-400"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
              ), label: "Time Saved Now", value: "~30 sec", sub: "to get a full cash flow forecast" },
              { icon: (
                <svg key="build" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-400"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
              ), label: "Built With", value: "Zero VC", sub: "100% bootstrapped, built with passion" },
            ].map((s) => (
              <div key={s.label} className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10">
                  {s.icon}
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">{s.label}</div>
                  <div className="text-2xl font-bold text-white">{s.value}</div>
                  <div className="text-xs text-gray-600 mt-0.5">{s.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="border-gray-800 mx-auto max-w-5xl" />

      {/* ── CHAPTER 2: BUILD ── */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="flex items-center gap-3 mb-10">
          <span className="flex h-6 w-6 items-center justify-center rounded-full border border-gray-700 text-[10px] text-gray-500">02</span>
          <span className="text-xs font-semibold tracking-widest uppercase text-gray-600">The Build</span>
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl leading-[1.1] tracking-tight text-white mb-6">
              From personal tool to real product.
            </h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              I started building AI Finance Ops as a tool just for myself — a dashboard that would
              connect to my payment processors, automatically calculate key metrics.
            </p>
            <p className="text-gray-400 leading-relaxed mb-4">
              Three weeks in, I shared it with a few founder friends. Their reaction convinced me
              this wasn&apos;t just a personal project. The stack? Next.js, TypeScript, Supabase.
            </p>
            <div className="my-8 pl-6 border-l-4 border-emerald-500 py-4 bg-gray-900/50 rounded-r-xl">
              <p className="font-serif italic text-lg text-gray-300">
                &ldquo;What if any founder could have the same financial clarity as a Fortune 500 CFO
                — in under a minute?&rdquo;
              </p>
            </div>
          </div>

          {/* Timeline */}
          <div className="relative pl-8 space-y-8">
            <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gray-800" />
            {[
              { year: "Day 1", title: "The Frustration Point", desc: "Another Monday morning lost to spreadsheet chaos. Decided enough was enough." },
              { year: "Week 1", title: "First Working Prototype", desc: "Basic dashboard: MRR, ARR, cash flow. Connected to Stripe. Finally — answers in seconds." },
              { year: "Week 3", title: "Shared With Friends", desc: "Sent to 5 founder friends. All 5 said 'I need this.' Product validation achieved." },
              { year: "Today", title: "Public Launch", desc: "AI Finance Ops is live. Built for every founder who deserves better than spreadsheets." },
            ].map((item) => (
              <div key={item.year} className="relative">
                <div className="absolute -left-8 top-1.5 h-[9px] w-[9px] rounded-full bg-emerald-500 border-2 border-gray-950" />
                <div className="text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-1">{item.year}</div>
                <div className="text-base font-semibold text-white mb-1">{item.title}</div>
                <div className="text-sm text-gray-500 max-w-sm">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="border-gray-800 mx-auto max-w-5xl" />

      {/* ── CHAPTER 3: MISSION ── */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="flex items-center gap-3 mb-10">
          <span className="flex h-6 w-6 items-center justify-center rounded-full border border-gray-700 text-[10px] text-gray-500">03</span>
          <span className="text-xs font-semibold tracking-widest uppercase text-gray-600">The Mission & Values</span>
        </div>

        <div className="max-w-xl mb-10">
          <h2 className="font-serif text-3xl md:text-4xl leading-[1.1] tracking-tight text-white mb-6">
            Finance clarity for every founder — not just the funded ones.
          </h2>
          <p className="text-gray-400 leading-relaxed">
            The best financial tools are locked behind enterprise pricing. The founders who need clarity
            the most — the bootstrapped ones, the solo builders — are left with spreadsheets.
            AI Finance Ops exists to change that.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {[
            { icon: "🔍", title: "Radical Transparency", desc: "No hidden fees, no confusing pricing. What you see is what you get." },
            { icon: "👤", title: "Founder-First", desc: "Every feature built for the founder's workflow — fast, focused, distraction-free." },
            { icon: "📈", title: "Bootstrapped & Proud", desc: "No VC pressure. We grow sustainably, with our users' interests first." },
          ].map((v) => (
            <div key={v.title} className="border border-gray-800 bg-gray-900/50 rounded-2xl p-6 hover:border-gray-700 transition-colors">
              <div className="text-2xl mb-4">{v.icon}</div>
              <h3 className="text-base font-semibold text-white mb-2">{v.title}</h3>
              <p className="text-sm text-gray-500">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="border-t border-gray-800 bg-gray-900/30 px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-3xl md:text-4xl leading-[1.1] text-white mb-4">
            Ready to stop guessing<br />and start knowing?
          </h2>
          <p className="text-lg text-gray-400 mb-8">
            Join founders who&apos;ve replaced spreadsheet chaos with AI-powered financial clarity.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-8 py-3 text-base font-medium text-white hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/25 hover:-translate-y-0.5"
            >
              Start free — no credit card
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 rounded-full border border-gray-700 px-8 py-3 text-base font-medium text-gray-300 hover:border-gray-500 hover:text-white transition-all hover:-translate-y-0.5"
            >
              View pricing
            </Link>
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-10">
            {[
              { label: "LinkedIn", href: "https://www.linkedin.com/in/mo-systemarchitect" },
              { label: "YouTube", href: "https://www.youtube.com/@AIKnowlidgi" },
              { label: "Twitter / X", href: "https://twitter.com/MbtechE80106" },
              { label: "Instagram", href: "https://www.instagram.com/aiknowleedge" },
              { label: "TikTok", href: "https://www.tiktok.com/@aiknowleedge" },
              { label: "Facebook", href: "https://www.facebook.com/opsssimoo" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white border border-gray-800 hover:border-gray-600 rounded-full px-4 py-2 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="text-center py-8 text-xs text-gray-600 border-t border-gray-800">
        <p>&copy; 2026 AI Finance Ops &middot; <a href="https://www.aifinanceops.app" className="text-gray-500 hover:text-white transition-colors">aifinanceops.app</a> &middot; Built with ❤️ in Morocco</p>
      </footer>
    </div>
  )
}
