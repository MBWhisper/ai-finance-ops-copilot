import { KPISkeleton } from "@/components/dashboard/kpi-skeleton";

export default function Loading() {
  return (
    <div className="space-y-6">
      <div>
        <div className="mb-2 h-9 w-48 animate-pulse rounded bg-gray-200" />
        <div className="h-5 w-72 animate-pulse rounded bg-gray-200" />
      </div>
      <KPISkeleton count={4} />
    </div>
  );
}
