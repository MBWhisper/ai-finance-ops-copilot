import { faqData } from '@/lib/faq-data'

export function FaqSchema({ slug, items, json }: { slug?: string; items?: { question: string; answer: string }[]; json?: string }) {
  let parsedItems: { question: string; answer: string }[] = []
  if (slug && faqData[slug]) {
    parsedItems = faqData[slug]
  } else if (json) {
    parsedItems = JSON.parse(json)
  } else if (items) {
    parsedItems = items
  }
  if (!parsedItems || parsedItems.length === 0) return null
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: parsedItems.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        }),
      }}
    />
  )
}
