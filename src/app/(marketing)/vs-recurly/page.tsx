import type { Metadata } from "next"
import Link from "next/link"
import { Check, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "AI Finance Ops vs Recurly | Simpler SaaS Billing Analytics (2026)",
  description: "Compare AI Finance Ops vs Recurly. AI Finance Ops connects to your existing Stripe setup — no migration needed. Free MRR tracking, churn alerts, and AI forecasting.",
  alternates: { canonical: "https://aifinanceops.app/vs-recurly" },
  openGraph: {
    title: "AI Finance Ops vs Recurly | SaaS Analytics Without Migration",
    description: "Keep Stripe. Add AI Finance Ops for real-time MRR, churn, and forecasting. No billing migration needed.",
    url: "https://aifinanceops.app/vs-recurly",
    siteName: "AI Finance Ops",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "AI Finance Ops vs Recurly" }],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Finance Ops vs Recurly (2026)",
    description: "No billing migration. Keep Stripe, add AI Finance Ops for real-time SaaS analytics.",
    images: ["/og-image.png"],
  },
}

const COMPARISON_ROWS = [
  { label: "Price", ours: "Free plan + from $29/mo", theirs: "From $249/mo + 0.9% revenue" },
  { label: "Free Plan", ours: "✅ Full MRR tracking free", theirs: "❌ No free plan" },
  { label: "Stripe Migration Required", ours: "❌ Keep your Stripe setup", theirs: "✅ Full billing migration needed" },
  { label: "AI Forecasting", ours: "✅ 90-day cash flow", theirs: "❌ Not available" },
  { label: "Setup time", ours: "2 minutes", theirs: "Weeks (migration + testing)" },
  { label: "Churn Analytics", ours: "✅ Real-time + alerts", theirs: "✅ Basic reporting" },
  { label: "Revenue share fee", ours: "❌ No percentage fee", theirs: "✅ 0.9% of revenue" },
  { label: "Built for", ours: "Solo founders & early-stage", theirs: "Enterprise billing teams" },
]

const REASONS = [
  {
    number: "1",
    title: "Recurly charges 0.9% of your revenue",
    desc: "At $50k MRR, Recurly's 0.9% revenue share costs you $450/mo — before the base fee. AI Finance Ops has flat pricing with no percentage cut of your revenue. Ever.",
  },
  {
    number: "2",
    title: "No migration — keep your Stripe setup",
    desc: "Switching to Recurly means migrating your entire billing stack — customers, subscriptions, payment methods. Weeks of engineering work. AI Finance Ops connects read-only to your existing Stripe account in 2 minutes.",
  },
  {
    number: "3",
    title: "Free plan with full MRR tracking",
    desc: "Recurly starts at $249/mo with no free option. AI Finance Ops gives you complete MRR tracking, churn monitoring, and LTV calculation on the free plan — no credit card required.",
  },
]

export default function VsRecurlyPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden px-6 py-24 sm:py-32 lg:px-8">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-gray-950 to-gray-950" />
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-emerald-500/10 blur-3xl" />
          </div>
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold tracking-widest uppercase text-emerald-400 mb-6">
              Comparison
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              AI Finance Ops vs Recurly
            </h1>
            <p className="mt-6 text-xl leading-8 text-gray-400 max-w-2xl mx-auto">
              Recurly is a full billing platform that requires migrating away from Stripe and costs $249+/mo.
              AI Finance Ops connects to your existing Stripe in 2 minutes — free to start.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/register"
                className="inline-flex items-center rounded-lg bg-emerald-500 px-8 py-4 text-base font-semibold text-white hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/25"
              >
                Start Free — No Credit Card
              </Link>
              <Link
                href="/mrr-tracker"
                className="inline-flex items-center rounded-lg border border-gray-700 px-8 py-4 text-base font-semibold text-gray-300 hover:border-gray-500 hover:text-white transition-colors"
              >
                See MRR Tracker
              </Link>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="border-t border-gray-800 px-6 py-24">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-white text-center mb-4">Feature comparison</h2>
            <p className="text-gray-400 text-center mb-12">AI Finance Ops vs Recurly — analytics without the migration.</p>
            <div className="overflow-x-auto rounded-2xl border border-gray-800 bg-gray-900/50">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="p-5 text-sm font-semibold text-gray-500 w-1/3" />
                    <th className="p-5 text-sm font-semibold text-emerald-400 w-1/3">AI Finance Ops</th>
                    <th className="p-5 text-sm font-semibold text-gray-400 w-1/3">Recurly</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_ROWS.map((row) => (
                    <tr key={row.label} className="border-b border-gray-800/50 last:border-0">
                      <td className="p-5 text-sm text-gray-500 font-medium">{row.label}</td>
                      <td className="p-5 text-sm text-emerald-300 font-medium">{row.ours}</td>
                      <td className="p-5 text-sm text-gray-400">{row.theirs}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 3 Reasons */}
        <section className="border-t border-gray-800 px-6 py-24">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold text-white text-center mb-4">3 reasons to choose AI Finance Ops over Recurly</h2>
            <p className="text-gray-400 text-center mb-16">Especially if you are already on Stripe.</p>
            <div className="grid gap-8 md:grid-cols-3">
              {REASONS.map((r) => (
                <div key={r.number} className="rounded-2xl border border-gray-800 bg-gray-900/50 p-8 hover:border-gray-700 transition-colors">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-xl font-bold text-emerald-400">
                    {r.number}
                  </div>
                  <h3 className="mb-3 text-lg font-semibold text-white">{r.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{r.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Internal Links */}
        <section className="border-t border-gray-800 bg-gray-900/30 px-6 py-16">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-xl font-bold text-white mb-6 text-center">Free tools — works with your Stripe account</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { href: "/mrr-tracker", label: "MRR Tracker", desc: "Full MRR breakdown from Stripe" },
                { href: "/ltv-calculator", label: "LTV Calculator", desc: "Customer Lifetime Value + LTV:CAC" },
                { href: "/runway-calculator", label: "Runway Calculator", desc: "How many months until you run out" },
              ].map((l) => (
                <Link key={l.href} href={l.href} className="rounded-xl border border-gray-800 bg-gray-900/50 p-5 hover:border-emerald-500/40 hover:bg-emerald-500/5 transition-all group">
                  <div className="text-sm font-semibold text-white mb-1 group-hover:text-emerald-400 transition-colors">{l.label}</div>
                  <div className="text-xs text-gray-500">{l.desc}</div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="border-t border-gray-800 px-6 py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-4xl font-bold text-white">Keep Stripe. Get better analytics.</h2>
            <p className="mt-4 text-lg text-gray-400">Connect in 2 minutes. No migration. No percentage fee. Free to start.</p>
            <Link href="/register" className="mt-10 inline-flex">
              <span className="group inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-10 py-4 text-lg font-semibold text-white hover:bg-emerald-400 transition-all shadow-xl shadow-emerald-500/25">
                Start Free Today <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
