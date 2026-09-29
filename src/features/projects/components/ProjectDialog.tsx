import { Lock } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getProjectContext } from "../api";
import type { Project } from "../types";

interface ProjectDialogProps {
  project: Project;
  children: React.ReactNode;
}

export default function ProjectDialog({ project, children }: ProjectDialogProps) {
  const isWork = getProjectContext(project) === "work";
  const liveLabel = project.liveDemo?.includes("/releases")
    ? "Releases"
    : "Live demo";

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="max-h-[85svh] overflow-y-auto">
        <DialogHeader className="pr-10 text-left">
          <DialogTitle className="text-2xl/[30px] tracking-[-0.02em]">
            {project.title}
          </DialogTitle>
          <DialogDescription className="text-xs/4 text-foreground/60">
            {isWork ? `${project.company} · ${project.period}` : project.period}
          </DialogDescription>
        </DialogHeader>
        {project.isNDA && (
          <p className="flex gap-2 text-sm/[22px] text-foreground">
            <Lock className="mt-0.5 size-4 shrink-0" aria-hidden />
            This project is under an NDA, so I can&apos;t share its source code or
            screenshots.
          </p>
        )}
        <p className="text-sm/[22px] text-pretty text-foreground/70">
          {project.description}
        </p>
        <ul className="flex flex-wrap gap-1.5" aria-label="Tech stack">
          {project.techStacks.map((tech) => (
            <li key={tech}>
              <Badge variant="secondary">{tech}</Badge>
            </li>
          ))}
        </ul>
        {(project.isLive || (project.github && !project.isNDA)) && (
          <div className="flex flex-wrap gap-2 pt-1">
            {project.isLive && project.liveDemo && (
              <Button variant="outline" size="sm" asChild>
                <a href={project.liveDemo} target="_blank" rel="noopener noreferrer">
                  {liveLabel}
                </a>
              </Button>
            )}
            {project.github && !project.isNDA && (
              <Button variant="ghost" size="sm" asChild>
                <a href={project.github} target="_blank" rel="noopener noreferrer">
                  Source
                </a>
              </Button>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
