import { getForecasts } from "@/db/queries/forecasts";
import { getLatestMetrics } from "@/db/queries/metrics";
import { generateForecast } from "@/core/forecast/engine";
import { ForecastChart } from "@/components/cashflow/forecast-chart";
import { PeriodSelector } from "@/components/cashflow/period-selector";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ForecastDay } from "@/core/forecast/types";

interface CashFlowPageProps {
  searchParams: { period?: string };
}

export default async function CashFlowPage({
  searchParams,
}: CashFlowPageProps) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const period = (searchParams.period === "60" ||
  searchParams.period === "90"
    ? parseInt(searchParams.period)
    : 30) as 30 | 60 | 90;

  const historicalData = await getLatestMetrics(user.id);
  const cachedForecasts = await getForecasts(user.id, { period });

  let forecastDays: ForecastDay[] = [];

  if (cachedForecasts && cachedForecasts.length > 0) {
    forecastDays = cachedForecasts.map((f) => ({
      date: f.forecastDate,
      amountCents: f.amountCents,
      type: f.type,
      bands: {
        p50: f.p50Cents ?? f.amountCents,
        p80: f.p80Cents ?? f.amountCents,
        p95: f.p95Cents ?? f.amountCents,
      },
    }));
  } else if (historicalData) {
    const forecast = generateForecast({
      historicalMrr: [
        { date: new Date().toISOString().split("T")[0]!, mrrCents: historicalData.mrrCents },
      ],
      period,
      growthRate: 5,
      seasonalityFactor: 0.1,
    });
    forecastDays = forecast.days;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Cash Flow Forecast</h1>
        <p className="text-muted-foreground">
          30, 60, and 90 day revenue projections.
        </p>
      </div>

      <div className="flex items-center justify-between">
        <PeriodSelector
          selectedPeriod={period}
          onPeriodChange={(p) => {
            window.location.href = `/dashboard/cashflow?period=${p}`;
          }}
        />
      </div>

      {forecastDays.length > 0 ? (
        <Card>
          <CardContent className="pt-6">
            <ForecastChart data={forecastDays} period={period} />
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">
              Connect your Stripe account in settings to generate forecasts.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
