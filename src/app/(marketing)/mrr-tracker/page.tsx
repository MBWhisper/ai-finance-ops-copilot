import type { Metadata } from "next"
import Link from "next/link"
import { OptimizedImage } from "@/components/OptimizedImage"
import { Check, TrendingUp, TrendingDown, BarChart3, AlertTriangle } from "lucide-react"

export const metadata: Metadata = {
  title: "Free MRR Tracker for SaaS Founders (2026)",
  description:
    "Track your Monthly Recurring Revenue automatically with AI. No spreadsheets, no manual work. Built for solo SaaS founders.",
  openGraph: {
    title: "Free MRR Tracker for SaaS Founders (2026)",
    description:
      "Track your Monthly Recurring Revenue automatically with AI. No spreadsheets, no manual work. Built for solo SaaS founders.",
    url: "https://www.aifinanceops.app/mrr-tracker",
    siteName: "AI Finance Ops",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "AI Finance Ops MRR Tracker" }],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free MRR Tracker for SaaS Founders (2026)",
    description:
      "Track your Monthly Recurring Revenue automatically with AI. No spreadsheets, no manual work. Built for solo SaaS founders.",
    images: ["/og-image.png"],
  },
}

const METRICS = [
  { icon: TrendingUp, label: "New MRR", desc: "Revenue from new customers", color: "text-emerald-400" },
  { icon: TrendingUp, label: "Expansion MRR", desc: "Upgrades and add-ons", color: "text-blue-400" },
  { icon: TrendingDown, label: "Contraction MRR", desc: "Downgrades", color: "text-amber-400" },
  { icon: TrendingDown, label: "Churned MRR", desc: "Cancelled subscriptions", color: "text-red-400" },
  { icon: BarChart3, label: "Net New MRR", desc: "The number that matters most", color: "text-emerald-400" },
]

const REASONS = [
  { icon: AlertTriangle, title: "Manual updates", desc: "Copy-paste from Stripe every week takes 2-3 hours" },
  { icon: AlertTriangle, title: "Error-prone", desc: "One wrong cell breaks your entire spreadsheet" },
  { icon: AlertTriangle, title: "No alerts", desc: "Spreadsheets don't tell you when churn spikes" },
]

export default function MrrTrackerPage() {
  return (
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
        <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
          Stop copying numbers into spreadsheets. AI Finance Ops connects to your payment processor
          and tracks your Monthly Recurring Revenue automatically — in real time.
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

      {/* What is MRR */}
      <section className="border-t border-gray-800 px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            What is MRR and Why Does It Matter?
          </h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            Monthly Recurring Revenue (MRR) is the single most important metric for any SaaS business.
            It tells you how much predictable revenue you generate every month.
          </p>
          <p className="text-gray-400 leading-relaxed">
            Most founders track MRR manually — copying numbers from Stripe into spreadsheets every week.
            This takes 2-3 hours and is error-prone. AI Finance Ops does it for you.
          </p>
        </div>
      </section>

      {/* Metrics Grid */}
      <section className="border-t border-gray-800 px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
            Every MRR Component, Tracked Automatically
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            AI Finance Ops connects to your payment processor and calculates every MRR component for you.
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
        <div className="mx-auto max-w-5xl grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Why Not Use a Spreadsheet?
            </h2>
            <p className="text-gray-400 leading-relaxed mb-8">
              Spreadsheets break. They require manual updates. They don&apos;t alert you when something goes wrong.
              AI Finance Ops updates automatically, sends alerts when churn spikes, and gives you a dashboard
              you can check in 30 seconds.
            </p>
            <div className="space-y-4">
              {REASONS.map((r) => (
                <div key={r.title} className="flex items-start gap-3">
                  <r.icon className="h-5 w-5 text-red-400 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-sm font-medium text-white">{r.title}</div>
                    <div className="text-xs text-gray-500">{r.desc}</div>
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
                "Automatic sync with Stripe & payment processors",
                "Real-time MRR dashboard",
                "Churn spike alerts",
                "30-second daily check-in",
                "No manual data entry",
              ].map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm text-gray-300">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Start tracking MRR in 2 minutes
          </h2>
          <p className="text-gray-400 mb-8">
            Connect your payment processor and get your first MRR dashboard immediately.
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
  )
}
