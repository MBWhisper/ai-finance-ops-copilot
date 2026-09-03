import type { Metadata } from "next"
import Link from "next/link"
import { OptimizedImage } from "@/components/OptimizedImage"
import { FaqSchema } from "@/components/FaqSchema"
import { InternalLinks } from "@/components/InternalLinks"
import { FileText, Clock, BarChart3, Check, Zap, ArrowRight, TrendingUp, AlertCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Automate SaaS Reporting — AI Finance Ops",
  description:
    "Automate your SaaS financial reporting. Get MRR, churn, cash flow, and KPI reports generated automatically.",
  alternates: { canonical: 'https://aifinanceops.app/automate-reporting' },
  openGraph: {
    title: "Automate SaaS Reporting — AI Finance Ops",
    description:
      "Automate your SaaS financial reporting. Get MRR, churn, cash flow, and KPI reports generated automatically.",
    url: "https://aifinanceops.app/automate-reporting",
    siteName: "AI Finance Ops",
    images: [{ url: "https://aifinanceops.app/og-image.png", width: 1200, height: 630, alt: "Automate SaaS Reporting with AI Finance Ops" }],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Automate SaaS Reporting — AI Finance Ops",
    description:
      "Automate your SaaS financial reporting. Get MRR, churn, cash flow, and KPI reports generated automatically.",
    images: ["https://aifinanceops.app/og-image.png"],
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
        <OptimizedImage
          src="https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=1200&h=630&fit=crop"
          alt="Automated SaaS reporting dashboard with real-time metrics"
          className="w-full max-w-4xl mx-auto mt-12 rounded-xl aspect-video object-cover shadow-2xl"
          width={1200}
          height={630}
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
        </div>
      </section>

      {/* What's in Your Report */}
      <section className="border-t border-gray-800 px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
            What's in Your Automated Report
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Every report is generated from your live Stripe data. No manual updates, no copy-pasting, no formulas to break.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: TrendingUp, title: "MRR Summary", desc: "New MRR, expansion MRR, churned MRR, and net new MRR — broken down by plan, customer, and cohort. See exactly where your revenue is growing or shrinking." },
              { icon: AlertCircle, title: "Churn Analysis", desc: "Which customers churned this month, revenue impact, and early warning signs for at-risk accounts. Get alerts before churn happens, not after." },
              { icon: BarChart3, title: "Cash Flow Forecast", desc: "30-day, 60-day, and 90-day projections with P50/P80/P95 scenarios. Know exactly when you'll run out of cash — or when you'll hit profitability." },
              { icon: Clock, title: "Runway Tracker", desc: "Real-time runway calculation based on your current burn rate. See how hiring, pricing changes, or churn impact your months of runway." },
              { icon: FileText, title: "KPI Trends", desc: "LTV, CAC, LTV:CAC ratio, gross margin, and NRR tracked over time. Spot trends before they become problems." },
              { icon: Zap, title: "AI Insights", desc: "AI-powered recommendations based on your data. Get actionable suggestions for reducing churn, improving retention, and growing revenue." },
            ].map((f) => (
              <div
                key={f.title}
                className="border border-gray-800 bg-gray-900/50 rounded-xl p-6 hover:border-gray-700 transition-colors"
              >
                <f.icon className="h-8 w-8 text-emerald-400 mb-4" />
                <div className="text-base font-semibold text-white mb-2">{f.title}</div>
                <p className="text-sm text-gray-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Manual vs Automated */}
      <section className="border-t border-gray-800 bg-gray-900/30 px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
            Manual vs Automated Reporting
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="p-4 text-sm font-semibold text-gray-400">Metric</th>
                  <th className="p-4 text-sm font-semibold text-gray-400">Spreadsheets</th>
                  <th className="p-4 text-sm font-semibold text-emerald-400">AI Finance Ops</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {[
                  { metric: "Time per report", manual: "2-3 hours/week", auto: "0 minutes (automatic)" },
                  { metric: "Accuracy", manual: "Prone to formula errors", auto: "Always accurate (live data)" },
                  { metric: "Freshness", manual: "Outdated as soon as you export", auto: "Real-time, always current" },
                  { metric: "Historical trends", manual: "Manual chart creation", auto: "Automatic trend visualization" },
                  { metric: "Forecasting", manual: "Basic linear projection", auto: "AI-powered P50/P80/P95" },
                  { metric: "Sharing", manual: "Email Excel files", auto: "One-click shareable links" },
                  { metric: "Churn alerts", manual: "None", auto: "Automatic at-risk alerts" },
                  { metric: "Cost", manual: "Your time ($100+/hr)", auto: "Free plan available" },
                ].map((row) => (
                  <tr key={row.metric} className="border-b border-gray-800">
                    <td className="p-4 text-gray-300 font-medium">{row.metric}</td>
                    <td className="p-4 text-gray-500">{row.manual}</td>
                    <td className="p-4 text-emerald-400">{row.auto}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-t border-gray-800 px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
            How It Works
          </h2>
          <div className="space-y-8">
            {[
              { step: "1", title: "Connect Stripe", desc: "Authorize read-only access to your Stripe account. Takes 60 seconds. No API keys to manage." },
              { step: "2", title: "Configure Preferences", desc: "Choose which reports you want, how often, and who should receive them. Default settings work great for most founders." },
              { step: "3", title: "Receive Reports", desc: "Get automated reports delivered to your inbox or dashboard. Review insights in 30 seconds instead of 3 hours." },
            ].map((item) => (
              <div key={item.step} className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-lg">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-gray-800 bg-gray-900/30 px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {[
              { q: "What reports are included?", a: "MRR summary, churn analysis, cash flow forecast, runway tracker, KPI trends, and AI-powered insights. All reports are generated from your live Stripe data." },
              { q: "How often are reports generated?", a: "Reports are generated in real time as your data changes. You can also schedule daily, weekly, or monthly email digests." },
              { q: "Can I share reports with my team?", a: "Yes. Generate shareable links for any report or dashboard. Control who sees what with role-based access." },
              { q: "Is my Stripe data safe?", a: "AI Finance Ops uses read-only access. We cannot make changes to your Stripe account. All data is encrypted in transit and at rest." },
              { q: "Do I need to know SQL or Excel?", a: "No. AI Finance Ops calculates everything automatically. Connect Stripe and your reports are ready in minutes." },
            ].map((item) => (
              <div key={item.q} className="border border-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-3">{item.q}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Internal Links */}
      <section className="border-t border-gray-800 px-6 py-16">
        <InternalLinks variant="mixed" exclude="/automate-reporting" title="Related SaaS Finance Tools" limit={8} />
      </section>

      {/* CTA */}
      <section className="border-t border-gray-800 bg-gray-900/30 px-6 py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to automate your reporting?
        </h2>
        <p className="text-gray-400 mb-8 max-w-xl mx-auto">
          Join hundreds of SaaS founders who stopped building reports manually. Start free — no credit card required.
        </p>
        <Link
          href="/register"
          className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-8 py-3 text-base font-medium text-white hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/25 hover:-translate-y-0.5"
        >
          Start Free Trial <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      <FaqSchema items={[
        { question: "What reports are included?", answer: "MRR summary, churn analysis, cash flow forecast, runway tracker, KPI trends, and AI-powered insights. All reports are generated from your live Stripe data." },
        { question: "How often are reports generated?", answer: "Reports are generated in real time as your data changes. You can also schedule daily, weekly, or monthly email digests." },
        { question: "Can I share reports with my team?", answer: "Yes. Generate shareable links for any report or dashboard. Control who sees what with role-based access." },
        { question: "Is my Stripe data safe?", answer: "AI Finance Ops uses read-only access. We cannot make changes to your Stripe account. All data is encrypted in transit and at rest." },
        { question: "Do I need to know SQL or Excel?", answer: "No. AI Finance Ops calculates everything automatically. Connect Stripe and your reports are ready in minutes." },
      ]} />
    </div>
  )
}
