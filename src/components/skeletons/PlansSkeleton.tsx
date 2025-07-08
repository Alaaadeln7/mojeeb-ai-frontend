import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

export function PlanCardSkeleton({ featured = false }: { featured?: boolean }) {
  return (
    <Card
      className={`w-80 relative ${featured ? "border-2 border-primary" : ""}`}
    >
      {featured && (
        <Badge
          variant="secondary"
          className="absolute -right-[1px] -top-[1px] rounded-bl-lg rounded-tr-lg animate-pulse"
        >
          <span className="invisible">POPULAR</span>
        </Badge>
      )}

      <CardHeader className="text-center pb-4">
        <CardTitle>
          <Skeleton className="h-6 w-32 mx-auto" />
        </CardTitle>
        <div className="mt-4">
          <Skeleton className="h-10 w-24 mx-auto" />
        </div>
      </CardHeader>

      <CardContent>
        <ul className="space-y-3 mb-6">
          {[...Array(5)].map((_, index) => (
            <li key={index} className="flex items-start">
              <Skeleton className="w-5 h-5 mr-2 mt-0.5 rounded-full" />
              <Skeleton className="h-5 w-48" />
            </li>
          ))}
        </ul>

        <Skeleton className="w-full h-10 rounded-lg" />
      </CardContent>
    </Card>
  );
}

// For the multiple skeleton loader
export function PlanCardSkeletons({
  count = 3,
  featured = false,
}: {
  count?: number;
  featured?: boolean;
}) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <PlanCardSkeleton key={index} featured={index === 1 && featured} />
      ))}
    </>
  );
}
