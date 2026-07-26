import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Embeddable MRR Calculator Widget — Free for Blogs",
  description:
    "Add a free MRR calculator to your blog or website. Copy-paste the embed code. Includes a backlink to AI Finance Ops.",
  robots: { index: true, follow: true },
}

export default function EmbedWidgetsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
