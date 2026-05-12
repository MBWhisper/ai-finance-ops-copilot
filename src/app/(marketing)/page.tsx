import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Check, BarChart3, TrendingUp, Receipt, Brain, Shield, Zap, Clock } from "lucide-react"
import { PLANS } from "@/lib/plans"

export default async function LandingPage() {
  const supabase = createClient()
  const { data: { session } } = await supabase.auth.getSession()
  const isLoggedIn = !!session

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white">
              F
            </div>
            <span className="text-lg font-bold text-gray-900">Finance Ops</span>
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            <Link href="/#features" className="text-sm font-medium text-gray-600 hover:text-gray-900">
              Product
            </Link>
            <Link href="/pricing" className="text-sm font-medium text-gray-600 hover:text-gray-900">
              Pricing
            </Link>
            <Link href="/#faq" className="text-sm font-medium text-gray-600 hover:text-gray-900">
              FAQ
            </Link>
            {isLoggedIn ? (
              <Link href="/dashboard/overview">
                <Button>Go to Dashboard</Button>
              </Link>
            ) : (
              <>
                <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-gray-900">
                  Sign in
                </Link>
                <Link href="/register">
                  <Button>Start Free Trial</Button>
                </Link>
              </>
            )}
          </nav>
          <div className="flex items-center gap-3 md:hidden">
            <Link href="/demo">
              <Button variant="outline" size="sm">Demo</Button>
            </Link>
            <Link href={isLoggedIn ? "/dashboard/overview" : "/register"}>
              <Button size="sm">{isLoggedIn ? "Dashboard" : "Get Started"}</Button>
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden px-6 py-24 sm:py-32 lg:px-8">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.blue.50),white)]" />
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700">
              AI-Powered Finance Intelligence for B2B SaaS
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Know your SaaS financials in seconds, not spreadsheets
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Stop guessing about your runway. Connect your billing, get real-time MRR, ARR, churn, LTV, and
              AI-powered cash flow forecasts — built for B2B SaaS founders and finance teams.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              {isLoggedIn ? (
                <Link href="/dashboard/overview">
                  <Button size="lg" className="text-base px-8 py-6">
                    Go to Dashboard
                  </Button>
                </Link>
              ) : (
                <Link href="/register">
                  <Button size="lg" className="text-base px-8 py-6">
                    Start Free Trial
                  </Button>
                </Link>
              )}
              <Link href="/demo">
                <Button variant="outline" size="lg" className="text-base px-8 py-6">
                  Try Live Demo
                </Button>
              </Link>
            </div>
            <p className="mt-4 text-sm text-gray-500">
              No credit card required &bull; 14-day free trial &bull; Set up in 10 minutes
            </p>
          </div>
        </section>

        <section className="border-t bg-gray-50/50 px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-center text-3xl font-bold text-gray-900">
              The pain of SaaS finance is real
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-gray-600">
              Most B2B SaaS founders are flying blind when it comes to their financials.
            </p>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              <Card className="border-0 bg-white p-8 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-red-100">
                  <Clock className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">Hours in spreadsheets</h3>
                <p className="text-gray-600">
                  Manually exporting Stripe data, reconciling invoices, and maintaining error-prone Excel models.
                </p>
              </Card>
              <Card className="border-0 bg-white p-8 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-amber-100">
                  <BarChart3 className="h-6 w-6 text-amber-600" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">No real-time visibility</h3>
                <p className="text-gray-600">
                  By the time you update your metrics, they&apos;re already stale. You need real-time MRR, ARR, and runway data.
                </p>
              </Card>
              <Card className="border-0 bg-white p-8 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                  <Brain className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">Guesswork forecasting</h3>
                <p className="text-gray-600">
                  Gut-feel projections lead to bad decisions. You need AI-powered forecasts with confidence bands.
                </p>
              </Card>
            </div>
          </div>
        </section>

        <section id="features" className="px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-center text-3xl font-bold text-gray-900">
              Everything you need to track SaaS finances
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-gray-600">
              One dashboard to replace your spreadsheets, BI tools, and manual reporting.
            </p>
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <Card className="border-0 bg-white p-8 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                  <BarChart3 className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">Real-Time KPIs</h3>
                <p className="text-sm text-gray-600">
                  MRR, ARR, Churn Rate, LTV — automatically calculated and updated from your billing data.
                </p>
              </Card>
              <Card className="border-0 bg-white p-8 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">Cash Flow Forecasts</h3>
                <p className="text-sm text-gray-600">
                  30/60/90 day projections with P50/P80/P95 confidence bands. Know your runway instantly.
                </p>
              </Card>
              <Card className="border-0 bg-white p-8 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100">
                  <Receipt className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">AR & Invoice Tracking</h3>
                <p className="text-sm text-gray-600">
                  Track outstanding invoices, overdue payments, and send automated AR reminders.
                </p>
              </Card>
              <Card className="border-0 bg-white p-8 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-100">
                  <Zap className="h-6 w-6 text-cyan-600" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">AI Insights</h3>
                <p className="text-sm text-gray-600">
                  Get AI-powered forecasts, anomaly detection, and actionable recommendations for your business.
                </p>
              </Card>
            </div>
          </div>
        </section>

        <section className="border-t bg-gray-50/50 px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900">Simple, transparent pricing</h2>
              <p className="mt-4 text-lg text-gray-600">
                Start free. Upgrade when you&apos;re ready.
              </p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {Object.values(PLANS).map((plan) => (
                <Card
                  key={plan.slug}
                  className={`relative flex flex-col border-2 ${
                    plan.slug === 'growth' ? 'border-blue-600 shadow-lg' : 'border-gray-200'
                  }`}
                >
                  {plan.slug === 'growth' && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-4 py-1 text-sm font-semibold text-white">
                      Most Popular
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-8">
                    <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                    <p className="mt-2 text-sm text-gray-600">{plan.description}</p>
                    <div className="mt-6">
                      <span className="text-5xl font-bold text-gray-900">${plan.price}</span>
                      <span className="text-gray-600">/mo</span>
                    </div>
                    <ul className="mt-8 flex-1 space-y-3">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8">
                      {isLoggedIn ? (
                        <Link href="/dashboard/settings/billing">
                          <Button
                            className="w-full"
                            variant={plan.slug === 'growth' ? 'default' : 'outline'}
                            size="lg"
                          >
                            {plan.slug === 'starter' ? 'Current Plan' : 'Upgrade'}
                          </Button>
                        </Link>
                      ) : (
                        <Link href="/register">
                          <Button
                            className="w-full"
                            variant={plan.slug === 'growth' ? 'default' : 'outline'}
                            size="lg"
                          >
                            Start Free Trial
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="px-6 py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center text-3xl font-bold text-gray-900">
              Frequently asked questions
            </h2>
            <div className="mt-12 space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">What data sources do you support?</h3>
                <p className="mt-2 text-gray-600">
                  We currently support Stripe and Lemon Squeezy. More integrations coming soon.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">How is my data secured?</h3>
                <p className="mt-2 text-gray-600">
                  Your API keys are encrypted at rest using AES-256-GCM. All data is transmitted over TLS. We
                  never store raw credit card numbers or sensitive financial data.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Can I cancel anytime?</h3>
                <p className="mt-2 text-gray-600">
                  Yes. No long-term contracts. Cancel at any time from your billing settings. Your data
                  remains accessible for the remainder of your billing period.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Is there a free trial?</h3>
                <p className="mt-2 text-gray-600">
                  Yes, every plan comes with a 14-day free trial. No credit card required.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Can I try it without signing up?</h3>
                <p className="mt-2 text-gray-600">
                  Yes! Check out our <Link href="/demo" className="text-blue-600 hover:underline">live demo</Link> to see the dashboard in action without creating an account.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">What happens if I exceed my plan limits?</h3>
                <p className="mt-2 text-gray-600">
                  We&apos;ll notify you and show an upgrade prompt. You can upgrade or downgrade your plan at
                  any time from your billing settings.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t bg-gray-900 px-6 py-20 text-center">
          <h2 className="text-3xl font-bold text-white">
            Ready to take control of your SaaS finances?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-gray-400">
            Join early-stage founders who trust Finance Ops to track their MRR, forecasts, and runway.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            {isLoggedIn ? (
              <Link href="/dashboard/overview">
                <Button size="lg" className="bg-blue-600 text-base hover:bg-blue-700 px-8 py-6">
                  Go to Dashboard
                </Button>
              </Link>
            ) : (
              <Link href="/register">
                <Button size="lg" className="bg-blue-600 text-base hover:bg-blue-700 px-8 py-6">
                  Start Free 14-Day Trial
                </Button>
              </Link>
            )}
            <Link href="/demo">
              <Button variant="outline" size="lg" className="border-gray-600 text-base text-gray-300 hover:bg-gray-800 px-8 py-6">
                Try Live Demo
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white">
                F
              </div>
              <span className="text-sm font-bold text-gray-900">Finance Ops</span>
            </div>
            <div className="flex gap-6 text-sm text-gray-600">
              <Link href="/#features" className="hover:text-gray-900">Product</Link>
              <Link href="/pricing" className="hover:text-gray-900">Pricing</Link>
              <Link href="/#faq" className="hover:text-gray-900">FAQ</Link>
              <Link href="/login" className="hover:text-gray-900">Sign in</Link>
            </div>
            <p className="text-sm text-gray-500">&copy; 2026 Finance Ops Copilot. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
