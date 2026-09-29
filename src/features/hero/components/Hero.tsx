"use client";

import { useRef } from "react";
import { Download } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";

import { Button } from "@/components/ui/button";
import { MaskText, Reveal } from "@/components/motion";
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
  const textY = useTransform(scrollYProgress, [0, 0.6], [0, -48]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // Static values keep the server and reduced-motion renders identical
  const reduceMotion = useReducedMotion();

  return (
    <section id="home" ref={ref} className="relative overflow-hidden">
      <motion.div
        style={{
          y: reduceMotion ? 0 : textY,
          opacity: reduceMotion ? 1 : textOpacity,
        }}
        className="page-container relative flex flex-col pt-[clamp(6rem,13vw,12rem)] pb-[clamp(2.5rem,5vw,4.5rem)]"
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
            className="max-w-[36ch] indent-[clamp(2.5rem,3.5vw,3rem)] text-[clamp(1.125rem,1.6vw,1.5rem)] leading-[1.3] tracking-[-0.02em] text-foreground/80"
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
