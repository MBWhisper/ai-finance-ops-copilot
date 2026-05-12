import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
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

  // ✅ Use getUser() — verifies token with Supabase server (not just cookie)
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
  ]

  const isSetupPath = pathname === '/setup'
  const isAuthPage = pathname === '/login' || pathname === '/register' || pathname === '/signup'
  const isPublicPath = publicPaths.some(path =>
    pathname === path || pathname.startsWith(path + '/')
  )

  if (!user && !isPublicPath && !isSetupPath) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  if (user && isAuthPage) {
    const url = request.nextUrl.clone()
    url.pathname = '/setup'
    return NextResponse.redirect(url)
  }

  if (user && pathname === '/') {
    const url = request.nextUrl.clone()
    url.pathname = '/setup'
    return NextResponse.redirect(url)
  }

  if (isSetupPath && !user) {
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
