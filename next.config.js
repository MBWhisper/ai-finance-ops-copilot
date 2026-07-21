const { withSentryConfig } = require('@sentry/nextjs')

/** @type {import('next').NextConfig} */
const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://js.lemonsqueezy.com https://cdn.plaid.com https://www.googletagmanager.com https://www.google-analytics.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data:",
      "connect-src 'self' https://*.supabase.co https://api.lemonsqueezy.com https://cdn.plaid.com https://www.google-analytics.com https://analytics.google.com wss://*.supabase.co",
      "frame-src 'self' https://js.lemonsqueezy.com https://app.lemonsqueezy.com https://cdn.plaid.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "upgrade-insecure-requests",
    ].join('; '),
  },
]

const nextConfig = {
  // Tell Next.js to keep these packages server-side only — never bundle
  // them into the client-side Webpack output.  postgres and drizzle-orm
  // depend on Node.js built-ins (net, tls, fs, perf_hooks) that do not
  // exist in the browser.
  serverExternalPackages: ['postgres', 'drizzle-orm', 'pg'],
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      '@radix-ui/react-icons',
      'date-fns',
      'recharts',
      'framer-motion',
    ],
  },

  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'api.producthunt.com',
      },
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
      },
    ],
  },

  // File compression
  compress: true,

  // Security & behavior
  poweredByHeader: false,
  reactStrictMode: true,

  // Webpack customisations
  webpack: (config, { isServer }) => {
    // Suppress known benign warnings from Sentry / OpenTelemetry internals
    config.ignoreWarnings = [
      { module: /require-in-the-middle/ },
      { module: /@opentelemetry\/instrumentation/ },
    ]

    // Explicitly stub out Node.js built-ins for the client bundle so any
    // accidental import fails fast with a clear error rather than a
    // cryptic runtime crash.
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        net: false,
        tls: false,
        fs: false,
        perf_hooks: false,
        dns: false,
        child_process: false,
      }
    }

    return config
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
      {
        source: '/static/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ]
  },
}

const sentryOrg = process.env.SENTRY_ORG
const sentryProject = process.env.SENTRY_PROJECT
const sentryAuthToken = process.env.SENTRY_AUTH_TOKEN
const sentryEnabled = !!(sentryOrg && sentryProject && sentryAuthToken)

module.exports = withSentryConfig(nextConfig, {
  org: sentryOrg,
  project: sentryProject,
  authToken: sentryAuthToken,
  // Silence ALL Sentry build output — warnings + info messages
  silent: true,
  // Don't expose source maps to end users
  deleteSourceMapsAfterUpload: true,
  // Only upload source maps when Sentry is fully configured
  sourcemaps: {
    disable: !sentryEnabled,
  },
  widenClientFileUpload: sentryEnabled,
  tunnelRoute: '/monitoring',
  // Disable release creation when org is not configured
  release: sentryEnabled ? undefined : { create: false, finalize: false },
  telemetry: false,
})
