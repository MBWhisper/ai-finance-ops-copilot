import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Stripe MRR Dashboard for SaaS Founders | AI Finance Ops',
  description: 'Track your Stripe MRR, ARR, churn, and revenue trends in real-time. The smartest Stripe MRR dashboard built for bootstrapped SaaS founders.',
  keywords: ['stripe mrr dashboard', 'mrr tracking', 'saas revenue dashboard', 'stripe analytics'],
  alternates: { canonical: 'https://aifinanceops.app/stripe-mrr-dashboard' },
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
    description: 'Connect Stripe once. See your MRR, ARR, and net revenue updated in real-time — no spreadsheets, no manual exports.',
    stat: 'Real-time',
  },
  {
    title: 'AI Revenue Forecast',
    description: 'Our AI model predicts your next 90-day revenue trajectory based on current growth and churn patterns.',
    stat: '90-day',
  },
  {
    title: 'Churn Alerts',
    description: 'Get notified the moment a customer shows cancellation signals, before they actually churn.',
    stat: '7-14 days early',
  },
  {
    title: 'Cohort Analysis',
    description: 'Understand retention by signup month. Spot which cohorts retain and which ones drop — automatically.',
    stat: 'By cohort',
  },
]

const PLANS = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    highlight: false,
    features: ['MRR tracking only', 'Up to 100 active customers', 'Stripe integration', '7-day data history', 'Email support'],
    cta: 'Start Free',
    href: '/register',
  },
  {
    name: 'Starter',
    price: '$29',
    period: 'per month',
    highlight: false,
    features: ['MRR + ARR + churn tracking', 'Up to 1,000 active customers', 'AI revenue insights', '30-day cash flow overview', 'Slack & email alerts', 'Priority support'],
    cta: 'Start Starter',
    href: '/register?plan=starter',
  },
  {
    name: 'Growth',
    price: '$79',
    period: 'per month',
    highlight: true,
    features: ['Everything in Starter', 'Unlimited customers', '90-day cash flow forecast', 'Cohort retention analysis', 'AI copilot chat', 'Custom report exports', 'Dedicated onboarding'],
    cta: 'Start Growth',
    href: '/register?plan=growth',
  },
]

const TESTIMONIALS = [
  { quote: 'I replaced Baremetrics with AI Finance Ops and saved $150/mo. The MRR dashboard is cleaner and the AI forecasts are scarily accurate.', name: 'Alex R.', role: 'Founder, SaaS tool — $12k MRR' },
  { quote: 'Finally an MRR dashboard that does not require a data team. Setup took 4 minutes.', name: 'Maria S.', role: 'Solo founder — $4k MRR' },
  { quote: 'The churn alerts alone saved me two customers last month. Absolute no-brainer.', name: 'Tom K.', role: 'Co-founder, B2B SaaS' },
]

export default function StripeMRRDashboardPage() {
  return (
    <main className="min-h-screen bg-[#0d0f12] text-white">

      {/* HERO — asymmetric layout, left-aligned */}
      <section className="px-4 sm:px-6 pt-16 sm:pt-24 pb-16 sm:pb-20">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-16">
            {/* Left: copy */}
            <div className="flex-1 min-w-0">
              <span className="inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/8 px-3 py-1 text-xs font-medium text-emerald-400 mb-5">
                50% off first 3 months — code LAUNCH50
              </span>
              <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-tight leading-[1.1] mb-5">
                The Stripe MRR Dashboard
                <br />
                <span className="text-emerald-400">built for founders</span>
              </h1>
              <p className="text-base sm:text-lg text-gray-400 leading-relaxed mb-8 max-w-lg">
                Connect Stripe in 60 seconds. Get live MRR, ARR, churn rate, and
                AI-powered revenue forecasts — all in one clean dashboard.
                No spreadsheets, no data team needed.
              </p>
              <div className="flex flex-col xs:flex-row gap-3">
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center rounded-lg bg-emerald-500 px-6 py-3.5 text-sm font-semibold text-black hover:bg-emerald-400 active:bg-emerald-600 transition-colors min-h-[44px]"
                >
                  Start Free — No credit card
                </Link>
                <Link
                  href="#pricing"
                  className="inline-flex items-center justify-center rounded-lg border border-white/20 px-6 py-3.5 text-sm text-gray-300 hover:border-white/50 hover:text-white active:bg-white/5 transition-colors min-h-[44px]"
                >
                  View Pricing
                </Link>
              </div>
              <p className="mt-4 text-xs text-gray-500">Trusted by 200+ bootstrapped founders</p>
            </div>

            {/* Right: mini dashboard mockup */}
            <div className="flex-none mt-12 lg:mt-0 w-full lg:w-[380px]">
              <div className="rounded-2xl border border-white/10 bg-[#131820] p-5 shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs text-gray-500">Jun 2026 · Live</span>
                  <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Synced
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {[['MRR', '$8,420', '+12.4%'], ['ARR', '$101k', '+14.1%'], ['Churn', '2.1%', '-0.3%'], ['LTV', '$1,240', '+8.6%']].map(([label, val, delta]) => (
                    <div key={label} className="rounded-lg bg-white/5 p-3">
                      <div className="text-xs text-gray-500 mb-1">{label}</div>
                      <div className="text-base font-semibold">{val}</div>
                      <div className={`text-xs mt-0.5 ${delta.startsWith('-') && label === 'Churn' ? 'text-emerald-400' : delta.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}>{delta}</div>
                    </div>
                  ))}
                </div>
                {/* Spark chart bars */}
                <div className="flex items-end gap-1 h-14">
                  {[35, 48, 42, 60, 55, 70, 65, 80, 74, 88, 82, 95].map((h, i) => (
                    <div key={i} className="flex-1 rounded-sm bg-emerald-500/20" style={{ height: `${h}%` }} />
                  ))}
                </div>
                <div className="text-xs text-gray-600 mt-2 text-right">Last 12 months</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* METRICS BAR */}
      <section className="border-y border-white/8 bg-white/[0.03] py-6 sm:py-8 px-4 sm:px-6">
        <div className="mx-auto max-w-4xl grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
          {[['$2.4M+', 'MRR tracked'], ['99.9%', 'Uptime SLA'], ['60s', 'Setup time'], ['4.9★', 'Avg rating']].map(([val, label]) => (
            <div key={label} className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-emerald-400 tabular-nums">{val}</div>
              <div className="text-xs sm:text-sm text-gray-400 mt-1">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES — staggered 2-col with stat callout */}
      <section className="px-4 sm:px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">Everything you need to track MRR</h2>
            <p className="text-gray-400 text-sm sm:text-base max-w-md">
              Built for SaaS founders who want signal, not noise.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/8">
            {FEATURES.map((f, i) => (
              <div
                key={f.title}
                className={`bg-[#0d0f12] p-6 sm:p-8 ${i === 0 ? 'sm:border-b sm:border-r border-white/8' : i === 1 ? 'sm:border-b border-white/8' : i === 2 ? 'sm:border-r border-white/8' : ''}`}
              >
                <div className="text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-3">{f.stat}</div>
                <h3 className="text-base sm:text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="px-4 sm:px-6 py-16 sm:py-20 bg-white/[0.02]">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Simple, transparent pricing</h2>
          <p className="text-gray-400 text-sm sm:text-base mb-10 sm:mb-14">Start free. Upgrade when you need more power.</p>
          <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl border p-5 sm:p-6 flex flex-col ${
                  plan.highlight
                    ? 'border-emerald-500/60 bg-emerald-500/8'
                    : 'border-white/8 bg-white/[0.03]'
                }`}
              >
                {plan.highlight && (
                  <span className="text-[10px] font-semibold text-emerald-400 uppercase tracking-widest mb-4 block">Most Popular</span>
                )}
                <div className="text-base font-bold mb-1">{plan.name}</div>
                <div className="text-3xl font-bold tabular-nums mb-0.5">{plan.price}</div>
                <div className="text-xs text-gray-500 mb-5">{plan.period}</div>
                <ul className="space-y-2.5 flex-1 mb-6">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2 text-sm text-gray-300">
                      <svg className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8l3.5 3.5L13 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={plan.href}
                  className={`block text-center rounded-lg px-4 py-3 text-sm font-semibold transition-colors min-h-[44px] flex items-center justify-center ${
                    plan.highlight
                      ? 'bg-emerald-500 text-black hover:bg-emerald-400 active:bg-emerald-600'
                      : 'border border-white/20 text-white hover:border-white/40 active:bg-white/5'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-400 mt-8">
            50% off first 3 months with code{' '}
            <code className="bg-white/8 text-emerald-400 px-2 py-0.5 rounded text-xs font-mono">LAUNCH50</code>
          </p>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="px-4 sm:px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl sm:text-3xl font-bold mb-10 sm:mb-14">Loved by founders</h2>
          <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="rounded-2xl border border-white/8 bg-white/[0.03] p-5 sm:p-6">
                <p className="text-gray-300 text-sm leading-relaxed mb-5">&ldquo;{t.quote}&rdquo;</p>
                <div className="text-sm font-semibold">{t.name}</div>
                <div className="text-xs text-gray-500 mt-0.5">{t.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA — full-width band */}
      <section className="px-4 sm:px-6 py-16 sm:py-20 border-t border-white/8">
        <div className="mx-auto max-w-2xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold mb-1">Start tracking your MRR today</h2>
            <p className="text-gray-400 text-sm">Free plan. No credit card. 60-second setup.</p>
          </div>
          <Link
            href="/register"
            className="inline-flex items-center justify-center rounded-lg bg-emerald-500 px-8 py-3.5 text-sm font-semibold text-black hover:bg-emerald-400 active:bg-emerald-600 transition-colors min-h-[44px] shrink-0"
          >
            Get Started Free
          </Link>
        </div>
      </section>

    </main>
  )
}
