import type { Metadata } from "next"
import Link from "next/link"
import { InternalLinks } from "@/components/InternalLinks"
import { Check } from "lucide-react"

export const metadata: Metadata = {
  title: "SaaS Runway Calculator — How Long Will Your Cash Last?",
  description:
    "Calculate your startup runway in seconds. Know exactly how many months of cash you have left and what affects it.",
  openGraph: {
    title: "SaaS Runway Calculator — How Long Will Your Cash Last?",
    description: "Calculate your startup runway in seconds. Know exactly how many months of cash you have left.",
    url: "https://aifinanceops.app/runway-calculator",
    siteName: "AI Finance Ops",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "SaaS Runway Calculator" }],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "SaaS Runway Calculator — How Long Will Your Cash Last?",
    description: "Calculate your startup runway in seconds.",
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
          Startup Runway Calculator<br />
          <span className="text-emerald-400">How Long Will Your Cash Last?</span>
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
          Enter your cash balance and monthly burn rate. Get your runway in seconds.
          Pair it with our{" "}
          <Link href="/cash-flow-tracker" className="text-emerald-400 hover:underline">
            cash flow tracker
          </Link>{" "}
          for a complete financial picture.
        </p>
        <Link
          href="/register"
          className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-8 py-3 text-base font-medium text-white hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/25 hover:-translate-y-0.5"
        >
          Track runway automatically — start free
        </Link>
      </section>

      {/* Formula */}
      <section className="border-t border-gray-800 px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            How to Calculate Startup Runway
          </h2>
          <p className="text-gray-400 leading-relaxed mb-6">
            Runway tells you how many months your company can survive at its current burn rate.
            Read our{" "}
            <Link href="/blog/runway" className="text-emerald-400 hover:underline">
              full guide to SaaS runway
            </Link>{" "}
            to understand how to extend it.
          </p>
          <div className="border border-gray-800 bg-gray-900/50 rounded-xl p-6 mb-6">
            <div className="text-sm font-mono text-emerald-400 mb-2">Formula</div>
            <div className="text-lg font-mono text-white">
              Runway (months) = Cash Balance &divide; Monthly Burn Rate
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="border border-gray-800 bg-gray-900/50 rounded-xl p-5">
              <div className="text-xs text-gray-500 uppercase tracking-widest mb-2">Good Runway</div>
              <div className="text-2xl font-bold text-emerald-400 mb-1">18+ months</div>
              <div className="text-sm text-gray-400">Comfortable runway for hiring and growth</div>
            </div>
            <div className="border border-gray-800 bg-gray-900/50 rounded-xl p-5">
              <div className="text-xs text-gray-500 uppercase tracking-widest mb-2">Danger Zone</div>
              <div className="text-2xl font-bold text-red-400 mb-1">&lt; 6 months</div>
              <div className="text-sm text-gray-400">Start fundraising or cutting costs immediately</div>
            </div>
          </div>
        </div>
      </section>

      {/* What affects runway */}
      <section className="border-t border-gray-800 bg-gray-900/30 px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
            What Affects Your Runway?
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { label: "MRR growth",      link: "/mrr-tracker",        desc: "More revenue = longer runway. Track your MRR growth trends." },
              { label: "Churn rate",      link: "/churn-calculator",   desc: "High churn shrinks revenue faster than you can grow it." },
              { label: "Burn rate",       link: "/cash-flow-tracker",  desc: "Track cash outflows to identify where to cut costs." },
              { label: "LTV:CAC ratio",   link: "/ltv-calculator",     desc: "Efficient growth extends runway — poor LTV:CAC burns through it." },
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
          <h2 className="text-3xl font-bold text-white mb-4">Never Be Surprised by Your Runway Again</h2>
          <p className="text-gray-400 mb-8">
            AI Finance Ops tracks your runway automatically — alerting you when it drops below your target.
            A smarter{" "}
            <Link href="/vs-baremetrics" className="text-emerald-400 hover:underline">Baremetrics alternative</Link>{" "}
            for SaaS finance ops.
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
        exclude="/runway-calculator"
        title="More Free SaaS Finance Tools"
        limit={8}
      />
    </div>
  )
}
