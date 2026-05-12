# Go-to-Market Guide

## Pricing Model

Three B2B SaaS pricing tiers:

| Plan | Price | Users | Workspaces | Integrations | Key Feature |
|---|---|---|---|---|---|
| **Starter** | $29/mo | Up to 2 | 1 | 1 | Basic dashboard + 30d forecast |
| **Growth** | $79/mo | Up to 5 | 3 | 3 | AI insights + 90d forecast |
| **Scale** | $199/mo | Unlimited | Unlimited | Unlimited | AI copilot + SLA + dedicated manager |

All plans include a **14-day free trial**. No credit card required.

Plans are defined in `src/lib/plans.ts` — the single source of truth for pricing, features, and limits.

## Onboarding Flow

1. **Sign up** — User creates account via `/register`
2. **Setup wizard** (`/setup`) — Multi-step wizard:
   - Step 1: Welcome screen with trial info
   - Step 2: Plan selection (Starter/Growth/Scale)
   - Step 3: Redirect to Lemon Squeezy checkout OR skip to dashboard
3. **Dashboard** — Redirects to `/dashboard/overview?welcome=true` with trial banner
4. **Settings** — User can connect Stripe in Settings page

## Lemon Squeezy Integration

### Webhook Events Handled

The webhook endpoint at `POST /api/webhooks/lemonsqueezy` handles:

| Event | Action |
|---|---|
| `subscription_created` | Creates/replaces subscription record in `subscriptions` table, updates `users.plan` |
| `subscription_updated` | Updates subscription record (plan change, renewal, etc.) |
| `subscription_cancelled` | Sets subscription status to `canceled`, reverts user plan to `starter` |
| `subscription_resumed` | Reactivates subscription |
| `subscription_expired` | Sets status to `expired` |
| `subscription_paused` | Sets status to `paused` |
| `order_created` | Logged but no DB action (could be used for invoice tracking) |

### Tables

- **`subscriptions`** — Stores the latest subscription state per user. Key fields:
  - `lemonsqueezy_subscription_id`, `lemonsqueezy_customer_id`
  - `lemonsqueezy_customer_portal_url` — for "Manage in Lemon Squeezy" link
  - `plan`, `status`, `trial_ends_at`, `renews_at`, `ends_at`, `is_cancelled`
- **`users`** — `plan` column tracks current plan, `trial_ends_at` tracks trial expiry

### Required Setup in Lemon Squeezy

1. Create 3 products with monthly variants in Lemon Squeezy:
   - Starter ($29/mo)
   - Growth ($79/mo)
   - Scale ($199/mo)
2. Check the variant IDs (they are hardcoded in `src/lib/plans.ts` and `src/lib/lemonsqueezy.ts`)
3. Create a webhook in Lemon Squeezy pointing to `https://your-domain.com/api/webhooks/lemonsqueezy`
4. Set the webhook secret as `LEMONSQUEEZY_WEBHOOK_SECRET` env var
5. Subscribe to all subscription events

### Subscription Checking

- `src/lib/plans.ts` exports `checkLimit()` for enforcing plan limits
- Plan feature gating is done by checking `users.plan` and comparing against `PLANS`
- The billing page at `/dashboard/settings/billing` shows current plan, status, and upgrade options

## Analytics

Basic event tracking via `events` table in Supabase:

| Event | Trigger |
|---|---|
| `page_view` | Landing page visit (not yet implemented client-side) |
| `cta_click_start_trial` | "Start Free Trial" button click |
| `cta_click_live_demo` | "Try Live Demo" button click |
| `cta_click_upgrade` | "Upgrade" button click |
| `trial_started` | User signs up with trial period |
| `subscription_activated` | User starts paid subscription |
| `subscription_canceled` | User cancels subscription |

Events are stored in `events` table with `name`, `user_id`, `anonymous_id`, `metadata`, `page`, and `created_at`.

## Demo Mode

- URL: `/demo` (redirects to `/demo/overview`)
- Shows all dashboard pages with hardcoded demo data
- Read-only — no destructive actions possible
- Fully public, no auth required
- Sidebar has a "Sign Up Free" CTA

## Remaining Manual Steps

1. **Lemon Squeezy Setup**
   - Create 3 products + variants in Lemon Squeezy Dashboard
   - Update variant IDs in `src/lib/plans.ts` and `src/lib/lemonsqueezy.ts`
   - Create webhook endpoint pointing to `/api/webhooks/lemonsqueezy`
   - Set all env vars on Vercel

2. **Database Migration**
   - Run `npm run db:generate` and `npm run db:push` to apply new schema changes
   - The `subscriptions` table needs new columns and `events` table needs to be created

3. **Supabase RLS**
   - Add RLS policies for `events` table (insert only for anon, select for authenticated)
   - May need to run `supabase-rls.sql` updates

4. **Vercel Deploy**
   - Push to git, deploy on Vercel
   - Set env vars in Vercel dashboard
   - Set up webhook URL in Lemon Squeezy pointing to production

5. **Testing**
   - Test Stripe connection flow still works (if using Stripe)
   - Test Lemon Squeezy subscription flow end-to-end
   - Test webhook delivery
   - Test demo mode on production
