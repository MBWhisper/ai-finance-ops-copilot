import type { Metadata } from "next"
import Link from "next/link"
import { Check, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "AI Finance Ops vs Stripe Sigma | Better SaaS Analytics (2026)",
  description: "Compare AI Finance Ops vs Stripe Sigma. Get MRR, churn, LTV, and cash flow forecasting without writing SQL queries. Free plan. No Stripe Plus required.",
  alternates: { canonical: "https://aifinanceops.app/vs-stripe-sigma" },
  openGraph: {
    title: "AI Finance Ops vs Stripe Sigma | SaaS Analytics Without SQL",
    description: "MRR tracking, churn alerts, and AI forecasting — without writing a single SQL query. Free alternative to Stripe Sigma.",
    url: "https://aifinanceops.app/vs-stripe-sigma",
    siteName: "AI Finance Ops",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "AI Finance Ops vs Stripe Sigma" }],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Finance Ops vs Stripe Sigma (2026)",
    description: "SaaS metrics without SQL. Free alternative to Stripe Sigma.",
    images: ["/og-image.png"],
  },
}

const COMPARISON_ROWS = [
  { label: "Price", ours: "Free plan + from $29/mo", theirs: "Requires Stripe Plus ($10/mo) or higher" },
  { label: "Free Plan", ours: "✅ Full dashboard free", theirs: "❌ Paid Stripe plan required" },
  { label: "SQL Required", ours: "❌ No code — automatic", theirs: "✅ You write all queries manually" },
  { label: "MRR Dashboard", ours: "✅ Auto-calculated", theirs: "❌ Build it yourself in SQL" },
  { label: "Churn Tracking", ours: "✅ Real-time + alerts", theirs: "❌ Manual SQL queries" },
  { label: "AI Forecasting", ours: "✅ 90-day cash flow", theirs: "❌ Not available" },
  { label: "LTV Calculation", ours: "✅ Automatic", theirs: "❌ Write your own formula" },
  { label: "Setup time", ours: "2 minutes", theirs: "Hours (query writing + testing)" },
]

const REASONS = [
  {
    number: "1",
    title: "Stripe Sigma requires you to write SQL",
    desc: "Sigma is a powerful raw analytics tool — but every report requires writing and maintaining SQL queries. AI Finance Ops gives you every SaaS metric automatically with zero code.",
  },
  {
    number: "2",
    title: "No MRR dashboard out of the box",
    desc: "Stripe Sigma doesn't have a pre-built MRR tracker. You have to construct the logic yourself. AI Finance Ops connects to your Stripe account and shows New MRR, Expansion MRR, Churned MRR, and Net New MRR in real time — automatically.",
  },
  {
    number: "3",
    title: "AI forecasting Sigma will never have",
    desc: "Sigma is backwards-looking. AI Finance Ops adds forward-looking AI cash flow forecasts, churn prediction, and runway monitoring — the things that actually help you make decisions.",
  },
]

export default function VsStripeSigmaPage() {
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
              AI Finance Ops vs Stripe Sigma
            </h1>
            <p className="mt-6 text-xl leading-8 text-gray-400 max-w-2xl mx-auto">
              Stripe Sigma is a powerful SQL tool — but you have to build every metric yourself.
              AI Finance Ops gives you MRR, churn, LTV, and forecasting automatically. Free to start.
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
            <p className="text-gray-400 text-center mb-12">AI Finance Ops vs Stripe Sigma — built for founders vs built for engineers.</p>
            <div className="overflow-x-auto rounded-2xl border border-gray-800 bg-gray-900/50">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="p-5 text-sm font-semibold text-gray-500 w-1/3" />
                    <th className="p-5 text-sm font-semibold text-emerald-400 w-1/3">AI Finance Ops</th>
                    <th className="p-5 text-sm font-semibold text-gray-400 w-1/3">Stripe Sigma</th>
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
            <h2 className="text-3xl font-bold text-white text-center mb-4">Why founders choose AI Finance Ops over Sigma</h2>
            <p className="text-gray-400 text-center mb-16">Sigma answers questions. AI Finance Ops runs your finances.</p>
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
            <h2 className="text-xl font-bold text-white mb-6 text-center">Free SaaS tools — no SQL required</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { href: "/mrr-tracker", label: "MRR Tracker", desc: "Automatic MRR breakdown from Stripe" },
                { href: "/churn-rate-calculator", label: "Churn Calculator", desc: "Real-time customer and revenue churn" },
                { href: "/arr-calculator", label: "ARR Calculator", desc: "Annual Recurring Revenue tracking" },
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
            <h2 className="text-4xl font-bold text-white">Your MRR dashboard — no SQL needed</h2>
            <p className="mt-4 text-lg text-gray-400">Connect Stripe and get every metric automatically. Free to start.</p>
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
