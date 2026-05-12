import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const contentType = request.headers.get('content-type') || ''
  let email: string, password: string

  if (contentType.includes('application/json')) {
    const body = await request.json()
    email = body.email
    password = body.password
  } else {
    const formData = await request.formData()
    email = formData.get('email') as string
    password = formData.get('password') as string
  }

  const response = NextResponse.redirect(new URL('/onboarding', request.url), {
    status: 303,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    // Auto-confirm user if email confirmation is blocking login (dev convenience)
    if (error.message === 'Email not confirmed' && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      const admin = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY,
        { auth: { autoRefreshToken: false, persistSession: false } }
      )
      const { data: users } = await admin.auth.admin.listUsers()
      const user = users?.users.find(u => u.email === email)
      if (user) {
        await admin.auth.admin.updateUserById(user.id, { email_confirm: true })
        // Retry sign in after confirming
        const { error: retryError } = await supabase.auth.signInWithPassword({ email, password })
        if (!retryError) {
          return response
        }
      }
    }

    return NextResponse.redirect(
      new URL(`/login?error=${encodeURIComponent(error.message)}`, request.url),
      { status: 303 }
    )
  }

  return response
}
