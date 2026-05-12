"use client"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { createClient } from "@/lib/supabase/browser"
import { Logo } from "@/components/logo"
import { Eye, EyeOff, Loader2, Check, ArrowRight, Mail } from "lucide-react"
import Link from "next/link"
import { mapAuthError } from "@/lib/auth/error-messages"

function getStrength(pw: string): { score: number; label: string; color: string } {
  let s = 0
  if (pw.length >= 8) s++
  if (pw.length >= 12) s++
  if (/[A-Z]/.test(pw)) s++
  if (/[0-9]/.test(pw)) s++
  if (/[^A-Za-z0-9]/.test(pw)) s++
  if (s <= 1) return { score: s, label: "Weak", color: "bg-red-500" }
  if (s === 2 || s === 3) return { score: s, label: "Fair", color: "bg-amber-500" }
  if (s === 4) return { score: s, label: "Strong", color: "bg-emerald-500" }
  return { score: s, label: "Very Strong", color: "bg-emerald-400" }
}

export default function RegisterPage() {
  const router = useRouter()
  const supabase = createClient()
  const [step, setStep] = useState<"form" | "magic">("form")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [shake, setShake] = useState(false)

  // Email confirmation state
  const [confirmScreen, setConfirmScreen] = useState(false)
  const [confirmEmail, setConfirmEmail] = useState("")
  const [resending, setResending] = useState(false)
  const [resent, setResent] = useState(false)

  const [magicEmail, setMagicEmail] = useState("")
  const [magicSent, setMagicSent] = useState(false)
  const [magicLoading, setMagicLoading] = useState(false)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const strength = getStrength(password)

  const triggerShake = useCallback(() => {
    setShake(true)
    setTimeout(() => setShake(false), 400)
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")

    // eslint-disable-next-line no-console
    console.log("[AUTH_REGISTER_START]", { email })

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
        emailRedirectTo: `${window.location.origin}/auth/callback?next=/onboarding`,
      },
    })

    if (signUpError) {
      console.error("[AUTH_REGISTER_ERROR]", { email, code: signUpError.code, message: signUpError.message })
      const mapped = mapAuthError(signUpError)
      if (signUpError.message?.toLowerCase().includes("email") && signUpError.message?.toLowerCase().includes("smtp")) {
        setConfirmScreen(true)
        setConfirmEmail(email)
        setLoading(false)
        return
      }
      setError(mapped)
      setLoading(false)
      triggerShake()
      return
    }

    // eslint-disable-next-line no-console
    console.log("[AUTH_REGISTER_RESULT]", { email, hasSession: !!data?.session, user: data?.user?.id })

    if (data?.session) {
      // eslint-disable-next-line no-console
      console.log("[AUTH_REGISTER_REDIRECT]", { destination: "/onboarding", via: "session" })
      setSuccess(true)
      setTimeout(() => router.push("/onboarding"), 600)
      return
    }

    // No session → email confirmation is required by Supabase
    // eslint-disable-next-line no-console
    console.log("[AUTH_REGISTER_CONFIRM_REQUIRED]", { email })
    setConfirmScreen(true)
    setConfirmEmail(email)
    setLoading(false)
  }

  async function handleResendConfirmation() {
    setResending(true)
    setResent(false)
    const { error: resendError } = await supabase.auth.resend({
      type: "signup",
      email: confirmEmail,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback?next=/onboarding` },
    })
    if (resendError) {
      // eslint-disable-next-line no-console
      console.error("[AUTH_RESEND_ERROR]", { email: confirmEmail, message: resendError.message })
      setError(mapAuthError(resendError))
    } else {
      setResent(true)
    }
    setResending(false)
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

  /* ── Confirmation Screen ── */
  if (confirmScreen) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm text-center"
        >
          <div className="flex justify-center mb-6"><Logo size={40} /></div>
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10">
            <Mail className="h-8 w-8 text-emerald-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Your account was created</h1>
          <p className="text-gray-400 text-sm mb-1">We sent a confirmation link to</p>
          <p className="text-emerald-400 font-medium mb-5 break-all">{confirmEmail}</p>
          <p className="text-sm text-gray-500 mb-6">
            Open the link in your inbox, then you&apos;ll be able to sign in.
          </p>

          {/* Open Gmail — works on both mobile and desktop */}
          <a
            href={`https://mail.google.com/mail/u/0/#search/from%3Anoreply%40aifinanceops.app`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex w-full items-center justify-center gap-2 h-12 rounded-xl bg-emerald-500 text-sm font-semibold text-white hover:bg-emerald-400 transition-all mb-3 shadow-lg shadow-emerald-500/20"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
            Open Gmail
          </a>

          {/* Resend */}
          <button
            onClick={handleResendConfirmation}
            disabled={resending || resent}
            className="w-full h-12 rounded-xl border border-gray-800 text-sm font-medium text-gray-400 hover:text-white hover:border-gray-700 disabled:opacity-60 transition-all mb-3"
          >
            {resending ? <Loader2 className="h-5 w-5 animate-spin mx-auto" /> : resent ? "Confirmation email sent again ✅" : "Resend confirmation email"}
          </button>

          {/* Change email — go back to form */}
          <button
            onClick={() => { setConfirmScreen(false); setError(""); setLoading(false) }}
            className="w-full text-sm text-gray-500 hover:text-gray-300 transition-colors mb-6"
          >
            ← Change email address
          </button>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 mb-4 text-sm text-red-400"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <Link
            href="/login"
            className="block w-full text-center py-2 text-sm text-gray-500 hover:text-gray-300 transition-colors"
          >
            Back to sign in →
          </Link>
        </motion.div>
      </div>
    )
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
            <h1 className="text-2xl font-bold text-white">Create your account</h1>
            <p className="text-sm text-gray-500 mt-2">Start tracking your SaaS metrics today.</p>
          </motion.div>

          <AnimatePresence>
            {error && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                className={`rounded-xl px-4 py-3 mb-6 text-sm border ${shake ? "auth-shake" : ""} bg-red-500/10 border-red-500/20 text-red-400`}>
                {error}
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {success && (
              <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                className="flex items-center justify-center gap-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 px-4 py-3 mb-6 text-emerald-400 text-sm">
                <Check className="h-4 w-4" /> Account created! Redirecting...
              </motion.div>
            )}
          </AnimatePresence>

          {step === "form" ? (
            <>
              <motion.form onSubmit={handleSubmit} className="space-y-5" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.05 } } }}>
                <motion.div variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }} className="relative">
                  <input id="reg-name" type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder=" " autoComplete="name"
                    className="peer w-full h-12 rounded-xl border border-gray-800 bg-gray-900/50 px-4 pt-4 text-sm text-white placeholder-transparent focus:border-emerald-500/50 focus:outline-none focus:ring-0 transition-colors" />
                  <label htmlFor="reg-name"
                    className="absolute left-4 top-3.5 text-sm text-gray-500 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-emerald-400 peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-gray-400">
                    Full name</label>
                </motion.div>
                <motion.div variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }} className="relative">
                  <input id="reg-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder=" " autoComplete="email"
                    className="peer w-full h-12 rounded-xl border border-gray-800 bg-gray-900/50 px-4 pt-4 text-sm text-white placeholder-transparent focus:border-emerald-500/50 focus:outline-none focus:ring-0 transition-colors" />
                  <label htmlFor="reg-email"
                    className="absolute left-4 top-3.5 text-sm text-gray-500 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-emerald-400 peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-gray-400">
                    Email address</label>
                </motion.div>
                <motion.div variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }} className="relative">
                  <input id="reg-password" type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} placeholder=" " autoComplete="new-password"
                    className="peer w-full h-12 rounded-xl border border-gray-800 bg-gray-900/50 px-4 pt-4 pr-12 text-sm text-white placeholder-transparent focus:border-emerald-500/50 focus:outline-none focus:ring-0 transition-colors" />
                  <label htmlFor="reg-password"
                    className="absolute left-4 top-3.5 text-sm text-gray-500 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-emerald-400 peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-gray-400">
                    Password</label>
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-gray-500 hover:text-gray-300" tabIndex={-1}>
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button>
                </motion.div>
                {password.length > 0 && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="space-y-1.5">
                    <div className="flex gap-1">{[1, 2, 3, 4].map((i) => (
                      <div key={i} className={`h-1 flex-1 rounded-full transition-colors duration-300 ${i <= strength.score ? strength.color : "bg-gray-800"}`} />
                    ))}</div>
                    <p className={`text-xs ${strength.score <= 1 ? "text-red-400" : strength.score <= 3 ? "text-amber-400" : "text-emerald-400"}`}>{strength.label}</p>
                  </motion.div>
                )}
                <motion.div variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}>
                  <button type="submit" disabled={loading}
                    className="group relative w-full h-12 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-sm font-semibold text-white hover:from-emerald-400 hover:to-teal-500 transition-all disabled:opacity-60 shadow-lg shadow-emerald-500/20">
                    {loading ? <Loader2 className="h-5 w-5 animate-spin mx-auto" /> : (
                      <span className="inline-flex items-center gap-2">Create Account <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" /></span>
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
                <input id="magic-email" type="email" value={magicEmail} onChange={(e) => setMagicEmail(e.target.value)} required placeholder=" " autoComplete="email"
                  className="peer w-full h-12 rounded-xl border border-gray-800 bg-gray-900/50 px-4 pt-4 text-sm text-white placeholder-transparent focus:border-emerald-500/50 focus:outline-none focus:ring-0 transition-colors" />
                <label htmlFor="magic-email"
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
            Already have an account?{" "}
            <Link href="/login" className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors">Sign in</Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
