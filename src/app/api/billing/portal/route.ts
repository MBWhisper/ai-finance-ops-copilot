import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  // Redirect user to LemonSqueezy customer portal
  // In production, use the customer_portal_url from subscription data
  const storeUrl = `https://app.lemonsqueezy.com/my-orders`;
  return NextResponse.redirect(storeUrl);
}
