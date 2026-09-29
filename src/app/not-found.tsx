import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="page-container py-[clamp(4rem,8vw,8rem)]">
      <h1 className="type-h1">Page not found</h1>
      <p className="mt-4 max-w-[52ch] text-lg/7 text-foreground/70">
        Nothing lives at this address. The link may have a typo, or the page
        moved.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button size="lg" asChild>
          <Link href="/">Home</Link>
        </Button>
        <Button size="lg" variant="outline" asChild>
          <Link href="/projects">Projects</Link>
        </Button>
      </div>
    </section>
  );
}
