import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(20, '1 h'),
  prefix: 'copilot',
})

// ─── Vercel / bot traffic filter ───────────────────────────────────────────
// These user-agents and referrers come from Vercel bots, preview crawlers, and
// deployment health-checks. We skip Vercel Analytics tracking for them by
// setting a response header that the @vercel/analytics SDK reads to opt-out.
const BOT_UA_PATTERNS = [
  'vercel',
  'vercelbot',
  'NextJS',
  'Googlebot',
  'bingbot',
  'YandexBot',
  'DuckDuckBot',
  'Baiduspider',
  'facebookexternalhit',
  'Twitterbot',
  'LinkedInBot',
  'WhatsApp',
  'Slackbot',
  'Discordbot',
  'TelegramBot',
  'axios',
  'node-fetch',
  'python-requests',
  'curl',
  'wget',
  'Lighthouse',
  'Chrome-Lighthouse',
  'HeadlessChrome',
  'Playwright',
  'Puppeteer',
]

const VERCEL_REFERRERS = [
  'vercel.com',
  'vercel.app',
  'now.sh',
]

function isInternalOrBotRequest(request: NextRequest): boolean {
  const ua = request.headers.get('user-agent') ?? ''
  const referrer = request.headers.get('referer') ?? ''

  // Vercel preview deployments hit their own domain
  const host = request.headers.get('host') ?? ''
  if (host.endsWith('.vercel.app') || host.endsWith('.now.sh')) return true

  // Vercel-internal header present on deployment probes
  if (request.headers.get('x-vercel-deployment-url')) return true

  // Bot user-agent
  const uaLower = ua.toLowerCase()
  if (BOT_UA_PATTERNS.some(p => uaLower.includes(p.toLowerCase()))) return true

  // Referrer from vercel.com / vercel.app (preview traffic showing in dashboard)
  const refLower = referrer.toLowerCase()
  if (VERCEL_REFERRERS.some(r => refLower.includes(r))) return true

  return false
}
// ───────────────────────────────────────────────────────────────────────────

export async function middleware(request: NextRequest) {
  // Rate limiting for copilot API (distributed, works across all edge nodes)
  if (request.nextUrl.pathname === '/api/copilot') {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'anonymous'
    const { success } = await ratelimit.limit(ip)

    if (!success) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Try again in 1 hour.' },
        { status: 429 }
      )
    }
  }

  let supabaseResponse = NextResponse.next({ request })

  // ── Mark bot/internal requests so Vercel Analytics skips them ──
  if (isInternalOrBotRequest(request)) {
    supabaseResponse.headers.set('x-vercel-skip-toolbar', '1')
    // The official way to exclude a request from Vercel Web Analytics:
    supabaseResponse.headers.set('x-vercel-analytics-skip', '1')
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll() },
        setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value)
            supabaseResponse.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  const pathname = request.nextUrl.pathname

  const publicPaths = [
    '/login', '/register', '/signup',
    '/auth/callback', '/auth/login', '/api/auth',
    '/', '/marketing', '/pricing',
    '/api/health', '/api/stripe/webhook', '/api/webhooks/lemonsqueezy',
    '/demo', '/about', '/blog',
    // Calculators
    '/mrr-tracker', '/churn-calculator', '/runway-calculator',
    '/mrr-calculator', '/churn-rate-calculator', '/ltv-calculator',
    '/arr-calculator',
    // Landing pages — must be public for Google Googlebot crawling
    '/stripe-mrr-dashboard',
    '/saas-cash-flow-forecast',
    '/ai-finance-bootstrapped-startups',
    '/baremetrics-alternative',
    '/cash-flow-tracker', '/automate-reporting',
    '/vs-baremetrics', '/vs-chartmogul',
    // Calculators sub-routes
    '/calculators',
  ]

  const isSetupPath      = pathname === '/setup'
  const isOnboardingPath = pathname === '/onboarding'
  const isAuthPage       = pathname === '/login' || pathname === '/register' || pathname === '/signup'
  const isDashboardPath  = pathname.startsWith('/dashboard')
  const isPublicPath     = publicPaths.some(p => pathname === p || pathname.startsWith(p + '/'))

  // 1. Not logged in → login (except public paths)
  if (!user && !isPublicPath && !isSetupPath && !isOnboardingPath) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // 2. Not logged in trying onboarding → login
  if (!user && isOnboardingPath) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // 3. Logged in on login/register → dashboard directly
  if (user && isAuthPage) {
    const url = request.nextUrl.clone()
    url.pathname = '/dashboard/overview'
    return NextResponse.redirect(url)
  }

  // 4. Logged in on / → dashboard
  if (user && pathname === '/') {
    const url = request.nextUrl.clone()
    url.pathname = '/dashboard/overview'
    return NextResponse.redirect(url)
  }

  // 5. Logged in on /setup → dashboard
  if (user && isSetupPath) {
    const url = request.nextUrl.clone()
    url.pathname = '/dashboard/overview'
    return NextResponse.redirect(url)
  }

  // 6. Logged in on /onboarding → redirect to dashboard (onboarding is skipped)
  if (user && isOnboardingPath) {
    const url = request.nextUrl.clone()
    url.pathname = '/dashboard/overview'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|ads.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
