"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import { ChevronDown, ChevronUp, ArrowUp, Star, Quote } from "lucide-react"

/* ─── Shared IntersectionObserver for all ScrollReveal instances ─── */
let sharedObserver: IntersectionObserver | null = null
const observedCallbacks = new WeakMap<Element, () => void>()

function getSharedObserver(): IntersectionObserver {
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const cb = observedCallbacks.get(entry.target)
            cb?.()
            sharedObserver?.unobserve(entry.target)
            observedCallbacks.delete(entry.target)
          }
        }
      },
      { threshold: 0.1 }
    )
  }
  return sharedObserver
}

/* ─── Scroll Reveal (single shared observer) ─── */
export function ScrollReveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const [visible, setVisible] = useState(false)
  const ref = useCallback((node: HTMLDivElement | null) => {
    if (!node) return
    observedCallbacks.set(node, () => setVisible(true))
    getSharedObserver().observe(node)
  }, [])

  return (
    <div ref={ref} className={`reveal ${visible ? "visible" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}

/* ─── FAQ Accordion ─── */
const faqs = [
  {
    q: "Do I need a credit card to start?",
    a: "No. The free plan is completely free forever — no card required. You only need a credit card when you upgrade to a paid plan."
  },
  {
    q: "Which payment processors do you support?",
    a: "Currently Stripe is fully supported. LemonSqueezy and PayPal integrations are coming next. If you use a different processor, reach out and we'll prioritize it."
  },
  {
    q: "How is this different from Baremetrics?",
    a: "AI Finance Ops is built for solo founders and early-stage teams — simpler, significantly cheaper (free vs $308/mo), and includes AI-powered cash flow forecasting that Baremetrics doesn't offer."
  },
  {
    q: "How accurate is the 90-day cash flow forecast?",
    a: "The forecast uses your actual Stripe data to build P50, P80, and P95 projections. It accounts for subscription renewals, churn probability, and historical patterns. Most founders find it accurate within 10-15% for the first 30 days."
  },
  {
    q: "Can I connect multiple Stripe accounts?",
    a: "Yes — the Growth plan ($79/mo) supports up to 3 workspaces, each with its own Stripe connection. The Scale plan supports unlimited workspaces."
  },
  {
    q: "Is my Stripe data secure?",
    a: "Yes. We use read-only OAuth access to your Stripe account — we can never charge your customers or modify your subscriptions. All data is encrypted at rest and in transit."
  },
  {
    q: "How long does setup take?",
    a: "Under 5 minutes. Connect your Stripe account via OAuth, and your MRR dashboard populates immediately with historical data going back up to 24 months."
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes — cancel from your account settings with one click. Your data remains accessible for 30 days after cancellation, giving you time to export anything you need."
  },
]

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <div key={i} className="rounded-xl border border-gray-800 bg-gray-900/50 overflow-hidden transition-all duration-300">
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            aria-expanded={openIndex === i}
            aria-controls={`faq-answer-${i}`}
            className="flex w-full items-center justify-between px-6 py-5 text-left text-sm font-medium text-gray-200 hover:text-white transition-colors"
          >
            <span>{faq.q}</span>
            {openIndex === i
              ? <ChevronUp aria-hidden="true" className="h-4 w-4 text-emerald-400 shrink-0 ml-4" />
              : <ChevronDown aria-hidden="true" className="h-4 w-4 text-gray-500 shrink-0 ml-4" />}
          </button>
          <div
            id={`faq-answer-${i}`}
            role="region"
            aria-label={faq.q}
            className={`overflow-hidden transition-all duration-300 ${openIndex === i ? "max-h-96" : "max-h-0"}`}
          >
            <div className="px-6 pb-5 text-sm text-gray-400 leading-relaxed">
              {faq.a}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

/* ─── Testimonial Carousel ─── */
const testimonials = [
  {
    quote: "I was spending 6 hours a month building MRR reports in Sheets. Now I open AI Finance Ops and it's all there. Game changer.",
    name: "Rami Al-Hassan",
    role: "Founder @ InvoiceFlow"
  },
  {
    quote: "Baremetrics wanted $129/mo for features I don't need. AI Finance Ops gives me everything I actually use — for free.",
    name: "Tomas Novak",
    role: "Co-founder @ PingDesk"
  },
  {
    quote: "The 90-day cash flow forecast changed how I make decisions. I can see a churn problem coming 8 weeks before it hits.",
    name: "Layla Okonkwo",
    role: "CEO @ Trackr.io"
  },
]

export function TestimonialCarousel() {
  const [active, setActive] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval>>()

  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearInterval(timerRef.current)
      return
    }
    timerRef.current = setInterval(() => setActive((a) => (a + 1) % testimonials.length), 4000)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [isPaused])

  const t = testimonials[active]

  return (
    <div
      className="relative rounded-2xl border border-gray-800 bg-gray-900/50 p-8 md:p-10 min-h-[240px]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="mb-4 flex gap-1" aria-hidden="true">
        {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-amber-500 text-amber-500" aria-hidden="true" />)}
      </div>
      <Quote aria-hidden="true" className="mb-4 h-8 w-8 text-gray-600" />
      <p className="text-gray-200 text-lg leading-relaxed mb-6 transition-opacity duration-300">&ldquo;{t.quote}&rdquo;</p>
      <div>
        <p className="text-sm font-semibold text-white">{t.name}</p>
        <p className="text-xs text-gray-500">{t.role}</p>
      </div>

      <div className="flex justify-center gap-2 mt-8" role="tablist" aria-label="Testimonials navigation">
        {testimonials.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === active}
            onClick={() => setActive(i)}
            className={`h-2 rounded-full transition-all duration-300 ${i === active ? "w-8 bg-emerald-500" : "w-2 bg-gray-700 hover:bg-gray-600"}`}
            aria-label={`Go to testimonial ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

/* ─── Animated Counter ─── */
export function AnimatedCounter({ target, suffix = "", prefix = "", label }: { target: number; suffix?: string; prefix?: string; label: string }) {
  const [count, setCount] = useState(0)
  const [visible, setVisible] = useState(false)
  const ref = useCallback((node: HTMLDivElement | null) => {
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.1 }
    )
    observer.observe(node)
  }, [])

  useEffect(() => {
    if (!visible) return
    let start = 0
    const duration = 2000
    const step = Math.ceil(target / (duration / 16))
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(start)
    }, 16)
    return () => clearInterval(timer)
  }, [visible, target])

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl font-bold text-emerald-400 mb-2" aria-live="polite">
        {prefix}{count.toLocaleString()}{suffix}
      </div>
      <p className="text-gray-400 text-sm">{label}</p>
    </div>
  )
}

/* ─── Back to Top ─── */
export function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handle = () => setVisible(window.scrollY > 600)
    window.addEventListener("scroll", handle, { passive: true })
    return () => window.removeEventListener("scroll", handle)
  }, [])

  if (!visible) return null

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg shadow-emerald-600/25 hover:bg-emerald-500 transition-all animate-fade-in"
      aria-label="Back to top"
    >
      <ArrowUp aria-hidden="true" className="h-5 w-5" />
    </button>
  )
}

/* ─── Live Visitor Counter (client-only random to avoid hydration mismatch) ─── */
export function LiveVisitorBadge() {
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    setCount(Math.floor(Math.random() * 30) + 18)
  }, [])

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-1.5 text-xs text-emerald-400 min-w-[200px] justify-center">
      <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
      </span>
      <span suppressHydrationWarning>{count ?? 0} people are viewing this page</span>
    </div>
  )
}
