import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Stripe MRR Dashboard for SaaS Founders | AI Finance Ops',
  description: 'Track your Stripe MRR, ARR, churn, and revenue trends in real-time. The smartest Stripe MRR dashboard built for bootstrapped SaaS founders.',
  keywords: ['stripe mrr dashboard', 'mrr tracking', 'saas revenue dashboard', 'stripe analytics'],
  alternates: {
    canonical: 'https://aifinanceops.app/stripe-mrr-dashboard',
  },
  openGraph: {
    title: 'Stripe MRR Dashboard — AI Finance Ops',
    description: 'Real-time MRR tracking, churn analysis, and AI-powered revenue forecasts from your Stripe data.',
    url: 'https://aifinanceops.app/stripe-mrr-dashboard',
    siteName: 'AI Finance Ops',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Stripe MRR Dashboard' }],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stripe MRR Dashboard — AI Finance Ops',
    description: 'Real-time MRR tracking, churn analysis, and AI-powered revenue forecasts from your Stripe data.',
    images: ['/og-image.png'],
  },
}

const FEATURES = [
  {
    title: 'Live MRR Tracking',
    description: 'Connect Stripe once. See your MRR, ARR, and net revenue updated in real-time — no spreadsheets.',
  },
  {
    title: 'AI Revenue Forecast',
    description: 'Our AI model predicts your next 90-day revenue trajectory based on current growth and churn patterns.',
  },
  {
    title: 'Churn Alerts',
    description: 'Get notified the moment a customer shows cancellation signals, before they actually churn.',
  },
  {
    title: 'Cohort Analysis',
    description: 'Understand retention by signup month. Spot which cohorts retain and which ones drop — automatically.',
  },
]

const PLANS = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    highlight: false,
    features: [
      'MRR tracking only',
      'Up to 100 active customers',
      'Stripe integration',
      '7-day data history',
      'Email support',
    ],
    cta: 'Start Free',
    href: '/register',
  },
  {
    name: 'Starter',
    price: '$29',
    period: 'per month',
    highlight: false,
    features: [
      'MRR + ARR + churn tracking',
      'Up to 1,000 active customers',
      'AI revenue insights',
      '30-day cash flow overview',
      'Slack & email alerts',
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
      'Unlimited customers',
      '90-day cash flow forecast',
      'Cohort retention analysis',
      'AI copilot chat',
      'Custom report exports',
      'Dedicated onboarding',
    ],
    cta: 'Start Growth',
    href: '/register?plan=growth',
  },
]

const TESTIMONIALS = [
  {
    quote: 'I replaced Baremetrics with AI Finance Ops and saved $150/mo. The MRR dashboard is cleaner and the AI forecasts are scarily accurate.',
    name: 'Alex R.',
    role: 'Founder, SaaS tool — $12k MRR',
  },
  {
    quote: 'Finally an MRR dashboard that does not require a data team. Setup took 4 minutes.',
    name: 'Maria S.',
    role: 'Solo founder — $4k MRR',
  },
  {
    quote: 'The churn alerts alone saved me two customers last month. Absolute no-brainer.',
    name: 'Tom K.',
    role: 'Co-founder, B2B SaaS',
  },
]

export default function StripeMRRDashboardPage() {
  return (
    <main className="min-h-screen bg-[#0f1117] text-white">

      {/* HERO */}
      <section className="relative overflow-hidden px-6 pt-24 pb-20 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/40 to-transparent pointer-events-none" />
        <div className="relative mx-auto max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-400 mb-6">
            50% off first 3 months — Limited launch offer
          </span>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            The Stripe MRR Dashboard
            <span className="block text-emerald-400">Built for Founders</span>
          </h1>
          <p className="mt-6 text-lg text-gray-400 max-w-2xl mx-auto">
            Connect Stripe in 60 seconds. Get live MRR, ARR, churn rate, and AI-powered
            revenue forecasts — all in one clean dashboard. No spreadsheets, no data team needed.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/register"
              className="inline-flex items-center justify-center rounded-lg bg-emerald-500 px-6 py-3 text-base font-semibold text-black hover:bg-emerald-400 transition-colors"
            >
              Start Free — No credit card
            </Link>
            <Link
              href="#pricing"
              className="inline-flex items-center justify-center rounded-lg border border-white/20 px-6 py-3 text-base text-gray-300 hover:border-white/40 hover:text-white transition-colors"
            >
              View Pricing
            </Link>
          </div>
          <p className="mt-4 text-sm text-gray-500">Trusted by 200+ bootstrapped founders</p>
        </div>
      </section>

      {/* METRICS BAR */}
      <section className="border-y border-white/10 bg-white/5 py-8 px-6">
        <div className="mx-auto max-w-4xl grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          {[['$2.4M+', 'MRR tracked'], ['99.9%', 'Uptime SLA'], ['60s', 'Setup time'], ['4.9/5', 'Rating']].map(([val, label]) => (
            <div key={label}>
              <div className="text-2xl font-bold text-emerald-400">{val}</div>
              <div className="text-sm text-gray-400 mt-1">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-4">Everything you need to track MRR</h2>
          <p className="text-center text-gray-400 mb-14 max-w-xl mx-auto">
            Built specifically for SaaS founders who want signal, not noise.
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="rounded-xl border border-white/10 bg-white/5 p-6 hover:border-emerald-500/40 hover:bg-emerald-500/5 transition-colors"
              >
                <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="px-6 py-20 bg-white/[0.02]">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-4">Simple, transparent pricing</h2>
          <p className="text-center text-gray-400 mb-14">Start free. Upgrade when you need more power.</p>
          <div className="grid sm:grid-cols-3 gap-6">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-xl border p-6 flex flex-col ${
                  plan.highlight
                    ? 'border-emerald-500 bg-emerald-500/10 shadow-lg shadow-emerald-500/10'
                    : 'border-white/10 bg-white/5'
                }`}
              >
                {plan.highlight && (
                  <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-3">Most Popular</span>
                )}
                <div className="text-xl font-bold mb-1">{plan.name}</div>
                <div className="text-3xl font-bold mb-0.5">{plan.price}</div>
                <div className="text-sm text-gray-400 mb-6">{plan.period}</div>
                <ul className="space-y-2.5 flex-1 mb-6">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2 text-sm text-gray-300">
                      <span className="text-emerald-400 mt-0.5">&#10003;</span>{feat}
                    </li>
                  ))}
                </ul>
                <Link
                  href={plan.href}
                  className={`block text-center rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${
                    plan.highlight
                      ? 'bg-emerald-500 text-black hover:bg-emerald-400'
                      : 'border border-white/20 text-white hover:border-white/40'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-emerald-400 font-medium mt-8">
            50% off your first 3 months — use code <code className="bg-white/10 px-2 py-0.5 rounded">LAUNCH50</code> at checkout
          </p>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-14">Loved by founders</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="rounded-xl border border-white/10 bg-white/5 p-6">
                <p className="text-gray-300 text-sm leading-relaxed mb-4">&ldquo;{t.quote}&rdquo;</p>
                <div className="text-sm font-semibold">{t.name}</div>
                <div className="text-xs text-gray-500">{t.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-6 py-20 text-center">
        <div className="mx-auto max-w-xl">
          <h2 className="text-3xl font-bold mb-4">Start tracking your MRR today</h2>
          <p className="text-gray-400 mb-8">Free plan available. No credit card required. Setup takes 60 seconds.</p>
          <Link
            href="/register"
            className="inline-flex items-center justify-center rounded-lg bg-emerald-500 px-8 py-3.5 text-base font-semibold text-black hover:bg-emerald-400 transition-colors"
          >
            Get Started Free
          </Link>
        </div>
      </section>

    </main>
  )
}
