"use client";

import { useRef } from "react";
import Image from "next/image";
import { Download } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

import { Button } from "@/components/ui/button";
import { EASE_OUT, MaskText, Reveal } from "@/components/motion";
import { RESUME_PDF_URL } from "@/lib/site";
import { ResumeData } from "@/features/resume/types";

interface HeroProps {
  initialData: ResumeData;
}

export default function Hero({ initialData }: HeroProps) {
  // The first sentence of the summary goes here, About gets the rest
  const intro = initialData.summary.split(/(?<=\.)\s+/)[0];

  // 0 at the top of the page, 1 once the hero has scrolled out
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // The spring smooths the photo so the parallax doesn't feel glued to the wheel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });
  const photoY = useTransform(smoothProgress, [0, 1], ["0%", "25%"]);
  const photoOpacity = useTransform(smoothProgress, [0, 1], [1, 0.2]);
  const textY = useTransform(scrollYProgress, [0, 0.6], [0, -48]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // Static values keep the server and reduced-motion renders identical
  const reduceMotion = useReducedMotion();

  return (
    // -mt-16 runs the photo up under the translucent header
    <section id="home" ref={ref} className="relative -mt-16 overflow-hidden">
      {/* Mobile: full width, fading out at the bottom by 84% of its height.
          Desktop: right half of the viewport, fading out to the left, so the text column sits on solid black */}
      <motion.div
        style={{
          y: reduceMotion ? 0 : photoY,
          opacity: reduceMotion ? 1 : photoOpacity,
        }}
        className="absolute inset-x-0 top-0 aspect-[4/5] mask-b-from-45% mask-b-to-84% md:inset-y-0 md:left-auto md:aspect-auto md:w-1/2 md:mask-l-from-50% md:mask-b-from-80% md:mask-b-to-100%"
      >
        <motion.div
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: EASE_OUT }}
          className="absolute inset-0"
        >
          <Image
            src="/images/photo/photo.png"
            alt={`Portrait of ${initialData.name}`}
            fill
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover object-top grayscale"
          />
        </motion.div>
      </motion.div>

      {/* pt-[105vw] starts the text at the photo's 84% line on mobile (4:5 photo, 1.25 x 0.84).
          On desktop the name sits low, across the photo's darker lower half, clear of the face. */}
      <motion.div
        style={{
          y: reduceMotion ? 0 : textY,
          opacity: reduceMotion ? 1 : textOpacity,
        }}
        className="page-container relative flex flex-col pt-[105vw] pb-[clamp(2.5rem,5vw,4.5rem)] md:min-h-svh md:justify-end md:pt-32"
      >
        <MaskText
          as="h1"
          by="letter"
          text={initialData.name}
          immediate
          delay={0.3}
          className="type-hero-name md:whitespace-nowrap"
        />
        <div className="mt-[clamp(1.5rem,3vw,2.5rem)] flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <MaskText
            as="p"
            text={intro}
            immediate
            delay={0.8}
            className="max-w-[36ch] indent-[2.5em] text-[clamp(1.125rem,1.6vw,1.5rem)] leading-[1.3] tracking-[-0.02em] text-foreground/80"
          />
          <Reveal immediate delay={1.1} className="flex shrink-0 flex-wrap gap-3">
            <Button size="lg" asChild>
              <a href={`mailto:${initialData.email}`}>Email me</a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href={RESUME_PDF_URL} target="_blank" rel="noopener noreferrer">
                <Download />
                Download resume
              </a>
            </Button>
          </Reveal>
        </div>
      </motion.div>
    </section>
  );
}
