import { Skeleton } from "@/components/ui/skeleton";

export function PostSkeleton() {
  return (
    <div className="w-full flex flex-col border border-[#999999] rounded-xl overflow-hidden shadow-none">
      <div className="bg-[#7695EC]/60 p-6 flex items-center justify-between">
        <Skeleton className="h-7 w-1/2 bg-white/40" />
      </div>
      <div className="p-6 bg-white flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <Skeleton className="h-5 w-24 bg-gray-300" />
          <Skeleton className="h-4 w-20 bg-gray-200" />
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <Skeleton className="h-4 w-full bg-gray-200" />
          <Skeleton className="h-4 w-[90%] bg-gray-200" />
          <Skeleton className="h-4 w-[60%] bg-gray-200" />
        </div>
      </div>
    </div>
  );
}
