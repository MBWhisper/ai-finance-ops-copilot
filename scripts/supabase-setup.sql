-- =============================================================
-- AI Finance Ops Copilot — Full Supabase Setup
-- Run this in Supabase Dashboard → SQL Editor
-- =============================================================

-- 1. Create ENUMs (safe to re-run, IF NOT EXISTS)
DO $$ BEGIN
  CREATE TYPE "public"."forecast_type" AS ENUM('revenue', 'expense', 'net');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE "public"."invoice_status" AS ENUM('draft', 'sent', 'paid', 'overdue');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE "public"."plan" AS ENUM('starter', 'pro', 'scale');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE "public"."subscription_status" AS ENUM('active', 'trialing', 'canceled', 'past_due');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- 2. Create Tables (IF NOT EXISTS so it's safe to re-run)
CREATE TABLE IF NOT EXISTS "users" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "email" text NOT NULL,
  "name" text,
  "avatar_url" text,
  "trial_ends_at" date,
  "plan" text DEFAULT 'starter',
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL,
  CONSTRAINT "users_email_unique" UNIQUE("email")
);

CREATE TABLE IF NOT EXISTS "stripe_accounts" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "user_id" uuid NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "stripe_account_id" text,
  "access_token" text NOT NULL,
  "last_sync_at" timestamp,
  "webhook_secret" text,
  "created_at" timestamp DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "subscriptions" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "user_id" uuid NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "plan" text DEFAULT 'starter' NOT NULL,
  "stripe_sub_id" text,
  "status" text NOT NULL,
  "mrr_cents" integer DEFAULT 0 NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "metrics_daily" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "user_id" uuid NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "date" date NOT NULL,
  "mrr_cents" integer NOT NULL,
  "arr_cents" integer NOT NULL,
  "churn_rate" numeric,
  "ltv_cents" integer,
  "created_at" timestamp DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "cashflow_forecasts" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "user_id" uuid NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "forecast_date" date NOT NULL,
  "amount_cents" integer NOT NULL,
  "type" text NOT NULL,
  "p50_cents" integer,
  "p80_cents" integer,
  "p95_cents" integer,
  "created_at" timestamp DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "invoices" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "user_id" uuid NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "customer_email" text NOT NULL,
  "amount_cents" integer NOT NULL,
  "due_date" date NOT NULL,
  "status" text DEFAULT 'draft' NOT NULL,
  "stripe_invoice_id" text,
  "reminders_sent" integer DEFAULT 0 NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL
);

-- 3. Create unique index for metrics_daily (user_id + date)
CREATE UNIQUE INDEX IF NOT EXISTS "user_date_unique"
  ON "metrics_daily" USING btree ("user_id", "date");

-- 4. Enable RLS on all tables
ALTER TABLE "users" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "stripe_accounts" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "subscriptions" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "metrics_daily" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "cashflow_forecasts" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "invoices" ENABLE ROW LEVEL SECURITY;

-- 5. RLS Policies — each user can only see their own data
-- Drop existing policies first so this is idempotent
DROP POLICY IF EXISTS "users_insert" ON users;
DROP POLICY IF EXISTS "users_select" ON users;
DROP POLICY IF EXISTS "users_update" ON users;
DROP POLICY IF EXISTS "stripe_accounts_all" ON stripe_accounts;
DROP POLICY IF EXISTS "subscriptions_all" ON subscriptions;
DROP POLICY IF EXISTS "metrics_daily_all" ON metrics_daily;
DROP POLICY IF EXISTS "cashflow_forecasts_all" ON cashflow_forecasts;
DROP POLICY IF EXISTS "invoices_all" ON invoices;

-- users: allow insert from trigger, select own row, update own row
CREATE POLICY "users_select" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "users_update" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Allow service_role to insert via the create-user API
CREATE POLICY "users_insert" ON users
  FOR INSERT WITH CHECK (true);

-- All other tables: full access to own rows
CREATE POLICY "stripe_accounts_all" ON stripe_accounts
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "subscriptions_all" ON subscriptions
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "metrics_daily_all" ON metrics_daily
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "cashflow_forecasts_all" ON cashflow_forecasts
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "invoices_all" ON invoices
  FOR ALL USING (auth.uid() = user_id);

-- 6. Trigger: auto-create public.users row when a new auth user signs up
-- This is a FALLBACK — the /setup page + /api/auth/create-user also handle this
CREATE OR REPLACE FUNCTION public.create_user_on_signup()
RETURNS trigger
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO public.users (id, email, name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'name',
    NEW.raw_user_meta_data->>'avatar_url'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

-- Drop the trigger first if it exists, then recreate
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.create_user_on_signup();

-- 7. Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
