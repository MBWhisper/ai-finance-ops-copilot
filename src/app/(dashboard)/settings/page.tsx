import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/db";
import { logger } from "@/lib/logger";

export default async function SettingsPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let stripeConnected = false;

  if (user) {
    try {
      const account = await db.query.stripeAccounts.findFirst({
        where: (accounts, { eq }) => eq(accounts.userId, user!.id),
      });
      stripeConnected = !!account?.lastSyncAt;
    } catch (err) {
      logger.error({ err }, "Failed to check Stripe connection");
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your Stripe connection and billing plan.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Stripe Connection</CardTitle>
          <CardDescription>
            Enter your Stripe secret key to sync MRR, ARR, and invoices. Your key is encrypted with AES-256-GCM before storage.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {stripeConnected && (
            <div className="mb-4 rounded-md bg-green-50 p-3 text-sm text-green-700">
              Stripe connected and synced. Last sync: recently.
            </div>
          )}
          <form action="/api/stripe-key" method="POST" className="space-y-4">
            <div>
              <label htmlFor="stripeKey" className="mb-1 block text-sm font-medium">
                Stripe Secret Key
              </label>
              <input
                id="stripeKey"
                name="stripeKey"
                type="password"
                placeholder="sk_live_..."
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2 font-mono text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <p className="mt-1 text-xs text-gray-500">
                Find this in your Stripe Dashboard → Developers → API keys
              </p>
            </div>
            <Button type="submit">Save & Sync</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Free Trial</p>
              <p className="text-sm text-muted-foreground">
                Upgrade to unlock all features
              </p>
            </div>
            <a href="/pricing">
              <Button variant="outline">View Pricing</Button>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
