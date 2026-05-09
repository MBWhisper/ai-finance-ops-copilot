import { Skeleton } from "@/components/ui/skeleton";

export default function SetupLoading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-2xl space-y-6">
        <Skeleton className="mx-auto h-10 w-96" />
        <Skeleton className="mx-auto h-5 w-64" />
        <Skeleton className="h-64 rounded-lg" />
      </div>
    </div>
  );
}