export function TrekCardSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="overflow-hidden rounded-[2.5rem] border border-slate-100 bg-white p-3 shadow-sm"
    >
      <div className="aspect-[4/3] animate-pulse rounded-[2rem] bg-slate-200" />
      <div className="space-y-5 p-5 pt-6">
        <div className="h-7 w-3/4 animate-pulse rounded-lg bg-slate-200" />
        <div className="grid grid-cols-2 gap-3">
          <div className="h-4 animate-pulse rounded bg-slate-100" />
          <div className="h-4 animate-pulse rounded bg-slate-100" />
        </div>
        <div className="h-12 animate-pulse rounded-2xl bg-slate-100" />
        <div className="h-20 animate-pulse rounded-[2rem] bg-slate-100" />
      </div>
    </div>
  );
}
