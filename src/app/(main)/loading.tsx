// Static blocks in the home page's layout; no pulse, since motion is kept to hover states
const block = "rounded-md bg-accent";

export default function Loading() {
  return (
    <div aria-busy="true" aria-label="Loading">
      <div className="page-container grid items-end gap-x-[clamp(2rem,4vw,4rem)] gap-y-8 pb-[clamp(3.5rem,6.5vw,6.5rem)] md:grid-cols-[minmax(0,1fr)_minmax(0,42%)]">
        <div className={`${block} aspect-[4/5] rounded-xl md:order-2`} />
        <div className="space-y-4 md:order-1">
          <div className={`${block} h-12 w-4/5`} />
          <div className={`${block} h-5 w-full max-w-[38ch]`} />
          <div className={`${block} h-5 w-2/3 max-w-[38ch]`} />
          <div className="flex gap-3 pt-4">
            <div className={`${block} h-10 w-28`} />
            <div className={`${block} h-10 w-44`} />
          </div>
        </div>
      </div>

      <div className="border-t py-[clamp(3.5rem,6.5vw,6rem)]">
        <div className="page-container flex flex-col gap-x-[clamp(2rem,4vw,4rem)] gap-y-4 md:flex-row">
          <div className={`${block} h-7 w-36 shrink-0 md:basis-[240px] lg:basis-[300px]`} />
          <div className={`${block} h-48 flex-1 rounded-xl`} />
        </div>
      </div>

      <div className="page-container grid gap-4 border-t py-[clamp(3.5rem,5.5vw,5rem)] md:grid-cols-2 lg:grid-cols-3">
        <div className={`${block} h-80 rounded-xl md:col-span-2 lg:col-span-3`} />
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className={`${block} h-72 rounded-xl`} />
        ))}
      </div>
    </div>
  );
}
