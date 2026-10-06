"use client";

import { useLayoutEffect } from "react";

import { MotionProvider } from "../../src/components/motion";

interface SiteRootProps {
  children: React.ReactNode;
}

export function SiteRoot({ children }: SiteRootProps) {
  useLayoutEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <div className="dark bg-background font-sans text-foreground antialiased">
      <MotionProvider>{children}</MotionProvider>
    </div>
  );
}
