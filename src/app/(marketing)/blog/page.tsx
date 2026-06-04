import fs from "fs"
import path from "path"
import matter from "gray-matter"
import Link from "next/link"
import { ArrowUpRight, Clock } from "lucide-react"

export const metadata = {
  title: "Blog | AI Finance Ops",
  description:
    "SaaS finance tips, MRR guides, and cash flow strategies for early-stage founders.",
  alternates: { canonical: "https://aifinanceops.app/blog" },
}

// Map each slug to a high-quality, relevant Unsplash cover image
const POST_COVERS: Record<string, string> = {
  "arr-vs-mrr-difference":
    "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
  "baremetrics-alternative-2026":
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
  "chartmogul-alternative-2026":
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
  "how-many-months-of-runway-do-i-have":
    "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&q=80",
  "how-to-calculate-saas-mrr":
    "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80",
  "how-to-reduce-saas-churn":
    "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=800&q=80",
  "ltv-cac-ratio-saas":
    "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&q=80",
  "mrr-dashboard-guide":
    "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80",
  "net-revenue-retention-saas":
    "https://images.unsplash.com/photo-1543286386-2e659306cd6c?w=800&q=80",
  "paypal-mrr-tracking":
    "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80",
  "saas-burn-rate-guide":
    "https://images.unsplash.com/photo-1620714223084-8fcacc2dfd6d?w=800&q=80",
  "saas-cash-flow-management":
    "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
  "saas-churn-rate-guide":
    "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80",
  "saas-financial-metrics":
    "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
  "startup-runway-calculator":
    "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&q=80",
  "stripe-mrr-tracking":
    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
}

const DEFAULT_COVER =
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"

// Reading time estimator
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
  "churn":           { label: "Churn",          color: "bg-rose-500/15 text-rose-300 ring-rose-500/20" },
  "retention":       { label: "Retention",      color: "bg-rose-500/15 text-rose-300 ring-rose-500/20" },
  "saas-growth":     { label: "Growth",         color: "bg-violet-500/15 text-violet-300 ring-violet-500/20" },
  "mrr":             { label: "MRR",            color: "bg-sky-500/15 text-sky-300 ring-sky-500/20" },
  "stripe":          { label: "MRR",            color: "bg-sky-500/15 text-sky-300 ring-sky-500/20" },
  "finance-basics":  { label: "Finance Basics", color: "bg-amber-500/15 text-amber-300 ring-amber-500/20" },
  "cash-flow":       { label: "Cash Flow",      color: "bg-teal-500/15 text-teal-300 ring-teal-500/20" },
  "saas-metrics":    { label: "SaaS Metrics",   color: "bg-indigo-500/15 text-indigo-300 ring-indigo-500/20" },
  "runway":          { label: "Runway",         color: "bg-orange-500/15 text-orange-300 ring-orange-500/20" },
  "automation":      { label: "Automation",     color: "bg-emerald-500/15 text-emerald-300 ring-emerald-500/20" },
  "tools":           { label: "Tools",          color: "bg-fuchsia-500/15 text-fuchsia-300 ring-fuchsia-500/20" },
  "ltv":             { label: "LTV / CAC",      color: "bg-cyan-500/15 text-cyan-300 ring-cyan-500/20" },
  "arr":             { label: "ARR",            color: "bg-lime-500/15 text-lime-300 ring-lime-500/20" },
}

const DEFAULT_TAG_META = { label: "SaaS", color: "bg-slate-500/15 text-slate-300 ring-slate-500/20" }

function getTagMeta(raw: string) {
  return TAG_META[raw.toLowerCase()] ?? DEFAULT_TAG_META
}

function formatDate(raw: string): string {
  return new Date(raw).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

export default function BlogPage() {
  const posts = getPosts()
  const [featured, ...rest] = posts

  return (
    <div
      className="min-h-screen text-white"
      style={{
        background: "linear-gradient(135deg, #0f0c29 0%, #111827 50%, #0a1628 100%)",
      }}
    >
      {/* ── HEADER ── */}
      <div
        className="relative overflow-hidden border-b border-white/5"
        style={{
          background:
            "linear-gradient(180deg, rgba(99,102,241,0.08) 0%, transparent 100%)",
        }}
      >
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="flex items-center gap-2 mb-6">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-400">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
              Updated weekly
            </span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight bg-gradient-to-br from-white via-indigo-200 to-slate-400 bg-clip-text text-transparent">
            SaaS Finance<br />Knowledge Base
          </h1>
          <p className="mt-5 text-lg text-slate-400 max-w-xl">
            MRR guides, churn playbooks, and financial clarity for founders building in public.
          </p>
          {/* Stats bar */}
          <div className="mt-10 flex flex-wrap gap-8">
            {[
              { value: `${posts.length}+`, label: "Articles" },
              { value: "Free", label: "Always" },
              { value: "5 min", label: "Avg read" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-2xl font-bold text-white">{s.value}</p>
                <p className="text-xs text-slate-500 uppercase tracking-widest mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
        {/* BG decoration */}
        <div className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-indigo-600/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 left-1/4 h-64 w-64 rounded-full bg-violet-600/8 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-6 py-16">
        {/* ── FEATURED POST ── */}
        {featured && (
          <div className="mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-6">
              ✦ Featured Article
            </p>
            <Link href={featured.href} className="group block">
              <div
                className="relative overflow-hidden rounded-3xl border border-white/8 transition-all duration-500 group-hover:border-indigo-500/40"
                style={{ background: "rgba(255,255,255,0.03)" }}
              >
                <div className="grid md:grid-cols-5">
                  {/* Image */}
                  <div className="md:col-span-2 relative h-56 md:h-auto overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={featured.cover}
                      alt={featured.title}
                      width={600}
                      height={400}
                      loading="eager"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/40 md:bg-gradient-to-l" />
                  </div>
                  {/* Content */}
                  <div className="md:col-span-3 flex flex-col justify-center p-8 md:p-12">
                    <div className="flex items-center gap-3 mb-5">
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ${
                          getTagMeta(featured.tag).color
                        }`}
                      >
                        {getTagMeta(featured.tag).label}
                      </span>
                      <span className="text-xs text-slate-500">{formatDate(featured.date)}</span>
                      <span className="flex items-center gap-1 text-xs text-slate-500">
                        <Clock className="h-3 w-3" />
                        {featured.readTime} min read
                      </span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white leading-snug group-hover:text-indigo-200 transition-colors">
                      {featured.title}
                    </h2>
                    <p className="mt-4 text-slate-400 leading-relaxed line-clamp-3">
                      {featured.excerpt}
                    </p>
                    <div className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-indigo-400 group-hover:text-indigo-300 transition-colors">
                      Read full article
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* ── GRID ── */}
        {rest.length > 0 && (
          <>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-8">
              All Articles
            </p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((post) => {
                const tag = getTagMeta(post.tag)
                return (
                  <Link
                    key={post.href}
                    href={post.href}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-white/6 transition-all duration-300 hover:border-indigo-500/30 hover:-translate-y-1"
                    style={{ background: "rgba(255,255,255,0.03)" }}
                  >
                    {/* Cover */}
                    <div className="relative h-44 overflow-hidden">
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
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      {/* Tag overlay */}
                      <div className="absolute top-3 left-3">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 backdrop-blur-sm ${
                            tag.color
                          }`}
                        >
                          {tag.label}
                        </span>
                      </div>
                    </div>
                    {/* Body */}
                    <div className="flex flex-1 flex-col p-5">
                      <div className="flex items-center gap-2 mb-3 text-xs text-slate-500">
                        <span>{formatDate(post.date)}</span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.readTime} min
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-white leading-snug group-hover:text-indigo-200 transition-colors flex-1">
                        {post.title}
                      </h3>
                      <p className="mt-2 text-sm text-slate-500 line-clamp-2 leading-relaxed">
                        {post.excerpt}
                      </p>
                      <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-indigo-400 group-hover:text-indigo-300 transition-colors">
                        Read more
                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </>
        )}

        {/* ── NEWSLETTER CTA ── */}
        <div
          className="mt-20 rounded-3xl border border-indigo-500/20 p-10 md:p-14 text-center"
          style={{
            background:
              "linear-gradient(135deg, rgba(99,102,241,0.1) 0%, rgba(139,92,246,0.06) 100%)",
          }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-3">
            Stay ahead
          </p>
          <h2 className="text-3xl font-bold text-white">Get new articles in your inbox</h2>
          <p className="mt-3 text-slate-400 max-w-md mx-auto">
            Weekly guides on SaaS metrics, cash flow, and financial automation. No spam.
          </p>
          <Link
            href="/register"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-8 py-3.5 text-sm font-semibold text-white hover:bg-indigo-500 transition-colors"
          >
            Start free — get full access
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
