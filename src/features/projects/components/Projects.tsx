import ArrowLink from "@/components/ArrowLink";
import { MaskText, Reveal } from "@/components/motion";
import ProjectCard from "./ProjectCard";
import type { ProjectsData } from "../types";

interface ProjectsProps {
  initialData: ProjectsData;
}

export default function Projects({ initialData }: ProjectsProps) {
  const { projects } = initialData;
  const featured = projects.filter((project) => project.isFeatured);
  // The newest 4 (API order) fill a 2 x 2 grid
  const shown = (featured.length ? featured : projects).slice(0, 4);

  return (
    <section
      id="projects"
      className="pt-[clamp(3.5rem,5.5vw,5rem)] pb-[clamp(4rem,7vw,6.5rem)]"
    >
      <div className="page-container">
        <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
          <MaskText as="h2" text="Selected work" className="type-section" />
          <Reveal delay={0.2}>
            <ArrowLink href="/projects">All {projects.length} projects</ArrowLink>
          </Reveal>
        </div>

        <div className="mt-[clamp(2rem,4vw,3.5rem)] grid gap-x-3 gap-y-12 md:grid-cols-2">
          {shown.map((project, index) => (
            <Reveal key={project.title} delay={(index % 2) * 0.1}>
              <ProjectCard project={project} index={index} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
