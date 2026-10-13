import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"

export default function NotFound() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-gray-950 px-6 text-center flex flex-col items-center justify-center">
      {/* Backdrop aurora */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/25 via-gray-950 to-gray-950" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full bg-emerald-500/10 blur-[100px] animate-aurora-1" />
        <div className="absolute bottom-0 right-0 w-[700px] h-[500px] rounded-[50%_40%_60%_45%/_45%_55%_60%_40%] bg-teal-600/08 blur-[80px] animate-aurora-2" />
      </div>

      <div className="relative z-10 mx-auto max-w-2xl">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400 backdrop-blur-sm">
          <Sparkles className="h-3 w-3" />
          Page not found
        </div>

        <h1 className="text-7xl sm:text-9xl font-extrabold tracking-tighter text-white mb-2">
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-emerald-300 via-emerald-400 to-teal-500">404</span>
        </h1>
        <p className="text-2xl font-bold text-white mb-4">This chart went flat.</p>
        <p className="text-gray-400 text-lg mb-10 max-w-lg mx-auto leading-relaxed">
          The URL you followed has no data. Let&apos;s get you back to numbers that matter.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-7 py-3.5 text-base font-semibold text-white shadow-xl shadow-emerald-600/20 hover:bg-emerald-500 hover:-translate-y-0.5 transition-all"
          >
            Back to home <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/mrr-calculator"
            className="inline-flex items-center gap-2 rounded-xl border border-gray-700 bg-gray-900/60 px-7 py-3.5 text-base font-medium text-gray-300 hover:border-emerald-500/50 hover:text-white transition-all backdrop-blur-sm"
          >
            Free MRR calculator
          </Link>
        </div>

        <div className="mt-12 text-xs text-gray-500 space-y-1">
          <p>Popular pages:</p>
          <div className="flex flex-wrap justify-center gap-3 text-emerald-400/80">
            <Link href="/mrr-tracker" className="hover:text-emerald-300 underline underline-offset-2">MRR Tracker</Link>
            <Link href="/arr-calculator" className="hover:text-emerald-300 underline underline-offset-2">ARR Calculator</Link>
            <Link href="/blog/what-is-good-mrr-growth-rate" className="hover:text-emerald-300 underline underline-offset-2">Growth Benchmarks</Link>
          </div>
        </div>
      </div>
    </main>
  )
}
