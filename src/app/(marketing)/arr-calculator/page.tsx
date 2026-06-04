import type { Metadata } from 'next'
import { ARRCalculatorClient } from './client'

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
  return <ARRCalculatorClient />
}
