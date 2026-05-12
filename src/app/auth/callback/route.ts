import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { resend } from '@/lib/resend'
import { buildWelcomeEmail } from '@/emails/welcome'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/onboarding'

  if (code) {
    const response = NextResponse.redirect(`${origin}${next}`)
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() { return request.cookies.getAll() },
          setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            )
          },
        },
      }
    )
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      // Send welcome email — never block auth flow on email failure
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (user?.email) {
          await resend.emails.send({
            from: 'Mo from AI Finance Ops <mo@aifinanceops.app>',
            to: user.email,
            subject: 'Welcome to AI Finance Ops 🚀',
            html: buildWelcomeEmail({ firstName: user.user_metadata?.full_name }),
          })
        }
      } catch {
        // Email failure must never break auth
      }
      return response
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth_callback_failed`)
}
