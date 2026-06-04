import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/dashboard/',
          '/login/',
          '/signup/',
          '/sign-in/',
          '/sign-up/',
          '/register/',
          '/setup/',
          '/auth/',
          '/demo/',
          '/_next/',
        ],
      },
      // Block AI training crawlers
      { userAgent: 'GPTBot',       disallow: '/' },
      { userAgent: 'ChatGPT-User', disallow: '/' },
      { userAgent: 'CCBot',        disallow: '/' },
      { userAgent: 'anthropic-ai', disallow: '/' },
      { userAgent: 'Claude-Web',   disallow: '/' },
    ],
    sitemap: 'https://aifinanceops.app/sitemap.xml',
    host: 'https://aifinanceops.app',
  }
}
