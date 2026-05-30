import type { Metadata } from "next"
import PricingCards from "@/components/pricing/PricingCards"

export const metadata: Metadata = {
  title: 'Pricing — AI Finance Ops',
  description: 'Simple pricing for SaaS financial automation. Start free, upgrade when you grow.',
  alternates: { canonical: 'https://aifinanceops.app/pricing' },
}

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-950 pt-24 pb-24 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">Simple, transparent pricing</h1>
          <p className="text-lg text-gray-400">Start free. Upgrade when you need more power.</p>
        </div>

        <PricingCards />

        <p className="mt-12 text-center text-sm text-gray-500">
          14-day free trial &bull; No credit card required &bull; Cancel anytime
        </p>
      </div>
    </div>
  )
}
