import Link from "next/link"
import { ArrowRight, ArrowLeft } from "lucide-react"

export const metadata = {
  title: "Blog | AI Finance Ops",
  description:
    "SaaS finance tips, MRR guides, and cash flow strategies for early-stage founders.",
}

const posts = [
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
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to home
        </Link>

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
