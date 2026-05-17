import type { Metadata } from "next"
import Link from "next/link"
import { OptimizedImage } from "@/components/OptimizedImage"
import { Check, X, Sparkles, DollarSign } from "lucide-react"

export const metadata: Metadata = {
  title: "Best Baremetrics Alternative for Small SaaS (2026)",
  description:
    "Looking for a cheaper Baremetrics alternative? AI Finance Ops gives you the same metrics at a fraction of the cost.",
  openGraph: {
    title: "Best Baremetrics Alternative for Small SaaS (2026)",
    description:
      "Looking for a cheaper Baremetrics alternative? AI Finance Ops gives you the same metrics at a fraction of the cost.",
    url: "https://www.aifinanceops.app/baremetrics-alternative",
    siteName: "AI Finance Ops",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "AI Finance Ops vs Baremetrics" }],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Baremetrics Alternative for Small SaaS (2026)",
    description:
      "Looking for a cheaper Baremetrics alternative? AI Finance Ops gives you the same metrics at a fraction of the cost.",
    images: ["/og-image.png"],
  },
}

const COMPARISON = [
  { feature: "MRR Tracking", bm: true, af: true },
  { feature: "Churn Analysis", bm: true, af: true },
  { feature: "Cash Flow Forecasting", bm: false, af: true },
  { feature: "AI-Powered Insights", bm: false, af: true },
  { feature: "Churn Risk Identification", bm: false, af: true },
  { feature: "Smart AR Reminders", bm: false, af: true },
]

export default function BaremetricsAlternativePage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 pt-32 pb-16 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold tracking-widest uppercase text-emerald-400 mb-6">
          <Sparkles className="h-3.5 w-3.5" />
          Alternative
        </div>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-6">
          The Best Baremetrics<br />
          <span className="text-emerald-400">Alternative for Small SaaS</span>
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
          Same MRR & churn metrics. AI-powered insights Baremetrics doesn&apos;t have.
          At a price that makes sense for bootstrapped founders.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/register"
            className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-8 py-3 text-base font-medium text-white hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/25 hover:-translate-y-0.5"
          >
            Start free — no credit card
          </Link>
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 rounded-full border border-gray-700 px-8 py-3 text-base font-medium text-gray-300 hover:border-gray-500 hover:text-white transition-all hover:-translate-y-0.5"
          >
            View pricing
          </Link>
        </div>
        <OptimizedImage
          src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=630&fit=crop"
          alt="SaaS analytics dashboard comparison with AI insights"
          className="w-full max-w-4xl mx-auto mt-12 rounded-xl aspect-video object-cover shadow-2xl"
          width={1200}
          height={630}
        />
      </section>

      {/* Why Alternatives */}
      <section className="border-t border-gray-800 px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Why Founders Look for Baremetrics Alternatives
          </h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            Baremetrics starts at <span className="text-red-400 font-semibold">$108/month</span> — expensive
            for early-stage founders with $0-$5K MRR. The metrics are great, but the price doesn&apos;t make
            sense when every dollar counts.
          </p>
          <p className="text-gray-400 leading-relaxed">
            AI Finance Ops was built specifically for solo founders and bootstrap startups who need the same
            financial clarity without the enterprise pricing.
          </p>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="border-t border-gray-800 bg-gray-900/30 px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
            AI Finance Ops vs Baremetrics
          </h2>
          <div className="border border-gray-800 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-3 bg-gray-900/80 border-b border-gray-800">
              <div className="p-4 text-sm font-semibold text-gray-400 uppercase tracking-widest">Feature</div>
              <div className="p-4 text-sm font-semibold text-gray-400 uppercase tracking-widest text-center">Baremetrics</div>
              <div className="p-4 text-sm font-semibold text-emerald-400 uppercase tracking-widest text-center">AI Finance Ops</div>
            </div>
            {COMPARISON.map((row) => (
              <div key={row.feature} className="grid grid-cols-3 border-b border-gray-800 last:border-0">
                <div className="p-4 text-sm text-gray-300">{row.feature}</div>
                <div className="p-4 flex justify-center items-center">
                  {row.bm ? (
                    <Check className="h-5 w-5 text-emerald-500" />
                  ) : (
                    <X className="h-5 w-5 text-red-500" />
                  )}
                </div>
                <div className="p-4 flex justify-center items-center">
                  <Check className="h-5 w-5 text-emerald-500" />
                </div>
              </div>
            ))}
            <div className="grid grid-cols-3 bg-gray-900/80 border-t border-gray-800">
              <div className="p-4 text-sm font-semibold text-gray-300">Price</div>
              <div className="p-4 text-sm text-center text-gray-400">$108/mo</div>
              <div className="p-4 text-sm text-center text-emerald-400 font-semibold">Much less</div>
            </div>
          </div>
        </div>
      </section>

      {/* Who Should Use */}
      <section className="border-t border-gray-800 px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Who Should Use AI Finance Ops?
          </h2>
          <div className="grid md:grid-cols-3 gap-4 text-left">
            {[
              { icon: "👤", title: "Solo SaaS Founders", desc: "Build your business, not your spreadsheets." },
              { icon: "🚀", title: "Bootstrap Startups", desc: "Under $10K MRR and every dollar counts." },
              { icon: "🔨", title: "Indie Hackers", desc: "Hate manual finance busywork as much as we do." },
            ].map((c) => (
              <div
                key={c.title}
                className="border border-gray-800 bg-gray-900/50 rounded-xl p-6 hover:border-gray-700 transition-colors"
              >
                <div className="text-2xl mb-3">{c.icon}</div>
                <div className="text-sm font-semibold text-white mb-1">{c.title}</div>
                <div className="text-xs text-gray-500">{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 text-center border-t border-gray-800">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Save $100+/month on your SaaS stack
          </h2>
          <p className="text-gray-400 mb-8">
            Get better metrics, AI insights, and a price that actually makes sense.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-8 py-3 text-base font-medium text-white hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/25 hover:-translate-y-0.5"
          >
            Try AI Finance Ops free
          </Link>
        </div>
      </section>
    </div>
  )
}
