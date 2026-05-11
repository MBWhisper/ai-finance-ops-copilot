/* eslint-disable no-console */
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

type LemonSqueezyEvent =
  | 'subscription_created'
  | 'subscription_updated'
  | 'subscription_cancelled'
  | 'subscription_resumed'
  | 'subscription_expired'
  | 'subscription_paused'
  | 'order_created';

function verifySignature(payload: string, signature: string, secret: string): boolean {
  const hmac = crypto.createHmac('sha256', secret);
  const digest = hmac.update(payload).digest('hex');
  return crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(signature));
}

export async function POST(req: NextRequest) {
  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;
  if (!secret) {
    console.error('LEMONSQUEEZY_WEBHOOK_SECRET is not set');
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
  }

  const payload = await req.text();
  const signature = req.headers.get('x-signature') ?? '';

  if (!verifySignature(payload, signature, secret)) {
    console.error('Invalid webhook signature');
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  const event = JSON.parse(payload);
  const eventName = event.meta?.event_name as LemonSqueezyEvent;
  const data = event.data?.attributes;

  console.log(`[LemonSqueezy Webhook] Event: ${eventName}`);

  try {
    switch (eventName) {
      case 'subscription_created':
      case 'subscription_updated':
      case 'subscription_resumed': {
        const userEmail = data?.user_email;
        const status = data?.status;
        const variantId = String(data?.variant_id);
        const subscriptionId = String(event.data?.id);
        const renewsAt = data?.renews_at;

        console.log(`[LemonSqueezy] Subscription ${status} for ${userEmail}, variant: ${variantId}, id: ${subscriptionId}, renews: ${renewsAt}`);
        // TODO: Update user subscription in your DB
        // await updateUserSubscription({ userEmail, status, variantId, subscriptionId, renewsAt });
        break;
      }

      case 'subscription_cancelled':
      case 'subscription_expired': {
        const userEmail = data?.user_email;
        console.log(`[LemonSqueezy] Subscription cancelled/expired for ${userEmail}`);
        // TODO: Downgrade user in your DB
        // await cancelUserSubscription({ userEmail });
        break;
      }

      case 'order_created': {
        const userEmail = data?.user_email;
        const total = data?.total;
        console.log(`[LemonSqueezy] New order from ${userEmail}, total: ${total}`);
        break;
      }

      default:
        console.log(`[LemonSqueezy] Unhandled event: ${eventName}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('[LemonSqueezy Webhook Error]', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
