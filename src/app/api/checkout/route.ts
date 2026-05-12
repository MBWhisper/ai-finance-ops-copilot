import { NextRequest, NextResponse } from 'next/server';

const CHECKOUT_URLS: Record<string, string> = {
  '1046512': 'https://ai-finance-ops.lemonsqueezy.com/checkout/buy/a6fac794-fedd-46cb-a998-913316b62e89',
  '1046520': 'https://ai-finance-ops.lemonsqueezy.com/checkout/buy/8e49a214-837d-40cf-86a9-121dc483b335',
  '1046525': 'https://ai-finance-ops.lemonsqueezy.com/checkout/buy/ba80d7d9-f9ab-4d09-99b1-841c81c59697',
};

export async function POST(req: NextRequest) {
  try {
    const { variantId, email } = await req.json();

    if (!variantId || !CHECKOUT_URLS[variantId]) {
      return NextResponse.json({ error: 'Invalid variant ID' }, { status: 400 });
    }

    let url = CHECKOUT_URLS[variantId];
    if (email) {
      url += `?checkout%5Bemail%5D=${encodeURIComponent(email)}`;
    }

    return NextResponse.json({ url });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
