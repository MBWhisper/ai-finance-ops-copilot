import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(20, '1 h'),
  prefix: 'copilot',
})

const BOT_UA_PATTERNS = [
  'vercel',
  'vercelbot',
  'NextJS',
  // NOTE: Search engine bots intentionally excluded — they must reach public pages
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

  const host = request.headers.get('host') ?? ''
  if (host.endsWith('.vercel.app') || host.endsWith('.now.sh')) return true
  if (request.headers.get('x-vercel-deployment-url')) return true

  const uaLower = ua.toLowerCase()
  if (BOT_UA_PATTERNS.some(p => uaLower.includes(p.toLowerCase()))) return true

  const refLower = referrer.toLowerCase()
  if (VERCEL_REFERRERS.some(r => refLower.includes(r))) return true

  return false
}

export async function middleware(request: NextRequest) {
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

  if (isInternalOrBotRequest(request)) {
    supabaseResponse.headers.set('x-vercel-skip-toolbar', '1')
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
    // Auth
    '/login', '/register', '/signup',
    '/auth/callback', '/auth/login', '/api/auth',
    // Marketing
    '/', '/marketing', '/pricing',
    '/features',
    '/about', '/blog', '/demo',
    // API
    '/api/health', '/api/stripe/webhook', '/api/webhooks/lemonsqueezy',
    // Free tools / calculators
    '/mrr-tracker',
    '/mrr-calculator',
    '/churn-calculator',
    '/churn-rate-calculator',
    '/ltv-calculator',
    '/arr-calculator',
    '/runway-calculator',
    '/cash-flow-tracker',
    '/calculators',
    // Landing pages
    '/stripe-mrr-dashboard',
    '/saas-cash-flow-forecast',
    '/ai-finance-bootstrapped-startups',
    '/baremetrics-alternative',
    '/automate-reporting',
    // Compare pages
    '/vs-baremetrics',
    '/vs-chartmogul',
    '/vs-profitwell',
    '/vs-stripe-sigma',
    '/vs-recurly',
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

  // 3. Logged in on login/register → dashboard
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

  // 6. Logged in on /onboarding → dashboard
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
