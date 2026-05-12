"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/browser"
import { Button } from "@/components/ui/button"
import { PLANS, FREE_TRIAL_DAYS } from "@/lib/plans"
import { Check, ArrowRight, ArrowLeft } from "lucide-react"
import Link from "next/link"

type Step = "welcome" | "plan" | "billing" | "done"

export default function SetupPage() {
  const router = useRouter()
  const supabase = createClient()
  const [step, setStep] = useState<Step>("welcome")
  const [selectedPlan, setSelectedPlan] = useState<string>("starter")
  const [loading, setLoading] = useState(false)

  async function skipBilling() {
    setLoading(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push("/login")
        return
      }
      router.push("/dashboard/overview?welcome=true")
    } catch {
      setStep("done")
    } finally {
      setLoading(false)
    }
  }

  async function handleUpgrade() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push("/login")
      return
    }

    const plan = Object.values(PLANS).find((p) => p.slug === selectedPlan)
    if (!plan) return

    const checkoutUrls: Record<string, string> = {
      starter: "a6fac794-fedd-46cb-a998-913316b62e89",
      growth: "8e49a214-837d-40cf-86a9-121dc483b335",
      scale: "ba80d7d9-f9ab-4d09-99b1-841c81c59697",
    }

    const url = `https://ai-finance-ops.lemonsqueezy.com/checkout/buy/${checkoutUrls[plan.slug]}?checkout%5Bemail%5D=${encodeURIComponent(user.email ?? "")}`
    window.open(url, "_blank")
    router.push("/dashboard/overview?welcome=true")
  }

  if (step === "welcome") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-lg text-center">
          <div className="mb-8 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-2xl font-bold text-white">
              F
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome to Finance Ops</h1>
          <p className="mt-4 text-lg text-gray-600">
            Get started with your {FREE_TRIAL_DAYS}-day free trial. No credit card required.
          </p>
          <p className="mt-2 text-sm text-gray-500">
            You&apos;ll get access to all features. Choose a plan that fits your needs.
          </p>
          <div className="mt-8 space-y-3">
            <Button size="lg" className="w-full text-base" onClick={() => setStep("plan")}>
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Link href="/demo">
              <Button variant="outline" size="lg" className="w-full text-base">
                Try Demo First
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (step === "plan") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
        <div className="w-full max-w-4xl">
          <button
            onClick={() => setStep("welcome")}
            className="mb-6 flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Choose your plan</h1>
            <p className="mt-2 text-gray-600">
              All plans include a {FREE_TRIAL_DAYS}-day free trial. Upgrade or cancel anytime.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {Object.values(PLANS).map((plan) => (
              <button
                key={plan.slug}
                onClick={() => setSelectedPlan(plan.slug)}
                className={`relative rounded-2xl border-2 p-6 text-left transition-all hover:shadow-md ${
                  selectedPlan === plan.slug
                    ? "border-blue-600 bg-blue-50 shadow-md"
                    : "border-gray-200 bg-white"
                }`}
              >
                {plan.slug === "growth" && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-3 py-0.5 text-xs font-semibold text-white">
                    Most Popular
                  </div>
                )}
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-gray-900">{plan.name}</h3>
                  {selectedPlan === plan.slug && (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-4">{plan.description}</p>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-gray-900">${plan.price}</span>
                  <span className="text-gray-600">/mo</span>
                </div>
                <ul className="space-y-2">
                  {plan.features.slice(0, 4).map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                  {plan.features.length > 4 && (
                    <li className="text-xs text-gray-400">+{plan.features.length - 4} more features</li>
                  )}
                </ul>
              </button>
            ))}
          </div>
          <div className="mt-8 flex justify-center gap-4">
            <Button variant="outline" onClick={skipBilling} disabled={loading}>
              Skip — Start with Starter
            </Button>
            <Button onClick={handleUpgrade} disabled={loading}>
              Continue with {Object.values(PLANS).find((p) => p.slug === selectedPlan)?.name}{" "}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return null
}
