import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const { searchParams, origin } = url
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard/overview'
  const error = searchParams.get('error')
  const errorCode = searchParams.get('error_code')
  const errorDesc = searchParams.get('error_description')

  // Log errors from OAuth provider (Google etc.)
  if (error) {
    console.error('[AUTH_CALLBACK] OAuth error:', { error, errorCode, errorDesc, url: request.url })
    const params = new URLSearchParams({ error, ...(errorDesc ? { error_description: errorDesc } : {}) })
    return NextResponse.redirect(`${origin}/login?${params.toString()}`)
  }

  // Supabase sometimes returns error in hash fragment (#error=...) — hash never reaches server,
  // so login page must parse it client-side. Here we only handle ?code flow.

  if (code) {
    // Validate next is internal
    const safeNext = next.startsWith('/') && !next.startsWith('//') ? next : '/dashboard/overview'
    const response = NextResponse.redirect(`${origin}${safeNext}`)
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() { return request.cookies.getAll() },
          setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
            cookiesToSet.forEach(({ name, value, options }) =>
              // preserve original cookie options (httpOnly, sameSite, secure) — do not override sameSite
              response.cookies.set(name, value, options)
            )
          },
        },
      }
    )
    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)
    if (!exchangeError) {
      return response
    }
    console.error('[AUTH_CALLBACK] Exchange error:', exchangeError.message, exchangeError)
    // Common cause: code already used / expired / PKCE verifier missing -> redirect with details
    // Do not expose raw code; expose safe error code
    const params = new URLSearchParams({
      error: 'exchange_failed',
      error_description: exchangeError.message.slice(0, 200),
    })
    // If exchange fails due to PKCE, Supabase may need code_verifier cookie that was not sent
    // because browser blocked third-party cookies. Ensure we forward request cookies correctly.
    return NextResponse.redirect(`${origin}/login?${params.toString()}`)
  }

  // No code and no error => direct access or hash-based error (handled client side)
  console.warn('[AUTH_CALLBACK] No code, redirecting to login', { url: request.url })
  return NextResponse.redirect(`${origin}/login?error=missing_code`)
}
