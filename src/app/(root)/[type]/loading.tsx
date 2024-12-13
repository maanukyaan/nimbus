import { Skeleton } from "@/components/ui/skeleton";

export default function loading() {
  return (
    <div>
      <Skeleton className="mt-2 h-[35px] w-[300px] rounded-full" />
      <div className="mt-3 flex w-full items-center justify-between">
        <Skeleton className="h-[23px] w-[230px] rounded-full" />
        <Skeleton className="h-[42px] w-[350px] rounded-full" />
      </div>

      <div className="mt-8 flex w-full flex-col gap-6 lg:flex-row">
        <Skeleton className="h-[216px] w-full rounded-[18px] lg:w-[300px]" />
        <Skeleton className="h-[216px] w-full rounded-[18px] lg:w-[300px]" />
        <Skeleton className="h-[216px] w-full rounded-[18px] lg:w-[300px]" />
      </div>
    </div>
  );
}
