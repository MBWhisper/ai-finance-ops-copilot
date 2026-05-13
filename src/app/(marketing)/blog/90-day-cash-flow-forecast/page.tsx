import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata = {
  title: "How to Build a 90-Day Cash Flow Forecast for Your SaaS | AI Finance Ops",
  description:
    "A step-by-step guide to building P50/P80/P95 confidence-band forecasts — and why spreadsheets always fail at this.",
}

export default function CashFlowForecastPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-300">
      <article className="mx-auto max-w-3xl px-6 py-16">
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Blog
        </Link>

        <h1 className="text-4xl font-bold text-white mb-4">
          How to Build a 90-Day Cash Flow Forecast for Your SaaS
        </h1>
        <div className="flex items-center gap-3 mb-8">
          <span className="inline-block rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
            Cash Flow
          </span>
          <span className="text-xs text-slate-500">May 8, 2026</span>
        </div>
        <div className="flex gap-4 text-sm text-slate-500 mb-12">
          <span>6 min read</span>
        </div>

        <p className="leading-relaxed mb-6 text-slate-300">
          Most SaaS founders discover they&apos;re running out of money 30 days too late.
          A 90-day cash flow forecast gives you the foresight to act before a crisis —
          not during one. Here&apos;s how to build one that actually works.
        </p>

        <h2 className="text-2xl font-bold text-white mt-12 mb-4">Why Spreadsheets Fail at Forecasting</h2>
        <p className="leading-relaxed mb-6 text-slate-300">
          Spreadsheets give you one number: a single best-guess. But the future
          isn&apos;t a single number — it&apos;s a range of possibilities.
        </p>
        <p className="leading-relaxed mb-4 text-slate-300">
          What you actually need are confidence bands:
        </p>
        <ul className="space-y-2 text-slate-300 mb-6">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
            <span><strong className="text-white">P50 (Most Likely):</strong> 50% chance cash stays above this level</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
            <span><strong className="text-white">P80 (Optimistic):</strong> 80% chance cash stays above this level</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
            <span><strong className="text-white">P95 (Conservative):</strong> 95% chance cash stays above this level</span>
          </li>
        </ul>
        <p className="leading-relaxed mb-6 text-slate-300">
          Spreadsheets can&apos;t calculate these automatically. They require statistical
          modeling based on your historical churn, growth rate, and revenue variance.
        </p>

        <h2 className="text-2xl font-bold text-white mt-12 mb-4">The 4 Inputs You Need</h2>
        <div className="grid gap-4 md:grid-cols-2 mb-8">
          {[
            { title: "Current MRR", desc: "Your baseline. Every forecast starts from today's recurring revenue." },
            { title: "Monthly Churn Rate", desc: "The % of customers who cancel each month. Even 2% churn compounds dramatically over 90 days." },
            { title: "New Customer Growth Rate", desc: "How many new customers do you acquire per month on average? Use the last 3 months." },
            { title: "Fixed Monthly Expenses", desc: "Salaries, hosting, tools, subscriptions. These determine your burn rate." },
          ].map((card) => (
            <div key={card.title} className="rounded-xl border border-slate-800 bg-slate-900 p-6">
              <h3 className="font-semibold text-white mb-2">{card.title}</h3>
              <p className="text-sm text-slate-400">{card.desc}</p>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold text-white mt-12 mb-4">Step-by-Step: Building Your 90-Day Forecast</h2>

        {[
          {
            title: "Calculate your Net Revenue Retention (NRR)",
            body: "NRR = (Starting MRR + Expansion MRR − Contraction MRR − Churn MRR) / Starting MRR × 100",
            note: "If NRR &gt; 100%, your existing customers are growing you. Under 100%, you're leaking.",
          },
          {
            title: "Project MRR for each of the next 90 days",
            body: "Month 1 MRR = Current MRR × (1 + growth rate − churn rate)",
            note: "Use your growth rate and churn rate to project forward.",
          },
          {
            title: "Subtract fixed expenses from projected MRR",
            body: "Net Cash Flow = Projected MRR − Fixed Monthly Expenses",
            note: "Do this for each month to get net cash flow.",
          },
          {
            title: "Run 3 scenarios using different churn assumptions",
            body: "P50: Use your average churn rate\nP80: Use average churn − 1 standard deviation\nP95: Use average churn + 1 standard deviation",
            note: "The standard deviation measures how much your churn varies month to month.",
          },
          {
            title: "Sum the cumulative cash balance across all 90 days",
            body: "Cumulative Balance = Starting Cash + Sum of Monthly Net Cash Flows",
            note: "If your P95 balance hits zero before day 90 — you have a runway problem.",
          },
        ].map((step, i) => (
          <div key={step.title} className="mb-8">
            <div className="flex items-start gap-4 mb-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-sm font-bold text-white">
                {i + 1}
              </span>
              <h3 className="text-lg font-semibold text-white">{step.title}</h3>
            </div>
            <div className="ml-11">
              <div className="rounded-xl bg-slate-800 p-4 font-mono text-emerald-400 mb-3 whitespace-pre-line">
                {step.body}
              </div>
              <p className="text-sm text-slate-400">{step.note}</p>
            </div>
          </div>
        ))}

        <h2 className="text-2xl font-bold text-white mt-12 mb-4">What to Do With the Forecast</h2>
        <ul className="space-y-2 text-slate-300 mb-8">
          {[
            "If P95 runway &lt; 60 days → cut non-essential expenses immediately",
            "If P50 runway &lt; 90 days → accelerate acquisition or explore funding",
            "If P80 runway &gt; 180 days → you have room to hire or invest in growth",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        {/* AFFILIATE CALLOUT */}
        <div className="rounded-xl border border-emerald-500/20 bg-slate-900 p-6 my-8">
          <div className="flex items-start gap-4">
            <span className="text-2xl">💰</span>
            <div>
              <h3 className="font-semibold text-white mb-2">Build wealth while you build your SaaS</h3>
              <p className="text-sm text-slate-400 mb-4">
                While your SaaS grows, smart founders also diversify. Binance is the world&apos;s
                leading crypto exchange — a simple way to start building a second income
                stream alongside your startup.
              </p>
              <a
                href="https://www.binance.com/register?ref=782089850"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                Create your free Binance account →
              </a>
              <p className="text-xs text-slate-600 mt-2">
                (Affiliate link — we may earn a small commission at no cost to you)
              </p>
            </div>
          </div>
        </div>

        {/* MAIN CTA */}
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-8 text-center my-8">
          <h3 className="text-xl font-bold text-white mb-3">Get Your 90-Day Forecast Automatically</h3>
          <p className="text-slate-400 mb-6">
            AI Finance Ops calculates P50/P80/P95 confidence bands from your Stripe data —
            no spreadsheets, no formulas, no guessing.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-400 transition-colors"
          >
            Start Free 14-Day Trial →
          </Link>
        </div>
      </article>
    </div>
  )
}
