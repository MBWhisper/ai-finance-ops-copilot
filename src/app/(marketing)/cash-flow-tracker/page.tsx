import type { Metadata } from "next"
import Link from "next/link"
import { InternalLinks } from "@/components/InternalLinks"
import { TrendingUp, BarChart2, AlertCircle, Check, Zap, ArrowDownRight, ArrowUpRight, Clock, DollarSign } from "lucide-react"

export const metadata: Metadata = {
  title: { absolute: "SaaS Cash Flow Tracker — Free Tool | AI Finance Ops" },
  description:
    "Track and forecast SaaS cash flow in real time. Understand burn rate, runway, and 90-day cash projections without spreadsheets.",
  alternates: { canonical: 'https://aifinanceops.app/cash-flow-tracker' },
  openGraph: {
    title: "SaaS Cash Flow Tracker — Free Tool | AI Finance Ops",
    description: "Track and forecast SaaS cash flow in real time. Understand burn rate, runway, and 90-day cash projections.",
    url: "https://aifinanceops.app/cash-flow-tracker",
    siteName: "AI Finance Ops",
    images: [{ url: "https://aifinanceops.app/og-image.png", width: 1200, height: 630, alt: "SaaS Cash Flow Tracker" }],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "SaaS Cash Flow Tracker — Free Tool | AI Finance Ops",
    description: "Track and forecast SaaS cash flow in real time.",
    images: ["https://aifinanceops.app/og-image.png"],
  },
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is SaaS cash flow?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SaaS cash flow is the movement of money in and out of your business. Cash inflows include subscription revenue and one-time payments. Cash outflows include payroll, hosting, marketing, and operational expenses.",
      },
    },
    {
      "@type": "Question",
      name: "How do you forecast SaaS cash flow?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Project future inflows based on current MRR, growth rate, and churn. Project outflows based on fixed costs and variable costs. Net cash flow = Inflows - Outflows. AI Finance Ops does this automatically with 90-day P50/P80/P95 projections.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between cash flow and revenue?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Revenue is recognized when earned (accrual accounting). Cash flow is when money actually moves. A $12,000 annual contract paid upfront counts as $12,000 cash flow in month 1 but only $1,000/month in revenue.",
      },
    },
    {
      "@type": "Question",
      name: "What is burn rate in SaaS?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Burn rate is the rate at which you spend cash. Gross burn = total monthly expenses. Net burn = expenses minus revenue. Use net burn for accurate runway calculations.",
      },
    },
  ],
}

const faqItems = [
  {
    q: "What is SaaS cash flow?",
    a: "SaaS cash flow is the movement of money in and out of your business. Cash inflows include subscription revenue and one-time payments. Cash outflows include payroll, hosting, marketing, and operational expenses.",
  },
  {
    q: "How do you forecast SaaS cash flow?",
    a: "Project future inflows based on current MRR, growth rate, and churn. Project outflows based on fixed costs and variable costs. Net cash flow = Inflows - Outflows. AI Finance Ops does this automatically with 90-day P50/P80/P95 projections.",
  },
  {
    q: "What is the difference between cash flow and revenue?",
    a: "Revenue is recognized when earned (accrual accounting). Cash flow is when money actually moves. A $12,000 annual contract paid upfront counts as $12,000 cash flow in month 1 but only $1,000/month in revenue.",
  },
  {
    q: "What is burn rate in SaaS?",
    a: "Burn rate is the rate at which you spend cash. Gross burn = total monthly expenses. Net burn = expenses minus revenue. Use net burn for accurate runway calculations.",
  },
]

const metrics = [
  { icon: ArrowDownRight, label: "Gross Burn", desc: "Total monthly expenses before revenue. Includes payroll, hosting, marketing, rent, and all operational costs.", color: "text-red-400" },
  { icon: ArrowUpRight, label: "Net Burn", desc: "Gross burn minus revenue. The true rate at which you deplete cash reserves each month.", color: "text-amber-400" },
  { icon: Clock, label: "Cash Runway", desc: "Months of cash remaining at current burn rate. Formula: Cash Balance ÷ Net Burn = Runway in months.", color: "text-blue-400" },
  { icon: DollarSign, label: "Operating Cash Flow", desc: "Cash generated from core business operations. Positive OCF means your SaaS is self-sustaining.", color: "text-emerald-400" },
]

const benchmarks = [
  { stage: "Pre-Seed", runway: "12-18 months", burn: "$10k-$30k/mo", target: "Validate product-market fit" },
  { stage: "Seed", runway: "18-24 months", burn: "$30k-$80k/mo", reach: "$100k+ MRR" },
  { stage: "Series A", runway: "24-36 months", burn: "$80k-$250k/mo", reach: "$1M+ ARR" },
  { stage: "Series B+", runway: "36+ months", burn: "$250k+/mo", reach: "$5M+ ARR" },
]

export default function CashFlowTrackerPage() {
  return (
    <>
      <div className="min-h-screen bg-gray-950 text-gray-100">
        {/* Hero */}
        <section className="mx-auto max-w-5xl px-6 pt-32 pb-16 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold tracking-widest uppercase text-emerald-400 mb-6">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Free Tool
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-6">
            SaaS Cash Flow Tracker<br />
            <span className="text-emerald-400">& 90-Day Forecast</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
            Stop guessing your cash position. Track inflows, outflows, and get a 90-day{" "}
            <Link href="/blog/saas-cash-flow-forecast" className="text-emerald-400 hover:underline">
              SaaS cash flow projection
            </Link>{" "}
            — automatically.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-8 py-3 text-base font-medium text-white hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/25 hover:-translate-y-0.5"
            >
              Start tracking free
            </Link>
            <Link
              href="/runway-calculator"
              className="inline-flex items-center gap-2 rounded-full border border-gray-700 px-8 py-3 text-base font-medium text-gray-300 hover:border-emerald-500/50 hover:text-white transition-all"
            >
              Try Runway Calculator →
            </Link>
          </div>
        </section>

        {/* What is Cash Flow */}
        <section className="border-t border-gray-800 px-6 py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Why SaaS Cash Flow Tracking Matters
            </h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              Cash flow is the lifeblood of any SaaS business. Even profitable companies fail when they run out of cash.
              Tracking it alongside your{" "}
              <Link href="/mrr-tracker" className="text-emerald-400 hover:underline">MRR</Link>,{" "}
              <Link href="/churn-rate-calculator" className="text-emerald-400 hover:underline">churn rate</Link>, and{" "}
              <Link href="/runway-calculator" className="text-emerald-400 hover:underline">runway</Link>{" "}
              gives you the full financial picture.
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { icon: TrendingUp, label: "Cash In",   desc: "Subscription revenue, one-time payments",  color: "text-emerald-400" },
                { icon: BarChart2,  label: "Cash Out",  desc: "Payroll, infra, marketing, COGS",           color: "text-red-400" },
                { icon: AlertCircle,label: "Net Flow",  desc: "The number that determines your runway",   color: "text-amber-400" },
              ].map(({ icon: Icon, label, desc, color }) => (
                <div key={label} className="border border-gray-800 bg-gray-900/50 rounded-xl p-5">
                  <Icon className={`h-6 w-6 ${color} mb-3`} />
                  <div className="text-sm font-semibold text-white mb-1">{label}</div>
                  <div className="text-xs text-gray-500">{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="border-t border-gray-800 bg-gray-900/30 px-6 py-20">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
              Everything You Need to Manage SaaS Cash Flow
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: "Real-Time Cash Dashboard",
                  desc: "See exactly where your cash is going in real time. No more end-of-month surprises.",
                },
                {
                  title: "90-Day Forecast",
                  desc: "AI-powered projections based on your historical revenue and expense patterns.",
                },
                {
                  title: "Burn Rate Monitoring",
                  desc: "Track your monthly burn and get alerted when you're approaching dangerous territory.",
                },
                {
                  title: "Scenario Planning",
                  desc: "Model best-case, worst-case, and expected cash flow scenarios side by side.",
                },
              ].map((f) => (
                <div key={f.title} className="flex gap-4">
                  <Check className="h-5 w-5 text-emerald-500 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-sm font-semibold text-white mb-1">{f.title}</div>
                    <div className="text-sm text-gray-400">{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SaaS Cash Flow Formula */}
        <section className="border-t border-gray-800 px-6 py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              SaaS Cash Flow Formula
            </h2>
            <p className="text-gray-400 mb-8">
              Understanding this formula is the foundation of cash flow management for any SaaS business.
            </p>
            <div className="border border-gray-800 bg-gray-900/50 rounded-xl p-8 mb-8">
              <div className="text-2xl md:text-3xl font-bold text-emerald-400 tracking-wide">
                Net Cash Flow = Cash Inflows − Cash Outflows
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-6 text-left">
              <div className="border border-gray-800 bg-gray-900/50 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <ArrowUpRight className="h-5 w-5 text-emerald-400" />
                  <span className="text-sm font-semibold text-emerald-400">Cash Inflows</span>
                </div>
                <ul className="text-sm text-gray-400 space-y-2">
                  <li>• Monthly subscription revenue (MRR)</li>
                  <li>• Annual contract payments</li>
                  <li>• One-time setup fees</li>
                  <li>• Upsell and expansion revenue</li>
                </ul>
              </div>
              <div className="border border-gray-800 bg-gray-900/50 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <ArrowDownRight className="h-5 w-5 text-red-400" />
                  <span className="text-sm font-semibold text-red-400">Cash Outflows</span>
                </div>
                <ul className="text-sm text-gray-400 space-y-2">
                  <li>• Payroll and contractor payments</li>
                  <li>• Hosting and infrastructure</li>
                  <li>• Marketing and sales spend</li>
                  <li>• Operational expenses (rent, tools, legal)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Cash Flow vs Revenue */}
        <section className="border-t border-gray-800 bg-gray-900/30 px-6 py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Cash Flow vs Revenue: What&apos;s the Difference?
            </h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              Many SaaS founders confuse cash flow with revenue. They measure fundamentally different things.
              Revenue is recognized when earned under accrual accounting. Cash flow is when money actually moves
              in or out of your bank account.
            </p>
            <div className="border border-gray-800 bg-gray-900/50 rounded-xl p-6 mb-6">
              <div className="text-sm font-semibold text-white mb-3">Example: $12,000 Annual Contract</div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-gray-950/50 rounded-lg p-4">
                  <div className="text-xs text-gray-500 mb-1">Cash Flow</div>
                  <div className="text-lg font-bold text-emerald-400">$12,000</div>
                  <div className="text-xs text-gray-500">Received in Month 1</div>
                </div>
                <div className="bg-gray-950/50 rounded-lg p-4">
                  <div className="text-xs text-gray-500 mb-1">Monthly Revenue Recognition</div>
                  <div className="text-lg font-bold text-blue-400">$1,000</div>
                  <div className="text-xs text-gray-500">Recognized each month for 12 months</div>
                </div>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed">
              This is why cash flow forecasting matters — your bank balance tells a different story than your P&L.
              A SaaS company can be profitable on paper but still run out of cash if customers pay annually
              or on extended billing cycles. Track both metrics for a complete financial picture.
            </p>
          </div>
        </section>

        {/* Key Cash Flow Metrics */}
        <section className="border-t border-gray-800 px-6 py-20">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
              Key Cash Flow Metrics
            </h2>
            <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
              These four metrics are essential for understanding and managing your SaaS cash flow effectively.
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              {metrics.map(({ icon: Icon, label, desc, color }) => (
                <div key={label} className="border border-gray-800 bg-gray-900/50 rounded-xl p-6">
                  <Icon className={`h-6 w-6 ${color} mb-3`} />
                  <div className="text-sm font-semibold text-white mb-2">{label}</div>
                  <div className="text-sm text-gray-400 leading-relaxed">{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cash Flow Benchmarks */}
        <section className="border-t border-gray-800 bg-gray-900/30 px-6 py-20">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
              Cash Flow Benchmarks by Stage
            </h2>
            <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
              How much cash should you have at each stage? Use these benchmarks to gauge your financial health.
            </p>
            <div className="border border-gray-800 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-900/80">
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Stage</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Target Runway</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Typical Burn</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Target</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {benchmarks.map((row) => (
                      <tr key={row.stage} className="hover:bg-gray-900/30 transition-colors">
                        <td className="px-6 py-4 text-white font-medium">{row.stage}</td>
                        <td className="px-6 py-4 text-gray-300">{row.runway}</td>
                        <td className="px-6 py-4 text-gray-300">{row.burn}</td>
                        <td className="px-6 py-4 text-gray-400">{row.target ?? row.reach}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-gray-800 px-6 py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqItems.map(({ q, a }) => (
                <details key={q} className="group border border-gray-800 bg-gray-900/50 rounded-xl overflow-hidden">
                  <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer text-sm font-semibold text-white hover:text-emerald-400 transition-colors list-none">
                    {q}
                    <span className="text-gray-500 group-open:rotate-180 transition-transform shrink-0">
                      <Zap className="h-4 w-4" />
                    </span>
                  </summary>
                  <div className="px-6 pb-5 text-sm text-gray-400 leading-relaxed">
                    {a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-gray-800 px-6 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Know Your Cash Position. Always.</h2>
            <p className="text-gray-400 mb-8">
              Join hundreds of SaaS founders who use AI Finance Ops to track cash flow and avoid running out of runway.
              A smarter{" "}
              <Link href="/vs-baremetrics" className="text-emerald-400 hover:underline">Baremetrics alternative</Link>{" "}
              built for finance ops.
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
          exclude="/cash-flow-tracker"
          title="Related SaaS Finance Tools"
          limit={8}
        />
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  )
}
