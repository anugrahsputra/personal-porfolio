# Full-screen mobile menu Implementation Plan

> **For agentic workers:** Execute this plan inline with superpowers:executing-plans. Do not dispatch subagents. Steps use checkbox (`- [ ]`) syntax for tracking.

**Effort:** high

**Goal:** Replace the mobile dropdown menu with a full-screen panel that slides in from the right, in the style of matthieugivelet.com's mobile menu.

**Architecture:** The panel is a Radix Dialog (`@radix-ui/react-dialog`, already installed and used by `src/components/ui/dialog.tsx`). Radix gives the focus trap, Escape to close, scroll lock and `aria-modal`. The scroll lock lives in `DialogPrimitive.Overlay`, so the menu renders a transparent overlay even though the panel covers the screen. The slide uses the `tw-animate-css` classes that shadcn's Sheet uses. The staggered link rise uses `motion`, which the dropdown already uses. Only `src/components/layout/Navbar.tsx` changes.

**Tech Stack:** Next.js 15, React 19, `@radix-ui/react-dialog`, `motion/react`, `tw-animate-css`, Tailwind CSS v4, bun.

**Spec:** No spec file. The design was approved in chat on 2026-09-30 and is copied under "Design" below.

**Starts from:** the tree after `2026-09-30-type-and-link-details.md` is committed. That plan adds the `link-line` utility and removes all `font-*` weight classes. If `link-line` is missing from `src/app/globals.css`, stop and reply `plan-wrong`.

## Design

- Below `md` (768px) the header shows the name and a "Menu" button, as now.
- "Menu" opens a panel that covers the whole screen, with the page background, sliding in from the right over 0.7s with `cubic-bezier(0.18, 0.66, 0.18, 1)`. Closing slides it back out over 0.5s.
- The panel's top row repeats the header: the name on the left, and a "Close" button on the right in the same box and position as "Menu". The word "Close" rises into its box, so the button looks like it changed label.
- Under it, `[ Navigation ]` with a hairline that draws in, then all six `NAV_ITEMS` at `clamp(1.5rem, 15vw, 4rem)` with their counts in small type at the top right. Links rise from a mask one after another.
- "Get in touch" with an arrow sits at the bottom of the panel.
- Tapping any link closes the panel. Escape closes it and returns focus to "Menu". If the viewport widens to `md` or more while it's open, it closes.
- With reduced motion, the panel appears and disappears with no slide and the links appear in place.

## Global Constraints

- No doc comments. Do not add JSDoc or `//` comments that describe a function, component, prop or constant. Leave existing comments exactly as they are.
- No test files. The repo has no test framework, and AGENTS.md forbids adding one.
- No new dependencies and no new color values.
- Git is read-only for you. No commit, stash, checkout, reset or restore.
- Match the surrounding code style: double quotes, `cn()` for conditional classes, `@/` imports.
- Every animation must respect `prefers-reduced-motion`.
- Touch only `src/components/layout/Navbar.tsx`.

## Review Focus

1. On `/`, tapping "About", "Videos" or "Contact" in the menu closes it and the page scrolls to that section. The Radix scroll lock must not swallow the jump.
2. On `/projects`, tapping "Contact" goes to `/` and lands on the contact section.
3. Escape closes the panel and focus lands on the "Menu" button.
4. A phone in landscape (about 390px tall). The panel scrolls and "Get in touch" is reachable.
5. Rotating a tablet from portrait (under 768px) to landscape (768px or more) with the menu open. The panel closes and the page scrolls again.

---

### Task 1: Rewrite the Navbar mobile menu

**Files:**
- Modify: `src/components/layout/Navbar.tsx` (whole file)

**Interfaces:**
- Consumes: `NAV_ITEMS` from `@/components/layout/navItems` (`{ name: string; href: string }[]`), `EASE_OUT` and `RevealLine` from `@/components/motion`, `SectionLabel` from `@/components/SectionLabel` (props `children`, `as?: "h2" | "h3" | "p"`, `className?`), and the `link-line` utility.
- Produces: nothing new. `Navbar` keeps its props, `{ counts?: Record<string, number | undefined> }`.

- [ ] **Step 1: Confirm the starting state**

Run: `rtk proxy grep -c "@utility link-line" src/app/globals.css`
Expected: `1`. If it prints `0`, stop and reply `plan-wrong`.

Run: `rtk proxy grep -nE "font-(medium|semibold|bold)" src/components/layout/Navbar.tsx`
Expected: no output.

- [ ] **Step 2: Replace the file**

Write `src/components/layout/Navbar.tsx` as:

```tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

import SectionLabel from "@/components/SectionLabel";
import { EASE_OUT, RevealLine } from "@/components/motion";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/components/layout/navItems";

interface NavbarProps {
  counts?: Record<string, number | undefined>;
}

// The name links home and "Get in touch" covers Contact, so the middle keeps the rest
const CENTER_ITEMS = NAV_ITEMS.filter(
  (item) => item.name !== "Home" && item.name !== "Contact",
);

// Each zone sits on its own black box, so it stays readable over photos as the page scrolls under it
const zone = "rounded-sm bg-background px-2 py-1";

const nameClass = cn(zone, "-ml-2 text-base tracking-[-0.02em]");
const menuButtonClass = cn(zone, "-mr-2 min-h-11 text-sm/5");

function Count({ value, className }: { value?: number; className?: string }) {
  if (value === undefined) return null;
  return (
    <sup className={cn("ml-0.5 text-[0.65em] text-foreground/60", className)}>
      ({value})
    </sup>
  );
}

export default function Navbar({ counts = {} }: NavbarProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 48rem)");
    const onChange = () => {
      if (desktop.matches) setIsMenuOpen(false);
    };
    desktop.addEventListener("change", onChange);
    return () => desktop.removeEventListener("change", onChange);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      <nav
        aria-label="Main"
        className="page-container relative flex h-16 items-center justify-between"
      >
        <Link href="/" className={nameClass}>
          Anugrah Surya Putra
        </Link>

        <ul
          className={cn(
            zone,
            "absolute left-1/2 hidden -translate-x-1/2 items-center gap-5 md:flex",
          )}
        >
          {CENTER_ITEMS.map((item) => {
            const isCurrent = item.href === pathname;
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  aria-current={isCurrent ? "page" : undefined}
                  className={cn(
                    "group rounded-sm text-sm/5 transition-colors hover:text-foreground",
                    isCurrent ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  <span className="link-line">{item.name}</span>
                  <Count value={counts[item.href]} />
                </Link>
              </li>
            );
          })}
        </ul>

        <Link
          href="/#contact"
          className={cn(zone, "group -mr-2 hidden text-sm/5 md:block")}
        >
          <span className="link-line">Get in touch</span>
        </Link>

        <DialogPrimitive.Root open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <DialogPrimitive.Trigger className={cn(menuButtonClass, "md:hidden")}>
            Menu
          </DialogPrimitive.Trigger>
          <DialogPrimitive.Portal>
            <DialogPrimitive.Overlay className="fixed inset-0 z-50 md:hidden" />
            <DialogPrimitive.Content
              aria-describedby={undefined}
              className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-background ease-[cubic-bezier(0.18,0.66,0.18,1)] motion-safe:data-[state=closed]:animate-out motion-safe:data-[state=closed]:slide-out-to-right motion-safe:data-[state=closed]:duration-500 motion-safe:data-[state=open]:animate-in motion-safe:data-[state=open]:slide-in-from-right motion-safe:data-[state=open]:duration-700 md:hidden"
            >
              <DialogPrimitive.Title className="sr-only">Menu</DialogPrimitive.Title>

              <div className="page-container flex h-16 shrink-0 items-center justify-between">
                <Link href="/" onClick={closeMenu} className={nameClass}>
                  Anugrah Surya Putra
                </Link>
                <DialogPrimitive.Close className={menuButtonClass}>
                  <span className="block overflow-hidden">
                    <motion.span
                      className="block"
                      initial={{ y: "105%" }}
                      animate={{ y: 0 }}
                      transition={{ delay: 0.3, duration: 0.6, ease: EASE_OUT }}
                    >
                      Close
                    </motion.span>
                  </span>
                </DialogPrimitive.Close>
              </div>

              <div className="page-container flex flex-1 flex-col justify-between gap-12 pt-10 pb-10">
                <div>
                  <SectionLabel as="p">Navigation</SectionLabel>
                  <RevealLine className="mt-4" />
                  <ul className="mt-8">
                    {NAV_ITEMS.map((item, index) => {
                      const isCurrent = item.href === pathname;
                      return (
                        <li key={item.name} className="overflow-hidden">
                          <motion.div
                            initial={{ y: "105%" }}
                            animate={{ y: 0 }}
                            transition={{
                              delay: 0.15 + 0.05 * index,
                              duration: 0.8,
                              ease: EASE_OUT,
                            }}
                          >
                            <Link
                              href={item.href}
                              aria-current={isCurrent ? "page" : undefined}
                              onClick={closeMenu}
                              className={cn(
                                "flex items-start rounded-sm text-[clamp(1.5rem,15vw,4rem)] leading-[1.1] tracking-[-0.04em]",
                                isCurrent ? "text-foreground" : "text-muted-foreground",
                              )}
                            >
                              {item.name}
                              <Count
                                value={counts[item.href]}
                                className="mt-[0.35em] ml-1 text-[0.35em]"
                              />
                            </Link>
                          </motion.div>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <Link
                  href="/#contact"
                  onClick={closeMenu}
                  className="group inline-flex items-center gap-3 self-start rounded-sm text-[clamp(1.25rem,7vw,2rem)] tracking-[-0.02em]"
                >
                  <ArrowRight aria-hidden className="size-[0.8em]" />
                  <span className="link-line">Get in touch</span>
                </Link>
              </div>
            </DialogPrimitive.Content>
          </DialogPrimitive.Portal>
        </DialogPrimitive.Root>
      </nav>
    </header>
  );
}
```

The two comments above `CENTER_ITEMS` and `zone` already exist in the file. Keep them. Add no others.

- [ ] **Step 3: Confirm the old dropdown is gone**

Run: `rtk proxy grep -nE "AnimatePresence|triggerRef|mobile-nav|useRef" src/components/layout/Navbar.tsx`
Expected: no output.

- [ ] **Step 4: Lint, types, build**

Run: `bun run lint`
Expected: no errors.

Run: `bunx tsc --noEmit`
Expected: no output.

Run: `bun run build`
Expected: success. If it fails because the projects API or network is unreachable, paste the error in your report and continue.

- [ ] **Step 5: Behavior check**

If you can drive a browser (the `terminal-browser` skill), run `bun dev`, set the viewport to 390x844 and check:

1. "Menu" opens the panel from the right. The links rise one after another and the hairline draws in.
2. Tab cycles only inside the panel. Escape closes it and focus is on "Menu".
3. On `/`, tapping "About" closes the panel and the page scrolls to `#about`. Repeat for "Videos" and "Contact".
4. On `/projects`, tapping "Contact" lands on `/#contact`.
5. At 844x390 (landscape), the panel scrolls and "Get in touch" is reachable.
6. Open the menu at 390px, resize to 1024px. The panel is gone and the page scrolls with the wheel.
7. With reduced motion emulated, "Menu" shows the panel at once with no slide, and "Close" removes it at once.

Put screenshot paths and the result of each check in your report. If you can't drive a browser, say so.

- [ ] **Step 6: Report**

Write `.handoff/2026-09-30-fullscreen-mobile-menu/executor.md` with the list of files you changed and the real output of every command above.
