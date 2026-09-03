import type { Metadata } from "next"
import Link from "next/link"
import PricingCards from "@/components/pricing/PricingCards"
import { InternalLinks, CALCULATOR_LINKS, COMPARISON_LINKS, BLOG_LINKS } from "@/components/seo/InternalLinks"
import { FaqSchema } from "@/components/FaqSchema"
import { Check, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: 'Pricing — SaaS Financial Dashboard | Free Plan Available',
  description: 'Simple pricing for SaaS financial automation. Start free, upgrade when you grow. MRR tracking, cash flow forecasting, AI copilot — all included.',
  alternates: { canonical: 'https://aifinanceops.app/pricing' },
  openGraph: {
    title: 'Pricing — AI Finance Ops',
    description: 'Simple pricing for SaaS financial automation. Start free, upgrade when you grow.',
    url: 'https://aifinanceops.app/pricing',
    siteName: 'AI Finance Ops',
    images: [{ url: 'https://aifinanceops.app/og-image.png', width: 1200, height: 630, alt: 'AI Finance Ops Pricing' }],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pricing — AI Finance Ops',
    description: 'Simple pricing for SaaS financial automation. Start free, upgrade when you grow.',
    images: ['https://aifinanceops.app/og-image.png'],
  },
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

        {/* Feature Comparison Table */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-white text-center mb-12">What's included in each plan</h2>
          <div className="overflow-x-auto rounded-2xl border border-gray-800 bg-gray-900/50">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-800">
                  <th scope="col" className="p-5 text-sm font-semibold text-gray-500">Feature</th>
                  <th scope="col" className="p-5 text-sm font-semibold text-emerald-400">Free</th>
                  <th scope="col" className="p-5 text-sm font-semibold text-gray-400">Starter ($29/mo)</th>
                  <th scope="col" className="p-5 text-sm font-semibold text-gray-400">Growth ($99/mo)</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {[
                  { feature: "MRR Tracking", free: "✅", starter: "✅", growth: "✅" },
                  { feature: "Churn Analytics", free: "✅", starter: "✅", growth: "✅" },
                  { feature: "LTV Calculator", free: "✅", starter: "✅", growth: "✅" },
                  { feature: "Cash Flow Forecast", free: "30-day", starter: "60-day", growth: "90-day AI" },
                  { feature: "Runway Tracker", free: "✅", starter: "✅", growth: "✅" },
                  { feature: "AI Copilot", free: "❌", starter: "✅", growth: "✅" },
                  { feature: "Churn Alerts", free: "❌", starter: "✅", growth: "✅" },
                  { feature: "Automated Reports", free: "❌", starter: "✅", growth: "✅" },
                  { feature: "Team Members", free: "1", starter: "3", growth: "10" },
                  { feature: "Data History", free: "3 months", starter: "12 months", growth: "Unlimited" },
                  { feature: "Export Reports", free: "❌", starter: "✅", growth: "✅" },
                  { feature: "Priority Support", free: "❌", starter: "❌", growth: "✅" },
                ].map((row) => (
                  <tr key={row.feature} className="border-b border-gray-800/50 last:border-0">
                    <td className="p-5 text-gray-300 font-medium">{row.feature}</td>
                    <td className="p-5 text-gray-400">{row.free}</td>
                    <td className="p-5 text-gray-400">{row.starter}</td>
                    <td className="p-5 text-gray-400">{row.growth}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Why Upgrade */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Why upgrade from Free?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "AI Copilot", desc: "Ask questions about your metrics in plain English. Get insights you'd never find in spreadsheets. Available on Starter and Growth plans." },
              { title: "Churn Alerts", desc: "Get notified when customers are at risk of churning. Take action before you lose revenue. Included in all paid plans." },
              { title: "90-Day Forecasting", desc: "See 90 days ahead with AI-powered P50/P80/P95 scenarios. Plan hiring, investments, and runway with confidence." },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6">
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Cancel Anytime */}
        <div className="mt-24 rounded-2xl border border-gray-800 bg-gray-900/50 p-10 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Cancel anytime. No questions asked.</h2>
          <p className="text-gray-400 mb-6 max-w-xl mx-auto">
            Start with a 14-day free trial. No credit card required. If you decide AI Finance Ops isn't for you, cancel anytime — your data stays safe.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-emerald-400" />
              No long-term contracts
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-emerald-400" />
              Downgrade anytime
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-emerald-400" />
              Export your data
            </div>
          </div>
        </div>

        {/* FAQ section */}
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
                a: 'Stripe is fully supported today. PayPal and LemonSqueezy integrations are coming soon.',
              },
              {
                q: 'Is my financial data safe?',
                a: 'We use read-only OAuth access — we can never move money or modify your Stripe account. All data is encrypted at rest and in transit.',
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
      <FaqSchema items={[
        { question: "How is MRR calculated?", answer: "We pull data directly from your Stripe account via read-only OAuth. MRR is calculated from actual paid invoices — annual plans are normalized to monthly, trials and refunds are excluded. No SQL or manual exports needed." },
        { question: "Can I connect multiple payment processors?", answer: "Stripe is fully supported today. PayPal and LemonSqueezy integrations are coming soon." },
        { question: "Is my financial data safe?", answer: "We use read-only OAuth access — we can never move money or modify your Stripe account. All data is encrypted at rest and in transit." },
        { question: "What happens after the free trial?", answer: "After 14 days, you can choose a paid plan or stay on the free tier with limited history. No credit card is required to start." },
        { question: "Do you have a Baremetrics or ChartMogul alternative?", answer: "Yes. AI Finance Ops is a simpler, more affordable alternative to both Baremetrics and ChartMogul. See our comparison pages for details." },
      ]} />
    </div>
  )
}
