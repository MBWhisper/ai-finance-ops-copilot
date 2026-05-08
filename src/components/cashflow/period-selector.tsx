"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PeriodSelectorProps {
  selectedPeriod: 30 | 60 | 90;
  onPeriodChange: (period: 30 | 60 | 90) => void;
}

export function PeriodSelector({
  selectedPeriod,
  onPeriodChange,
}: PeriodSelectorProps) {
  const periods: Array<30 | 60 | 90> = [30, 60, 90];

  return (
    <div className="flex gap-2">
      {periods.map((period) => (
        <Button
          key={period}
          variant={selectedPeriod === period ? "default" : "outline"}
          onClick={() => onPeriodChange(period)}
          className={cn("min-w-[80px]")}
        >
          {period} Days
        </Button>
      ))}
    </div>
  );
}
