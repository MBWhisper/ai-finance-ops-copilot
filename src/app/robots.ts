import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/dashboard/', '/login/', '/signup/', '/demo/'],
      },
    ],
    sitemap: 'https://aifinanceops.app/sitemap.xml',
    host: 'https://aifinanceops.app',
  }
}
