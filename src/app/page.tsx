import Link from "next/link"
import { Check, BarChart3, TrendingUp, Receipt, ArrowRight, Star, Quote, Menu, X } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-gray-800 bg-gray-950/95 backdrop-blur supports-[backdrop-filter]:bg-gray-950/60">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 text-sm font-bold text-white">
              F
            </div>
            <span className="text-lg font-bold text-white">AI Finance Ops</span>
          </Link>
          <nav className="hidden items-center gap-8 md:flex">
            <Link href="#features" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
              Features
            </Link>
            <Link href="#pricing" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
              Pricing
            </Link>
            <Link href="#testimonials" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
              Testimonials
            </Link>
            <Link href="/login" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
              Sign In
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-400 transition-colors"
            >
              Start Free Trial
            </Link>
          </nav>
          <div className="flex items-center gap-3 md:hidden">
            <Link href="/register">
              <span className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-white">
                Free Trial
              </span>
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section className="relative overflow-hidden px-6 py-24 sm:py-32 lg:px-8">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-gray-950 to-gray-950" />
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-emerald-500/10 blur-3xl" />
          </div>
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-400">
              AI-Powered Finance Intelligence for B2B SaaS
            </div>
            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-7xl">
              Stop Guessing Your Cash Flow
            </h1>
            <p className="mt-6 text-xl leading-8 text-gray-400 max-w-2xl mx-auto">
              AI-powered MRR tracking & 90-day forecast for SaaS founders. Know your runway, churn, and
              financial health in real-time.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-8 py-4 text-base font-semibold text-white hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/25"
              >
                Start 14-Day Free Trial <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/demo"
                className="inline-flex items-center gap-2 rounded-lg border border-gray-700 px-8 py-4 text-base font-semibold text-gray-300 hover:border-gray-500 hover:text-white transition-colors"
              >
                See Live Demo
              </Link>
            </div>
            <p className="mt-4 text-sm text-gray-500">
              No credit card required &bull; 14-day free trial &bull; Set up in 2 minutes
            </p>
          </div>
        </section>

        {/* SOCIAL PROOF */}
        <section className="border-t border-gray-800 px-6 py-12">
          <div className="mx-auto max-w-6xl text-center">
            <p className="mb-8 text-sm font-medium uppercase tracking-widest text-gray-500">
              Trusted by 200+ SaaS founders
            </p>
            <div className="flex flex-wrap items-center justify-center gap-12 opacity-40">
              <svg viewBox="0 0 120 30" className="h-8 w-32 text-gray-400" fill="currentColor">
                <rect x="0" y="5" width="24" height="20" rx="4" opacity="0.4" />
                <rect x="30" y="5" width="24" height="20" rx="4" opacity="0.6" />
                <rect x="60" y="5" width="24" height="20" rx="4" opacity="0.5" />
                <rect x="90" y="5" width="24" height="20" rx="4" opacity="0.3" />
              </svg>
              <svg viewBox="0 0 120 30" className="h-8 w-32 text-gray-400" fill="currentColor">
                <circle cx="15" cy="15" r="10" opacity="0.4" />
                <circle cx="45" cy="15" r="10" opacity="0.6" />
                <circle cx="75" cy="15" r="10" opacity="0.5" />
                <circle cx="105" cy="15" r="10" opacity="0.3" />
              </svg>
              <svg viewBox="0 0 120 30" className="h-8 w-32 text-gray-400" fill="currentColor">
                <polygon points="12,2 22,22 2,22" opacity="0.4" />
                <polygon points="42,2 52,22 32,22" opacity="0.6" />
                <polygon points="72,2 82,22 62,22" opacity="0.5" />
                <polygon points="102,2 112,22 92,22" opacity="0.3" />
              </svg>
              <svg viewBox="0 0 120 30" className="h-8 w-32 text-gray-400" fill="currentColor">
                <rect x="2" y="2" width="26" height="26" rx="6" opacity="0.5" />
                <rect x="32" y="2" width="26" height="26" rx="6" opacity="0.3" />
                <rect x="62" y="2" width="26" height="26" rx="6" opacity="0.6" />
                <rect x="92" y="2" width="26" height="26" rx="6" opacity="0.4" />
              </svg>
            </div>
          </div>
        </section>

        {/* PROBLEM SECTION */}
        <section className="border-t border-gray-800 px-6 py-24">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white">Sound familiar?</h2>
              <p className="mt-4 text-lg text-gray-400">The struggles every SaaS founder knows too well.</p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10">
                  <span className="text-2xl">😰</span>
                </div>
                <h3 className="mb-3 text-lg font-semibold text-white">I don&apos;t know if I can make payroll next month</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Cash runway is a guessing game. You have revenue coming in but no clear picture of when
                  the money runs out.
                </p>
              </div>
              <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10">
                  <span className="text-2xl">📊</span>
                </div>
                <h3 className="mb-3 text-lg font-semibold text-white">My spreadsheet is always 2 weeks behind</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Manual data entry is error-prone and stale. By the time you update your models, the numbers
                  have already changed.
                </p>
              </div>
              <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="mb-3 text-lg font-semibold text-white">I have no idea what my real MRR is</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Between refunds, upgrades, downgrades, and failed payments — calculating real MRR requires
                  more than just adding up invoices.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SOLUTION SECTION */}
        <section id="features" className="border-t border-gray-800 px-6 py-24">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white">Built for SaaS founders who need answers now</h2>
              <p className="mt-4 text-lg text-gray-400">Everything you need to understand your financial health at a glance.</p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-8">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-500/10">
                  <BarChart3 className="h-7 w-7 text-emerald-400" />
                </div>
                <h3 className="mb-3 text-lg font-semibold text-white">MRR & KPI Dashboard</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Real-time MRR, ARR, churn rate, and LTV — automatically calculated from your billing data.
                  No manual entry required.
                </p>
              </div>
              <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-8">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-500/10">
                  <TrendingUp className="h-7 w-7 text-blue-400" />
                </div>
                <h3 className="mb-3 text-lg font-semibold text-white">Cash Flow Forecast P50/P80/P95</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  30/60/90 day projections with confidence bands. Know your best, expected, and worst case
                  runway scenarios.
                </p>
              </div>
              <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-8">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-amber-500/10">
                  <Receipt className="h-7 w-7 text-amber-400" />
                </div>
                <h3 className="mb-3 text-lg font-semibold text-white">Accounts Receivable + Smart Reminders</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Track overdue invoices, send automated payment reminders, and reduce DSO with AI-powered
                  AR management.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* DEMO SCREENSHOT */}
        <section className="border-t border-gray-800 px-6 py-24">
          <div className="mx-auto max-w-5xl">
            <div className="rounded-2xl border border-gray-700 bg-gray-900 p-2 shadow-2xl">
              <div className="rounded-xl border border-gray-700 bg-gray-800 p-8">
                <div className="flex items-center gap-3 mb-8">
                  <div className="flex gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500" />
                    <div className="h-3 w-3 rounded-full bg-amber-500" />
                    <div className="h-3 w-3 rounded-full bg-emerald-500" />
                  </div>
                  <div className="ml-4 flex items-center gap-4">
                    <div className="h-3 w-24 rounded bg-gray-700" />
                    <div className="h-3 w-20 rounded bg-gray-700" />
                    <div className="h-3 w-16 rounded bg-gray-700" />
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-4 mb-8">
                  {["MRR", "ARR", "Churn Rate", "LTV"].map((label) => (
                    <div key={label} className="rounded-lg border border-gray-700 bg-gray-800/50 p-4">
                      <div className="h-3 w-16 rounded bg-gray-700 mb-3" />
                      <div className="h-8 w-24 rounded bg-gray-700" />
                    </div>
                  ))}
                </div>
                <div className="rounded-lg border border-gray-700 bg-gray-800/50 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-3 w-32 rounded bg-gray-700" />
                    <div className="flex gap-2">
                      <div className="h-3 w-10 rounded bg-gray-700" />
                      <div className="h-3 w-10 rounded bg-gray-700" />
                      <div className="h-3 w-10 rounded bg-gray-700" />
                    </div>
                  </div>
                  <div className="h-48 w-full rounded-lg bg-gray-700/50 flex items-center justify-center">
                    <span className="text-gray-500 text-sm">Dashboard Preview — 90-Day Forecast Chart</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" className="border-t border-gray-800 px-6 py-24">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white">Simple, transparent pricing</h2>
              <p className="mt-4 text-lg text-gray-400">Start free. Upgrade when you need more power.</p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {/* Starter */}
              <div className="relative flex flex-col rounded-2xl border border-gray-800 bg-gray-900/50 p-8">
                <h3 className="text-xl font-bold text-white">Starter</h3>
                <p className="mt-2 text-sm text-gray-400">For solo founders getting started</p>
                <div className="mt-6">
                  <span className="text-5xl font-bold text-white">$29</span>
                  <span className="text-gray-500">/mo</span>
                </div>
                <ul className="mt-8 flex-1 space-y-4">
                  {["1 workspace", "KPI dashboard (MRR, ARR, Churn)", "30-day cash flow forecast", "Single billing integration", "Email support"].map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-500" />
                      <span className="text-sm text-gray-300">{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/register" className="mt-8 block">
                  <span className="flex w-full items-center justify-center rounded-lg border border-gray-700 px-6 py-3 text-sm font-semibold text-gray-300 hover:border-gray-500 hover:text-white transition-colors">
                    Start Free Trial
                  </span>
                </Link>
              </div>

              {/* Growth (Recommended) */}
              <div className="relative flex flex-col rounded-2xl border-2 border-emerald-500 bg-gray-900 p-8 shadow-xl shadow-emerald-500/10">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-emerald-500 px-4 py-1 text-sm font-semibold text-white">
                  Recommended
                </div>
                <h3 className="text-xl font-bold text-white">Growth</h3>
                <p className="mt-2 text-sm text-gray-400">For growing SaaS teams</p>
                <div className="mt-6">
                  <span className="text-5xl font-bold text-white">$79</span>
                  <span className="text-gray-500">/mo</span>
                </div>
                <ul className="mt-8 flex-1 space-y-4">
                  {["3 workspaces", "Everything in Starter", "90-day P50/P80/P95 forecast", "Multiple billing integrations", "Smart AR reminders", "Priority support"].map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-500" />
                      <span className="text-sm text-gray-300">{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/register" className="mt-8 block">
                  <span className="flex w-full items-center justify-center rounded-lg bg-emerald-500 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/25">
                    Start Free Trial
                  </span>
                </Link>
              </div>

              {/* Scale */}
              <div className="relative flex flex-col rounded-2xl border border-gray-800 bg-gray-900/50 p-8">
                <h3 className="text-xl font-bold text-white">Scale</h3>
                <p className="mt-2 text-sm text-gray-400">For established businesses</p>
                <div className="mt-6">
                  <span className="text-5xl font-bold text-white">$199</span>
                  <span className="text-gray-500">/mo</span>
                </div>
                <ul className="mt-8 flex-1 space-y-4">
                  {["Unlimited workspaces", "Everything in Growth", "API access & webhooks", "AI-powered insights", "Custom integrations", "Dedicated account manager"].map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-500" />
                      <span className="text-sm text-gray-300">{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/register" className="mt-8 block">
                  <span className="flex w-full items-center justify-center rounded-lg border border-gray-700 px-6 py-3 text-sm font-semibold text-gray-300 hover:border-gray-500 hover:text-white transition-colors">
                    Start Free Trial
                  </span>
                </Link>
              </div>
            </div>
            <p className="mt-8 text-center text-sm text-gray-500">
              14-day free trial &bull; No credit card required &bull; Cancel anytime
            </p>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section id="testimonials" className="border-t border-gray-800 px-6 py-24">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white">Loved by SaaS founders</h2>
              <p className="mt-4 text-lg text-gray-400">Real founders, real results.</p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  quote: "Cash flow clarity in 5 minutes instead of 5 hours. This is the first tool I open every morning.",
                  name: "Alex Chen",
                  role: "Founder, DataPulse.io",
                },
                {
                  quote: "The 90-day forecast with P95 bands saved us from a cash crisis. We extended our runway by 3 months.",
                  name: "Sarah Mitchell",
                  role: "CEO, SaaSGrid",
                },
                {
                  quote: "I finally know my real MRR. No more spreadsheet math. I should have started using this years ago.",
                  name: "Marcus Johnson",
                  role: "Co-Founder, FlowStack",
                },
              ].map((t) => (
                <div key={t.name} className="rounded-2xl border border-gray-800 bg-gray-900/50 p-8">
                  <div className="mb-4 flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <Quote className="mb-4 h-8 w-8 text-gray-600" />
                  <p className="mb-6 text-gray-300 text-sm leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                  <div>
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="border-t border-gray-800 px-6 py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-4xl font-bold text-white">Ready to see your next 90 days?</h2>
            <p className="mt-4 text-lg text-gray-400">
              Join 200+ SaaS founders who already know their cash flow, MRR, and runway in real-time.
            </p>
            <Link href="/register" className="mt-10 inline-flex">
              <span className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-10 py-4 text-lg font-semibold text-white hover:bg-emerald-400 transition-colors shadow-xl shadow-emerald-500/25">
                Start Free Trial <ArrowRight className="h-5 w-5" />
              </span>
            </Link>
            <p className="mt-4 text-sm text-gray-500">
              No credit card required &bull; 14-day free trial
            </p>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-gray-800 px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 text-sm font-bold text-white">
                F
              </div>
              <span className="text-sm font-bold text-white">AI Finance Ops</span>
            </div>
            <div className="flex flex-wrap justify-center gap-8 text-sm">
              <Link href="#features" className="text-gray-400 hover:text-white transition-colors">
                Features
              </Link>
              <Link href="#pricing" className="text-gray-400 hover:text-white transition-colors">
                Pricing
              </Link>
              <Link href="/demo" className="text-gray-400 hover:text-white transition-colors">
                Demo
              </Link>
              <Link href="/login" className="text-gray-400 hover:text-white transition-colors">
                Sign In
              </Link>
            </div>
            <div className="flex gap-6">
              <span className="text-gray-500 text-sm cursor-default">Privacy</span>
              <span className="text-gray-500 text-sm cursor-default">Terms</span>
              <a href="#" className="text-gray-500 hover:text-gray-300 transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.2 6.7c.7-.4 1.3-1 1.8-1.7-.7.3-1.4.5-2.2.6-1-.7-2.3-1-3.6-1-2.7 0-4.9 2.2-4.9 4.9 0 .4 0 .8.1 1.1C7.7 8.7 4.6 6.8 2.5 4c-.4.7-.6 1.5-.6 2.4 0 1.7.9 3.2 2.2 4.1-.8 0-1.6-.2-2.2-.6v.1c0 2.4 1.7 4.4 4 4.9-.4.1-.8.1-1.3.1-.3 0-.6 0-.9-.1.6 1.9 2.4 3.3 4.6 3.3-1.7 1.3-3.8 2.1-6.1 2.1-.4 0-.8 0-1.2-.1 2.2 1.4 4.8 2.2 7.5 2.2 9.1 0 14-7.5 14-14v-.6c1-.7 1.8-1.6 2.5-2.6-.9.4-1.9.7-2.9.8z"/></svg>
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-300 transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"/></svg>
              </a>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-800 pt-8 text-center">
            <p className="text-sm text-gray-600">&copy; 2026 AI Finance Ops. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
