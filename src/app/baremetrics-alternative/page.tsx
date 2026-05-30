import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Best Baremetrics Alternative in 2026 — AI Finance Ops",
  description:
    "Looking for a Baremetrics alternative? AI Finance Ops offers smarter financial analytics powered by AI. Compare features, pricing, and more.",
  keywords: "baremetrics alternative, baremetrics vs, profitwell vs baremetrics, chartmogul vs baremetrics",
  alternates: { canonical: "https://aifinanceops.app/baremetrics-alternative" },
  openGraph: {
    title: "Best Baremetrics Alternative in 2026 — AI Finance Ops",
    description:
      "Looking for a Baremetrics alternative? AI Finance Ops offers smarter financial analytics powered by AI. Compare features, pricing, and more.",
    url: "https://aifinanceops.app/baremetrics-alternative",
    siteName: "AI Finance Ops",
    images: [
      {
        url: "https://aifinanceops.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "AI Finance Ops Dashboard",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Baremetrics Alternative in 2026 — AI Finance Ops",
    description:
      "Looking for a Baremetrics alternative? AI Finance Ops offers smarter financial analytics powered by AI. Compare features, pricing, and more.",
    images: ["https://aifinanceops.app/og-image.png"],
  },
}

export default function BaremetricsAlternativePage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Header and Nav are in layout, so we just need main content */}
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden px-6 py-24 sm:py-32 lg:px-8">
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-gray-950 to-gray-950" />
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-emerald-500/10 blur-3xl animate-pulse-glow" />
            <div className="absolute top-[15%] left-[10%] h-4 w-4 rounded-full bg-emerald-400/20 blur-sm animate-float" />
            <div className="absolute top-[30%] right-[15%] h-6 w-6 rounded-full bg-emerald-500/15 blur-sm animate-float-delayed" />
            <div className="absolute bottom-[25%] left-[20%] h-3 w-3 rounded-full bg-emerald-400/20 blur-sm animate-float" style={{ animationDelay: "2s" }} />
            <div className="absolute top-[20%] right-[30%] h-5 w-5 rounded-full bg-blue-400/10 blur-sm animate-float-delayed" style={{ animationDelay: "1s" }} />
          </div>

          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-7xl bg-gradient-to-r from-white via-emerald-300 to-white bg-clip-text text-transparent animate-gradient-shift">
              The Smarter Baremetrics Alternative
            </h1>
            <p className="mt-6 text-xl leading-8 text-gray-400 max-w-2xl mx-auto">
              Get all your SaaS metrics in one place — powered by AI. No spreadsheets. No complexity.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/signup"
                className="inline-flex items-center rounded-lg bg-emerald-500 px-8 py-4 text-base font-semibold text-white hover:bg-emerald-400 transition-all animate-pulse-glow"
              >
                Start Free <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/demo"
                className="inline-flex items-center rounded-lg border border-gray-700 px-8 py-4 text-base font-semibold text-gray-300 hover:border-gray-500 hover:text-white transition-colors"
              >
                Watch Demo
              </Link>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="border-t border-gray-800 px-6 py-24">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              AI Finance Ops vs Baremetrics: Feature Comparison
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-900">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Feature
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      AI Finance Ops
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Baremetrics
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      AI-powered insights
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-emerald-400">
                      ✅ Yes
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      ❌ No
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      Starting price
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-emerald-400">
                      Free plan available
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      $108/month
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      Setup time
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-emerald-400">
                      Under 5 minutes
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      30+ minutes
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      Natural language queries
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-emerald-400">
                      ✅ Yes
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      ❌ No
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      Stripe integration
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-emerald-400">
                      ✅ Yes
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      ✅ Yes
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      Real-time MRR tracking
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-emerald-400">
                      ✅ Yes
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      ✅ Yes
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      Churn prediction (AI)
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-emerald-400">
                      ✅ Yes
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      ❌ No
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      Custom reports
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-emerald-400">
                      ✅ Yes
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      Limited
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Why Switch Section */}
        <section className="border-t border-gray-800 px-6 py-24">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              Why Switch to AI Finance Ops?
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              {/* Card 1: 10x Cheaper */}
              <div className="rounded-2xl border border-gray-800 bg-gray-900 p-8 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-500/10 mx-auto mb-4">
                  <span className="text-2xl text-emerald-400">💰</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">10x Cheaper</h3>
                <p className="text-sm text-gray-400">
                  Start free, scale as you grow. No hidden fees or enterprise pricing.
                </p>
              </div>

              {/* Card 2: AI-Powered */}
              <div className="rounded-2xl border border-gray-800 bg-gray-900 p-8 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-500/10 mx-auto mb-4">
                  <span className="text-2xl text-emerald-400">🤖</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">AI-Powered</h3>
                <p className="text-sm text-gray-400">
                  Ask questions in plain English, get instant answers about your metrics.
                </p>
              </div>

              {/* Card 3: 5-Minute Setup */}
              <div className="rounded-2xl border border-gray-800 bg-gray-900 p-8 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-500/10 mx-auto mb-4">
                  <span className="text-2xl text-emerald-400">⚡</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">5-Minute Setup</h3>
                <p className="text-sm text-gray-400">
                  Connect Stripe and you&apos;re live. No CSV uploads or setup calls.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="border-t border-gray-800 px-6 py-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to switch from Baremetrics?
            </h2>
            <p className="text-lg text-gray-400 mb-8">
              Join founders who chose smarter financial analytics
            </p>
            <Link
              href="/signup"
              className="inline-flex items-center rounded-lg bg-emerald-500 px-8 py-4 text-base font-semibold text-white hover:bg-emerald-400 transition-all animate-pulse-glow shadow-xl shadow-emerald-500/25"
            >
              Try AI Finance Ops Free <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>

      {/* Footer is in layout */}
    </div>
  )
}