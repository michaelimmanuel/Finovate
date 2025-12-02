export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-14">
      <div className="h-6 w-28 rounded bg-black/10 animate-pulse" />
      <div className="mt-3 h-10 w-80 rounded bg-black/10 animate-pulse" />
      <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-40 rounded-xl border p-6">
            <div className="h-5 w-3/4 rounded bg-black/10 animate-pulse" />
            <div className="mt-3 h-4 w-full rounded bg-black/10 animate-pulse" />
            <div className="mt-2 h-4 w-2/3 rounded bg-black/10 animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  )
}
