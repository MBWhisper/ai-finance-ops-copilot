import type { Metadata } from "next"
import Link from "next/link"
import { InternalLinks } from "@/components/InternalLinks"
import { Check } from "lucide-react"

export const metadata: Metadata = {
  title: "LTV Calculator for SaaS — Customer Lifetime Value | AI Finance Ops",
  description:
    "Calculate Customer Lifetime Value (LTV) for your SaaS business. Understand LTV:CAC ratio and what drives long-term profitability.",
  openGraph: {
    title: "LTV Calculator for SaaS — Customer Lifetime Value | AI Finance Ops",
    description: "Calculate Customer Lifetime Value (LTV) and your LTV:CAC ratio.",
    url: "https://aifinanceops.app/ltv-calculator",
    siteName: "AI Finance Ops",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "LTV Calculator" }],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "LTV Calculator for SaaS — Customer Lifetime Value | AI Finance Ops",
    description: "Calculate Customer Lifetime Value (LTV) and your LTV:CAC ratio.",
    images: ["/og-image.png"],
  },
}

export default function LTVCalculatorPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 pt-32 pb-16 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold tracking-widest uppercase text-emerald-400 mb-6">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          Free Tool
        </div>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-6">
          LTV Calculator<br />
          <span className="text-emerald-400">Customer Lifetime Value for SaaS</span>
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
          Know how much each customer is worth over their lifetime. LTV is one of the most important{" "}
          <Link href="/blog/saas-financial-metrics" className="text-emerald-400 hover:underline">
            SaaS financial metrics
          </Link>{" "}
          — and it starts with your{" "}
          <Link href="/churn-calculator" className="text-emerald-400 hover:underline">churn rate</Link>.
        </p>
        <Link
          href="/register"
          className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-8 py-3 text-base font-medium text-white hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/25 hover:-translate-y-0.5"
        >
          Track LTV automatically — start free
        </Link>
      </section>

      {/* Formulas */}
      <section className="border-t border-gray-800 px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            How to Calculate Customer LTV
          </h2>
          <p className="text-gray-400 leading-relaxed mb-6">
            LTV depends directly on your{" "}
            <Link href="/churn-calculator" className="text-emerald-400 hover:underline">churn rate</Link>{" "}
            and your{" "}
            <Link href="/mrr-calculator" className="text-emerald-400 hover:underline">average revenue per user</Link>.
            Lower churn = dramatically higher LTV.
          </p>
          <div className="space-y-4">
            <div className="border border-gray-800 bg-gray-900/50 rounded-xl p-6">
              <div className="text-sm font-mono text-emerald-400 mb-2">Simple LTV Formula</div>
              <div className="text-lg font-mono text-white">
                LTV = ARPU &divide; Monthly Churn Rate
              </div>
            </div>
            <div className="border border-gray-800 bg-gray-900/50 rounded-xl p-6">
              <div className="text-sm font-mono text-emerald-400 mb-2">LTV:CAC Ratio (Target: &gt; 3x)</div>
              <div className="text-lg font-mono text-white">
                LTV:CAC = Customer Lifetime Value &divide; Customer Acquisition Cost
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LTV:CAC benchmarks */}
      <section className="border-t border-gray-800 bg-gray-900/30 px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
            LTV:CAC Benchmarks for SaaS
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { ratio: "< 1x",  label: "Burning Money",     desc: "You spend more to acquire customers than they're worth", color: "text-red-400" },
              { ratio: "1x–3x", label: "Needs Improvement", desc: "Marginally profitable but risky for growth",           color: "text-amber-400" },
              { ratio: "> 3x",  label: "Healthy Growth",    desc: "Industry benchmark. You can scale confidently",       color: "text-emerald-400" },
            ].map((b) => (
              <div key={b.ratio} className="border border-gray-800 bg-gray-900/50 rounded-xl p-6 text-center">
                <div className={`text-3xl font-bold ${b.color} mb-2`}>{b.ratio}</div>
                <div className="text-sm font-semibold text-white mb-1">{b.label}</div>
                <div className="text-xs text-gray-500">{b.desc}</div>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-400 mt-8 max-w-xl mx-auto">
            To improve your LTV:CAC ratio, reduce{" "}
            <Link href="/churn-calculator" className="text-emerald-400 hover:underline">churn</Link>,
            grow{" "}
            <Link href="/mrr-calculator" className="text-emerald-400 hover:underline">MRR</Link>, or
            lower acquisition costs.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-gray-800 px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Track LTV Automatically</h2>
          <p className="text-gray-400 mb-8">
            AI Finance Ops calculates LTV, churn, and all key SaaS metrics in real time.
            No spreadsheets. No guessing.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-10 py-4 text-base font-semibold text-white hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/25"
          >
            Start free — no credit card required
          </Link>
        </div>
      </section>

      {/* Internal Links */}
      <InternalLinks
        variant="mixed"
        exclude="/ltv-calculator"
        title="More Free SaaS Finance Tools"
        limit={8}
      />
    </div>
  )
}
