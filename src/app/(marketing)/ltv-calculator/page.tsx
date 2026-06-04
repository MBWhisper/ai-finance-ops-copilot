import type { Metadata } from "next"
import Link from "next/link"
import { OptimizedImage } from "@/components/OptimizedImage"
import { Check, TrendingUp, AlertTriangle, ChevronDown, Calculator, BarChart3 } from "lucide-react"

export const metadata: Metadata = {
  title: "SaaS LTV Calculator — Customer Lifetime Value Formula (2026)",
  description:
    "Calculate Customer Lifetime Value (LTV) for your SaaS. Free LTV calculator with LTV:CAC ratio, payback period, and cohort LTV. Connect Stripe for automatic LTV tracking.",
  alternates: { canonical: "https://aifinanceops.app/ltv-calculator" },
  openGraph: {
    title: "SaaS LTV Calculator — Customer Lifetime Value Formula (2026)",
    description:
      "Calculate LTV for your SaaS automatically. LTV formula, LTV:CAC ratio, payback period — all tracked from Stripe.",
    url: "https://aifinanceops.app/ltv-calculator",
    siteName: "AI Finance Ops",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "AI Finance Ops LTV Calculator" }],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "SaaS LTV Calculator — Free Tool (2026)",
    description: "Calculate Customer Lifetime Value for your SaaS. Free LTV calculator with LTV:CAC ratio and payback period.",
    images: ["/og-image.png"],
  },
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do you calculate LTV for SaaS?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The basic SaaS LTV formula is: LTV = Average Revenue Per User (ARPU) divided by Churn Rate. For example, if your ARPU is $100/month and your monthly churn rate is 2%, your LTV is $5,000. A more precise formula is: LTV = ARPU x Gross Margin % / Churn Rate.",
      },
    },
    {
      "@type": "Question",
      name: "What is a good LTV:CAC ratio for SaaS?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The benchmark LTV:CAC ratio for SaaS is 3:1 or higher. A ratio below 3:1 means you are spending too much to acquire customers relative to what they are worth. A ratio above 5:1 may mean you are underinvesting in growth. Most investors expect at least 3:1 before funding.",
      },
    },
    {
      "@type": "Question",
      name: "What is CAC payback period?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "CAC Payback Period = CAC / (ARPU x Gross Margin %). It is the number of months until you recover your customer acquisition cost. Best-in-class SaaS achieves under 12 months. Above 24 months is a significant cash flow risk.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between LTV and CLV?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "LTV (Lifetime Value) and CLV (Customer Lifetime Value) are the same metric used interchangeably. Both measure the total revenue a business can expect from a single customer account over their entire relationship.",
      },
    },
    {
      "@type": "Question",
      name: "How do I increase LTV in my SaaS?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The three levers to increase LTV are: (1) reduce churn — even a 1% reduction in monthly churn dramatically increases LTV, (2) increase ARPU through upsells and expansion revenue, (3) improve gross margins by optimizing infrastructure costs. AI Finance Ops tracks all three automatically.",
      },
    },
    {
      "@type": "Question",
      name: "Is AI Finance Ops LTV tracking free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The free plan includes automatic LTV calculation from Stripe data, LTV:CAC ratio tracking, and payback period monitoring. Paid plans add cohort LTV analysis and LTV forecasting.",
      },
    },
  ],
}

const LTV_FORMULAS = [
  {
    icon: Calculator,
    label: "Basic LTV",
    formula: "ARPU ÷ Monthly Churn Rate",
    desc: "Simple formula using average revenue and churn",
    color: "text-emerald-400",
    example: "$100 ARPU ÷ 2% churn = $5,000 LTV",
  },
  {
    icon: BarChart3,
    label: "Gross Margin LTV",
    formula: "(ARPU × Gross Margin%) ÷ Churn Rate",
    desc: "More accurate — accounts for cost of revenue",
    color: "text-blue-400",
    example: "($100 × 80%) ÷ 2% = $4,000 LTV",
  },
  {
    icon: TrendingUp,
    label: "LTV:CAC Ratio",
    formula: "LTV ÷ Customer Acquisition Cost",
    desc: "The most important unit economics ratio in SaaS",
    color: "text-purple-400",
    example: "$4,000 LTV ÷ $800 CAC = 5:1 ratio",
  },
]

const LTV_BENCHMARKS = [
  { metric: "LTV:CAC Ratio", poor: "< 1:1", average: "1:1 – 3:1", good: "> 3:1", excellent: "> 5:1" },
  { metric: "CAC Payback Period", poor: "> 36 months", average: "18–36 months", good: "12–18 months", excellent: "< 12 months" },
  { metric: "Gross Margin", poor: "< 50%", average: "50–65%", good: "65–80%", excellent: "> 80%" },
]

const FAQS = [
  {
    q: "How do you calculate LTV for SaaS?",
    a: "Basic LTV = ARPU ÷ Monthly Churn Rate. Gross Margin LTV = (ARPU × Gross Margin%) ÷ Churn Rate. Example: $100 ARPU, 80% gross margin, 2% monthly churn = $4,000 LTV. AI Finance Ops calculates this automatically from your Stripe data.",
  },
  {
    q: "What is a good LTV:CAC ratio?",
    a: "3:1 is the minimum benchmark investors expect. Below 3:1 means your unit economics are broken. Above 5:1 is excellent — but may indicate you are underinvesting in growth. Most great SaaS companies run 4:1 to 7:1.",
  },
  {
    q: "What is CAC payback period and why does it matter?",
    a: "CAC Payback = CAC ÷ (Monthly ARPU × Gross Margin%). It is how many months until you recover what you spent to acquire a customer. Under 12 months is excellent. Over 24 months is a serious cash flow risk — you need capital to fund growth.",
  },
  {
    q: "How do I increase my SaaS LTV?",
    a: "Three levers: (1) reduce monthly churn — going from 3% to 2% churn increases LTV by 50%, (2) grow ARPU through expansion revenue and upsells, (3) improve gross margins by optimizing your infrastructure and support costs.",
  },
  {
    q: "What is the difference between LTV and CLV?",
    a: "LTV and CLV (Customer Lifetime Value) are identical metrics. Both measure total expected revenue from a single customer over their entire relationship with your business.",
  },
]

export default function LtvCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="min-h-screen bg-gray-950 text-gray-100">
        {/* Hero */}
        <section className="mx-auto max-w-5xl px-6 pt-32 pb-16 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold tracking-widest uppercase text-emerald-400 mb-6">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Free Tool
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-6">
            SaaS LTV Calculator<br />
            <span className="text-emerald-400">Customer Lifetime Value Formula</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-4">
            Calculate your Customer Lifetime Value automatically. AI Finance Ops connects to Stripe and
            tracks LTV, LTV:CAC ratio, and payback period in real time — for every customer segment.
          </p>
          <p className="text-sm text-gray-500 max-w-xl mx-auto mb-8">
            Basic LTV · Gross Margin LTV · LTV:CAC Ratio · CAC Payback Period · Cohort LTV
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-8 py-3 text-base font-medium text-white hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/25 hover:-translate-y-0.5"
            >
              Calculate LTV free — no credit card
            </Link>
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 rounded-full border border-gray-700 px-8 py-3 text-base font-medium text-gray-300 hover:border-gray-500 hover:text-white transition-all hover:-translate-y-0.5"
            >
              See demo
            </Link>
          </div>
          <OptimizedImage
            src="https://images.unsplash.com/photo-1579621970795-87facc2f976d?w=1200&h=630&fit=crop"
            alt="SaaS LTV calculator showing customer lifetime value and LTV to CAC ratio dashboard"
            className="w-full max-w-4xl mx-auto mt-12 rounded-xl aspect-video object-cover shadow-2xl"
            width={1200}
            height={630}
          />
        </section>

        {/* Formulas */}
        <section className="border-t border-gray-800 px-6 py-20">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
              LTV Formulas for SaaS
            </h2>
            <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
              There are three LTV calculations every SaaS founder needs to know. Each tells a different
              story about your unit economics.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {LTV_FORMULAS.map((f) => (
                <div key={f.label} className="border border-gray-800 bg-gray-900/50 rounded-xl p-6 hover:border-gray-700 transition-colors">
                  <f.icon className={`h-8 w-8 mb-4 ${f.color}`} />
                  <div className="text-base font-semibold text-white mb-1">{f.label}</div>
                  <div className="text-xs text-gray-500 mb-3">{f.desc}</div>
                  <div className="bg-gray-900 rounded-lg p-3 font-mono text-xs text-emerald-400 mb-3">{f.formula}</div>
                  <div className="text-xs text-gray-600 italic">{f.example}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* LTV Explained */}
        <section className="border-t border-gray-800 px-6 py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold text-white mb-6">What is Customer Lifetime Value (LTV)?</h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              Customer Lifetime Value (LTV or CLV) is the total revenue you can expect from a single
              customer over their entire relationship with your SaaS. It is the counterpart to CAC
              (Customer Acquisition Cost) — together they define whether your business model is viable.
            </p>
            <p className="text-gray-400 leading-relaxed mb-4">
              The fundamental rule: <strong className="text-white">LTV must be at least 3x your CAC</strong>.
              If it costs you $300 to acquire a customer who generates $300 in lifetime revenue,
              you have no margin for the business to function.
            </p>
            <p className="text-gray-400 leading-relaxed mb-8">
              LTV is directly controlled by two things: your ARPU and your churn rate.
              Reducing churn from 3% to 2% monthly increases LTV by 50% — with zero new customers acquired.
              This is why churn reduction is the highest-leverage growth activity for most SaaS businesses.
            </p>
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <div className="text-emerald-400 mb-4 text-xs font-semibold uppercase tracking-widest">LTV sensitivity to churn</div>
              <div className="space-y-2 text-sm font-mono">
                <div className="flex justify-between">
                  <span className="text-gray-400">$100 ARPU, 5% monthly churn</span>
                  <span className="text-white">LTV = $2,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">$100 ARPU, 3% monthly churn</span>
                  <span className="text-emerald-400">LTV = $3,333 (+67%)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">$100 ARPU, 2% monthly churn</span>
                  <span className="text-emerald-400">LTV = $5,000 (+150%)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">$100 ARPU, 1% monthly churn</span>
                  <span className="text-emerald-400">LTV = $10,000 (+400%)</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benchmarks */}
        <section className="border-t border-gray-800 bg-gray-900/30 px-6 py-20">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-white mb-4">SaaS Unit Economics Benchmarks</h2>
            <p className="text-gray-400 mb-10">How your LTV:CAC ratio and payback period compare to industry standards.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Metric</th>
                    <th className="text-left py-3 px-4 text-red-400/70 font-medium">Poor</th>
                    <th className="text-left py-3 px-4 text-amber-400/70 font-medium">Average</th>
                    <th className="text-left py-3 px-4 text-blue-400/70 font-medium">Good</th>
                    <th className="text-left py-3 px-4 text-emerald-400/70 font-medium">Excellent</th>
                  </tr>
                </thead>
                <tbody>
                  {LTV_BENCHMARKS.map((b) => (
                    <tr key={b.metric} className="border-b border-gray-800/50 hover:bg-gray-900/50">
                      <td className="py-3 px-4 text-white font-medium">{b.metric}</td>
                      <td className="py-3 px-4 text-red-400/70">{b.poor}</td>
                      <td className="py-3 px-4 text-amber-400/70">{b.average}</td>
                      <td className="py-3 px-4 text-blue-400/70">{b.good}</td>
                      <td className="py-3 px-4 text-emerald-400">{b.excellent}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Why AI Finance Ops */}
        <section className="border-t border-gray-800 px-6 py-20">
          <div className="mx-auto max-w-5xl grid md:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Why Spreadsheet LTV Calculations Are Wrong</h2>
              <p className="text-gray-400 leading-relaxed mb-8">
                LTV calculated in a spreadsheet is a static number. Real LTV changes every month as churn,
                ARPU, and gross margins shift. You need live data to make decisions.
              </p>
              <div className="space-y-5">
                {[
                  { title: "Static calculations go stale", desc: "LTV in a spreadsheet is outdated the moment you close it" },
                  { title: "No segment breakdown", desc: "You cannot see LTV by plan, cohort, or acquisition channel without automation" },
                  { title: "CAC comparison is manual", desc: "Calculating LTV:CAC ratio requires syncing data from multiple tools every time" },
                  { title: "No payback period tracking", desc: "Payback period changes as ARPU and gross margins shift — spreadsheets miss this" },
                ].map((r) => (
                  <div key={r.title} className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 shrink-0" />
                    <div>
                      <div className="text-sm font-medium text-white">{r.title}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{r.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="border border-emerald-500/30 bg-emerald-500/5 rounded-2xl p-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="h-3 w-3 rounded-full bg-emerald-500" />
                <span className="text-xs font-semibold tracking-widest uppercase text-emerald-400">AI Finance Ops</span>
              </div>
              <ul className="space-y-3">
                {[
                  "Automatic LTV calculation from Stripe data",
                  "LTV:CAC ratio tracked in real time",
                  "CAC payback period monitoring",
                  "LTV by plan, cohort, and channel",
                  "LTV trend charts going back 12 months",
                  "Investor-ready unit economics reports",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-gray-300">
                    <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-6 border-t border-emerald-500/20">
                <div className="text-xs text-gray-500 mb-1">Setup time</div>
                <div className="text-2xl font-bold text-white">Under 2 minutes</div>
                <div className="text-xs text-gray-500">Connect Stripe → get your LTV dashboard</div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-gray-800 px-6 py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold text-white mb-10 text-center">LTV Calculator — Frequently Asked Questions</h2>
            <div className="space-y-4">
              {FAQS.map((faq) => (
                <details key={faq.q} className="group border border-gray-800 rounded-xl bg-gray-900/50">
                  <summary className="flex items-center justify-between px-6 py-4 cursor-pointer list-none">
                    <span className="text-sm font-medium text-white">{faq.q}</span>
                    <ChevronDown className="h-4 w-4 text-gray-500 group-open:rotate-180 transition-transform shrink-0 ml-4" />
                  </summary>
                  <div className="px-6 pb-4 text-sm text-gray-400 leading-relaxed">{faq.a}</div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-gray-800 px-6 py-20 text-center">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Know your LTV:CAC ratio in 2 minutes</h2>
            <p className="text-gray-400 mb-8">
              Connect Stripe and get your complete unit economics dashboard immediately.
              Free to start — no credit card required.
            </p>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-8 py-3 text-base font-medium text-white hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/25 hover:-translate-y-0.5"
            >
              Try AI Finance Ops free
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}
