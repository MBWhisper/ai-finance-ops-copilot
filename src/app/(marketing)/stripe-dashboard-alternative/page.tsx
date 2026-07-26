import type { Metadata } from "next"
import Link from "next/link"
import { Check, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Stripe Dashboard Alternative 2026: SaaS Metrics Without the Complexity",
  description: "Looking for a Stripe dashboard alternative? AI Finance Ops tracks MRR, churn, LTV, and cash flow — automatically. No SQL. Free plan available.",
  alternates: { canonical: "https://aifinanceops.app/stripe-dashboard-alternative" },
  openGraph: {
    title: "Stripe Dashboard Alternative 2026: SaaS Metrics Without the Complexity",
    description: "Track MRR, churn, LTV, and cash flow automatically — without the complexity of Stripe's native dashboard. Free alternative.",
    url: "https://aifinanceops.app/stripe-dashboard-alternative",
    siteName: "AI Finance Ops",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Stripe Dashboard Alternative" }],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stripe Dashboard Alternative 2026",
    description: "SaaS metrics without the complexity. Free Stripe dashboard alternative.",
    images: ["/og-image.png"],
  },
}

const COMPARISON_ROWS = [
  { label: "Price", ours: "Free plan + from $29/mo", theirs: "Free (limited) / Plus $10/mo" },
  { label: "MRR tracking", ours: "✅ Auto-calculated from day one", theirs: "❌ Not available natively" },
  { label: "Churn analysis", ours: "✅ Real-time with alerts", theirs: "⚠️ Basic — no proactive alerts" },
  { label: "LTV", ours: "✅ Automatic per-customer and cohort", theirs: "❌ Must calculate manually" },
  { label: "Cash flow forecasting", ours: "✅ 90-day AI-powered forecasts", theirs: "❌ Not available" },
  { label: "AI insights", ours: "✅ Churn prediction + recommendations", theirs: "❌ None" },
  { label: "Setup time", ours: "Under 2 minutes (OAuth)", theirs: "Minutes (but limited metrics)" },
  { label: "Built for", ours: "SaaS founders & operators", theirs: "All Stripe businesses" },
]

const REASONS = [
  {
    number: "1",
    title: "Stripe shows payments, not SaaS metrics",
    desc: "Stripe's dashboard is built for payment operations — refunds, disputes, and transaction volumes. It doesn't calculate MRR, churn rate, LTV, or runway. You need a purpose-built SaaS analytics layer on top of Stripe.",
  },
  {
    number: "2",
    title: "You're stitching spreadsheets together",
    desc: "Most SaaS founders export Stripe CSVs into Google Sheets to track MRR and churn. That breaks every month. AI Finance Ops syncs with Stripe in real time so your metrics are always accurate — no exports, no formulas, no manual work.",
  },
  {
    number: "3",
    title: "Stripe can't predict what happens next",
    desc: "The Stripe dashboard is backwards-looking. AI Finance Ops adds forward-looking AI forecasts: predicted churn, cash runway, and revenue projections — so you can make decisions before problems hit.",
  },
]

const METRICS = [
  { name: "MRR & ARR", desc: "Monthly and annual recurring revenue, auto-calculated from active subscriptions" },
  { name: "Churn rate", desc: "Customer and revenue churn tracked in real time with threshold alerts" },
  { name: "Customer LTV", desc: "Lifetime value per customer and across cohorts — no manual formulas" },
  { name: "Cash flow forecast", desc: "90-day AI-powered cash flow projections based on your Stripe data" },
  { name: "Runway tracker", desc: "Know exactly how many months of runway you have left" },
  { name: "Expansion & contraction MRR", desc: "Track upsells, downgrades, and plan changes automatically" },
]

const FAQ_ITEMS = [
  {
    question: "Why do I need an alternative to the Stripe dashboard?",
    answer: "Stripe's dashboard shows raw payment data — transactions, refunds, and disputes. SaaS founders need calculated metrics like MRR, churn rate, LTV, and runway, which Stripe doesn't compute automatically. You end up exporting data to spreadsheets or building SQL queries yourself.",
  },
  {
    question: "What metrics does AI Finance Ops track from Stripe?",
    answer: "MRR, ARR, churn rate, LTV, cash flow, runway, expansion MRR, and contraction MRR — all calculated automatically when you connect your Stripe account via OAuth.",
  },
  {
    question: "Is AI Finance Ops a replacement for Stripe?",
    answer: "No. AI Finance Ops connects to Stripe and adds SaaS-specific analytics on top. You still use Stripe for payment processing, invoicing, and subscriptions. We provide the metrics layer Stripe doesn't.",
  },
  {
    question: "How long does setup take?",
    answer: "Under 2 minutes. Connect your Stripe account via OAuth and your dashboard is live immediately. No CSV exports, no SQL queries, no configuration required.",
  },
]

export default function StripeDashboardAlternativePage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
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
              Stripe Alternative
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              The Best Stripe Dashboard Alternative for SaaS Founders
            </h1>
            <p className="mt-6 text-xl leading-8 text-gray-400 max-w-2xl mx-auto">
              Stripe shows payments. You need SaaS metrics. AI Finance Ops connects to Stripe and gives you MRR, churn, LTV, and cash flow forecasting automatically.
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

        {/* Why Stripe's Dashboard Isn't Enough */}
        <section className="border-t border-gray-800 px-6 py-24">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-white text-center mb-4">
              Why Stripe&apos;s Dashboard Isn&apos;t Enough for SaaS
            </h2>
            <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
              Stripe is the best payment processor in the world. But it&apos;s not a SaaS metrics tool — and it was never designed to be one.
            </p>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-8">
                <h3 className="text-lg font-semibold text-white mb-3">What Stripe gives you</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-gray-500 mt-0.5 shrink-0" /> Transaction history</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-gray-500 mt-0.5 shrink-0" /> Refund and dispute tracking</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-gray-500 mt-0.5 shrink-0" /> Basic revenue summaries</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-gray-500 mt-0.5 shrink-0" /> Subscription management</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-emerald-800/50 bg-emerald-900/10 p-8">
                <h3 className="text-lg font-semibold text-white mb-3">What SaaS founders actually need</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" /> MRR and ARR breakdowns</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" /> Churn rate with alerts</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" /> Customer LTV and cohort analysis</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" /> Cash flow forecasting and runway</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="border-t border-gray-800 px-6 py-24">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-white text-center mb-4">Feature comparison</h2>
            <p className="text-gray-400 text-center mb-12">AI Finance Ops vs Stripe Dashboard — purpose-built for SaaS vs general payments.</p>
            <div className="overflow-x-auto rounded-2xl border border-gray-800 bg-gray-900/50">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th scope="col" className="p-5 text-sm font-semibold text-gray-500 w-1/3" />
                    <th scope="col" className="p-5 text-sm font-semibold text-emerald-400 w-1/3">AI Finance Ops</th>
                    <th scope="col" className="p-5 text-sm font-semibold text-gray-400 w-1/3">Stripe Dashboard</th>
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

        {/* 3 Reasons to Switch */}
        <section className="border-t border-gray-800 px-6 py-24">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold text-white text-center mb-4">3 reasons to switch from the Stripe dashboard</h2>
            <p className="text-gray-400 text-center mb-16">Stripe handles payments. AI Finance Ops handles metrics.</p>
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

        {/* What You Get */}
        <section className="border-t border-gray-800 px-6 py-24">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold text-white text-center mb-4">What you get when you connect Stripe</h2>
            <p className="text-gray-400 text-center mb-16">Six metrics tracked automatically — no configuration, no SQL, no spreadsheets.</p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {METRICS.map((m) => (
                <div key={m.name} className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6 hover:border-gray-700 transition-colors">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
                    <Check className="h-5 w-5 text-emerald-400" />
                  </div>
                  <h3 className="mb-2 text-base font-semibold text-white">{m.name}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-gray-800 px-6 py-24">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Frequently asked questions</h2>
            <div className="space-y-6">
              {FAQ_ITEMS.map((item) => (
                <div key={item.question} className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6">
                  <h3 className="text-base font-semibold text-white mb-3">{item.question}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-gray-800 px-6 py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-4xl font-bold text-white">Your Stripe metrics — without the complexity</h2>
            <p className="mt-4 text-lg text-gray-400">Connect Stripe and get every SaaS metric automatically. Free to start.</p>
            <Link href="/register" className="mt-10 inline-flex">
              <span className="group inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-10 py-4 text-lg font-semibold text-white hover:bg-emerald-400 transition-all shadow-xl shadow-emerald-500/25">
                Start Free Today <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
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
                { href: "/vs-stripe-sigma", label: "vs Stripe Sigma", desc: "See how we compare to Sigma" },
              ].map((l) => (
                <Link key={l.href} href={l.href} className="rounded-xl border border-gray-800 bg-gray-900/50 p-5 hover:border-emerald-500/40 hover:bg-emerald-500/5 transition-all group">
                  <div className="text-sm font-semibold text-white mb-1 group-hover:text-emerald-400 transition-colors">{l.label}</div>
                  <div className="text-xs text-gray-500">{l.desc}</div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
    </>
  )
}
