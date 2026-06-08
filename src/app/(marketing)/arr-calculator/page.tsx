import type { Metadata } from 'next'
import Link from 'next/link'
import { ARRCalculatorClient } from './client'
import { InternalLinks } from '@/components/InternalLinks'

export const metadata: Metadata = {
  title: 'Free ARR Calculator | Annual Recurring Revenue for SaaS',
  description: 'Calculate Annual Recurring Revenue (ARR) instantly. Free ARR calculator for SaaS founders — enter your MRR or subscription plans and get your ARR, growth rate, and ARR milestones.',
  alternates: { canonical: 'https://aifinanceops.app/arr-calculator' },
  openGraph: {
    title: 'Free ARR Calculator | AI Finance Ops',
    description: 'Calculate Annual Recurring Revenue (ARR) instantly for your SaaS.',
    url: 'https://aifinanceops.app/arr-calculator',
    images: [{ url: 'https://aifinanceops.app/og/arr-calculator.png', width: 1200, height: 630 }],
  },
}

export default function ARRCalculatorPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <ARRCalculatorClient />

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
            <Link href="/churn-calculator" className="text-emerald-400 hover:underline">churn rate</Link>{' '}
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
