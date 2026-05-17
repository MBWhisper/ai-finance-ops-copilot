import type { Metadata } from "next"
import Link from "next/link"
import { OptimizedImage } from "@/components/OptimizedImage"
import { DollarSign, TrendingUp, Calendar, Check } from "lucide-react"

export const metadata: Metadata = {
  title: "Free Cash Flow Tracker for SaaS — AI Finance Ops",
  description:
    "Track your SaaS cash flow automatically. See 30-day and 90-day forecasts. No spreadsheets required.",
  openGraph: {
    title: "Free Cash Flow Tracker for SaaS — AI Finance Ops",
    description:
      "Track your SaaS cash flow automatically. See 30-day and 90-day forecasts. No spreadsheets required.",
    url: "https://www.aifinanceops.app/cash-flow-tracker",
    siteName: "AI Finance Ops",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "AI Finance Ops Cash Flow Tracker" }],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Cash Flow Tracker for SaaS — AI Finance Ops",
    description:
      "Track your SaaS cash flow automatically. See 30-day and 90-day forecasts. No spreadsheets required.",
    images: ["/og-image.png"],
  },
}

export default function CashFlowTrackerPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 pt-32 pb-16 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold tracking-widest uppercase text-emerald-400 mb-6">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          Free Tool
        </div>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-6">
          Cash Flow Tracker<br />
          <span className="text-emerald-400">for SaaS</span>
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
          Stop guessing your runway. AI Finance Ops automatically tracks your cash flow and forecasts
          30 to 90 days ahead.
        </p>
        <Link
          href="/register"
          className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-8 py-3 text-base font-medium text-white hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/25 hover:-translate-y-0.5"
        >
          Track cash flow — start free
        </Link>
        <OptimizedImage
          src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=630&fit=crop"
          alt="Cash flow forecast dashboard showing projected revenue and expenses"
          className="w-full max-w-4xl mx-auto mt-12 rounded-xl aspect-video object-cover shadow-2xl"
          width={1200}
          height={630}
        />
      </section>

      {/* Key Features */}
      <section className="border-t border-gray-800 px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: DollarSign, label: "Cash Balance", desc: "Know exactly how much cash you have right now." },
              { icon: TrendingUp, label: "30-Day Forecast", desc: "See next month's inflow and outflow projections." },
              { icon: Calendar, label: "90-Day Forecast", desc: "Plan ahead with P50, P80, and P95 scenarios." },
            ].map((f) => (
              <div
                key={f.label}
                className="border border-gray-800 bg-gray-900/50 rounded-xl p-6 text-center hover:border-gray-700 transition-colors"
              >
                <f.icon className="h-8 w-8 mx-auto mb-3 text-emerald-400" />
                <div className="text-sm font-semibold text-white mb-1">{f.label}</div>
                <div className="text-xs text-gray-500">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="border-t border-gray-800 bg-gray-900/30 px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
            Why Automate Cash Flow Tracking?
          </h2>
          <div className="space-y-4 max-w-lg mx-auto">
            {[
              "Manual cash flow tracking takes hours every month",
              "Spreadsheet errors can lead to bad business decisions",
              "Without forecasts, you can't plan for slow months",
              "AI Finance Ops updates your cash flow in real-time",
            ].map((f) => (
              <div key={f} className="flex items-start gap-3">
                <Check className="h-5 w-5 text-emerald-500 mt-0.5 shrink-0" />
                <span className="text-sm text-gray-300">{f}</span>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-8 py-3 text-base font-medium text-white hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/25 hover:-translate-y-0.5"
            >
              Try AI Finance Ops free
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
