import type { Metadata } from "next"
import Link from "next/link"
import { OptimizedImage } from "@/components/OptimizedImage"
import { Check, TrendingUp, ChevronDown, BarChart3, DollarSign } from "lucide-react"

export const metadata: Metadata = {
  title: "ARR Calculator — Annual Recurring Revenue Formula for SaaS (2026)",
  description:
    "Calculate Annual Recurring Revenue (ARR) for your SaaS. Free ARR calculator with ARR formula, ARR vs MRR explained, and benchmarks. Connect Stripe for automatic ARR tracking.",
  alternates: { canonical: "https://aifinanceops.app/arr-calculator" },
  openGraph: {
    title: "ARR Calculator — Annual Recurring Revenue Formula for SaaS (2026)",
    description: "Calculate ARR automatically from Stripe. ARR formula, ARR vs MRR, growth benchmarks — all explained.",
    url: "https://aifinanceops.app/arr-calculator",
    siteName: "AI Finance Ops",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "AI Finance Ops ARR Calculator" }],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "ARR Calculator — Free SaaS Tool (2026)",
    description: "Calculate Annual Recurring Revenue from Stripe automatically. Free ARR calculator for SaaS founders.",
    images: ["/og-image.png"],
  },
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do you calculate ARR for SaaS?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ARR (Annual Recurring Revenue) = MRR x 12. For annual contracts, ARR = sum of all annual contract values. For mixed billing (monthly + annual), normalize everything to monthly first: monthly subscribers contribute monthly fee x 12, annual subscribers contribute the full contract value. Then sum all normalized values.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between ARR and MRR?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "MRR (Monthly Recurring Revenue) is the monthly snapshot of predictable revenue. ARR = MRR x 12. Use MRR for tracking month-to-month growth momentum and operational decisions. Use ARR for investor reporting, annual planning, and enterprise sales conversations. Both measure the same underlying business — just at different time scales.",
      },
    },
    {
      "@type": "Question",
      name: "What is a good ARR growth rate for SaaS?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Early-stage SaaS (under $1M ARR) should target 2-3x growth annually (100-200%). At $1M-$10M ARR, 100% growth is strong. At $10M+ ARR, 50-80% is considered excellent. The T2D3 rule (triple, triple, double, double, double) sets a benchmark of tripling ARR for two years then doubling for three years to reach $100M ARR.",
      },
    },
    {
      "@type": "Question",
      name: "What is ARR used for?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ARR is primarily used for: (1) investor reporting and fundraising conversations, (2) company valuation (SaaS companies are often valued at 5-15x ARR), (3) annual planning and budgeting, (4) enterprise sales — enterprise buyers think annually, (5) comparing growth against benchmarks like T2D3.",
      },
    },
    {
      "@type": "Question",
      name: "How does AI Finance Ops calculate ARR?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "AI Finance Ops connects to Stripe via OAuth and automatically normalizes all subscription billing to calculate both MRR and ARR in real time. Monthly, annual, and multi-year plans are all handled automatically — no manual calculations.",
      },
    },
  ],
}

const ARR_FORMULAS = [
  {
    icon: DollarSign,
    label: "ARR from MRR",
    formula: "ARR = MRR × 12",
    desc: "When all customers are on monthly billing",
    color: "text-emerald-400",
    example: "$10,000 MRR × 12 = $120,000 ARR",
  },
  {
    icon: BarChart3,
    label: "ARR from Annual Contracts",
    formula: "ARR = Sum of all annual contract values",
    desc: "When all customers are on annual billing",
    color: "text-blue-400",
    example: "10 customers × $12,000/yr = $120,000 ARR",
  },
  {
    icon: TrendingUp,
    label: "ARR Mixed Billing",
    formula: "ARR = (Monthly MRR + Annual ACV) normalized",
    desc: "Monthly subscribers × 12 + annual contract values",
    color: "text-purple-400",
    example: "$5,000 MRR×12 + $60,000 annual = $120,000 ARR",
  },
]

const ARR_MILESTONES = [
  { arr: "$100K ARR", meaning: "Ramen profitability. First proof of demand. Target for pre-seed.", stage: "Pre-seed" },
  { arr: "$1M ARR", meaning: "Strong product-market fit signal. Seed-stage fundraising benchmark.", stage: "Seed" },
  { arr: "$3M ARR", meaning: "Series A territory. Team of 10-15. Repeatable sales motion.", stage: "Series A" },
  { arr: "$10M ARR", meaning: "Series B range. Multi-product or expansion play beginning.", stage: "Series B" },
  { arr: "$100M ARR", meaning: "T2D3 end goal. Pre-IPO scale. Category leader.", stage: "Late Stage" },
]

const FAQS = [
  {
    q: "How do you calculate ARR?",
    a: "ARR = MRR × 12 for monthly billing. For annual contracts, sum all annual contract values. For mixed billing, normalize monthly subscriptions to annual (monthly fee × 12) and add all annual contract values. AI Finance Ops does this automatically from Stripe.",
  },
  {
    q: "What is the difference between ARR and MRR?",
    a: "MRR is your monthly recurring revenue snapshot — use it for operational decisions and month-to-month tracking. ARR = MRR × 12 — use it for investor reporting, annual planning, and enterprise sales. Both measure the same business at different time scales.",
  },
  {
    q: "What is a good ARR growth rate?",
    a: "Under $1M ARR: target 2-3x annually (100-200% growth). $1M-$10M ARR: 100% is strong. $10M+ ARR: 50-80% is excellent. The T2D3 benchmark: triple, triple, double, double, double to reach $100M ARR.",
  },
  {
    q: "What valuation multiple is used for ARR?",
    a: "SaaS companies are commonly valued at 5-15x ARR, depending on growth rate, churn, and margins. High-growth companies (100%+ YoY) command 10-20x. Slower growth (under 50%) typically gets 3-6x. These multiples shift with market conditions.",
  },
  {
    q: "Does AI Finance Ops track ARR automatically?",
    a: "Yes. Connect Stripe via OAuth in 2 minutes and AI Finance Ops calculates both MRR and ARR automatically — handling monthly, annual, and mixed billing plans. No manual calculations.",
  },
]

export default function ArrCalculatorPage() {
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
            ARR Calculator<br />
            <span className="text-emerald-400">Annual Recurring Revenue for SaaS</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-4">
            Calculate Annual Recurring Revenue automatically from Stripe.
            AI Finance Ops tracks ARR, MRR, growth rate, and every component in real time — no spreadsheets.
          </p>
          <p className="text-sm text-gray-500 max-w-xl mx-auto mb-8">
            ARR Formula · ARR vs MRR · T2D3 Benchmarks · Investor Reporting · Mixed Billing
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-8 py-3 text-base font-medium text-white hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/25 hover:-translate-y-0.5"
            >
              Track ARR free — no credit card
            </Link>
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 rounded-full border border-gray-700 px-8 py-3 text-base font-medium text-gray-300 hover:border-gray-500 hover:text-white transition-all hover:-translate-y-0.5"
            >
              See demo
            </Link>
          </div>
          <OptimizedImage
            src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=630&fit=crop"
            alt="ARR calculator dashboard showing annual recurring revenue growth chart"
            className="w-full max-w-4xl mx-auto mt-12 rounded-xl aspect-video object-cover shadow-2xl"
            width={1200}
            height={630}
          />
        </section>

        {/* Formulas */}
        <section className="border-t border-gray-800 px-6 py-20">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">ARR Calculation Methods</h2>
            <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
              ARR is calculated differently depending on your billing model. Here are the three scenarios.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {ARR_FORMULAS.map((f) => (
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

        {/* ARR vs MRR */}
        <section className="border-t border-gray-800 px-6 py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold text-white mb-6">ARR vs MRR — When to Use Each</h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              MRR and ARR measure the same underlying business — just at different time scales.
              The rule of thumb: <strong className="text-white">use MRR for operations, use ARR for strategy and investors.</strong>
            </p>
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
                <div className="text-emerald-400 font-semibold text-sm mb-3">Use MRR for:</div>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />Month-to-month growth tracking</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />Churn monitoring and alerts</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />Cash flow forecasting</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />Marketing and sales decisions</li>
                </ul>
              </div>
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
                <div className="text-blue-400 font-semibold text-sm mb-3">Use ARR for:</div>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-blue-400 mt-0.5 shrink-0" />Investor updates and fundraising</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-blue-400 mt-0.5 shrink-0" />Company valuation discussions</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-blue-400 mt-0.5 shrink-0" />Annual planning and budgeting</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-blue-400 mt-0.5 shrink-0" />Enterprise sales conversations</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ARR Milestones */}
        <section className="border-t border-gray-800 bg-gray-900/30 px-6 py-20">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-white mb-4">SaaS ARR Milestones That Matter</h2>
            <p className="text-gray-400 mb-10">Each ARR milestone unlocks a new stage of funding, hiring, and product strategy.</p>
            <div className="space-y-3">
              {ARR_MILESTONES.map((m) => (
                <div key={m.arr} className="flex items-start gap-4 border border-gray-800 bg-gray-900/50 rounded-xl p-5 hover:border-gray-700 transition-colors">
                  <div className="shrink-0 text-right w-28">
                    <div className="text-base font-bold text-emerald-400">{m.arr}</div>
                    <div className="text-xs text-gray-600 mt-0.5">{m.stage}</div>
                  </div>
                  <div className="h-full w-px bg-gray-800 shrink-0" />
                  <div className="text-sm text-gray-400 leading-relaxed">{m.meaning}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Tools */}
        <section className="border-t border-gray-800 px-6 py-16">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-xl font-bold text-white mb-6 text-center">Related SaaS calculators</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { href: "/mrr-tracker", label: "MRR Tracker", desc: "Monthly Recurring Revenue — all 5 components" },
                { href: "/churn-rate-calculator", label: "Churn Calculator", desc: "Customer churn, revenue churn, net churn" },
                { href: "/ltv-calculator", label: "LTV Calculator", desc: "Customer Lifetime Value + LTV:CAC ratio" },
              ].map((l) => (
                <Link key={l.href} href={l.href} className="rounded-xl border border-gray-800 bg-gray-900/50 p-5 hover:border-emerald-500/40 hover:bg-emerald-500/5 transition-all group">
                  <div className="text-sm font-semibold text-white mb-1 group-hover:text-emerald-400 transition-colors">{l.label}</div>
                  <div className="text-xs text-gray-500">{l.desc}</div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-gray-800 px-6 py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold text-white mb-10 text-center">ARR Calculator — Frequently Asked Questions</h2>
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
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Track ARR automatically from Stripe</h2>
            <p className="text-gray-400 mb-8">
              Connect Stripe and get your ARR dashboard in under 2 minutes. Free to start — no credit card required.
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
