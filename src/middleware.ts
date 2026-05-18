import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Rate limiting for copilot API
  if (request.nextUrl.pathname === '/api/copilot') {
    const ip = request.headers.get('x-forwarded-for') ?? 'anonymous'
    const now = Date.now()
    const windowMs = 60 * 60 * 1000
    const maxRequests = 20

    const rateLimitMap = globalThis.__rateLimitMap || new Map<string, { count: number; resetAt: number }>()
    globalThis.__rateLimitMap = rateLimitMap

    const record = rateLimitMap.get(ip)

    if (!record || now > record.resetAt) {
      rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs })
    } else if (record.count >= maxRequests) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Try again in 1 hour.' },
        { status: 429 }
      )
    } else {
      record.count++
    }
  }

  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
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
    '/login',
    '/register',
    '/signup',
    '/auth/callback',
    '/auth/login',
    '/api/auth',
    '/',
    '/marketing',
    '/pricing',
    '/api/health',
    '/api/stripe/webhook',
    '/api/webhooks/lemonsqueezy',
    '/demo',
    '/about',
    '/blog',
    '/mrr-tracker',
    '/churn-calculator',
    '/baremetrics-alternative',
    '/cash-flow-tracker',
    '/automate-reporting',
    '/runway-calculator',
  ]

  const isSetupPath = pathname === '/setup'
  const isOnboardingPath = pathname === '/onboarding'
  const isAuthPage = pathname === '/login' || pathname === '/register' || pathname === '/signup'
  const isPublicPath = publicPaths.some(path =>
    pathname === path || pathname.startsWith(path + '/')
  )

  if (!user && !isPublicPath && !isSetupPath && !isOnboardingPath) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  if (user && isAuthPage) {
    const url = request.nextUrl.clone()
    url.pathname = '/onboarding'
    return NextResponse.redirect(url)
  }

  if (user && pathname === '/') {
    const url = request.nextUrl.clone()
    url.pathname = '/onboarding'
    return NextResponse.redirect(url)
  }

  if (user && isSetupPath) {
    const url = request.nextUrl.clone()
    url.pathname = '/onboarding'
    return NextResponse.redirect(url)
  }

  if (!user && isOnboardingPath) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
