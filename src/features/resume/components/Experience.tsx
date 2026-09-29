import ArrowLink from "@/components/ArrowLink";
import SectionLabel from "@/components/SectionLabel";
import { Reveal, RevealLine } from "@/components/motion";
import type { ResumeData } from "../types";

interface ExperienceProps {
  initialData: ResumeData;
}

export default function Experience({ initialData }: ExperienceProps) {
  return (
    <section id="experience" className="py-[clamp(3.5rem,6.5vw,6rem)]">
      <div className="page-container">
        <RevealLine />
        <div className="grid gap-y-8 pt-6 md:grid-cols-2 md:gap-x-[clamp(2rem,4vw,4rem)]">
          <Reveal className="flex flex-col items-start gap-3 md:sticky md:top-24 md:self-start">
            <SectionLabel>Experience</SectionLabel>
            <ArrowLink href="/experience">Full experience</ArrowLink>
          </Reveal>

          <ol>
            {initialData.experience.map((experience, index) => {
              const isCurrent =
                index === 0 && experience.period.endsWith("Present");
              return (
                <Reveal
                  as="li"
                  key={`${experience.company}-${experience.period}`}
                  className="grid grid-cols-[2.5rem_minmax(0,1fr)] border-t py-8 first:border-t-0 first:pt-0"
                >
                  <span className="pt-2 text-xs/4 font-medium text-foreground/60">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                      <h3
                        className={
                          isCurrent
                            ? "text-2xl/[30px] font-semibold tracking-[-0.02em]"
                            : "type-h3"
                        }
                      >
                        {experience.position}
                      </h3>
                      <p className="shrink-0 text-xs/4 font-medium text-foreground/60">
                        {experience.period}
                      </p>
                    </div>
                    <p className="mt-1 text-sm/5 text-muted-foreground">
                      {experience.company} · {experience.location}
                    </p>
                    <ul className="mt-4 max-w-[65ch] list-disc space-y-2 pl-5 text-base/[26px] text-pretty text-foreground/70 marker:text-foreground/40">
                      {experience.responsibilities.slice(0, 2).map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
