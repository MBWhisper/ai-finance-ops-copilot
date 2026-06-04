import fs from "fs"
import path from "path"
import matter from "gray-matter"
import Link from "next/link"
import { ArrowUpRight, Clock } from "lucide-react"
import type { Metadata } from "next"

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

function getPosts() {
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
  return posts.sort((a, b) => b.rawDate.getTime() - a.rawDate.getTime())
}

const TAG_META: Record<string, { label: string; color: string }> = {
  "churn": { label: "Churn", color: "bg-rose-500/15 text-rose-300 ring-1 ring-rose-500/20" },
  "retention": { label: "Retention", color: "bg-rose-500/15 text-rose-300 ring-1 ring-rose-500/20" },
  "saas-growth": { label: "Growth", color: "bg-violet-500/15 text-violet-300 ring-1 ring-violet-500/20" },
  "mrr": { label: "MRR", color: "bg-sky-500/15 text-sky-300 ring-1 ring-sky-500/20" },
  "stripe": { label: "Stripe", color: "bg-sky-500/15 text-sky-300 ring-1 ring-sky-500/20" },
  "finance-basics": { label: "Finance", color: "bg-amber-500/15 text-amber-300 ring-1 ring-amber-500/20" },
  "cash-flow": { label: "Cash Flow", color: "bg-teal-500/15 text-teal-300 ring-1 ring-teal-500/20" },
  "saas-metrics": { label: "Metrics", color: "bg-indigo-500/15 text-indigo-300 ring-1 ring-indigo-500/20" },
  "runway": { label: "Runway", color: "bg-orange-500/15 text-orange-300 ring-1 ring-orange-500/20" },
  "automation": { label: "Automation", color: "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/20" },
  "tools": { label: "Tools", color: "bg-fuchsia-500/15 text-fuchsia-300 ring-1 ring-fuchsia-500/20" },
  "ltv": { label: "LTV / CAC", color: "bg-cyan-500/15 text-cyan-300 ring-1 ring-cyan-500/20" },
  "arr": { label: "ARR", color: "bg-lime-500/15 text-lime-300 ring-1 ring-lime-500/20" },
}
const DEFAULT_TAG = { label: "SaaS", color: "bg-slate-500/15 text-slate-300 ring-1 ring-slate-500/20" }
function getTagMeta(raw: string) { return TAG_META[raw.toLowerCase()] ?? DEFAULT_TAG }

function formatDate(raw: string): string {
  return new Date(raw).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
}

export default function BlogPage() {
  const posts = getPosts()
  const [featured, second, ...rest] = posts

  return (
    <div className="min-h-screen text-white" style={{ background: "linear-gradient(160deg,#0c0a1e 0%,#0f172a 55%,#091220 100%)" }}>

      {/* ── HEADER ── */}
      <div className="relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-indigo-600/8 blur-3xl" />
          <div className="absolute top-20 left-1/3 h-64 w-64 rounded-full bg-violet-600/6 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="mb-5">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-400">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
              Updated weekly
            </span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight leading-[1.05]">
            <span className="bg-gradient-to-br from-white via-slate-200 to-slate-500 bg-clip-text text-transparent">SaaS Finance</span>
            <br />
            <span className="bg-gradient-to-br from-indigo-300 via-indigo-200 to-slate-400 bg-clip-text text-transparent">Knowledge Base</span>
          </h1>
          <p className="mt-5 text-lg text-slate-400 max-w-lg leading-relaxed">
            MRR guides, churn playbooks, and financial clarity for founders building in public.
          </p>
          <div className="mt-10 flex flex-wrap gap-10">
            {[{ value: `${posts.length}+`, label: "Articles" }, { value: "Free", label: "Always" }, { value: "5 min", label: "Avg read" }].map(s => (
              <div key={s.label}>
                <p className="text-3xl font-bold text-white">{s.value}</p>
                <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-16">

        {/* ── FEATURED: 2-up hero row ── */}
        {(featured || second) && (
          <div className="mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-7">✦ Featured</p>
            <div className="grid gap-6 md:grid-cols-2">
              {[featured, second].filter(Boolean).map((post) => {
                if (!post) return null
                const tag = getTagMeta(post.tag)
                return (
                  <Link key={post.href} href={post.href} className="group block">
                    <div
                      className="relative overflow-hidden rounded-2xl border border-white/8 h-full flex flex-col transition-all duration-300 hover:border-indigo-500/40 hover:-translate-y-0.5"
                      style={{ background: "rgba(255,255,255,0.025)" }}
                    >
                      {/* Image */}
                      <div className="relative h-52 overflow-hidden shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={post.cover}
                          alt={post.title}
                          width={600}
                          height={208}
                          loading="eager"
                          decoding="async"
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="absolute top-3 left-3">
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold backdrop-blur-sm ${tag.color}`}>
                            {tag.label}
                          </span>
                        </div>
                      </div>
                      {/* Content */}
                      <div className="flex flex-col flex-1 p-6">
                        <div className="flex items-center gap-2 mb-3 text-xs text-slate-500">
                          <span>{formatDate(post.date)}</span>
                          <span>·</span>
                          <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{post.readTime} min</span>
                        </div>
                        <h2 className="text-xl font-bold text-white leading-snug group-hover:text-indigo-200 transition-colors flex-1">
                          {post.title}
                        </h2>
                        <p className="mt-3 text-sm text-slate-400 leading-relaxed line-clamp-2">{post.excerpt}</p>
                        <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-400 group-hover:text-indigo-300 transition-colors">
                          Read article <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        )}

        {/* ── ALL ARTICLES GRID ── */}
        {rest.length > 0 && (
          <>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-8">All Articles</p>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((post) => {
                const tag = getTagMeta(post.tag)
                return (
                  <Link
                    key={post.href}
                    href={post.href}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-white/6 transition-all duration-300 hover:border-indigo-500/30 hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-500/5"
                    style={{ background: "rgba(255,255,255,0.025)" }}
                  >
                    {/* Cover */}
                    <div className="relative h-44 overflow-hidden shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={post.cover}
                        alt={post.title}
                        width={400}
                        height={176}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                      <div className="absolute top-3 left-3">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold backdrop-blur-sm ${tag.color}`}>
                          {tag.label}
                        </span>
                      </div>
                    </div>
                    {/* Body */}
                    <div className="flex flex-1 flex-col p-5">
                      <div className="flex items-center gap-2 mb-3 text-xs text-slate-500">
                        <span>{formatDate(post.date)}</span>
                        <span>·</span>
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{post.readTime} min</span>
                      </div>
                      <h3 className="text-base font-bold text-white leading-snug group-hover:text-indigo-200 transition-colors flex-1 line-clamp-3">
                        {post.title}
                      </h3>
                      <p className="mt-2 text-sm text-slate-500 line-clamp-2 leading-relaxed">{post.excerpt}</p>
                      <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-indigo-400 group-hover:text-indigo-300 transition-colors">
                        Read more <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </>
        )}

        {/* ── TOOLS CTA STRIP ── */}
        <div className="mt-16 rounded-2xl border border-white/6 p-6 md:p-8" style={{ background: "rgba(255,255,255,0.02)" }}>
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-5">Free Calculators</p>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { label: "MRR Calculator", href: "/mrr-calculator", desc: "Calculate Monthly Recurring Revenue" },
              { label: "Churn Calculator", href: "/churn-rate-calculator", desc: "Customer & revenue churn rate" },
              { label: "LTV Calculator", href: "/ltv-calculator", desc: "Customer lifetime value & LTV:CAC" },
            ].map(tool => (
              <Link key={tool.href} href={tool.href}
                className="group flex items-center justify-between rounded-xl border border-white/6 bg-white/[0.02] px-5 py-4 hover:border-indigo-500/30 hover:bg-indigo-500/5 transition-all">
                <div>
                  <p className="text-sm font-semibold text-white group-hover:text-indigo-200 transition-colors">{tool.label}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{tool.desc}</p>
                </div>
                <ArrowUpRight className="h-4 w-4 text-slate-600 group-hover:text-indigo-400 transition-colors shrink-0" />
              </Link>
            ))}
          </div>
        </div>

        {/* ── NEWSLETTER CTA ── */}
        <div
          className="mt-10 rounded-3xl border border-indigo-500/20 p-10 md:p-14 text-center"
          style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(139,92,246,0.04) 100%)" }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-3">Stay ahead</p>
          <h2 className="text-3xl font-bold text-white">Get new articles in your inbox</h2>
          <p className="mt-3 text-slate-400 max-w-md mx-auto">Weekly guides on SaaS metrics, cash flow, and financial automation. No spam.</p>
          <Link
            href="/register"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-8 py-3.5 text-sm font-semibold text-white hover:bg-indigo-500 transition-colors"
          >
            Start free — get full access <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
