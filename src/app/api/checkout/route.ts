import { NextRequest, NextResponse } from 'next/server'

const CHECKOUT_URLS: Record<string, string> = {
  starter:    'https://ai-finance-ops.lemonsqueezy.com/checkout/buy/8d014d41-35a8-4d91-87a8-fbd63080e700',
  pro:        'https://ai-finance-ops.lemonsqueezy.com/checkout/buy/4aa74f04-b732-410d-a862-d96573728dd4',
  enterprise: 'https://ai-finance-ops.lemonsqueezy.com/checkout/buy/6944b5a1-7fc9-4439-987c-d1e8d214877f',
}

export async function GET(req: NextRequest) {
  const plan = req.nextUrl.searchParams.get('plan')
  if (!plan || !CHECKOUT_URLS[plan]) {
    return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })
  }
  return NextResponse.redirect(CHECKOUT_URLS[plan])
}

export async function POST(req: NextRequest) {
  try {
    const { plan, email } = await req.json()
    if (!plan || !CHECKOUT_URLS[plan]) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })
    }
    let url = CHECKOUT_URLS[plan]
    if (email) url += `?checkout%5Bemail%5D=${encodeURIComponent(email)}`
    return NextResponse.json({ url })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
