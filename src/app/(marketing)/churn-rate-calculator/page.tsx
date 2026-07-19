import type { Metadata } from 'next'
import { ChurnCalculatorClient } from './client'

export const metadata: Metadata = {
  title: 'Free Churn Rate Calculator | Calculate SaaS Customer & Revenue Churn',
  description: 'Calculate your SaaS churn rate instantly. Free churn rate calculator — enter your customers or MRR at the start and end of any period and get customer churn rate, revenue churn rate, and net revenue retention.',
  alternates: { canonical: 'https://aifinanceops.app/churn-rate-calculator' },
  openGraph: {
    title: 'Free Churn Rate Calculator | AI Finance Ops',
    description: 'Calculate your SaaS customer churn rate and revenue churn rate instantly.',
    url: 'https://aifinanceops.app/churn-rate-calculator',
    siteName: 'AI Finance Ops',
    images: [{ url: 'https://aifinanceops.app/og/churn-rate-calculator.png', width: 1200, height: 630, alt: 'Churn Rate Calculator' }],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Churn Rate Calculator | AI Finance Ops',
    description: 'Calculate your SaaS customer churn rate and revenue churn rate instantly.',
    images: ['https://aifinanceops.app/og/churn-rate-calculator.png'],
  },
}

export default function ChurnCalculatorPage() {
  return <ChurnCalculatorClient />
}
