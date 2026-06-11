import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'SaaS Cash Flow Forecast Tool | AI Finance Ops',
  description: 'Predict your SaaS cash flow and runway with AI-powered forecasting. Built for bootstrapped founders who need to know exactly how many months of runway they have.',
  keywords: ['saas cash flow forecast', 'runway calculator', 'saas financial planning', 'cash flow tool'],
  alternates: {
    canonical: 'https://aifinanceops.app/saas-cash-flow-forecast',
  },
  openGraph: {
    title: 'SaaS Cash Flow Forecast Tool — AI Finance Ops',
    description: 'Predict your SaaS cash flow and runway with AI. Know exactly when you hit zero — and what levers to pull.',
    url: 'https://aifinanceops.app/saas-cash-flow-forecast',
    siteName: 'AI Finance Ops',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'SaaS Cash Flow Forecast' }],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SaaS Cash Flow Forecast Tool — AI Finance Ops',
    description: 'Predict your SaaS cash flow and runway with AI. Know exactly when you hit zero — and what levers to pull.',
    images: ['/og-image.png'],
  },
}

const FEATURES = [
  {
    title: '12-Month Cash Flow Projection',
    description: 'Get a month-by-month cash flow forecast based on your current MRR, growth rate, and burn. No guesswork.',
  },
  {
    title: 'Runway Calculator',
    description: 'Know your exact runway in months. See how changes in churn, pricing, or expenses affect your zero-cash date.',
  },
  {
    title: 'Scenario Planning',
    description: 'Run best-case, worst-case, and base-case scenarios to stress-test your financial model before committing.',
  },
  {
    title: 'AI Cash Flow Copilot',
    description: 'Ask plain-English questions: "What happens if I raise prices 20%?" Get instant model updates.',
  },
]

const COMPARISON = [
  { feature: 'Cash flow forecast', us: true, baremetrics: false, chartmogul: false },
  { feature: 'Runway calculator', us: true, baremetrics: true, chartmogul: false },
  { feature: 'Scenario planning', us: true, baremetrics: false, chartmogul: false },
  { feature: 'AI Copilot chat', us: true, baremetrics: false, chartmogul: false },
  { feature: 'MRR + ARR tracking', us: true, baremetrics: true, chartmogul: true },
  { feature: 'Starting price', us: '$0', baremetrics: '$129/mo', chartmogul: '$199/mo' },
]

export default function SaasCashFlowForecastPage() {
  return (
    <main className="min-h-screen bg-[#0f1117] text-white">

      {/* HERO */}
      <section className="relative overflow-hidden px-6 pt-24 pb-20 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/40 to-transparent pointer-events-none" />
        <div className="relative mx-auto max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/40 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-400 mb-6">
            Forecast your runway before you need to
          </span>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            SaaS Cash Flow Forecast
            <span className="block text-blue-400">That Actually Works</span>
          </h1>
          <p className="mt-6 text-lg text-gray-400 max-w-2xl mx-auto">
            Know exactly how many months of runway you have. Model your cash flow 12 months ahead
            using real Stripe data — updated automatically every day.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/register"
              className="inline-flex items-center justify-center rounded-lg bg-blue-500 px-6 py-3 text-base font-semibold text-white hover:bg-blue-400 transition-colors"
            >
              Start Free — No credit card
            </Link>
            <Link
              href="/runway-calculator"
              className="inline-flex items-center justify-center rounded-lg border border-white/20 px-6 py-3 text-base text-gray-300 hover:border-white/40 hover:text-white transition-colors"
            >
              Try Runway Calculator Free
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-4">Built for bootstrapped founders</h2>
          <p className="text-center text-gray-400 mb-14 max-w-xl mx-auto">
            Not just charts — a complete cash flow intelligence system that tells you what to do next.
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            {FEATURES.map((f) => (
              <div key={f.title} className="rounded-xl border border-white/10 bg-white/5 p-6 hover:border-blue-500/40 hover:bg-blue-500/5 transition-colors">
                <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="px-6 py-20 bg-white/[0.02]">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-4">How we compare</h2>
          <p className="text-center text-gray-400 mb-12">Full cash flow forecasting at a fraction of the cost.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 text-gray-400 font-medium">Feature</th>
                  <th className="text-center py-3 text-blue-400 font-semibold">AI Finance Ops</th>
                  <th className="text-center py-3 text-gray-400 font-medium">Baremetrics</th>
                  <th className="text-center py-3 text-gray-400 font-medium">ChartMogul</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row) => (
                  <tr key={row.feature} className="border-b border-white/5">
                    <td className="py-3 text-gray-300">{row.feature}</td>
                    <td className="py-3 text-center">
                      {typeof row.us === 'boolean'
                        ? <span className={row.us ? 'text-blue-400' : 'text-gray-600'}>{row.us ? '✓' : '✗'}</span>
                        : <span className="text-blue-400 font-semibold">{row.us}</span>}
                    </td>
                    <td className="py-3 text-center">
                      {typeof row.baremetrics === 'boolean'
                        ? <span className={row.baremetrics ? 'text-gray-300' : 'text-gray-600'}>{row.baremetrics ? '✓' : '✗'}</span>
                        : <span className="text-gray-400">{row.baremetrics}</span>}
                    </td>
                    <td className="py-3 text-center">
                      {typeof row.chartmogul === 'boolean'
                        ? <span className={row.chartmogul ? 'text-gray-300' : 'text-gray-600'}>{row.chartmogul ? '✓' : '✗'}</span>
                        : <span className="text-gray-400">{row.chartmogul}</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 text-center">
        <div className="mx-auto max-w-xl">
          <h2 className="text-3xl font-bold mb-4">Know your runway. Plan your growth.</h2>
          <p className="text-gray-400 mb-8">Free plan available. Connect Stripe in 60 seconds. No credit card required.</p>
          <Link
            href="/register"
            className="inline-flex items-center justify-center rounded-lg bg-blue-500 px-8 py-3.5 text-base font-semibold text-white hover:bg-blue-400 transition-colors"
          >
            Get Started Free
          </Link>
        </div>
      </section>

    </main>
  )
}
