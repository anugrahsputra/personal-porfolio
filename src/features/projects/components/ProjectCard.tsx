import Image from "next/image";
import { ArrowRight, Lock } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { RevealImage } from "@/components/motion";
import { hasMedia } from "../api";
import type { Project } from "../types";
import ProjectDialog from "./ProjectDialog";

interface ProjectCardProps {
  project: Project;
  // Position in its grid, shown as 01, 02...
  index: number;
}

// The whole card opens a dialog with the full description, stack and links
export default function ProjectCard({ project, index }: ProjectCardProps) {
  const showMedia = hasMedia(project);
  const number = String(index + 1).padStart(2, "0");
  const firstSentence = project.description.split(/(?<=\.)\s+/)[0];

  return (
    <ProjectDialog project={project}>
      <button type="button" className="group block w-full rounded-md text-left">
        <span className="relative block aspect-[16/10] overflow-hidden rounded-md bg-card">
          {showMedia ? (
            <RevealImage className="absolute inset-0">
              <Image
                src={project.image}
                alt=""
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            </RevealImage>
          ) : (
            // Same shape as the images, so the grid keeps its rhythm
            <span className="absolute inset-0 flex flex-col justify-between rounded-md border p-[clamp(1.25rem,2.5vw,2rem)] transition-colors duration-500 group-hover:bg-accent">
              {project.isNDA ? (
                <Badge variant="outline" className="self-start">
                  <Lock />
                  Under NDA
                </Badge>
              ) : (
                <span />
              )}
              <span className="line-clamp-4 max-w-[28ch] text-[clamp(1.25rem,2vw,1.75rem)] leading-[1.25] tracking-[-0.02em] text-foreground/90">
                {firstSentence}
              </span>
            </span>
          )}
        </span>

        <span className="mt-3 flex items-baseline gap-2">
          <span className="text-xs/4 text-foreground/60">{number}</span>
          <span className="text-[clamp(1.125rem,1.4vw,1.375rem)] leading-tight tracking-[-0.02em]">
            {project.title}
          </span>
          <ArrowRight
            aria-hidden
            className="size-4 shrink-0 self-center -translate-x-1 opacity-0 transition duration-700 ease-out group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 motion-reduce:transition-none"
          />
        </span>
        <span className="mt-1 block text-sm/5 text-foreground/60">
          {project.period} · {project.techStacks.slice(0, 3).join(", ")}
        </span>
      </button>
    </ProjectDialog>
  );
}
