import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface TrialBannerProps {
  trialEndsAt: string | null;
  plan: string;
  showWelcome?: boolean;
}

export function TrialBanner({ trialEndsAt, plan, showWelcome }: TrialBannerProps) {
  if (plan !== "starter" && plan !== "pro") {
    return null;
  }

  const isTrialing = trialEndsAt && new Date(trialEndsAt) > new Date();
  const daysLeft = isTrialing
    ? Math.ceil(
        (new Date(trialEndsAt).getTime() - new Date().getTime()) /
          (1000 * 60 * 60 * 24)
      )
    : 0;

  if (!isTrialing && !showWelcome) {
    return null;
  }

  if (isTrialing) {
    return (
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="flex items-center justify-between py-4">
          <div>
            <p className="font-medium text-blue-900">
              {showWelcome ? "Welcome to your 14-day free trial! " : ""}
              {daysLeft} {daysLeft === 1 ? "day" : "days"} left in your trial
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
