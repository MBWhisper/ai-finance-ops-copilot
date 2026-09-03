import type { Metadata } from "next"
import Link from "next/link"
import { InternalLinks } from "@/components/InternalLinks"
import { Check } from "lucide-react"

export const metadata: Metadata = {
  title: "What is MRR in SaaS? Complete Guide to Monthly Recurring Revenue (2026)",
  description:
    "What is MRR in SaaS? Learn the MRR meaning, how to calculate monthly recurring revenue, MRR components, benchmarks, and common mistakes. The definitive guide for SaaS founders.",
  alternates: { canonical: 'https://aifinanceops.app/what-is-mrr' },
  openGraph: {
    title: "What is MRR in SaaS? Complete Guide to Monthly Recurring Revenue (2026) | AI Finance Ops",
    description: "Learn the MRR meaning, how to calculate monthly recurring revenue, MRR components, benchmarks, and common mistakes.",
    url: "https://aifinanceops.app/what-is-mrr",
    siteName: "AI Finance Ops",
    images: [{ url: "https://aifinanceops.app/og-image.png", width: 1200, height: 630, alt: "What is MRR in SaaS?" }],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  title: "What is MRR? Complete Guide for SaaS Founders (2026)",
    description: "Learn the MRR meaning, how to calculate monthly recurring revenue, MRR components, benchmarks, and common mistakes.",
    images: ["https://aifinanceops.app/og-image.png"],
  },
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What does MRR stand for?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "MRR stands for Monthly Recurring Revenue. It is the predictable, recurring revenue a SaaS company earns each month from active subscriptions. MRR is the single most important growth metric for subscription businesses.",
      },
    },
    {
      "@type": "Question",
      name: "Why is MRR important for SaaS?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "MRR is the foundation for measuring growth, fundraising, valuation, and forecasting. Investors use MRR to evaluate SaaS businesses, and it forms the basis for calculating ARR, LTV, and runway.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between MRR and ARR?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "MRR (Monthly Recurring Revenue) is the monthly snapshot of predictable revenue. ARR (Annual Recurring Revenue) = MRR × 12. MRR tracks month-over-month growth momentum; ARR is used for investor reporting and annual contract comparisons.",
      },
    },
    {
      "@type": "Question",
      name: "What is Net New MRR?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Net New MRR = New MRR + Expansion MRR - Contraction MRR - Churned MRR + Reactivation MRR. It reveals whether your revenue is growing, shrinking, or flat from one month to the next.",
      },
    },
    {
      "@type": "Question",
      name: "What is a good MRR growth rate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Pre-seed: 20%+ MoM. Seed: 15-20% MoM. Series A: 10-15% MoM. Growth stage: 5-10% MoM. Below 5% MoM at early stage signals product-market fit issues.",
      },
    },
    {
      "@type": "Question",
      name: "How do I calculate MRR?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "MRR = Total number of active customers × Average Revenue Per User (ARPU). Alternatively, sum all monthly subscription values. For annual plans, divide the annual contract value by 12.",
      },
    },
  ],
}

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Calculate SaaS MRR",
  description: "Step-by-step guide to calculating Monthly Recurring Revenue (MRR) for your SaaS business.",
  step: [
    {
      "@type": "HowToStep",
      name: "List all active subscriptions",
      text: "Export or list every active paying customer and their monthly subscription price from your billing system (Stripe, PayPal, etc.).",
    },
    {
      "@type": "HowToStep",
      name: "Convert annual plans to monthly",
      text: "For customers on annual plans, divide the annual contract value by 12 to get the monthly equivalent.",
    },
    {
      "@type": "HowToStep",
      name: "Sum all monthly values",
      text: "Add up all the monthly subscription values. This is your total MRR.",
    },
    {
      "@type": "HowToStep",
      name: "Break down by component",
      text: "Categorize each change: New MRR (new customers), Expansion MRR (upgrades), Contraction MRR (downgrades), Churned MRR (cancellations).",
    },
  ],
}

export default function WhatIsMRRPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 pt-32 pb-16 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold tracking-widest uppercase text-emerald-400 mb-6">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          SaaS Metrics Guide
        </div>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-6">
          What is MRR in SaaS?<br />
          <span className="text-emerald-400">The Complete Guide</span>
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
          Monthly Recurring Revenue is the most important metric for SaaS businesses. Learn the MRR meaning, how to calculate it, and the benchmarks that matter.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/mrr-calculator"
            className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-8 py-3 text-base font-medium text-white hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/25 hover:-translate-y-0.5"
          >
            Calculate your MRR now
          </Link>
          <Link
            href="/mrr-tracker"
            className="inline-flex items-center gap-2 rounded-full border border-gray-700 bg-gray-900/50 px-8 py-3 text-base font-medium text-gray-300 hover:bg-gray-800 hover:text-white transition-all"
          >
            Track MRR automatically
          </Link>
        </div>
      </section>

      {/* MRR Definition */}
      <section className="border-t border-gray-800 px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            MRR Definition
          </h2>
          <p className="text-gray-400 leading-relaxed mb-6">
            <strong className="text-white">Monthly Recurring Revenue (MRR)</strong> is the predictable, recurring revenue a SaaS company earns each month from active subscriptions. It is the single most important growth metric for subscription businesses.
          </p>
          <p className="text-gray-400 leading-relaxed mb-6">
            MRR represents the steady income you can count on every month, excluding one-time fees, setup charges, or usage-based overages. It forms the basis for calculating{" "}
            <Link href="/arr-calculator" className="text-emerald-400 hover:underline">ARR</Link>,{" "}
            <Link href="/ltv-calculator" className="text-emerald-400 hover:underline">LTV</Link>, and{" "}
            <Link href="/runway-calculator" className="text-emerald-400 hover:underline">runway</Link>.
          </p>
          <div className="border border-gray-800 bg-gray-900/50 rounded-xl p-6 mb-6">
            <div className="text-sm font-mono text-emerald-400 mb-2">Formula</div>
            <div className="text-lg font-mono text-white">
              MRR = Number of Customers × Average Revenue Per User (ARPU)
            </div>
          </div>
        </div>
      </section>

      {/* Why MRR Matters */}
      <section className="border-t border-gray-800 bg-gray-900/30 px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Why MRR Matters
          </h2>
          <p className="text-gray-400 leading-relaxed mb-8">
            MRR is not just a number — it's the foundation of your SaaS business. Here's why it matters:
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { title: "Growth Measurement", desc: "MRR gives you a clear, month-over-month view of whether your revenue is growing, flat, or declining." },
              { title: "Fundraising", desc: "Investors use MRR to evaluate SaaS businesses. A strong, predictable MRR growth rate is essential for raising capital." },
              { title: "Valuation", desc: "SaaS valuations are typically calculated as a multiple of ARR (MRR × 12). Higher MRR = higher valuation." },
              { title: "Forecasting", desc: "MRR allows you to forecast future revenue, plan hiring, and manage cash flow with confidence." },
            ].map((item) => (
              <div key={item.title} className="border border-gray-800 bg-gray-900/50 rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-emerald-500 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-sm font-semibold text-white mb-1">{item.title}</div>
                    <div className="text-sm text-gray-400">{item.desc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Calculate MRR */}
      <section className="border-t border-gray-800 px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            How to Calculate MRR
          </h2>
          <p className="text-gray-400 leading-relaxed mb-6">
            Calculating MRR is straightforward. Here's the step-by-step process:
          </p>
          <div className="space-y-4 mb-8">
            {[
              { step: "1", title: "List all active subscriptions", desc: "Export every active paying customer and their monthly subscription price from your billing system." },
              { step: "2", title: "Convert annual plans to monthly", desc: "For customers on annual plans, divide the annual contract value by 12 to get the monthly equivalent." },
              { step: "3", title: "Sum all monthly values", desc: "Add up all the monthly subscription values. This is your total MRR." },
              { step: "4", title: "Break down by component", desc: "Categorize each change: New MRR, Expansion MRR, Contraction MRR, Churned MRR." },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-sm font-bold text-emerald-400">
                  {item.step}
                </span>
                <div>
                  <div className="text-sm font-semibold text-white mb-1">{item.title}</div>
                  <div className="text-sm text-gray-400">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="border border-gray-800 bg-gray-900/50 rounded-xl p-6">
            <div className="text-sm font-mono text-emerald-400 mb-2">Quick Formula</div>
            <div className="text-lg font-mono text-white">
              MRR = Total Customers × ARPU
            </div>
          </div>
        </div>
      </section>

      {/* MRR Components */}
      <section className="border-t border-gray-800 bg-gray-900/30 px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            MRR Components
          </h2>
          <p className="text-gray-400 leading-relaxed mb-8">
            MRR is made up of 5 components that tell the story of your revenue growth:
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { label: "New MRR", desc: "Revenue from new customers acquired this month.", color: "text-emerald-400" },
              { label: "Expansion MRR", desc: "Additional revenue from existing customers who upgrade or add seats.", color: "text-blue-400" },
              { label: "Contraction MRR", desc: "Revenue lost from customers who downgrade their plan.", color: "text-yellow-400" },
              { label: "Churned MRR", desc: "Revenue lost from customers who cancel entirely.", color: "text-red-400" },
              { label: "Reactivation MRR", desc: "Revenue from previously churned customers who return.", color: "text-purple-400" },
            ].map((item) => (
              <div key={item.label} className="border border-gray-800 bg-gray-900/50 rounded-xl p-5">
                <div className={`text-sm font-bold ${item.color} mb-2`}>{item.label}</div>
                <div className="text-xs text-gray-500">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Net New MRR Formula */}
      <section className="border-t border-gray-800 px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Net New MRR Formula
          </h2>
          <p className="text-gray-400 leading-relaxed mb-6">
            Net New MRR shows the change in your MRR from one month to the next. It's the true measure of growth:
          </p>
          <div className="border border-gray-800 bg-gray-900/50 rounded-xl p-6 mb-6">
            <div className="text-sm font-mono text-emerald-400 mb-2">Net New MRR Formula</div>
            <div className="text-lg font-mono text-white">
              Net New MRR = New + Expansion - Contraction - Churned + Reactivation
            </div>
          </div>
          <div className="grid sm:grid-cols-5 gap-2 text-center">
            {[
              { label: "New", color: "text-emerald-400", bg: "bg-emerald-500/10" },
              { label: "+ Expansion", color: "text-blue-400", bg: "bg-blue-500/10" },
              { label: "- Contraction", color: "text-yellow-400", bg: "bg-yellow-500/10" },
              { label: "- Churned", color: "text-red-400", bg: "bg-red-500/10" },
              { label: "+ Reactivation", color: "text-purple-400", bg: "bg-purple-500/10" },
            ].map((item) => (
              <div key={item.label} className={`${item.bg} rounded-lg p-3`}>
                <div className={`text-xs font-mono ${item.color}`}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MRR Benchmarks by Stage */}
      <section className="border-t border-gray-800 bg-gray-900/30 px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            MRR Benchmarks by Stage
          </h2>
          <p className="text-gray-400 leading-relaxed mb-8">
            What matters most is your growth rate relative to your stage. Here are typical MRR benchmarks based on 2026 SaaS data:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="p-4 font-semibold text-gray-300">Stage</th>
                  <th className="p-4 font-semibold text-gray-300">Typical MRR</th>
                  <th className="p-4 font-semibold text-gray-300">MoM Growth</th>
                  <th className="p-4 font-semibold text-gray-300">Key Focus</th>
                </tr>
              </thead>
              <tbody className="text-gray-400">
                <tr className="border-b border-gray-800/50">
                  <td className="p-4 font-medium text-white">Pre-seed</td>
                  <td className="p-4">$0 – $5K</td>
                  <td className="p-4 text-emerald-400">20%+</td>
                  <td className="p-4">Product-market fit</td>
                </tr>
                <tr className="border-b border-gray-800/50">
                  <td className="p-4 font-medium text-white">Seed</td>
                  <td className="p-4">$5K – $25K</td>
                  <td className="p-4 text-emerald-400">15–20%</td>
                  <td className="p-4">Retention & churn</td>
                </tr>
                <tr className="border-b border-gray-800/50">
                  <td className="p-4 font-medium text-white">Series A</td>
                  <td className="p-4">$25K – $100K</td>
                  <td className="p-4 text-emerald-400">10–15%</td>
                  <td className="p-4">Scalable growth</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-white">Growth</td>
                  <td className="p-4">$100K+</td>
                  <td className="p-4 text-emerald-400">5–10%</td>
                  <td className="p-4">Efficiency & expansion</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Common MRR Mistakes */}
      <section className="border-t border-gray-800 px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Common MRR Mistakes
          </h2>
          <div className="space-y-6">
            {[
              {
                mistake: "Including one-time revenue in MRR",
                fix: "Only count recurring subscription revenue. Setup fees, one-time charges, and overages should be excluded from MRR.",
              },
              {
                mistake: "Not converting annual plans to monthly",
                fix: "Annual contracts must be divided by 12. A $12,000/year customer contributes $1,000/month to MRR, not $12,000.",
              },
              {
                mistake: "Ignoring contraction MRR",
                fix: "Downgrades reduce MRR. Track Contraction MRR separately so you can spot trends before they become problems.",
              },
              {
                mistake: "Counting free trial users",
                fix: "Only paying customers count. Free trials, freemium users, and churned customers should never be included in MRR.",
              },
              {
                mistake: "Using gross MRR instead of net MRR",
                fix: "Gross MRR ignores churn and contraction. Net New MRR gives you the real picture of growth: New + Expansion - Contraction - Churned.",
              },
            ].map((item, i) => (
              <div key={i} className="border border-gray-800 bg-gray-900/50 rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-500/10 text-xs font-bold text-red-400">
                    {i + 1}
                  </span>
                  <div>
                    <div className="text-sm font-semibold text-red-400 mb-1">{item.mistake}</div>
                    <div className="text-sm text-gray-400">{item.fix}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Real MRR Example */}
      <section className="border-t border-gray-800 bg-gray-900/30 px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Real MRR Example
          </h2>
          <p className="text-gray-400 leading-relaxed mb-6">
            Here is a complete MRR calculation example with 3 customer segments:
          </p>
          <div className="border border-gray-800 bg-gray-900/50 rounded-xl p-6 font-mono text-sm space-y-2 mb-6">
            <div className="text-emerald-400 font-sans font-semibold text-xs uppercase tracking-widest mb-3">January MRR Calculation</div>
            <div className="text-gray-300">40 customers × $49/mo = <span className="text-white">$1,960</span></div>
            <div className="text-gray-300">10 customers × $99/mo = <span className="text-white">$990</span></div>
            <div className="text-gray-300">2 customers × $199/mo = <span className="text-white">$398</span></div>
            <div className="border-t border-gray-700 my-2" />
            <div className="text-gray-300">Total MRR = <span className="text-emerald-400 font-bold text-lg">$3,348</span></div>
            <div className="text-gray-300">ARR = $3,348 × 12 = <span className="text-emerald-400 font-bold">$40,176</span></div>
          </div>
          <div className="border border-gray-800 bg-gray-900/50 rounded-xl p-6 font-mono text-sm">
            <div className="text-emerald-400 font-sans font-semibold text-xs uppercase tracking-widest mb-3">February Net New MRR</div>
            <div className="text-gray-300">New MRR: <span className="text-emerald-400">+$490</span> (10 new customers × $49)</div>
            <div className="text-gray-300">Expansion: <span className="text-emerald-400">+$99</span> (1 customer upgraded $49→$99)</div>
            <div className="text-gray-300">Churned: <span className="text-red-400">-$147</span> (3 customers left × $49)</div>
            <div className="border-t border-gray-700 my-2" />
            <div className="text-gray-300">Net New MRR = <span className="text-emerald-400 font-bold">+$442</span></div>
            <div className="text-gray-300">New MRR = $3,348 + $442 = <span className="text-emerald-400 font-bold text-lg">$3,790</span></div>
          </div>
        </div>
      </section>

      {/* MRR vs ARR vs Revenue */}
      <section className="border-t border-gray-800 px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            MRR vs ARR vs Revenue
          </h2>
          <p className="text-gray-400 leading-relaxed mb-8">
            These terms are often confused. Here's the difference:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="p-4 font-semibold text-gray-300">Metric</th>
                  <th className="p-4 font-semibold text-gray-300">Definition</th>
                  <th className="p-4 font-semibold text-gray-300">Calculation</th>
                  <th className="p-4 font-semibold text-gray-300">Use Case</th>
                </tr>
              </thead>
              <tbody className="text-gray-400">
                <tr className="border-b border-gray-800/50">
                  <td className="p-4 font-medium text-white">MRR</td>
                  <td className="p-4">Monthly recurring revenue</td>
                  <td className="p-4">Customers × ARPU</td>
                  <td className="p-4">Month-over-month growth</td>
                </tr>
                <tr className="border-b border-gray-800/50">
                  <td className="p-4 font-medium text-white">ARR</td>
                  <td className="p-4">Annual recurring revenue</td>
                  <td className="p-4">MRR × 12</td>
                  <td className="p-4">Investor reporting, valuation</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-white">Revenue</td>
                  <td className="p-4">Total recognized revenue</td>
                  <td className="p-4">All income (recurring + one-time)</td>
                  <td className="p-4">Accounting, tax reporting</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Tools for Tracking MRR */}
      <section className="border-t border-gray-800 bg-gray-900/30 px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Tools for Tracking MRR
          </h2>
          <p className="text-gray-400 leading-relaxed mb-8">
            While spreadsheets work for early-stage startups, you'll need dedicated tools as you grow. Here are the best options:
          </p>
          <div className="space-y-4">
            <div className="border border-emerald-500/30 bg-emerald-500/5 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-emerald-500 mt-0.5 shrink-0" />
                <div>
                  <div className="text-sm font-semibold text-emerald-400 mb-1">AI Finance Ops (Recommended)</div>
                  <div className="text-sm text-gray-400 mb-2">
                    Connects directly to Stripe and tracks MRR, churn, and all key SaaS metrics automatically. No manual spreadsheet updates required.
                  </div>
                  <Link href="/mrr-tracker" className="text-sm text-emerald-400 hover:underline">
                    Start tracking MRR automatically →
                  </Link>
                </div>
              </div>
            </div>
            {[
              { name: "ChartMogul", desc: "Analytics platform for subscription businesses." },
              { name: "Baremetrics", desc: "Metrics dashboard for Stripe subscriptions." },
              { name: "ProfitWell", desc: "Revenue analytics and retention tools." },
            ].map((tool) => (
              <div key={tool.name} className="border border-gray-800 bg-gray-900/50 rounded-xl p-5">
                <div className="text-sm font-semibold text-white mb-1">{tool.name}</div>
                <div className="text-xs text-gray-500">{tool.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-gray-800 px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              { q: "What does MRR stand for?", a: "MRR stands for Monthly Recurring Revenue. It is the predictable, recurring revenue a SaaS company earns each month from active subscriptions." },
              { q: "Why is MRR important for SaaS?", a: "MRR is the foundation for measuring growth, fundraising, valuation, and forecasting. Investors use MRR to evaluate SaaS businesses, and it forms the basis for calculating ARR, LTV, and runway." },
              { q: "What is the difference between MRR and ARR?", a: "MRR is the monthly snapshot of predictable revenue. ARR = MRR × 12. MRR tracks month-over-month growth momentum; ARR is used for investor reporting and annual contract comparisons." },
              { q: "What is Net New MRR?", a: "Net New MRR = New MRR + Expansion MRR - Contraction MRR - Churned MRR + Reactivation MRR. It reveals whether your revenue is growing, shrinking, or flat from one month to the next." },
              { q: "What is a good MRR growth rate?", a: "Pre-seed: 20%+ MoM. Seed: 15-20% MoM. Series A: 10-15% MoM. Growth stage: 5-10% MoM. Below 5% MoM at early stage signals product-market fit issues." },
              { q: "How do I calculate MRR?", a: "MRR = Total number of active customers × Average Revenue Per User (ARPU). Alternatively, sum all monthly subscription values. For annual plans, divide the annual contract value by 12." },
            ].map((item, i) => (
              <div key={i} className="border border-gray-800 bg-gray-900/50 rounded-xl p-6">
                <div className="text-sm font-semibold text-white mb-2">{item.q}</div>
                <div className="text-sm text-gray-400">{item.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-gray-800 px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Start Tracking MRR Today</h2>
          <p className="text-gray-400 mb-8">
            Stop calculating MRR in spreadsheets. AI Finance Ops connects to Stripe and tracks your MRR, churn, and all key SaaS metrics automatically.
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
        exclude="/what-is-mrr"
        title="More Free SaaS Finance Tools"
        limit={8}
      />
    </div>
    </>
  )
}