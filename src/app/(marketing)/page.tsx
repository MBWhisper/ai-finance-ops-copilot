import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Play, ChevronDown, AlertTriangle, TrendingDown, DollarSign } from "lucide-react"

export const metadata: Metadata = {
  title: 'AI Finance Ops — SaaS Dashboard & AI Copilot',
  description: 'Free SaaS financial dashboard for founders. Track MRR, ARR, churn, runway, and cash flow in real time. AI-powered copilot, Stripe integration, 5-minute setup.',
  alternates: { canonical: 'https://aifinanceops.app' },
  openGraph: {
    title: 'AI Finance Ops — SaaS Financial Dashboard & AI Copilot',
    description: 'Free SaaS financial dashboard for founders. Track MRR, ARR, churn, runway, and cash flow in real time.',
    url: 'https://aifinanceops.app',
    siteName: 'AI Finance Ops',
    images: [{ url: 'https://aifinanceops.app/og-image.png', width: 1200, height: 630, alt: 'AI Finance Ops — SaaS Financial Dashboard' }],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Finance Ops — SaaS Financial Dashboard & AI Copilot',
    description: 'Free SaaS financial dashboard for founders. Track MRR, ARR, churn, runway, and cash flow in real time.',
    images: ['https://aifinanceops.app/og-image.png'],
    creator: '@MbtechE80106',
  },
}
import { Logo } from "@/components/logo"
import { OptimizedImage } from "@/components/OptimizedImage"
import dynamic from "next/dynamic"
import { Suspense } from "react"
import "@/components/animations.css"
import { ScrollReveal } from "@/components/landing-interactive"
import { BackToTop } from "@/components/landing-interactive"
import { ProductHuntBadge } from "@/components/marketing/ProductHuntBadge"
import {
  HeroCanvas,
  LiveVisitorBadge,
  NewsletterSignup,
  MRRCalculator,
  SocialProofSection,
  ProblemSection,
  ComparisonTableSection,
  PricingSection,
  TestimonialsSection,
  FAQSection,
} from "@/components/home/LandingSections"

// Above-fold sections: keep ssr:true so they render in initial HTML
const FeaturesSection = dynamic(() => import("@/components/home/sections").then(m => ({ default: m.FeaturesSection })), { ssr: true })
const ReassuranceSection = dynamic(() => import("@/components/home/sections").then(m => ({ default: m.ReassuranceSection })), { ssr: true })

function DashboardScreenshot() {
  return (
    <section className="px-6 py-12 sm:py-16">
      <div className="mx-auto max-w-4xl">
        <ScrollReveal>
          <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-1 shadow-2xl shadow-emerald-500/5">
            {/* Browser Chrome */}
            <div className="flex items-center gap-2 rounded-t-xl border-b border-gray-800 bg-gray-900 px-4 py-3">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-red-500/80" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                <div className="h-3 w-3 rounded-full bg-green-500/80" />
              </div>
              <div className="ml-4 flex-1 rounded-md bg-gray-800/50 px-3 py-1.5 text-xs text-gray-400">
                app.aifinanceops.app/dashboard
              </div>
            </div>
            {/* Dashboard Content */}
            <div className="relative rounded-b-xl bg-gray-950 p-4 sm:p-6">
              {/* Illustrative data disclaimer */}
              <div className="mb-4 flex items-center justify-center gap-1.5 rounded-md border border-dashed border-gray-700 bg-gray-900/30 px-3 py-1.5 text-[11px] text-gray-400">
                Illustrative dashboard data — your real metrics appear after connecting Stripe
              </div>
              {/* Annotation Badges */}
              <div className="absolute right-4 top-4 hidden rounded-full bg-red-500/10 border border-red-500/20 px-3 py-1 text-xs font-medium text-red-400 sm:block">
                Churn alert
              </div>
              <div className="absolute bottom-16 left-4 hidden rounded-full bg-blue-500/10 border border-blue-500/20 px-3 py-1 text-xs font-medium text-blue-400 sm:block">
                MRR movement
              </div>
              <div className="absolute bottom-4 right-4 hidden rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-medium text-emerald-400 sm:block">
                Runway forecast
              </div>
              {/* Metric Cards */}
              <div className="grid gap-4 sm:grid-cols-3 mb-6">
                <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-4">
                  <div className="flex items-center gap-2 text-gray-400 text-xs font-medium mb-2">
                    <DollarSign className="h-3.5 w-3.5" />
                    MRR
                  </div>
                  <div className="text-2xl font-bold text-white">$24,850</div>
                  <div className="mt-1 text-xs text-emerald-400 font-medium">+12.3% from last month</div>
                </div>
                <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4">
                  <div className="flex items-center gap-2 text-gray-400 text-xs font-medium mb-2">
                    <TrendingDown className="h-3.5 w-3.5" />
                    Churn Rate
                  </div>
                  <div className="text-2xl font-bold text-white">3.2%</div>
                  <div className="mt-1 flex items-center gap-1.5 text-xs text-red-400 font-medium">
                    <AlertTriangle className="h-3 w-3" />
                    Spike detected — 2 accounts at risk
                  </div>
                </div>
                <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-4">
                  <div className="flex items-center gap-2 text-gray-400 text-xs font-medium mb-2">
                    <DollarSign className="h-3.5 w-3.5" />
                    Cash Runway
                  </div>
                  <div className="text-2xl font-bold text-white">14 months</div>
                  <div className="mt-1 text-xs text-emerald-400 font-medium">On track</div>
                </div>
              </div>
              {/* Bar Chart */}
              <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-4">
                <div className="mb-4 text-sm font-medium text-gray-300">90-Day Cash Flow Forecast</div>
                <div className="flex items-end gap-1.5 h-32">
                  {[35, 42, 38, 55, 48, 62, 58, 72, 65, 78, 82, 88, 75, 92, 85, 95, 88, 98, 90, 92, 86, 94, 88, 96, 91, 99, 93, 97, 90, 100].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t bg-emerald-500/60 transition-all hover:bg-emerald-400"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
                <div className="mt-2 flex justify-between text-[10px] text-gray-400">
                  <span>Jun</span>
                  <span>Jul</span>
                  <span>Aug</span>
                  <span>Sep</span>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

function WhyFoundersSwitch() {
  const cards = [
    {
      icon: "📊",
      title: "Stripe Dashboard",
      desc: "Shows raw data. No MRR, no churn rate, no runway forecast. You still have to calculate everything yourself.",
      highlight: false,
    },
    {
      icon: "📈",
      title: "Spreadsheets",
      desc: "Manual. Error-prone. Takes hours every month. One wrong formula and your entire forecast is off.",
      highlight: false,
    },
    {
      icon: "✅",
      title: "AI Finance Ops",
      desc: "Connects to Stripe in 5 minutes. Auto-calculates MRR, churn, runway, and cash flow. AI alerts you before problems hit.",
      highlight: true,
    },
  ]

  return (
    <section className="border-t border-gray-800 px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white">Why founders switch</h2>
            <p className="mt-4 text-lg text-gray-400">
              Stop stitching data together. Start making decisions.
            </p>
          </div>
        </ScrollReveal>
        <div className="space-y-4">
          {cards.map((card, i) => (
            <ScrollReveal key={i} delay={i * 100}>
              <div
                className={`rounded-xl border p-6 ${
                  card.highlight
                    ? "border-emerald-500/30 bg-emerald-500/5"
                    : "border-gray-800 bg-gray-900/50"
                }`}
              >
                <div className="flex items-start gap-4">
                  <span className="text-2xl mt-0.5">{card.icon}</span>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{card.title}</h3>
                    <p className="mt-1 text-gray-400 leading-relaxed">{card.desc}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "AI Finance Ops",
            "applicationCategory": "BusinessApplication",
            "description": "AI-powered financial copilot for SaaS founders",
            "url": "https://aifinanceops.app",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Do I need a credit card to start?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No. Free plan is completely free, no card required."
                }
              },
              {
                "@type": "Question",
                "name": "Which payment processors do you support?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Stripe is fully supported today. PayPal and LemonSqueezy integrations are coming soon."
                }
              },
              {
                "@type": "Question",
                "name": "How is this different from Baremetrics?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "AI Finance Ops is built for solo founders and early-stage teams — simpler, cheaper, and powered by AI forecasting that Baremetrics doesn't offer."
                }
              },
              {
                "@type": "Question",
                "name": "What metrics can I track?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "MRR, ARR, churn rate, LTV, cash flow forecasts, and more — all updated in real-time from your Stripe account."
                }
              },
              {
                "@type": "Question",
                "name": "How long does setup take?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "About 5 minutes. Connect your Stripe account and your dashboard is live immediately."
                }
              }
            ]
          })
        }}
      />
      <div>
        {/* ─── HERO ─── (static, critical for LCP) */}
        <section className="relative overflow-hidden px-6 py-24 sm:py-32 lg:px-8">
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-gray-950 to-gray-950" />
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-emerald-500/10 blur-3xl animate-pulse-glow" />
            <div className="absolute top-[15%] left-[10%] h-4 w-4 rounded-full bg-emerald-400/20 blur-sm animate-float" />
            <div className="absolute top-[30%] right-[15%] h-6 w-6 rounded-full bg-emerald-500/15 blur-sm animate-float-delayed" />
            <div className="absolute bottom-[25%] left-[20%] h-3 w-3 rounded-full bg-emerald-400/20 blur-sm animate-float" style={{ animationDelay: "2s" }} />
            <div className="absolute top-[20%] right-[30%] h-5 w-5 rounded-full bg-blue-400/10 blur-sm animate-float-delayed" style={{ animationDelay: "1s" }} />
            {/* HeroCanvas loads client-side only after LCP */}
            <HeroCanvas />
          </div>

          <div className="mx-auto max-w-4xl text-center">
            <ScrollReveal delay={0}>
              <div className="mb-4 flex justify-center">
                <LiveVisitorBadge />
              </div>
            </ScrollReveal>
            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-7xl">
              Your Stripe data is not a financial plan.
            </h1>
            <p className="mt-6 text-xl leading-8 text-gray-400 max-w-2xl mx-auto">
              See MRR, churn, runway, and cash risks in one founder-friendly dashboard. Connect Stripe in 5 minutes.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-8 py-4 text-base font-semibold text-white hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-600/20 min-h-[48px]"
              >
                Connect Stripe — Start Free
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/demo"
                className="inline-flex items-center gap-2 rounded-lg border border-gray-700 bg-gray-900/50 px-8 py-4 text-base font-semibold text-gray-300 hover:border-emerald-500/50 hover:text-white transition-colors group min-h-[48px]"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20 border border-emerald-500/30 group-hover:bg-emerald-500/30 transition-colors">
                  <Play className="h-3 w-3 text-emerald-400 fill-emerald-400" />
                </span>
                Watch the 2-minute demo
              </Link>
            </div>

            {/* ─── TRUST BAR ─── */}
            <div className="mt-10 flex flex-col items-center gap-3">
              <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-gray-400">
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Free forever plan
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  5-min Stripe setup
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  No credit card
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Cancel anytime
                </span>
              </div>
            </div>
          </div>

          {/* ─── SCROLL HINT ─── */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-gray-400 animate-bounce">
            <span className="text-xs tracking-widest uppercase">Scroll</span>
            <ChevronDown className="h-4 w-4" />
          </div>
        </section>

        {/* ─── DASHBOARD SCREENSHOT ─── */}
        <DashboardScreenshot />

        {/* ─── LAZY-LOADED SECTIONS (below the fold) ─── */}
        <div className="content-visibility-section">
          <Suspense fallback={<div className="h-48 animate-pulse bg-gray-900/50" />}>
            <SocialProofSection />
          </Suspense>
        </div>

        <div className="content-visibility-section">
          <Suspense fallback={<div className="h-96 animate-pulse bg-gray-900/50" />}>
            <ProblemSection />
          </Suspense>
        </div>

        <Suspense fallback={<div className="h-96 animate-pulse bg-gray-900/50" />}>
          <FeaturesSection />
        </Suspense>

        <div className="content-visibility-section">
          <Suspense fallback={<div className="h-96 animate-pulse bg-gray-900/50" />}>
            <MRRCalculator />
          </Suspense>
        </div>

        <div className="content-visibility-section">
          <Suspense fallback={<div className="h-48 animate-pulse bg-gray-900/50" />}>
            <ComparisonTableSection />
          </Suspense>
        </div>

        <Suspense fallback={<div className="h-64 animate-pulse bg-gray-900/50" />}>
          <ReassuranceSection />
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
                      alt="Mo — Founder of AI Finance Ops"
                      className="h-48 w-48 rounded-2xl object-cover border border-emerald-500/10 shadow-lg"
                      width={192}
                      height={192}
                      sizes="192px"
                    />
                    <div className="absolute -bottom-3 -right-3 rounded-full bg-emerald-500 px-4 py-1.5 text-xs font-semibold text-white shadow-lg">
                      Founder
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white text-center">Mo</h3>
                  <p className="text-sm text-gray-400 text-center">System Architect & SaaS Builder</p>
                  <p className="text-xs text-gray-400 text-center mt-1">📍 Agadir, Morocco 🇲🇦</p>
                  <div className="flex gap-3 mt-4">
                    <a href="https://www.linkedin.com/in/mo-systemarchitect" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-emerald-400 transition-colors text-sm">💼 LinkedIn</a>
                    <a href="https://www.youtube.com/@AIKnowlidgi" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-emerald-400 transition-colors text-sm">▶️ YouTube</a>
                    <a href="https://twitter.com/MbtechE80106" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-emerald-400 transition-colors text-sm">🐦 X</a>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={200} className="md:col-span-3">
                <div className="space-y-5 text-gray-300 leading-relaxed">
                  <div className="rounded-xl border-l-4 border-emerald-500 bg-gray-900/50 pl-6 pr-4 py-4">
                    <p className="italic text-gray-400">
                      &ldquo;I built AI Finance Ops after missing a churn spike because my spreadsheet was wrong.&rdquo;
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
                  <p className="text-sm text-gray-400">
                    AI Finance Ops tracks real MRR data for founders who are tired of spreadsheets.
                  </p>
                  <div className="flex items-center gap-3 pt-2">
                    <span className="text-xs text-gray-400">Follow the journey:</span>
                    <a href="https://www.linkedin.com/in/mo-systemarchitect" target="_blank" rel="noopener noreferrer" className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors">LinkedIn</a>
                    <span className="text-gray-700">·</span>
                    <a href="https://www.youtube.com/@AIKnowlidgi" target="_blank" rel="noopener noreferrer" className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors">YouTube</a>
                    <span className="text-gray-700">·</span>
                    <Link href="/about" className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors">Full story →</Link>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <Suspense fallback={<div className="h-96 animate-pulse bg-gray-900/50" />}>
          <PricingSection />
        </Suspense>

        <Suspense fallback={<div className="h-64 animate-pulse bg-gray-900/50" />}>
          <TestimonialsSection />
        </Suspense>

        <WhyFoundersSwitch />

        <Suspense fallback={<div className="h-48 animate-pulse bg-gray-900/50" />}>
          <FAQSection />
        </Suspense>

        <Suspense fallback={<div className="h-48 animate-pulse bg-gray-900/50" />}>
          <NewsletterSignup />
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
                      &ldquo;I built AI Finance Ops after missing a churn spike because my spreadsheet was wrong.&rdquo;
                    </p>
                    <p className="text-xs text-gray-400 mt-2">— Mo, Founder of AI Finance Ops</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <h2 className="text-4xl font-bold text-white">Your Stripe data is waiting.</h2>
              <p className="mt-4 text-lg text-gray-400">
                Connect in 5 minutes. See your real MRR, churn, and runway — no spreadsheets required.
              </p>
              <Link href="/register" className="mt-10 inline-flex">
                <span className="group inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-10 py-4 text-lg font-semibold text-white hover:bg-emerald-500 transition-all shadow-xl shadow-emerald-600/25 min-h-[48px]">
                  Connect Stripe — Start Free <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </ScrollReveal>
          </div>
        </section>
      </div>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-gray-800 px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 sm:grid-cols-2 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Logo size={28} />
                <span className="text-[15px] font-bold tracking-tight text-white">
                  AI<span className="text-emerald-400">Finance</span>Ops
                </span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed mb-4">
                SaaS financial intelligence for early-stage founders.
              </p>
              <p className="text-xs text-gray-400">&copy; 2026 AI Finance Ops. All rights reserved.</p>
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
              <h3 className="text-sm font-semibold text-white mb-4">Free Tools</h3>
              <ul className="space-y-3">
                <li><Link href="/mrr-tracker" className="text-sm text-gray-400 hover:text-white transition-colors">MRR Tracker</Link></li>
                <li><Link href="/arr-calculator" className="text-sm text-gray-400 hover:text-white transition-colors">ARR Calculator</Link></li>
                <li><Link href="/churn-rate-calculator" className="text-sm text-gray-400 hover:text-white transition-colors">Churn Rate Calculator</Link></li>
                <li><Link href="/ltv-calculator" className="text-sm text-gray-400 hover:text-white transition-colors">LTV Calculator</Link></li>
                <li><Link href="/runway-calculator" className="text-sm text-gray-400 hover:text-white transition-colors">Runway Calculator</Link></li>
                <li><Link href="/cash-flow-tracker" className="text-sm text-gray-400 hover:text-white transition-colors">Cash Flow Tracker</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white mb-4">Compare</h3>
              <ul className="space-y-3">
                <li><Link href="/vs-baremetrics" className="text-sm text-gray-400 hover:text-white transition-colors">vs Baremetrics</Link></li>
                <li><Link href="/vs-chartmogul" className="text-sm text-gray-400 hover:text-white transition-colors">vs ChartMogul</Link></li>
                <li><Link href="/vs-profitwell" className="text-sm text-gray-400 hover:text-white transition-colors">vs ProfitWell</Link></li>
                <li><Link href="/vs-stripe-sigma" className="text-sm text-gray-400 hover:text-white transition-colors">vs Stripe Sigma</Link></li>
                <li><Link href="/vs-recurly" className="text-sm text-gray-400 hover:text-white transition-colors">vs Recurly</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 flex flex-wrap gap-6">
            <div className="flex-1 min-w-[200px]">
              <p className="text-xs text-gray-400 mb-3">Company</p>
              <div className="flex flex-wrap gap-4">
                <Link href="/about" className="text-xs text-gray-400 hover:text-white transition-colors">About</Link>
                <a href="mailto:hello@aifinanceops.app" className="text-xs text-gray-400 hover:text-white transition-colors">Contact</a>
                <Link href="/privacy" className="text-xs text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
                <a href="https://www.linkedin.com/in/mo-systemarchitect" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-400 hover:text-white transition-colors">LinkedIn</a>
                <a href="https://twitter.com/MbtechE80106" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-400 hover:text-white transition-colors">Twitter / X</a>
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-3">Follow Mo</p>
              <div className="flex flex-wrap gap-4">
                <a href="https://www.youtube.com/@AIKnowlidgi" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-400 hover:text-white transition-colors">▶ YouTube</a>
                <a href="https://www.tiktok.com/@aiknowleedge" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-400 hover:text-white transition-colors">🎵 TikTok</a>
                <a href="https://www.instagram.com/aiknowleedge" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-400 hover:text-white transition-colors">📸 Instagram</a>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-800 pt-8">
            <p className="text-xs text-gray-400 mb-3">Featured on</p>
            <div className="flex flex-wrap items-center gap-4">
              <ProductHuntBadge />
              <a href="https://aihuntlist.com/tool/ai-finance-ops-copilot" target="_blank" rel="noopener noreferrer">
                <img src="https://frogdr.com/aihuntlist.com/badge-white-sm.svg?round=1" alt="Featured on AIHuntList" className="h-6" />
              </a>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-800 pt-8">
            <p className="text-xs text-gray-400 mb-3">Recommended tools:</p>
            <div className="flex flex-wrap gap-4 text-xs">
              <a href="https://go.fiverr.com/visit/?bta=870194&brand=fiverraffiliates" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-200 transition-colors">Fiverr Affiliates</a>
              <a href="https://www.binance.com/register?ref=782089850" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-200 transition-colors">Binance</a>
            </div>
          </div>
        </div>
      </footer>

      <BackToTop />
    </div>
  )
}
