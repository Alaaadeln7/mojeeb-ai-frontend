import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

export default function TablePaginationSkeleton() {
  return (
    <div className="flex items-center justify-end space-x-2 mt-5">
      <div className="flex items-center space-x-1">
        {/* Previous Button Skeleton */}
        <Button variant="outline" size="sm" disabled className="opacity-50">
          <Skeleton className="h-4 w-12" />
        </Button>

        {/* Page Number Skeletons */}
        <Skeleton className="h-9 w-9 rounded-md" />
        <Skeleton className="h-9 w-9 rounded-md" />
        {/* Active page skeleton - slightly different to indicate active state */}
        <Skeleton className="h-9 w-9 rounded-md bg-primary/30" />
        <Skeleton className="h-9 w-9 rounded-md" />

        {/* Next Button Skeleton */}
        <Button variant="outline" size="sm" disabled className="opacity-50">
          <Skeleton className="h-4 w-12" />
        </Button>
      </div>
    </div>
  );
}
