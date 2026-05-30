import { Skeleton } from "@/components/ui/skeleton";

export default function AIChatLoading() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="text-center">
        <Skeleton className="h-12 w-12 rounded-full mx-auto" />
        <Skeleton className="mt-4 h-6 w-48 mx-auto" />
        <Skeleton className="mt-2 h-4 w-64 mx-auto" />
      </div>
    </div>
  );
}
