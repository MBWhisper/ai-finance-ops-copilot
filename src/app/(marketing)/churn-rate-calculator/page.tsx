import type { Metadata } from "next"
import Link from "next/link"
import { OptimizedImage } from "@/components/OptimizedImage"
import { Check, TrendingDown, AlertTriangle, ChevronDown, Users, DollarSign } from "lucide-react"

export const metadata: Metadata = {
  title: "SaaS Churn Rate Calculator — Free Tool for Founders (2026)",
  description:
    "Calculate your SaaS churn rate instantly. Customer churn, revenue churn, net revenue churn — all explained with formulas. Free churn calculator. Connect Stripe to track churn automatically.",
  alternates: { canonical: "https://aifinanceops.app/churn-rate-calculator" },
  openGraph: {
    title: "SaaS Churn Rate Calculator — Free Tool for Founders (2026)",
    description:
      "Calculate your SaaS churn rate instantly. Free churn calculator — customer churn, revenue churn, net revenue churn.",
    url: "https://aifinanceops.app/churn-rate-calculator",
    siteName: "AI Finance Ops",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "AI Finance Ops Churn Rate Calculator" }],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "SaaS Churn Rate Calculator — Free (2026)",
    description: "Calculate customer churn, revenue churn, and net revenue churn. Free tool for SaaS founders.",
    images: ["/og-image.png"],
  },
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do you calculate SaaS churn rate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Customer Churn Rate = (Customers lost in period / Customers at start of period) x 100. For example, if you started the month with 200 customers and lost 10, your monthly churn rate is 5%. Revenue churn is calculated the same way but uses MRR instead of customer count.",
      },
    },
    {
      "@type": "Question",
      name: "What is a good churn rate for SaaS?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For B2B SaaS, a monthly churn rate below 2% is considered good (under 22% annually). Best-in-class SaaS companies achieve below 0.5% monthly churn. For B2C SaaS, 3-5% monthly is more typical. Annual churn below 5-7% is considered excellent for enterprise-focused SaaS.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between customer churn and revenue churn?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Customer churn measures the percentage of customers who cancel. Revenue churn (or MRR churn) measures the percentage of revenue lost from cancellations and downgrades. Net revenue churn subtracts expansion MRR from churned MRR -- a negative net revenue churn means your existing customers are growing faster than you are losing revenue.",
      },
    },
    {
      "@type": "Question",
      name: "What is negative churn and why does it matter?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Negative churn (also called negative net revenue churn) happens when expansion MRR from existing customers exceeds the MRR lost to cancellations and downgrades. It is the most powerful growth mechanism in SaaS -- your revenue base grows even without acquiring new customers.",
      },
    },
    {
      "@type": "Question",
      name: "How do I reduce churn in my SaaS?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The most effective churn reduction strategies are: (1) improve onboarding so users reach their aha moment faster, (2) identify at-risk customers early using usage data and trigger proactive outreach, (3) add annual billing discounts to lock in revenue, (4) build expansion revenue through upsells. AI Finance Ops identifies at-risk customers automatically using Stripe data.",
      },
    },
    {
      "@type": "Question",
      name: "Is AI Finance Ops churn tracking free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. AI Finance Ops offers a free plan with automatic churn tracking from Stripe. It calculates customer churn, revenue churn, and net revenue churn in real time. Paid plans add cohort churn analysis, at-risk customer alerts, and churn prediction.",
      },
    },
  ],
}

const CHURN_TYPES = [
  {
    icon: Users,
    label: "Customer Churn Rate",
    formula: "Customers lost ÷ Customers at start",
    desc: "Percentage of customers who cancel in a given period",
    color: "text-red-400",
    example: "10 lost / 200 start = 5% monthly churn",
  },
  {
    icon: DollarSign,
    label: "Revenue Churn Rate",
    formula: "MRR lost ÷ MRR at start",
    desc: "Percentage of revenue lost from cancellations and downgrades",
    color: "text-amber-400",
    example: "$500 lost / $10,000 MRR = 5% revenue churn",
  },
  {
    icon: TrendingDown,
    label: "Net Revenue Churn",
    formula: "(MRR lost − Expansion MRR) ÷ MRR at start",
    desc: "Revenue churn minus expansion from existing customers. Can be negative.",
    color: "text-emerald-400",
    example: "($500 lost − $800 expansion) / $10,000 = −3% (negative churn)",
  },
]

const BENCHMARKS = [
  { segment: "Enterprise B2B SaaS", monthly: "< 0.5%", annual: "< 6%", status: "excellent" },
  { segment: "Mid-market B2B SaaS", monthly: "0.5–2%", annual: "6–22%", status: "good" },
  { segment: "SMB B2B SaaS", monthly: "2–5%", annual: "22–46%", status: "average" },
  { segment: "B2C SaaS", monthly: "3–8%", annual: "30–65%", status: "typical" },
]

const FAQS = [
  {
    q: "How do you calculate SaaS churn rate?",
    a: "Customer Churn Rate = (Customers lost ÷ Customers at start of period) × 100. Revenue Churn Rate = (MRR lost ÷ MRR at start) × 100. Net Revenue Churn = ((MRR lost − Expansion MRR) ÷ MRR at start) × 100.",
  },
  {
    q: "What is a good monthly churn rate for SaaS?",
    a: "Below 2% monthly churn is good for B2B SaaS. Best-in-class is below 0.5% monthly. B2C SaaS typically runs 3-8% monthly. The most important benchmark is your own trend — churn should be declining over time.",
  },
  {
    q: "What is negative churn?",
    a: "Negative net revenue churn means expansion MRR from existing customers exceeds lost MRR. For example, if you lose $500 in MRR from cancellations but gain $800 from upgrades, your net revenue churn is −3%. This is the holy grail of SaaS growth.",
  },
  {
    q: "What is the difference between customer churn and revenue churn?",
    a: "Customer churn tracks the count of cancelled subscriptions. Revenue churn tracks the MRR lost. A large customer churning has minimal impact on customer churn % but massive impact on revenue churn. Always track both.",
  },
  {
    q: "How does AI Finance Ops track churn?",
    a: "AI Finance Ops connects to Stripe via OAuth and automatically calculates all three churn metrics in real time. It sends alerts when churn spikes and identifies at-risk customers before they cancel. Free to start, no credit card required.",
  },
]

export default function ChurnRateCalculatorPage() {
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
            SaaS Churn Rate Calculator<br />
            <span className="text-emerald-400">Track Every Type of Churn</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-4">
            Calculate customer churn, revenue churn, and net revenue churn automatically.
            AI Finance Ops connects to Stripe and tracks every churn metric in real time — no spreadsheets.
          </p>
          <p className="text-sm text-gray-500 max-w-xl mx-auto mb-8">
            Customer Churn · Revenue Churn · Net Revenue Churn · Churn Alerts · At-Risk Customers
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-8 py-3 text-base font-medium text-white hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/25 hover:-translate-y-0.5"
            >
              Track churn free — no credit card
            </Link>
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 rounded-full border border-gray-700 px-8 py-3 text-base font-medium text-gray-300 hover:border-gray-500 hover:text-white transition-all hover:-translate-y-0.5"
            >
              See demo
            </Link>
          </div>
          <OptimizedImage
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=630&fit=crop"
            alt="SaaS churn rate dashboard showing customer and revenue churn metrics"
            className="w-full max-w-4xl mx-auto mt-12 rounded-xl aspect-video object-cover shadow-2xl"
            width={1200}
            height={630}
          />
        </section>

        {/* 3 Types */}
        <section className="border-t border-gray-800 px-6 py-20">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
              The 3 Churn Metrics Every SaaS Founder Must Track
            </h2>
            <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
              Most founders only track customer churn. But revenue churn and net revenue churn tell a completely
              different story about your business health.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {CHURN_TYPES.map((c) => (
                <div key={c.label} className="border border-gray-800 bg-gray-900/50 rounded-xl p-6 hover:border-gray-700 transition-colors">
                  <c.icon className={`h-8 w-8 mb-4 ${c.color}`} />
                  <div className="text-base font-semibold text-white mb-1">{c.label}</div>
                  <div className="text-xs text-gray-500 mb-3">{c.desc}</div>
                  <div className="bg-gray-900 rounded-lg p-3 font-mono text-xs text-emerald-400 mb-3">{c.formula}</div>
                  <div className="text-xs text-gray-600 italic">{c.example}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benchmarks */}
        <section className="border-t border-gray-800 bg-gray-900/30 px-6 py-20">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-white mb-4">SaaS Churn Rate Benchmarks (2026)</h2>
            <p className="text-gray-400 mb-10">
              How does your churn compare? Here are the industry benchmarks by segment. If your churn is
              above these ranges, reducing it is the highest-leverage thing you can do for growth.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Segment</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Monthly Churn</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Annual Churn</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {BENCHMARKS.map((b) => (
                    <tr key={b.segment} className="border-b border-gray-800/50 hover:bg-gray-900/50">
                      <td className="py-3 px-4 text-white font-medium">{b.segment}</td>
                      <td className="py-3 px-4 text-gray-300">{b.monthly}</td>
                      <td className="py-3 px-4 text-gray-300">{b.annual}</td>
                      <td className="py-3 px-4">
                        <span className="text-xs px-2 py-0.5 rounded-full bg-gray-800 text-gray-400">{b.status}</span>
                      </td>
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
              <h2 className="text-3xl font-bold text-white mb-6">Why Manual Churn Tracking Fails</h2>
              <p className="text-gray-400 leading-relaxed mb-8">
                By the time you notice churn in a spreadsheet, it is already too late to act.
                Churn needs to be tracked in real time so you can intervene before customers cancel.
              </p>
              <div className="space-y-5">
                {[
                  { title: "Lagging indicators", desc: "Spreadsheets show you churn after it happened — not while it is happening" },
                  { title: "No at-risk signals", desc: "You cannot identify at-risk customers before they cancel using static data" },
                  { title: "Revenue impact is invisible", desc: "Customer count hides the real revenue impact of high-value cancellations" },
                  { title: "No cohort visibility", desc: "You cannot see which acquisition cohorts churn fastest without automated tracking" },
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
                  "Real-time customer and revenue churn tracking",
                  "Net revenue churn calculated automatically",
                  "Churn spike alerts via email",
                  "At-risk customer identification from Stripe data",
                  "Cohort churn analysis — 12 months back",
                  "Investor-ready churn reports in one click",
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
                <div className="text-xs text-gray-500">Connect Stripe → get your churn dashboard</div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-gray-800 px-6 py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold text-white mb-10 text-center">Churn Rate — Frequently Asked Questions</h2>
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
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Stop losing customers without knowing why</h2>
            <p className="text-gray-400 mb-8">
              Connect Stripe and get your complete churn dashboard in under 2 minutes.
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
