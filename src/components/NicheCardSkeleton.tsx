import { Skeleton } from "@/components/ui/skeleton";

export const NicheCardSkeleton = () => (
  <div className="rounded-3xl border border-border bg-card p-6 shadow-card flex flex-col gap-5">
    <div className="flex items-start justify-between gap-4">
      <div className="flex items-start gap-3 flex-1">
        <Skeleton className="h-12 w-12 rounded-2xl" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
      <Skeleton className="h-14 w-[72px] rounded-2xl" />
    </div>
    <div className="flex gap-1.5">
      <Skeleton className="h-5 w-20 rounded-full" />
      <Skeleton className="h-5 w-24 rounded-full" />
    </div>
    <div className="space-y-2.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} className="h-6 w-full" />
      ))}
    </div>
    <Skeleton className="h-20 w-full rounded-2xl" />
    <div className="space-y-1.5">
      <Skeleton className="h-4 w-32" />
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} className="h-4 w-full" />
      ))}
    </div>
  </div>
);
