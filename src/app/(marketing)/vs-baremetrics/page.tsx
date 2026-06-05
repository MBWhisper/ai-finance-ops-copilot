import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Baremetrics Alternative 2026: AI Finance Ops vs Baremetrics",
  description: "Looking for a Baremetrics alternative? AI Finance Ops offers MRR tracking, churn analysis, 90-day cash flow forecasting, and AI insights — starting free. Compare features and pricing.",
  alternates: {
    canonical: "https://aifinanceops.app/vs-baremetrics",
  },
  openGraph: {
    title: "Baremetrics Alternative 2026: AI Finance Ops vs Baremetrics",
    description: "Looking for a Baremetrics alternative? AI Finance Ops offers MRR tracking, churn analysis, 90-day cash flow forecasting, and AI insights — starting free.",
    url: "https://aifinanceops.app/vs-baremetrics",
    siteName: "AI Finance Ops",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "AI Finance Ops vs Baremetrics" }],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Baremetrics Alternative 2026: AI Finance Ops vs Baremetrics",
    description: "Looking for a Baremetrics alternative? AI Finance Ops offers MRR tracking, churn analysis, 90-day cash flow forecasting, and AI insights — starting free.",
    images: ["/og-image.png"],
  },
}

const COMPARISON_ROWS = [
  { label: "Starting Price", ours: "Free (paid from $29/mo)", theirs: "$308/mo" },
  { label: "Free Plan", ours: "✅ Forever free tier", theirs: "❌ 14-day trial only" },
  { label: "AI-Powered Insights", ours: "✅ AI copilot included", theirs: "❌" },
  { label: "90-Day Cash Flow Forecast", ours: "✅ Included", theirs: "✅ Paid only" },
  { label: "MRR / ARR Tracking", ours: "✅", theirs: "✅" },
  { label: "Churn Analysis", ours: "✅", theirs: "✅" },
  { label: "Setup Time", ours: "5 minutes", theirs: "30+ minutes" },
  { label: "Built For", ours: "Early-stage founders", theirs: "SMB / growth teams" },
]

const REASONS = [
  {
    number: "1",
    title: "Fraction of the price",
    desc: "Baremetrics starts at $308/month. AI Finance Ops is free for solo founders, with paid plans from $29/month — the same core analytics without the enterprise price tag.",
  },
  {
    number: "2",
    title: "AI insights Baremetrics doesn't have",
    desc: "Baremetrics shows you dashboards. AI Finance Ops explains why your MRR dropped, which customers churned, and what to do about it — automatically.",
  },
  {
    number: "3",
    title: "Cash flow forecasting included free",
    desc: "90-day cash flow forecasting with confidence bands is included in the free tier. With Baremetrics, forecasting is a paid add-on.",
  },
]

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is there a free alternative to Baremetrics?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. AI Finance Ops offers a forever free tier that includes MRR tracking, churn analysis, and 90-day cash flow forecasting — no credit card required. This makes it the only free Baremetrics alternative that includes forecasting.",
      },
    },
    {
      "@type": "Question",
      name: "How does AI Finance Ops compare to Baremetrics on price?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Baremetrics starts at $308/month with no free plan. AI Finance Ops is free for solo founders and starts at $29/month for paid plans — roughly 10x cheaper for comparable features.",
      },
    },
    {
      "@type": "Question",
      name: "Does AI Finance Ops have AI features that Baremetrics lacks?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. AI Finance Ops includes an AI copilot that automatically explains metric changes in plain English — for example, explaining exactly why MRR dropped and which customers drove the change. Baremetrics does not include AI-powered insights.",
      },
    },
    {
      "@type": "Question",
      name: "Can I migrate from Baremetrics to AI Finance Ops?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Connect your Stripe account and AI Finance Ops automatically syncs your historical MRR, churn, and revenue data. No manual export or import is required.",
      },
    },
  ],
}

export default function VsBaremetricsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
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
              <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-emerald-400">
                Baremetrics Alternative 2026
              </p>
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                AI Finance Ops vs Baremetrics
              </h1>
              <p className="mt-6 text-xl leading-8 text-gray-400 max-w-2xl mx-auto">
                Baremetrics costs $308/month and has no AI features. AI Finance Ops gives early-stage SaaS founders MRR tracking, churn analysis, 90-day cash flow forecasting, and AI-powered insights — starting free.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-8 py-4 text-base font-semibold text-white hover:bg-emerald-400 transition-all"
                >
                  Start Free — No Credit Card <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center rounded-lg border border-gray-700 px-8 py-4 text-base font-semibold text-gray-300 hover:border-gray-500 transition-all"
                >
                  See Pricing
                </Link>
              </div>
            </div>
          </section>

          {/* Comparison Table */}
          <section className="border-t border-gray-800 px-6 py-24">
            <div className="mx-auto max-w-4xl">
              <h2 className="text-3xl font-bold text-white text-center mb-4">
                AI Finance Ops vs Baremetrics: Feature Comparison
              </h2>
              <p className="text-gray-400 text-center mb-12">
                Side-by-side comparison of features and pricing.
              </p>
              <div className="overflow-x-auto rounded-2xl border border-gray-800 bg-gray-900/50">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-800">
                      <th className="p-5 text-sm font-semibold text-gray-500 w-1/3" />
                      <th className="p-5 text-sm font-semibold text-emerald-400 w-1/3">AI Finance Ops</th>
                      <th className="p-5 text-sm font-semibold text-gray-400 w-1/3">Baremetrics</th>
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
              <h2 className="text-3xl font-bold text-white text-center mb-4">
                Why founders switch from Baremetrics to AI Finance Ops
              </h2>
              <p className="text-gray-400 text-center mb-16">Three reasons early-stage SaaS teams are making the move.</p>
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

          {/* FAQ */}
          <section className="border-t border-gray-800 px-6 py-24">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-3xl font-bold text-white text-center mb-12">Frequently Asked Questions</h2>
              <div className="space-y-8">
                {FAQ_SCHEMA.mainEntity.map((faq) => (
                  <div key={faq.name} className="border-b border-gray-800 pb-8 last:border-0">
                    <h3 className="text-lg font-semibold text-white mb-3">{faq.name}</h3>
                    <p className="text-gray-400 leading-relaxed">{faq.acceptedAnswer.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section className="border-t border-gray-800 px-6 py-24">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-4xl font-bold text-white">Try the best Baremetrics alternative free</h2>
              <p className="mt-4 text-lg text-gray-400">
                MRR tracking, churn analysis, AI insights, and 90-day forecasting — all in one place. No credit card required.
              </p>
              <Link href="/register" className="mt-10 inline-flex">
                <span className="group inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-10 py-4 text-lg font-semibold text-white hover:bg-emerald-400 transition-all shadow-xl shadow-emerald-500/25">
                  Start Free Today <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </div>
          </section>
        </main>
      </div>
    </>
  )
}
