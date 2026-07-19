'use client'

import dynamic from 'next/dynamic'

const HeroCanvas = dynamic(
  () => import("@/components/ui/hero-canvas").then(m => ({ default: m.HeroCanvas })),
  { ssr: false }
)

const LiveVisitorBadge = dynamic(
  () => import("@/components/landing-interactive").then(m => ({ default: m.LiveVisitorBadge })),
  { ssr: false }
)

const PhoneMockupPreview = dynamic(() => import("@/components/marketing/PhoneMockupPreview").then(m => ({ default: m.PhoneMockupPreview })), { ssr: false })
const NewsletterSignup = dynamic(() => import("@/components/marketing/NewsletterSignup").then(m => ({ default: m.NewsletterSignup })), { ssr: false })
const MRRCalculator = dynamic(() => import("@/components/marketing/MRRCalculator").then(m => ({ default: m.MRRCalculator })), { ssr: false })
const SocialProofSection = dynamic(() => import("@/components/home/sections").then(m => ({ default: m.SocialProofSection })), { ssr: false })
const ProblemSection = dynamic(() => import("@/components/home/sections").then(m => ({ default: m.ProblemSection })), { ssr: false })
const ComparisonTableSection = dynamic(() => import("@/components/home/sections").then(m => ({ default: m.ComparisonTableSection })), { ssr: false })
const StatsSection = dynamic(() => import("@/components/home/sections").then(m => ({ default: m.StatsSection })), { ssr: false })
const PricingSection = dynamic(() => import("@/components/home/sections").then(m => ({ default: m.PricingSection })), { ssr: false })
const TestimonialsSection = dynamic(() => import("@/components/home/sections").then(m => ({ default: m.TestimonialsSection })), { ssr: false })
const FAQSection = dynamic(() => import("@/components/home/sections").then(m => ({ default: m.FAQSection })), { ssr: false })

export {
  HeroCanvas,
  LiveVisitorBadge,
  PhoneMockupPreview,
  NewsletterSignup,
  MRRCalculator,
  SocialProofSection,
  ProblemSection,
  ComparisonTableSection,
  StatsSection,
  PricingSection,
  TestimonialsSection,
  FAQSection,
}
