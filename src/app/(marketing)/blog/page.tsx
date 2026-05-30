import Link from "next/link"
import { ArrowRight } from "lucide-react"

export const metadata = {
  title: "Blog | AI Finance Ops",
  description:
    "SaaS finance tips, MRR guides, and cash flow strategies for early-stage founders.",
  alternates: { canonical: "https://aifinanceops.app/blog" },
}

const posts = [
  {
    title: "How Many Months of Runway Do You Actually Have? (SaaS Founder's Guide)",
    date: "May 22, 2026",
    tag: "Runway",
    excerpt:
      "Most founders overestimate their runway. Learn the correct formula, what burn rate to use, and how to model different scenarios before it's too late.",
    href: "/blog/how-many-months-of-runway-do-i-have",
  },
  {
    title: "How to Calculate Your SaaS MRR Correctly (Most Founders Get This Wrong)",
    date: "May 21, 2026",
    tag: "MRR",
    excerpt:
      "Most SaaS founders miscalculate MRR. Learn the correct formula, the 3 most common mistakes, and how to automate it with Stripe.",
    href: "/blog/how-to-calculate-saas-mrr",
  },
  {
    title: "The 7 SaaS Financial Metrics Every Founder Must Track in 2026",
    date: "May 25, 2026",
    tag: "SaaS Metrics",
    excerpt:
      "MRR, ARR, churn, LTV, CAC, burn rate, runway — a complete guide to the financial metrics that matter most for SaaS growth and fundraising.",
    href: "/blog/saas-financial-metrics",
  },
  {
    title: "5 Baremetrics Alternatives for Early-Stage SaaS Founders in 2026",
    date: "May 24, 2026",
    tag: "Tools",
    excerpt:
      "Baremetrics is powerful but expensive. Here are the best alternatives for founders who want MRR tracking, churn analysis, and forecasting without the price tag.",
    href: "/blog/baremetrics-alternative-2026",
  },
  {
    title: "ARR vs MRR: What's the Difference and Which One Should You Track?",
    date: "May 23, 2026",
    tag: "Finance Basics",
    excerpt:
      "ARR and MRR are not the same. This guide explains the key differences, when to use each metric, and how investors interpret them.",
    href: "/blog/arr-vs-mrr-difference",
  },
  {
    title: "Startup Runway: How to Calculate It and Make It Last Longer",
    date: "May 22, 2026",
    tag: "Cash Flow",
    excerpt:
      "Your runway is your lifeline. Learn how to calculate startup runway correctly, avoid common mistakes, and extend it without raising more money.",
    href: "/blog/startup-runway-calculator",
  },
  {
    title: "SaaS Churn Rate: What's a Good Benchmark and How to Reduce It",
    date: "May 21, 2026",
    tag: "Churn",
    excerpt:
      "Learn what churn rate benchmarks look like for early-stage SaaS, how to calculate monthly vs annual churn, and 7 proven tactics to reduce it.",
    href: "/blog/saas-churn-rate-guide",
  },
  {
    title: "What is MRR and Why Every SaaS Founder Should Track It Daily",
    date: "May 10, 2026",
    tag: "Finance Basics",
    excerpt:
      "Monthly Recurring Revenue is the single most important metric for any SaaS business. Here's how to calculate it correctly and what mistakes founders make.",
    href: "/blog/what-is-mrr",
  },
  {
    title: "How to Build a 90-Day Cash Flow Forecast for Your SaaS",
    date: "May 8, 2026",
    tag: "Cash Flow",
    excerpt:
      "A step-by-step guide to building confidence-band forecasts using P50/P80/P95 methodology — and why spreadsheets fail at this.",
    href: "/blog/90-day-cash-flow-forecast",
  },
  {
    title: "The Founder's Guide to Accounts Receivable Automation",
    date: "May 5, 2026",
    tag: "Automation",
    excerpt:
      "Chasing unpaid invoices manually is a tax on your time. Here's how to set up automated AR reminders that actually get paid.",
    href: "/blog/ar-automation-guide",
  },
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <div className="mx-auto max-w-4xl px-6 py-24">
        <h1 className="text-4xl font-bold text-white mb-2">Blog</h1>
        <p className="text-gray-400 mb-12 text-lg">
          SaaS finance tips, MRR guides, and cash flow strategies for early-stage founders.
        </p>

        <div className="grid gap-8">
          {posts.map((post) => (
            <Link
              key={post.href}
              href={post.href}
              className="group rounded-2xl border border-slate-800 bg-slate-900 p-8 hover:border-emerald-500/30 transition-colors"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-block rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                  {post.tag}
                </span>
                <span className="text-xs text-gray-500">{post.date}</span>
              </div>
              <h2 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors mb-3">
                {post.title}
              </h2>
              <p className="text-slate-400 leading-relaxed mb-4">
                {post.excerpt}
              </p>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-emerald-400 group-hover:gap-2 transition-all">
                Read more <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
