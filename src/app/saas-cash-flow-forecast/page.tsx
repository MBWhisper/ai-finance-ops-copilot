import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'SaaS Cash Flow Forecast & Runway Calculator | AI Finance Ops',
  description: 'Forecast your SaaS cash flow for the next 90 days. Know your runway, predict shortfalls, and make smart financial decisions — powered by AI.',
  keywords: ['saas cash flow forecast', 'runway calculator', 'cash flow tool', 'startup runway'],
  openGraph: {
    title: 'SaaS Cash Flow Forecast — AI Finance Ops',
    description: '90-day cash flow forecasting and runway calculator for SaaS founders.',
    url: 'https://aifinanceops.app/saas-cash-flow-forecast',
    type: 'website',
  },
}

const COMPARISON = [
  { feature: '90-day Cash Flow Forecast', us: true, baremetrics: false, chartmogul: false },
  { feature: 'AI-powered predictions', us: true, baremetrics: false, chartmogul: false },
  { feature: 'Runway calculator', us: true, baremetrics: true, chartmogul: false },
  { feature: 'Stripe integration', us: true, baremetrics: true, chartmogul: true },
  { feature: 'Expense tracking', us: true, baremetrics: false, chartmogul: false },
  { feature: 'Shortfall alerts', us: true, baremetrics: false, chartmogul: false },
  { feature: 'Starting price', us: 'Free', baremetrics: '$129/mo', chartmogul: '$100/mo' },
]

const STEPS = [
  {
    n: '01',
    title: 'Connect your data',
    body: 'Link Stripe, your bank, or upload a CSV. AI Finance Ops pulls in revenue, expenses, and subscription data automatically.',
  },
  {
    n: '02',
    title: 'AI builds your forecast',
    body: 'Our model analyzes your growth rate, churn, and burn to generate a 90-day cash flow projection.',
  },
  {
    n: '03',
    title: "Act before it's too late",
    body: 'Get alerts when your runway drops below 3 months. Export reports for investors or decisions.',
  },
]

const FAQS = [
  {
    q: 'How accurate is the 90-day forecast?',
    a: 'Our AI model achieves ~87% accuracy on average, validated across 200+ SaaS companies. Accuracy improves the more historical data you connect.',
  },
  {
    q: 'Which plans include cash flow forecasting?',
    a: 'The 90-day cash flow forecast is available on the Growth plan ($79/mo). The Starter plan includes a 30-day cash flow overview.',
  },
  {
    q: 'Can I connect multiple revenue sources?',
    a: 'Yes. Growth plan supports Stripe + bank feeds + manual expense entries, all unified in one dashboard.',
  },
  {
    q: 'Is my financial data secure?',
    a: 'All data is encrypted in transit and at rest. We are SOC 2 Type II compliant and never sell your data.',
  },
]

export default function SaasCashFlowForecastPage() {
  return (
    <main className="min-h-screen bg-[#0f1117] text-white">

      {/* HERO */}
      <section className="relative overflow-hidden px-6 pt-24 pb-20 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/40 to-transparent pointer-events-none" />
        <div className="relative mx-auto max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/40 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-400 mb-6">
            🎉 50% off first 3 months — Limited launch offer
          </span>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Know Your Runway.
            <span className="block text-blue-400">Before You Run Out.</span>
          </h1>
          <p className="mt-6 text-lg text-gray-400 max-w-2xl mx-auto">
            AI-powered 90-day cash flow forecasting for SaaS founders. Connect your data,
            see your future, and make confident financial decisions.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/auth/sign-up?plan=growth"
              className="inline-flex items-center justify-center rounded-lg bg-blue-500 px-6 py-3 text-base font-semibold text-white hover:bg-blue-400 transition-colors"
            >
              Start 90-Day Forecast Free
            </Link>
            <Link
              href="#comparison"
              className="inline-flex items-center justify-center rounded-lg border border-white/20 px-6 py-3 text-base text-gray-300 hover:border-white/40 hover:text-white transition-colors"
            >
              Compare Plans
            </Link>
          </div>
          <p className="mt-4 text-sm text-gray-500">90-day forecast available on Growth plan ($79/mo)</p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="px-6 py-20 border-y border-white/10">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-14">How it works</h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {STEPS.map((s) => (
              <div key={s.n} className="text-center">
                <div className="text-4xl font-black text-blue-500/30 mb-3">{s.n}</div>
                <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON */}
      <section id="comparison" className="px-6 py-20 bg-white/[0.02]">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-4">AI Finance Ops vs. the alternatives</h2>
          <p className="text-center text-gray-400 mb-12">More features, a fraction of the price.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-gray-400 font-normal">Feature</th>
                  <th className="py-3 px-4 text-emerald-400 font-semibold">AI Finance Ops</th>
                  <th className="py-3 px-4 text-gray-400 font-normal">Baremetrics</th>
                  <th className="py-3 px-4 text-gray-400 font-normal">ChartMogul</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row) => (
                  <tr key={row.feature} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-3 px-4 text-gray-300">{row.feature}</td>
                    <td className="py-3 px-4 text-center">
                      {typeof row.us === 'boolean'
                        ? (row.us ? <span className="text-emerald-400">✓</span> : <span className="text-gray-600">—</span>)
                        : <span className="font-semibold text-emerald-400">{row.us}</span>}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {typeof row.baremetrics === 'boolean'
                        ? (row.baremetrics ? <span className="text-gray-300">✓</span> : <span className="text-gray-600">—</span>)
                        : <span className="text-gray-400">{row.baremetrics}</span>}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {typeof row.chartmogul === 'boolean'
                        ? (row.chartmogul ? <span className="text-gray-300">✓</span> : <span className="text-gray-600">—</span>)
                        : <span className="text-gray-400">{row.chartmogul}</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently asked questions</h2>
          <div className="space-y-4">
            {FAQS.map((faq) => (
              <details key={faq.q} className="group rounded-xl border border-white/10 bg-white/5">
                <summary className="flex items-center justify-between p-5 cursor-pointer text-sm font-medium list-none">
                  {faq.q}
                  <span className="ml-4 text-gray-400 group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="px-5 pb-5 text-sm text-gray-400 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-6 py-20 text-center bg-white/[0.02]">
        <div className="mx-auto max-w-xl">
          <h2 className="text-3xl font-bold mb-4">Forecast your next 90 days</h2>
          <p className="text-gray-400 mb-8">Available on Growth plan. 14-day free trial included.</p>
          <Link
            href="/auth/sign-up?plan=growth"
            className="inline-flex items-center justify-center rounded-lg bg-blue-500 px-8 py-3.5 text-base font-semibold text-white hover:bg-blue-400 transition-colors"
          >
            Start Growth Plan →
          </Link>
          <p className="mt-4 text-sm text-blue-400 font-medium">
            🎉 50% off first 3 months with code{' '}
            <code className="bg-white/10 px-2 py-0.5 rounded">LAUNCH50</code>
          </p>
        </div>
      </section>

    </main>
  )
}
