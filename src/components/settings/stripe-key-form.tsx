'use client'
import { useState } from "react"
import { Button } from "@/components/ui/button"

export function StripeKeyForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("loading")
    setMessage("")

    const formData = new FormData(e.currentTarget)
    const stripeKey = formData.get("stripeKey") as string

    try {
      const res = await fetch("/dashboard/settings/stripe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stripeKey }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Failed to save Stripe key")
      }

      setStatus("success")
      setMessage("Stripe key saved and synced successfully!")
    } catch (err) {
      setStatus("error")
      setMessage(err instanceof Error ? err.message : "Something went wrong")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {status === "success" && (
        <div className="rounded-md bg-green-50 p-3 text-sm text-green-700">
          {message}
        </div>
      )}
      {status === "error" && (
        <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">
          {message}
        </div>
      )}
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
      <Button type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Saving..." : "Save & Sync"}
      </Button>
    </form>
  )
}
