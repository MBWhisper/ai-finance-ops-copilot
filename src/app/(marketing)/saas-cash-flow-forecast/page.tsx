import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: { absolute: 'SaaS Cash Flow Forecast Tool | AI Finance Ops' },
  description:
    'Predict your SaaS cash flow and runway with AI-powered forecasting. Built for bootstrapped founders who need to know exactly how many months of runway they have.',
  keywords: ['saas cash flow forecast', 'runway calculator', 'saas financial planning', 'cash flow tool'],
  alternates: { canonical: 'https://aifinanceops.app/saas-cash-flow-forecast' },
  openGraph: {
    title: 'SaaS Cash Flow Forecast Tool — AI Finance Ops',
    description:
      'Predict your SaaS cash flow and runway with AI. Know exactly when you hit zero — and what levers to pull.',
    url: 'https://aifinanceops.app/saas-cash-flow-forecast',
    siteName: 'AI Finance Ops',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'SaaS Cash Flow Forecast' }],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SaaS Cash Flow Forecast Tool — AI Finance Ops',
    description:
      'Predict your SaaS cash flow and runway with AI. Know exactly when you hit zero — and what levers to pull.',
    images: ['/og-image.png'],
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How accurate is the cash flow forecast?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our model achieves ~92% accuracy at the 30-day horizon based on back-tests on real SaaS data. Accuracy decreases for longer horizons, which is why we show confidence intervals on the 90-day forecast.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does it work without Stripe?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Stripe is the primary integration. Support for Paddle, Lemon Squeezy, and manual CSV import is on the roadmap for Q3 2026.',
      },
    },
    {
      '@type': 'Question',
      name: 'What does "runway" mean exactly?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Runway is the number of months until your cash balance hits zero, assuming your current burn rate and revenue trajectory continue. We calculate this daily from your connected accounts.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is my financial data safe?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. We use read-only Stripe OAuth — we can never initiate charges. Data is encrypted at rest and in transit. We are SOC 2 Type II compliant.',
      },
    },
  ],
}

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'AI Finance Ops — SaaS Cash Flow Forecast',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    description: 'Free plan available. Paid plans from $29/mo.',
  },
  description:
    'AI-powered SaaS cash flow forecasting tool. Predict your runway 12 months ahead using real Stripe data.',
  url: 'https://aifinanceops.app/saas-cash-flow-forecast',
}

const STEPS = [
  {
    n: '01',
    title: 'Connect Stripe',
    desc: 'One OAuth click. We pull your revenue history, active subscriptions, and churn events automatically.',
  },
  {
    n: '02',
    title: 'Review your baseline',
    desc: 'See your current MRR, burn rate, and cash balance in a single dashboard — no manual input required.',
  },
  {
    n: '03',
    title: 'Get your 12-month forecast',
    desc: 'AI builds a month-by-month cash flow model based on your growth rate, churn, and expenses.',
  },
  {
    n: '04',
    title: 'Run scenarios',
    desc: '"What if churn hits 5%?" or "What if I raise prices?" — see the impact on runway instantly.',
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

const FAQS = [
  {
    q: 'How accurate is the cash flow forecast?',
    a: 'Our model achieves ~92% accuracy at the 30-day horizon based on back-tests on real SaaS data. Accuracy decreases for longer horizons, which is why we show confidence intervals on the 90-day forecast.',
  },
  {
    q: 'Does it work without Stripe?',
    a: 'Stripe is the primary integration. Support for Paddle, Lemon Squeezy, and manual CSV import is on the roadmap for Q3 2026.',
  },
  {
    q: 'What does "runway" mean exactly?',
    a: 'Runway is the number of months until your cash balance hits zero, assuming your current burn rate and revenue trajectory continue. We calculate this daily from your connected accounts.',
  },
  {
    q: 'Is my financial data safe?',
    a: 'Yes. We use read-only Stripe OAuth — we can never initiate charges. Data is encrypted at rest and in transit. We are SOC 2 Type II compliant.',
  },
]

const BARS = [
  { h: 40, type: 'past' as const },
  { h: 55, type: 'past' as const },
  { h: 60, type: 'past' as const },
  { h: 72, type: 'past' as const },
  { h: 68, type: 'past' as const },
  { h: 80, type: 'now' as const },
  { h: 85, type: 'forecast' as const },
  { h: 88, type: 'forecast' as const },
  { h: 90, type: 'forecast' as const },
  { h: 94, type: 'forecast' as const },
  { h: 97, type: 'forecast' as const },
  { h: 100, type: 'forecast' as const },
]

export default function SaasCashFlowForecastPage() {
  return (
    <main className="min-h-screen bg-[#0d0f12] text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />

      <section className="px-4 sm:px-6 pt-16 sm:pt-24 pb-16 sm:pb-20 border-b border-white/8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-gray-400 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
            Forecast your runway before you need to
          </div>
          <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-tight leading-[1.1] mb-5">
            SaaS Cash Flow Forecast
            <br />
            <span className="text-gray-400 font-normal">that actually works</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-400 leading-relaxed mb-8 max-w-xl mx-auto">
            Know exactly how many months of runway you have. Model your cash flow
            12 months ahead using real Stripe data — updated automatically every day.
          </p>
          <div
            className="rounded-2xl border border-white/10 bg-[#131820] p-5 sm:p-6 mb-8 text-left"
            role="img"
            aria-label="Runway forecast preview showing 14 months of runway"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
              <div>
                <div className="text-xs text-gray-500 mb-1">Runway estimate</div>
                <div className="text-3xl font-bold tabular-nums">
                  14{' '}<span className="text-lg font-normal text-gray-400">months</span>
                </div>
              </div>
              <div className="text-xs text-gray-500 rounded-lg border border-white/8 px-3 py-2 bg-white/[0.03]">
                Based on $8,420 MRR · $6,100 burn · Jun 2026
              </div>
            </div>
            <div className="flex items-end gap-1 h-16 mb-2" aria-hidden="true">
              {BARS.map((bar, i) => (
                <div
                  key={i}
                  className={`flex-1 rounded-sm transition-none ${
                    bar.type === 'past' ? 'bg-white/20' : bar.type === 'now' ? 'bg-emerald-400' : 'bg-white/10 border border-dashed border-white/20'
                  }`}
                  style={{ height: `${bar.h}%` }}
                />
              ))}
            </div>
            <div className="flex justify-between text-[10px] text-gray-600">
              <span>Jan</span><span>Jun ← now</span><span>Dec</span>
            </div>
          </div>
          <div className="flex flex-col xs:flex-row items-center justify-center gap-3">
            <Link href="/register" className="w-full xs:w-auto inline-flex items-center justify-center rounded-lg bg-white px-6 py-3.5 text-sm font-semibold text-black hover:bg-gray-100 active:bg-gray-200 transition-colors min-h-[44px]">
              Start Free — No credit card
            </Link>
            <Link href="/calculators" className="w-full xs:w-auto inline-flex items-center justify-center rounded-lg border border-white/20 px-6 py-3.5 text-sm text-gray-300 hover:border-white/40 hover:text-white active:bg-white/5 transition-colors min-h-[44px]">
              Try Runway Calculator Free
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">How it works</h2>
          <p className="text-gray-400 text-sm sm:text-base mb-10 sm:mb-14">From Stripe connection to 12-month forecast in under 5 minutes.</p>
          <div className="space-y-0 divide-y divide-white/8 border-y border-white/8">
            {STEPS.map((step) => (
              <div key={step.n} className="grid grid-cols-[2.5rem_1fr] sm:grid-cols-[3rem_1fr] gap-4 sm:gap-6 py-5 sm:py-6 items-start">
                <div className="text-xl sm:text-2xl font-bold text-white/15 tabular-nums pt-0.5">{step.n}</div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold mb-1.5">{step.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 py-16 sm:py-20 bg-white/[0.02] border-y border-white/8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">How we compare</h2>
          <p className="text-gray-400 text-sm sm:text-base mb-10">Full cash flow forecasting at a fraction of the cost.</p>
          <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
            <table className="w-full text-sm min-w-[440px]">
              <thead>
                <tr className="border-b border-white/10">
                  <th scope="col" className="text-left py-3 pb-4 text-gray-400 font-medium text-xs uppercase tracking-widest">Feature</th>
                  <th scope="col" className="text-center py-3 pb-4 text-white font-semibold">AI Finance Ops</th>
                  <th scope="col" className="text-center py-3 pb-4 text-gray-500 font-medium">Baremetrics</th>
                  <th scope="col" className="text-center py-3 pb-4 text-gray-500 font-medium">ChartMogul</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row, i) => (
                  <tr key={row.feature} className={`border-b ${i === COMPARISON.length - 1 ? 'border-transparent' : 'border-white/5'}`}>
                    <td className="py-3.5 text-gray-300 text-sm">{row.feature}</td>
                    <td className="py-3.5 text-center">
                      {typeof row.us === 'boolean' ? (
                        <span className={row.us ? 'text-white' : 'text-gray-700'} aria-label={row.us ? 'Yes' : 'No'}>{row.us ? '✓' : '✗'}</span>
                      ) : <span className="font-semibold text-white">{row.us}</span>}
                    </td>
                    <td className="py-3.5 text-center">
                      {typeof row.baremetrics === 'boolean' ? (
                        <span className={row.baremetrics ? 'text-gray-400' : 'text-gray-700'} aria-label={row.baremetrics ? 'Yes' : 'No'}>{row.baremetrics ? '✓' : '✗'}</span>
                      ) : <span className="text-gray-500">{row.baremetrics}</span>}
                    </td>
                    <td className="py-3.5 text-center">
                      {typeof row.chartmogul === 'boolean' ? (
                        <span className={row.chartmogul ? 'text-gray-400' : 'text-gray-700'} aria-label={row.chartmogul ? 'Yes' : 'No'}>{row.chartmogul ? '✓' : '✗'}</span>
                      ) : <span className="text-gray-500">{row.chartmogul}</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-bold mb-10">Common questions</h2>
          <div className="divide-y divide-white/8 border-y border-white/8">
            {FAQS.map((faq) => (
              <details key={faq.q} className="group py-4 sm:py-5">
                <summary className="flex items-start justify-between gap-4 cursor-pointer list-none min-h-[44px]">
                  <span className="text-sm sm:text-base font-medium">{faq.q}</span>
                  <span className="text-gray-500 mt-0.5 shrink-0 transition-transform group-open:rotate-180" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                </summary>
                <p className="text-gray-400 text-sm leading-relaxed mt-3">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 py-12 border-t border-white/8 bg-white/[0.01]">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs text-gray-600 uppercase tracking-widest mb-4">Explore more tools</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/stripe-mrr-dashboard" className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-gray-400 hover:text-white hover:border-white/20 transition-colors min-h-[44px] flex items-center">Stripe MRR Dashboard →</Link>
            <Link href="/ai-finance-bootstrapped-startups" className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-gray-400 hover:text-white hover:border-white/20 transition-colors min-h-[44px] flex items-center">AI Finance for Bootstrapped Startups →</Link>
            <Link href="/calculators" className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-gray-400 hover:text-white hover:border-white/20 transition-colors min-h-[44px] flex items-center">Free Calculators →</Link>
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 py-16 sm:py-20 border-t border-white/8">
        <div className="mx-auto max-w-2xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold mb-1">Know your runway. Plan your growth.</h2>
            <p className="text-gray-400 text-sm">Free plan. Connect Stripe in 60 seconds. Use code <code className="rounded bg-white/8 px-1.5 py-0.5 font-mono">LAUNCH50</code> for 50% off.</p>
          </div>
          <Link href="/register" className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-3.5 text-sm font-semibold text-black hover:bg-gray-100 active:bg-gray-200 transition-colors min-h-[44px] shrink-0">Get Started Free</Link>
        </div>
      </section>
    </main>
  )
}
