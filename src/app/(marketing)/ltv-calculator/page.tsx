import type { Metadata } from 'next'
import { LTVCalculatorClient } from './client'

export const metadata: Metadata = {
  title: 'Free LTV Calculator | Customer Lifetime Value for SaaS',
  description: 'Calculate Customer Lifetime Value (LTV) and LTV:CAC ratio for your SaaS. Free LTV calculator — see how much each customer is worth and whether your acquisition cost is sustainable.',
  alternates: { canonical: 'https://aifinanceops.app/ltv-calculator' },
  openGraph: {
    title: 'Free LTV Calculator | AI Finance Ops',
    description: 'Calculate Customer Lifetime Value and LTV:CAC ratio for your SaaS.',
    url: 'https://aifinanceops.app/ltv-calculator',
    images: [{ url: 'https://aifinanceops.app/og/ltv-calculator.png', width: 1200, height: 630 }],
  },
}

export default function LTVCalculatorPage() {
  return <LTVCalculatorClient />
}
