import type { Metadata } from "next"
import Link from "next/link"
import PricingCards from "@/components/pricing/PricingCards"
import { InternalLinks, CALCULATOR_LINKS, COMPARISON_LINKS, BLOG_LINKS } from "@/components/seo/InternalLinks"

export const metadata: Metadata = {
  title: 'Pricing — AI Finance Ops',
  description: 'Simple pricing for SaaS financial automation. Start free, upgrade when you grow.',
  alternates: { canonical: 'https://aifinanceops.app/pricing' },
}

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-950 pt-24 pb-24 px-6">
      <div className="mx-auto max-w-6xl">

        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">Simple, transparent pricing</h1>
          <p className="text-lg text-gray-400">Start free. Upgrade when you need more power.</p>
        </div>

        {/* Pricing cards */}
        <PricingCards />

        <p className="mt-12 text-center text-sm text-gray-500">
          14-day free trial &bull; No credit card required &bull; Cancel anytime
        </p>

        {/* ─── FAQ section ─────────────────────────────── */}
        <div className="mt-24 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-10">Frequently asked questions</h2>
          <div className="space-y-6">
            {[
              {
                q: 'How is MRR calculated?',
                a: 'We pull data directly from your Stripe account via read-only OAuth. MRR is calculated from actual paid invoices — annual plans are normalized to monthly, trials and refunds are excluded. No SQL or manual exports needed.',
              },
              {
                q: 'Can I connect multiple payment processors?',
                a: 'Yes. You can connect Stripe, PayPal, and LemonSqueezy. Revenue from all sources is unified into a single MRR dashboard.',
              },
              {
                q: 'Is my financial data safe?',
                a: 'We use read-only OAuth access — we can never move money or modify your Stripe account. All data is encrypted at rest and in transit. We are SOC 2 compliant.',
              },
              {
                q: 'What happens after the free trial?',
                a: 'After 14 days, you can choose a paid plan or stay on the free tier with limited history. No credit card is required to start.',
              },
              {
                q: 'Do you have a Baremetrics or ChartMogul alternative?',
                a: <>Yes. See our detailed comparisons: <Link href="/vs-baremetrics" className="text-emerald-400 hover:underline">AI Finance Ops vs Baremetrics</Link> and <Link href="/vs-chartmogul" className="text-emerald-400 hover:underline">AI Finance Ops vs ChartMogul</Link>.</>,
              },
            ].map(({ q, a }) => (
              <div key={q} className="border border-gray-800 rounded-xl p-6">
                <h3 className="text-white font-semibold mb-2">{q}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Internal links ───────────────────────────── */}
        <div className="mt-24 border-t border-gray-800 pt-16">
          <InternalLinks
            links={CALCULATOR_LINKS}
            title="Free SaaS Calculators"
            variant="grid"
          />
          <InternalLinks
            links={COMPARISON_LINKS}
            title="See How We Compare"
            variant="grid"
          />
          <InternalLinks
            links={BLOG_LINKS}
            title="Learn More"
            variant="list"
          />
        </div>

      </div>
    </div>
  )
}
