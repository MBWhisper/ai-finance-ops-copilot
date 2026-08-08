import type { Metadata } from 'next'
import Link from 'next/link'
import { ARRCalculatorClient } from './client'
import { InternalLinks } from '@/components/InternalLinks'

export const metadata: Metadata = {
  title: 'Free ARR Calculator | Annual Recurring Revenue for SaaS',
  description: 'Calculate Annual Recurring Revenue (ARR) instantly with our free ARR calculator for SaaS founders. Enter your MRR or subscription plans, get your ARR, growth rate, ARR milestones, benchmarks by stage, and step-by-step calculation guide.',
  alternates: { canonical: 'https://aifinanceops.app/arr-calculator' },
  openGraph: {
    title: 'Free ARR Calculator | AI Finance Ops',
    description: 'Calculate Annual Recurring Revenue (ARR) instantly for your SaaS. Free ARR calculator with benchmarks, milestones, and growth tracking.',
    url: 'https://aifinanceops.app/arr-calculator',
    siteName: 'AI Finance Ops',
    images: [{ url: 'https://aifinanceops.app/og-image.png', width: 1200, height: 630, alt: 'ARR Calculator' }],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free ARR Calculator | AI Finance Ops',
    description: 'Calculate Annual Recurring Revenue (ARR) instantly for your SaaS.',
    images: ['https://aifinanceops.app/og-image.png'],
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do you calculate ARR?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ARR = MRR × 12. Alternatively, you can sum all active annual subscription values. For example, if you have 100 customers paying $50/month, your MRR is $5,000 and your ARR is $60,000.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is a good ARR for a SaaS startup?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ARR targets vary by stage: Pre-seed: $0–$60K, Seed: $60K–$300K, Series A: $300K–$1.2M, Growth stage: $1.2M+. These benchmarks help investors evaluate where your company stands relative to typical SaaS growth trajectories.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between ARR and MRR?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'MRR (Monthly Recurring Revenue) measures your recurring revenue for a single month. ARR (Annual Recurring Revenue) is your monthly recurring revenue annualized (ARR = MRR × 12). Use MRR for tracking month-over-month growth and ARR for investor reporting and benchmarking.',
      },
    },
    {
      '@type': 'Question',
      name: 'Should I use ARR or MRR for investor updates?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Early-stage startups should use MRR for tracking growth trends. Use ARR when comparing to industry benchmarks and when investors specifically request it. Most SaaS investors look at ARR for valuation and benchmarking, but MRR gives a more granular view of month-over-month traction.',
      },
    },
  ],
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate ARR (Annual Recurring Revenue)',
  description: 'A step-by-step guide to calculating your SaaS Annual Recurring Revenue.',
  step: [
    {
      '@type': 'HowToStep',
      name: 'Gather all active subscription data',
      text: 'Collect a list of all active paying customers and their current subscription plans, including monthly and annual billing cycles.',
    },
    {
      '@type': 'HowToStep',
      name: 'Convert monthly plans to annual',
      text: 'For each customer on a monthly plan, multiply their monthly subscription amount by 12 to convert it to an annual value.',
    },
    {
      '@type': 'HowToStep',
      name: 'Sum all annual values',
      text: 'Add up every customer\'s annual subscription value (including already-annual plans) to get your total ARR.',
    },
    {
      '@type': 'HowToStep',
      name: 'Subtract churned ARR',
      text: 'Remove any customers who have cancelled or downgraded during the period. The result is your Net ARR.',
    },
  ],
}

export default function ARRCalculatorPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      <ARRCalculatorClient />

      {/* What is ARR? */}
      <section className="border-t border-gray-800 px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            What is ARR?
          </h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            <strong className="text-gray-200">ARR (Annual Recurring Revenue)</strong> is the total
            predictable recurring revenue your SaaS business expects to receive over a 12-month
            period. It&apos;s the single most important metric for SaaS companies because it
            represents the forward-looking value of your subscription business.
          </p>
          <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6 mb-4">
            <p className="text-sm text-gray-500 mb-2">The ARR Formula</p>
            <p className="text-2xl font-bold text-emerald-400">ARR = MRR × 12</p>
            <p className="text-sm text-gray-400 mt-2">
              Where MRR (Monthly Recurring Revenue) is the sum of all active monthly subscription
              revenue.
            </p>
          </div>
          <p className="text-gray-400 leading-relaxed">
            ARR is not the same as annual revenue. It&apos;s a projection based on your current
            run rate and doesn&apos;t include one-time fees, services, or usage-based charges.
            Investors use ARR to benchmark SaaS companies and determine valuation multiples.
          </p>
        </div>
      </section>

      {/* ARR Benchmarks by SaaS Stage */}
      <section className="border-t border-gray-800 px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            ARR Benchmarks by SaaS Stage
          </h2>
          <p className="text-gray-400 leading-relaxed mb-8">
            Knowing where your ARR stands relative to your stage helps you set realistic goals and
            communicate effectively with investors.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Stage</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">ARR Range</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Typical MoM Growth</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr className="border-b border-gray-800/50">
                  <td className="py-3 px-4 font-medium text-white">Pre-seed</td>
                  <td className="py-3 px-4 text-emerald-400 font-semibold">$0 – $60K</td>
                  <td className="py-3 px-4">15 – 25%</td>
                </tr>
                <tr className="border-b border-gray-800/50">
                  <td className="py-3 px-4 font-medium text-white">Seed</td>
                  <td className="py-3 px-4 text-emerald-400 font-semibold">$60K – $300K</td>
                  <td className="py-3 px-4">10 – 20%</td>
                </tr>
                <tr className="border-b border-gray-800/50">
                  <td className="py-3 px-4 font-medium text-white">Series A</td>
                  <td className="py-3 px-4 text-emerald-400 font-semibold">$300K – $1.2M</td>
                  <td className="py-3 px-4">8 – 15%</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-white">Growth</td>
                  <td className="py-3 px-4 text-emerald-400 font-semibold">$1.2M+</td>
                  <td className="py-3 px-4">5 – 10%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Common ARR Mistakes */}
      <section className="border-t border-gray-800 px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Common ARR Mistakes
          </h2>
          <p className="text-gray-400 leading-relaxed mb-8">
            Even experienced SaaS founders make these mistakes when calculating ARR. Avoid them to
            keep your metrics accurate.
          </p>
          <div className="space-y-4">
            {[
              {
                title: 'Including non-recurring revenue',
                description:
                  'One-time setup fees, consulting revenue, and professional services should never be counted in ARR. Only include predictable subscription revenue.',
              },
              {
                title: 'Not annualizing monthly plans',
                description:
                  'If a customer pays $50/month, their ARR contribution is $600 — not $50. Every monthly subscriber must be multiplied by 12.',
              },
              {
                title: 'Counting trial users',
                description:
                  'Free trial users and freemium customers who haven\'t converted to a paid plan should not be included in your ARR calculation.',
              },
              {
                title: 'Using Gross ARR instead of Net ARR',
                description:
                  'Gross ARR includes all revenue before cancellations and downgrades. Net ARR subtracts churn and contraction, giving you a more accurate picture of true business health.',
              },
              {
                title: 'Not accounting for churn',
                description:
                  'If you add $10K in new MRR but lose $4K to churn, your net new ARR is only $72K — not $120K. Always account for churned and downgraded customers.',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-xl border border-gray-800 bg-gray-900/50 p-5"
              >
                <h3 className="text-white font-semibold mb-2">
                  <span className="text-emerald-400 mr-2">{i + 1}.</span>
                  {item.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Real ARR Calculation Example */}
      <section className="border-t border-gray-800 px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Real ARR Calculation Example
          </h2>
          <p className="text-gray-400 leading-relaxed mb-8">
            Let&apos;s walk through a real example to see how ARR is calculated step by step.
          </p>
          <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6 space-y-4">
            <div>
              <p className="text-sm text-gray-500 mb-2">Step 1: List all active subscriptions</p>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  <span className="text-white font-medium">40 customers</span> × $49/month ={' '}
                  <span className="text-emerald-400 font-semibold">$1,960</span>
                </p>
                <p className="text-gray-300">
                  <span className="text-white font-medium">10 customers</span> × $99/month ={' '}
                  <span className="text-emerald-400 font-semibold">$990</span>
                </p>
                <p className="text-gray-300">
                  <span className="text-white font-medium">2 customers</span> × $199/month ={' '}
                  <span className="text-emerald-400 font-semibold">$398</span>
                </p>
              </div>
            </div>
            <div className="border-t border-gray-800 pt-4">
              <p className="text-sm text-gray-500 mb-2">Step 2: Calculate total MRR</p>
              <p className="text-lg font-bold text-white">
                MRR = $1,960 + $990 + $398 ={' '}
                <span className="text-emerald-400">$3,348</span>
              </p>
            </div>
            <div className="border-t border-gray-800 pt-4">
              <p className="text-sm text-gray-500 mb-2">Step 3: Calculate ARR</p>
              <p className="text-lg font-bold text-white">
                ARR = $3,348 × 12 ={' '}
                <span className="text-emerald-400">$40,176</span>
              </p>
            </div>
          </div>
          <p className="text-gray-400 text-sm mt-4 leading-relaxed">
            This puts the company near the Pre-seed benchmark ($0–$60K ARR). With consistent 15%
            MoM growth, they&apos;d reach the $60K ARR threshold in about 4 months.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="border-t border-gray-800 px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqSchema.mainEntity.map((item, i) => (
              <details
                key={i}
                className="group rounded-xl border border-gray-800 bg-gray-900/50"
              >
                <summary className="cursor-pointer px-6 py-5 text-white font-semibold flex items-center justify-between hover:text-emerald-400 transition-colors">
                  {item.name}
                  <span className="text-gray-600 group-open:rotate-180 transition-transform ml-2">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </summary>
                <div className="px-6 pb-5 text-sm text-gray-400 leading-relaxed">
                  {item.acceptedAnswer.text}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-gray-800 px-6 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Track ARR automatically with AI Finance Ops
            </h2>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto">
              Stop calculating ARR manually. Connect your Stripe and get real-time ARR, MRR, churn,
              and milestone tracking — updated every day.
            </p>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-8 py-3.5 text-sm font-semibold text-white hover:bg-emerald-500 transition-all"
            >
              Start Free — No Card Required
            </Link>
          </div>
        </div>
      </section>

      {/* Context section with inline internal links */}
      <section className="border-t border-gray-800 px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            ARR in Context: The Full SaaS Finance Picture
          </h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            ARR is just one piece of the puzzle. Pair it with your{' '}
            <Link href="/mrr-calculator" className="text-emerald-400 hover:underline">MRR calculator</Link>{' '}
            to track monthly growth, your{' '}
            <Link href="/churn-rate-calculator" className="text-emerald-400 hover:underline">churn rate</Link>{' '}
            to see how much ARR you&apos;re losing, and your{' '}
            <Link href="/runway-calculator" className="text-emerald-400 hover:underline">runway calculator</Link>{' '}
            to know how long your current ARR sustains the business.
          </p>
          <p className="text-gray-400 leading-relaxed">
            For a deeper dive into all the numbers that matter, read our guide to{' '}
            <Link href="/blog/saas-financial-metrics" className="text-emerald-400 hover:underline">
              SaaS financial metrics
            </Link>
            . And if you&apos;re evaluating tools to track ARR automatically, see how we compare to{' '}
            <Link href="/vs-baremetrics" className="text-emerald-400 hover:underline">Baremetrics</Link>.
          </p>
        </div>
      </section>

      {/* Internal Links grid */}
      <InternalLinks
        variant="mixed"
        exclude="/arr-calculator"
        title="More Free SaaS Finance Tools"
        limit={8}
      />
    </div>
  )
}
