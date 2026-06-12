import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Stripe MRR Dashboard for SaaS Founders | AI Finance Ops',
  description:
    'Track your Stripe MRR, ARR, churn, and revenue trends in real-time. The smartest Stripe MRR dashboard built for bootstrapped SaaS founders.',
  keywords: ['stripe mrr dashboard', 'mrr tracking', 'saas revenue dashboard', 'stripe analytics'],
  alternates: { canonical: 'https://aifinanceops.app/stripe-mrr-dashboard' },
  openGraph: {
    title: 'Stripe MRR Dashboard — AI Finance Ops',
    description:
      'Real-time MRR tracking, churn analysis, and AI-powered revenue forecasts from your Stripe data.',
    url: 'https://aifinanceops.app/stripe-mrr-dashboard',
    siteName: 'AI Finance Ops',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Stripe MRR Dashboard' }],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stripe MRR Dashboard — AI Finance Ops',
    description:
      'Real-time MRR tracking, churn analysis, and AI-powered revenue forecasts from your Stripe data.',
    images: ['/og-image.png'],
  },
}

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'AI Finance Ops — Stripe MRR Dashboard',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    description: 'Free plan available. Paid plans from $29/mo.',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '200',
  },
  description:
    'Real-time Stripe MRR dashboard with AI-powered forecasts, churn alerts, and cohort analysis for bootstrapped SaaS founders.',
  url: 'https://aifinanceops.app/stripe-mrr-dashboard',
}

const reviewSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'AI Finance Ops',
  review: [
    {
      '@type': 'Review',
      reviewRating: { '@type': 'Rating', ratingValue: '5' },
      author: { '@type': 'Person', name: 'Alex R.' },
      reviewBody:
        'I replaced Baremetrics with AI Finance Ops and saved $150/mo. The MRR dashboard is cleaner and the AI forecasts are scarily accurate.',
    },
    {
      '@type': 'Review',
      reviewRating: { '@type': 'Rating', ratingValue: '5' },
      author: { '@type': 'Person', name: 'Maria S.' },
      reviewBody: 'Finally an MRR dashboard that does not require a data team. Setup took 4 minutes.',
    },
    {
      '@type': 'Review',
      reviewRating: { '@type': 'Rating', ratingValue: '5' },
      author: { '@type': 'Person', name: 'Tom K.' },
      reviewBody: 'The churn alerts alone saved me two customers last month. Absolute no-brainer.',
    },
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '200',
  },
}

const METRICS = [
  { value: '$2.4M+', label: 'MRR tracked' },
  { value: '99.9%', label: 'Uptime SLA' },
  { value: '60s', label: 'Setup time' },
  { value: '4.9/5', label: 'Rating' },
]

const FEATURES = [
  {
    title: 'Live MRR & ARR tracking',
    description:
      'Connect Stripe once. See your MRR, ARR, and net revenue updated in real-time — no spreadsheets required.',
    stat: 'Updates every 60s',
  },
  {
    title: 'AI Revenue Forecast',
    description:
      'Our model predicts your next 90-day revenue trajectory based on current growth and churn patterns.',
    stat: '~92% accuracy at 30 days',
  },
  {
    title: 'Churn alerts before it happens',
    description:
      'Get notified the moment a customer shows cancellation signals — 7–14 days before they actually churn.',
    stat: '7–14 days early warning',
  },
  {
    title: 'Cohort retention analysis',
    description:
      'Understand retention by signup month. Spot which cohorts drop and why — completely automated.',
    stat: 'Auto-generated monthly',
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
      'AI Copilot chat',
      'Custom report exports',
      'Dedicated onboarding',
    ],
    cta: 'Start Growth',
    href: '/register?plan=growth',
  },
]

const TESTIMONIALS = [
  {
    quote:
      'I replaced Baremetrics with AI Finance Ops and saved $150/mo. The MRR dashboard is cleaner and the AI forecasts are scarily accurate.',
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
    <main className="min-h-screen bg-[#0d0f12] text-white">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />

      {/* ── HERO ── */}
      <section className="px-4 sm:px-6 pt-16 sm:pt-24 pb-16 sm:pb-20 border-b border-white/8">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-widest mb-4">
            Stripe-connected · Real-time · No spreadsheets
          </p>
          <h1 className="text-[clamp(2.2rem,6vw,4.5rem)] font-bold tracking-tight leading-[1.08] mb-6 max-w-3xl">
            The Stripe MRR Dashboard
            <br />
            <span className="text-gray-400 font-normal">built for founders</span>
          </h1>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <p className="text-base sm:text-lg text-gray-400 leading-relaxed max-w-lg">
              Connect Stripe in 60 seconds. Get live MRR, ARR, churn rate, and
              AI-powered revenue forecasts — all in one clean dashboard.
            </p>
            <div className="flex flex-col xs:flex-row gap-3 shrink-0">
              <Link
                href="/register"
                className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3.5 text-sm font-semibold text-black hover:bg-gray-100 active:bg-gray-200 transition-colors min-h-[44px]"
              >
                Start Free — No credit card
              </Link>
              <Link
                href="#pricing"
                className="inline-flex items-center justify-center rounded-lg border border-white/20 px-6 py-3.5 text-sm text-gray-300 hover:border-white/40 hover:text-white active:bg-white/5 transition-colors min-h-[44px]"
              >
                View Pricing
              </Link>
            </div>
          </div>
          <p className="mt-5 text-xs text-gray-600">Trusted by 200+ bootstrapped founders</p>
        </div>
      </section>

      {/* ── METRICS BAR ── */}
      <section className="border-b border-white/8 bg-white/[0.02] py-8 px-4 sm:px-6">
        <div className="mx-auto max-w-4xl grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 text-center">
          {METRICS.map(({ value, label }) => (
            <div key={label}>
              <div className="text-xl sm:text-2xl font-bold tabular-nums text-white">{value}</div>
              <div className="text-xs sm:text-sm text-gray-500 mt-1">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="px-4 sm:px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Everything you need to track MRR</h2>
          <p className="text-gray-400 text-sm sm:text-base mb-10 sm:mb-14 max-w-md">
            Built for SaaS founders who want signal, not noise.
          </p>
          <div className="space-y-0 divide-y divide-white/8 border-y border-white/8">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3 sm:gap-8 items-start py-5 sm:py-6"
              >
                <div>
                  <h3 className="text-base sm:text-lg font-semibold mb-1.5">{f.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed max-w-prose">{f.description}</p>
                </div>
                <div className="shrink-0">
                  <span className="inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-gray-400 whitespace-nowrap">
                    {f.stat}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section
        id="pricing"
        className="px-4 sm:px-6 py-16 sm:py-20 bg-white/[0.02] border-y border-white/8"
      >
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Simple, transparent pricing</h2>
          <p className="text-gray-400 text-sm sm:text-base mb-10 sm:mb-14">
            Start free. Upgrade when you need more power.
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
                {plan.highlight && (
                  <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-3">
                    Most Popular
                  </span>
                )}
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
          <p className="mt-6 text-center text-xs text-gray-500">
            50% off your first 3 months — code{' '}
            <code className="rounded bg-white/8 px-1.5 py-0.5 font-mono">LAUNCH50</code>
          </p>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="px-4 sm:px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl sm:text-3xl font-bold mb-10 sm:mb-14">Loved by founders</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {TESTIMONIALS.map((t) => (
              <figure
                key={t.name}
                className="rounded-2xl border border-white/8 bg-white/[0.02] p-5 sm:p-6"
              >
                <blockquote>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">&ldquo;{t.quote}&rdquo;</p>
                </blockquote>
                <figcaption>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-gray-500">{t.role}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── INTERNAL LINKS ── */}
      <section className="px-4 sm:px-6 py-12 border-t border-white/8 bg-white/[0.01]">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs text-gray-600 uppercase tracking-widest mb-4">Explore more tools</p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/saas-cash-flow-forecast"
              className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-gray-400 hover:text-white hover:border-white/20 transition-colors min-h-[44px] flex items-center"
            >
              SaaS Cash Flow Forecast →
            </Link>
            <Link
              href="/ai-finance-bootstrapped-startups"
              className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-gray-400 hover:text-white hover:border-white/20 transition-colors min-h-[44px] flex items-center"
            >
              AI Finance for Bootstrapped Startups →
            </Link>
            <Link
              href="/calculators"
              className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-gray-400 hover:text-white hover:border-white/20 transition-colors min-h-[44px] flex items-center"
            >
              Free Calculators →
            </Link>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="px-4 sm:px-6 py-16 sm:py-20 border-t border-white/8">
        <div className="mx-auto max-w-2xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold mb-1">Start tracking your MRR today</h2>
            <p className="text-gray-400 text-sm">Free plan. No credit card. Setup in 60 seconds.</p>
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
