"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import Link from "next/link";
import { useAllProjects } from "@/features/projects/hooks/useProjects";
import { Project } from "@/features/projects/data/domain/Project";
import ProjectsStructuredData from "@/features/projects/components/ProjectsStructuredData";
import Breadcrumbs from "@/components/layout/Breadcrumbs";

export default function ProjectsPageClient() {
  const { projectsData, loading, error } = useAllProjects();
  const [ndaDialogOpen, setNdaDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [imageErrors, setImageErrors] = useState<{ [key: string]: boolean }>(
    {},
  );

  const handleButtonClick = (
    project: Project,
    buttonType: "live" | "github",
  ) => {
    if (project.isNDA) {
      setSelectedProject(project);
      setNdaDialogOpen(true);
    } else {
      const url = buttonType === "live" ? project.liveDemo : project.github;
      if (url) {
        window.open(url, "_blank");
      }
    }
  };

  const handleImageError = (projectTitle: string) => {
    setImageErrors((prev) => ({ ...prev, [projectTitle]: true }));
  };

  if (loading) {
    return (
      <div className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              All Projects
            </h1>
            <Separator className="w-24 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-64 bg-muted rounded-t-lg mb-4"></div>
                <div className="h-8 bg-muted rounded mb-2"></div>
                <div className="h-4 bg-muted rounded mb-2"></div>
                <div className="h-4 bg-muted rounded mb-4"></div>
                <div className="h-10 bg-muted rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              All Projects
            </h1>
            <p className="text-foreground/60">
              Error loading projects: {error}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <ProjectsStructuredData />
      <div className="pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: "Projects", current: true }
          ]}
        />
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <Link href="/#projects">
              <Button variant="ghost" size="sm" className="mr-4">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Back to Portfolio
              </Button>
            </Link>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            All Projects
          </h1>
          <Separator className="w-24 mx-auto" />
          <p className="text-foreground/60 mt-6 max-w-3xl mx-auto text-lg">
            A comprehensive showcase of all my mobile development projects, from
            professional work to personal applications. Each project represents
            unique challenges and learning experiences in mobile development.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {projectsData?.projects.map((project, index) => (
            <Card
              key={index}
              className="overflow-hidden hover:shadow-xl transition-all duration-300 group"
            >
              <div className="relative">
                <div className="aspect-video relative overflow-hidden">
                  {imageErrors[project.title] ? (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <svg
                        className="w-16 h-16 text-muted-foreground"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  ) : (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={() => handleImageError(project.title)}
                    />
                  )}
                </div>

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {project.isFeatured && (
                    <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0">
                      ⭐ Featured
                    </Badge>
                  )}
                </div>

                {project.isNDA && (
                  <div className="absolute top-4 right-4">
                    <Badge variant="destructive">NDA</Badge>
                  </div>
                )}
              </div>

              <CardHeader className="pb-4">
                <div className="space-y-2">
                  <CardTitle className="text-2xl font-semibold text-foreground group-hover:text-foreground/80 transition-colors">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-foreground/60 text-base">
                    {project.company} • {project.period}
                  </CardDescription>
                  <p className="text-foreground/70 text-sm">
                    📍 {project.location}
                  </p>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <p className="text-foreground/70 text-base mb-6 leading-relaxed">
                  {project.description}
                </p>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">
                      Technologies Used:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.techStacks.map((tech, idx) => (
                        <Badge
                          key={idx}
                          variant="secondary"
                          className="text-sm"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    {project.isLive && (
                      <Button
                        onClick={() => handleButtonClick(project, "live")}
                        className="flex-1 group"
                      >
                        <svg
                          className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                        Live Demo
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      onClick={() => handleButtonClick(project, "github")}
                      className={project.isLive ? "flex-1" : "w-full"}
                    >
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      View Code
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Back to Portfolio Button */}
        <div className="text-center mt-16">
          <Link href="/">
            <Button variant="outline" size="lg" className="group">
              <svg
                className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Portfolio
            </Button>
          </Link>
        </div>

        {/* NDA Dialog */}
        <Dialog open={ndaDialogOpen} onOpenChange={setNdaDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <span>🔒 NDA Protected Project</span>
              </DialogTitle>
              <DialogDescription>
                This project is protected by a Non-Disclosure Agreement (NDA)
                and cannot be shared publicly.
              </DialogDescription>
            </DialogHeader>
            {selectedProject && (
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground">
                    {selectedProject.title}
                  </h4>
                  <p className="text-sm text-foreground/60">
                    {selectedProject.company}
                  </p>
                </div>
                <div>
                  <h5 className="font-medium text-foreground mb-2">
                    Technologies Used:
                  </h5>
                  <div className="flex flex-wrap gap-1">
                    {selectedProject.techStacks.map((tech, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-foreground/70">
                  {selectedProject.description}
                </p>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
    </>
  );
}