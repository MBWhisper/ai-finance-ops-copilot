import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://aifinanceops.app', changeFrequency: 'weekly', priority: 1 },
    { url: 'https://aifinanceops.app/baremetrics-alternative', changeFrequency: 'monthly', priority: 0.9 },
    { url: 'https://aifinanceops.app/mrr-tracker', changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://aifinanceops.app/churn-calculator', changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://aifinanceops.app/runway-calculator', changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://aifinanceops.app/pricing', changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://aifinanceops.app/blog', changeFrequency: 'weekly', priority: 0.7 },
  ]
}
