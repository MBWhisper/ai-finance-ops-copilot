import type { Metadata } from "next"
import Link from "next/link"
import { OptimizedImage } from "@/components/OptimizedImage"
import { Check, TrendingUp, TrendingDown, BarChart3, AlertTriangle, ChevronDown } from "lucide-react"

export const metadata: Metadata = {
  title: 'Free MRR Tracker for SaaS Founders (2026) — AI Finance Ops',
  description: 'Track Monthly Recurring Revenue automatically. Connect Stripe, see New MRR, Churn MRR, Expansion MRR in real time. No spreadsheets. Free to start.',
  alternates: { canonical: 'https://aifinanceops.app/mrr-tracker' },
  openGraph: {
    title: 'Free MRR Tracker for SaaS Founders (2026) — AI Finance Ops',
    description: 'Track Monthly Recurring Revenue automatically. Connect Stripe, see New MRR, Churn MRR, Expansion MRR in real time. No spreadsheets. Free to start.',
    url: 'https://aifinanceops.app/mrr-tracker',
    siteName: 'AI Finance Ops',
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "AI Finance Ops MRR Tracker" }],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free MRR Tracker for SaaS Founders (2026)",
    description: "Track Monthly Recurring Revenue automatically with AI. Connect Stripe, get your MRR dashboard in 2 minutes.",
    images: ["/og-image.png"],
  },
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is MRR (Monthly Recurring Revenue)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "MRR stands for Monthly Recurring Revenue -- the total predictable revenue your SaaS generates each month from active subscriptions. It is the single most important growth metric for subscription businesses. MRR = (Number of paying customers) x (Average revenue per customer per month)."
      }
    },
    {
      "@type": "Question",
      "name": "How do I calculate MRR for my SaaS?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "To calculate MRR: multiply the number of active paying customers by their average monthly subscription price. For annual plans, divide the annual contract value by 12 to get the monthly equivalent. Net New MRR = New MRR + Expansion MRR - Contraction MRR - Churned MRR. AI Finance Ops calculates all of this automatically by connecting directly to Stripe."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between MRR and ARR?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "MRR (Monthly Recurring Revenue) is the monthly snapshot of predictable revenue. ARR (Annual Recurring Revenue) is MRR x 12. MRR is used for tracking growth momentum month-by-month. ARR is typically used for investor reporting and enterprise contracts."
      }
    },
    {
      "@type": "Question",
      "name": "What are the components of MRR?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "MRR has 5 key components: (1) New MRR, (2) Expansion MRR, (3) Contraction MRR, (4) Churned MRR, (5) Reactivation MRR. Net New MRR = New + Expansion - Contraction - Churned + Reactivation."
      }
    },
    {
      "@type": "Question",
      "name": "Is AI Finance Ops MRR tracker free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. AI Finance Ops offers a free plan that includes MRR tracking with Stripe integration, a real-time dashboard, and basic churn alerts. No credit card required to start."
      }
    },
    {
      "@type": "Question",
      "name": "How does AI Finance Ops connect to Stripe?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "AI Finance Ops connects to Stripe via OAuth -- you authorize read-only access in under 60 seconds. No API keys to copy. Once connected, it automatically pulls your subscription data and calculates MRR, churn rate, LTV, and all related metrics in real time."
      }
    }
  ]
}

const METRICS = [
  { icon: TrendingUp, label: "New MRR", desc: "Revenue from brand new customers acquired this month", color: "text-emerald-400" },
  { icon: TrendingUp, label: "Expansion MRR", desc: "Additional revenue from upgrades and add-ons", color: "text-blue-400" },
  { icon: TrendingDown, label: "Contraction MRR", desc: "Revenue lost from downgrades", color: "text-amber-400" },
  { icon: TrendingDown, label: "Churned MRR", desc: "Revenue lost from cancellations", color: "text-red-400" },
  { icon: BarChart3, label: "Net New MRR", desc: "New + Expansion − Contraction − Churned", color: "text-emerald-400" },
]

const REASONS = [
  { icon: AlertTriangle, title: "Manual updates waste hours", desc: "Copy-pasting from Stripe into spreadsheets takes 2-3 hours every week — time you could spend building" },
  { icon: AlertTriangle, title: "One wrong cell breaks everything", desc: "A single formula error silently corrupts months of MRR data without warning" },
  { icon: AlertTriangle, title: "No real-time alerts", desc: "Spreadsheets cannot notify you when churn spikes or your MRR growth stalls" },
  { icon: AlertTriangle, title: "No investor-ready reports", desc: "Manually formatting MRR charts for investor updates takes hours every month" },
]

const FAQS = [
  {
    q: "What is MRR (Monthly Recurring Revenue)?",
    a: "MRR is the total predictable revenue your SaaS generates each month from active subscriptions. It is calculated as: Number of paying customers x Average revenue per customer per month. For annual plans, divide the annual contract value by 12."
  },
  {
    q: "How do I calculate Net New MRR?",
    a: "Net New MRR = New MRR + Expansion MRR − Contraction MRR − Churned MRR + Reactivation MRR. AI Finance Ops calculates every component automatically by reading directly from your Stripe account."
  },
  {
    q: "What is the difference between MRR and ARR?",
    a: "MRR is your monthly recurring revenue snapshot. ARR = MRR x 12. Use MRR for tracking growth momentum. Use ARR for investor reporting and enterprise contracts."
  },
  {
    q: "Is the MRR tracker really free?",
    a: "Yes. The free plan includes Stripe integration, real-time MRR dashboard, and churn alerts. No credit card required. Paid plans add cohort analysis, investor reports, and multi-currency support."
  },
  {
    q: "How does it connect to Stripe?",
    a: "Via OAuth in under 60 seconds. You authorize read-only access — no API keys needed. AI Finance Ops automatically pulls your subscription data and calculates all MRR components in real time."
  },
]

export default function MrrTrackerPage() {
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
            MRR Tracker for<br />
            <span className="text-emerald-400">SaaS Founders</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-4">
            Stop copying numbers into spreadsheets. AI Finance Ops connects to Stripe and tracks your
            Monthly Recurring Revenue automatically — every component, in real time.
          </p>
          <p className="text-sm text-gray-500 max-w-xl mx-auto mb-8">
            New MRR · Expansion MRR · Churned MRR · Contraction MRR · Net New MRR — all calculated automatically.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-8 py-3 text-base font-medium text-white hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/25 hover:-translate-y-0.5"
            >
              Start free — no credit card
            </Link>
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 rounded-full border border-gray-700 px-8 py-3 text-base font-medium text-gray-300 hover:border-gray-500 hover:text-white transition-all hover:-translate-y-0.5"
            >
              See demo
            </Link>
          </div>
          <OptimizedImage
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=630&fit=crop"
            alt="MRR tracking dashboard with charts and analytics"
            className="w-full max-w-4xl mx-auto mt-12 rounded-xl aspect-video object-cover shadow-2xl"
            width={1200}
            height={630}
          />
        </section>

        {/* MRR Formula */}
        <section className="border-t border-gray-800 px-6 py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">What is MRR and How is it Calculated?</h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              Monthly Recurring Revenue (MRR) is the single most important metric for any SaaS business.
              It measures the total predictable revenue you generate every month from active subscriptions.
            </p>
            <p className="text-gray-400 leading-relaxed mb-4">
              The basic formula: <strong className="text-white">MRR = Number of customers &times; Average monthly revenue per customer</strong>.
              For annual plans, divide the total contract value by 12 to get the monthly equivalent.
            </p>
            <p className="text-gray-400 leading-relaxed mb-8">
              But real MRR tracking goes deeper. You need to track each component — new, expansion, contraction,
              and churned — to understand exactly what is driving growth or decline. Most founders track this
              manually, which takes hours and introduces errors. AI Finance Ops automates all of it.
            </p>
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 font-mono text-sm">
              <div className="text-emerald-400 mb-2 text-xs font-sans font-semibold uppercase tracking-widest">Net New MRR formula</div>
              <div className="text-gray-300">Net New MRR =</div>
              <div className="text-gray-300 ml-4">+ New MRR <span className="text-gray-500">(new customers)</span></div>
              <div className="text-gray-300 ml-4">+ Expansion MRR <span className="text-gray-500">(upgrades)</span></div>
              <div className="text-gray-300 ml-4">− Contraction MRR <span className="text-gray-500">(downgrades)</span></div>
              <div className="text-gray-300 ml-4">− Churned MRR <span className="text-gray-500">(cancellations)</span></div>
              <div className="text-gray-300 ml-4">+ Reactivation MRR <span className="text-gray-500">(win-backs)</span></div>
            </div>
          </div>
        </section>

        {/* Metrics Grid */}
        <section className="border-t border-gray-800 px-6 py-20">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
              Every MRR Component, Tracked Automatically
            </h2>
            <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
              AI Finance Ops connects to Stripe and calculates every MRR component in real time.
              No manual work, no formulas, no errors.
            </p>
            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
              {METRICS.map((m) => (
                <div
                  key={m.label}
                  className="border border-gray-800 bg-gray-900/50 rounded-xl p-6 text-center hover:border-gray-700 transition-colors"
                >
                  <m.icon className={`h-8 w-8 mx-auto mb-3 ${m.color}`} />
                  <div className="text-sm font-semibold text-white mb-1">{m.label}</div>
                  <div className="text-xs text-gray-500">{m.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Not Spreadsheets */}
        <section className="border-t border-gray-800 bg-gray-900/30 px-6 py-20">
          <div className="mx-auto max-w-5xl grid md:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Why Spreadsheets Fail for MRR Tracking</h2>
              <p className="text-gray-400 leading-relaxed mb-8">
                Spreadsheets seem like the easy option. But as your SaaS grows, they become the biggest
                source of errors and wasted time. Here is why founders switch to dedicated MRR tracking:
              </p>
              <div className="space-y-5">
                {REASONS.map((r) => (
                  <div key={r.title} className="flex items-start gap-3">
                    <r.icon className="h-5 w-5 text-red-400 mt-0.5 shrink-0" />
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
                  "Automatic sync with Stripe every hour",
                  "Real-time MRR dashboard — all 5 components",
                  "Churn spike alerts via email",
                  "MRR trend charts going back 12 months",
                  "Investor-ready MRR reports in one click",
                  "No manual data entry — ever",
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
                <div className="text-xs text-gray-500">Connect Stripe → get your first MRR dashboard</div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-gray-800 px-6 py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold text-white mb-10 text-center">MRR Tracking — Frequently Asked Questions</h2>
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
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Start tracking MRR in 2 minutes</h2>
            <p className="text-gray-400 mb-8">
              Connect Stripe and get your complete MRR dashboard immediately. Free to start, no credit card required.
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
