import type { Metadata } from "next"
import Link from "next/link"
import { Check, ArrowRight, DollarSign, AlertTriangle } from "lucide-react"
import { FaqSchema } from "@/components/FaqSchema"
import { InternalLinks } from "@/components/InternalLinks"

export const metadata: Metadata = {
  title: "AI Finance Ops vs ProfitWell | Free SaaS Alternative (2026)",
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
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is AI Finance Ops a free alternative to ProfitWell?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. AI Finance Ops offers a forever free tier with MRR tracking, churn analysis, and 90-day cash flow forecasting. ProfitWell's core metrics are free, but their churn-fighting tool Retain costs $200+/mo as a separate add-on.",
        },
      },
      {
        "@type": "Question",
        name: "What does ProfitWell charge for churn reduction?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "ProfitWell's Retain product — which handles dunning and churn reduction — starts at $200/month as a separate paid add-on. AI Finance Ops includes churn alerts and at-risk customer identification in the base plan at no extra cost.",
        },
      },
      {
        "@type": "Question",
        name: "Can I migrate from ProfitWell to AI Finance Ops?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Connect your Stripe account and AI Finance Ops automatically syncs your historical subscription data. No manual export or import is required. Setup takes about 2 minutes.",
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
                    <th scope="col" className="p-5 text-sm font-semibold text-gray-500 w-1/3" />
                    <th scope="col" className="p-5 text-sm font-semibold text-emerald-400 w-1/3">AI Finance Ops</th>
                    <th scope="col" className="p-5 text-sm font-semibold text-gray-400 w-1/3">ProfitWell</th>
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

        {/* What is ProfitWell */}
        <section className="border-t border-gray-800 bg-gray-900/30 px-6 py-24">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold text-white mb-6">What is ProfitWell?</h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              ProfitWell is a subscription analytics platform founded in 2012. In 2022, ProfitWell was acquired by Paddle — a payment infrastructure company. The free metrics dashboard still exists, but the churn-fighting tools are now part of Paddle's ecosystem.
            </p>
            <p className="text-gray-400 leading-relaxed mb-4">
              ProfitWell's core metrics (MRR, churn, LTV) are free — but they're limited. The real value comes from their "Retain" product, which handles dunning and churn reduction. Retain starts at $200/mo as a separate paid add-on.
            </p>
            <p className="text-gray-400 leading-relaxed">
              For founders who need more than basic metrics — like AI forecasting, cash flow projections, or actionable churn alerts — ProfitWell's free tier falls short. And the paid features cost more than alternatives like AI Finance Ops.
            </p>
          </div>
        </section>

        {/* Real Cost Comparison */}
        <section className="border-t border-gray-800 px-6 py-24">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-white text-center mb-4">The real cost of ProfitWell</h2>
            <p className="text-gray-400 text-center mb-12">Free metrics are great — until you need to actually reduce churn.</p>
            <div className="overflow-x-auto rounded-2xl border border-gray-800 bg-gray-900/50">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th scope="col" className="p-5 text-sm font-semibold text-gray-500">Feature</th>
                    <th scope="col" className="p-5 text-sm font-semibold text-gray-500">ProfitWell</th>
                    <th scope="col" className="p-5 text-sm font-semibold text-emerald-400">AI Finance Ops</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {[
                    { feature: "MRR Tracking", pw: "Free", afo: "Free" },
                    { feature: "Churn Analytics", pw: "Free (basic)", afo: "Free (detailed)" },
                    { feature: "Churn Alerts", pw: "$200+/mo (Retain)", afo: "Free" },
                    { feature: "Dunning", pw: "$200+/mo (Retain)", afo: "Free" },
                    { feature: "AI Forecasting", pw: "Not available", afo: "Free" },
                    { feature: "Cash Flow Forecast", pw: "Not available", afo: "Free" },
                    { feature: "At-risk Customer ID", pw: "$200+/mo (Retain)", afo: "Free" },
                  ].map((row) => (
                    <tr key={row.feature} className="border-b border-gray-800/50 last:border-0">
                      <td className="p-5 text-gray-300 font-medium">{row.feature}</td>
                      <td className="p-5 text-gray-400">{row.pw}</td>
                      <td className="p-5 text-emerald-400">{row.afo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-center text-sm text-gray-500 mt-4">
              <AlertTriangle className="h-4 w-4 inline mr-1" />
              ProfitWell's churn tools (Retain) cost $200+/mo extra. AI Finance Ops includes everything in the free plan.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-gray-800 bg-gray-900/30 px-6 py-24">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {[
                { q: "Is AI Finance Ops a free alternative to ProfitWell?", a: "Yes. AI Finance Ops offers a forever free tier with MRR tracking, churn analysis, and 90-day cash flow forecasting. ProfitWell's core metrics are free, but their churn-fighting tool Retain costs $200+/mo as a separate add-on." },
                { q: "What does ProfitWell charge for churn reduction?", a: "ProfitWell's Retain product — which handles dunning and churn reduction — starts at $200/month as a separate paid add-on. AI Finance Ops includes churn alerts and at-risk customer identification in the base plan at no extra cost." },
                { q: "Can I migrate from ProfitWell to AI Finance Ops?", a: "Yes. Connect your Stripe account and AI Finance Ops automatically syncs your historical subscription data. No manual export or import is required. Setup takes about 2 minutes." },
                { q: "Why did ProfitWell get acquired by Paddle?", a: "Paddle acquired ProfitWell in 2022 to add subscription analytics to their payment infrastructure. The free metrics dashboard still exists, but the focus has shifted to Paddle's enterprise billing platform." },
              ].map((item) => (
                <div key={item.q} className="border border-gray-800 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-3">{item.q}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Internal Links */}
        <section className="border-t border-gray-800 px-6 py-16">
          <InternalLinks variant="mixed" exclude="/vs-profitwell" title="Related SaaS Finance Tools" limit={8} />
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
    <FaqSchema items={[
      { question: "Is AI Finance Ops a free alternative to ProfitWell?", answer: "Yes. AI Finance Ops offers a forever free tier with MRR tracking, churn analysis, and 90-day cash flow forecasting. ProfitWell's core metrics are free, but their churn-fighting tool Retain costs $200+/mo as a separate add-on." },
      { question: "What does ProfitWell charge for churn reduction?", answer: "ProfitWell's Retain product — which handles dunning and churn reduction — starts at $200/month as a separate paid add-on. AI Finance Ops includes churn alerts and at-risk customer identification in the base plan at no extra cost." },
      { question: "Can I migrate from ProfitWell to AI Finance Ops?", answer: "Yes. Connect your Stripe account and AI Finance Ops automatically syncs your historical subscription data. No manual export or import is required. Setup takes about 2 minutes." },
      { question: "Why did ProfitWell get acquired by Paddle?", answer: "Paddle acquired ProfitWell in 2022 to add subscription analytics to their payment infrastructure. The free metrics dashboard still exists, but the focus has shifted to Paddle's enterprise billing platform." },
    ]} />
    </>
  )
}
