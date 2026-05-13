import Link from "next/link"
import { Logo } from "@/components/logo"
import { ArrowLeft } from "lucide-react"

export const metadata = {
  title: "About | AI Finance Ops",
  description:
    "Meet Mo — the founder behind AI Finance Ops. Built for SaaS founders who want real-time financial clarity.",
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <div className="mx-auto max-w-3xl px-6 py-24">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to home
        </Link>

        <div className="flex items-center gap-3 mb-8">
          <Logo size={40} />
          <div>
            <h1 className="text-3xl font-bold text-white">About AI Finance Ops</h1>
            <p className="text-gray-400">Built by a founder, for founders.</p>
          </div>
        </div>

        {/* Story */}
        <section className="mb-16">
          <h2 className="text-xl font-semibold text-white mb-4">The Story</h2>
          <div className="space-y-4 text-gray-300 leading-relaxed">
            <p>
              AI Finance Ops was built by <strong className="text-white">Mo</strong> — a full-stack developer and entrepreneur
              from Morocco with a passion for SaaS, Web3, and automation.
            </p>
            <p>
              After spending too many hours in spreadsheets trying to understand cash flow,
              I built the tool I always wished existed.
            </p>
            <p>
              AI Finance Ops gives SaaS founders real-time visibility into their MRR,
              runway, and accounts receivable — without the spreadsheet chaos.
            </p>
          </div>
        </section>

        {/* Founder Card */}
        <section className="mb-16 rounded-2xl border border-gray-800 bg-gray-900/50 p-8">
          <div className="flex items-start gap-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-emerald-500/10 text-4xl">
              👨‍💻
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Mo — System Architect & SaaS Builder</h3>
              <p className="text-sm text-gray-500 mt-1">📍 Agadir, Morocco 🇲🇦</p>
              <p className="text-gray-400 mt-4 leading-relaxed">
                Full-stack developer, SaaS builder, and Web3 enthusiast. Building profitable
                digital products from zero budget.
              </p>
            </div>
          </div>
        </section>

        {/* Social Links */}
        <section className="mb-16">
          <h2 className="text-xl font-semibold text-white mb-6">Connect with Mo</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { label: "LinkedIn", href: "https://www.linkedin.com/in/mo-systemarchitect", emoji: "💼" },
              { label: "Facebook", href: "https://www.facebook.com/opsssimoo", emoji: "📘" },
              { label: "YouTube", href: "https://www.youtube.com/@AIKnowlidgi", emoji: "▶️" },
              { label: "TikTok", href: "https://www.tiktok.com/@aiknowleedge", emoji: "🎵" },
              { label: "Instagram", href: "https://www.instagram.com/aiknowleedge", emoji: "📸" },
              { label: "Twitter / X", href: "https://twitter.com/MbtechE80106", emoji: "🐦" },
              { label: "Web3 Jobs", href: "https://web3-jobs-hazel.vercel.app", emoji: "🌐" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl border border-gray-800 bg-gray-900/50 px-5 py-3 text-sm text-gray-300 hover:border-emerald-500/30 hover:text-white transition-colors group"
              >
                <span className="text-lg">{link.emoji}</span>
                <span>{link.label}</span>
                <span className="ml-auto text-gray-600 group-hover:text-emerald-400 text-xs">↗</span>
              </a>
            ))}
          </div>
        </section>

        {/* Mission */}
        <section className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-8">
          <h2 className="text-lg font-semibold text-emerald-400 mb-3">Our Mission</h2>
          <p className="text-gray-300 leading-relaxed">
            Our mission: make SaaS financial intelligence accessible to every
            early-stage founder — not just those who can afford a CFO.
          </p>
        </section>
      </div>
    </div>
  )
}
