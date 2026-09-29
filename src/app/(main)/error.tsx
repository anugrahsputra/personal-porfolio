"use client";

import { startTransition, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CONTACT_EMAIL, RESUME_PDF_URL } from "@/lib/site";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  // The failure is in a server fetch, so refetch before re-rendering
  const retry = () =>
    startTransition(() => {
      router.refresh();
      reset();
    });

  return (
    <section className="page-container py-[clamp(4rem,8vw,8rem)]">
      <h1 className="type-h1">This page didn&apos;t load</h1>
      <p className="mt-4 max-w-[52ch] text-lg/7 text-foreground/70">
        The API that serves my projects and experience isn&apos;t responding.
        Try again in a moment, or read my resume instead.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button size="lg" onClick={retry}>
          Try again
        </Button>
        <Button size="lg" variant="outline" asChild>
          <a href={RESUME_PDF_URL} target="_blank" rel="noopener noreferrer">
            <Download />
            Download resume
          </a>
        </Button>
      </div>
      <p className="mt-6 text-sm/5 text-foreground/70">
        You can also email me at{" "}
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="rounded-sm text-foreground underline decoration-input-border underline-offset-4 hover:decoration-foreground"
        >
          {CONTACT_EMAIL}
        </a>
        .
      </p>
    </section>
  );
}
