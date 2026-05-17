import type { Metadata } from "next"
import Link from "next/link"
import { OptimizedImage } from "@/components/OptimizedImage"
import { Calculator, Clock, TrendingUp, Check } from "lucide-react"

export const metadata: Metadata = {
  title: "Runway Calculator for SaaS Startups — Free Tool",
  description:
    "Calculate your SaaS runway instantly. See how many months until you run out of cash — and what to do about it.",
  openGraph: {
    title: "Runway Calculator for SaaS Startups — Free Tool",
    description:
      "Calculate your SaaS runway instantly. See how many months until you run out of cash — and what to do about it.",
    url: "https://www.aifinanceops.app/runway-calculator",
    siteName: "AI Finance Ops",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "AI Finance Ops Runway Calculator" }],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Runway Calculator for SaaS Startups — Free Tool",
    description:
      "Calculate your SaaS runway instantly. See how many months until you run out of cash — and what to do about it.",
    images: ["/og-image.png"],
  },
}

export default function RunwayCalculatorPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 pt-32 pb-16 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold tracking-widest uppercase text-emerald-400 mb-6">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          Free Tool
        </div>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-6">
          Runway Calculator<br />
          <span className="text-emerald-400">for SaaS Startups</span>
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
          Know exactly how many months you have before you run out of cash — and what actions you can
          take to extend your runway.
        </p>
        <Link
          href="/register"
          className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-8 py-3 text-base font-medium text-white hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/25 hover:-translate-y-0.5"
        >
          Track your runway — start free
        </Link>
        <OptimizedImage
          src="https://images.unsplash.com/photo-1553484771-047a44eee27b?w=1200&h=630&fit=crop"
          alt="SaaS runway calculator with burn rate and cash projections"
          className="w-full max-w-4xl mx-auto mt-12 rounded-xl aspect-video object-cover shadow-2xl"
          width={1200}
          height={630}
        />
      </section>

      {/* Key Metrics */}
      <section className="border-t border-gray-800 px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Calculator, label: "Cash Balance", desc: "See your current cash position at a glance." },
              { icon: Clock, label: "Months of Runway", desc: "Know exactly how long your cash will last at your current burn rate." },
              { icon: TrendingUp, label: "Burn Rate", desc: "Track your monthly expenses and see where you can cut." },
            ].map((f) => (
              <div
                key={f.label}
                className="border border-gray-800 bg-gray-900/50 rounded-xl p-6 text-center hover:border-gray-700 transition-colors"
              >
                <f.icon className="h-8 w-8 mx-auto mb-3 text-emerald-400" />
                <div className="text-sm font-semibold text-white mb-1">{f.label}</div>
                <div className="text-xs text-gray-500">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Runway Matters */}
      <section className="border-t border-gray-800 bg-gray-900/30 px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Why Runway Matters
          </h2>
          <p className="text-gray-400 leading-relaxed mb-8">
            Most founders don&apos;t know their exact runway. They have a vague sense of &quot;I think we have
            enough for a few months.&quot; That ambiguity kills startups. AI Finance Ops calculates your runway
            automatically and shows you exactly how many months you have left.
          </p>
          <div className="space-y-4">
            {[
              "Automatic runway calculation based on real cash flow data",
              "Alerts when your runway drops below 3 months",
              "What-if scenarios to see how cuts extend your runway",
              "Share runway reports with co-founders or investors",
            ].map((f) => (
              <div key={f} className="flex items-start gap-3">
                <Check className="h-5 w-5 text-emerald-500 mt-0.5 shrink-0" />
                <span className="text-sm text-gray-300">{f}</span>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-8 py-3 text-base font-medium text-white hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/25 hover:-translate-y-0.5"
            >
              Try AI Finance Ops free
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
