import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'AI Finance Tool for Bootstrapped Startups | AI Finance Ops',
  description: 'The AI-powered finance platform built for bootstrapped startups. Track MRR, forecast cash flow, spot churn early, and make data-driven decisions — without a CFO.',
  keywords: ['ai finance tool', 'bootstrapped startup finance', 'saas financial management', 'founder finance tool'],
  alternates: {
    canonical: 'https://aifinanceops.app/ai-finance-bootstrapped-startups',
  },
  openGraph: {
    title: 'AI Finance Tool for Bootstrapped Startups — AI Finance Ops',
    description: 'The AI finance platform built for founders who are doing it without a CFO. MRR tracking, forecasts, and AI insights in one place.',
    url: 'https://aifinanceops.app/ai-finance-bootstrapped-startups',
    siteName: 'AI Finance Ops',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'AI Finance for Bootstrapped Startups' }],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Finance Tool for Bootstrapped Startups — AI Finance Ops',
    description: 'The AI finance platform built for founders who are doing it without a CFO.',
    images: ['/og-image.png'],
  },
}

const PAIN_POINTS = [
  {
    problem: 'You check Stripe manually every morning',
    solution: 'AI Finance Ops sends you a daily MRR digest automatically — with highlights and anomaly alerts.',
  },
  {
    problem: 'You don\'t know your real burn rate',
    solution: 'Connect Stripe and your bank. Get a live burn dashboard that updates every 24 hours.',
  },
  {
    problem: 'Cash flow planning happens in a spreadsheet',
    solution: 'Get a 12-month AI forecast that recalculates automatically as your data changes.',
  },
  {
    problem: 'You find out about churn after it happens',
    solution: 'Churn prediction alerts you 7-14 days before a customer cancels, so you can intervene.',
  },
]

const PLANS = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    highlight: false,
    features: ['MRR + ARR tracking', 'Up to 100 customers', 'Stripe integration', '7-day history'],
    cta: 'Start Free',
    href: '/register',
  },
  {
    name: 'Starter',
    price: '$29',
    period: 'per month',
    highlight: false,
    features: ['Everything in Free', 'Cash flow overview', 'Churn alerts', 'AI insights', 'Priority support'],
    cta: 'Start Starter',
    href: '/register?plan=starter',
  },
  {
    name: 'Growth',
    price: '$79',
    period: 'per month',
    highlight: true,
    features: ['Everything in Starter', '90-day AI forecast', 'Scenario planning', 'AI Copilot chat', 'Custom exports'],
    cta: 'Start Growth',
    href: '/register?plan=growth',
  },
]

export default function AiFinanceBootstrappedStartupsPage() {
  return (
    <main className="min-h-screen bg-[#0f1117] text-white">

      {/* HERO */}
      <section className="relative overflow-hidden px-6 pt-24 pb-20 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-950/40 to-transparent pointer-events-none" />
        <div className="relative mx-auto max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-violet-500/40 bg-violet-500/10 px-4 py-1.5 text-sm font-medium text-violet-400 mb-6">
            Built for bootstrapped founders, not VCs
          </span>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Your AI Finance Copilot
            <span className="block text-violet-400">for Bootstrapped Startups</span>
          </h1>
          <p className="mt-6 text-lg text-gray-400 max-w-2xl mx-auto">
            Get the financial clarity of a CFO without the $15k/month price tag.
            AI Finance Ops connects to Stripe and gives you real-time MRR tracking,
            cash flow forecasts, churn alerts, and AI-powered insights — automatically.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/register"
              className="inline-flex items-center justify-center rounded-lg bg-violet-500 px-6 py-3 text-base font-semibold text-white hover:bg-violet-400 transition-colors"
            >
              Start Free — No credit card
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-lg border border-white/20 px-6 py-3 text-base text-gray-300 hover:border-white/40 hover:text-white transition-colors"
            >
              See Pricing
            </Link>
          </div>
          <p className="mt-4 text-sm text-gray-500">Replacing Baremetrics for 200+ bootstrapped founders</p>
        </div>
      </section>

      {/* PAIN POINTS */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-4">Sound familiar?</h2>
          <p className="text-center text-gray-400 mb-14 max-w-xl mx-auto">
            Every bootstrapped founder deals with these problems. AI Finance Ops solves all of them.
          </p>
          <div className="space-y-4">
            {PAIN_POINTS.map((item) => (
              <div key={item.problem} className="rounded-xl border border-white/10 bg-white/5 p-6 grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">The problem</p>
                  <p className="text-gray-300 text-sm">{item.problem}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-violet-400 uppercase tracking-widest mb-2">The solution</p>
                  <p className="text-gray-300 text-sm">{item.solution}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="px-6 py-20 bg-white/[0.02]">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-4">Pricing built for bootstrapped budgets</h2>
          <p className="text-center text-gray-400 mb-14">Start free. No credit card. Upgrade only when you\'re ready.</p>
          <div className="grid sm:grid-cols-3 gap-6">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-xl border p-6 flex flex-col ${
                  plan.highlight
                    ? 'border-violet-500 bg-violet-500/10 shadow-lg shadow-violet-500/10'
                    : 'border-white/10 bg-white/5'
                }`}
              >
                {plan.highlight && (
                  <span className="text-xs font-semibold text-violet-400 uppercase tracking-widest mb-3">Most Popular</span>
                )}
                <div className="text-xl font-bold mb-1">{plan.name}</div>
                <div className="text-3xl font-bold mb-0.5">{plan.price}</div>
                <div className="text-sm text-gray-400 mb-6">{plan.period}</div>
                <ul className="space-y-2.5 flex-1 mb-6">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2 text-sm text-gray-300">
                      <span className="text-violet-400 mt-0.5">&#10003;</span>{feat}
                    </li>
                  ))}
                </ul>
                <Link
                  href={plan.href}
                  className={`block text-center rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${
                    plan.highlight
                      ? 'bg-violet-500 text-white hover:bg-violet-400'
                      : 'border border-white/20 text-white hover:border-white/40'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 text-center">
        <div className="mx-auto max-w-xl">
          <h2 className="text-3xl font-bold mb-4">Stop flying blind on your finances</h2>
          <p className="text-gray-400 mb-8">
            Join 200+ bootstrapped founders who replaced spreadsheets and expensive tools
            with AI Finance Ops. Setup takes 60 seconds.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center justify-center rounded-lg bg-violet-500 px-8 py-3.5 text-base font-semibold text-white hover:bg-violet-400 transition-colors"
          >
            Get Started Free
          </Link>
        </div>
      </section>

    </main>
  )
}
