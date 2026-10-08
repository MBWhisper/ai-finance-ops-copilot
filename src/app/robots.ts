import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/dashboard',
          '/dashboard/',
          '/api/',
          '/_next/',
          '/admin',
          '/demo',
          '/demo/',
          '/onboarding',
          '/signup',
          '/sign-in',
          '/sign-up',
          '/setup',
          '/login',
          '/register',
          '/calculators',
        ],
      },
      {
        // Block AI training crawlers
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'Google-Extended',
          'CCBot',
          'anthropic-ai',
          'ClaudeBot',
          'Omgilibot',
          'FacebookBot',
        ],
        disallow: '/',
      },
    ],
    sitemap: 'https://aifinanceops.app/sitemap.xml',
  }
}

export const sitemap: MetadataRoute.Sitemap = [
  { url: 'https://aifinanceops.app/feed.xml', title: 'AI Finance Ops RSS Feed', lastModified: new Date() },
]
