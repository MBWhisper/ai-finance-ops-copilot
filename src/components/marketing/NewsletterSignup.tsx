"use client"

import { useState, FormEvent } from "react"
import { ScrollReveal } from "@/components/landing-interactive"
import { Check, Loader2 } from "lucide-react"

export function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!email) return
    setStatus("loading")
    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) throw new Error("Failed")
      setStatus("success")
      setEmail("")
    } catch {
      setStatus("error")
      setTimeout(() => setStatus("idle"), 4000)
    }
  }

  return (
    <section className="border-t border-gray-800 px-6 py-16">
      <div className="mx-auto max-w-lg text-center">
        <ScrollReveal>
          <h3 className="text-xl font-bold text-white mb-2">Get SaaS finance tips</h3>
          <p className="text-sm text-gray-400 mb-6">
            Join 200+ founders who receive weekly insights on MRR growth, cash flow, and bootstrapping.
          </p>
          {status === "success" ? (
            <div className="flex items-center justify-center gap-2 rounded-lg bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400">
              <Check className="h-4 w-4" /> You&apos;re subscribed!
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <label htmlFor="newsletter-email" className="sr-only">Email address</label>
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-colors"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-500 disabled:opacity-50 transition-all shrink-0"
              >
                {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : "Subscribe"}
              </button>
            </form>
          )}
          {status === "error" && (
            <p className="mt-2 text-xs text-red-400">Something went wrong. Try again.</p>
          )}
          <p className="mt-3 text-xs text-gray-500">No spam. Unsubscribe anytime.</p>
        </ScrollReveal>
      </div>
    </section>
  )
}
