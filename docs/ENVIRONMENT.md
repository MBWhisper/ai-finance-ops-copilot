# Environment Variables

## Setup

Copy `.env.example` to `.env.local` and fill in the values.

```bash
cp .env.example .env.local
```

## Variables

| Variable | Purpose | Where to Get |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Supabase Dashboard > Settings > API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/public key | Supabase Dashboard > Settings > API |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server-side only) | Supabase Dashboard > Settings > API |
| `DATABASE_URL` | PostgreSQL connection string (Supabase pooler) | Supabase Dashboard > Settings > Database > connection string |
| `ENCRYPTION_KEY` | 32-byte hex key for AES-256-GCM | Run: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` |
| `RESEND_API_KEY` | Resend API key for email | Resend Dashboard > API Keys |
| `CRON_SECRET` | Secret for Vercel Cron endpoints | Generate a random string |
| `NEXT_PUBLIC_APP_URL` | Public URL of the app | `http://localhost:3000` for dev, your Vercel URL for production |
| `LEMONSQUEEZY_API_KEY` | Lemon Squeezy API key | Lemon Squeezy Dashboard > Settings > API |
| `LEMONSQUEEZY_STORE_ID` | Lemon Squeezy store ID | Lemon Squeezy Dashboard > Your Store > Settings |
| `LEMONSQUEEZY_WEBHOOK_SECRET` | Secret for verifying LS webhooks | Lemon Squeezy Dashboard > Webhooks (set when creating the webhook) |
| `LEMONSQUEEZY_STARTER_VARIANT_ID` | Variant ID for Starter plan | Lemon Squeezy Dashboard > Products > Starter > Variants |
| `LEMONSQUEEZY_GROWTH_VARIANT_ID` | Variant ID for Growth plan | Lemon Squeezy Dashboard > Products > Growth > Variants |
| `LEMONSQUEEZY_SCALE_VARIANT_ID` | Variant ID for Scale plan | Lemon Squeezy Dashboard > Products > Scale > Variants |
| `STRIPE_SECRET_KEY` | Stripe secret key (legacy, optional) | Stripe Dashboard > API Keys |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook secret (legacy, optional) | Stripe Dashboard > Webhooks |
| `STRIPE_PUBLISHABLE_KEY` | Stripe publishable key (legacy, optional) | Stripe Dashboard > API Keys |

## Vercel Production

Set all of the above in your Vercel project:

1. Go to Vercel Dashboard > Your Project > Settings > Environment Variables
2. Add each variable with the appropriate value
3. Ensure `NEXT_PUBLIC_APP_URL` is set to your production URL
4. Deploy

**Note:** `LEMONSQUEEZY_WEBHOOK_SECRET` is required for subscription webhooks to work in production.
