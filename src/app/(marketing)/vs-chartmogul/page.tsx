import type { Metadata } from "next"
import Link from "next/link"
import { Check, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "AI Finance Ops vs ChartMogul | Simpler SaaS Analytics",
  description: "Compare AI Finance Ops and ChartMogul. The affordable, AI-powered alternative built for early-stage SaaS founders.",
  alternates: { canonical: "https://aifinanceops.app/vs-chartmogul" },
  openGraph: {
    title: "AI Finance Ops vs ChartMogul | Simpler SaaS Analytics",
    description: "Compare AI Finance Ops and ChartMogul. The affordable, AI-powered alternative built for early-stage SaaS founders.",
    url: "https://aifinanceops.app/vs-chartmogul",
    siteName: "AI Finance Ops",
    images: [{ url: "https://aifinanceops.app/og-image.png", width: 1200, height: 630, alt: "AI Finance Ops vs ChartMogul" }],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Finance Ops vs ChartMogul | Simpler SaaS Analytics",
    description: "Compare AI Finance Ops and ChartMogul. The affordable, AI-powered alternative built for early-stage SaaS founders.",
    images: ["https://aifinanceops.app/og-image.png"],
  },
}

const REASONS = [
  {
    number: "1",
    title: "Built for founders, not enterprises",
    desc: "ChartMogul is powerful but complex. AI Finance Ops is simple by design — get your metrics in 5 minutes, no training required.",
  },
  {
    number: "2",
    title: "10x more affordable",
    desc: "From $29/mo vs $199/mo. Same core metrics — MRR, ARR, churn — none of the enterprise bloat.",
  },
  {
    number: "3",
    title: "AI-powered forecasting",
    desc: "ChartMogul shows charts. AI Finance Ops tells you what to do next with AI-driven cash flow predictions and actionable insights.",
  },
]

const COMPARISON_ROWS = [
  { label: "Price", ours: "From $29/mo", theirs: "From $199/mo" },
  { label: "Free Plan", ours: "✅", theirs: "❌" },
  { label: "AI Forecasting", ours: "✅", theirs: "❌" },
  { label: "Setup time", ours: "5 minutes", theirs: "2+ hours" },
  { label: "Built for", ours: "Founders", theirs: "Enterprise" },
]

export default function VsChartmogulPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is AI Finance Ops a cheaper alternative to ChartMogul?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. AI Finance Ops starts free and paid plans begin at $29/mo. ChartMogul is free up to $10K MRR, then starts at $59/mo and goes up to $199/mo for Pro features like forecasting.",
        },
      },
      {
        "@type": "Question",
        name: "Does AI Finance Ops have AI features that ChartMogul lacks?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. AI Finance Ops includes an AI copilot that explains metric changes and provides 90-day cash flow forecasting. ChartMogul is a traditional analytics platform without AI insights.",
        },
      },
      {
        "@type": "Question",
        name: "Can I migrate from ChartMogul to AI Finance Ops?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Connect your Stripe account and AI Finance Ops automatically syncs your subscription data. No manual export or import required.",
        },
      },
    ],
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
              AI Finance Ops vs ChartMogul: The Better Choice for Solo Founders
            </h1>
            <p className="mt-6 text-xl leading-8 text-gray-400 max-w-2xl mx-auto">
              See why early-stage SaaS founders choose AI Finance Ops over ChartMogul
            </p>
            <div className="mt-10">
              <Link
                href="/register"
                className="inline-flex items-center rounded-lg bg-emerald-500 px-8 py-4 text-base font-semibold text-white hover:bg-emerald-400 transition-all"
              >
                Start Free &mdash; No Credit Card Needed
              </Link>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="border-t border-gray-800 px-6 py-24">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-white text-center mb-4">Feature comparison</h2>
            <p className="text-gray-400 text-center mb-12">How AI Finance Ops stacks up against ChartMogul.</p>
            <div className="overflow-x-auto rounded-2xl border border-gray-800 bg-gray-900/50">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th scope="col" className="p-5 text-sm font-semibold text-gray-500 w-1/3" />
                    <th scope="col" className="p-5 text-sm font-semibold text-emerald-400 w-1/3">AI Finance Ops</th>
                    <th scope="col" className="p-5 text-sm font-semibold text-gray-400 w-1/3">ChartMogul</th>
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
            <h2 className="text-3xl font-bold text-white text-center mb-4">3 reasons to switch to AI Finance Ops</h2>
            <p className="text-gray-400 text-center mb-16">Why founders are making the move.</p>
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

        {/* Final CTA */}
        <section className="border-t border-gray-800 px-6 py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-4xl font-bold text-white">Ready to make the switch?</h2>
            <p className="mt-4 text-lg text-gray-400">Join founders who chose simplicity over complexity.</p>
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
