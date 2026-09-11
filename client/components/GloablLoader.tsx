import { Skeleton } from "@/components/ui/skeleton";

export default function GenericLoading() {
  return (
    <div className="container mx-auto px-4 md:px-8 max-w-7xl animate-in fade-in-50 duration-200">
      <div className="space-y-3 mb-10">
        <Skeleton className="h-8 w-1/4 rounded-md" />
        <Skeleton className="h-4 w-1/2 rounded-md" />
      </div>

      <div className="space-y-4">
        {Array.from({ length: 6 }).map((_, idx) => (
          <Skeleton
            key={idx}
            className="h-16 w-full rounded-lg"
            style={{ opacity: 1 - idx * 0.08 }}
          />
        ))}
      </div>
    </div>
  );
}