import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-1">
        {/* Category Header Skeleton */}
        <header className="bg-white border-b border-purple-100/50 py-16">
          <div className="container mx-auto px-6 space-y-4">
            <div className="flex gap-4 mb-4">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-4 w-20" />
            </div>
            <Skeleton className="h-16 w-1/3" />
            <Skeleton className="h-10 w-2/3 max-w-2xl" />
          </div>
        </header>

        <div className="container mx-auto px-6 py-12">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Sidebar Skeleton */}
            <aside className="w-full lg:w-64 space-y-10">
              <div className="space-y-10">
                <Skeleton className="h-4 w-32" />
                <div className="space-y-4">
                  <Skeleton className="h-6 w-24" />
                  <div className="space-y-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="flex items-center gap-3">
                        <Skeleton className="w-4 h-4 rounded" />
                        <Skeleton className="h-4 w-20" />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <Skeleton className="h-6 w-24" />
                  <div className="space-y-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="flex items-center gap-3">
                        <Skeleton className="w-4 h-4 rounded" />
                        <Skeleton className="h-4 w-20" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <Skeleton className="h-32 w-full rounded-2xl" />
            </aside>

            {/* Product Grid Skeleton */}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-8 pb-4 border-b border-slate-100">
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-6 w-32" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Skeleton key={i} className="h-[450px] rounded-[2rem]" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
