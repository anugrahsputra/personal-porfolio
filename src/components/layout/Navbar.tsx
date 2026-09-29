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
              className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-background ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:data-[state=closed]:animate-out motion-safe:data-[state=closed]:slide-out-to-right motion-safe:data-[state=closed]:duration-400 motion-safe:data-[state=open]:animate-in motion-safe:data-[state=open]:slide-in-from-right motion-safe:data-[state=open]:duration-600 md:hidden"
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
                              duration: 0.6,
                              ease: EASE_OUT,
                            }}
                          >
                            <Link
                              href={item.href}
                              aria-current={isCurrent ? "page" : undefined}
                              onClick={closeMenu}
                              className={cn(
                                "flex items-start rounded-sm text-[clamp(2.5rem,13vw,3.75rem)] leading-[1.1] tracking-[-0.04em]",
                                isCurrent ? "text-foreground" : "text-muted-foreground",
                              )}
                            >
                              {item.name}
                              <Count
                                value={counts[item.href]}
                                className="static mt-[0.35em] ml-1 text-[0.35em] leading-none"
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
