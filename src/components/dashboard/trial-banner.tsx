import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface TrialBannerProps {
  trialEndsAt: string | null;
  plan: string;
  createdAt?: string;
  showWelcome?: boolean;
}

export function TrialBanner({ trialEndsAt, plan, createdAt, showWelcome }: TrialBannerProps) {
  if (plan !== "starter" && plan !== "pro" && plan !== "free") {
    return null;
  }

  const daysSinceSignup = createdAt
    ? Math.floor((Date.now() - new Date(createdAt).getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  if (daysSinceSignup === 0 && showWelcome) {
    return (
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="flex items-center justify-between py-4">
          <div>
            <p className="font-medium text-blue-900">
              Welcome to your 14-day free trial! 🎉
            </p>
            <p className="text-sm text-blue-700">
              Explore all features. Upgrade anytime.
            </p>
          </div>
          <Link href="/pricing">
            <Button variant="outline" className="border-blue-600 text-blue-600">
              Upgrade
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  if (daysSinceSignup === 0) return null;

  if (daysSinceSignup < 14) {
    const daysLeft = 14 - daysSinceSignup;
    return (
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="flex items-center justify-between py-4">
          <div>
            <p className="font-medium text-blue-900">
              {daysLeft} {daysLeft === 1 ? "day" : "days"} left in your free trial
            </p>
            <p className="text-sm text-blue-700">
              Explore all features. Upgrade anytime.
            </p>
          </div>
          <Link href="/pricing">
            <Button variant="outline" className="border-blue-600 text-blue-600">
              Upgrade
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-red-200 bg-red-50">
      <CardContent className="flex items-center justify-between py-4">
        <div>
          <p className="font-medium text-red-900">
            Your trial has expired
          </p>
          <p className="text-sm text-red-700">
            Upgrade to continue using AI Finance Ops Copilot
          </p>
        </div>
        <Link href="/pricing">
          <Button className="bg-red-600 hover:bg-red-700">
            Upgrade Now
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
