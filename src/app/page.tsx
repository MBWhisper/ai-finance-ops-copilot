import Link from "next/link"
import { Check, BarChart3, TrendingUp, Receipt, ArrowRight } from "lucide-react"
import { Logo } from "@/components/logo"
import "@/components/animations.css"
import { ScrollReveal, FaqAccordion, TestimonialCarousel, AnimatedCounter, BackToTop, LiveVisitorBadge } from "@/components/landing-interactive"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">

      <main>
        {/* ─── HERO ─── */}
        <section className="relative overflow-hidden px-6 py-24 sm:py-32 lg:px-8">
          {/* Animated floating particles */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-gray-950 to-gray-950" />
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-emerald-500/10 blur-3xl animate-pulse-glow" />
            {/* Floating orbs */}
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
                Built by <span className="font-medium text-gray-300">Mo</span> — a founder, for founders
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

        {/* ─── SOCIAL PROOF ─── */}
        <section className="border-t border-gray-800 px-6 py-16">
          <div className="mx-auto max-w-6xl">
            <ScrollReveal>
              <p className="mb-10 text-center text-sm font-medium uppercase tracking-widest text-gray-500">
                Trusted by 200+ SaaS founders
              </p>
            </ScrollReveal>
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4 mb-12">
              <AnimatedCounter target={200} suffix="+" label="Active founders" />
              <AnimatedCounter target={12} suffix="M+" label="MRR tracked" />
              <AnimatedCounter target={98} suffix="%" label="Would recommend" />
              <AnimatedCounter target={47} suffix="K" label="Invoices processed" />
            </div>
            <div className="flex flex-wrap items-center justify-center gap-12 opacity-30">
              <svg viewBox="0 0 120 30" className="h-8 w-32 text-gray-400" fill="currentColor">
                <rect x="0" y="5" width="24" height="20" rx="4" opacity="0.4" />
                <rect x="30" y="5" width="24" height="20" rx="4" opacity="0.6" />
                <rect x="60" y="5" width="24" height="20" rx="4" opacity="0.5" />
                <rect x="90" y="5" width="24" height="20" rx="4" opacity="0.3" />
              </svg>
              <svg viewBox="0 0 120 30" className="h-8 w-32 text-gray-400" fill="currentColor">
                <circle cx="15" cy="15" r="10" opacity="0.4" />
                <circle cx="45" cy="15" r="10" opacity="0.6" />
                <circle cx="75" cy="15" r="10" opacity="0.5" />
                <circle cx="105" cy="15" r="10" opacity="0.3" />
              </svg>
              <svg viewBox="0 0 120 30" className="h-8 w-32 text-gray-400" fill="currentColor">
                <polygon points="12,2 22,22 2,22" opacity="0.4" />
                <polygon points="42,2 52,22 32,22" opacity="0.6" />
                <polygon points="72,2 82,22 62,22" opacity="0.5" />
                <polygon points="102,2 112,22 92,22" opacity="0.3" />
              </svg>
              <svg viewBox="0 0 120 30" className="h-8 w-32 text-gray-400" fill="currentColor">
                <rect x="2" y="2" width="26" height="26" rx="6" opacity="0.5" />
                <rect x="32" y="2" width="26" height="26" rx="6" opacity="0.3" />
                <rect x="62" y="2" width="26" height="26" rx="6" opacity="0.6" />
                <rect x="92" y="2" width="26" height="26" rx="6" opacity="0.4" />
              </svg>
            </div>
          </div>
        </section>

        {/* ─── PROBLEM ─── */}
        <section className="border-t border-gray-800 px-6 py-24">
          <div className="mx-auto max-w-6xl">
            <ScrollReveal>
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-white">Sound familiar?</h2>
                <p className="mt-4 text-lg text-gray-400">The struggles every SaaS founder knows too well.</p>
              </div>
            </ScrollReveal>
            <div className="grid gap-8 md:grid-cols-3">
              {[
                { emoji: "😰", bg: "bg-red-500/10", title: "I don't know if I can make payroll next month", desc: "Cash runway is a guessing game. You have revenue coming in but no clear picture of when the money runs out." },
                { emoji: "📊", bg: "bg-amber-500/10", title: "My spreadsheet is always 2 weeks behind", desc: "Manual data entry is error-prone and stale. By the time you update your models, the numbers have already changed." },
                { emoji: "🎯", bg: "bg-purple-500/10", title: "I have no idea what my real MRR is", desc: "Between refunds, upgrades, downgrades, and failed payments — calculating real MRR requires more than just adding up invoices." },
              ].map((card, i) => (
                <ScrollReveal key={card.title} delay={i * 100}>
                  <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-8 hover:border-gray-700 transition-colors group">
                    <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${card.bg} group-hover:scale-110 transition-transform`}>
                      <span className="text-2xl">{card.emoji}</span>
                    </div>
                    <h3 className="mb-3 text-lg font-semibold text-white">{card.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{card.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

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
              {/* Founder Photo + Social */}
              <ScrollReveal delay={100} className="md:col-span-2">
                <div className="flex flex-col items-center">
                  <div className="relative mb-6">
                    <img
                      src="/founder.jpg"
                      alt="Mo — Founder of AI Finance Ops"
                      className="h-48 w-48 rounded-2xl object-cover border border-emerald-500/10 shadow-lg"
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

              {/* Story */}
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
                    automate AR — completely bootstrapped and built in public.
                  </p>
                  <div className="flex items-center gap-3 pt-2">
                    <span className="text-xs text-gray-500">Follow the journey:</span>
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

        {/* ─── SOLUTION ─── */}
        <section id="features" className="border-t border-gray-800 px-6 py-24">
          <div className="mx-auto max-w-6xl">
            <ScrollReveal>
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-white">Built for SaaS founders who need answers now</h2>
                <p className="mt-4 text-lg text-gray-400">Everything you need to understand your financial health at a glance.</p>
              </div>
            </ScrollReveal>
            <div className="grid gap-8 md:grid-cols-3">
              {[
                { icon: BarChart3, color: "text-emerald-400", bg: "bg-emerald-500/10", title: "MRR & KPI Dashboard", desc: "Real-time MRR, ARR, churn rate, and LTV — automatically calculated from your billing data. No manual entry required." },
                { icon: TrendingUp, color: "text-blue-400", bg: "bg-blue-500/10", title: "Cash Flow Forecast P50/P80/P95", desc: "30/60/90 day projections with confidence bands. Know your best, expected, and worst case runway scenarios." },
                { icon: Receipt, color: "text-amber-400", bg: "bg-amber-500/10", title: "Accounts Receivable + Smart Reminders", desc: "Track overdue invoices, send automated payment reminders, and reduce DSO with AI-powered AR management." },
              ].map((feat, i) => (
                <ScrollReveal key={feat.title} delay={i * 100}>
                  <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-8 hover:border-gray-700 transition-colors group">
                    <div className={`mb-5 flex h-14 w-14 items-center justify-center rounded-xl ${feat.bg} group-hover:scale-110 transition-transform`}>
                      <feat.icon className={`h-7 w-7 ${feat.color}`} />
                    </div>
                    <h3 className="mb-3 text-lg font-semibold text-white">{feat.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{feat.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

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
                      <span className="text-gray-500 text-sm">Dashboard Preview — 90-Day Forecast Chart</span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ─── PRICING ─── */}
        <section id="pricing" className="border-t border-gray-800 px-6 py-24">
          <div className="mx-auto max-w-6xl">
            <ScrollReveal>
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-white">Simple, transparent pricing</h2>
                <p className="mt-4 text-lg text-gray-400">Start free. Upgrade when you need more power.</p>
              </div>
            </ScrollReveal>
            <div className="grid gap-8 lg:grid-cols-3">
              {[
                {
                  name: "Starter", price: 29, desc: "For solo founders getting started",
                  features: ["1 workspace", "KPI dashboard (MRR, ARR, Churn)", "30-day cash flow forecast", "Single billing integration", "Email support"],
                  highlighted: false,
                },
                {
                  name: "Growth", price: 79, desc: "For growing SaaS teams",
                  features: ["3 workspaces", "Everything in Starter", "90-day P50/P80/P95 forecast", "Multiple billing integrations", "Smart AR reminders", "Priority support"],
                  highlighted: true,
                },
                {
                  name: "Scale", price: 199, desc: "For established businesses",
                  features: ["Unlimited workspaces", "Everything in Growth", "API access & webhooks", "AI-powered insights", "Custom integrations", "Dedicated account manager"],
                  highlighted: false,
                },
              ].map((plan, i) => (
                <ScrollReveal key={plan.name} delay={i * 100}>
                  <div className={`relative flex flex-col rounded-2xl p-8 ${plan.highlighted ? "border-2 border-emerald-500 bg-gray-900 shadow-xl shadow-emerald-500/10" : "border border-gray-800 bg-gray-900/50"} hover:border-emerald-500/50 transition-colors`}>
                    {plan.highlighted && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-emerald-500 px-4 py-1 text-sm font-semibold text-white">
                        Recommended
                      </div>
                    )}
                    <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                    <p className="mt-2 text-sm text-gray-400">{plan.desc}</p>
                    <div className="mt-6">
                      <span className="text-5xl font-bold text-white">${plan.price}</span>
                      <span className="text-gray-500">/mo</span>
                    </div>
                    <ul className="mt-8 flex-1 space-y-4">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-start gap-3">
                          <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-500" />
                          <span className="text-sm text-gray-300">{f}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href="/register" className="mt-8 block">
                      <span className={`flex w-full items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold transition-all ${
                        plan.highlighted
                          ? "bg-emerald-500 text-white hover:bg-emerald-400 shadow-lg shadow-emerald-500/25"
                          : "border border-gray-700 text-gray-300 hover:border-gray-500 hover:text-white"
                      }`}>
                        Start Free Trial
                      </span>
                    </Link>
                  </div>
                </ScrollReveal>
              ))}
            </div>
            <ScrollReveal>
              <p className="mt-8 text-center text-sm text-gray-500">
                14-day free trial &bull; No credit card required &bull; Cancel anytime
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* ─── TESTIMONIALS ─── */}
        <section id="testimonials" className="border-t border-gray-800 px-6 py-24">
          <div className="mx-auto max-w-3xl">
            <ScrollReveal>
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-white">Loved by SaaS founders</h2>
                <p className="mt-4 text-lg text-gray-400">Real founders, real results.</p>
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <TestimonialCarousel />
            </ScrollReveal>
          </div>
        </section>

        {/* ─── FAQ ─── */}
        <section id="faq" className="border-t border-gray-800 px-6 py-24">
          <div className="mx-auto max-w-3xl">
            <ScrollReveal>
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-white">Frequently asked questions</h2>
                <p className="mt-4 text-lg text-gray-400">Everything you need to know.</p>
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <FaqAccordion />
            </ScrollReveal>
          </div>
        </section>

        {/* ─── CTA ─── */}
        <section className="border-t border-gray-800 px-6 py-24">
          <div className="mx-auto max-w-3xl text-center">
            <ScrollReveal>
              <div className="mx-auto max-w-md rounded-2xl border border-gray-800 bg-gray-900/50 p-6 mb-12 text-left">
                <div className="flex items-start gap-4">
                  <img
                    src="/founder.jpg"
                    alt="Mo"
                    className="h-12 w-12 shrink-0 rounded-xl object-cover"
                  />
                  <div>
                    <p className="text-sm text-gray-300 leading-relaxed italic">
                      &ldquo;I built AI Finance Ops because I was tired of spreadsheet chaos.
                      If you&apos;re a founder who wants real answers without the headache —
                      this is for you.&rdquo;
                    </p>
                    <p className="text-xs text-gray-500 mt-2">— Mo, Founder of AI Finance Ops</p>
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
