import { Skeleton } from "@/components/ui/skeleton";

export default function loading() {
  return (
    <div className="dashboard-container">
      <section>
        <Skeleton className="h-[218px] w-full rounded-[18px]" />

        <ul className="dashboard-summary-list !pt-5">
          {[1, 2, 3, 4].map((i) => (
            <li key={i}>
              <Skeleton className="h-[157px] w-full rounded-[20px]" />
            </li>
          ))}
        </ul>
      </section>

      <section className="dashboard-recent-files">
        <Skeleton className="h-8 w-[500px] rounded-full" />

        <ul className="mt-5 flex flex-col gap-5">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-[52px] w-full rounded-[12px]" />
          ))}
        </ul>
      </section>
    </div>
  );
}
