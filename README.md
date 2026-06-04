# AI Finance Ops

> AI-powered financial copilot for SaaS founders — MRR, ARR, churn, cash flow forecasting in one dashboard.

[![Live](https://img.shields.io/badge/Live-aifinanceops.app-emerald)](https://aifinanceops.app)
[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green)](https://supabase.com)

## What is it?

AI Finance Ops connects to your Stripe account and gives you a real-time financial dashboard — MRR, ARR, churn rate, LTV, cash flow forecasting — without spreadsheets or expensive enterprise tools.

**Built for:** Solo founders and early-stage SaaS teams who need financial clarity fast.

**Not built for:** Enterprise companies with dedicated finance teams.

## Features

- 📊 **Real-time MRR & ARR** — synced directly from Stripe
- 📉 **Churn tracking** — customer churn, revenue churn, net revenue retention
- 🔮 **90-day cash flow forecast** — AI-powered P50/P80/P95 projections
- 💡 **AI revenue insights** — anomaly detection and trend analysis
- ⚡ **5-minute setup** — connect Stripe and your dashboard is live
- 🆓 **Free plan** — full MRR tracking, no credit card required

## Free Tools (SEO pages)

| Tool | URL |
|---|---|
| MRR Tracker | `/mrr-tracker` |
| ARR Calculator | `/arr-calculator` |
| Churn Rate Calculator | `/churn-rate-calculator` |
| LTV Calculator | `/ltv-calculator` |
| Runway Calculator | `/runway-calculator` |
| Cash Flow Tracker | `/cash-flow-tracker` |

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Database | Supabase (PostgreSQL) |
| ORM | Drizzle ORM |
| Styling | Tailwind CSS v4 |
| Auth | Supabase Auth |
| Payments | LemonSqueezy |
| Billing Data | Stripe API |
| Deployment | Vercel |
| Email | Resend |

## Getting Started

```bash
# Clone the repo
git clone https://github.com/MBWhisper/ai-finance-ops-copilot.git
cd ai-finance-ops-copilot

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Fill in your Supabase, Stripe, and LemonSqueezy keys

# Run database migrations
npm run db:migrate

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Stripe
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# LemonSqueezy
LEMONSQUEEZY_API_KEY=
LEMONSQUEEZY_WEBHOOK_SECRET=

# App
NEXT_PUBLIC_APP_URL=https://aifinanceops.app
```

## Project Structure

```
src/
├── app/
│   ├── (marketing)/     # Public pages (homepage, blog, calculators, vs-pages)
│   ├── (dashboard)/     # Protected app pages
│   └── api/             # API routes (webhooks, data)
├── components/
│   ├── home/            # Homepage sections
│   ├── marketing/       # Shared marketing components
│   ├── ui/              # Base UI components
│   └── pricing/         # Pricing components
├── lib/                 # Utilities, Stripe client, Supabase client
└── db/                  # Drizzle schema and migrations
```

## Pricing

| Plan | Price | Best for |
|---|---|---|
| Free | $0/mo | Getting started |
| Starter | $29/mo | Solo founders |
| Growth | $79/mo | Growing teams |
| Scale | $199/mo | Established SaaS |

## Founder

Built by **Mo** — a full-stack developer and SaaS founder from Morocco 🇲🇦.

- 🌐 [aifinanceops.app](https://aifinanceops.app)
- 💼 [LinkedIn](https://www.linkedin.com/in/mo-systemarchitect)
- 🐦 [Twitter / X](https://twitter.com/MbtechE80106)
- ▶️ [YouTube](https://www.youtube.com/@AIKnowlidgi)

---

© 2026 AI Finance Ops. All rights reserved.
