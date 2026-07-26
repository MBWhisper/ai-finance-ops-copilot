import type { Metadata } from "next"
import Link from "next/link"
import { Check, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "ProfitWell Alternative 2026: Free SaaS Metrics Tool",
  description:
    "Looking for a ProfitWell alternative in 2026? AI Finance Ops offers free MRR tracking, churn analysis, and AI forecasting — no Paddle account required.",
  alternates: { canonical: "https://aifinanceops.app/profitwell-alternative" },
  openGraph: {
    title: "ProfitWell Alternative 2026: Free SaaS Metrics Tool",
    description:
      "ProfitWell was acquired by Paddle. Get free MRR tracking, churn alerts, and AI forecasting with AI Finance Ops.",
    url: "https://aifinanceops.app/profitwell-alternative",
    siteName: "AI Finance Ops",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "ProfitWell Alternative 2026" }],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "ProfitWell Alternative 2026: Free SaaS Metrics Tool",
    description:
      "ProfitWell was acquired by Paddle. Try AI Finance Ops — free MRR tracking, churn alerts, and AI forecasting.",
    images: ["/og-image.png"],
  },
}

const FAQ_DATA = [
  {
    question: "Is ProfitWell still available?",
    answer:
      "ProfitWell's free metrics tool was merged into Paddle after the acquisition. Many features now require a Paddle account or the paid Retain add-on, which starts at $200+/mo.",
  },
  {
    question: "What is the best free alternative to ProfitWell?",
    answer:
      "AI Finance Ops offers free MRR tracking, churn analysis, and AI forecasting — no Paddle account required. It connects to Stripe in 2 minutes and is designed for solo SaaS founders.",
  },
  {
    question: "Why switch from ProfitWell?",
    answer:
      "ProfitWell Retain costs $200+/mo for churn reduction. AI Finance Ops includes churn alerts, at-risk customer identification, and 90-day AI cash flow forecasting free — no add-ons needed.",
  },
  {
    question: "Does AI Finance Ops work with Stripe?",
    answer:
      "Yes, connects via OAuth in 2 minutes. Also supports PayPal and LemonSqueezy. Your historical subscription data syncs automatically.",
  },
]

const COMPARISON_ROWS = [
  { label: "Price", ours: "Free plan + from $29/mo", theirs: "Free (limited) / Retain $200+/mo" },
  { label: "MRR Tracking", ours: "✅ Full tracking, free", theirs: "✅ Basic metrics free" },
  { label: "AI Forecasting", ours: "✅ 90-day cash flow AI", theirs: "❌ Not available" },
  { label: "Churn Alerts", ours: "✅ Real-time spike alerts", theirs: "❌ Retain add-on only ($200+/mo)" },
  { label: "Setup time", ours: "2 minutes (OAuth)", theirs: "15–30 minutes" },
  { label: "LTV Calculator", ours: "✅ Automatic from Stripe", theirs: "✅ Basic" },
  { label: "Paddle Account Required", ours: "No", theirs: "Yes (after acquisition)" },
  { label: "Built for", ours: "Solo founders & early-stage", theirs: "Growth-stage & enterprise" },
]

const REASONS = [
  {
    number: "1",
    title: "ProfitWell is now Paddle — and Paddle wants your money",
    desc: "After Paddle acquired ProfitWell, the free tool was absorbed into their paid ecosystem. Features that were once free now require a Paddle account, and the churn-fighting Retain add-on costs $200+/mo. AI Finance Ops stays free.",
  },
  {
    number: "2",
    title: "AI forecasting ProfitWell never had",
    desc: "ProfitWell shows you historical metrics. AI Finance Ops adds 90-day AI-powered cash flow forecasting so you can spot problems before they hit your runway — not after the damage is done.",
  },
  {
    number: "3",
    title: "Churn alerts included — not upsold",
    desc: "ProfitWell gates its best churn-reduction features behind a $200+/mo paywall. AI Finance Ops includes real-time churn spike alerts and at-risk customer identification in the base plan.",
  },
]

export default function ProfitWellAlternativePage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_DATA.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
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
                ProfitWell Alternative
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                The Best Free ProfitWell Alternative in 2026
              </h1>
              <p className="mt-6 text-xl leading-8 text-gray-400 max-w-2xl mx-auto">
                ProfitWell was acquired by Paddle and features are being locked behind paid plans. AI Finance Ops gives you free MRR tracking, churn alerts, and AI forecasting — no Paddle account required.
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

          {/* What happened to ProfitWell */}
          <section className="border-t border-gray-800 px-6 py-24">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-3xl font-bold text-white mb-6">What happened to ProfitWell?</h2>
              <div className="space-y-4 text-gray-400 leading-relaxed">
                <p>
                  In 2022, Paddle acquired ProfitWell and merged its features into the Paddle ecosystem.
                  What was once a simple, free metrics tool now requires a Paddle merchant account to access.
                </p>
                <p>
                  ProfitWell's standalone free plan still exists in a limited form, but the churn-fighting
                  tool <strong className="text-gray-200">Retain</strong> — which many founders relied on —
                  is now a paid add-on starting at $200+/mo.
                </p>
                <p>
                  If you're a SaaS founder who just needs reliable MRR tracking, churn analysis, and forecasting
                  without being pushed into a payment processor's ecosystem, you need an alternative.
                </p>
              </div>
            </div>
          </section>

          {/* Comparison Table */}
          <section className="border-t border-gray-800 px-6 py-24">
            <div className="mx-auto max-w-4xl">
              <h2 className="text-3xl font-bold text-white text-center mb-4">
                AI Finance Ops vs ProfitWell — feature comparison
              </h2>
              <p className="text-gray-400 text-center mb-12">
                Side-by-side comparison for SaaS founders evaluating alternatives.
              </p>
              <div className="overflow-x-auto rounded-2xl border border-gray-800 bg-gray-900/50">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-800">
                      <th scope="col" className="p-5 text-sm font-semibold text-gray-500 w-1/3" />
                      <th scope="col" className="p-5 text-sm font-semibold text-emerald-400 w-1/3">
                        AI Finance Ops
                      </th>
                      <th scope="col" className="p-5 text-sm font-semibold text-gray-400 w-1/3">
                        ProfitWell
                      </th>
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
              <h2 className="text-3xl font-bold text-white text-center mb-4">
                3 reasons to switch from ProfitWell
              </h2>
              <p className="text-gray-400 text-center mb-16">
                The Paddle acquisition changed the math for SaaS founders.
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
              <h2 className="text-3xl font-bold text-white text-center mb-12">
                Frequently asked questions
              </h2>
              <div className="space-y-6">
                {FAQ_DATA.map((faq) => (
                  <div
                    key={faq.question}
                    className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6"
                  >
                    <h3 className="text-lg font-semibold text-white mb-3">{faq.question}</h3>
                    <p className="text-gray-400 leading-relaxed text-sm">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="border-t border-gray-800 px-6 py-24">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-4xl font-bold text-white">Switch to the free ProfitWell alternative</h2>
              <p className="mt-4 text-lg text-gray-400">
                No Paddle account. No $200/mo add-ons. Everything you need in one free plan.
              </p>
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
              <h2 className="text-xl font-bold text-white mb-6 text-center">Free SaaS tools from AI Finance Ops</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { href: "/mrr-tracker", label: "MRR Tracker", desc: "Track Monthly Recurring Revenue automatically" },
                  { href: "/churn-rate-calculator", label: "Churn Rate Calculator", desc: "Customer churn, revenue churn, net revenue churn" },
                  { href: "/ltv-calculator", label: "LTV Calculator", desc: "Customer Lifetime Value + LTV:CAC ratio" },
                  { href: "/runway-calculator", label: "Runway Calculator", desc: "Calculate your startup runway" },
                  { href: "/saas-financial-dashboard", label: "Financial Dashboard", desc: "See our full dashboard" },
                  { href: "/what-is-mrr", label: "What is MRR?", desc: "Learn what MRR means" },
                ].map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="rounded-xl border border-gray-800 bg-gray-900/50 p-5 hover:border-emerald-500/40 hover:bg-emerald-500/5 transition-all group"
                  >
                    <div className="text-sm font-semibold text-white mb-1 group-hover:text-emerald-400 transition-colors">
                      {l.label}
                    </div>
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
