import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { db } from '@/db';
import { users } from '@/db/schema';
import { upsertSubscription } from '@/db/queries/subscriptions';
import { getPlanByVariantId } from '@/lib/plans';
import { sendSubscriptionEventEmail } from '@/lib/email';
import { eq } from 'drizzle-orm';

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

async function findUserIdByEmail(email: string): Promise<string | null> {
  const result = await db.select({ id: users.id }).from(users).where(eq(users.email, email)).limit(1);
  return result[0]?.id ?? null;
}

export async function POST(req: NextRequest) {
  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
  }

  const payload = await req.text();
  const signature = req.headers.get('x-signature') ?? '';

  if (!verifySignature(payload, signature, secret)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  const event = JSON.parse(payload);
  const eventName = event.meta?.event_name as LemonSqueezyEvent;
  const data = event.data?.attributes;
  const id = String(event.data?.id);

  try {
    switch (eventName) {
      case 'subscription_created':
      case 'subscription_updated':
      case 'subscription_resumed': {
        const userEmail = data?.user_email as string | undefined;
        const status = data?.status as string;
        const variantId = String(data?.variant_id ?? '');
        const productId = String(data?.product_id ?? '');
        const customerId = String(event.data?.relationships?.['customer']?.data?.id ?? '');
        const orderId = String(event.data?.relationships?.['order']?.data?.id ?? '');
        const trialEndsAt = data?.trial_ends_at ? new Date(data.trial_ends_at) : null;
        const renewsAt = data?.renews_at ? new Date(data.renews_at) : null;
        const endsAt = data?.ends_at ? new Date(data.ends_at) : null;
        const customerPortalUrl = data?.customer_portal_url as string | undefined;

        if (!userEmail) break;

        const userId = await findUserIdByEmail(userEmail);
        if (!userId) break;

        const plan = getPlanByVariantId(variantId);
        const planSlug = plan?.slug ?? 'starter';

        const subscriptionStatusMap: Record<string, string> = {
          on_trial: 'trialing',
          active: 'active',
          paused: 'paused',
          cancelled: 'canceled',
          expired: 'expired',
        };

        await upsertSubscription(userId, {
          plan: planSlug,
          status: subscriptionStatusMap[status] ?? status,
          lemonSqueezySubscriptionId: id,
          lemonSqueezyCustomerId: customerId,
          lemonSqueezyOrderId: orderId,
          lemonSqueezyProductId: productId,
          lemonSqueezyVariantId: variantId,
          lemonSqueezyCustomerPortalUrl: customerPortalUrl,
          trialEndsAt,
          renewsAt,
          endsAt,
          isCancelled: status === 'cancelled' || status === 'expired',
        });

        await db.update(users).set({ plan: planSlug }).where(eq(users.email, userEmail));

        sendSubscriptionEventEmail({ email: userEmail }, status === 'active' ? 'subscription_active' : 'trial_ending');
        break;
      }

      case 'subscription_cancelled':
      case 'subscription_expired': {
        const userEmail = data?.user_email as string | undefined;
        if (!userEmail) break;

        const userId = await findUserIdByEmail(userEmail);
        if (!userId) break;

        await upsertSubscription(userId, {
          plan: 'free',
          status: eventName === 'subscription_cancelled' ? 'canceled' : 'expired',
          isCancelled: true,
          endsAt: new Date(),
        });

        await db.update(users).set({ plan: 'free' }).where(eq(users.email, userEmail));

        sendSubscriptionEventEmail({ email: userEmail }, 'subscription_canceled');
        break;
      }

      case 'subscription_paused': {
        const userEmail = data?.user_email as string | undefined;
        if (!userEmail) break;

        const userId = await findUserIdByEmail(userEmail);
        if (!userId) break;

        await upsertSubscription(userId, {
          plan: 'free',
          status: 'paused',
          isCancelled: false,
        });

        await db.update(users).set({ plan: 'free' }).where(eq(users.email, userEmail));

        sendSubscriptionEventEmail({ email: userEmail }, 'payment_failed');
        break;
      }

      case 'order_created': {
        break;
      }

      default:
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
