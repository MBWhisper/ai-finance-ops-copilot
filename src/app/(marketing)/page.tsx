import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="flex items-center justify-between px-8 py-4 border-b">
        <span className="text-xl font-bold">AI Finance Ops Copilot</span>
        <nav className="space-x-4">
          <Link href="/pricing">
            <Button variant="ghost">Pricing</Button>
          </Link>
          <Link href="/signup">
            <Button>Start Free Trial</Button>
          </Link>
        </nav>
      </header>

      <main>
        <section className="flex flex-col items-center justify-center px-8 py-32 text-center bg-gradient-to-b from-blue-50 to-white">
          <h1 className="mb-6 max-w-3xl text-5xl font-bold tracking-tight text-gray-900">
            Know your SaaS runway in 10 minutes
          </h1>
          <p className="mb-8 max-w-xl text-xl text-gray-600">
            Connect Stripe, get real MRR + cash flow forecast instantly. No spreadsheets required.
          </p>
          <Link href="/signup">
            <Button size="lg" className="text-lg px-8 py-6">
              Start Free 14-Day Trial
            </Button>
          </Link>
          <p className="mt-4 text-sm text-gray-500">
            No credit card required • Set up in 10 minutes
          </p>
        </section>

        <section className="px-8 py-24 bg-gray-50">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-12 text-center text-3xl font-bold">Trusted by early-stage SaaS founders</h2>
            <div className="grid grid-cols-3 gap-8 text-center">
              <div className="p-6">
                <div className="mb-4 text-4xl font-bold text-blue-600">50+</div>
                <p className="text-gray-600">Founders onboarded</p>
              </div>
              <div className="p-6">
                <div className="mb-4 text-4xl font-bold text-blue-600">$2M+</div>
                <p className="text-gray-600">MRR tracked</p>
              </div>
              <div className="p-6">
                <div className="mb-4 text-4xl font-bold text-blue-600">95%</div>
                <p className="text-gray-600">Would recommend</p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-8 py-24">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-12 text-center text-3xl font-bold">Everything you need to track SaaS finances</h2>
            <div className="grid gap-8 md:grid-cols-3">
              <Card className="p-8">
                <h3 className="mb-4 text-xl font-semibold">MRR & KPIs (M1)</h3>
                <p className="text-gray-600">
                  Automatic sync from Stripe. Real-time dashboards showing MRR, ARR, Churn Rate, and LTV.
                </p>
              </Card>
              <Card className="p-8">
                <h3 className="mb-4 text-xl font-semibold">Cash Flow & Runway (M2)</h3>
                <p className="text-gray-600">
                  30/60/90 day projections with P50/P80/P95 confidence bands. Know your runway instantly.
                </p>
              </Card>
              <Card className="p-8">
                <h3 className="mb-4 text-xl font-semibold">Stripe-Native Workflow</h3>
                <p className="text-gray-600">
                  No spreadsheets. Connect your Stripe account and get insights in minutes. Built for founders, by founders.
                </p>
              </Card>
            </div>
          </div>
        </section>

        <section className="px-8 py-24 bg-gray-50">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-12 text-center text-3xl font-bold">How it works</h2>
            <div className="grid gap-12 md:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold text-white">
                  1
                </div>
                <h3 className="mb-2 text-xl font-semibold">Connect Stripe</h3>
                <p className="text-gray-600">
                  Securely connect your Stripe account with one click. We use AES-256 encryption for your API keys.
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold text-white">
                  2
                </div>
                <h3 className="mb-2 text-xl font-semibold">Review KPIs & Forecast</h3>
                <p className="text-gray-600">
                  Instantly see your MRR, ARR, Churn Rate, LTV, and 30/60/90 day cash flow forecast.
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold text-white">
                  3
                </div>
                <h3 className="mb-2 text-xl font-semibold">Decide with Confidence</h3>
                <p className="text-gray-600">
                  Make data-driven decisions with P50/P80/P95 confidence bands on all forecasts.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-8 py-24 text-center">
          <h2 className="mb-8 text-3xl font-bold">Ready to take control of your SaaS finances?</h2>
          <Link href="/signup">
            <Button size="lg" className="text-lg px-8 py-6">
              Start Free 14-Day Trial
            </Button>
          </Link>
        </section>
      </main>

      <footer className="border-t px-8 py-8 text-center text-sm text-gray-500">
        <p>&copy; 2026 AI Finance Ops Copilot. All rights reserved.</p>
      </footer>
    </div>
  );
}

