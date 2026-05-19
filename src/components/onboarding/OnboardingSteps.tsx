"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/browser"
import { Button } from "@/components/ui/button"
import { Check, ArrowRight } from "lucide-react"

type Step = 1 | 2 | 3

export default function OnboardingSteps() {
  const router = useRouter()
  const supabase = createClient()
  const [step, setStep] = useState<Step>(1)
  const [mrr, setMrr] = useState("")
  const [currency, setCurrency] = useState("USD")
  const [customerName, setCustomerName] = useState("")
  const [customerAmount, setCustomerAmount] = useState("")
  const [customerDueDate, setCustomerDueDate] = useState("")
  const [customerStatus, setCustomerStatus] = useState("sent")
  const [loading, setLoading] = useState(false)
  const [checkedOnboarding, setCheckedOnboarding] = useState(false)

  useEffect(() => {
    async function check() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push("/login")
        return
      }
      const { data: profile } = await supabase
        .from("users")
        .select("onboarding_completed")
        .eq("id", user.id)
        .single()

      if (profile?.onboarding_completed) {
        router.push("/dashboard/overview")
        return
      }
      setCheckedOnboarding(true)
    }
    check()
  }, [router, supabase])

  async function completeOnboarding() {
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const userId = user.id

    // Persist MRR as initial metrics_daily record
    const mrrValue = parseInt(mrr, 10)
    if (mrrValue > 0) {
      try {
        const today = new Date().toISOString().split('T')[0]
        const { data: existing } = await supabase
          .from("metrics_daily")
          .select("id")
          .eq("user_id", userId)
          .eq("date", today)
          .maybeSingle()

        if (!existing) {
          await supabase.from("metrics_daily").insert({
            user_id: userId,
            date: today,
            mrr_cents: mrrValue * 100,
            arr_cents: mrrValue * 1200,
            churn_rate: 0,
            ltv_cents: mrrValue * 100 * 12,
          })
        }
      } catch {
        // Silently skip MRR seed if it fails
      }
    }

    // Persist first customer as an invoice record
    if (customerName.trim() && customerAmount) {
      try {
        const amtCents = Math.round(parseFloat(customerAmount) * 100)
        const dueDate = customerDueDate || new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0]
        await supabase.from("invoices").insert({
          user_id: userId,
          customer_email: `${customerName.trim().toLowerCase().replace(/\s+/g, '.')}@onboarded.com`,
          amount_cents: amtCents,
          due_date: dueDate,
          status: "sent",
          reminders_sent: 0,
        })
      } catch {
        // Silently skip first customer seed
      }
    }

    // Persist workspace name to settings
    try {
      const { data: profile } = await supabase
        .from("users")
        .select("settings")
        .eq("id", userId)
        .single()

      const currentSettings = ((profile as any)?.settings ?? {}) as Record<string, any>
      if (customerName.trim()) {
        currentSettings.workspace = {
          ...(currentSettings.workspace ?? {}),
          companyName: customerName.trim(),
        }
      }
      currentSettings.onboardingSnapshot = {
        mrrCents: mrrValue * 100,
        currency,
        completedAt: new Date().toISOString(),
      }

      await supabase
        .from("users")
        .update({ settings: currentSettings, onboarding_completed: true })
        .eq("id", userId)
    } catch {
      // Fallback: just mark onboarding complete
      await supabase
        .from("users")
        .update({ onboarding_completed: true })
        .eq("id", userId)
    }

    router.push("/dashboard/overview?welcome=true")
  }

  if (!checkedOnboarding) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <div className="animate-spin h-8 w-8 border-2 border-emerald-500 border-t-transparent rounded-full" />
      </div>
    )
  }

  const progress = ((step - 1) / 2) * 100

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
      <div className="w-full max-w-lg">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-500">Step {step} of 3</span>
            <span className="text-xs font-medium text-gray-500">{Math.round(progress)}%</span>
          </div>
          <div className="h-2 rounded-full bg-gray-800">
            <div
              className="h-2 rounded-full bg-emerald-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between mt-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`flex items-center gap-1.5 ${s <= step ? "text-emerald-400" : "text-gray-600"}`}
              >
                <div
                  className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                    s < step
                      ? "bg-emerald-500 text-white"
                      : s === step
                        ? "border-2 border-emerald-500 text-emerald-400"
                        : "border-2 border-gray-700 text-gray-600"
                  }`}
                >
                  {s < step ? <Check className="h-3 w-3" /> : s}
                </div>
                <span className="text-xs hidden sm:inline">
                  {s === 1 ? "MRR" : s === 2 ? "Customer" : "Ready"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: MRR */}
        {step === 1 && (
          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-8">
            <h2 className="text-2xl font-bold text-white">What&apos;s your current MRR?</h2>
            <p className="mt-2 text-sm text-gray-400">
              This helps us benchmark your growth. We&apos;ll never share this data.
            </p>
            <div className="mt-6 flex gap-3">
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="rounded-lg border border-gray-700 bg-gray-800 px-3 py-3 text-sm text-white focus:border-emerald-500 focus:outline-none"
              >
                {["USD", "EUR", "GBP", "MAD"].map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <input
                type="number"
                placeholder="12000"
                value={mrr}
                onChange={(e) => setMrr(e.target.value)}
                className="flex-1 rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-emerald-500 focus:outline-none"
              />
            </div>
            <Button
              onClick={() => setStep(2)}
              disabled={!mrr}
              className="mt-6 w-full bg-emerald-500 hover:bg-emerald-400 text-white"
              size="lg"
            >
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Step 2: Add Customer */}
        {step === 2 && (
          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-8">
            <h2 className="text-2xl font-bold text-white">Add your first customer</h2>
            <p className="mt-2 text-sm text-gray-400">
              Don&apos;t worry, you can add more later or connect your billing provider.
            </p>
            <div className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Customer Name</label>
                <input
                  type="text"
                  placeholder="Acme Corp"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-emerald-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Monthly Amount ($)</label>
                <input
                  type="number"
                  placeholder="999"
                  value={customerAmount}
                  onChange={(e) => setCustomerAmount(e.target.value)}
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-emerald-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Due Date</label>
                <input
                  type="date"
                  value={customerDueDate}
                  onChange={(e) => setCustomerDueDate(e.target.value)}
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-sm text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Status</label>
                <select
                  value={customerStatus}
                  onChange={(e) => setCustomerStatus(e.target.value)}
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-sm text-white focus:border-emerald-500 focus:outline-none"
                >
                  <option value="active">Active</option>
                  <option value="trialing">Trialing</option>
                  <option value="past_due">Past Due</option>
                  <option value="canceled">Canceled</option>
                </select>
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <Button
                variant="outline"
                onClick={completeOnboarding}
                disabled={loading}
                className="flex-1 border-gray-700 text-gray-300 hover:border-gray-500"
              >
                Skip for now
              </Button>
              <Button
                onClick={completeOnboarding}
                disabled={loading || !customerName}
                className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-white"
              >
                Add Customer <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Ready */}
        {step === 3 && (
          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-8 text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500">
                <Check className="h-6 w-6 text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white">Your forecast is ready! 🎉</h2>
            <p className="mt-3 text-gray-400">
              Your 90-day cash flow forecast has been generated. Start exploring your dashboard.
            </p>
            <Button
              onClick={completeOnboarding}
              disabled={loading}
              className="mt-8 w-full bg-emerald-500 hover:bg-emerald-400 text-white"
              size="lg"
            >
              {loading ? "Setting up..." : "Go to Dashboard \u2192"}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
