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
  { q: "Do I need a credit card to start?", a: "No. Free plan is completely free, no card required." },
  { q: "Which payment processors do you support?", a: "Currently Stripe, with more integrations coming soon." },
  { q: "How is this different from Baremetrics?", a: "aifinanceops is built for solo founders and early-stage teams — simpler, cheaper, and powered by AI forecasting that Baremetrics doesn't offer." },
]

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <div key={i} className="rounded-xl border border-gray-800 bg-gray-900/50 overflow-hidden transition-all duration-300">
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="flex w-full items-center justify-between px-6 py-5 text-left text-sm font-medium text-gray-200 hover:text-white transition-colors"
          >
            <span>{faq.q}</span>
            {openIndex === i ? <ChevronUp className="h-4 w-4 text-emerald-400 shrink-0 ml-4" /> : <ChevronDown className="h-4 w-4 text-gray-500 shrink-0 ml-4" />}
          </button>
          <div className={`overflow-hidden transition-all duration-300 ${openIndex === i ? "max-h-96" : "max-h-0"}`}>
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
// TODO: replace with real testimonials
const testimonials = [
  { quote: "aifinanceops saved me 10+ hours a month on financial reporting. The AI forecasts are eerily accurate.", name: "[Customer name]", role: "Founder of [SaaS name]" },
  { quote: "I tried Baremetrics, but it was overkill for my stage. aifinanceops gives me exactly what I need.", name: "[Customer name]", role: "Founder of [SaaS name]" },
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
      <div className="mb-4 flex gap-1">
        {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-amber-500 text-amber-500" />)}
      </div>
      <Quote className="mb-4 h-8 w-8 text-gray-600" />
      <p className="text-gray-200 text-lg leading-relaxed mb-6 transition-opacity duration-300">&ldquo;{t.quote}&rdquo;</p>
      <div>
        <p className="text-sm font-semibold text-white">{t.name}</p>
        <p className="text-xs text-gray-500">{t.role}</p>
      </div>

      <div className="flex justify-center gap-2 mt-8">
        {testimonials.map((_, i) => (
          <button
            key={i}
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
export function AnimatedCounter({ target, suffix = "", label }: { target: number; suffix?: string; label: string }) {
  const [count, setCount] = useState(0)
  const [visible, setVisible] = useState(false)
  const ref = useCallback((node: HTMLDivElement | null) => {
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.5 }
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
      <div className="text-4xl font-bold text-emerald-400 mb-2">
        {count.toLocaleString()}{suffix}
      </div>
      <p className="text-gray-500 text-sm">{label}</p>
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
      className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/25 hover:bg-emerald-400 transition-all animate-fade-in"
      aria-label="Back to top"
    >
      <ArrowUp className="h-5 w-5" />
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
      <span className="relative flex h-2 w-2 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
      </span>
      <span suppressHydrationWarning>{count ?? 0} people are viewing this page</span>
    </div>
  )
}
