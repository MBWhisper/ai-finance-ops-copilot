import type { Metadata } from "next"
import Link from "next/link"
import { InternalLinks } from "@/components/InternalLinks"
import { AlertTriangle, Check, ChevronDown } from "lucide-react"

export const metadata: Metadata = {
  title: "SaaS Financial Dashboard: Track MRR, Churn & Cash Flow (2026)",
  description:
    "The SaaS financial dashboard built for founders. Track MRR, churn rate, LTV, cash flow, and runway in one place. Connect Stripe in 5 minutes — free to start.",
  alternates: {
    canonical: "https://aifinanceops.app/saas-financial-dashboard",
  },
  openGraph: {
    title: "SaaS Financial Dashboard: Track MRR, Churn & Cash Flow (2026)",
    description:
      "Track MRR, churn rate, LTV, cash flow, and runway in one SaaS financial dashboard. Connect Stripe in 5 minutes — free to start.",
    url: "https://aifinanceops.app/saas-financial-dashboard",
    siteName: "AI Finance Ops",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "SaaS Financial Dashboard" }],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "SaaS Financial Dashboard: Track MRR, Churn & Cash Flow (2026)",
    description:
      "Track MRR, churn rate, LTV, cash flow, and runway in one SaaS financial dashboard. Connect Stripe in 5 minutes — free to start.",
    images: ["/og-image.png"],
  },
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What should a SaaS financial dashboard include?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A SaaS financial dashboard should include MRR/ARR tracking, churn rate, customer lifetime value (LTV), cash flow projections, runway estimates, and growth trends. These core metrics give founders a complete picture of financial health and growth trajectory.",
      },
    },
    {
      "@type": "Question",
      name: "What is the best SaaS dashboard for startups?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "AI Finance Ops is the best SaaS dashboard for startups. It offers a free tier, AI-powered forecasting, and a 5-minute Stripe setup — no spreadsheets required. Track MRR, churn, LTV, and cash flow in one clean dashboard.",
      },
    },
    {
      "@type": "Question",
      name: "How do I create a SaaS financial dashboard?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Connect your Stripe account to AI Finance Ops. Your dashboard is automatic — no spreadsheets needed. In under 5 minutes you will see MRR, churn rate, LTV, cash flow, and runway updated in real time from your Stripe data.",
      },
    },
    {
      "@type": "Question",
      name: "What's the difference between a SaaS dashboard and a regular financial dashboard?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A SaaS dashboard tracks recurring metrics like MRR, churn rate, and LTV — not just revenue and expenses. Regular financial dashboards focus on P&L and balance sheets, which miss the subscription-specific metrics that drive SaaS growth decisions.",
      },
    },
  ],
}

const PAIN_POINTS = [
  {
    icon: AlertTriangle,
    title: "Manual updates waste hours",
    desc: "Copy-pasting from Stripe into spreadsheets takes 2–3 hours every week — time you could spend building product.",
  },
  {
    icon: AlertTriangle,
    title: "One wrong cell breaks everything",
    desc: "A single formula error silently corrupts months of MRR data. No warnings, no rollback.",
  },
  {
    icon: AlertTriangle,
    title: "No real-time visibility",
    desc: "Spreadsheets are snapshots from yesterday. You cannot see churn spikes or revenue drops as they happen.",
  },
  {
    icon: AlertTriangle,
    title: "No investor-ready reports",
    desc: "Manually formatting MRR charts and runway projections for investor updates takes hours every month.",
  },
]

const CORE_METRICS = [
  {
    title: "MRR & ARR",
    desc: "Monthly and Annual Recurring Revenue — the heartbeat of your SaaS. Track new, expansion, contraction, and churned MRR components automatically.",
    href: "/mrr-tracker",
    linkLabel: "Track MRR →",
  },
  {
    title: "Churn Rate",
    desc: "See exactly how many customers and how much revenue you lose each month. Spot churn spikes before they compound into a crisis.",
    href: "/churn-rate-calculator",
    linkLabel: "Calculate churn →",
  },
  {
    title: "LTV & LTV:CAC",
    desc: "Customer Lifetime Value and the ratio that tells you if your acquisition spend is sustainable. Know your unit economics at a glance.",
    href: "/ltv-calculator",
    linkLabel: "Calculate LTV →",
  },
  {
    title: "Cash Flow & Burn Rate",
    desc: "Track inflows and outflows in real time. See your monthly burn rate and how it trends over the last 90 days.",
    href: "/cash-flow-tracker",
    linkLabel: "Track cash flow →",
  },
  {
    title: "Runway",
    desc: "Know exactly how many months of cash you have left. AI models your runway 12 months ahead based on current trajectory.",
    href: "/runway-calculator",
    linkLabel: "Calculate runway →",
  },
  {
    title: "Expansion & Contraction MRR",
    desc: "See which customers upgrade and which downgrade. Expansion MRR is the hidden growth lever most founders ignore.",
    href: "/mrr-tracker",
    linkLabel: "See breakdown →",
  },
]

const COMPARISON_ROWS = [
  { label: "Real-time MRR/ARR", dashboard: true, spreadsheet: false },
  { label: "Churn tracking", dashboard: true, spreadsheet: false },
  { label: "LTV & LTV:CAC ratio", dashboard: true, spreadsheet: "Manual calc" },
  { label: "Cash flow projections", dashboard: true, spreadsheet: "Manual input" },
  { label: "Runway forecasting", dashboard: true, spreadsheet: false },
  { label: "AI-powered insights", dashboard: true, spreadsheet: false },
  { label: "Automated reports", dashboard: true, spreadsheet: false },
  { label: "Setup time", dashboard: "5 minutes", spreadsheet: "2–3 hours" },
]

const STEPS = [
  {
    n: "01",
    title: "Connect Stripe",
    desc: "One OAuth click. We pull your revenue history, active subscriptions, and churn events — read-only, never write.",
  },
  {
    n: "02",
    title: "See your dashboard",
    desc: "MRR, churn rate, LTV, cash flow, and runway — all calculated and displayed in a single clean view.",
  },
  {
    n: "03",
    title: "Get AI insights",
    desc: "The AI copilot explains why your MRR dropped, which customers churned, and what to do about it — automatically.",
  },
]

const PERSONAS = [
  {
    title: "Solo SaaS founders",
    desc: "Running a one-person show? Get financial clarity without hiring a CFO or wrestling with spreadsheets.",
  },
  {
    title: "Bootstrapped teams (2–10 people)",
    desc: "Track unit economics, burn rate, and runway so you can grow sustainably without external funding.",
  },
  {
    title: "Seed-stage startups post-raise",
    desc: "Give your board real-time financial dashboards instead of monthly spreadsheet exports.",
  },
  {
    title: "Finance-adjacent operators",
    desc: "Ops leads and GMs who need SaaS metrics without digging through Stripe or your accounting tool.",
  },
]

const FAQS = [
  {
    q: "What should a SaaS financial dashboard include?",
    a: "MRR/ARR, churn rate, LTV, cash flow, runway, and growth trends. These core metrics give founders a complete picture of financial health and growth trajectory.",
  },
  {
    q: "What is the best SaaS dashboard for startups?",
    a: "AI Finance Ops offers a free tier, AI-powered forecasting, and a 5-minute Stripe setup. Track MRR, churn, LTV, and cash flow in one clean dashboard.",
  },
  {
    q: "How do I create a SaaS financial dashboard?",
    a: "Connect your Stripe account to AI Finance Ops. Your dashboard is automatic — no spreadsheets needed. In under 5 minutes you will see MRR, churn rate, LTV, cash flow, and runway updated in real time.",
  },
  {
    q: "What's the difference between a SaaS dashboard and a regular financial dashboard?",
    a: "A SaaS dashboard tracks recurring metrics like MRR, churn rate, and LTV — not just revenue and expenses. Regular financial dashboards focus on P&L and balance sheets, which miss the subscription-specific metrics that drive SaaS growth decisions.",
  },
]

export default function SaasFinancialDashboardPage() {
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
            SaaS Financial Dashboard
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-6">
            The SaaS Financial Dashboard
            <br />
            <span className="text-emerald-400">Every Founder Needs</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-4">
            Track MRR, churn rate, LTV, cash flow, and runway in one place.
            Connect Stripe in 5 minutes — no spreadsheets, no manual work.
          </p>
          <p className="text-sm text-gray-500 max-w-xl mx-auto mb-8">
            MRR &middot; Churn &middot; LTV &middot; Cash Flow &middot; Runway &middot; Growth Trends — all calculated automatically.
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
        </section>

        {/* Why Spreadsheets Fail */}
        <section className="border-t border-gray-800 bg-gray-900/30 px-6 py-20">
          <div className="mx-auto max-w-5xl grid md:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Why Spreadsheets Fail for SaaS
              </h2>
              <p className="text-gray-400 leading-relaxed mb-8">
                Spreadsheets seem like the easy option. But as your SaaS grows, they become the biggest
                source of errors and wasted time. Here is why founders switch to a dedicated dashboard:
              </p>
              <div className="space-y-5">
                {PAIN_POINTS.map((r) => (
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
                <span className="text-xs font-semibold tracking-widest uppercase text-emerald-400">
                  AI Finance Ops
                </span>
              </div>
              <ul className="space-y-3">
                {[
                  "Automatic sync with Stripe every hour",
                  "Real-time MRR, churn, LTV, cash flow",
                  "Churn spike alerts via email",
                  "12-month runway forecast",
                  "Investor-ready reports in one click",
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
                <div className="text-2xl font-bold text-white">Under 5 minutes</div>
                <div className="text-xs text-gray-500">Connect Stripe → get your full SaaS dashboard</div>
              </div>
            </div>
          </div>
        </section>

        {/* What Your Dashboard Should Track */}
        <section className="border-t border-gray-800 px-6 py-20">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
              What Your Dashboard Should Track
            </h2>
            <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
              Six core metrics every SaaS founder needs — tracked automatically from your Stripe data.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {CORE_METRICS.map((m) => (
                <div
                  key={m.title}
                  className="border border-gray-800 bg-gray-900/50 rounded-xl p-6 hover:border-gray-700 transition-colors"
                >
                  <div className="text-base font-semibold text-white mb-2">{m.title}</div>
                  <div className="text-sm text-gray-400 leading-relaxed mb-4">{m.desc}</div>
                  <Link
                    href={m.href}
                    className="text-sm text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
                  >
                    {m.linkLabel}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Dashboard vs Spreadsheet */}
        <section className="border-t border-gray-800 px-6 py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold text-white text-center mb-4">
              Dashboard vs Spreadsheet
            </h2>
            <p className="text-gray-400 text-center mb-12">
              Side-by-side comparison of what you get with each approach.
            </p>
            <div className="overflow-x-auto rounded-2xl border border-gray-800 bg-gray-900/50">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th scope="col" className="p-5 text-sm font-semibold text-gray-500 w-1/3" />
                    <th scope="col" className="p-5 text-sm font-semibold text-emerald-400 w-1/3">
                      SaaS Dashboard
                    </th>
                    <th scope="col" className="p-5 text-sm font-semibold text-gray-400 w-1/3">
                      Spreadsheet
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_ROWS.map((row) => (
                    <tr
                      key={row.label}
                      className="border-b border-gray-800/50 last:border-0"
                    >
                      <td className="p-5 text-sm text-gray-500 font-medium">{row.label}</td>
                      <td className="p-5 text-sm text-emerald-300 font-medium">
                        {typeof row.dashboard === "boolean"
                          ? row.dashboard
                            ? "✓"
                            : "✗"
                          : row.dashboard}
                      </td>
                      <td className="p-5 text-sm text-gray-400">
                        {typeof row.spreadsheet === "boolean"
                          ? row.spreadsheet
                            ? "✓"
                            : "✗"
                          : row.spreadsheet}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* How AI Finance Ops Works */}
        <section className="border-t border-gray-800 bg-gray-900/30 px-6 py-20">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
              How AI Finance Ops Works
            </h2>
            <p className="text-gray-400 text-center mb-12">
              From Stripe connection to full SaaS dashboard in under 5 minutes.
            </p>
            <div className="space-y-0 divide-y divide-gray-800 border-y border-gray-800">
              {STEPS.map((step) => (
                <div
                  key={step.n}
                  className="grid grid-cols-[2.5rem_1fr] sm:grid-cols-[3rem_1fr] gap-4 sm:gap-6 py-6 items-start"
                >
                  <div className="text-xl sm:text-2xl font-bold text-emerald-400/30 tabular-nums pt-0.5">
                    {step.n}
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-1.5">
                      {step.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Who This Is For */}
        <section className="border-t border-gray-800 px-6 py-20">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
              Who This Is For
            </h2>
            <p className="text-gray-400 text-center mb-12">
              Built for founders and operators who need SaaS metrics without the complexity.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {PERSONAS.map((p) => (
                <div
                  key={p.title}
                  className="border border-gray-800 bg-gray-900/50 rounded-xl p-6 hover:border-gray-700 transition-colors"
                >
                  <div className="text-base font-semibold text-white mb-2">{p.title}</div>
                  <div className="text-sm text-gray-400 leading-relaxed">{p.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-gray-800 px-6 py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold text-white mb-10 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {FAQS.map((faq) => (
                <details
                  key={faq.q}
                  className="group border border-gray-800 rounded-xl bg-gray-900/50"
                >
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
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              See your SaaS finances clearly
            </h2>
            <p className="text-gray-400 mb-8">
              Connect Stripe and get your complete SaaS financial dashboard immediately. Free to start, no credit card required.
            </p>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-8 py-3 text-base font-medium text-white hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/25 hover:-translate-y-0.5"
            >
              Try AI Finance Ops free
            </Link>
          </div>
        </section>

        {/* Internal Links */}
        <InternalLinks variant="mixed" title="Related Tools & Guides" />
      </div>
    </>
  )
}
