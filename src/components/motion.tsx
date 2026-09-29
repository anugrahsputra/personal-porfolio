"use client";

import { Fragment } from "react";
import { motion, MotionConfig, type HTMLMotionProps, type Variants } from "motion/react";

import { cn } from "@/lib/utils";

// Fast start, long soft landing
export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

// Fires once, when the element is 10% into the viewport
const VIEWPORT = { once: true, margin: "0px 0px -10% 0px" } as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_OUT, delay },
  }),
};

const rise: Variants = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 0.9, ease: EASE_OUT } },
};

export function MotionProvider({ children }: { children: React.ReactNode }) {
  // With reduced motion on, Motion skips transforms: text and cards appear in place
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

interface RevealProps extends HTMLMotionProps<"div"> {
  delay?: number;
  as?: "div" | "li" | "article";
  // Play on mount instead of on scroll, for content that starts on screen
  immediate?: boolean;
}

export function Reveal({
  delay = 0,
  as = "div",
  immediate = false,
  ...props
}: RevealProps) {
  const Component = motion[as] as typeof motion.div;
  return (
    <Component
      variants={fadeUp}
      custom={delay}
      initial="hidden"
      {...(immediate
        ? { animate: "show" }
        : { whileInView: "show", viewport: VIEWPORT })}
      {...props}
    />
  );
}

interface MaskTextProps {
  text: string;
  by?: "word" | "letter";
  as?: "h1" | "h2" | "p" | "span";
  delay?: number;
  className?: string;
  // Play on mount instead of on scroll, for text that starts on screen
  immediate?: boolean;
}

// Each word (or letter) rises from behind its own mask. Screen readers get the plain text.
export function MaskText({
  text,
  by = "word",
  as = "span",
  delay = 0,
  className,
  immediate = false,
}: MaskTextProps) {
  const Component = motion[as] as typeof motion.span;
  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: by === "letter" ? 0.03 : 0.035,
        delayChildren: delay,
      },
    },
  };

  return (
    <Component
      className={className}
      variants={container}
      initial="hidden"
      {...(immediate
        ? { animate: "show" }
        : { whileInView: "show", viewport: VIEWPORT })}
    >
      <span className="sr-only">{text}</span>
      {text.split(" ").map((word, w) => (
        <Fragment key={w}>
          {w > 0 && " "}
          <span aria-hidden className="inline-block whitespace-nowrap">
            {(by === "letter" ? [...word] : [word]).map((part, p) => (
              // pb/-mb leave room for descenders inside the mask
              <span
                key={p}
                className="-mb-[0.15em] inline-block overflow-hidden pb-[0.15em] align-top"
              >
                <motion.span className="inline-block" variants={rise}>
                  {part}
                </motion.span>
              </span>
            ))}
          </span>
        </Fragment>
      ))}
    </Component>
  );
}

// A hairline divider that draws in from the left
export function RevealLine({ className }: { className?: string }) {
  return (
    <motion.div
      aria-hidden
      className={cn("h-px origin-left bg-border", className)}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: EASE_OUT }}
    />
  );
}

interface RevealImageProps {
  className?: string;
  children: React.ReactNode;
}

// Wipes the image up from the bottom while it settles from a slight zoom
export function RevealImage({ className, children }: RevealImageProps) {
  return (
    <motion.span
      className={cn("block overflow-hidden", className)}
      initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={VIEWPORT}
      transition={{ duration: 1.1, ease: EASE_OUT }}
    >
      <motion.span
        className="relative block size-full"
        initial={{ scale: 1.15 }}
        whileInView={{ scale: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: 1.4, ease: EASE_OUT }}
      >
        {children}
      </motion.span>
    </motion.span>
  );
}
