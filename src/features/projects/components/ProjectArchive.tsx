import Image from "next/image";

import SectionLabel from "@/components/SectionLabel";
import { Reveal } from "@/components/motion";
import { cn } from "@/lib/utils";
import { getProjectContext, hasMedia, type ProjectContext } from "../api";
import type { Project } from "../types";
import ProjectDialog from "./ProjectDialog";

interface ProjectArchiveProps {
  projects: Project[];
}

const CONTEXT_LABELS: Record<ProjectContext, string> = {
  work: "Work",
  personal: "Personal",
  academic: "Academic",
};

const COLUMNS = "md:grid-cols-[2fr_1fr_1fr] md:items-baseline md:gap-x-6";
const ROW_TEXT =
  "md:text-[clamp(1.125rem,1.4vw,1.375rem)] md:leading-tight md:tracking-[-0.02em] md:text-foreground";
const META_TEXT = cn("text-sm/5 text-foreground/60", ROW_TEXT);

function detail(project: Project): string {
  return [CONTEXT_LABELS[getProjectContext(project)], project.techStacks[0]]
    .filter(Boolean)
    .join(" · ");
}

export default function ProjectArchive({ projects }: ProjectArchiveProps) {
  return (
    <section className="page-container pb-[clamp(4rem,8vw,8rem)]">
      <div aria-hidden className={cn("hidden border-b pb-4 md:grid", COLUMNS)}>
        <SectionLabel as="p">Name</SectionLabel>
        <SectionLabel as="p">Detail</SectionLabel>
        <SectionLabel as="p" className="text-right">
          Date
        </SectionLabel>
      </div>

      <ul className="group/list">
        {projects.map((project) => (
          <Reveal as="li" key={project.title}>
            <ProjectDialog project={project}>
              <button
                type="button"
                className={cn(
                  "group/row relative grid w-full grid-cols-[minmax(0,1fr)_auto] gap-x-4 gap-y-1 border-b py-4 text-left md:py-3",
                  "transition-opacity duration-700 ease-out motion-reduce:transition-none md:group-hover/list:[&:not(:hover)]:opacity-50",
                  COLUMNS,
                )}
              >
                <span
                  className={cn(
                    "col-span-2 text-xl/7 tracking-[-0.02em] md:col-span-1",
                    ROW_TEXT,
                  )}
                >
                  {project.title}
                </span>
                <span className={META_TEXT}>{detail(project)}</span>
                <span className={cn("text-right", META_TEXT)}>{project.period}</span>

                {hasMedia(project) && (
                  <span
                    aria-hidden
                    className="pointer-events-none absolute top-1/2 left-[40%] z-10 hidden aspect-[16/10] w-[clamp(14rem,22vw,20rem)] -translate-y-1/2 overflow-hidden rounded-md opacity-0 transition-opacity duration-700 ease-out group-hover/row:opacity-100 group-focus-visible/row:opacity-100 motion-reduce:transition-none lg:block"
                  >
                    <Image
                      src={project.image}
                      alt=""
                      fill
                      sizes="22vw"
                      className="scale-110 object-cover transition-transform duration-700 ease-out group-hover/row:scale-100 group-focus-visible/row:scale-100 motion-reduce:transition-none"
                    />
                  </span>
                )}
              </button>
            </ProjectDialog>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
