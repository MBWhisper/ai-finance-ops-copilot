import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const BASE = 'https://aifinanceops.app'

function getBlogSlugs(): { slug: string; date: string }[] {
  const postsDir = path.join(process.cwd(), 'src/app/(marketing)/blog/_posts')
  if (!fs.existsSync(postsDir)) return []
  return fs.readdirSync(postsDir)
    .filter(f => f.endsWith('.mdx'))
    .map(f => {
      const raw = fs.readFileSync(path.join(postsDir, f), 'utf-8')
      const { data } = matter(raw)
      return {
        slug: (data.slug as string) ?? f.replace('.mdx', ''),
        date: (data.date as string) ?? new Date().toISOString().split('T')[0],
      }
    })
}

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getBlogSlugs()

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE}/pricing`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/register`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/login`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    // Landing Pages — SEO acquisition
    { url: `${BASE}/stripe-mrr-dashboard`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/saas-cash-flow-forecast`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/ai-finance-bootstrapped-startups`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/baremetrics-alternative`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
    // Calculators
    { url: `${BASE}/mrr-calculator`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/churn-rate-calculator`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/ltv-calculator`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/arr-calculator`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/runway-calculator`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
  ]

  const blogPages: MetadataRoute.Sitemap = posts.map(p => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: 'monthly',
    priority: 0.75,
  }))

  return [...staticPages, ...blogPages]
}
