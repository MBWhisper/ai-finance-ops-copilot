import type { Metadata } from "next"
import Link from "next/link"
import { Check, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "AI Finance Ops vs ProfitWell | Free Alternative for SaaS Founders (2026)",
  description: "Compare AI Finance Ops vs ProfitWell. See why SaaS founders choose AI Finance Ops — free plan, AI forecasting, and full MRR tracking without ProfitWell's limitations.",
  alternates: { canonical: "https://aifinanceops.app/vs-profitwell" },
  openGraph: {
    title: "AI Finance Ops vs ProfitWell | Free Alternative for SaaS Founders",
    description: "Compare AI Finance Ops vs ProfitWell. Free plan, AI forecasting, real-time churn alerts — built for solo founders.",
    url: "https://aifinanceops.app/vs-profitwell",
    siteName: "AI Finance Ops",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "AI Finance Ops vs ProfitWell" }],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Finance Ops vs ProfitWell (2026)",
    description: "Free ProfitWell alternative with AI forecasting. Connect Stripe in 2 minutes.",
    images: ["/og-image.png"],
  },
}

const COMPARISON_ROWS = [
  { label: "Price", ours: "Free plan + from $29/mo", theirs: "Free (limited) / Retain from $200/mo" },
  { label: "Free Plan", ours: "✅ Full MRR tracking free", theirs: "✅ Metrics only, paid add-ons" },
  { label: "AI Forecasting", ours: "✅ 90-day cash flow AI", theirs: "❌ No AI forecasting" },
  { label: "Churn Alerts", ours: "✅ Real-time spike alerts", theirs: "❌ Retain add-on required ($200+/mo)" },
  { label: "Setup time", ours: "2 minutes", theirs: "15–30 minutes" },
  { label: "LTV Calculator", ours: "✅ Automatic from Stripe", theirs: "✅ Basic" },
  { label: "Built for", ours: "Solo founders & early-stage", theirs: "Growth-stage & enterprise" },
  { label: "Cash Flow Forecast", ours: "✅ AI-powered", theirs: "❌ Not included" },
]

const REASONS = [
  {
    number: "1",
    title: "ProfitWell's churn tools cost $200+/mo extra",
    desc: "ProfitWell's 'Retain' product — which actually fights churn — is a separate paid add-on starting at $200/mo. AI Finance Ops includes churn alerts and at-risk customer identification in the base plan.",
  },
  {
    number: "2",
    title: "AI forecasting ProfitWell doesn't have",
    desc: "ProfitWell shows historical metrics. AI Finance Ops adds 90-day AI-powered cash flow forecasting so you can see problems before they happen — not after.",
  },
  {
    number: "3",
    title: "Built for founders, not finance teams",
    desc: "ProfitWell is designed for companies with finance staff. AI Finance Ops is built for a solo founder who needs to understand their numbers in 30 seconds — no training required.",
  },
]

export default function VsProfitWellPage() {
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
              AI Finance Ops vs ProfitWell
            </h1>
            <p className="mt-6 text-xl leading-8 text-gray-400 max-w-2xl mx-auto">
              ProfitWell is free for metrics — but the tools you actually need to reduce churn cost $200+/mo extra.
              AI Finance Ops gives you everything in one free plan.
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
            <p className="text-gray-400 text-center mb-12">AI Finance Ops vs ProfitWell — what you actually get.</p>
            <div className="overflow-x-auto rounded-2xl border border-gray-800 bg-gray-900/50">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="p-5 text-sm font-semibold text-gray-500 w-1/3" />
                    <th className="p-5 text-sm font-semibold text-emerald-400 w-1/3">AI Finance Ops</th>
                    <th className="p-5 text-sm font-semibold text-gray-400 w-1/3">ProfitWell</th>
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
            <h2 className="text-3xl font-bold text-white text-center mb-4">3 reasons founders switch from ProfitWell</h2>
            <p className="text-gray-400 text-center mb-16">The real cost of ProfitWell becomes clear at $50k+ ARR.</p>
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
            <h2 className="text-xl font-bold text-white mb-6 text-center">Free SaaS tools from AI Finance Ops</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { href: "/mrr-tracker", label: "MRR Tracker", desc: "Track Monthly Recurring Revenue automatically" },
                { href: "/churn-rate-calculator", label: "Churn Rate Calculator", desc: "Customer churn, revenue churn, net revenue churn" },
                { href: "/ltv-calculator", label: "LTV Calculator", desc: "Customer Lifetime Value + LTV:CAC ratio" },
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
            <h2 className="text-4xl font-bold text-white">Try the free ProfitWell alternative</h2>
            <p className="mt-4 text-lg text-gray-400">No add-ons. No hidden costs. Everything you need in one free plan.</p>
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
