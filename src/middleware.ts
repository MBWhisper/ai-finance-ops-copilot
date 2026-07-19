import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(20, '1 h'),
  prefix: 'copilot',
})

const AUTH_PAGES = ['/login', '/register', '/signup']
const PROTECTED_PREFIXES = ['/dashboard']
const PROTECTED_EXACT = ['/setup', '/onboarding']

function isProtectedPath(pathname: string) {
  return (
    PROTECTED_EXACT.includes(pathname) ||
    PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix))
  )
}

function isAuthPage(pathname: string) {
  return AUTH_PAGES.includes(pathname)
}

function getClientIp(request: NextRequest) {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'anonymous'
  )
}

function createRedirect(request: NextRequest, pathname: string) {
  const url = request.nextUrl.clone()
  url.pathname = pathname
  return NextResponse.redirect(url)
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // 1) Rate limiting فقط لمسار Copilot
  if (pathname === '/api/copilot') {
    const ip = getClientIp(request)
    const { success } = await ratelimit.limit(ip)

    if (!success) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Try again in 1 hour.' },
        { status: 429 }
      )
    }

    return NextResponse.next()
  }

  // 2) المسارات العامة لا تشغّل Supabase middleware
  const needsAuthCheck =
    pathname === '/' ||
    isProtectedPath(pathname) ||
    isAuthPage(pathname)

  if (!needsAuthCheck) {
    return NextResponse.next()
  }

  let response = NextResponse.next({ request })

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
            response.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // 3) غير مسجل + يحاول دخول صفحة محمية
  if (!user && isProtectedPath(pathname)) {
    return createRedirect(request, '/login')
  }

  // 4) مسجل + يحاول دخول صفحات auth
  if (user && isAuthPage(pathname)) {
    return createRedirect(request, '/dashboard/overview')
  }

  // 5) مسجل + دخل الصفحة الرئيسية
  if (user && pathname === '/') {
    return createRedirect(request, '/dashboard/overview')
  }

  return response
}

export const config = {
  matcher: [
    '/',
    '/login',
    '/register',
    '/signup',
    '/setup',
    '/onboarding',
    '/dashboard/:path*',
    '/api/copilot',
  ],
}
