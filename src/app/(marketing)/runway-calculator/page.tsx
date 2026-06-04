import type { Metadata } from 'next'
import { RunwayCalculatorClient } from './client'

export const metadata: Metadata = {
  title: 'Free Startup Runway Calculator | How Many Months of Runway?',
  description: 'Calculate your startup runway instantly. Free runway calculator — enter your cash balance and monthly burn rate to see how many months of runway you have and when you need to fundraise.',
  alternates: { canonical: 'https://aifinanceops.app/runway-calculator' },
  openGraph: {
    title: 'Free Runway Calculator | AI Finance Ops',
    description: 'Calculate how many months of startup runway you have.',
    url: 'https://aifinanceops.app/runway-calculator',
    images: [{ url: 'https://aifinanceops.app/og/runway-calculator.png', width: 1200, height: 630 }],
  },
}

export default function RunwayCalculatorPage() {
  return <RunwayCalculatorClient />
}
