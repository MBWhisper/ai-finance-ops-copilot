-- Enable RLS on all tables
ALTER TABLE "users" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "subscriptions" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "stripe_accounts" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "metrics_daily" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "invoices" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "cashflow_forecasts" ENABLE ROW LEVEL SECURITY;

-- Users: each user can only see/update their own record
CREATE POLICY "users_select_own" ON "users" FOR SELECT USING (id = auth.uid());
CREATE POLICY "users_update_own" ON "users" FOR UPDATE USING (id = auth.uid()) WITH CHECK (id = auth.uid());

-- Subscriptions: user sees only their own subscriptions
CREATE POLICY "subscriptions_select_own" ON "subscriptions" FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "subscriptions_insert_own" ON "subscriptions" FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "subscriptions_update_own" ON "subscriptions" FOR UPDATE USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
CREATE POLICY "subscriptions_delete_own" ON "subscriptions" FOR DELETE USING (user_id = auth.uid());

-- Stripe accounts: user sees only their own
CREATE POLICY "stripe_accounts_select_own" ON "stripe_accounts" FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "stripe_accounts_insert_own" ON "stripe_accounts" FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "stripe_accounts_update_own" ON "stripe_accounts" FOR UPDATE USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
CREATE POLICY "stripe_accounts_delete_own" ON "stripe_accounts" FOR DELETE USING (user_id = auth.uid());

-- Metrics daily: user sees only their own
CREATE POLICY "metrics_daily_select_own" ON "metrics_daily" FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "metrics_daily_insert_own" ON "metrics_daily" FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "metrics_daily_update_own" ON "metrics_daily" FOR UPDATE USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
CREATE POLICY "metrics_daily_delete_own" ON "metrics_daily" FOR DELETE USING (user_id = auth.uid());

-- Invoices: user sees only their own
CREATE POLICY "invoices_select_own" ON "invoices" FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "invoices_insert_own" ON "invoices" FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "invoices_update_own" ON "invoices" FOR UPDATE USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
CREATE POLICY "invoices_delete_own" ON "invoices" FOR DELETE USING (user_id = auth.uid());

-- Cashflow forecasts: user sees only their own
CREATE POLICY "cashflow_forecasts_select_own" ON "cashflow_forecasts" FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "cashflow_forecasts_insert_own" ON "cashflow_forecasts" FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "cashflow_forecasts_update_own" ON "cashflow_forecasts" FOR UPDATE USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
CREATE POLICY "cashflow_forecasts_delete_own" ON "cashflow_forecasts" FOR DELETE USING (user_id = auth.uid());
