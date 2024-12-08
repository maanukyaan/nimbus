import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

export default function loading() {
  return (
    <main className="flex h-screen">
      <aside className="sidebar justify-between">
        <div>
          <Image
            src="/icons/logo-long.svg"
            alt="Logo"
            width={512}
            height={110}
            className="hidden h-auto lg:block"
            quality={100}
          />

          <div className="mt-9 flex flex-col gap-6">
            <Skeleton className="h-[52px] w-full rounded-full" />
            <Skeleton className="h-[52px] w-full rounded-full" />
            <Skeleton className="h-[52px] w-full rounded-full" />
            <Skeleton className="h-[52px] w-full rounded-full" />
            <Skeleton className="h-[52px] w-full rounded-full" />
          </div>
        </div>
        <div>
          <Skeleton className="//bg-[#ed6c6f1a] h-[142px] w-full rounded-[30px]" />
          <Skeleton className="mt-4 h-[64px] w-full rounded-full" />
        </div>
      </aside>

      <section className="flex h-full flex-1 flex-col pb-[28px] pr-[28px]">
        <div className="h-[108px] w-full py-7">
          <div className="flex h-full w-full items-center justify-between">
            <Skeleton className="h-full w-[300px] rounded-3xl" />
            <div className="flex h-full items-center gap-4">
              <Skeleton className="h-full w-[245px] rounded-3xl" />
              <Skeleton className="h-full w-[54px] rounded-full" />
            </div>
          </div>
        </div>

        <Skeleton className="h-full flex-1 rounded-[30px]" />
      </section>
    </main>
  );
}
