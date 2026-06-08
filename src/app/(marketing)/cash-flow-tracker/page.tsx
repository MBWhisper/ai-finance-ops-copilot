import type { Metadata } from "next"
import Link from "next/link"
import { InternalLinks } from "@/components/InternalLinks"
import { TrendingUp, BarChart2, AlertCircle, Check } from "lucide-react"

export const metadata: Metadata = {
  title: "SaaS Cash Flow Tracker — Free Tool | AI Finance Ops",
  description:
    "Track and forecast SaaS cash flow in real time. Understand burn rate, runway, and 90-day cash projections without spreadsheets.",
  openGraph: {
    title: "SaaS Cash Flow Tracker — Free Tool | AI Finance Ops",
    description: "Track and forecast SaaS cash flow in real time. Understand burn rate, runway, and 90-day cash projections.",
    url: "https://aifinanceops.app/cash-flow-tracker",
    siteName: "AI Finance Ops",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "SaaS Cash Flow Tracker" }],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "SaaS Cash Flow Tracker — Free Tool | AI Finance Ops",
    description: "Track and forecast SaaS cash flow in real time.",
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
          SaaS Cash Flow Tracker<br />
          <span className="text-emerald-400">& 90-Day Forecast</span>
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
          Stop guessing your cash position. Track inflows, outflows, and get a 90-day{" "}
          <Link href="/blog/90-day-cash-flow-forecast" className="text-emerald-400 hover:underline">
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
            <Link href="/churn-calculator" className="text-emerald-400 hover:underline">churn rate</Link>, and{" "}
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
  )
}
