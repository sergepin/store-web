import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Skeleton */}
        <section className="relative min-h-[80vh] flex items-center bg-[#f0f3ff] py-12">
          <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-8">
              <Skeleton className="h-6 w-24 rounded-full" />
              <div className="space-y-4">
                <Skeleton className="h-16 w-3/4 md:h-24" />
                <Skeleton className="h-16 w-1/2 md:h-24" />
              </div>
              <Skeleton className="h-20 w-full max-w-md" />
              <div className="flex gap-4">
                <Skeleton className="h-14 w-40 rounded-full" />
                <Skeleton className="h-14 w-40 rounded-full" />
              </div>
            </div>
            <div className="flex-1 w-full max-w-xl aspect-square">
              <Skeleton className="w-full h-full rounded-3xl" />
            </div>
          </div>
        </section>

        {/* Categories Skeleton */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="mb-16">
              <Skeleton className="h-4 w-32 mb-4" />
              <Skeleton className="h-10 w-64" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-80 rounded-3xl" />
              ))}
            </div>
          </div>
        </section>

        {/* Products Skeleton */}
        <section className="py-24 bg-[#f9f9ff]">
          <div className="container mx-auto px-6">
            <div className="text-center flex flex-col items-center mb-16">
              <Skeleton className="h-4 w-32 mb-4" />
              <Skeleton className="h-10 w-64" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-[400px] rounded-[2rem]" />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
