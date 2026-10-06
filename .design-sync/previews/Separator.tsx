import { Separator } from "downormal-ui";

export function Horizontal() {
  return (
    <div className="max-w-md p-6">
      <p className="text-sm/5">Mobile Engineer</p>
      <p className="mt-1 text-sm/5 text-muted-foreground">PT Bangun Rancang Indonesia Kita (BRIK)</p>
      <Separator className="my-4" />
      <p className="text-sm/5">Mobile Engineer</p>
      <p className="mt-1 text-sm/5 text-muted-foreground">PT. Semesta Arus Teknologi</p>
    </div>
  );
}

export function Vertical() {
  return (
    <div className="p-6">
      <div className="flex h-5 items-center gap-3 text-sm/5 text-foreground/70">
        <span>Flutter</span>
        <Separator orientation="vertical" />
        <span>Kotlin Multiplatform</span>
        <Separator orientation="vertical" />
        <span>South Jakarta, Indonesia</span>
      </div>
    </div>
  );
}
