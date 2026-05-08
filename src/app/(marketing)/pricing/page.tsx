import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Check } from "lucide-react";

export default function PricingPage() {
  const plans = [
    {
      name: "Starter",
      price: 29,
      description: "Perfect for solo founders",
      features: [
        "Single Stripe connection",
        "MRR, ARR, Churn, LTV tracking (M1)",
        "30-day cash flow forecast (M2)",
        "7-day forecast cache",
        "Email support",
      ],
      cta: "Start Free 14-Day Trial",
      href: "/signup?plan=starter",
    },
    {
      name: "Pro",
      price: 79,
      description: "For growing SaaS teams",
      features: [
        "Up to 3 Stripe connections",
        "All Stripe KPIs (M1)",
        "90-day forecast with P50/P80/P95 bands (M2)",
        "6-hour forecast cache",
        "Priority support + Slack access",
      ],
      cta: "Start Free 14-Day Trial",
      href: "/signup?plan=pro",
      highlighted: true,
    },
  ];

  return (
    <div className="min-h-screen px-8 py-24 bg-gray-50">
      <div className="mb-16 text-center">
        <h1 className="mb-4 text-4xl font-bold">Simple, transparent pricing</h1>
          <p className="text-lg text-gray-600">
            Start free. Upgrade when you&apos;re ready.
          </p>
      </div>

      <div className="mx-auto mb-12 max-w-2xl rounded-lg border-2 border-blue-600 bg-blue-50 p-4 text-center">
        <p className="font-semibold text-blue-900">
          🚀 Early Founder Access: Locked pricing for first 50 customers
        </p>
      </div>

      <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`relative ${plan.highlighted ? "border-blue-600 shadow-lg" : ""}`}
          >
            {plan.highlighted && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-4 py-1 text-sm font-semibold text-white">
                Most Popular
              </div>
            )}
            <CardHeader>
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
              <div className="mt-4">
                <span className="text-5xl font-bold">${plan.price}</span>
                <span className="text-gray-600">/mo</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="mb-8 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link href={plan.href}>
                <Button
                  className="w-full"
                  variant={plan.highlighted ? "default" : "outline"}
                  size="lg"
                >
                  {plan.cta}
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mx-auto mt-16 max-w-2xl text-center">
        <p className="text-gray-600">
          All plans include a 14-day free trial. No credit card required.
        </p>
      </div>
    </div>
  );
}

