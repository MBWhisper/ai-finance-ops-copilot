import type { Metadata } from 'next'
import { MRRCalculatorClient } from './client'

export const metadata: Metadata = {
  title: 'Free MRR Calculator | Calculate Monthly Recurring Revenue',
  description: 'Calculate your Monthly Recurring Revenue (MRR) instantly. Free MRR calculator for SaaS founders — enter your active subscriptions and get your MRR, ARR, and average revenue per user.',
  alternates: { canonical: 'https://aifinanceops.app/mrr-calculator' },
  openGraph: {
    title: 'Free MRR Calculator | AI Finance Ops',
    description: 'Calculate your Monthly Recurring Revenue instantly. Free for SaaS founders.',
    url: 'https://aifinanceops.app/mrr-calculator',
    images: [{ url: 'https://aifinanceops.app/og/mrr-calculator.png', width: 1200, height: 630 }],
  },
}

export default function MRRCalculatorPage() {
  return <MRRCalculatorClient />
}
