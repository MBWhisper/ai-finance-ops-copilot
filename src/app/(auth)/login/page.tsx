"use client"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { createClient } from "@/lib/supabase/browser"
import { Logo } from "@/components/logo"
import { Loader2, Check, ArrowRight } from "lucide-react"
import Link from "next/link"
import { mapAuthError } from "@/lib/auth/error-messages"

export default function LoginPage() {
  const router = useRouter()
  const supabase = createClient()
  const [step, setStep] = useState<"form" | "magic">("form")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [shake, setShake] = useState(false)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const [magicEmail, setMagicEmail] = useState("")
  const [magicSent, setMagicSent] = useState(false)
  const [magicLoading, setMagicLoading] = useState(false)

  const triggerShake = useCallback(() => {
    setShake(true)
    setTimeout(() => setShake(false), 400)
  }, [])

  const [needsConfirmation, setNeedsConfirmation] = useState(false)
  const [resendingConfirm, setResendingConfirm] = useState(false)
  const [resentConfirm, setResentConfirm] = useState(false)

  async function handleResendConfirmation() {
    setResendingConfirm(true)
    const { error: resendError } = await supabase.auth.resend({
      type: "signup",
      email: email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback?next=/onboarding` },
    })
    if (resendError) {
      // eslint-disable-next-line no-console
      console.error("[AUTH_LOGIN_RESEND_ERROR]", { email, message: resendError.message })
    } else {
      setResentConfirm(true)
    }
    setResendingConfirm(false)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")
    setNeedsConfirmation(false)
    setResentConfirm(false)

    // eslint-disable-next-line no-console
    console.log("[AUTH_LOGIN_START]", { email })

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (signInError) {
      // eslint-disable-next-line no-console
      console.error("[AUTH_LOGIN_ERROR]", { email, code: signInError.code, message: signInError.message })
      const mapped = mapAuthError(signInError)
      setError(mapped)
      // Show resend link if credentials are "wrong" — could be unconfirmed
      if (signInError.message?.toLowerCase().includes("invalid") || signInError.code === "invalid_credentials") {
        setNeedsConfirmation(true)
      }
      setLoading(false)
      triggerShake()
      return
    }

    // eslint-disable-next-line no-console
    console.log("[AUTH_LOGIN_REDIRECT]", { destination: "/onboarding" })
    setSuccess(true)
    setTimeout(() => router.push("/onboarding"), 600)
  }

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault()
    setMagicLoading(true)
    setError("")
    setMagicSent(false)
    if (!magicEmail) { setError("Please enter your email"); setMagicLoading(false); return }

    const { error: magicErr } = await supabase.auth.signInWithOtp({
      email: magicEmail,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback?next=/onboarding` },
    })

    if (magicErr) {
      // eslint-disable-next-line no-console
      console.error("[AUTH_MAGIC_ERROR]", { email: magicEmail, message: magicErr.message })
      setError(mapAuthError(magicErr))
      setMagicLoading(false)
      return
    }
    setMagicSent(true)
    setMagicLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col lg:flex-row">
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-emerald-950/40 items-center justify-center p-12 min-h-screen">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-emerald-500/10 blur-[120px]" style={{ animation: "gradientShift 12s ease-in-out infinite" }} />
          <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-teal-500/8 blur-[100px]" style={{ animation: "gradientShift2 15s ease-in-out infinite" }} />
          <div className="absolute top-1/2 left-1/2 w-[350px] h-[350px] rounded-full bg-cyan-500/6 blur-[90px]" style={{ animation: "gradientShift3 10s ease-in-out infinite" }} />
        </div>
        {[...Array(8)].map((_, i) => (
          <div key={i} className="absolute w-1.5 h-1.5 rounded-full bg-emerald-400/30"
            style={{ top: `${15 + i * 10}%`, left: `${10 + ((i * 17) % 80)}%`, animation: `float${(i % 2) + 1} ${3 + i * 0.5}s ease-in-out infinite`, animationDelay: `${i * 0.4}s` }} />
        ))}
        <div className="relative" style={{ perspective: "1000px" }}>
          <div className="absolute rounded-2xl p-6 w-64 backdrop-blur-xl border border-white/10 shadow-2xl"
            style={{ background: "rgba(255,255,255,0.04)", transform: "rotateY(12deg) rotateX(4deg)", animation: "float 3.5s ease-in-out infinite", top: "-40px", left: "20px", zIndex: 3 }}>
            <div className="text-xs text-emerald-400/70 font-medium uppercase tracking-wider mb-2">MRR</div>
            <div className="text-2xl font-bold text-white">$45,800</div>
            <div className="flex items-center gap-1 mt-1"><span className="text-xs text-emerald-400">↑ 12.3%</span><span className="text-xs text-gray-500">vs last month</span></div>
          </div>
          <div className="absolute rounded-2xl p-6 w-64 backdrop-blur-xl border border-white/10 shadow-2xl"
            style={{ background: "rgba(255,255,255,0.04)", transform: "rotateY(8deg) rotateX(2deg)", animation: "float2 4s ease-in-out infinite", animationDelay: "0.5s", top: "40px", right: "10px", zIndex: 2 }}>
            <div className="flex justify-between items-start">
              <div><div className="text-xs text-blue-400/70 font-medium uppercase tracking-wider mb-2">Runway</div><div className="text-2xl font-bold text-white">14 months</div></div>
              <div className="h-8 w-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 text-xs">↑</div>
            </div>
          </div>
          <div className="rounded-2xl p-6 w-64 backdrop-blur-xl border border-white/10 shadow-2xl"
            style={{ background: "rgba(255,255,255,0.04)", transform: "rotateY(15deg) rotateX(5deg)", animation: "float 3s ease-in-out infinite", animationDelay: "1s", top: "120px", left: "50px", zIndex: 1 }}>
            <div className="text-xs text-amber-400/70 font-medium uppercase tracking-wider mb-2">Churn Rate</div>
            <div className="text-2xl font-bold text-white">3.2%</div>
            <div className="flex items-center gap-1 mt-1"><div className="h-1.5 w-24 rounded-full bg-gray-800 overflow-hidden"><div className="h-full w-1/3 rounded-full bg-amber-500" /></div><span className="text-xs text-amber-400">↓ 0.4%</span></div>
          </div>
        </div>
        <div className="absolute bottom-12 left-12 right-12 text-center">
          <p className="font-serif italic text-xl text-white/80 leading-relaxed">Join founders who replaced spreadsheet chaos</p>
          <p className="font-serif italic text-xl text-emerald-400/80">with AI-powered financial clarity.</p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 py-24 lg:py-0 min-h-screen lg:min-h-0">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="w-full max-w-sm">
          <div className="flex justify-center mb-8"><Link href="/"><Logo size={36} /></Link></div>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white">Welcome back</h1>
            <p className="text-sm text-gray-500 mt-2">Sign in to your finance dashboard.</p>
          </motion.div>

          <AnimatePresence>
            {error && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                className={`rounded-xl px-4 py-3 mb-3 text-sm border ${shake ? "auth-shake" : ""} bg-red-500/10 border-red-500/20 text-red-400`}>
                {error}
                {needsConfirmation && !resentConfirm && (
                  <button
                    onClick={handleResendConfirmation}
                    disabled={resendingConfirm}
                    className="block mt-2 text-xs text-red-300 hover:text-red-200 underline transition-colors"
                  >
                    {resendingConfirm ? "Sending..." : "Resend confirmation email"}
                  </button>
                )}
                {resentConfirm && (
                  <p className="mt-2 text-xs text-emerald-400">Confirmation email resent. Check your spam folder.</p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {success && (
              <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                className="flex items-center justify-center gap-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 px-4 py-3 mb-6 text-emerald-400 text-sm">
                <Check className="h-4 w-4" /> Signed in! Redirecting...
              </motion.div>
            )}
          </AnimatePresence>

          {step === "form" ? (
            <>
              <motion.form onSubmit={handleSubmit} className="space-y-5" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.05 } } }}>
                <motion.div variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }} className="relative">
                  <input id="login-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder=" " autoComplete="email"
                    className="peer w-full h-12 rounded-xl border border-gray-800 bg-gray-900/50 px-4 pt-4 text-sm text-white placeholder-transparent focus:border-emerald-500/50 focus:outline-none focus:ring-0 transition-colors" />
                  <label htmlFor="login-email"
                    className="absolute left-4 top-3.5 text-sm text-gray-500 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-emerald-400 peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-gray-400">
                    Email address</label>
                </motion.div>
                <motion.div variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }} className="relative">
                  <input id="login-password" type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required placeholder=" " autoComplete="current-password"
                    className="peer w-full h-12 rounded-xl border border-gray-800 bg-gray-900/50 px-4 pt-4 pr-12 text-sm text-white placeholder-transparent focus:border-emerald-500/50 focus:outline-none focus:ring-0 transition-colors" />
                  <label htmlFor="login-password"
                    className="absolute left-4 top-3.5 text-sm text-gray-500 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-emerald-400 peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-gray-400">
                    Password</label>
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-gray-500 hover:text-gray-300" tabIndex={-1}>
                    {showPassword ? <EyeOffSvg /> : <EyeSvg />}
                  </button>
                </motion.div>
                <motion.div variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}>
                  <button type="submit" disabled={loading}
                    className="group relative w-full h-12 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-sm font-semibold text-white hover:from-emerald-400 hover:to-teal-500 transition-all disabled:opacity-60 shadow-lg shadow-emerald-500/20">
                    {loading ? <Loader2 className="h-5 w-5 animate-spin mx-auto" /> : (
                      <span className="inline-flex items-center gap-2">Sign In <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" /></span>
                    )}
                  </button>
                </motion.div>
              </motion.form>

              <div className="flex items-center gap-3 my-6">
                <div className="flex-1 h-px bg-gray-800" /><span className="text-sm text-gray-500">or</span><div className="flex-1 h-px bg-gray-800" />
              </div>
              <button onClick={() => setStep("magic")} className="w-full h-12 rounded-xl border border-gray-800 text-sm font-medium text-gray-400 hover:text-white hover:border-gray-700 transition-colors">
                Send me a login link
              </button>
            </>
          ) : (
            <motion.form onSubmit={handleMagicLink} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
              <div className="relative">
                <input id="login-magic-email" type="email" value={magicEmail} onChange={(e) => setMagicEmail(e.target.value)} required placeholder=" " autoComplete="email"
                  className="peer w-full h-12 rounded-xl border border-gray-800 bg-gray-900/50 px-4 pt-4 text-sm text-white placeholder-transparent focus:border-emerald-500/50 focus:outline-none focus:ring-0 transition-colors" />
                <label htmlFor="login-magic-email"
                  className="absolute left-4 top-3.5 text-sm text-gray-500 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-emerald-400 peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-gray-400">
                  Email address</label>
              </div>
              {magicSent && <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/20 px-4 py-3 text-emerald-400 text-sm text-center">✅ Check your email for a login link</div>}
              <button type="submit" disabled={magicLoading || magicSent}
                className="w-full h-12 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-sm font-semibold text-white disabled:opacity-60 transition-all shadow-lg shadow-emerald-500/20">
                {magicLoading ? <Loader2 className="h-5 w-5 animate-spin mx-auto" /> : magicSent ? "Link sent!" : "Send magic link"}
              </button>
              <button type="button" onClick={() => { setStep("form"); setMagicSent(false) }} className="w-full text-sm text-gray-500 hover:text-gray-300 transition-colors">
                ← Back to password login
              </button>
            </motion.form>
          )}

          <p className="text-center text-sm text-gray-500 mt-8">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors">Create one</Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}

/* ── Inline SVG icons to avoid importing Eye/EyeOff ── */
function EyeSvg() {
  return (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  )
}
function EyeOffSvg() {
  return (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
    </svg>
  )
}
