export default function Loading() {
  return (
    <section className="mx-auto min-h-[60vh] max-w-7xl px-5 py-20 sm:px-8" role="status" aria-label="Loading page">
      <div className="h-6 w-32 animate-pulse rounded bg-emerald-100" />
      <div className="mt-6 h-12 max-w-xl animate-pulse rounded-xl bg-emerald-100" />
      <div className="mt-4 h-6 max-w-2xl animate-pulse rounded bg-slate-100" />
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {[0, 1, 2].map((item) => <div key={item} className="h-56 animate-pulse rounded-3xl bg-slate-100" />)}
      </div>
      <span className="sr-only">Loading page</span>
    </section>
  );
}
