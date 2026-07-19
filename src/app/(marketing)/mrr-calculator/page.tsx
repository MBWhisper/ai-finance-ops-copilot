import type { Metadata } from "next"
import Link from "next/link"
import { InternalLinks } from "@/components/InternalLinks"
import { Check } from "lucide-react"

export const metadata: Metadata = {
  title: "MRR Calculator for SaaS — Monthly Recurring Revenue",
  description:
    "Calculate your Monthly Recurring Revenue (MRR) instantly. Understand expansion MRR, contraction, and net new MRR. Free tool for SaaS founders.",
  alternates: { canonical: 'https://aifinanceops.app/mrr-calculator' },
  openGraph: {
    title: "MRR Calculator for SaaS — Monthly Recurring Revenue | AI Finance Ops",
    description: "Calculate your MRR instantly. Understand expansion, contraction, and net new MRR.",
    url: "https://aifinanceops.app/mrr-calculator",
    siteName: "AI Finance Ops",
    images: [{ url: "https://aifinanceops.app/og-image.png", width: 1200, height: 630, alt: "MRR Calculator" }],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "MRR Calculator for SaaS — Monthly Recurring Revenue",
    description: "Calculate your MRR instantly. Free tool for SaaS founders.",
    images: ["https://aifinanceops.app/og-image.png"],
  },
}

export default function MRRCalculatorPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 pt-32 pb-16 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold tracking-widest uppercase text-emerald-400 mb-6">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          Free Tool
        </div>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-6">
          MRR Calculator<br />
          <span className="text-emerald-400">for SaaS Businesses</span>
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
          Calculate your Monthly Recurring Revenue in seconds. MRR is the foundation of every
          other{" "}
          <Link href="/blog/saas-financial-metrics" className="text-emerald-400 hover:underline">
            SaaS financial metric
          </Link>
          .
        </p>
        <Link
          href="/register"
          className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-8 py-3 text-base font-medium text-white hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/25 hover:-translate-y-0.5"
        >
          Track MRR automatically — start free
        </Link>
      </section>

      {/* What is MRR */}
      <section className="border-t border-gray-800 px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            What is MRR?
          </h2>
          <p className="text-gray-400 leading-relaxed mb-6">
            Monthly Recurring Revenue (MRR) is the predictable, recurring revenue a SaaS company
            earns each month. It is the single most important growth metric for SaaS businesses,
            and forms the basis for calculating{" "}
            <Link href="/arr-calculator" className="text-emerald-400 hover:underline">ARR</Link>,{" "}
            <Link href="/ltv-calculator" className="text-emerald-400 hover:underline">LTV</Link>, and{" "}
            <Link href="/runway-calculator" className="text-emerald-400 hover:underline">runway</Link>.
          </p>
          <div className="border border-gray-800 bg-gray-900/50 rounded-xl p-6 mb-6">
            <div className="text-sm font-mono text-emerald-400 mb-2">Formula</div>
            <div className="text-lg font-mono text-white">
              MRR = Number of Customers &times; Average Revenue Per User (ARPU)
            </div>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { label: "New MRR",        desc: "Revenue from new customers this month",         color: "text-emerald-400" },
              { label: "Expansion MRR",  desc: "Upgrades and upsells from existing customers",  color: "text-blue-400" },
              { label: "Churned MRR",    desc: "Revenue lost from cancellations",               color: "text-red-400" },
            ].map((item) => (
              <div key={item.label} className="border border-gray-800 bg-gray-900/50 rounded-xl p-5">
                <div className={`text-sm font-bold ${item.color} mb-2`}>{item.label}</div>
                <div className="text-xs text-gray-500">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related metrics */}
      <section className="border-t border-gray-800 bg-gray-900/30 px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
            MRR is Just the Start
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { label: "Track churn",          link: "/churn-calculator",   desc: "Churned MRR is the silent killer. Calculate your churn rate now." },
              { label: "Calculate ARR",         link: "/arr-calculator",     desc: "Annual Recurring Revenue — what investors actually look at." },
              { label: "Forecast cash flow",    link: "/cash-flow-tracker",  desc: "MRR doesn't equal cash. Track when money actually arrives." },
              { label: "Measure LTV",           link: "/ltv-calculator",     desc: "Is your MRR per customer enough to justify your CAC?" },
            ].map((item) => (
              <div key={item.label} className="flex gap-4">
                <Check className="h-5 w-5 text-emerald-500 mt-0.5 shrink-0" />
                <div>
                  <Link href={item.link} className="text-sm font-semibold text-emerald-400 hover:underline">
                    {item.label}
                  </Link>
                  <p className="text-sm text-gray-400 mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-gray-800 px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Track MRR Automatically</h2>
          <p className="text-gray-400 mb-8">
            Stop calculating MRR in spreadsheets. AI Finance Ops connects to Stripe and tracks your MRR,
            churn, and{" "}
            <Link href="/blog/saas-financial-metrics" className="text-emerald-400 hover:underline">
              all key SaaS metrics
            </Link>{" "}
            automatically.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-10 py-4 text-base font-semibold text-white hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/25"
          >
            Start free — no credit card required
          </Link>
        </div>
      </section>

      {/* Internal Links */}
      <InternalLinks
        variant="mixed"
        exclude="/mrr-calculator"
        title="More Free SaaS Finance Tools"
        limit={8}
      />
    </div>
  )
}
