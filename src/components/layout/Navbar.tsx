"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";

import { EASE_OUT } from "@/components/motion";
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

function Count({ value }: { value?: number }) {
  if (value === undefined) return null;
  return (
    <sup className="ml-0.5 text-[0.65em] text-foreground/60">
      ({value})
    </sup>
  );
}

export default function Navbar({ counts = {} }: NavbarProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isMenuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setIsMenuOpen(false);
      triggerRef.current?.focus();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-50">
      <nav
        aria-label="Main"
        className="page-container relative flex h-16 items-center justify-between"
      >
        <Link
          href="/"
          className={cn(zone, "-ml-2 text-base tracking-[-0.02em]")}
        >
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

        <button
          ref={triggerRef}
          type="button"
          className={cn(zone, "-mr-2 min-h-11 text-sm/5 md:hidden")}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-nav"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? "Close" : "Menu"}
        </button>
      </nav>

      <AnimatePresence initial={false}>
        {isMenuOpen && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: EASE_OUT }}
            className="border-b bg-background md:hidden"
          >
            <ul className="page-container pt-2 pb-6">
              {NAV_ITEMS.map((item, index) => {
                const isCurrent = item.href === pathname;
                return (
                  <motion.li
                    key={item.name}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.04 * index, duration: 0.5, ease: EASE_OUT }}
                  >
                    <Link
                      href={item.href}
                      aria-current={isCurrent ? "page" : undefined}
                      onClick={() => setIsMenuOpen(false)}
                      className={cn(
                        "flex min-h-12 items-center rounded-sm text-2xl tracking-[-0.02em]",
                        isCurrent ? "text-foreground" : "text-muted-foreground",
                      )}
                    >
                      {item.name}
                      <Count value={counts[item.href]} />
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
