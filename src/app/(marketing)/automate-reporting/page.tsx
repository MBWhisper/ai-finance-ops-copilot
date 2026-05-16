import type { Metadata } from "next"
import Link from "next/link"
import { FileText, Clock, BarChart3, Check } from "lucide-react"

export const metadata: Metadata = {
  title: "Automate SaaS Reporting — AI Finance Ops",
  description:
    "Automate your SaaS financial reporting. Get MRR, churn, cash flow, and KPI reports generated automatically.",
  openGraph: {
    title: "Automate SaaS Reporting — AI Finance Ops",
    description:
      "Automate your SaaS financial reporting. Get MRR, churn, cash flow, and KPI reports generated automatically.",
    url: "https://www.aifinanceops.app/automate-reporting",
    siteName: "AI Finance Ops",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Automate SaaS Reporting with AI Finance Ops" }],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Automate SaaS Reporting — AI Finance Ops",
    description:
      "Automate your SaaS financial reporting. Get MRR, churn, cash flow, and KPI reports generated automatically.",
    images: ["/og-image.png"],
  },
}

export default function AutomateReportingPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 pt-32 pb-16 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold tracking-widest uppercase text-emerald-400 mb-6">
          <FileText className="h-3.5 w-3.5" />
          Automation
        </div>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-6">
          Automate SaaS<br />
          <span className="text-emerald-400">Financial Reporting</span>
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
          Stop building weekly reports from scratch. AI Finance Ops generates MRR, churn, cash flow,
          and KPI reports automatically — so you can focus on building.
        </p>
        <Link
          href="/register"
          className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-8 py-3 text-base font-medium text-white hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/25 hover:-translate-y-0.5"
        >
          Automate reports — start free
        </Link>
        <img
          src="https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=1200&h=630&fit=crop"
          alt="Automated SaaS reporting dashboard with real-time metrics"
          className="w-full max-w-4xl mx-auto mt-12 rounded-xl aspect-video object-cover shadow-2xl"
        />
      </section>

      {/* What You Get */}
      <section className="border-t border-gray-800 px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
            Reports That Generate Themselves
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: BarChart3, title: "KPI Dashboard", desc: "MRR, ARR, churn rate, LTV, and more — all updated in real time." },
              { icon: Clock, title: "Cash Flow Report", desc: "30-day and 90-day forecasts with P50/P80/P95 scenarios." },
              { icon: FileText, title: "Churn Analysis", desc: "See which customers churned, revenue impact, and at-risk accounts." },
            ].map((f) => (
              <div
                key={f.title}
                className="border border-gray-800 bg-gray-900/50 rounded-xl p-6 hover:border-gray-700 transition-colors"
              >
                <f.icon className="h-8 w-8 text-emerald-400 mb-4" />
                <div className="text-base font-semibold text-white mb-2">{f.title}</div>
                <p className="text-sm text-gray-500">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Automate */}
      <section className="border-t border-gray-800 bg-gray-900/30 px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Why Automate?
          </h2>
          <div className="space-y-4">
            {[
              "Manual reporting takes 2-3 hours per week — that's 120+ hours a year",
              "Automated reports are always accurate and always up-to-date",
              "AI-powered insights catch trends you might miss in spreadsheets",
              "Share reports with your team or investors in one click",
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
