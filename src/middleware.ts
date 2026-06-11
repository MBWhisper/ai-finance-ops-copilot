import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(20, '1 h'),
  prefix: 'copilot',
})

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
