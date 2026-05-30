import { Skeleton } from "@/components/ui/skeleton";

export default function CohortsLoading() {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-9 w-48" />
        <Skeleton className="mt-2 h-5 w-64" />
      </div>
      <Skeleton className="h-[300px] w-full rounded-xl" />
    </div>
  );
}
