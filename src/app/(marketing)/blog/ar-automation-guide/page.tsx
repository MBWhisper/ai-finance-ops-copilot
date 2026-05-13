import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata = {
  title: "The Founder's Guide to Accounts Receivable Automation | AI Finance Ops",
  description:
    "Stop chasing unpaid invoices manually. Learn how to set up automated AR reminders that recover revenue on autopilot.",
}

export default function ArAutomationGuidePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-300">
      <article className="mx-auto max-w-3xl px-6 py-16">
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Blog
        </Link>

        <h1 className="text-4xl font-bold text-white mb-4">
          The Founder&apos;s Guide to Accounts Receivable Automation
        </h1>
        <div className="flex items-center gap-3 mb-8">
          <span className="inline-block rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
            Automation
          </span>
          <span className="text-xs text-slate-500">May 5, 2026</span>
        </div>
        <div className="flex gap-4 text-sm text-slate-500 mb-12">
          <span>4 min read</span>
        </div>

        <p className="leading-relaxed mb-6 text-slate-300">
          Chasing unpaid invoices is one of the most demoralizing tasks a founder
          faces. You built a product, delivered value, and now you&apos;re sending awkward
          follow-up emails hoping someone pays. There&apos;s a better way.
        </p>

        <h2 className="text-2xl font-bold text-white mt-12 mb-4">What is Accounts Receivable (AR)?</h2>
        <p className="leading-relaxed mb-6 text-slate-300">
          Accounts Receivable is money owed to your business for services already
          delivered. In SaaS, this typically means:
        </p>
        <ul className="space-y-2 text-slate-300 mb-6">
          {[
            "Failed payment retries (card declined, expired card)",
            "Invoices sent but not yet paid (B2B/annual contracts)",
            "Dunning failures that weren't retried properly",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="leading-relaxed mb-6 text-slate-300">
          The average SaaS company loses <strong className="text-white">3-7% of revenue</strong> annually to poor AR management.
        </p>

        <h2 className="text-2xl font-bold text-white mt-12 mb-4">The Cost of Manual AR</h2>
        <div className="grid gap-6 mb-8">
          {[
            {
              title: "Time Cost",
              desc: "Founders spend an average of 3-5 hours per week chasing payments. Over a year, that's 200+ hours that could go toward growth.",
            },
            {
              title: "Revenue Loss",
              desc: "Every day a payment is delayed costs you cash flow. A $500 invoice 30 days late = $500 you can't use for ads, hiring, or tools.",
            },
            {
              title: "Relationship Damage",
              desc: "Awkward payment emails damage client relationships. Automated, friendly reminders feel professional — not desperate.",
            },
          ].map((card) => (
            <div key={card.title} className="rounded-xl border border-slate-800 bg-slate-900 p-6">
              <h3 className="font-semibold text-white mb-2">{card.title}</h3>
              <p className="text-sm text-slate-400">{card.desc}</p>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold text-white mt-12 mb-4">The 5-Email AR Automation Sequence</h2>
        <div className="relative mb-8">
          <div className="absolute left-3.5 top-0 h-full w-0.5 bg-slate-800" />
          <div className="space-y-8">
            {[
              {
                day: "Day 0",
                title: "Invoice sent",
                subject: null,
                desc: "Send immediately upon invoice creation. Include payment link, due date, and a clear breakdown of services.",
              },
              {
                day: "Day -3",
                title: "Friendly reminder",
                subject: "Just a reminder — invoice due in 3 days",
                desc: "Keep it warm. No pressure. Just a nudge.",
              },
              {
                day: "Day +1",
                title: "Soft follow-up",
                subject: "Your invoice is now overdue",
                desc: "Mention the due date passed. Offer to help if there's an issue.",
              },
              {
                day: "Day +7",
                title: "Firm follow-up",
                subject: "Action required — invoice 7 days overdue",
                desc: "More direct. Include the invoice amount and payment link prominently.",
              },
              {
                day: "Day +14",
                title: "Final notice",
                subject: "Final notice before service interruption",
                desc: "Professional but firm. State consequences clearly.",
              },
            ].map((step) => (
              <div key={step.day} className="relative flex items-start gap-6">
                <div className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-emerald-500 bg-slate-950">
                  <div className="h-2 w-2 rounded-full bg-emerald-500" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-xs font-medium text-emerald-400">{step.day}</span>
                    <h3 className="font-semibold text-white">{step.title}</h3>
                  </div>
                  {step.subject && (
                    <p className="text-xs text-slate-500 mb-1 italic">Subject: {step.subject}</p>
                  )}
                  <p className="text-sm text-slate-400">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <h2 className="text-2xl font-bold text-white mt-12 mb-4">What to Automate vs. Handle Manually</h2>
        <div className="grid gap-6 md:grid-cols-2 mb-8">
          <div className="rounded-xl border border-emerald-500/20 bg-slate-900 p-6">
            <h3 className="font-semibold text-emerald-400 mb-3">✓ Automate</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              {[
                "Payment reminder emails",
                "Failed card retry logic (Stripe Dunning)",
                "Invoice generation",
                "Overdue status updates in dashboard",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-emerald-500">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <h3 className="font-semibold text-slate-400 mb-3">✗ Handle Manually</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              {[
                "Large enterprise accounts (personal touch matters)",
                "Disputed invoices",
                "Long-term clients with temporary cash issues",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-slate-500">✗</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* AFFILIATE CALLOUT */}
        <div className="rounded-xl border border-emerald-500/20 bg-slate-900 p-6 my-8">
          <div className="flex items-start gap-4">
            <span className="text-2xl">🛠️</span>
            <div>
              <h3 className="font-semibold text-white mb-2">Need to build your AR automation workflow?</h3>
              <p className="text-sm text-slate-400 mb-4">
                Hire a vetted freelance developer on Fiverr to set up your complete AR
                automation pipeline — from invoice generation to payment reminders — in
                days, not months.
              </p>
              <a
                href="https://go.fiverr.com/visit/?bta=870194&brand=fiverraffiliates"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                Find a freelance automation expert →
              </a>
              <p className="text-xs text-slate-600 mt-2">
                (Affiliate link — we may earn a small commission at no cost to you)
              </p>
            </div>
          </div>
        </div>

        {/* MAIN CTA */}
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-8 text-center my-8">
          <h3 className="text-xl font-bold text-white mb-3">Automate Your AR With AI Finance Ops</h3>
          <p className="text-slate-400 mb-6">
            Set up automatic payment reminders and track every overdue invoice in one
            dashboard. Recover revenue without sending a single manual email.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-400 transition-colors"
          >
            Start Free 14-Day Trial →
          </Link>
        </div>
      </article>
    </div>
  )
}
