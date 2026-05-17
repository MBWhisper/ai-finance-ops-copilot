import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Logo } from "@/components/logo"
import { OptimizedImage } from "@/components/OptimizedImage"
import dynamic from "next/dynamic"
import { Suspense } from "react"
import "@/components/animations.css"
import { ScrollReveal } from "@/components/landing-interactive"
import { LiveVisitorBadge } from "@/components/landing-interactive"
import { BackToTop } from "@/components/landing-interactive"

const SocialProofSection = dynamic(() => import("@/components/home/sections").then(m => ({ default: m.SocialProofSection })), { ssr: true })
const ProblemSection = dynamic(() => import("@/components/home/sections").then(m => ({ default: m.ProblemSection })), { ssr: true })
const FeaturesSection = dynamic(() => import("@/components/home/sections").then(m => ({ default: m.FeaturesSection })), { ssr: true })
const PricingSection = dynamic(() => import("@/components/home/sections").then(m => ({ default: m.PricingSection })), { ssr: true })
const TestimonialsSection = dynamic(() => import("@/components/home/sections").then(m => ({ default: m.TestimonialsSection })), { ssr: true })
const FAQSection = dynamic(() => import("@/components/home/sections").then(m => ({ default: m.FAQSection })), { ssr: true })

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">

      <main>
        {/* ─── HERO ─── (static, critical for LCP) */}
        <section className="relative overflow-hidden px-6 py-24 sm:py-32 lg:px-8">
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-gray-950 to-gray-950" />
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-emerald-500/10 blur-3xl animate-pulse-glow" />
            <div className="absolute top-[15%] left-[10%] h-4 w-4 rounded-full bg-emerald-400/20 blur-sm animate-float" />
            <div className="absolute top-[30%] right-[15%] h-6 w-6 rounded-full bg-emerald-500/15 blur-sm animate-float-delayed" />
            <div className="absolute bottom-[25%] left-[20%] h-3 w-3 rounded-full bg-emerald-400/20 blur-sm animate-float" style={{ animationDelay: "2s" }} />
            <div className="absolute top-[20%] right-[30%] h-5 w-5 rounded-full bg-blue-400/10 blur-sm animate-float-delayed" style={{ animationDelay: "1s" }} />
          </div>

          <div className="mx-auto max-w-4xl text-center">
            <ScrollReveal delay={0}>
              <div className="mb-4 flex justify-center">
                <LiveVisitorBadge />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <div className="mb-6 inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-400">
                AI-Powered Finance Intelligence for B2B SaaS
              </div>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <h1 className="text-5xl font-bold tracking-tight text-white sm:text-7xl bg-gradient-to-r from-white via-emerald-300 to-white bg-clip-text text-transparent animate-gradient-shift">
                Stop Guessing Your Cash Flow
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={300}>
              <p className="mt-6 text-xl leading-8 text-gray-400 max-w-2xl mx-auto">
                AI-powered MRR tracking & 90-day forecast for SaaS founders. Know your runway, churn, and
                financial health in real-time.
              </p>
              <div className="mt-6 flex items-center justify-center gap-3 text-sm text-gray-500">
                <span className="h-px w-8 bg-gray-800" />
                Built by <span className="font-medium text-gray-300">Mo</span> &mdash; a founder, for founders
                <span className="h-px w-8 bg-gray-800" />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={400}>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/register"
                  className="group inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-8 py-4 text-base font-semibold text-white hover:bg-emerald-400 transition-all animate-pulse-glow"
                >
                  Start 14-Day Free Trial <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/demo"
                  className="inline-flex items-center gap-2 rounded-lg border border-gray-700 px-8 py-4 text-base font-semibold text-gray-300 hover:border-gray-500 hover:text-white transition-colors"
                >
                  See Live Demo
                </Link>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={500}>
              <p className="mt-4 text-sm text-gray-500">
                No credit card required &bull; 14-day free trial &bull; Set up in 2 minutes
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* ─── LAZY-LOADED SECTIONS (below the fold) ─── */}
        <Suspense fallback={<div className="h-48 animate-pulse bg-gray-900/50" />}>
          <SocialProofSection />
        </Suspense>

        <Suspense fallback={<div className="h-96 animate-pulse bg-gray-900/50" />}>
          <ProblemSection />
        </Suspense>

        {/* ─── FOUNDER STORY ─── */}
        <section className="border-t border-gray-800 px-6 py-24">
          <div className="mx-auto max-w-5xl">
            <ScrollReveal>
              <div className="text-center mb-16">
                <div className="inline-flex items-center rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-1.5 text-xs font-medium text-emerald-400 mb-4">
                  👨‍💻 Founder-Led
                </div>
                <h2 className="text-4xl font-bold text-white">I built this because I lived this</h2>
                <p className="mt-4 text-lg text-gray-400">The story behind AI Finance Ops.</p>
              </div>
            </ScrollReveal>

            <div className="grid gap-12 md:grid-cols-5 items-center">
              <ScrollReveal delay={100} className="md:col-span-2">
                <div className="flex flex-col items-center">
                  <div className="relative mb-6">
                    <OptimizedImage
                      src="/founder.jpg"
                      alt="Mo \u2014 Founder of AI Finance Ops"
                      className="h-48 w-48 rounded-2xl object-cover border border-emerald-500/10 shadow-lg"
                      width={192}
                      height={192}
                    />
                    <div className="absolute -bottom-3 -right-3 rounded-full bg-emerald-500 px-4 py-1.5 text-xs font-semibold text-white shadow-lg">
                      Founder
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white text-center">Mo</h3>
                  <p className="text-sm text-gray-500 text-center">System Architect & SaaS Builder</p>
                  <p className="text-xs text-gray-600 text-center mt-1">📍 Agadir, Morocco 🇲🇦</p>
                  <div className="flex gap-3 mt-4">
                    <a href="https://www.linkedin.com/in/mo-systemarchitect" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-emerald-400 transition-colors text-sm">💼 LinkedIn</a>
                    <a href="https://www.youtube.com/@AIKnowlidgi" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-emerald-400 transition-colors text-sm">▶️ YouTube</a>
                    <a href="https://twitter.com/MbtechE80106" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-emerald-400 transition-colors text-sm">🐦 X</a>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={200} className="md:col-span-3">
                <div className="space-y-5 text-gray-300 leading-relaxed">
                  <div className="rounded-xl border-l-4 border-emerald-500 bg-gray-900/50 pl-6 pr-4 py-4">
                    <p className="italic text-gray-400">
                      &ldquo;I spent more time updating spreadsheets than actually growing my business. Something had to change.&rdquo;
                    </p>
                  </div>
                  <p>
                    <strong className="text-white">Mo</strong> is a full-stack developer and entrepreneur from Morocco.
                    After bootstrapping multiple SaaS products, he hit a wall: every month meant hours of
                    manual data entry across Stripe, bank accounts, and Google Sheets just to understand
                    basic cash flow.
                  </p>
                  <p>
                    He built AI Finance Ops to solve one problem: <strong className="text-white">give founders real-time
                    financial clarity without the spreadsheet chaos.</strong> No CFO required. No accounting degree.
                    Just a clean dashboard that tells you what you need to know.
                  </p>
                  <p className="text-sm text-gray-500">
                    Today, AI Finance Ops helps 200+ founders track their MRR, forecast runway, and
                    automate AR \u2014 completely bootstrapped and built in public.
                  </p>
                  <div className="flex items-center gap-3 pt-2">
                    <span className="text-xs text-gray-500">Follow the journey:</span>
                    <a href="https://www.linkedin.com/in/mo-systemarchitect" target="_blank" rel="noopener noreferrer" className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors">LinkedIn</a>
                    <span className="text-gray-700">·</span>
                    <a href="https://www.youtube.com/@AIKnowlidgi" target="_blank" rel="noopener noreferrer" className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors">YouTube</a>
                    <span className="text-gray-700">·</span>
                    <Link href="/about" className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors">Full story \u2192</Link>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <Suspense fallback={<div className="h-96 animate-pulse bg-gray-900/50" />}>
          <FeaturesSection />
        </Suspense>

        {/* ─── DEMO SCREENSHOT ─── */}
        <section className="border-t border-gray-800 px-6 py-24">
          <div className="mx-auto max-w-5xl">
            <ScrollReveal>
              <div className="rounded-2xl border border-gray-700 bg-gray-900 p-2 shadow-2xl hover:border-gray-600 transition-colors">
                <div className="rounded-xl border border-gray-700 bg-gray-800 p-8">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="flex gap-2">
                      <div className="h-3 w-3 rounded-full bg-red-500" />
                      <div className="h-3 w-3 rounded-full bg-amber-500" />
                      <div className="h-3 w-3 rounded-full bg-emerald-500" />
                    </div>
                    <div className="ml-4 flex items-center gap-4">
                      <div className="h-3 w-24 rounded bg-gray-700" />
                      <div className="h-3 w-20 rounded bg-gray-700" />
                      <div className="h-3 w-16 rounded bg-gray-700" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                    {["MRR", "ARR", "Churn Rate", "LTV"].map((label) => (
                      <div key={label} className="rounded-lg border border-gray-700 bg-gray-800/50 p-4">
                        <div className="h-3 w-16 rounded bg-gray-700 mb-3" />
                        <div className="h-8 w-24 rounded bg-gray-700" />
                      </div>
                    ))}
                  </div>
                  <div className="rounded-lg border border-gray-700 bg-gray-800/50 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="h-3 w-32 rounded bg-gray-700" />
                      <div className="flex gap-2">
                        <div className="h-3 w-10 rounded bg-gray-700" />
                        <div className="h-3 w-10 rounded bg-gray-700" />
                        <div className="h-3 w-10 rounded bg-gray-700" />
                      </div>
                    </div>
                    <div className="h-48 w-full rounded-lg bg-gray-700/50 flex items-center justify-center">
                      <span className="text-gray-500 text-sm">Dashboard Preview \u2014 90-Day Forecast Chart</span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <Suspense fallback={<div className="h-96 animate-pulse bg-gray-900/50" />}>
          <PricingSection />
        </Suspense>

        <Suspense fallback={<div className="h-64 animate-pulse bg-gray-900/50" />}>
          <TestimonialsSection />
        </Suspense>

        <Suspense fallback={<div className="h-48 animate-pulse bg-gray-900/50" />}>
          <FAQSection />
        </Suspense>

        {/* ─── CTA ─── */}
        <section className="border-t border-gray-800 px-6 py-24">
          <div className="mx-auto max-w-3xl text-center">
            <ScrollReveal>
              <div className="mx-auto max-w-md rounded-2xl border border-gray-800 bg-gray-900/50 p-6 mb-12 text-left">
                <div className="flex items-start gap-4">
                  <OptimizedImage
                    src="/founder.jpg"
                    alt="Mo"
                    className="h-12 w-12 shrink-0 rounded-xl object-cover"
                    width={48}
                    height={48}
                  />
                  <div>
                    <p className="text-sm text-gray-300 leading-relaxed italic">
                      &ldquo;I built AI Finance Ops because I was tired of spreadsheet chaos.
                      If you&apos;re a founder who wants real answers without the headache \u2014
                      this is for you.&rdquo;
                    </p>
                    <p className="text-xs text-gray-500 mt-2">\u2014 Mo, Founder of AI Finance Ops</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <h2 className="text-4xl font-bold text-white">Ready to see your next 90 days?</h2>
              <p className="mt-4 text-lg text-gray-400">
                Join 200+ SaaS founders who already know their cash flow, MRR, and runway in real-time.
              </p>
              <Link href="/register" className="mt-10 inline-flex">
                <span className="group inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-10 py-4 text-lg font-semibold text-white hover:bg-emerald-400 transition-all animate-pulse-glow shadow-xl shadow-emerald-500/25">
                  Start Free Trial <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <p className="mt-4 text-sm text-gray-500">
                No credit card required &bull; 14-day free trial
              </p>
            </ScrollReveal>
          </div>
        </section>
      </main>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-gray-800 px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 sm:grid-cols-2 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Logo size={28} />
                <span className="text-sm font-bold text-white">AI Finance Ops</span>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">
                SaaS financial intelligence for early-stage founders.
              </p>
              <p className="text-xs text-gray-600">&copy; 2026 AI Finance Ops. All rights reserved.</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white mb-4">Product</h3>
              <ul className="space-y-3">
                <li><Link href="#features" className="text-sm text-gray-400 hover:text-white transition-colors">Features</Link></li>
                <li><Link href="#pricing" className="text-sm text-gray-400 hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="/blog" className="text-sm text-gray-400 hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="/register" className="text-sm text-gray-400 hover:text-white transition-colors">Start Free Trial</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-3">
                <li><Link href="/about" className="text-sm text-gray-400 hover:text-white transition-colors">About</Link></li>
                <li><a href="mailto:hello@aifinanceops.app" className="text-sm text-gray-400 hover:text-white transition-colors">Contact</a></li>
                <li><a href="https://www.linkedin.com/in/mo-systemarchitect" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-white transition-colors">LinkedIn</a></li>
                <li><a href="https://twitter.com/MbtechE80106" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-white transition-colors">Twitter / X</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white mb-4">Follow Mo</h3>
              <ul className="space-y-3">
                <li><a href="https://www.youtube.com/@AIKnowlidgi" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-white transition-colors">▶ YouTube</a></li>
                <li><a href="https://www.tiktok.com/@aiknowleedge" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-white transition-colors">🎵 TikTok</a></li>
                <li><a href="https://www.instagram.com/aiknowleedge" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-white transition-colors">📸 Instagram</a></li>
                <li><a href="https://www.facebook.com/opsssimoo" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-white transition-colors">📘 Facebook</a></li>
                <li><a href="https://web3-jobs-hazel.vercel.app" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-white transition-colors">🌐 Web3 Jobs</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-800 pt-8">
            <p className="text-xs text-gray-600 mb-3">Recommended tools:</p>
            <div className="flex flex-wrap gap-4 text-xs">
              <a href="https://go.fiverr.com/visit/?bta=870194&brand=fiverraffiliates" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-300 transition-colors">Fiverr Affiliates</a>
              <a href="https://www.binance.com/register?ref=782089850" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-300 transition-colors">Binance</a>
            </div>
          </div>
        </div>
      </footer>

      <BackToTop />
    </div>
  )
}
