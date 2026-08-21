import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-8 animate-fadeIn">
      <div className="space-y-3 max-w-xl mx-auto text-center">
        <Skeleton className="h-6 w-32 mx-auto rounded-full" />
        <Skeleton className="h-10 w-3/4 mx-auto rounded-2xl" />
        <Skeleton className="h-4 w-1/2 mx-auto rounded-lg" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Skeleton className="h-64 rounded-[20px]" />
        <Skeleton className="h-64 rounded-[20px]" />
        <Skeleton className="h-64 rounded-[20px]" />
      </div>
    </div>
  );
}
