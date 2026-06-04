import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const BASE_URL = 'https://aifinanceops.app'

function getBlogPosts(): { slug: string; date: string }[] {
  const postsDir = path.join(process.cwd(), 'src/app/(marketing)/blog/_posts')
  if (!fs.existsSync(postsDir)) return []
  return fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith('.mdx'))
    .map((filename) => {
      const raw = fs.readFileSync(path.join(postsDir, filename), 'utf-8')
      const { data } = matter(raw)
      return {
        slug: (data.slug as string) ?? filename.replace(/\.mdx$/, ''),
        date: (data.date as string) ?? new Date().toISOString(),
      }
    })
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL,                                    lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE_URL}/baremetrics-alternative`,       lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/mrr-tracker`,                   lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/churn-calculator`,              lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/runway-calculator`,             lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/pricing`,                       lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/blog`,                          lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.7 },
  ]

  const blogPosts: MetadataRoute.Sitemap = getBlogPosts().map(({ slug, date }) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: new Date(date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticPages, ...blogPosts]
}
