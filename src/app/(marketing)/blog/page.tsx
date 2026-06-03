import fs from "fs"
import path from "path"
import matter from "gray-matter"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export const metadata = {
  title: "Blog | AI Finance Ops",
  description:
    "SaaS finance tips, MRR guides, and cash flow strategies for early-stage founders.",
  alternates: { canonical: "https://aifinanceops.app/blog" },
}

function getPosts() {
  const postsDir = path.join(process.cwd(), "src/app/(marketing)/blog/_posts")
  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".mdx"))

  const posts = files.map((filename) => {
    const raw = fs.readFileSync(path.join(postsDir, filename), "utf-8")
    const { data } = matter(raw)
    return {
      title: data.title as string,
      date: data.date as string,
      tag: (data.tags?.[0] ?? "SaaS") as string,
      excerpt: data.description as string,
      href: `/blog/${data.slug ?? filename.replace(".mdx", "")}`,
      rawDate: new Date(data.date as string),
    }
  })

  return posts.sort((a, b) => b.rawDate.getTime() - a.rawDate.getTime())
}

const TAG_LABELS: Record<string, string> = {
  "churn": "Churn",
  "retention": "Churn",
  "saas-growth": "Churn",
  "mrr": "MRR",
  "stripe": "MRR",
  "finance-basics": "Finance Basics",
  "cash-flow": "Cash Flow",
  "saas-metrics": "SaaS Metrics",
  "runway": "Runway",
  "automation": "Automation",
  "tools": "Tools",
}

function formatTag(raw: string): string {
  return TAG_LABELS[raw.toLowerCase()] ?? raw
}

function formatDate(raw: string): string {
  return new Date(raw).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export default function BlogPage() {
  const posts = getPosts()

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
                  {formatTag(post.tag)}
                </span>
                <span className="text-xs text-gray-500">{formatDate(post.date)}</span>
              </div>
              <h2 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors mb-3">
                {post.title}
              </h2>
              <p className="text-slate-400 leading-relaxed mb-4">{post.excerpt}</p>
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
