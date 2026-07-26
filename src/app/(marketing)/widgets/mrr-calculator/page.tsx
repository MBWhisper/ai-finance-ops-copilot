import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Embeddable MRR Calculator Widget — Free for Blogs",
  description:
    "Add a free MRR calculator to your blog or website. Copy-paste the embed code. Includes a backlink to AI Finance Ops.",
  robots: { index: true, follow: true },
}

const embedCode = `<iframe
  src="https://aifinanceops.app/widgets/mrr-calculator"
  width="100%"
  height="520"
  style="border:none;border-radius:12px;max-width:480px"
  title="MRR Calculator — AI Finance Ops"
  loading="lazy"
></iframe>`

const embedCodeMarkdown = `[![MRR Calculator](https://aifinanceops.app/widgets/mrr-calculator/embed-preview.png)](https://aifinanceops.app/mrr-calculator)

<iframe
  src="https://aifinanceops.app/widgets/mrr-calculator"
  width="100%"
  height="520"
  style="border:none;border-radius:12px;max-width:480px"
  title="MRR Calculator — AI Finance Ops"
  loading="lazy"
></iframe>`

export default function EmbedWidgetsPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="mx-auto max-w-4xl px-6 py-20">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Free Embeddable MRR Calculator Widget
          </h1>
          <p className="text-gray-400 text-lg">
            Add an interactive MRR calculator to your blog, documentation, or community.
            Free to use — just include the backlink.
          </p>
        </div>

        {/* Preview */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4 text-emerald-400">Preview</h2>
          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
            <iframe
              src="https://aifinanceops.app/widgets/mrr-calculator"
              width="100%"
              height="520"
              style={{ border: "none", borderRadius: "12px", maxWidth: "480px" }}
              title="MRR Calculator Preview"
              loading="lazy"
            />
          </div>
        </div>

        {/* Embed Code */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4 text-emerald-400">Embed Code (HTML)</h2>
          <div className="relative">
            <pre className="bg-gray-900 border border-gray-800 rounded-xl p-4 overflow-x-auto text-sm text-gray-300">
              <code>{embedCode}</code>
            </pre>
            <button
              onClick={() => navigator.clipboard.writeText(embedCode)}
              className="absolute top-3 right-3 rounded-lg bg-emerald-500/20 px-3 py-1.5 text-xs font-medium text-emerald-400 hover:bg-emerald-500/30 transition-colors"
            >
              Copy
            </button>
          </div>
        </div>

        {/* Markdown for Dev.to / Hashnode */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4 text-emerald-400">
            Markdown (for Dev.to / Hashnode / GitHub README)
          </h2>
          <div className="relative">
            <pre className="bg-gray-900 border border-gray-800 rounded-xl p-4 overflow-x-auto text-sm text-gray-300">
              <code>{embedCodeMarkdown}</code>
            </pre>
            <button
              onClick={() => navigator.clipboard.writeText(embedCodeMarkdown)}
              className="absolute top-3 right-3 rounded-lg bg-emerald-500/20 px-3 py-1.5 text-xs font-medium text-emerald-400 hover:bg-emerald-500/30 transition-colors"
            >
              Copy
            </button>
          </div>
        </div>

        {/* Instructions */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4 text-emerald-400">How to Use</h2>
          <ol className="space-y-3 text-gray-400 list-decimal list-inside">
            <li>Copy the embed code above</li>
            <li>Paste it into your blog post, documentation, or community page</li>
            <li>The calculator renders inside an iframe — no JavaScript conflicts</li>
            <li>Users can calculate MRR directly on your page</li>
            <li>The widget includes a subtle &ldquo;Powered by AI Finance Ops&rdquo; link</li>
          </ol>
        </div>

        {/* Terms */}
        <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
          <h2 className="text-lg font-semibold mb-2">Terms of Use</h2>
          <p className="text-gray-400 text-sm">
            Free for personal and commercial use. The embed must include the
            &ldquo;Powered by AI Finance Ops&rdquo; attribution link. You may not remove the
            branding, resell the widget, or use it in misleading contexts.
          </p>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="text-emerald-400 hover:underline"
          >
            ← Back to AI Finance Ops
          </Link>
        </div>
      </div>
    </div>
  )
}
