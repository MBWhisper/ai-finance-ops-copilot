import type { Metadata } from "next"
import Link from "next/link"
import { Check, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "ChartMogul Alternative 2026: Free AI-Powered SaaS Analytics",
  description:
    "Looking for a ChartMogul alternative? AI Finance Ops is free for solo founders with AI copilot, 90-day forecasting, and built-in churn alerts. Switch in 5 minutes.",
  alternates: { canonical: "https://aifinanceops.app/chartmogul-alternative" },
  openGraph: {
    title: "ChartMogul Alternative 2026: Free AI-Powered SaaS Analytics",
    description:
      "Looking for a ChartMogul alternative? AI Finance Ops is free for solo founders with AI copilot, 90-day forecasting, and built-in churn alerts.",
    url: "https://aifinanceops.app/chartmogul-alternative",
    siteName: "AI Finance Ops",
    images: [
      {
        url: "https://aifinanceops.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "ChartMogul Alternative — AI Finance Ops",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "ChartMogul Alternative 2026: Free AI-Powered SaaS Analytics",
    description:
      "Looking for a ChartMogul alternative? AI Finance Ops is free for solo founders with AI copilot, 90-day forecasting, and built-in churn alerts.",
    images: ["https://aifinanceops.app/og-image.png"],
  },
}

const REASONS = [
  {
    number: "1",
    title: "AI copilot, not just dashboards",
    desc: "ChartMogul shows you charts. AI Finance Ops explains what changed, why, and what to do next — all in plain English.",
  },
  {
    number: "2",
    title: "90-day cash flow forecasting",
    desc: "See where your cash is headed before it gets there. ChartMogul requires a $199/mo Pro plan for basic forecasting.",
  },
  {
    number: "3",
    title: "Built-in churn alerts",
    desc: "Get notified the moment a subscriber cancels or payment fails — and know exactly how it impacts your runway.",
  },
]

const COMPARISON_ROWS = [
  { label: "Price", ours: "Free forever", theirs: "Free up to $10K MRR, then $59–199/mo" },
  { label: "AI Copilot", ours: "✅", theirs: "❌" },
  { label: "Cash flow forecasting", ours: "✅ 90-day", theirs: "❌ (Pro only $199/mo)" },
  { label: "Churn alerts", ours: "✅ Built-in", theirs: "⚠️ Manual setup" },
  { label: "Setup time", ours: "5 minutes", theirs: "30+ minutes" },
  { label: "Built for", ours: "Pre-seed & seed founders", theirs: "Series A+ companies" },
  { label: "Stripe integration", ours: "✅ One-click", theirs: "✅" },
  { label: "MRR / ARR / Churn", ours: "✅", theirs: "✅" },
]

const FAQ_ITEMS = [
  {
    question: "Is there a free alternative to ChartMogul?",
    answer:
      "Yes. AI Finance Ops is free for solo founders with no MRR limits. ChartMogul's free plan covers up to $10K MRR, then charges $59–199/mo as you grow.",
  },
  {
    question: "What does AI Finance Ops have that ChartMogul doesn't?",
    answer:
      "AI copilot for plain-English metric explanations, 90-day cash flow forecasting, and built-in churn alerts — all included free.",
  },
  {
    question: "Is ChartMogul good for early-stage startups?",
    answer:
      "ChartMogul is designed for $1M+ ARR companies with dedicated finance teams. AI Finance Ops is built for pre-seed and seed founders who need fast, actionable insights without the complexity.",
  },
  {
    question: "How do I switch from ChartMogul?",
    answer:
      "Connect your Stripe account and AI Finance Ops automatically syncs your subscription data. No manual export, CSV upload, or downtime required.",
  },
]

export default function ChartmogulAlternativePage() {
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
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl bg-gradient-to-r from-white via-emerald-300 to-white bg-clip-text text-transparent">
                The Best ChartMogul Alternative for Early-Stage SaaS
              </h1>
              <p className="mt-6 text-xl leading-8 text-gray-400 max-w-2xl mx-auto">
                Free AI-powered analytics built for founders — not enterprises.
                Get MRR, churn, and cash flow forecasting in 5 minutes.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/register"
                  className="inline-flex items-center rounded-lg bg-emerald-500 px-8 py-4 text-base font-semibold text-white hover:bg-emerald-400 transition-all"
                >
                  Start Free &mdash; No Credit Card Needed
                </Link>
                <Link
                  href="#comparison"
                  className="inline-flex items-center rounded-lg border border-gray-700 px-8 py-4 text-base font-semibold text-gray-300 hover:border-gray-500 hover:text-white transition-all"
                >
                  See Comparison
                </Link>
              </div>
            </div>
          </section>

          {/* Comparison Table */}
          <section
            id="comparison"
            className="border-t border-gray-800 px-6 py-24"
          >
            <div className="mx-auto max-w-4xl">
              <h2 className="text-3xl font-bold text-white text-center mb-4">
                AI Finance Ops vs ChartMogul
              </h2>
              <p className="text-gray-400 text-center mb-12">
                See why founders are switching.
              </p>
              <div className="overflow-x-auto rounded-2xl border border-gray-800 bg-gray-900/50">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-800">
                      <th
                        scope="col"
                        className="p-5 text-sm font-semibold text-gray-500 w-1/4"
                      />
                      <th
                        scope="col"
                        className="p-5 text-sm font-semibold text-emerald-400 w-3/8"
                      >
                        AI Finance Ops
                      </th>
                      <th
                        scope="col"
                        className="p-5 text-sm font-semibold text-gray-400 w-3/8"
                      >
                        ChartMogul
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARISON_ROWS.map((row) => (
                      <tr
                        key={row.label}
                        className="border-b border-gray-800/50 last:border-0"
                      >
                        <td className="p-5 text-sm text-gray-500 font-medium">
                          {row.label}
                        </td>
                        <td className="p-5 text-sm text-emerald-300 font-medium">
                          {row.ours}
                        </td>
                        <td className="p-5 text-sm text-gray-400">
                          {row.theirs}
                        </td>
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
              <h2 className="text-3xl font-bold text-white text-center mb-4">
                3 reasons to switch from ChartMogul
              </h2>
              <p className="text-gray-400 text-center mb-16">
                What you get that ChartMogul doesn&apos;t offer.
              </p>
              <div className="grid gap-8 md:grid-cols-3">
                {REASONS.map((r) => (
                  <div
                    key={r.number}
                    className="rounded-2xl border border-gray-800 bg-gray-900/50 p-8 hover:border-gray-700 transition-colors"
                  >
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-xl font-bold text-emerald-400">
                      {r.number}
                    </div>
                    <h3 className="mb-3 text-lg font-semibold text-white">
                      {r.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {r.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Built for Founders */}
          <section className="border-t border-gray-800 px-6 py-24">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-3xl font-bold text-white mb-6">
                Built for founders, not enterprises
              </h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-12">
                ChartMogul serves Series A+ companies with complex needs. We
                serve founders who need clear answers — fast.
              </p>
              <div className="grid gap-6 sm:grid-cols-2 text-left max-w-2xl mx-auto">
                <div className="flex items-start gap-3">
                  <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-400" />
                  <span className="text-gray-300 text-sm">
                    See your MRR, churn, and runway in one view
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-400" />
                  <span className="text-gray-300 text-sm">
                    AI explains every metric change in plain English
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-400" />
                  <span className="text-gray-300 text-sm">
                    90-day cash flow forecast with no config
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-400" />
                  <span className="text-gray-300 text-sm">
                    Churn and payment-fail alerts out of the box
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-400" />
                  <span className="text-gray-300 text-sm">
                    Free forever — no MRR caps, no surprise bills
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-400" />
                  <span className="text-gray-300 text-sm">
                    One-click Stripe sync, live in 5 minutes
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="border-t border-gray-800 px-6 py-24">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-3xl font-bold text-white text-center mb-12">
                Frequently asked questions
              </h2>
              <div className="space-y-8">
                {FAQ_ITEMS.map((item) => (
                  <div key={item.question}>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {item.question}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="border-t border-gray-800 px-6 py-24">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-4xl font-bold text-white">
                Ready to switch from ChartMogul?
              </h2>
              <p className="mt-4 text-lg text-gray-400">
                Free for solo founders. No credit card required. Live in 5
                minutes.
              </p>
              <Link href="/register" className="mt-10 inline-flex">
                <span className="group inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-10 py-4 text-lg font-semibold text-white hover:bg-emerald-400 transition-all shadow-xl shadow-emerald-500/25">
                  Start Free Today{" "}
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </div>
          </section>

          {/* Internal Links */}
          <section className="border-t border-gray-800 px-6 py-16">
            <div className="mx-auto max-w-4xl">
              <h2 className="text-xl font-semibold text-white text-center mb-8">
                Learn more
              </h2>
              <div className="grid gap-4 sm:grid-cols-3 text-center">
                <Link
                  href="/vs-chartmogul"
                  className="rounded-xl border border-gray-800 bg-gray-900/50 p-6 hover:border-gray-700 transition-colors"
                >
                  <span className="text-sm font-medium text-emerald-400">
                    AI Finance Ops vs ChartMogul
                  </span>
                  <p className="mt-2 text-xs text-gray-500">
                    Feature-by-feature comparison
                  </p>
                </Link>
                <Link
                  href="/mrr-calculator"
                  className="rounded-xl border border-gray-800 bg-gray-900/50 p-6 hover:border-gray-700 transition-colors"
                >
                  <span className="text-sm font-medium text-emerald-400">
                    MRR Calculator
                  </span>
                  <p className="mt-2 text-xs text-gray-500">
                    Try our free MRR calculator
                  </p>
                </Link>
                <Link
                  href="/saas-financial-dashboard"
                  className="rounded-xl border border-gray-800 bg-gray-900/50 p-6 hover:border-gray-700 transition-colors"
                >
                  <span className="text-sm font-medium text-emerald-400">
                    Financial Dashboard
                  </span>
                  <p className="mt-2 text-xs text-gray-500">
                    See our full financial dashboard
                  </p>
                </Link>
                <Link
                  href="/what-is-mrr"
                  className="rounded-xl border border-gray-800 bg-gray-900/50 p-6 hover:border-gray-700 transition-colors"
                >
                  <span className="text-sm font-medium text-emerald-400">
                    What is MRR?
                  </span>
                  <p className="mt-2 text-xs text-gray-500">
                    Learn what MRR means
                  </p>
                </Link>
                <Link
                  href="/"
                  className="rounded-xl border border-gray-800 bg-gray-900/50 p-6 hover:border-gray-700 transition-colors"
                >
                  <span className="text-sm font-medium text-emerald-400">
                    Product Overview
                  </span>
                  <p className="mt-2 text-xs text-gray-500">
                    What AI Finance Ops does
                  </p>
                </Link>
                <Link
                  href="/register"
                  className="rounded-xl border border-gray-800 bg-gray-900/50 p-6 hover:border-gray-700 transition-colors"
                >
                  <span className="text-sm font-medium text-emerald-400">
                    Get Started Free
                  </span>
                  <p className="mt-2 text-xs text-gray-500">
                    Connect Stripe in 5 minutes
                  </p>
                </Link>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  )
}
