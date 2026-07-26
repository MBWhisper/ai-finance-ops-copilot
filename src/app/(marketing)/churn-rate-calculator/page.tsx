import type { Metadata } from 'next'
import Link from 'next/link'
import { ChurnCalculatorClient } from './client'
import { InternalLinks } from '@/components/InternalLinks'
import { Check } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Free Churn Rate Calculator | Calculate SaaS Customer & Revenue Churn',
  description: 'Calculate your SaaS churn rate instantly. Free churn rate calculator — enter your customers or MRR at the start and end of any period and get customer churn rate, revenue churn rate, and net revenue retention.',
  alternates: { canonical: 'https://aifinanceops.app/churn-rate-calculator' },
  openGraph: {
    title: 'Free Churn Rate Calculator | AI Finance Ops',
    description: 'Calculate your SaaS customer churn rate and revenue churn rate instantly.',
    url: 'https://aifinanceops.app/churn-rate-calculator',
    siteName: 'AI Finance Ops',
    images: [{ url: 'https://aifinanceops.app/og-image.png', width: 1200, height: 630, alt: 'Churn Rate Calculator' }],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Churn Rate Calculator | AI Finance Ops',
    description: 'Calculate your SaaS customer churn rate and revenue churn rate instantly.',
    images: ['https://aifinanceops.app/og-image.png'],
  },
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do you calculate churn rate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Churn Rate = (Customers Lost ÷ Customers at Start) × 100. For example, if you start with 100 customers and 5 cancel, your monthly churn rate is 5%.",
      },
    },
    {
      "@type": "Question",
      name: "What is a good churn rate for SaaS?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Monthly churn: below 5% is good, below 2% is excellent. Annual churn: below 10% is good, below 5% is excellent. B2B SaaS typically has lower churn than B2C. Enterprise SaaS targets below 1% monthly.",
      },
    },
    {
      "@type": "Question",
      name: "What is revenue churn vs customer churn?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Customer churn counts the percentage of customers who leave. Revenue churn counts the percentage of MRR lost. Revenue churn is more important for SaaS because losing one $500/mo customer hurts more than losing five $10/mo customers.",
      },
    },
    {
      "@type": "Question",
      name: "How does churn affect LTV?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "LTV = ARPU ÷ Churn Rate. Higher churn directly reduces lifetime value. Reducing churn from 5% to 3% increases LTV by 67% — from $2,000 to $3,333 for a $100 ARPU customer.",
      },
    },
    {
      "@type": "Question",
      name: "What is net revenue retention?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Net Revenue Retention (NRR) = (Starting MRR + Expansion - Contraction - Churned) ÷ Starting MRR. Above 100% means existing customers are growing even without new signups. Best-in-class SaaS companies achieve 120%+ NRR.",
      },
    },
  ],
}

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Calculate SaaS Churn Rate",
  description: "Step-by-step guide to calculating customer and revenue churn rate for your SaaS business.",
  step: [
    {
      "@type": "HowToStep",
      name: "Choose your time period",
      text: "Decide whether you're calculating monthly, quarterly, or annual churn. Monthly is most common for SaaS.",
    },
    {
      "@type": "HowToStep",
      name: "Count customers at the start",
      text: "Record how many active paying customers you had at the beginning of the period.",
    },
    {
      "@type": "HowToStep",
      name: "Count customers who cancelled",
      text: "Count how many customers cancelled or churned during the period.",
    },
    {
      "@type": "HowToStep",
      name: "Apply the formula",
      text: "Churn Rate = (Customers Lost ÷ Customers at Start) × 100. Example: 8 lost ÷ 200 start = 4% monthly churn.",
    },
  ],
}

export default function ChurnCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <div className="min-h-screen bg-gray-950 text-gray-100">
        {/* Hero */}
        <section className="mx-auto max-w-5xl px-6 pt-32 pb-16 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold tracking-widest uppercase text-emerald-400 mb-6">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Free Tool
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-6">
            Churn Rate Calculator<br />
            <span className="text-emerald-400">for SaaS Businesses</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
            Calculate your customer churn rate and revenue churn rate instantly.
            Understand what churn means for your{" "}
            <Link href="/ltv-calculator" className="text-emerald-400 hover:underline">LTV</Link>,{" "}
            <Link href="/mrr-calculator" className="text-emerald-400 hover:underline">MRR</Link>, and{" "}
            <Link href="/runway-calculator" className="text-emerald-400 hover:underline">runway</Link>.
          </p>
          <p className="text-sm text-gray-500 max-w-xl mx-auto mb-8">
            Churn directly impacts MRR and LTV.{" "}
            <Link href="/what-is-mrr" className="text-emerald-400 hover:underline">Learn how churn affects MRR →</Link>
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-8 py-3 text-base font-medium text-white hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/25 hover:-translate-y-0.5"
          >
            Track churn automatically — start free
          </Link>
        </section>

        <ChurnCalculatorClient />

        {/* Customer vs Revenue Churn */}
        <section className="border-t border-gray-800 px-6 py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Customer Churn vs Revenue Churn
            </h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              There are two types of churn every SaaS founder must understand. They tell different stories
              about the health of your business:
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="border border-gray-800 bg-gray-900/50 rounded-xl p-6">
                <div className="text-sm font-bold text-emerald-400 mb-2">Customer Churn Rate</div>
                <div className="text-sm text-gray-500 mb-3">Measures people, not revenue</div>
                <div className="font-mono text-sm text-white mb-2">
                  (Lost Customers ÷ Start Customers) × 100
                </div>
                <div className="text-xs text-gray-500">
                  Example: 8 lost from 200 = <span className="text-emerald-400">4% customer churn</span>
                </div>
              </div>
              <div className="border border-gray-800 bg-gray-900/50 rounded-xl p-6">
                <div className="text-sm font-bold text-blue-400 mb-2">Revenue Churn Rate</div>
                <div className="text-sm text-gray-500 mb-3">Measures MRR lost — more important</div>
                <div className="font-mono text-sm text-white mb-2">
                  (Churned MRR ÷ Starting MRR) × 100
                </div>
                <div className="text-xs text-gray-500">
                  Example: $640 lost from $16,000 = <span className="text-blue-400">4% revenue churn</span>
                </div>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed mt-6">
              <strong className="text-white">Why this matters:</strong> Losing one $500/mo enterprise customer
              hurts more than losing ten $10/mo customers. Revenue churn captures this impact; customer churn does not.
              Always track both, but prioritize revenue churn for strategic decisions.
            </p>
          </div>
        </section>

        {/* Churn Rate Benchmarks */}
        <section className="border-t border-gray-800 bg-gray-900/30 px-6 py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Churn Rate Benchmarks
            </h2>
            <p className="text-gray-400 leading-relaxed mb-8">
              What counts as &ldquo;good&rdquo; churn depends on your business model, price point, and customer segment.
              Here are 2026 SaaS benchmarks.{" "}
              <Link href="/saas-benchmarks-2026" className="text-emerald-400 hover:underline">See full churn benchmarks for your industry →</Link>
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="p-4 font-semibold text-gray-300">Rating</th>
                    <th className="p-4 font-semibold text-gray-300">Monthly Churn</th>
                    <th className="p-4 font-semibold text-gray-300">Annual Churn</th>
                    <th className="p-4 font-semibold text-gray-300">Typical For</th>
                  </tr>
                </thead>
                <tbody className="text-gray-400">
                  <tr className="border-b border-gray-800/50">
                    <td className="p-4 font-medium text-emerald-400">Excellent</td>
                    <td className="p-4">&lt; 2%</td>
                    <td className="p-4">&lt; 22%</td>
                    <td className="p-4">Enterprise SaaS, high-touch</td>
                  </tr>
                  <tr className="border-b border-gray-800/50">
                    <td className="p-4 font-medium text-emerald-400">Good</td>
                    <td className="p-4">2 – 5%</td>
                    <td className="p-4">22 – 46%</td>
                    <td className="p-4">B2B SaaS, mid-market</td>
                  </tr>
                  <tr className="border-b border-gray-800/50">
                    <td className="p-4 font-medium text-amber-400">Warning</td>
                    <td className="p-4">5 – 8%</td>
                    <td className="p-4">46 – 63%</td>
                    <td className="p-4">Early-stage, finding PMF</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium text-red-400">Danger</td>
                    <td className="p-4">&gt; 8%</td>
                    <td className="p-4">&gt; 63%</td>
                    <td className="p-4">Needs immediate attention</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Common Churn Mistakes */}
        <section className="border-t border-gray-800 px-6 py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Common Churn Calculation Mistakes
            </h2>
            <div className="space-y-6">
              {[
                {
                  mistake: "Using the wrong time period",
                  fix: "Be consistent. If you calculate monthly churn, compare it to other monthly figures. Mixing monthly and annual churn rates leads to misleading conclusions.",
                },
                {
                  mistake: "Ignoring expansion and contraction",
                  fix: "Revenue churn should account for downgrades (contraction) and upgrades (expansion). Net Revenue Churn = Churned MRR + Contraction MRR - Expansion MRR.",
                },
                {
                  mistake: "Not segmenting by customer type",
                  fix: "Enterprise customers often churn less than SMBs. Segmenting churn by plan, acquisition channel, or customer size reveals actionable insights.",
                },
              ].map((item, i) => (
                <div key={i} className="border border-gray-800 bg-gray-900/50 rounded-xl p-6">
                  <div className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-500/10 text-xs font-bold text-red-400">
                      {i + 1}
                    </span>
                    <div>
                      <div className="text-sm font-semibold text-red-400 mb-1">{item.mistake}</div>
                      <div className="text-sm text-gray-400">{item.fix}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Real Example */}
        <section className="border-t border-gray-800 bg-gray-900/30 px-6 py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Real Churn Calculation Example
            </h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              Here is a real-world example of how to calculate churn for a SaaS startup:
            </p>
            <div className="border border-gray-800 bg-gray-900/50 rounded-xl p-6 font-mono text-sm space-y-2">
              <div className="text-emerald-400 font-sans font-semibold text-xs uppercase tracking-widest mb-3">January Churn</div>
              <div className="text-gray-300">Customers at start: <span className="text-white">200</span></div>
              <div className="text-gray-300">Customers lost: <span className="text-red-400">8</span></div>
              <div className="border-t border-gray-700 my-2" />
              <div className="text-gray-300">Customer Churn = (8 ÷ 200) × 100 = <span className="text-emerald-400 font-bold">4%</span></div>
            </div>
            <div className="mt-4 border border-gray-800 bg-gray-900/50 rounded-xl p-6 font-mono text-sm space-y-2">
              <div className="text-blue-400 font-sans font-semibold text-xs uppercase tracking-widest mb-3">Revenue Churn</div>
              <div className="text-gray-300">Starting MRR: <span className="text-white">$16,000</span></div>
              <div className="text-gray-300">Churned MRR: <span className="text-red-400">$640</span></div>
              <div className="border-t border-gray-700 my-2" />
              <div className="text-gray-300">Revenue Churn = ($640 ÷ $16,000) × 100 = <span className="text-blue-400 font-bold">4%</span></div>
            </div>
            <div className="mt-4 border border-gray-800 bg-gray-900/50 rounded-xl p-6 font-mono text-sm space-y-2">
              <div className="text-amber-400 font-sans font-semibold text-xs uppercase tracking-widest mb-3">Impact on LTV</div>
              <div className="text-gray-300">ARPU: <span className="text-white">$80/mo</span></div>
              <div className="text-gray-300">Churn Rate: <span className="text-white">4%</span></div>
              <div className="text-gray-300">LTV = $80 ÷ 0.04 = <span className="text-emerald-400 font-bold text-lg">$2,000</span></div>
              <div className="text-gray-500 text-xs mt-2">If churn dropped to 3%, LTV would increase to $2,667 (+33%)</div>
            </div>
          </div>
        </section>

        {/* How to Reduce Churn */}
        <section className="border-t border-gray-800 px-6 py-20">
          <div className="mx-auto max-w-5xl grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                How to Reduce Churn with AI Finance Ops
              </h2>
              <p className="text-gray-400 leading-relaxed mb-8">
                AI Finance Ops doesn&apos;t just calculate churn — it helps you prevent it with
                AI-powered alerts and cohort analysis.
              </p>
              <div className="space-y-4">
                {[
                  "Identifies which customers are at risk of churning",
                  "Alerts you when churn spikes happen",
                  "Shows the revenue impact of each cancellation",
                  "Tracks trends over time so you can see what's working",
                ].map((f) => (
                  <div key={f} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-emerald-500 mt-0.5 shrink-0" />
                    <span className="text-sm text-gray-300">{f}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="border border-emerald-500/30 bg-emerald-500/5 rounded-2xl p-8">
              <div className="text-lg font-bold text-white mb-4">Track churn automatically</div>
              <ul className="space-y-3">
                {[
                  "Real-time churn dashboard",
                  "Automatic MRR & churn calculations",
                  "At-risk customer identification",
                  "Export-ready reports",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-gray-300">
                    <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/register"
                className="mt-6 block w-full text-center rounded-lg bg-emerald-500 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/25"
              >
                Try AI Finance Ops free
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-gray-800 px-6 py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold text-white mb-10">
              Churn Rate Frequently Asked Questions
            </h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">How do you calculate churn rate?</h3>
                <p className="text-gray-400 leading-relaxed">
                  <strong className="text-white">Churn Rate = (Customers Lost ÷ Customers at Start) × 100</strong>.
                  If you start with 100 customers and 5 cancel during the month, your churn rate is 5%.
                  For revenue churn, use MRR instead of customer counts.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">What is a good churn rate for SaaS?</h3>
                <p className="text-gray-400 leading-relaxed">
                  Monthly churn below 5% is considered good for B2B SaaS. Below 2% is excellent.
                  Enterprise SaaS should target below 1% monthly. B2C SaaS can tolerate higher churn
                  (up to 7% monthly) because of higher volume.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">What is revenue churn vs customer churn?</h3>
                <p className="text-gray-400 leading-relaxed">
                  Customer churn counts the percentage of people who leave. Revenue churn counts the
                  percentage of MRR lost. Revenue churn is more important for SaaS because it directly
                  impacts your{" "}
                  <Link href="/mrr-calculator" className="text-emerald-400 hover:underline">MRR</Link>{" "}
                  and{" "}
                  <Link href="/ltv-calculator" className="text-emerald-400 hover:underline">LTV</Link>.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">How does churn affect LTV?</h3>
                <p className="text-gray-400 leading-relaxed">
                  LTV = ARPU ÷ Churn Rate. Reducing churn from 5% to 3% increases LTV by 67%.
                  A $100 ARPU customer goes from $2,000 LTV to $3,333 LTV — that&apos;s $1,333
                  more revenue per customer without acquiring anyone new.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">What is net revenue retention?</h3>
                <p className="text-gray-400 leading-relaxed">
                  Net Revenue Retention (NRR) = (Starting MRR + Expansion - Contraction - Churned) ÷ Starting MRR.
                  Above 100% means existing customers are spending more over time. Best-in-class SaaS
                  companies achieve 120%+ NRR.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-gray-800 px-6 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Stop Churning. Start Growing.</h2>
            <p className="text-gray-400 mb-8">
              AI Finance Ops tracks churn automatically, alerts you to spikes, and shows you exactly
              which customers are at risk — before they cancel.{" "}
              <Link href="/vs-baremetrics" className="text-emerald-400 hover:underline">See how we compare to Baremetrics →</Link>
            </p>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-10 py-4 text-base font-semibold text-white hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/25"
            >
              Start free — no credit card required
            </Link>
          </div>
        </section>

        <InternalLinks
          variant="mixed"
          exclude="/churn-rate-calculator"
          title="More Free SaaS Finance Tools"
          limit={8}
        />
      </div>
    </>
  )
}
