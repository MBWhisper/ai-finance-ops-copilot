import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CheckCircle, XCircle, AlertCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Baremetrics Alternative for Bootstrapped Founders (2026) — AI Finance Ops",
  description:
    "The best Baremetrics alternative in 2026. AI Finance Ops gives solo founders MRR, churn, runway & cash flow tracking — free plan, 5-min Stripe setup. No $108/month bills.",
  keywords: "baremetrics alternative, baremetrics alternative free, baremetrics alternative 2026, cheaper baremetrics, baremetrics for bootstrapped founders",
  alternates: { canonical: "https://aifinanceops.app/baremetrics-alternative" },
  openGraph: {
    title: "Baremetrics Alternative for Bootstrapped Founders (2026) — AI Finance Ops",
    description: "The best Baremetrics alternative in 2026. Free plan, 5-min Stripe setup, AI-powered MRR & churn tracking.",
    url: "https://aifinanceops.app/baremetrics-alternative",
    siteName: "AI Finance Ops",
    images: [{ url: "https://aifinanceops.app/og-image.png", width: 1200, height: 630, alt: "AI Finance Ops Dashboard" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Baremetrics Alternative for Bootstrapped Founders (2026)",
    description: "Free plan, 5-min Stripe setup, AI-powered MRR & churn tracking.",
    images: ["https://aifinanceops.app/og-image.png"],
  },
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is there a free Baremetrics alternative?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. AI Finance Ops has a free plan with no credit card required. It includes MRR tracking, churn rate, and basic runway forecasting — everything a solo founder needs in the early stage. Baremetrics starts at $108/month with no free plan.",
      },
    },
    {
      "@type": "Question",
      name: "What is the cheapest Baremetrics alternative?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "AI Finance Ops is free to start and paid plans begin at a fraction of Baremetrics' $108/month starting price. For bootstrapped SaaS founders under $10k MRR, AI Finance Ops is the most cost-effective option with comparable core metrics.",
      },
    },
    {
      "@type": "Question",
      name: "Does AI Finance Ops connect to Stripe like Baremetrics?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. AI Finance Ops connects directly to Stripe and pulls your MRR, ARR, churn, new customers, and revenue in real time — exactly like Baremetrics, but with setup that takes under 5 minutes instead of 30+.",
      },
    },
    {
      "@type": "Question",
      name: "What metrics does AI Finance Ops track compared to Baremetrics?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "AI Finance Ops tracks MRR, ARR, churn rate, LTV, ARPU, runway, cash flow forecasts, and new/churned/expanded MRR movements — all core Baremetrics metrics. Additionally, AI Finance Ops adds AI-powered forecasting and natural language queries that Baremetrics does not offer.",
      },
    },
    {
      "@type": "Question",
      name: "Why would a founder switch from Baremetrics to AI Finance Ops?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The main reasons founders switch are price (Baremetrics charges $108+/month which is too expensive for early-stage), complexity (Baremetrics has features most solo founders never use), and AI features (AI Finance Ops adds cash flow forecasting and AI insights that Baremetrics lacks).",
      },
    },
    {
      "@type": "Question",
      name: "Is AI Finance Ops good for solo founders and indie hackers?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — AI Finance Ops was built specifically for solo founders, indie hackers, and early-stage SaaS teams. It's deliberately simpler than Baremetrics, has a free plan, and focuses on the metrics that matter most before you reach $50k MRR.",
      },
    },
  ],
}

export default function BaremetricsAlternativePage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main>
        {/* ── HERO ── */}
        <section className="relative overflow-hidden px-6 py-24 sm:py-32 lg:px-8">
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-gray-950 to-gray-950" />
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-emerald-500/10 blur-3xl" />
          </div>
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-1.5 text-xs font-medium text-emerald-400 mb-6">
              Baremetrics Alternative · Free Plan · 5-min Setup
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              The Baremetrics Alternative{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-emerald-200 bg-clip-text text-transparent">
                Built for Bootstrapped Founders
              </span>
            </h1>
            <p className="mt-6 text-xl leading-8 text-gray-400 max-w-2xl mx-auto">
              Baremetrics is a great product — but it starts at <strong className="text-white">$108/month</strong> and is priced for funded teams. AI Finance Ops gives you MRR, churn, runway, and cash flow tracking with a{" "}
              <strong className="text-emerald-400">free plan</strong> and a Stripe connection in under 5 minutes.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-8 py-4 text-base font-semibold text-white hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-600/20"
              >
                Start Free — No Credit Card <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/demo"
                className="inline-flex items-center rounded-lg border border-gray-700 px-8 py-4 text-base font-semibold text-gray-300 hover:border-emerald-500/50 hover:text-white transition-colors"
              >
                Watch 2-min Demo
              </Link>
            </div>
            <p className="mt-4 text-sm text-gray-500">Trusted by 200+ bootstrapped founders · Free forever plan available</p>
          </div>
        </section>

        {/* ── WHY FOUNDERS LEAVE BAREMETRICS ── */}
        <section className="border-t border-gray-800 px-6 py-20">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-white mb-4 text-center">
              Why Bootstrapped Founders Look for a Baremetrics Alternative
            </h2>
            <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
              Baremetrics is well-built and respected. But it was designed for funded SaaS companies — not for solo founders who are still finding product-market fit.
            </p>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-xl border border-gray-800 bg-gray-900/60 p-6">
                <div className="text-2xl mb-3">💸</div>
                <h3 className="text-lg font-semibold text-white mb-2">$108/month before you have $1k MRR</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Baremetrics&apos; starter plan is $108/month. For a founder at $500 MRR, that&apos;s 20% of revenue gone to analytics. AI Finance Ops has a free plan — and paid plans that scale with you.
                </p>
              </div>
              <div className="rounded-xl border border-gray-800 bg-gray-900/60 p-6">
                <div className="text-2xl mb-3">🗂️</div>
                <h3 className="text-lg font-semibold text-white mb-2">Features you&apos;ll never use at early stage</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Baremetrics has data enrichment, trial insights, email notifications, and Slack integrations. Useful at scale. But when you have 30 customers, you need clarity — not complexity.
                </p>
              </div>
              <div className="rounded-xl border border-gray-800 bg-gray-900/60 p-6">
                <div className="text-2xl mb-3">🤖</div>
                <h3 className="text-lg font-semibold text-white mb-2">No AI forecasting or cash flow intelligence</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Baremetrics shows you historical metrics. AI Finance Ops adds AI-powered runway forecasting and cash risk alerts so you know what&apos;s coming — not just what happened.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── DETAILED COMPARISON TABLE ── */}
        <section className="border-t border-gray-800 px-6 py-20">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold text-white mb-4 text-center">
              AI Finance Ops vs Baremetrics: Full Comparison (2026)
            </h2>
            <p className="text-gray-400 text-center mb-12">
              An honest, feature-by-feature comparison for founders choosing between the two.
            </p>
            <div className="overflow-x-auto rounded-xl border border-gray-800">
              <table className="min-w-full">
                <thead className="bg-gray-900 border-b border-gray-800">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 w-1/2">Feature</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-emerald-400">AI Finance Ops</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-400">Baremetrics</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {[
                    ["Starting price", "Free forever plan", "$108/month"],
                    ["Stripe integration", "yes", "yes"],
                    ["Real-time MRR tracking", "yes", "yes"],
                    ["ARR, churn rate, LTV, ARPU", "yes", "yes"],
                    ["New / churned / expansion MRR", "yes", "yes"],
                    ["Cash flow forecasting", "yes", "no"],
                    ["Runway calculator", "yes", "no"],
                    ["AI-powered insights", "yes", "no"],
                    ["Natural language queries", "yes", "no"],
                    ["Setup time", "Under 5 minutes", "30+ minutes"],
                    ["Built for solo founders", "yes", "no"],
                    ["Free plan available", "yes", "no"],
                  ].map(([feature, ours, theirs]) => (
                    <tr key={feature} className="bg-gray-950 hover:bg-gray-900/50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-300">{feature}</td>
                      <td className="px-6 py-4 text-center">
                        {ours === "yes" ? (
                          <CheckCircle className="h-5 w-5 text-emerald-400 mx-auto" />
                        ) : ours === "no" ? (
                          <XCircle className="h-5 w-5 text-gray-600 mx-auto" />
                        ) : (
                          <span className="text-sm text-emerald-400 font-medium">{ours}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {theirs === "yes" ? (
                          <CheckCircle className="h-5 w-5 text-gray-400 mx-auto" />
                        ) : theirs === "no" ? (
                          <XCircle className="h-5 w-5 text-gray-700 mx-auto" />
                        ) : (
                          <span className="text-sm text-gray-400 font-medium">{theirs}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-600 mt-3 text-center">Baremetrics pricing as of June 2026. Subject to change.</p>
          </div>
        </section>

        {/* ── WHO SHOULD SWITCH ── */}
        <section className="border-t border-gray-800 px-6 py-20">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-white mb-4 text-center">
              Who Should Switch to AI Finance Ops?
            </h2>
            <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
              AI Finance Ops is not for everyone. Here&apos;s an honest breakdown.
            </p>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle className="h-5 w-5 text-emerald-400" />
                  <h3 className="text-lg font-semibold text-white">Great fit for you if…</h3>
                </div>
                <ul className="space-y-3 text-sm text-gray-300">
                  <li className="flex gap-2"><span className="text-emerald-400 mt-0.5">→</span> You&apos;re pre-$50k MRR and Baremetrics pricing feels too steep</li>
                  <li className="flex gap-2"><span className="text-emerald-400 mt-0.5">→</span> You&apos;re a solo founder or small team (1-5 people)</li>
                  <li className="flex gap-2"><span className="text-emerald-400 mt-0.5">→</span> You use Stripe and want a live dashboard in minutes</li>
                  <li className="flex gap-2"><span className="text-emerald-400 mt-0.5">→</span> You want cash flow forecasting and runway alerts in one tool</li>
                  <li className="flex gap-2"><span className="text-emerald-400 mt-0.5">→</span> You&apos;re indie hacking or bootstrapping and every dollar counts</li>
                </ul>
              </div>
              <div className="rounded-xl border border-gray-700 bg-gray-900/40 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <AlertCircle className="h-5 w-5 text-gray-400" />
                  <h3 className="text-lg font-semibold text-white">Stick with Baremetrics if…</h3>
                </div>
                <ul className="space-y-3 text-sm text-gray-400">
                  <li className="flex gap-2"><span className="text-gray-500 mt-0.5">→</span> You&apos;re above $100k MRR and need enterprise-grade audit logs</li>
                  <li className="flex gap-2"><span className="text-gray-500 mt-0.5">→</span> You rely heavily on Baremetrics&apos; data enrichment features</li>
                  <li className="flex gap-2"><span className="text-gray-500 mt-0.5">→</span> You have a VC board that expects Baremetrics-style dashboards</li>
                  <li className="flex gap-2"><span className="text-gray-500 mt-0.5">→</span> You need deep multi-currency or multi-product segmentation</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── FREE TOOLS GRID ── */}
        <section className="border-t border-gray-800 px-6 py-16">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">Free Tools Included</h2>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {[
                { label: "MRR Tracker", href: "/mrr-tracker", desc: "Track Monthly Recurring Revenue in real time" },
                { label: "Churn Rate Calculator", href: "/churn-rate-calculator", desc: "Calculate and benchmark your churn" },
                { label: "Runway Calculator", href: "/runway-calculator", desc: "Know exactly how many months you have" },
                { label: "ARR Calculator", href: "/arr-calculator", desc: "Convert MRR to Annual Recurring Revenue" },
                { label: "LTV Calculator", href: "/ltv-calculator", desc: "Customer Lifetime Value made simple" },
                { label: "Cash Flow Tracker", href: "/cash-flow-tracker", desc: "Forecast your cash position 90 days out" },
              ].map(({ label, href, desc }) => (
                <Link
                  key={href}
                  href={href}
                  className="rounded-lg border border-gray-800 bg-gray-900/50 p-4 hover:border-emerald-500/40 hover:bg-gray-900 transition-colors group"
                >
                  <p className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors">{label} →</p>
                  <p className="text-xs text-gray-500 mt-1">{desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="border-t border-gray-800 px-6 py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {faqSchema.mainEntity.map((item) => (
                <div key={item.name} className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
                  <h3 className="text-base font-semibold text-white mb-3">{item.name}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{item.acceptedAnswer.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── INTERNAL COMPARISON LINKS ── */}
        <section className="border-t border-gray-800 px-6 py-12">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-xl font-semibold text-white mb-6">More Comparisons</h2>
            <div className="flex flex-wrap gap-3">
              {[
                { label: "AI Finance Ops vs Baremetrics (deep dive)", href: "/vs-baremetrics" },
                { label: "AI Finance Ops vs ChartMogul", href: "/vs-chartmogul" },
                { label: "AI Finance Ops vs ProfitWell", href: "/vs-profitwell" },
                { label: "AI Finance Ops vs Stripe Sigma", href: "/vs-stripe-sigma" },
                { label: "Baremetrics Alternative blog post", href: "/blog/baremetrics-alternative-2026" },
              ].map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="rounded-full border border-gray-700 bg-gray-900/50 px-4 py-2 text-sm text-gray-400 hover:border-emerald-500/40 hover:text-white transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section className="border-t border-gray-800 px-6 py-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to switch from Baremetrics?
            </h2>
            <p className="text-lg text-gray-400 mb-8">
              Start free. Connect Stripe. See your MRR dashboard in 5 minutes.
            </p>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-10 py-4 text-lg font-semibold text-white hover:bg-emerald-500 transition-all shadow-xl shadow-emerald-600/25"
            >
              Try AI Finance Ops Free <ArrowRight className="h-5 w-5" />
            </Link>
            <p className="mt-4 text-sm text-gray-600">No credit card · Free forever plan · Cancel anytime</p>
          </div>
        </section>
      </main>
    </div>
  )
}
