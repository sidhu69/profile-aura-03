import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export const ProfileSkeleton = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Skeleton */}
      <div className="bg-gradient-to-br from-primary/5 to-profile-glow/5 p-6">
        <Skeleton className="h-6 w-6 mb-4" />
        
        <div className="flex flex-col items-center space-y-4">
          <Skeleton className="h-24 w-24 rounded-full shimmer" />
          <div className="text-center space-y-2">
            <Skeleton className="h-8 w-32 shimmer" />
            <Skeleton className="h-4 w-24 shimmer" />
          </div>
        </div>
      </div>

      {/* Stats Skeleton */}
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4">
            <Skeleton className="h-5 w-16 mb-2 mx-auto shimmer" />
            <Skeleton className="h-8 w-12 mx-auto shimmer" />
          </Card>
          <Card className="p-4">
            <Skeleton className="h-5 w-16 mb-2 mx-auto shimmer" />
            <Skeleton className="h-8 w-12 mx-auto shimmer" />
          </Card>
        </div>

        {/* Level Progress Skeleton */}
        <Card className="p-4">
          <div className="flex justify-between mb-2">
            <Skeleton className="h-4 w-16 shimmer" />
            <Skeleton className="h-4 w-20 shimmer" />
          </div>
          <Skeleton className="h-2 w-full shimmer" />
          <Skeleton className="h-3 w-24 mx-auto mt-1 shimmer" />
        </Card>

        {/* Bio Skeleton */}
        <Card className="p-4">
          <div className="flex justify-between mb-3">
            <Skeleton className="h-6 w-8 shimmer" />
            <Skeleton className="h-6 w-6 shimmer" />
          </div>
          <Skeleton className="h-4 w-full mb-2 shimmer" />
          <Skeleton className="h-4 w-3/4 shimmer" />
        </Card>

        {/* Friends Skeleton */}
        <Card className="p-4">
          <Skeleton className="h-6 w-24 mb-3 shimmer" />
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center space-x-3 p-2">
                <Skeleton className="h-10 w-10 rounded-full shimmer" />
                <div className="flex-1 space-y-1">
                  <Skeleton className="h-4 w-20 shimmer" />
                  <Skeleton className="h-3 w-16 shimmer" />
                </div>
                <Skeleton className="h-4 w-4 shimmer" />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};