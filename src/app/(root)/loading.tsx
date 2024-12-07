import { Skeleton } from "@/components/ui/skeleton";

export default function loading() {
  return (
    <div>
      <Skeleton className="mt-2 h-[30px] w-[250px] rounded-full" />
      <div className="mt-3 flex w-full items-center justify-between">
        <Skeleton className="h-[23px] w-[170px] rounded-full" />
        <Skeleton className="h-[23px] w-[170px] rounded-full" />
      </div>

      <div className="mt-8 flex w-full gap-6">
        <Skeleton className="h-[216px] w-[300px] rounded-[18px]" />
        <Skeleton className="h-[216px] w-[300px] rounded-[18px]" />
        <Skeleton className="h-[216px] w-[300px] rounded-[18px]" />
        <Skeleton className="h-[216px] w-[300px] rounded-[18px]" />
      </div>
    </div>
  );
}
