export const POST_COVERS: Record<string, string> = {
  "arr-vs-mrr-difference":          "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&q=80",
  "baremetrics-alternative-2026":   "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
  "chartmogul-alternative-2026":    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
  "how-many-months-of-runway-do-i-have": "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1200&q=80",
  "how-to-calculate-saas-mrr":      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&q=80",
  "how-to-reduce-saas-churn":       "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=1200&q=80",
  "how-to-track-mrr-without-stripe":"https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80",
  "ltv-cac-ratio-saas":             "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1200&q=80",
  "mrr-dashboard-guide":            "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&q=80",
  "net-revenue-retention-saas":     "https://images.unsplash.com/photo-1543286386-2e659306cd6c?w=1200&q=80",
  "paypal-mrr-tracking":            "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&q=80",
  "saas-annual-recurring-revenue":  "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&q=80",
  "saas-burn-rate-guide":           "https://images.unsplash.com/photo-1620714223084-8fcacc2dfd6d?w=1200&q=80",
  "saas-cash-flow-management":      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80",
  "saas-churn-rate-guide":          "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200&q=80",
  "saas-financial-metrics":         "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&q=80",
  "saas-investors-metrics":         "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=1200&q=80",
  "saas-pricing-models":            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
  "startup-runway-calculator":      "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1200&q=80",
  "stripe-analytics":               "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80",
  "stripe-mrr-benchmarks":          "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&q=80",
  "stripe-mrr-tracking":            "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80",
  "ai-finance-tools":               "https://images.unsplash.com/photo-1543286386-2e659306cd6c?w=1200&q=80",
  "saas-cash-flow-forecast":        "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1200&q=80",
  "chartmogul-alternatives":        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
  "ltv-cac":                        "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1200&q=80",
  "mrr-growth-rate":                "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&q=80",
}

export const DEFAULT_COVER =
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80"

export function getCoverImage(slug: string, frontmatterCover?: string): string {
  // Use frontmatter value only if it's a real URL (starts with http)
  if (frontmatterCover?.startsWith('http')) return frontmatterCover
  return POST_COVERS[slug] ?? DEFAULT_COVER
}
