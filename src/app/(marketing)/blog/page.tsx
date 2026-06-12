import fs from "fs"
import path from "path"
import matter from "gray-matter"
import type { Metadata } from "next"
import BlogClient from "./BlogClient"

export const metadata: Metadata = {
  title: "SaaS Finance Blog | AI Finance Ops",
  description: "MRR guides, churn playbooks, and financial clarity for founders. Learn how to track SaaS metrics, reduce churn, and forecast cash flow.",
  alternates: { canonical: "https://aifinanceops.app/blog" },
  openGraph: {
    title: "SaaS Finance Blog | AI Finance Ops",
    description: "MRR guides, churn playbooks, and financial clarity for founders.",
    url: "https://aifinanceops.app/blog",
    images: [{ url: "https://aifinanceops.app/og/blog.png", width: 1200, height: 630 }],
  },
}

const POST_COVERS: Record<string, string> = {
  "arr-vs-mrr-difference": "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
  "baremetrics-alternative-2026": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
  "chartmogul-alternative-2026": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
  "how-many-months-of-runway-do-i-have": "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&q=80",
  "how-to-calculate-saas-mrr": "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80",
  "how-to-reduce-saas-churn": "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=800&q=80",
  "ltv-cac-ratio-saas": "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&q=80",
  "mrr-dashboard-guide": "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80",
  "net-revenue-retention-saas": "https://images.unsplash.com/photo-1543286386-2e659306cd6c?w=800&q=80",
  "paypal-mrr-tracking": "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80",
  "saas-burn-rate-guide": "https://images.unsplash.com/photo-1620714223084-8fcacc2dfd6d?w=800&q=80",
  "saas-cash-flow-management": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
  "saas-churn-rate-guide": "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80",
  "saas-financial-metrics": "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
  "startup-runway-calculator": "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&q=80",
  "stripe-mrr-tracking": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
}

const DEFAULT_COVER = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"

function estimateReadTime(content: string): number {
  const words = content.trim().split(/\s+/).length
  return Math.max(1, Math.ceil(words / 200))
}

export type Post = {
  title: string
  date: string
  tag: string
  excerpt: string
  href: string
  slug: string
  cover: string
  readTime: number
}

function getPosts(): Post[] {
  const postsDir = path.join(process.cwd(), "src/app/(marketing)/blog/_posts")
  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".mdx"))
  const posts = files.map((filename) => {
    const raw = fs.readFileSync(path.join(postsDir, filename), "utf-8")
    const { data, content } = matter(raw)
    const slug = data.slug ?? filename.replace(".mdx", "")
    return {
      title: data.title as string,
      date: data.date as string,
      tag: (data.tags?.[0] ?? "saas") as string,
      excerpt: data.description as string,
      href: `/blog/${slug}`,
      slug,
      cover: POST_COVERS[slug] ?? DEFAULT_COVER,
      readTime: estimateReadTime(content),
      rawDate: new Date(data.date as string),
    }
  })
  return posts
    .sort((a, b) => b.rawDate.getTime() - a.rawDate.getTime())
    .map(({ rawDate: _rd, ...p }) => p)
}

export default function BlogPage() {
  const posts = getPosts()
  return <BlogClient posts={posts} />
}
