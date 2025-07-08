import { Skeleton } from "@/components/ui/skeleton";

export default function UserTablePaginationSkeleton() {
  return (
    <div className="flex items-center justify-center gap-1 mt-5">
      {/* Previous Button Skeleton */}
      <Skeleton className="h-9 w-16 rounded-md" />

      {/* Page Number Skeletons */}
      <Skeleton className="h-9 w-9 rounded-md" />
      <Skeleton className="h-9 w-9 rounded-md" />
      {/* Active page skeleton */}
      <Skeleton className="h-9 w-9 rounded-md bg-primary/30" />
      <Skeleton className="h-9 w-9 rounded-md" />

      {/* Next Button Skeleton */}
      <Skeleton className="h-9 w-16 rounded-md" />
    </div>
  );
}
