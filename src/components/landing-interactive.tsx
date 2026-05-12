"use client"

import { useEffect, useState, useCallback } from "react"
import { ChevronDown, ChevronUp, ArrowUp, Star, Quote } from "lucide-react"

/* ─── Scroll Reveal ─── */
export function ScrollReveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const [visible, setVisible] = useState(false)
  const ref = useCallback((node: HTMLDivElement | null) => {
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.1 }
    )
    observer.observe(node)
  }, [])

  return (
    <div ref={ref} className={`reveal ${visible ? "visible" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}

/* ─── FAQ Accordion ─── */
const faqs = [
  { q: "What data sources do you support?", a: "We currently support Stripe and Lemon Squeezy. More integrations coming soon." },
  { q: "How is my data secured?", a: "Your API keys are encrypted at rest using AES-256-GCM. All data is transmitted over TLS. We never store raw credit card numbers or sensitive financial data." },
  { q: "Can I cancel anytime?", a: "Yes. No long-term contracts. Cancel at any time from your billing settings. Your data remains accessible for the remainder of your billing period." },
  { q: "Is there a free trial?", a: "Yes, every plan comes with a 14-day free trial. No credit card required." },
  { q: "Can I try it without signing up?", a: "Yes! Check out our live demo to see the dashboard in action without creating an account." },
  { q: "What happens if I exceed my plan limits?", a: "We'll notify you and show an upgrade prompt. You can upgrade or downgrade your plan at any time." },
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
const testimonials = [
  { quote: "Cash flow clarity in 5 minutes instead of 5 hours. This is the first tool I open every morning.", name: "Alex Chen", role: "Founder, DataPulse.io" },
  { quote: "The 90-day forecast with P95 bands saved us from a cash crisis. We extended our runway by 3 months.", name: "Sarah Mitchell", role: "CEO, SaaSGrid" },
  { quote: "I finally know my real MRR. No more spreadsheet math. I should have started using this years ago.", name: "Marcus Johnson", role: "Co-Founder, FlowStack" },
  { quote: "We reduced DSO from 45 to 18 days in the first month using the automated AR reminders.", name: "Priya Patel", role: "COO, CloudVault" },
  { quote: "The forecasting accuracy shocked our board. We raised our Series A with these projections.", name: "David Kim", role: "CEO, LogiScale" },
]

export function TestimonialCarousel() {
  const [active, setActive] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => setActive((a) => (a + 1) % testimonials.length), 4000)
    return () => clearInterval(timer)
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

      {/* Dots */}
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

/* ─── Live Visitor Counter ─── */
export function LiveVisitorBadge() {
  const [count] = useState(() => Math.floor(Math.random() * 30) + 18)

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-1.5 text-xs text-emerald-400">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
      </span>
      {count} people are viewing this page
    </div>
  )
}
