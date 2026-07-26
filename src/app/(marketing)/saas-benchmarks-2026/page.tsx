import type { Metadata } from "next"
import Link from "next/link"
import { InternalLinks } from "@/components/InternalLinks"
import { Check, TrendingUp, DollarSign, Users, BarChart3 } from "lucide-react"

export const metadata: Metadata = {
  title: "SaaS Benchmarks 2026: Key Metrics Every Founder Should Know",
  description:
    "Complete SaaS benchmarks for 2026: MRR growth rates, churn benchmarks, LTV:CAC ratios, burn rate, and runway targets by stage. Data-driven guide for SaaS founders.",
  alternates: { canonical: "https://aifinanceops.app/saas-benchmarks-2026" },
  openGraph: {
    title: "SaaS Benchmarks 2026: Key Metrics Every Founder Should Know",
    description:
      "Complete SaaS benchmarks for 2026: MRR growth, churn, LTV:CAC, burn rate, and runway targets by stage.",
    url: "https://aifinanceops.app/saas-benchmarks-2026",
    siteName: "AI Finance Ops",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SaaS Benchmarks 2026 — Key Metrics Every Founder Should Know",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "SaaS Benchmarks 2026: Key Metrics Every Founder Should Know",
    description:
      "Complete SaaS benchmarks for 2026: MRR growth, churn, LTV:CAC, burn rate, and runway targets by stage.",
    images: ["/og-image.png"],
  },
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is a good MRR growth rate for SaaS?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "MRR growth benchmarks vary by stage. Pre-seed startups should target 15–20% month-over-month growth. Seed stage companies should aim for 10–15% MoM. Series A startups should target 5–10% MoM. Growth-stage companies above $1M ARR typically see 3–7% MoM.",
      },
    },
    {
      "@type": "Question",
      name: "What is a good churn rate for SaaS?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A good monthly churn rate for B2B SaaS is below 5%. Excellent is below 2%. Enterprise SaaS should target below 1% monthly churn. Annual churn above 50% signals serious retention problems that will block growth.",
      },
    },
    {
      "@type": "Question",
      name: "What is a good LTV:CAC ratio?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A healthy LTV:CAC ratio is 3:1 or higher — you earn at least $3 in lifetime value for every $1 spent acquiring a customer. Below 1:1 is unsustainable and means you lose money on every customer. The ideal range is 3:1 to 5:1.",
      },
    },
    {
      "@type": "Question",
      name: "How much runway should a SaaS startup have?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SaaS startups should maintain a minimum of 12–18 months of cash runway at all times. Growth-stage companies should target 24+ months. Below 6 months is critical — you need to raise capital or cut costs immediately.",
      },
    },
    {
      "@type": "Question",
      name: "What is net revenue retention?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Net Revenue Retention (NRR) measures how much revenue you retain from existing customers including expansion, contraction, and churn. Above 100% means you grow even without new customers. 120%+ is best-in-class for SaaS.",
      },
    },
  ],
}

const revenueBenchmarks = [
  {
    stage: "Pre-Seed",
    mrr: "$0–$10K",
    growthRate: "15–20% MoM",
    arpu: "$20–$50",
    notes: "Prove product-market fit",
  },
  {
    stage: "Seed",
    mrr: "$10K–$50K",
    growthRate: "10–15% MoM",
    arpu: "$50–$150",
    notes: "Build repeatable sales motion",
  },
  {
    stage: "Series A",
    mrr: "$50K–$250K",
    growthRate: "5–10% MoM",
    arpu: "$100–$500",
    notes: "Scale what works",
  },
  {
    stage: "Series B+",
    mrr: "$250K–$1M",
    growthRate: "3–7% MoM",
    arpu: "$300–$1,000+",
    notes: "Optimize for efficiency",
  },
  {
    stage: "Growth",
    mrr: "$1M+",
    growthRate: "2–5% MoM",
    arpu: "$500–$2,000+",
    notes: "Market expansion & retention",
  },
]

const retentionBenchmarks = [
  {
    stage: "Pre-Seed",
    monthlyChurn: "7–10%",
    annualChurn: "60–72%",
    nrr: "85–95%",
    rating: "Typical",
    color: "text-amber-400",
  },
  {
    stage: "Seed",
    monthlyChurn: "4–7%",
    annualChurn: "39–59%",
    nrr: "90–100%",
    rating: "Improving",
    color: "text-amber-400",
  },
  {
    stage: "Series A",
    monthlyChurn: "2–4%",
    annualChurn: "21–39%",
    nrr: "100–110%",
    rating: "Good",
    color: "text-emerald-400",
  },
  {
    stage: "Series B+",
    monthlyChurn: "1–2%",
    annualChurn: "11–21%",
    nrr: "110–120%",
    rating: "Strong",
    color: "text-emerald-400",
  },
  {
    stage: "Enterprise",
    monthlyChurn: "<1%",
    annualChurn: "<12%",
    nrr: "120%+",
    rating: "Best-in-class",
    color: "text-emerald-400",
  },
]

const unitEconomicsBenchmarks = [
  {
    stage: "Pre-Seed",
    ltvCac: "1:1–2:1",
    payback: "12–18 months",
    cac: "$50–$200",
    notes: "Focus on learning, not efficiency",
  },
  {
    stage: "Seed",
    ltvCac: "2:1–3:1",
    payback: "9–14 months",
    cac: "$100–$500",
    notes: "Start optimizing acquisition channels",
  },
  {
    stage: "Series A",
    ltvCac: "3:1–5:1",
    payback: "6–12 months",
    cac: "$300–$1,500",
    notes: "Prove scalable, profitable growth",
  },
  {
    stage: "Series B+",
    ltvCac: "4:1–7:1",
    payback: "4–9 months",
    cac: "$500–$3,000",
    notes: "Double down on efficient channels",
  },
  {
    stage: "Enterprise",
    ltvCac: "5:1–10:1+",
    payback: "3–6 months",
    cac: "$1,000–$10,000+",
    notes: "High-touch sales, long contracts",
  },
]

const cashFlowBenchmarks = [
  {
    stage: "Pre-Seed",
    burnRate: "$10K–$50K/mo",
    runway: "12–18 months",
    grossMargin: "60–70%",
    targetCash: "$100K–$500K",
  },
  {
    stage: "Seed",
    burnRate: "$50K–$150K/mo",
    runway: "15–24 months",
    grossMargin: "70–80%",
    targetCash: "$500K–$2M",
  },
  {
    stage: "Series A",
    burnRate: "$150K–$400K/mo",
    runway: "18–24 months",
    grossMargin: "75–85%",
    targetCash: "$2M–$8M",
  },
  {
    stage: "Series B+",
    burnRate: "$400K–$1M/mo",
    runway: "24+ months",
    grossMargin: "80–90%",
    targetCash: "$5M–$20M+",
  },
  {
    stage: "Growth",
    burnRate: "Profitable to breakeven",
    runway: "36+ months",
    grossMargin: "85–92%",
    targetCash: "Self-sustaining",
  },
]

export default function SaaSBenchmarks2026Page() {
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
            2026 Report
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-6">
            SaaS Benchmarks 2026:<br />
            <span className="text-emerald-400">What Good Looks Like</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
            Every SaaS metric benchmarked by stage — from pre-seed to growth. Know exactly where
            you stand and where to focus next.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-8 py-3 text-base font-medium text-white hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/25 hover:-translate-y-0.5"
            >
              Track your metrics free
            </Link>
            <a
              href="#revenue-benchmarks"
              className="inline-flex items-center gap-2 rounded-full border border-gray-700 bg-gray-800/50 px-8 py-3 text-base font-medium text-gray-300 hover:text-white hover:border-gray-600 transition-all"
            >
              Jump to benchmarks ↓
            </a>
          </div>
        </section>

        {/* Why Benchmarks Matter */}
        <section className="border-t border-gray-800 px-6 py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Why Benchmarks Matter
            </h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              Without benchmarks, you&apos;re flying blind. A 5% monthly growth rate sounds great
              until you realize it&apos;s half the rate needed to raise your next round. A 3%
              churn rate seems manageable — until you see it&apos;s 3x your competitors.
            </p>
            <p className="text-gray-400 leading-relaxed mb-4">
              SaaS benchmarks give you a reality check. They tell you whether your metrics
              are on track for your stage, where you&apos;re leaving money on the table, and what
              investors actually expect when they review your{" "}
              <Link href="/blog/saas-financial-metrics" className="text-emerald-400 hover:underline">
                SaaS financial metrics
              </Link>.
            </p>
            <p className="text-gray-400 leading-relaxed">
              The data below is compiled from thousands of SaaS companies across pre-seed
              through growth stage. Use it to set targets, benchmark your performance, and
              make better decisions about where to invest your time and capital.
            </p>
          </div>
        </section>

        {/* Revenue Benchmarks */}
        <section id="revenue-benchmarks" className="border-t border-gray-800 bg-gray-900/30 px-6 py-20">
          <div className="mx-auto max-w-5xl">
            <div className="flex items-center gap-3 mb-4">
              <DollarSign className="h-6 w-6 text-emerald-400" />
              <span className="text-xs font-semibold tracking-widest uppercase text-emerald-400">
                Revenue
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Revenue Benchmarks
            </h2>
            <p className="text-gray-400 leading-relaxed mb-10 max-w-2xl">
              MRR, growth rates, and ARPU targets by stage. Use these to set realistic
              goals and understand what investors expect at each milestone.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="py-4 px-6 text-sm font-semibold text-gray-300">Stage</th>
                    <th className="py-4 px-6 text-sm font-semibold text-gray-300">MRR Range</th>
                    <th className="py-4 px-6 text-sm font-semibold text-gray-300">Growth Rate</th>
                    <th className="py-4 px-6 text-sm font-semibold text-gray-300">ARPU</th>
                    <th className="py-4 px-6 text-sm font-semibold text-gray-300">Focus</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {revenueBenchmarks.map((row) => (
                    <tr key={row.stage} className="bg-gray-900/50">
                      <td className="py-4 px-6 text-sm font-medium text-white">{row.stage}</td>
                      <td className="py-4 px-6 text-sm text-emerald-400 font-mono">{row.mrr}</td>
                      <td className="py-4 px-6 text-sm text-gray-300 font-mono">{row.growthRate}</td>
                      <td className="py-4 px-6 text-sm text-gray-300 font-mono">{row.arpu}</td>
                      <td className="py-4 px-6 text-sm text-gray-500">{row.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-8 grid sm:grid-cols-3 gap-4">
              <Link
                href="/mrr-calculator"
                className="group block border border-gray-800 bg-gray-900/50 hover:border-emerald-500/40 hover:bg-emerald-500/5 rounded-xl p-5 transition-all"
              >
                <div className="text-2xl mb-3">💰</div>
                <div className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors mb-1">
                  MRR Calculator
                </div>
                <div className="text-xs text-gray-500 leading-relaxed">
                  Calculate your Monthly Recurring Revenue
                </div>
              </Link>
              <Link
                href="/arr-calculator"
                className="group block border border-gray-800 bg-gray-900/50 hover:border-emerald-500/40 hover:bg-emerald-500/5 rounded-xl p-5 transition-all"
              >
                <div className="text-2xl mb-3">🗓️</div>
                <div className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors mb-1">
                  ARR Calculator
                </div>
                <div className="text-xs text-gray-500 leading-relaxed">
                  Annual Recurring Revenue calculator
                </div>
              </Link>
              <Link
                href="/mrr-tracker"
                className="group block border border-gray-800 bg-gray-900/50 hover:border-emerald-500/40 hover:bg-emerald-500/5 rounded-xl p-5 transition-all"
              >
                <div className="text-2xl mb-3">📈</div>
                <div className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors mb-1">
                  MRR Tracker
                </div>
                <div className="text-xs text-gray-500 leading-relaxed">
                  Track MRR growth trends over time
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Retention Benchmarks */}
        <section className="border-t border-gray-800 px-6 py-20">
          <div className="mx-auto max-w-5xl">
            <div className="flex items-center gap-3 mb-4">
              <Users className="h-6 w-6 text-emerald-400" />
              <span className="text-xs font-semibold tracking-widest uppercase text-emerald-400">
                Retention
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Retention Benchmarks
            </h2>
            <p className="text-gray-400 leading-relaxed mb-10 max-w-2xl">
              Churn and net revenue retention are the biggest determinants of long-term SaaS
              success. Small improvements in retention compound into massive revenue gains.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="py-4 px-6 text-sm font-semibold text-gray-300">Stage</th>
                    <th className="py-4 px-6 text-sm font-semibold text-gray-300">Monthly Churn</th>
                    <th className="py-4 px-6 text-sm font-semibold text-gray-300">Annual Churn</th>
                    <th className="py-4 px-6 text-sm font-semibold text-gray-300">NRR</th>
                    <th className="py-4 px-6 text-sm font-semibold text-gray-300">Rating</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {retentionBenchmarks.map((row) => (
                    <tr key={row.stage} className="bg-gray-900/50">
                      <td className="py-4 px-6 text-sm font-medium text-white">{row.stage}</td>
                      <td className="py-4 px-6 text-sm text-gray-300 font-mono">{row.monthlyChurn}</td>
                      <td className="py-4 px-6 text-sm text-gray-300 font-mono">{row.annualChurn}</td>
                      <td className="py-4 px-6 text-sm text-gray-300 font-mono">{row.nrr}</td>
                      <td className="py-4 px-6 text-sm"><span className={`font-semibold ${row.color}`}>{row.rating}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-8 grid sm:grid-cols-3 gap-4">
              <Link
                href="/churn-calculator"
                className="group block border border-gray-800 bg-gray-900/50 hover:border-emerald-500/40 hover:bg-emerald-500/5 rounded-xl p-5 transition-all"
              >
                <div className="text-2xl mb-3">📉</div>
                <div className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors mb-1">
                  Churn Rate Calculator
                </div>
                <div className="text-xs text-gray-500 leading-relaxed">
                  Calculate monthly & annual churn instantly
                </div>
              </Link>
              <Link
                href="/churn-rate-calculator"
                className="group block border border-gray-800 bg-gray-900/50 hover:border-emerald-500/40 hover:bg-emerald-500/5 rounded-xl p-5 transition-all"
              >
                <div className="text-2xl mb-3">📊</div>
                <div className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors mb-1">
                  Churn Rate Calculator (v2)
                </div>
                <div className="text-xs text-gray-500 leading-relaxed">
                  Detailed churn analysis with revenue impact
                </div>
              </Link>
              <Link
                href="/ltv-calculator"
                className="group block border border-gray-800 bg-gray-900/50 hover:border-emerald-500/40 hover:bg-emerald-500/5 rounded-xl p-5 transition-all"
              >
                <div className="text-2xl mb-3">♾️</div>
                <div className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors mb-1">
                  LTV Calculator
                </div>
                <div className="text-xs text-gray-500 leading-relaxed">
                  Calculate Customer Lifetime Value
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Unit Economics Benchmarks */}
        <section className="border-t border-gray-800 bg-gray-900/30 px-6 py-20">
          <div className="mx-auto max-w-5xl">
            <div className="flex items-center gap-3 mb-4">
              <BarChart3 className="h-6 w-6 text-emerald-400" />
              <span className="text-xs font-semibold tracking-widest uppercase text-emerald-400">
                Unit Economics
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Unit Economics Benchmarks
            </h2>
            <p className="text-gray-400 leading-relaxed mb-10 max-w-2xl">
              Your LTV:CAC ratio and payback period determine whether you can scale profitably.
              These benchmarks show what investors look for at each stage.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="py-4 px-6 text-sm font-semibold text-gray-300">Stage</th>
                    <th className="py-4 px-6 text-sm font-semibold text-gray-300">LTV:CAC</th>
                    <th className="py-4 px-6 text-sm font-semibold text-gray-300">Payback Period</th>
                    <th className="py-4 px-6 text-sm font-semibold text-gray-300">CAC</th>
                    <th className="py-4 px-6 text-sm font-semibold text-gray-300">Focus</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {unitEconomicsBenchmarks.map((row) => (
                    <tr key={row.stage} className="bg-gray-900/50">
                      <td className="py-4 px-6 text-sm font-medium text-white">{row.stage}</td>
                      <td className="py-4 px-6 text-sm text-emerald-400 font-mono">{row.ltvCac}</td>
                      <td className="py-4 px-6 text-sm text-gray-300 font-mono">{row.payback}</td>
                      <td className="py-4 px-6 text-sm text-gray-300 font-mono">{row.cac}</td>
                      <td className="py-4 px-6 text-sm text-gray-500">{row.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-10 grid sm:grid-cols-2 gap-6">
              <div className="border border-gray-800 bg-gray-900/50 rounded-xl p-6">
                <div className="text-sm font-mono text-emerald-400 mb-2">Healthy LTV:CAC</div>
                <div className="text-3xl font-bold text-white mb-2">3:1 or higher</div>
                <p className="text-sm text-gray-400">
                  For every $1 spent acquiring a customer, you earn $3+ in lifetime value. This
                  is the minimum for sustainable growth.
                </p>
              </div>
              <div className="border border-gray-800 bg-gray-900/50 rounded-xl p-6">
                <div className="text-sm font-mono text-red-400 mb-2">Danger Zone</div>
                <div className="text-3xl font-bold text-white mb-2">Below 1:1</div>
                <p className="text-sm text-gray-400">
                  You lose money on every customer acquired. Fix your churn or acquisition cost
                  before scaling spend.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Cash Flow Benchmarks */}
        <section className="border-t border-gray-800 px-6 py-20">
          <div className="mx-auto max-w-5xl">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="h-6 w-6 text-emerald-400" />
              <span className="text-xs font-semibold tracking-widest uppercase text-emerald-400">
                Cash Flow
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Cash Flow Benchmarks
            </h2>
            <p className="text-gray-400 leading-relaxed mb-10 max-w-2xl">
              Burn rate, runway, and gross margin targets by stage. These numbers determine
              whether you can raise your next round or need to reach profitability first.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="py-4 px-6 text-sm font-semibold text-gray-300">Stage</th>
                    <th className="py-4 px-6 text-sm font-semibold text-gray-300">Burn Rate</th>
                    <th className="py-4 px-6 text-sm font-semibold text-gray-300">Runway</th>
                    <th className="py-4 px-6 text-sm font-semibold text-gray-300">Gross Margin</th>
                    <th className="py-4 px-6 text-sm font-semibold text-gray-300">Cash Target</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {cashFlowBenchmarks.map((row) => (
                    <tr key={row.stage} className="bg-gray-900/50">
                      <td className="py-4 px-6 text-sm font-medium text-white">{row.stage}</td>
                      <td className="py-4 px-6 text-sm text-gray-300 font-mono">{row.burnRate}</td>
                      <td className="py-4 px-6 text-sm text-gray-300 font-mono">{row.runway}</td>
                      <td className="py-4 px-6 text-sm text-emerald-400 font-mono">{row.grossMargin}</td>
                      <td className="py-4 px-6 text-sm text-gray-300 font-mono">{row.targetCash}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              <Link
                href="/runway-calculator"
                className="group block border border-gray-800 bg-gray-900/50 hover:border-emerald-500/40 hover:bg-emerald-500/5 rounded-xl p-5 transition-all"
              >
                <div className="text-2xl mb-3">🛫</div>
                <div className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors mb-1">
                  Runway Calculator
                </div>
                <div className="text-xs text-gray-500 leading-relaxed">
                  How long will your cash last?
                </div>
              </Link>
              <Link
                href="/cash-flow-tracker"
                className="group block border border-gray-800 bg-gray-900/50 hover:border-emerald-500/40 hover:bg-emerald-500/5 rounded-xl p-5 transition-all"
              >
                <div className="text-2xl mb-3">🌊</div>
                <div className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors mb-1">
                  Cash Flow Tracker
                </div>
                <div className="text-xs text-gray-500 leading-relaxed">
                  Track SaaS cash flow projections
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* What Changed in 2026 */}
        <section className="border-t border-gray-800 bg-gray-900/30 px-6 py-20">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What Changed in 2026
            </h2>
            <p className="text-gray-400 leading-relaxed mb-10 max-w-2xl">
              The SaaS landscape shifted significantly this year. These four trends are
              reshaping how founders should think about their benchmarks.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="border border-gray-800 bg-gray-900/50 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-500/10 text-purple-400 text-sm font-bold">
                    01
                  </div>
                  <h3 className="text-lg font-semibold text-white">AI Tools Adoption Accelerates</h3>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Over 60% of SaaS companies now integrate AI features. This has raised
                  the bar for product expectations and compressed timelines for reaching
                  product-market fit. Companies with AI-native products are seeing 20–30%
                  higher retention than traditional SaaS.
                </p>
              </div>
              <div className="border border-gray-800 bg-gray-900/50 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-500/10 text-purple-400 text-sm font-bold">
                    02
                  </div>
                  <h3 className="text-lg font-semibold text-white">Rising CAC Across All Channels</h3>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Customer acquisition costs increased 25–40% year-over-year across paid
                  channels. This makes LTV:CAC optimization critical. Founders who ignore
                  unit economics are burning cash faster than ever.
                </p>
              </div>
              <div className="border border-gray-800 bg-gray-900/50 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-500/10 text-purple-400 text-sm font-bold">
                    03
                  </div>
                  <h3 className="text-lg font-semibold text-white">PLG Growth Continues to Rise</h3>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Product-led growth models now account for 45% of new SaaS launches.
                  PLG companies show lower initial ARPU but higher NRR when expansion
                  revenue is well-structured. The benchmark for PLG success has shifted
                  toward 110%+ NRR.
                </p>
              </div>
              <div className="border border-gray-800 bg-gray-900/50 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-500/10 text-purple-400 text-sm font-bold">
                    04
                  </div>
                  <h3 className="text-lg font-semibold text-white">Efficiency Over Growth at All Costs</h3>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">
                  The &ldquo;grow at all costs&rdquo; era is over. Investors now prioritize
                  rule of 40 and efficient growth. SaaS companies with 80%+ gross margins
                  and 18+ months runway are outperforming high-growth, high-burn peers in
                  fundraising.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How to Use These Benchmarks */}
        <section className="border-t border-gray-800 px-6 py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              How to Use These Benchmarks
            </h2>
            <p className="text-gray-400 leading-relaxed mb-8">
              Benchmarks are only useful if you apply them. Follow this framework to turn
              this data into action.
            </p>
            <div className="space-y-6">
              {[
                {
                  step: 1,
                  title: "Identify your stage",
                  desc: "Determine whether you're pre-seed, seed, Series A, or growth based on your current MRR and team size.",
                },
                {
                  step: 2,
                  title: "Compare 2–3 key metrics",
                  desc: "Don't try to benchmark everything at once. Pick the 2–3 metrics most critical to your current challenges — typically MRR growth, churn, and one unit economics metric.",
                },
                {
                  step: 3,
                  title: "Find the gap",
                  desc: "Where are you below benchmark? That's your highest-leverage improvement area. For example, if your churn is 2x the benchmark, focus there before spending more on acquisition.",
                },
                {
                  step: 4,
                  title: "Set quarterly targets",
                  desc: "Create realistic targets to close the gap over 90 days. Use calculators like our MRR Calculator and Churn Rate Calculator to track progress.",
                },
                {
                  step: 5,
                  title: "Review monthly",
                  desc: "Revisit benchmarks monthly to see if your metrics are converging. Track trends, not snapshots — direction matters more than any single month's numbers.",
                },
              ].map((item) => (
                <div key={item.step} className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-sm font-bold text-emerald-400 mt-0.5">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA — Track Your Metrics */}
        <section className="border-t border-gray-800 bg-gray-900/30 px-6 py-20">
          <div className="mx-auto max-w-5xl grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Track Your Metrics Against Benchmarks
              </h2>
              <p className="text-gray-400 leading-relaxed mb-8">
                AI Finance Ops connects to Stripe and calculates every metric in these
                benchmarks automatically — MRR, churn, LTV:CAC, burn rate, runway.
                No spreadsheets. No manual data entry.
              </p>
              <div className="space-y-4">
                {[
                  "Real-time MRR and churn tracking",
                  "Automatic LTV and LTV:CAC calculations",
                  "Burn rate and runway projections",
                  "Benchmark-ready reports for investors",
                ].map((f) => (
                  <div key={f} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-emerald-500 mt-0.5 shrink-0" />
                    <span className="text-sm text-gray-300">{f}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="border border-emerald-500/30 bg-emerald-500/5 rounded-2xl p-8">
              <div className="text-lg font-bold text-white mb-4">
                Know exactly where you stand
              </div>
              <ul className="space-y-3">
                {[
                  "Compare your metrics to industry benchmarks",
                  "Track trends over time, not just snapshots",
                  "Identify your highest-leverage improvements",
                  "Export-ready reports for fundraising",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-gray-300">
                    <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/register"
                className="mt-6 block w-full text-center rounded-lg bg-emerald-500 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/25"
              >
                Start free — no credit card required
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-gray-800 px-6 py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold text-white mb-10">
              Frequently Asked Questions
            </h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  What is a good MRR growth rate for SaaS?
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  MRR growth benchmarks vary by stage. Pre-seed startups should target{" "}
                  <strong className="text-white">15–20% month-over-month growth</strong>. Seed
                  stage companies should aim for <strong className="text-white">10–15% MoM</strong>.
                  Series A startups should target <strong className="text-white">5–10% MoM</strong>.
                  Growth-stage companies above $1M ARR typically see 3–7% MoM. Use our{" "}
                  <Link href="/mrr-calculator" className="text-emerald-400 hover:underline">
                    MRR Calculator
                  </Link>{" "}
                  to track your growth rate.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  What is a good churn rate for SaaS?
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  A good monthly churn rate for B2B SaaS is{" "}
                  <strong className="text-white">below 5%</strong>. Excellent is{" "}
                  <strong className="text-white">below 2%</strong>. Enterprise SaaS should
                  target <strong className="text-white">below 1% monthly churn</strong>.
                  Annual churn above 50% signals serious retention problems. Calculate your
                  churn with our{" "}
                  <Link href="/churn-calculator" className="text-emerald-400 hover:underline">
                    Churn Rate Calculator
                  </Link>.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  What is a good LTV:CAC ratio?
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  A healthy LTV:CAC ratio is{" "}
                  <strong className="text-white">3:1 or higher</strong> — you earn at least $3
                  in lifetime value for every $1 spent acquiring a customer. Below 1:1 is
                  unsustainable and means you lose money on every customer. The ideal range
                  is 3:1 to 5:1. See the full breakdown in our{" "}
                  <Link href="/ltv-calculator" className="text-emerald-400 hover:underline">
                    LTV Calculator
                  </Link>.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  How much runway should a SaaS startup have?
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  SaaS startups should maintain a minimum of{" "}
                  <strong className="text-white">12–18 months</strong> of cash runway at all
                  times. Growth-stage companies should target{" "}
                  <strong className="text-white">24+ months</strong>. Below 6 months is
                  critical — you need to raise capital or cut costs immediately. Use our{" "}
                  <Link href="/runway-calculator" className="text-emerald-400 hover:underline">
                    Runway Calculator
                  </Link>{" "}
                  to check your current position.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  What is net revenue retention?
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Net Revenue Retention (NRR) measures how much revenue you retain from
                  existing customers including expansion, contraction, and churn.{" "}
                  <strong className="text-white">Above 100%</strong> means you grow even
                  without new customers. <strong className="text-white">120%+ is
                  best-in-class</strong> for SaaS. NRR is the single metric investors care
                  most about for growth-stage companies. Read more in our{" "}
                  <Link href="/blog/net-revenue-retention-saas" className="text-emerald-400 hover:underline">
                    NRR guide
                  </Link>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="border-t border-gray-800 px-6 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Stop Guessing. Start Benchmarking.
            </h2>
            <p className="text-gray-400 mb-8">
              Connect Stripe in 2 minutes and get every SaaS metric calculated automatically.
              See exactly where you stand against the benchmarks above.{" "}
              <Link href="/vs-baremetrics" className="text-emerald-400 hover:underline">
                See how we compare to Baremetrics →
              </Link>
            </p>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-10 py-4 text-base font-semibold text-white hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/25"
            >
              Start free — no credit card required
            </Link>
          </div>
        </section>

        <InternalLinks
          variant="mixed"
          exclude="/saas-benchmarks-2026"
          title="More Free SaaS Finance Tools"
          limit={8}
        />
      </div>
    </>
  )
}
