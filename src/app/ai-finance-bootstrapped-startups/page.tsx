import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'AI Finance Tool for Bootstrapped Startups | AI Finance Ops',
  description: 'The AI-powered finance tool built for bootstrapped founders. Track MRR, forecast runway, and get smart financial insights — without a CFO.',
  keywords: ['ai finance tool', 'bootstrapped startup finance', 'saas finance tool', 'startup financial dashboard'],
  openGraph: {
    title: 'AI Finance for Bootstrapped Startups — AI Finance Ops',
    description: 'Smart financial operations for solo founders and small teams. No CFO needed.',
    url: 'https://aifinanceops.app/ai-finance-bootstrapped-startups',
    type: 'website',
  },
}

const PLANS = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    highlight: false,
    description: 'For founders just getting started.',
    features: [
      'MRR tracking only',
      'Up to 100 customers',
      'Stripe integration',
      'Basic dashboard',
    ],
    cta: 'Start Free',
    href: '/auth/sign-up',
  },
  {
    name: 'Starter',
    price: '$29',
    period: '/month',
    highlight: false,
    description: 'For early-stage SaaS products.',
    features: [
      'MRR + ARR + churn tracking',
      '30-day cash flow overview',
      'AI revenue insights',
      'Slack & email alerts',
      'Up to 1,000 customers',
    ],
    cta: 'Start Starter',
    href: '/auth/sign-up?plan=starter',
  },
  {
    name: 'Growth',
    price: '$79',
    period: '/month',
    highlight: true,
    description: 'For founders ready to scale.',
    features: [
      'Everything in Starter',
      '90-day cash flow forecast',
      'AI Copilot chat (unlimited)',
      'Cohort retention analysis',
      'Unlimited customers',
      'Custom report exports',
      'Priority support',
    ],
    cta: 'Start Growth',
    href: '/auth/sign-up?plan=growth',
  },
]

const AI_FEATURES = [
  {
    title: 'Ask anything about your finances',
    body: 'Type "What was my best month this year?" or "When will I hit $10k MRR?" — the AI Copilot answers instantly.',
    badge: 'AI Copilot',
  },
  {
    title: 'Automated anomaly detection',
    body: 'The AI flags unusual spikes or drops in your metrics before they become problems — with context, not just alerts.',
    badge: 'Smart Alerts',
  },
  {
    title: 'Revenue scenario planning',
    body: 'Model "What if churn drops by 2%?" or "What if I raise prices?" and see the forecast impact in seconds.',
    badge: 'Scenario Builder',
  },
  {
    title: 'Monthly financial summaries',
    body: 'Auto-generated end-of-month reports delivered to your inbox. Investor-ready, no manual work.',
    badge: 'Auto Reports',
  },
]

const PAIN_POINTS = [
  { pain: 'Spending hours in spreadsheets', fix: 'Auto-synced dashboard in 60 seconds' },
  { pain: 'No visibility into cash runway', fix: '90-day cash flow forecast (Growth)' },
  { pain: 'Can\'t afford a CFO or analyst', fix: 'AI Copilot answers financial questions instantly' },
  { pain: 'Churn creeps up without warning', fix: 'Real-time churn alerts before it's too late' },
]

export default function AiFinanceBootstrappedPage() {
  return (
    <main className="min-h-screen bg-[#0f1117] text-white">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden px-6 pt-24 pb-20 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-950/40 to-transparent pointer-events-none" />
        <div className="relative mx-auto max-w-3xl">
          {/* Promo Badge */}
          <span className="inline-flex items-center gap-2 rounded-full border border-violet-500/40 bg-violet-500/10 px-4 py-1.5 text-sm font-medium text-violet-400 mb-6">
            🎉 50% off first 3 months — Limited launch offer
          </span>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Your AI Finance Team.
            <span className="block text-violet-400">Without the Payroll.</span>
          </h1>
          <p className="mt-6 text-lg text-gray-400 max-w-2xl mx-auto">
            AI Finance Ops gives bootstrapped founders a CFO-level financial view of their SaaS —
            MRR tracking, cash flow forecasting, and an AI copilot that answers your toughest financial questions.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/auth/sign-up"
              className="inline-flex items-center justify-center rounded-lg bg-violet-500 px-6 py-3 text-base font-semibold text-white hover:bg-violet-400 transition-colors"
            >
              Try It Free — 14 days
            </Link>
            <Link
              href="#pricing"
              className="inline-flex items-center justify-center rounded-lg border border-white/20 px-6 py-3 text-base text-gray-300 hover:border-white/40 hover:text-white transition-colors"
            >
              See Pricing
            </Link>
          </div>
          <p className="mt-4 text-sm text-gray-500">No credit card · Cancel anytime · Built by a bootstrapped founder</p>
        </div>
      </section>

      {/* ── PAIN → FIX ── */}
      <section className="px-6 py-20 border-y border-white/10">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-12">Sound familiar?</h2>
          <div className="space-y-3">
            {PAIN_POINTS.map((p) => (
              <div key={p.pain} className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="flex-1">
                  <span className="text-red-400 line-through text-sm">{p.pain}</span>
                </div>
                <span className="text-gray-600">→</span>
                <div className="flex-1">
                  <span className="text-emerald-400 text-sm font-medium">{p.fix}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AI FEATURES ── */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-4">Your AI Copilot for SaaS Finance</h2>
          <p className="text-center text-gray-400 mb-14 max-w-xl mx-auto">
            Available on the Growth plan — ask anything, forecast anything, report anything.
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            {AI_FEATURES.map((f) => (
              <div
                key={f.title}
                className="rounded-xl border border-white/10 bg-white/5 p-6 hover:border-violet-500/40 hover:bg-violet-500/5 transition-colors"
              >
                <span className="inline-block text-xs font-semibold text-violet-400 uppercase tracking-widest border border-violet-500/30 bg-violet-500/10 rounded-full px-3 py-1 mb-3">
                  {f.badge}
                </span>
                <h3 className="text-base font-semibold mb-2">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="px-6 py-20 bg-white/[0.02]">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-4">Pricing built for bootstrappers</h2>
          <p className="text-center text-gray-400 mb-14">Start free. Upgrade when you're ready.</p>
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
                  <span className="text-xs font-semibold text-violet-400 uppercase tracking-widest mb-3">Best for Bootstrappers</span>
                )}
                <div className="text-xl font-bold mb-1">{plan.name}</div>
                <div className="text-3xl font-bold">{plan.price}</div>
                <div className="text-sm text-gray-400 mb-2">{plan.period}</div>
                <p className="text-xs text-gray-500 mb-5">{plan.description}</p>
                <ul className="space-y-2.5 flex-1 mb-6">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2 text-sm text-gray-300">
                      <span className="text-violet-400 mt-0.5">✓</span>{feat}
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
          <p className="text-center text-sm text-violet-400 font-medium mt-8">
            🎉 50% off first 3 months — use code <code className="bg-white/10 px-2 py-0.5 rounded">LAUNCH50</code>
          </p>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="px-6 py-20 text-center">
        <div className="mx-auto max-w-xl">
          <h2 className="text-3xl font-bold mb-4">Ready to run your startup smarter?</h2>
          <p className="text-gray-400 mb-8">Join 200+ bootstrapped founders using AI Finance Ops.</p>
          <Link
            href="/auth/sign-up"
            className="inline-flex items-center justify-center rounded-lg bg-violet-500 px-8 py-3.5 text-base font-semibold text-white hover:bg-violet-400 transition-colors"
          >
            Get Started Free →
          </Link>
        </div>
      </section>

    </main>
  )
}
