import type { Metadata } from "next"
import Link from "next/link"
import { OptimizedImage } from "@/components/OptimizedImage"
import { Users, Check } from "lucide-react"

export const metadata: Metadata = {
  title: "Churn Rate Calculator for SaaS Startups — Free Tool",
  description:
    "Calculate your monthly and annual churn rate instantly. Understand what churn means for your SaaS growth.",
  openGraph: {
    title: "Churn Rate Calculator for SaaS Startups — Free Tool",
    description:
      "Calculate your monthly and annual churn rate instantly. Understand what churn means for your SaaS growth.",
    url: "https://aifinanceops.app/churn-calculator",
    siteName: "AI Finance Ops",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "AI Finance Ops Churn Calculator" }],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Churn Rate Calculator for SaaS Startups — Free Tool",
    description:
      "Calculate your monthly and annual churn rate instantly. Understand what churn means for your SaaS growth.",
    images: ["/og-image.png"],
  },
}

export default function ChurnCalculatorPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 pt-32 pb-16 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold tracking-widest uppercase text-emerald-400 mb-6">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          Free Tool
        </div>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-6">
          Churn Rate Calculator<br />
          <span className="text-emerald-400">for SaaS Startups</span>
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
          Know your churn rate in seconds. Understand exactly what it means for your growth.
        </p>
        <Link
          href="/register"
          className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-8 py-3 text-base font-medium text-white hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/25 hover:-translate-y-0.5"
        >
          Track churn automatically — start free
        </Link>
        <OptimizedImage
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=630&fit=crop"
          alt="Churn rate analytics dashboard showing customer retention metrics"
          className="w-full max-w-4xl mx-auto mt-12 rounded-xl aspect-video object-cover shadow-2xl"
          width={1200}
          height={630}
        />
      </section>

      {/* What is Churn */}
      <section className="border-t border-gray-800 px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            What is Churn Rate?
          </h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            Churn rate is the percentage of customers who cancel their subscription in a given period.
          </p>
          <div className="border border-gray-800 bg-gray-900/50 rounded-xl p-6 mb-6">
            <div className="text-sm font-mono text-emerald-400 mb-2">Formula</div>
            <div className="text-lg font-mono text-white">
              Churn Rate = (Customers Lost &divide; Customers at Start) &times; 100
            </div>
          </div>
          <div className="border border-gray-800 bg-gray-900/50 rounded-xl p-6">
            <div className="text-sm text-gray-400">Example</div>
            <div className="text-white font-mono text-lg mt-1">
              100 customers &rarr; 5 cancel = <span className="text-emerald-400 font-bold">5% monthly churn</span>
            </div>
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="border-t border-gray-800 bg-gray-900/30 px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
            Why Churn Rate Kills SaaS Businesses
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { month: "Month 1", customers: 100, color: "text-emerald-400" },
              { month: "Month 6", customers: 74, color: "text-amber-400" },
              { month: "Month 12", customers: 54, color: "text-red-400" },
            ].map((m) => (
              <div
                key={m.month}
                className="border border-gray-800 bg-gray-900/50 rounded-xl p-6 text-center"
              >
                <div className="text-xs text-gray-500 uppercase tracking-widest mb-2">{m.month}</div>
                <div className={`text-4xl font-bold ${m.color}`}>{m.customers}</div>
                <div className="text-sm text-gray-500 mt-1">customers remaining</div>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-400 mt-8 max-w-xl mx-auto">
            At 5% monthly churn, you&apos;re losing half your business every year. That&apos;s why tracking churn is non-negotiable.
          </p>
        </div>
      </section>

      {/* How to Reduce */}
      <section className="border-t border-gray-800 px-6 py-20">
        <div className="mx-auto max-w-5xl grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              How to Reduce Churn with AI Finance Ops
            </h2>
            <p className="text-gray-400 leading-relaxed mb-8">
              AI Finance Ops doesn&apos;t just calculate churn — it helps you prevent it.
            </p>
            <div className="space-y-4">
              {[
                "Identifies which customers are at risk of churning",
                "Alerts you when churn spikes happen",
                "Shows the revenue impact of each cancellation",
                "Tracks trends over time so you can see what's working",
              ].map((f) => (
                <div key={f} className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-emerald-500 mt-0.5 shrink-0" />
                  <span className="text-sm text-gray-300">{f}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="border border-emerald-500/30 bg-emerald-500/5 rounded-2xl p-8">
            <div className="text-lg font-bold text-white mb-4">Track churn automatically</div>
            <ul className="space-y-3">
              {[
                "Real-time churn dashboard",
                "Automatic MRR & churn calculations",
                "At-risk customer identification",
                "Export-ready reports",
              ].map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm text-gray-300">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href="/register"
              className="mt-6 block w-full text-center rounded-lg bg-emerald-500 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/25"
            >
              Try AI Finance Ops free
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
