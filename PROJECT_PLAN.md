# AI Finance Ops Copilot — Staff Engineer Architecture Blueprint

> **Date:** May 2026 | **Author:** Staff SWE / Tech Lead  
> **Status:** APPROVED FOR EXECUTION | **Scope:** v1 (Stripe-only, Web-first)

---

## 1. Architecture Decisions (ADRs)

### ADR-001: Stripe Only for v1
- **Decision:** QuickBooks OAuth deferred to v2
- **Rationale:** QB OAuth requires complex token refresh, sandbox testing, and adds 2+ weeks. Stripe covers 80% of target ICP (SaaS founders).
- **Consequence:** Users on QB-only must manual-entry AR until v2.

### ADR-002: Supabase Auth over Custom
- **Decision:** Google OAuth via `@supabase/ssr` + PKCE flow
- **Rationale:** Battle-tested, handles sessions, RLS integration is native.
- **Consequence:** Vendor lock-in to Supabase auth, acceptable for v1.

### ADR-003: Server Components by Default
- **Decision:** RSC for data fetching, client components only for interactivity
- **Rationale:** Reduces bundle, eliminates waterfalls, aligns with Next 14 patterns.
- **Consequence:** `use client` directive required sparingly — enforced via lint rule.

### ADR-004: Drizzle over Prisma
- **Decision:** Drizzle ORM with Supabase PostgreSQL
- **Rationale:** Type-safe SQL, smaller bundle, Supabase-compatible out of box.
- **Consequence:** Migrations managed via `drizzle-kit push` in dev, SQL scripts in CI.

### ADR-005: pino for Logging
- **Decision:** `pino` with `pino-pretty` in dev, JSON in prod
- **Rationale:** Async, non-blocking, structured output. Zero `console.log` in prod code.
- **Consequence:** Requires Vercel log drain setup for production aggregation.

---

## 2. Database Schema (Drizzle)

```
┌─────────────────────┐     ┌──────────────────────┐     ┌──────────────────────┐
│   users             │     │   stripe_accounts     │     │   subscriptions      │
├─────────────────────┤     ├──────────────────────┤     ├──────────────────────┤
│ id (uuid, PK)       │◄────│ user_id (uuid, FK)   │     │ id (uuid, PK)        │
│ email (text)        │     │ stripe_account_id     │     │ user_id (uuid, FK)   │
│ name (text)         │     │ access_token (enc)    │     │ plan (enum)          │
│ avatar_url (text)   │     │ last_sync_at (tstz)   │     │ stripe_sub_id       │
│ created_at (tstz)   │     │ webhook_secret        │     │ status (enum)        │
│ updated_at (tstz)   │     │ created_at (tstz)     │     │ mrr_cents (int)      │
└─────────────────────┘     └──────────────────────┘     │ created_at (tstz)    │
                                                         └──────────────────────┘
┌──────────────────────┐     ┌──────────────────────┐     ┌──────────────────────┐
│   metrics_daily      │     │   cashflow_forecasts  │     │   invoices (AR)      │
├──────────────────────┤     ├──────────────────────┤     ├──────────────────────┤
│ id (uuid, PK)        │     │ id (uuid, PK)        │     │ id (uuid, PK)        │
│ user_id (uuid, FK)   │     │ user_id (uuid, FK)   │     │ user_id (uuid, FK)   │
│ date (date)          │     │ forecast_date (date) │     │ customer_email (text)│
│ mrr_cents (int)      │     │ amount_cents (int)   │     │ amount_cents (int)   │
│ arr_cents (int)      │     │ type (enum)          │     │ due_date (date)      │
│ churn_rate (decimal) │     │ confidence (decimal) │     │ status (enum)        │
│ ltv_cents (int)      │     │ created_at (tstz)    │     │ stripe_invoice_id   │
│ created_at (tstz)    │     └──────────────────────┘     │ reminders_sent (int) │
└──────────────────────┘                                  │ created_at (tstz)    │
                                                          └──────────────────────┘
```

### Enums
- `plan`: `'starter' | 'pro' | 'scale'`
- `forecast_type`: `'revenue' | 'expense' | 'net'`
- `invoice_status`: `'draft' | 'sent' | 'paid' | 'overdue'`
- `subscription_status`: `'active' | 'trialing' | 'canceled' | 'past_due'`

### Row Level Security (RLS)
Every table has: `POLICY "user_isolation" ON ... USING (user_id = auth.uid())`

---

## 3. Project Structure (Feature-Based)

```
src/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx              # Google OAuth button
│   │   ├── callback/
│   │   │   └── route.ts              # Supabase OAuth callback
│   │   └── layout.tsx                # Auth layout (centered, minimal)
│   │
│   ├── (dashboard)/
│   │   ├── layout.tsx                # Sidebar + top nav + auth guard
│   │   ├── overview/
│   │   │   ├── page.tsx              # KPI dashboard (RSC)
│   │   │   └── loading.tsx           # Skeleton KPI cards
│   │   ├── cashflow/
│   │   │   └── page.tsx              # Forecast chart (30/60/90)
│   │   ├── ar/
│   │   │   ├── page.tsx              # Invoice list + actions
│   │   │   └── [id]/remind/
│   │   │       └── route.ts          # Send reminder (server action)
│   │   ├── settings/
│   │   │   ├── page.tsx              # Tabs: General, Stripe, Billing
│   │   │   └── stripe/
│   │   │       └── route.ts          # Save Stripe keys (encrypted)
│   │   └── api/
│   │       └── stripe/webhook/
│   │           └── route.ts          # Stripe webhook handler
│   │
│   ├── (marketing)/
│   │   ├── layout.tsx                # Public layout
│   │   ├── page.tsx                  # Landing page
│   │   └── pricing/
│   │       └── page.tsx              # 3-tier pricing + checkout
│   │
│   ├── globals.css
│   └── layout.tsx                    # Root layout (fonts, metadata)
│
├── core/
│   ├── stripe/
│   │   ├── client.ts                 # Stripe SDK singleton
│   │   ├── sync.ts                   # Import subscriptions + invoices
│   │   ├── mrr-builder.ts            # Calculate MRR from Stripe events
│   │   └── webhook-handler.ts        # Process webhook events
│   │
│   ├── forecast/
│   │   ├── engine.ts                 # Linear + seasonal projection
│   │   └── types.ts                  # ForecastDay, ConfidenceBand
│   │
│   ├── metrics/
│   │   ├── calculator.ts             # MRR, ARR, Churn, LTV formulas
│   │   └── types.ts                  # MetricResult interface
│   │
│   └── notifications/
│       ├── ar-reminders.ts           # Schedule + send AR emails
│       └── templates.ts              # Email HTML templates
│
├── db/
│   ├── schema/
│   │   ├── users.ts
│   │   ├── stripe-accounts.ts
│   │   ├── subscriptions.ts
│   │   ├── metrics-daily.ts
│   │   ├── cashflow-forecasts.ts
│   │   └── invoices.ts
│   ├── queries/
│   │   ├── users.ts
│   │   ├── metrics.ts
│   │   ├── forecasts.ts
│   │   └── invoices.ts
│   ├── index.ts                      # DB connection export
│   └── migrate.ts                    # Migration runner
│
├── components/
│   ├── ui/                           # shadcn primitives
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── table.tsx
│   │   ├── chart.tsx                 # Recharts wrapper
│   │   └── skeleton.tsx
│   │
│   ├── dashboard/
│   │   ├── sidebar.tsx
│   │   ├── top-nav.tsx
│   │   ├── kpi-card.tsx
│   │   ├── kpi-grid.tsx
│   │   └── revenue-chart.tsx
│   │
│   ├── cashflow/
│   │   ├── forecast-chart.tsx
│   │   ├── period-selector.tsx
│   │   └── confidence-band.tsx
│   │
│   ├── ar/
│   │   ├── invoice-table.tsx
│   │   ├── invoice-status-badge.tsx
│   │   └── remind-button.tsx
│   │
│   └── settings/
│       ├── stripe-key-form.tsx
│       └── plan-badge.tsx
│
├── lib/
│   ├── auth.ts                       # Supabase server/client helpers
│   ├── crypto.ts                     # Encrypt/decrypt Stripe keys
│   ├── logger.ts                     # pino singleton
│   ├── utils.ts                      # cn(), formatCurrency(), formatDate()
│   └── constants.ts                  # Plans, pricing, feature flags
│
├── hooks/
│   ├── use-metrics.ts                # SWR/React Query for KPIs
│   ├── use-forecasts.ts
│   └── use-invoices.ts
│
├── middleware.ts                     # Route protection + locale
│
└── tests/
    ├── core/
    │   ├── stripe/
    │   │   ├── mrr-builder.test.ts
    │   │   └── sync.test.ts
    │   ├── forecast/
    │   │   └── engine.test.ts
    │   └── metrics/
    │       └── calculator.test.ts
    ├── db/
    │   └── queries.test.ts
    └── setup.ts                      # Vitest globals + mock Supabase
```

---

## 4. Data Flow Architecture

### 4.1 Stripe Sync Flow
```
User enters API Key → Server Action validates → Encrypts → Stores in DB
                                      ↓
                          Background sync (Vercel Cron / manual trigger)
                                      ↓
                    Stripe SDK → Subscriptions + Invoices → Transform → DB
                                      ↓
                          metrics_daily upserted (idempotent)
                                      ↓
                          Cache invalidated → Dashboard refreshes
```

### 4.2 Cash Flow Forecast Flow
```
metrics_daily (historical) → forecast/engine.ts
                                      ↓
                    Linear regression + seasonality factor
                                      ↓
                    30/60/90 day projections with confidence bands
                                      ↓
                    Stored in cashflow_forecasts (cache, 6h TTL)
```

### 4.3 AR Reminder Flow
```
invoices (status = 'sent' AND due_date < today) → Check reminders_sent < 3
                                      ↓
                    Send email via Resend (or Supabase Edge Function)
                                      ↓
                    reminders_sent++ → Log activity
```

---

## 5. Security Model

| Layer | Control |
|-------|---------|
| Auth | Supabase OAuth + PKCE, httpOnly cookies |
| Authorization | RLS on every table + middleware route guard |
| Secrets | Vercel Environment Variables + AES-256 encryption for Stripe keys at rest |
| Input | Zod validation on all server actions |
| Output | RSC by default — no sensitive data leaked to client bundle |
| Webhook | Stripe signature verification before processing |

### Encryption for Stripe Keys
```
plaintext → AES-256-GCM (key from Vercel env) → base64 ciphertext → DB
ciphertext from DB → AES-256-GCM decrypt → Stripe SDK
```

---

## 6. Milestone Breakdown

### M1 — Stripe Sync + KPIs (Week 1)
| Task | Deliverable | Verification |
|------|-------------|--------------|
| Supabase setup + DB schema | Migrations run, tables created | `drizzle-kit push` succeeds |
| Google OAuth flow | User can sign in, session persists | `/overview` loads post-login |
| Stripe key storage | Key encrypted and saved | Key retrievable, decrypts correctly |
| Stripe sync service | Subscriptions imported | `metrics_daily` has rows |
| MRR/ARR calculator | Accurate computation | Matches Stripe dashboard ±1% |
| KPI Dashboard | 4 cards: MRR, ARR, Churn, LTV | Visual parity with Figma |
| Tests: core/metrics | calculator.test.ts | **≥15 tests passing** |

**M1 Exit Gate:** MRR displayed on dashboard matches Stripe dashboard within 1% tolerance.

### M2 — Cash Flow Forecast (Week 2)
| Task | Deliverable | Verification |
|------|-------------|--------------|
| Forecast engine | Linear + seasonal model | engine.test.ts passes |
| 30/60/90 day UI | Chart with period selector | Recharts renders correctly |
| Confidence bands | P50/P80/P95 bands | Bands widen over time |
| Caching | 6-hour forecast cache | Second load < 200ms |
| Tests: core/forecast | engine.test.ts | **≥10 tests passing** |

**M2 Exit Gate:** Forecast for known dataset produces expected values ±5%.

### M3 — AR Module + Notifications (Week 3)
| Task | Deliverable | Verification |
|------|-------------|--------------|
| Invoice import from Stripe | Invoices table populated | Count matches Stripe |
| Invoice table UI | Sortable, filterable | Pagination works |
| Status badges | draft/sent/paid/overdue | Colors match design system |
| Reminder system | Email sent, counter incremented | Resend log confirms delivery |
| Tests: notifications | ar-reminders.test.ts | **≥8 tests passing** |

**M3 Exit Gate:** Overdue invoice triggers reminder email within 1 hour of cron run.

### M4 — Pricing + Landing + Checkout (Week 4)
| Task | Deliverable | Verification |
|------|-------------|--------------|
| Landing page | Hero, features, social proof | Lighthouse ≥ 90 |
| Pricing page | 3-tier cards + FAQ | Stripe Checkout links work |
| Stripe Checkout integration | User subscribed, DB updated | Subscription active in DB |
| Billing settings page | Plan badge, upgrade/downgrade | Status reflects reality |
| E2E tests | Login → Connect Stripe → See MRR | **≥5 E2E tests** |

**M4 Exit Gate:** Full user journey: Sign up → Connect Stripe → See dashboard → Subscribe to Pro.

---

## 7. Test Strategy (Target: 85%+ Coverage)

| Category | Tool | Count | Focus |
|----------|------|-------|-------|
| Unit | Vitest | 40 | core/ logic (metrics, forecast, stripe) |
| Integration | Vitest + testcontainers | 15 | db/queries against real PG |
| Component | Vitest + Testing Library | 20 | UI components (isolated) |
| E2E | Playwright | 10 | Full user journeys |
| **Total** | | **85** | |

### Test Naming Convention
```
describe('calculator.calculateMRR', () => {
  it('returns zero when no active subscriptions', () => {})
  it('sums all active subscription prices correctly', () => {})
  it('excludes canceled subscriptions from calculation', () => {})
})
```

---

## 8. Environment Variables

```env
# Supabase
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Stripe
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PUBLISHABLE_KEY=

# Encryption
ENCRYPTION_KEY=                  # 32-byte hex

# Email (Resend)
RESEND_API_KEY=

# Vercel Cron (for forecast refresh + AR reminders)
CRON_SECRET=

# App
NEXT_PUBLIC_APP_URL=
NODE_ENV=development|production
```

---

## 9. Vercel Configuration

```json
{
  "crons": [
    {
      "path": "/api/cron/forecast-refresh",
      "schedule": "0 */6 * * *"
    },
    {
      "path": "/api/cron/ar-reminders",
      "schedule": "0 9 * * *"
    },
    {
      "path": "/api/cron/stripe-sync",
      "schedule": "0 */4 * * *"
    }
  ]
}
```

---

## 10. Deferred Scope (v2/v3)

| Feature | Deferred To | Reason |
|---------|-------------|--------|
| QuickBooks OAuth | v2 | Complex token lifecycle, sandbox testing |
| Multi-currency | v2 | Stripe handles it, but UI/FX logic adds complexity |
| Mobile App (React Native) | v3 | Web-first validation needed |
| AI Copilot (chat interface) | v3 | Requires LLM infra, cost modeling |
| Team/Collaboration | v2 | Org model, role-based access |
| Export to PDF/CSV | v2 | Nice-to-have, not blocking |

---

## 11. Risk Register

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Stripe API rate limits | Medium | High | Batch requests, exponential backoff, cache |
| Supabase cold starts | Low | Medium | Keep RSC warm with cron pings |
| MRR calculation drift | Medium | High | Monthly reconciliation test vs Stripe dashboard |
| Encryption key rotation | Low | Critical | Key versioning in schema, dual-decrypt during transition |
| Forecast accuracy complaints | High | Medium | Show confidence bands prominently, disclaimers |

---

## 12. Day-1 Setup Commands

```powershell
# 1. Initialize Next.js 14 project
npx create-next-app@14 . --typescript --tailwind --app --no-src-dir=false

# 2. Install core dependencies
npm install drizzle-orm @supabase/supabase-js @supabase/ssr stripe pino pino-pretty
npm install -D drizzle-kit vitest @testing-library/react @testing-library/jest-dom

# 3. Install UI primitives
npx shadcn@latest init
npx shadcn@latest add button card table chart skeleton badge dropdown-menu

# 4. Setup Supabase project + get credentials
#    → Create project at app.supabase.com
#    → Enable Google OAuth provider
#    → Run: drizzle-kit push

# 5. Verify test suite
npx vitest run
# Expected: 70 existing tests passing (if migrating) or 0 (greenfield)
```

---

## 13. Code Quality Gates

| Gate | Rule | Enforced By |
|------|------|-------------|
| No `console.log` | ESLint `no-console` rule | CI fails |
| `use client` audit | Max 15 client components | Code review |
| Test coverage | ≥ 80% lines, ≥ 90% core/ | `vitest --coverage` |
| TypeScript strict | `strict: true` in tsconfig | `tsc --noEmit` |
| Bundle size | < 200KB client bundle | `@next/bundle-analyzer` |
| Lighthouse | ≥ 90 on landing page | CI on PR |

---

**Blueprint Status:** COMPLETE — Ready for M1 execution.
**Next Action:** Run Day-1 setup commands, verify Supabase connection, begin Stripe sync implementation.
