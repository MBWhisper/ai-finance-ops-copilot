import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const BASE_URL = 'https://aifinanceops.app'

function getBlogPosts(): { slug: string; date: string; wordCount: number }[] {
  const postsDir = path.join(process.cwd(), 'src/app/(marketing)/blog/_posts')
  if (!fs.existsSync(postsDir)) return []
  return fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith('.mdx'))
    .map((filename) => {
      const raw = fs.readFileSync(path.join(postsDir, filename), 'utf-8')
      const { data, content } = matter(raw)
      return {
        slug: (data.slug as string) ?? filename.replace(/\.mdx$/, ''),
        date: (data.date as string) ?? new Date().toISOString(),
        wordCount: content.trim().split(/\s+/).length,
      }
    })
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date('2026-06-04'),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/pricing`,
      lastModified: new Date('2026-06-04'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/baremetrics-alternative`,
      lastModified: new Date('2026-06-04'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/vs-baremetrics`,
      lastModified: new Date('2026-06-04'),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/vs-chartmogul`,
      lastModified: new Date('2026-06-04'),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/runway-calculator`,
      lastModified: new Date('2026-06-01'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date('2026-06-04'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date('2026-06-01'),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ]

  const blogPosts: MetadataRoute.Sitemap = getBlogPosts().map(
    ({ slug, date, wordCount }) => ({
      url: `${BASE_URL}/blog/${slug}`,
      lastModified: new Date(date),
      // articles older than 30 days are unlikely to change
      changeFrequency:
        Date.now() - new Date(date).getTime() < 30 * 24 * 60 * 60 * 1000
          ? 'weekly'
          : 'yearly',
      // longer articles get higher priority (more content = more SEO value)
      priority: wordCount > 1500 ? 0.8 : wordCount > 800 ? 0.7 : 0.6,
    })
  )

  return [...staticPages, ...blogPosts]
}
