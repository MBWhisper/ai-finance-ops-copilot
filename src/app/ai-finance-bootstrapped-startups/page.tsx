import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'AI Finance Tool for Bootstrapped Startups | AI Finance Ops',
  description:
    'The AI-powered finance platform built for bootstrapped startups. Track MRR, forecast cash flow, spot churn early, and make data-driven decisions — without a CFO.',
  keywords: [
    'ai finance tool',
    'bootstrapped startup finance',
    'saas financial management',
    'founder finance tool',
  ],
  alternates: { canonical: 'https://aifinanceops.app/ai-finance-bootstrapped-startups' },
  openGraph: {
    title: 'AI Finance Tool for Bootstrapped Startups — AI Finance Ops',
    description:
      'The AI finance platform built for founders who are doing it without a CFO. MRR tracking, forecasts, and AI insights in one place.',
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
    solution:
      'AI Finance Ops sends you a daily MRR digest automatically — with highlights and anomaly alerts.',
    metric: 'Daily digest',
  },
  {
    problem: "You don't know your real burn rate",
    solution: 'Connect Stripe and your bank. Get a live burn dashboard that updates every 24 hours.',
    metric: 'Live burn tracking',
  },
  {
    problem: 'Cash flow planning happens in a spreadsheet',
    solution: 'Get a 12-month AI forecast that recalculates automatically as your data changes.',
    metric: '12-month forecast',
  },
  {
    problem: 'You find out about churn after it happens',
    solution:
      'Churn prediction alerts you 7–14 days before a customer cancels, so you can intervene.',
    metric: '7–14 days early',
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
    features: [
      'Everything in Free',
      'Cash flow overview',
      'Churn alerts',
      'AI insights',
      'Priority support',
    ],
    cta: 'Start Starter',
    href: '/register?plan=starter',
  },
  {
    name: 'Growth',
    price: '$79',
    period: 'per month',
    highlight: true,
    features: [
      'Everything in Starter',
      '90-day AI forecast',
      'Scenario planning',
      'AI Copilot chat',
      'Custom exports',
    ],
    cta: 'Start Growth — Most Popular',
    href: '/register?plan=growth',
  },
]

const COPILOT_EXAMPLES = [
  '"What is my real burn rate this month?"',
  '"If churn hits 5%, when do I run out of cash?"',
  '"Which customers are at risk of churning?"',
  '"How much runway do I gain if I cut $2k in expenses?"',
]

export default function AiFinanceBootstrappedStartupsPage() {
  return (
    <main className="min-h-screen bg-[#0d0f12] text-white">

      {/* ── HERO — editorial, left-aligned ── */}
      <section className="px-4 sm:px-6 pt-16 sm:pt-24 pb-16 sm:pb-20 border-b border-white/8">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-widest mb-4">
            Built for bootstrapped founders, not VCs
          </p>
          <h1 className="text-[clamp(2.2rem,6vw,4.5rem)] font-bold tracking-tight leading-[1.08] mb-6 max-w-3xl">
            Your AI Finance Copilot
          </h1>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <p className="text-base sm:text-lg text-gray-400 leading-relaxed max-w-lg">
              Get the financial clarity of a CFO without the $15k/month price tag.
              Connects to Stripe in 60 seconds. Gives you real-time MRR, cash flow
              forecasts, churn alerts, and AI insights — on autopilot.
            </p>
            <div className="flex flex-col xs:flex-row gap-3 shrink-0">
              <Link
                href="/register"
                className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3.5 text-sm font-semibold text-black hover:bg-gray-100 active:bg-gray-200 transition-colors min-h-[44px]"
              >
                Start Free — No credit card
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center rounded-lg border border-white/20 px-6 py-3.5 text-sm text-gray-300 hover:border-white/40 hover:text-white active:bg-white/5 transition-colors min-h-[44px]"
              >
                See Pricing
              </Link>
            </div>
          </div>
          <p className="mt-5 text-xs text-gray-600">Replacing Baremetrics for 200+ bootstrapped founders</p>
        </div>
      </section>

      {/* ── PAIN POINTS — before/after rows ── */}
      <section className="px-4 sm:px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Sound familiar?</h2>
          <p className="text-gray-400 text-sm sm:text-base mb-10 sm:mb-14 max-w-md">
            Every bootstrapped founder deals with these. AI Finance Ops solves all of them.
          </p>
          <div className="space-y-3">
            {PAIN_POINTS.map((item) => (
              <div
                key={item.problem}
                className="rounded-2xl border border-white/8 bg-white/[0.02] overflow-hidden"
              >
                <div className="grid grid-cols-1 sm:grid-cols-[1fr_1px_1fr]">
                  {/* Problem */}
                  <div className="p-5 sm:p-6">
                    <div className="text-[10px] font-semibold text-gray-600 uppercase tracking-widest mb-3">
                      Before
                    </div>
                    <p className="text-sm sm:text-base text-gray-300">{item.problem}</p>
                  </div>
                  {/* Divider — vertical on desktop, horizontal on mobile */}
                  <div className="hidden sm:block bg-white/8" aria-hidden="true" />
                  <div className="block sm:hidden h-px bg-white/8" aria-hidden="true" />
                  {/* Solution */}
                  <div className="p-5 sm:p-6 bg-white/[0.02]">
                    <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-3">
                      {item.metric}
                    </div>
                    <p className="text-sm sm:text-base text-gray-200">{item.solution}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AI COPILOT ── */}
      <section className="px-4 sm:px-6 py-16 sm:py-20 bg-white/[0.02] border-y border-white/8">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col lg:flex-row lg:gap-16 lg:items-center">
            <div className="flex-1 mb-10 lg:mb-0">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                Ask your finances anything
              </h2>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-6">
                The AI Copilot answers plain-English questions about your business using
                your real Stripe and bank data — not generic advice.
              </p>
              <Link
                href="/register?plan=growth"
                className="inline-flex items-center justify-center rounded-lg border border-white/20 px-5 py-3 text-sm text-gray-300 hover:border-white/40 hover:text-white active:bg-white/5 transition-colors min-h-[44px]"
              >
                Try AI Copilot on Growth plan
              </Link>
            </div>
            {/* Chat bubbles */}
            <div className="flex-none lg:w-[400px] space-y-3">
              {COPILOT_EXAMPLES.map((q, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-white/8 bg-[#131820] px-4 py-3.5 text-sm text-gray-300 flex items-start gap-3 min-h-[44px]"
                >
                  <span className="text-gray-600 text-xs mt-0.5 shrink-0" aria-hidden="true">
                    Q
                  </span>
                  <span>{q}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="px-4 sm:px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">
            Pricing built for bootstrapped budgets
          </h2>
          <p className="text-gray-400 text-sm sm:text-base mb-10 sm:mb-14">
            Start free. No credit card. Upgrade only when you&apos;re ready.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl border p-5 sm:p-6 flex flex-col ${
                  plan.highlight
                    ? 'border-white/30 bg-white/5'
                    : 'border-white/8 bg-white/[0.02]'
                }`}
              >
                <div className="text-base font-bold mb-1">{plan.name}</div>
                <div className="text-3xl font-bold tabular-nums mb-0.5">{plan.price}</div>
                <div className="text-xs text-gray-500 mb-5">{plan.period}</div>
                <ul className="space-y-2.5 flex-1 mb-6">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2 text-sm text-gray-300">
                      <svg
                        className="w-4 h-4 text-gray-500 mt-0.5 shrink-0"
                        viewBox="0 0 16 16"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M3 8l3.5 3.5L13 5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={plan.href}
                  className={`block text-center rounded-lg px-4 py-3 text-sm font-semibold transition-colors min-h-[44px] flex items-center justify-center ${
                    plan.highlight
                      ? 'bg-white text-black hover:bg-gray-100 active:bg-gray-200'
                      : 'border border-white/15 text-white hover:border-white/30 active:bg-white/5'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-4 sm:px-6 py-16 sm:py-20 border-t border-white/8">
        <div className="mx-auto max-w-2xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold mb-1">
              Stop flying blind on your finances
            </h2>
            <p className="text-gray-400 text-sm">Join 200+ bootstrapped founders. Setup takes 60 seconds.</p>
          </div>
          <Link
            href="/register"
            className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-3.5 text-sm font-semibold text-black hover:bg-gray-100 active:bg-gray-200 transition-colors min-h-[44px] shrink-0"
          >
            Get Started Free
          </Link>
        </div>
      </section>

    </main>
  )
}
