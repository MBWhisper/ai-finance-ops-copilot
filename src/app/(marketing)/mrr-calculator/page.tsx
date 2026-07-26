import type { Metadata } from "next"
import Link from "next/link"
import { InternalLinks } from "@/components/InternalLinks"
import { Check } from "lucide-react"

export const metadata: Metadata = {
  title: "MRR Calculator for SaaS — Monthly Recurring Revenue",
  description:
    "Calculate your Monthly Recurring Revenue (MRR) instantly. Understand expansion MRR, contraction, and net new MRR. Free tool for SaaS founders.",
  alternates: { canonical: 'https://aifinanceops.app/mrr-calculator' },
  openGraph: {
    title: "MRR Calculator for SaaS — Monthly Recurring Revenue | AI Finance Ops",
    description: "Calculate your MRR instantly. Understand expansion, contraction, and net new MRR.",
    url: "https://aifinanceops.app/mrr-calculator",
    siteName: "AI Finance Ops",
    images: [{ url: "https://aifinanceops.app/og-image.png", width: 1200, height: 630, alt: "MRR Calculator" }],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "MRR Calculator for SaaS — Monthly Recurring Revenue",
    description: "Calculate your MRR instantly. Free tool for SaaS founders.",
    images: ["https://aifinanceops.app/og-image.png"],
  },
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do you calculate MRR for a SaaS business?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "MRR = Number of Active Customers × Average Revenue Per User (ARPU). For example, 50 customers paying $100/month = $5,000 MRR. For annual plans, divide the annual contract value by 12.",
      },
    },
    {
      "@type": "Question",
      name: "What are the components of MRR?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "MRR has 5 components: (1) New MRR from new customers, (2) Expansion MRR from upgrades, (3) Contraction MRR from downgrades, (4) Churned MRR from cancellations, (5) Reactivation MRR from win-backs. Net New MRR = New + Expansion - Contraction - Churned + Reactivation.",
      },
    },
    {
      "@type": "Question",
      name: "What is a good MRR growth rate for SaaS?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Early-stage SaaS (pre-seed/seed) should aim for 15-20% month-over-month MRR growth. Growth-stage SaaS ($1M+ ARR) typically targets 10-15% MoM. Enterprise SaaS may see 5-10% MoM. Below 5% MoM at early stage signals product-market fit issues.",
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
      name: "How is Net New MRR different from total MRR?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Total MRR is your current monthly recurring revenue. Net New MRR is the change in MRR from one month to the next: Net New MRR = This Month MRR - Last Month MRR. It reveals whether your revenue is growing, shrinking, or flat.",
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

export default function MRRCalculatorPage() {
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
          Free Tool
        </div>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-6">
          MRR Calculator<br />
          <span className="text-emerald-400">for SaaS Businesses</span>
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
          Calculate your Monthly Recurring Revenue in seconds. MRR is the foundation of every
          other{" "}
          <Link href="/blog/saas-financial-metrics" className="text-emerald-400 hover:underline">
            SaaS financial metric
          </Link>
          .
        </p>
        <Link
          href="/register"
          className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-8 py-3 text-base font-medium text-white hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/25 hover:-translate-y-0.5"
        >
          Track MRR automatically — start free
        </Link>
      </section>

      {/* What is MRR */}
      <section className="border-t border-gray-800 px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            What is MRR?
          </h2>
          <p className="text-gray-400 leading-relaxed mb-6">
            Monthly Recurring Revenue (MRR) is the predictable, recurring revenue a SaaS company
            earns each month. It is the single most important growth metric for SaaS businesses,
            and forms the basis for calculating{" "}
            <Link href="/arr-calculator" className="text-emerald-400 hover:underline">ARR</Link>,{" "}
            <Link href="/ltv-calculator" className="text-emerald-400 hover:underline">LTV</Link>, and{" "}
            <Link href="/runway-calculator" className="text-emerald-400 hover:underline">runway</Link>.
          </p>
          <div className="border border-gray-800 bg-gray-900/50 rounded-xl p-6 mb-6">
            <div className="text-sm font-mono text-emerald-400 mb-2">Formula</div>
            <div className="text-lg font-mono text-white">
              MRR = Number of Customers &times; Average Revenue Per User (ARPU)
            </div>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { label: "New MRR",        desc: "Revenue from new customers this month",         color: "text-emerald-400" },
              { label: "Expansion MRR",  desc: "Upgrades and upsells from existing customers",  color: "text-blue-400" },
              { label: "Churned MRR",    desc: "Revenue lost from cancellations",               color: "text-red-400" },
            ].map((item) => (
              <div key={item.label} className="border border-gray-800 bg-gray-900/50 rounded-xl p-5">
                <div className={`text-sm font-bold ${item.color} mb-2`}>{item.label}</div>
                <div className="text-xs text-gray-500">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related metrics */}

      {/* MRR Benchmarks */}
      <section className="border-t border-gray-800 px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            MRR Benchmarks by SaaS Stage
          </h2>
          <p className="text-gray-400 leading-relaxed mb-8">
            Not all MRR targets are equal. What matters most is your growth rate relative to your stage.
            Here are typical MRR benchmarks based on 2026 SaaS data:
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
      <section className="border-t border-gray-800 bg-gray-900/30 px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Common MRR Calculation Mistakes
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

      {/* Real Example */}
      <section className="border-t border-gray-800 px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Real MRR Calculation Example
          </h2>
          <p className="text-gray-400 leading-relaxed mb-6">
            Here is a real-world example of how a SaaS startup calculates MRR:
          </p>
          <div className="border border-gray-800 bg-gray-900/50 rounded-xl p-6 font-mono text-sm space-y-2">
            <div className="text-emerald-400 font-sans font-semibold text-xs uppercase tracking-widest mb-3">Example: January MRR</div>
            <div className="text-gray-300">40 customers × $49/mo = <span className="text-white">$1,960</span></div>
            <div className="text-gray-300">10 customers × $99/mo = <span className="text-white">$990</span></div>
            <div className="text-gray-300">2 customers × $199/mo = <span className="text-white">$398</span></div>
            <div className="border-t border-gray-700 my-2" />
            <div className="text-gray-300">Total MRR = <span className="text-emerald-400 font-bold text-lg">$3,348</span></div>
            <div className="text-gray-300">ARR = $3,348 × 12 = <span className="text-emerald-400 font-bold">$40,176</span></div>
          </div>
          <div className="mt-6 border border-gray-800 bg-gray-900/50 rounded-xl p-6 font-mono text-sm">
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

      {/* Related metrics */}
      <section className="border-t border-gray-800 bg-gray-900/30 px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
            MRR is Just the Start
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { label: "Track churn",          link: "/churn-calculator",   desc: "Churned MRR is the silent killer. Calculate your churn rate now." },
              { label: "Calculate ARR",         link: "/arr-calculator",     desc: "Annual Recurring Revenue — what investors actually look at." },
              { label: "Forecast cash flow",    link: "/cash-flow-tracker",  desc: "MRR doesn't equal cash. Track when money actually arrives." },
              { label: "Measure LTV",           link: "/ltv-calculator",     desc: "Is your MRR per customer enough to justify your CAC?" },
            ].map((item) => (
              <div key={item.label} className="flex gap-4">
                <Check className="h-5 w-5 text-emerald-500 mt-0.5 shrink-0" />
                <div>
                  <Link href={item.link} className="text-sm font-semibold text-emerald-400 hover:underline">
                    {item.label}
                  </Link>
                  <p className="text-sm text-gray-400 mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-gray-800 px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Track MRR Automatically</h2>
          <p className="text-gray-400 mb-8">
            Stop calculating MRR in spreadsheets. AI Finance Ops connects to Stripe and tracks your MRR,
            churn, and{" "}
            <Link href="/blog/saas-financial-metrics" className="text-emerald-400 hover:underline">
              all key SaaS metrics
            </Link>{" "}
            automatically.
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
        exclude="/mrr-calculator"
        title="More Free SaaS Finance Tools"
        limit={8}
      />
    </div>
    </>
  )
}
