import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { encrypt } from "@/lib/crypto";
import { db } from "@/db";
import { stripeAccounts } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function SetupPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/signup");
  }

  async function connectStripe(formData: FormData) {
    "use server";
    const stripeKey = formData.get("stripeKey") as string;

    if (!stripeKey) {
      throw new Error("Stripe key is required");
    }

    if (!stripeKey.startsWith("sk_test_") && !stripeKey.startsWith("sk_live_")) {
      throw new Error("Invalid Stripe key format. Must start with sk_test_ or sk_live_");
    }

    const encrypted = encrypt(stripeKey);

    const existing = await db.query.stripeAccounts.findFirst({
      where: eq(stripeAccounts.userId, user!.id),
    });

    if (existing) {
      await db.update(stripeAccounts)
        .set({ accessToken: encrypted, lastSyncAt: null })
        .where(eq(stripeAccounts.userId, user!.id));
    } else {
      await db.insert(stripeAccounts).values({
        userId: user!.id,
        accessToken: encrypted,
      });
    }

    redirect("/dashboard/overview?welcome=true");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-2xl space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Connect Your Stripe Account
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Enter your Stripe test secret key to start tracking MRR and forecasts
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Stripe API Key</CardTitle>
            <CardDescription>
              Find this in your{" "}
              <a
                href="https://dashboard.stripe.com/test/apikeys"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Stripe Dashboard → Developers → API keys
              </a>
              <br />
              <span className="text-xs text-gray-500">
                Use test mode keys (sk_test_...) for now. Your key is encrypted with AES-256-GCM before storage.
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action={connectStripe} className="space-y-4">
              <div>
                <label
                  htmlFor="stripeKey"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Stripe Secret Key
                </label>
                <input
                  id="stripeKey"
                  name="stripeKey"
                  type="password"
                  required
                  placeholder="sk_test_..."
                  className="w-full rounded-md border border-gray-300 px-3 py-2 font-mono text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <Button type="submit" className="w-full" size="lg">
                Connect & View Dashboard
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="text-center">
          <Link href="/pricing">
            <Button variant="ghost">Back to Pricing</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
