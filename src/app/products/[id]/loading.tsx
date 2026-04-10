import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-1">
        {/* Breadcrumbs Skeleton */}
        <div className="container mx-auto px-6 py-8 flex gap-4">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-32" />
        </div>

        <section className="container mx-auto px-6 pb-24">
          <div className="flex flex-col lg:flex-row gap-16">
            {/* Gallery Skeleton */}
            <div className="flex-1 space-y-6">
              <Skeleton className="aspect-square w-full rounded-[2.5rem]" />
              <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="aspect-square w-full rounded-2xl" />
                ))}
              </div>
            </div>

            {/* Info Skeleton */}
            <div className="flex-1 space-y-10">
              <div className="space-y-6">
                <Skeleton className="h-8 w-40 rounded-full" />
                <Skeleton className="h-16 w-full max-w-lg" />
                <Skeleton className="h-10 w-32" />
              </div>

              <div className="space-y-4">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-3/4" />
              </div>

              {/* Technical Features Grid Skeleton */}
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-20 w-full rounded-2xl" />
                ))}
              </div>

              {/* Actions Skeleton */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Skeleton className="h-16 flex-1 rounded-full" />
                <Skeleton className="h-16 w-16 rounded-full" />
              </div>

              {/* Specifications Skeleton */}
              <div className="pt-10 border-t border-slate-100 space-y-6">
                <Skeleton className="h-4 w-40" />
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex justify-between items-center py-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
