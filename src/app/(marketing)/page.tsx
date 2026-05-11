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
        {/* Hero */}
        <section className="flex flex-col items-center justify-center px-8 py-32 text-center bg-gradient-to-b from-blue-50 to-white">
          <h1 className="mb-6 max-w-3xl text-5xl font-bold tracking-tight text-gray-900">
            Know your SaaS runway in 10 minutes
          </h1>
          <p className="mb-8 max-w-xl text-xl text-gray-600">
            Connect Stripe, get real MRR + cash flow forecasts instantly.
            No spreadsheets. No manual exports.
          </p>
          <Link href="/signup">
            <Button size="lg" className="text-lg px-8 py-6">
              Start Free 14-Day Trial
            </Button>
          </Link>
          <p className="mt-4 text-sm text-gray-500">
            No credit card required &bull; Set up in under 10 minutes
          </p>
        </section>

        {/* Why founders use this */}
        <section className="px-8 py-24 bg-gray-50">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-4 text-center text-3xl font-bold">
              Built for early-stage SaaS founders
            </h2>
            <p className="mb-12 text-center text-gray-500 max-w-xl mx-auto">
              Stop guessing. Start making data-driven decisions with metrics
              pulled directly from your Stripe account.
            </p>
            <div className="grid gap-8 md:grid-cols-3 text-center">
              <div className="rounded-xl bg-white border border-gray-200 p-8 shadow-sm">
                <div className="mb-4 text-4xl">📊</div>
                <h3 className="mb-2 text-lg font-semibold">Real MRR, not estimates</h3>
                <p className="text-sm text-gray-600">
                  Synced directly from Stripe subscriptions — no data entry required.
                </p>
              </div>
              <div className="rounded-xl bg-white border border-gray-200 p-8 shadow-sm">
                <div className="mb-4 text-4xl">🔮</div>
                <h3 className="mb-2 text-lg font-semibold">30 / 60 / 90 day forecasts</h3>
                <p className="text-sm text-gray-600">
                  P50, P80, and P95 confidence bands so you can plan for best,
                  moderate, and conservative scenarios.
                </p>
              </div>
              <div className="rounded-xl bg-white border border-gray-200 p-8 shadow-sm">
                <div className="mb-4 text-4xl">📬</div>
                <h3 className="mb-2 text-lg font-semibold">Automatic AR reminders</h3>
                <p className="text-sm text-gray-600">
                  Overdue invoices get reminder emails automatically.
                  Send them manually too, right from your dashboard.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="px-8 py-24">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-12 text-center text-3xl font-bold">How it works</h2>
            <div className="grid gap-12 md:grid-cols-3">
              {[
                {
                  step: '1',
                  title: 'Connect Stripe',
                  desc: 'Securely link your Stripe account with one click. Your API key is encrypted with AES-256 and never stored in plain text.',
                },
                {
                  step: '2',
                  title: 'Review KPIs & Forecast',
                  desc: 'Instantly see your MRR, ARR, Churn Rate, LTV, and 30/60/90-day cash flow forecast with confidence bands.',
                },
                {
                  step: '3',
                  title: 'Decide with confidence',
                  desc: 'Make data-driven decisions based on real numbers — not gut feelings or outdated spreadsheets.',
                },
              ].map(({ step, title, desc }) => (
                <div key={step} className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold text-white">
                    {step}
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">{title}</h3>
                  <p className="text-gray-600">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features detail */}
        <section className="px-8 py-24 bg-gray-50">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-12 text-center text-3xl font-bold">
              Everything you need to track SaaS finances
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              <Card className="p-8">
                <h3 className="mb-4 text-xl font-semibold">MRR &amp; KPIs</h3>
                <p className="text-gray-600">
                  Automatic sync from Stripe. Real-time dashboards showing MRR,
                  ARR, Churn Rate, and LTV — updated on every sync.
                </p>
              </Card>
              <Card className="p-8">
                <h3 className="mb-4 text-xl font-semibold">Cash Flow &amp; Runway</h3>
                <p className="text-gray-600">
                  30/60/90-day projections with P50/P80/P95 confidence bands.
                  Know your runway before it becomes a crisis.
                </p>
              </Card>
              <Card className="p-8">
                <h3 className="mb-4 text-xl font-semibold">AR &amp; Invoice Reminders</h3>
                <p className="text-gray-600">
                  Track overdue invoices, send manual reminders, and let
                  automated nightly reminders handle the rest.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-8 py-24 text-center">
          <h2 className="mb-4 text-3xl font-bold">
            Ready to take control of your SaaS finances?
          </h2>
          <p className="mb-8 text-gray-500">
            No spreadsheets. No manual exports. Just clear numbers.
          </p>
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
