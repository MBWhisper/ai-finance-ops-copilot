import type { Metadata } from 'next'
import Link from 'next/link'
import { InternalLinks, CALCULATOR_LINKS, COMPARISON_LINKS } from '@/components/seo/InternalLinks'

export const metadata: Metadata = {
  title: 'Features — AI Finance Ops',
  description:
    'Real-time MRR, ARR, churn, LTV, and runway tracking for SaaS founders. Connect Stripe in minutes — no spreadsheets, no SQL.',
  alternates: { canonical: 'https://aifinanceops.app/features' },
  openGraph: {
    title: 'Features — AI Finance Ops',
    description:
      'Real-time MRR, ARR, churn, LTV, and runway tracking for SaaS founders.',
    url: 'https://aifinanceops.app/features',
  },
}

const FEATURES = [
  {
    icon: '📈',
    title: 'MRR & ARR Tracking',
    description:
      'See your Monthly and Annual Recurring Revenue update in real-time the moment a payment lands. Annual plans are automatically normalized to monthly so your numbers are always accurate.',
  },
  {
    icon: '📉',
    title: 'Churn Rate & Revenue Churn',
    description:
      'Track logo churn and revenue churn side-by-side. Identify which cohorts are churning fastest and take action before it compounds.',
  },
  {
    icon: '💰',
    title: 'LTV Calculator',
    description:
      'Customer Lifetime Value calculated automatically from real payment data — not estimates. Segment by plan, acquisition channel, or cohort.',
  },
  {
    icon: '🛫',
    title: 'Runway Calculator',
    description:
      'Know exactly how many months of runway you have left based on your current burn rate. Get alerted before you drop below a threshold you set.',
  },
  {
    icon: '💳',
    title: 'Multi-processor Support',
    description:
      'Connect Stripe, LemonSqueezy, and PayPal. All revenue sources are unified into a single dashboard — no more switching between tabs.',
  },
  {
    icon: '🤖',
    title: 'AI-powered Insights',
    description:
      'Get plain-English summaries of what changed this week, why it happened, and what to do about it — powered by AI that understands SaaS metrics.',
  },
  {
    icon: '📊',
    title: 'Cash Flow Tracker',
    description:
      'Monitor inflows and outflows in one place. Understand the gap between MRR and actual cash in your bank account.',
  },
  {
    icon: '📬',
    title: 'Automated Reports',
    description:
      'Receive a weekly email digest of your key metrics every Monday morning. Share a live dashboard link with investors — no login required for them.',
  },
  {
    icon: '🔒',
    title: 'Read-only & Secure',
    description:
      'We connect via read-only OAuth — we can never move money or modify your Stripe account. All data is encrypted at rest and in transit.',
  },
]

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-gray-950 pt-24 pb-24 px-6">
      <div className="mx-auto max-w-6xl">

        {/* Hero */}
        <div className="text-center mb-20">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-4">
            Everything you need
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            SaaS Financial Intelligence,{' '}
            <span className="text-emerald-400">Without the Complexity</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
            AI Finance Ops gives early-stage founders a real-time view of MRR, churn, LTV, and runway — connected to Stripe in minutes, no SQL or spreadsheets needed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="px-6 py-3 rounded-lg bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition-colors"
            >
              Start Free Trial
            </Link>
            <Link
              href="/pricing"
              className="px-6 py-3 rounded-lg border border-gray-700 text-gray-300 font-semibold hover:border-gray-500 transition-colors"
            >
              View Pricing
            </Link>
          </div>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6 hover:border-gray-700 transition-colors"
            >
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h2 className="text-white font-semibold text-lg mb-2">{feature.title}</h2>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-10 text-center mb-24">
          <h2 className="text-2xl font-bold text-white mb-3">Ready to stop guessing your numbers?</h2>
          <p className="text-gray-400 mb-6">Connect Stripe and get your first report in under 5 minutes. No credit card required.</p>
          <Link
            href="/register"
            className="inline-block px-8 py-3 rounded-lg bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition-colors"
          >
            Start Free — No Credit Card
          </Link>
        </div>

        {/* Internal links for SEO */}
        <div className="border-t border-gray-800 pt-16">
          <InternalLinks links={CALCULATOR_LINKS} title="Free SaaS Calculators" variant="grid" />
          <InternalLinks links={COMPARISON_LINKS} title="See How We Compare" variant="grid" />
        </div>

      </div>
    </div>
  )
}
