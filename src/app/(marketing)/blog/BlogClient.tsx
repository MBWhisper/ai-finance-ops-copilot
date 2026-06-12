"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowUpRight, Clock } from "lucide-react"
import type { Post } from "./page"

const TAG_META: Record<string, { label: string; color: string }> = {
  churn:           { label: "Churn",     color: "bg-rose-500/15 text-rose-300 ring-1 ring-rose-500/20" },
  retention:       { label: "Retention", color: "bg-rose-500/15 text-rose-300 ring-1 ring-rose-500/20" },
  "saas-growth":   { label: "Growth",    color: "bg-violet-500/15 text-violet-300 ring-1 ring-violet-500/20" },
  mrr:             { label: "MRR",       color: "bg-sky-500/15 text-sky-300 ring-1 ring-sky-500/20" },
  stripe:          { label: "Stripe",    color: "bg-sky-500/15 text-sky-300 ring-1 ring-sky-500/20" },
  "finance-basics":{ label: "Finance",   color: "bg-amber-500/15 text-amber-300 ring-1 ring-amber-500/20" },
  "cash-flow":     { label: "Cash Flow", color: "bg-teal-500/15 text-teal-300 ring-1 ring-teal-500/20" },
  "saas-metrics":  { label: "Metrics",   color: "bg-indigo-500/15 text-indigo-300 ring-1 ring-indigo-500/20" },
  runway:          { label: "Runway",    color: "bg-orange-500/15 text-orange-300 ring-1 ring-orange-500/20" },
  automation:      { label: "Automation",color: "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/20" },
  tools:           { label: "Tools",     color: "bg-fuchsia-500/15 text-fuchsia-300 ring-1 ring-fuchsia-500/20" },
  ltv:             { label: "LTV / CAC", color: "bg-cyan-500/15 text-cyan-300 ring-1 ring-cyan-500/20" },
  arr:             { label: "ARR",       color: "bg-lime-500/15 text-lime-300 ring-1 ring-lime-500/20" },
}
const DEFAULT_TAG = { label: "SaaS", color: "bg-slate-500/15 text-slate-300 ring-1 ring-slate-500/20" }
function getTagMeta(raw: string) { return TAG_META[raw.toLowerCase()] ?? DEFAULT_TAG }

function formatDate(raw: string): string {
  return new Date(raw).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
}

const TAGS = ["All", "MRR", "Churn", "ARR", "Runway", "Cash Flow", "Metrics", "Tools"]
const TAG_FILTER_MAP: Record<string, string[]> = {
  MRR:       ["mrr", "stripe"],
  Churn:     ["churn", "retention"],
  ARR:       ["arr"],
  Runway:    ["runway"],
  "Cash Flow": ["cash-flow"],
  Metrics:   ["saas-metrics", "saas-growth", "ltv"],
  Tools:     ["tools", "automation", "finance-basics"],
}

const PAGE_SIZE = 6

export default function BlogClient({ posts }: { posts: Post[] }) {
  const [activeTag, setActiveTag] = useState("All")
  const [shown, setShown] = useState(PAGE_SIZE)

  const filtered = activeTag === "All"
    ? posts
    : posts.filter((p) => (TAG_FILTER_MAP[activeTag] ?? []).includes(p.tag.toLowerCase()))

  const [hero, ...rest] = filtered
  const visible = rest.slice(0, shown)
  const hasMore = shown < rest.length

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

      <div className="mx-auto max-w-6xl px-6 py-14">

        {/* ── FILTER TABS ── */}
        <div className="flex flex-wrap gap-2 mb-12">
          {TAGS.map((t) => (
            <button
              key={t}
              onClick={() => { setActiveTag(t); setShown(PAGE_SIZE) }}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeTag === t
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/25"
                  : "border border-white/10 text-slate-400 hover:border-indigo-500/40 hover:text-indigo-300"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* ── HERO FEATURED CARD ── */}
        {hero && (
          <div className="mb-10">
            <Link href={hero.href} className="group block">
              <div
                className="relative overflow-hidden rounded-3xl border border-white/8 transition-all duration-300 hover:border-indigo-500/40"
                style={{ background: "rgba(255,255,255,0.025)" }}
              >
                <div className="grid md:grid-cols-[1fr_420px]">
                  {/* Image — left/top */}
                  <div className="relative h-64 md:h-auto min-h-[280px] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={hero.cover}
                      alt={hero.title}
                      width={760}
                      height={420}
                      loading="eager"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/60 hidden md:block" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent md:hidden" />
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center rounded-full border border-indigo-500/40 bg-indigo-500/20 px-3 py-1 text-xs font-semibold text-indigo-300 backdrop-blur-sm">
                        ✦ Latest
                      </span>
                    </div>
                  </div>
                  {/* Content — right */}
                  <div className="flex flex-col justify-center p-8 md:p-10">
                    <span className={`inline-flex self-start items-center rounded-full px-2.5 py-0.5 text-xs font-semibold mb-4 ${ getTagMeta(hero.tag).color }`}>
                      {getTagMeta(hero.tag).label}
                    </span>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-white leading-snug group-hover:text-indigo-200 transition-colors">
                      {hero.title}
                    </h2>
                    <p className="mt-4 text-slate-400 leading-relaxed line-clamp-3">{hero.excerpt}</p>
                    <div className="mt-6 flex items-center gap-4 text-xs text-slate-500">
                      <span>{formatDate(hero.date)}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{hero.readTime} min read</span>
                    </div>
                    <div className="mt-7 inline-flex items-center gap-1.5 text-sm font-bold text-indigo-400 group-hover:text-indigo-300 transition-colors">
                      Read article <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* ── ARTICLES GRID (2-col) ── */}
        {visible.length > 0 && (
          <>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-7">
              {activeTag === "All" ? "All Articles" : activeTag}
            </p>
            <div className="grid gap-6 sm:grid-cols-2">
              {visible.map((post) => {
                const tag = getTagMeta(post.tag)
                return (
                  <Link
                    key={post.href}
                    href={post.href}
                    className="group flex gap-5 overflow-hidden rounded-2xl border border-white/6 p-5 transition-all duration-300 hover:border-indigo-500/30 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/5"
                    style={{ background: "rgba(255,255,255,0.025)" }}
                  >
                    {/* Thumbnail */}
                    <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-xl">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={post.cover}
                        alt={post.title}
                        width={112}
                        height={112}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    {/* Text */}
                    <div className="flex flex-1 flex-col min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${tag.color}`}>
                          {tag.label}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-white leading-snug group-hover:text-indigo-200 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="mt-1.5 text-xs text-slate-500 line-clamp-2 leading-relaxed flex-1">{post.excerpt}</p>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-xs text-slate-600 flex items-center gap-1">
                          <Clock className="h-3 w-3" />{post.readTime} min
                        </span>
                        <span className="flex items-center gap-0.5 text-xs font-semibold text-indigo-400 group-hover:text-indigo-300 transition-colors">
                          Read <ArrowUpRight className="h-3 w-3" />
                        </span>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>

            {/* Load More */}
            {hasMore && (
              <div className="mt-10 flex justify-center">
                <button
                  onClick={() => setShown((s) => s + PAGE_SIZE)}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-8 py-3 text-sm font-semibold text-slate-300 hover:border-indigo-500/40 hover:text-indigo-300 transition-all"
                >
                  Load more articles
                </button>
              </div>
            )}
          </>
        )}

        {/* ── TOOLS CTA STRIP ── */}
        <div className="mt-16 rounded-2xl border border-white/6 p-6 md:p-8" style={{ background: "rgba(255,255,255,0.02)" }}>
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-5">Free Calculators</p>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { label: "MRR Calculator",   href: "/mrr-calculator",        desc: "Calculate Monthly Recurring Revenue" },
              { label: "Churn Calculator",  href: "/churn-rate-calculator", desc: "Customer & revenue churn rate" },
              { label: "LTV Calculator",    href: "/ltv-calculator",        desc: "Customer lifetime value & LTV:CAC" },
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
