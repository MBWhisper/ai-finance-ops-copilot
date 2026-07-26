import type { Metadata } from "next"
import Link from "next/link"
import { OptimizedImage } from "@/components/OptimizedImage"
import { Users, Check } from "lucide-react"
import { InternalLinks } from "@/components/InternalLinks"

export const metadata: Metadata = {
  title: "Churn Rate Calculator for SaaS Startups — Free Tool",
  description:
    "Calculate your monthly and annual churn rate instantly. Understand what churn means for your SaaS growth.",
  alternates: { canonical: 'https://aifinanceops.app/churn-calculator' },
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
      "Calculate your monthly and annual churn rate instantly.",
    images: ["/og-image.png"],
  },
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is customer churn?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Customer churn is the percentage of customers who cancel their subscription in a given period. It measures customer retention.",
      },
    },
    {
      "@type": "Question",
      name: "What is revenue churn?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Revenue churn is the percentage of MRR lost from cancellations and downgrades. It's more important than customer churn for SaaS because it directly impacts your revenue.",
      },
    },
    {
      "@type": "Question",
      name: "What is a good monthly churn rate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Below 5% is good for B2B SaaS. Below 2% is excellent. For B2C SaaS, below 7% is acceptable. Enterprise SaaS should target below 1% monthly churn.",
      },
    },
    {
      "@type": "Question",
      name: "How does churn affect MRR growth?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "High churn means you need more new customers just to maintain flat MRR. At 5% monthly churn, you need to replace 5% of your MRR every month just to stay even — before any growth.",
      },
    },
  ],
}

export default function ChurnCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
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
            It is one of the most critical{" "}
            <Link href="/blog/saas-financial-metrics" className="text-emerald-400 hover:underline">
              SaaS financial metrics
            </Link>{" "}
            you need to track alongside{" "}
            <Link href="/mrr-calculator" className="text-emerald-400 hover:underline">MRR</Link>{" "}and{" "}
            <Link href="/ltv-calculator" className="text-emerald-400 hover:underline">LTV</Link>.
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

      {/* Customer Churn vs Revenue Churn */}
      <section className="border-t border-gray-800 px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Customer Churn vs Revenue Churn
          </h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            There are two main types of churn metrics every SaaS founder should understand:
          </p>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="border border-gray-800 bg-gray-900/50 rounded-xl p-6">
              <div className="text-sm font-mono text-emerald-400 mb-2">Customer Churn</div>
              <div className="text-lg font-mono text-white mb-2">
                (Customers Lost &divide; Customers at Start) &times; 100
              </div>
              <p className="text-sm text-gray-400">
                Counts the percentage of accounts that cancel. Simple to calculate but doesn&apos;t reflect revenue impact.
              </p>
            </div>
            <div className="border border-gray-800 bg-gray-900/50 rounded-xl p-6">
              <div className="text-sm font-mono text-emerald-400 mb-2">Revenue Churn</div>
              <div className="text-lg font-mono text-white mb-2">
                (MRR Lost &divide; MRR at Start) &times; 100
              </div>
              <p className="text-sm text-gray-400">
                Measures the percentage of recurring revenue lost. More important for SaaS because it directly impacts your bottom line.
              </p>
            </div>
          </div>
          <p className="text-gray-400 leading-relaxed">
            Revenue churn is almost always more important than customer churn. Losing 10 small customers might hurt less than losing 1 enterprise client. Always track both, but prioritize revenue churn when making strategic decisions.
          </p>
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
            At 5% monthly churn, you&apos;re losing half your business every year.
            Use our{" "}
            <Link href="/runway-calculator" className="text-emerald-400 hover:underline">runway calculator</Link>{" "}
            to see how churn affects your cash runway.
          </p>
        </div>
      </section>

      {/* Churn Rate Benchmarks */}
      <section className="border-t border-gray-800 bg-gray-900/30 px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Churn Rate Benchmarks
          </h2>
          <p className="text-gray-400 leading-relaxed mb-8">
            Where does your churn rate fall? Use these benchmarks to understand how you compare to other SaaS companies.
          </p>
          <div className="border border-gray-800 bg-gray-900/50 rounded-xl overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="px-6 py-3 text-sm font-semibold text-gray-300">Rating</th>
                  <th className="px-6 py-3 text-sm font-semibold text-gray-300">Monthly Churn</th>
                  <th className="px-6 py-3 text-sm font-semibold text-gray-300">Annual Churn</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-800">
                  <td className="px-6 py-4 text-sm"><span className="text-emerald-400 font-semibold">Excellent</span></td>
                  <td className="px-6 py-4 text-sm text-gray-300 font-mono">&lt;2%</td>
                  <td className="px-6 py-4 text-sm text-gray-300 font-mono">&lt;21%</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="px-6 py-4 text-sm"><span className="text-emerald-400 font-semibold">Good</span></td>
                  <td className="px-6 py-4 text-sm text-gray-300 font-mono">2–5%</td>
                  <td className="px-6 py-4 text-sm text-gray-300 font-mono">21–46%</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="px-6 py-4 text-sm"><span className="text-amber-400 font-semibold">Warning</span></td>
                  <td className="px-6 py-4 text-sm text-gray-300 font-mono">5–8%</td>
                  <td className="px-6 py-4 text-sm text-gray-300 font-mono">46–63%</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm"><span className="text-red-400 font-semibold">Danger</span></td>
                  <td className="px-6 py-4 text-sm text-gray-300 font-mono">&gt;8%</td>
                  <td className="px-6 py-4 text-sm text-gray-300 font-mono">&gt;63%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Common Churn Calculation Mistakes */}
      <section className="border-t border-gray-800 px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Common Churn Calculation Mistakes
          </h2>
          <p className="text-gray-400 leading-relaxed mb-8">
            Avoid these pitfalls that lead to inaccurate churn metrics and bad decisions.
          </p>
          <div className="space-y-6">
            <div className="border border-gray-800 bg-gray-900/50 rounded-xl p-6">
              <div className="text-sm font-mono text-emerald-400 mb-2">Mistake 1</div>
              <div className="text-white font-semibold mb-2">Using total customers lost instead of churn rate</div>
              <p className="text-sm text-gray-400">
                Saying &ldquo;we lost 10 customers&rdquo; means nothing without context. If you started with 1,000 customers, 10 is 1% churn. If you started with 20, it&apos;s 50%. Always express churn as a percentage relative to the starting count.
              </p>
            </div>
            <div className="border border-gray-800 bg-gray-900/50 rounded-xl p-6">
              <div className="text-sm font-mono text-emerald-400 mb-2">Mistake 2</div>
              <div className="text-white font-semibold mb-2">Ignoring expansion and contraction revenue</div>
              <p className="text-sm text-gray-400">
                Revenue churn should account for lost MRR from cancellations AND downgrades, but expansion revenue from upgrades should offset gross churn to show net revenue retention. Don&apos;t confuse gross churn with net churn.
              </p>
            </div>
            <div className="border border-gray-800 bg-gray-900/50 rounded-xl p-6">
              <div className="text-sm font-mono text-emerald-400 mb-2">Mistake 3</div>
              <div className="text-white font-semibold mb-2">Measuring churn over inconsistent time periods</div>
              <p className="text-sm text-gray-400">
                Comparing monthly churn to quarterly churn gives misleading results. Always use consistent time periods — monthly is standard for SaaS. Annualizing monthly churn without compound interest math also overstates the true annual rate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Real Churn Example */}
      <section className="border-t border-gray-800 bg-gray-900/30 px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Real Churn Example
          </h2>
          <p className="text-gray-400 leading-relaxed mb-8">
            Here&apos;s a practical example of how to calculate churn step by step.
          </p>
          <div className="border border-gray-800 bg-gray-900/50 rounded-xl p-8">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">Starting Customers</div>
                <div className="text-3xl font-bold text-emerald-400">200</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">Customers Lost</div>
                <div className="text-3xl font-bold text-red-400">8</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">Churned Revenue</div>
                <div className="text-3xl font-bold text-amber-400">$640</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">Total MRR</div>
                <div className="text-3xl font-bold text-white">$16,000</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">Revenue Churn</div>
                <div className="text-3xl font-bold text-emerald-400">4%</div>
              </div>
            </div>
            <div className="border-t border-gray-800 pt-6 space-y-2">
              <div className="font-mono text-sm text-gray-300">
                Customer Churn = (8 &divide; 200) &times; 100 = <span className="text-emerald-400 font-bold">4%</span>
              </div>
              <div className="font-mono text-sm text-gray-300">
                Revenue Churn = ($640 &divide; $16,000) &times; 100 = <span className="text-emerald-400 font-bold">4%</span>
              </div>
              <p className="text-sm text-gray-400 mt-4">
                In this example, the average revenue per customer is $80/month ($16,000 &divide; 200). Each churned customer costs you $80 in lost MRR.
              </p>
            </div>
          </div>
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
              It&apos;s a powerful{" "}
              <Link href="/vs-baremetrics" className="text-emerald-400 hover:underline">Baremetrics alternative</Link>{" "}
              built for modern SaaS teams.
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

      {/* Internal Links */}
      <InternalLinks
        variant="mixed"
        exclude="/churn-calculator"
        title="More Free SaaS Finance Tools"
        limit={8}
      />
      </div>
    </>
  )
}
