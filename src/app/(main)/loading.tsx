export default function Loading() {
  return (
    <div className="container mx-auto space-y-8 px-4 py-8">
      <div className="h-8 w-48 animate-pulse rounded bg-muted" />
      <div className="h-4 w-96 max-w-full animate-pulse rounded bg-muted" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="h-64 animate-pulse rounded-lg bg-muted"
          />
        ))}
      </div>
    </div>
  );
}
