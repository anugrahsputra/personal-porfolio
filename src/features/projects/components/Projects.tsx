"use client";

import { useState, useEffect } from "react";
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

interface Project {
  title: string;
  description: string;
  techStacks: string[];
  liveDemo: string;
  github: string;
  isLive: boolean;
  isNDA: boolean;
  isFeatured: boolean;
  image: string;
  company: string;
  period: string;
  location: string;
}

interface ProjectsData {
  projects: Project[];
}

const Projects = () => {
  const [projectsData, setProjectsData] = useState<ProjectsData | null>(null);
  const [ndaDialogOpen, setNdaDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [imageErrors, setImageErrors] = useState<{ [key: string]: boolean }>(
    {},
  );

  useEffect(() => {
    const fetchProjectsData = async () => {
      try {
        const response = await fetch("/json/projects.json");
        const data = await response.json();
        setProjectsData(data);
      } catch (error) {
        console.error("Error fetching projects data:", error);
      }
    };

    fetchProjectsData();
  }, []);

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

  if (!projectsData) {
    return (
      <section id="projects" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Recent Projects
            </h2>
            <Separator className="w-24 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-48 bg-muted rounded-t-lg mb-4"></div>
                <div className="h-6 bg-muted rounded mb-2"></div>
                <div className="h-4 bg-muted rounded mb-2"></div>
                <div className="h-4 bg-muted rounded mb-4"></div>
                <div className="h-8 bg-muted rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Sort projects by date (newest first) and take the first 4
  const sortedProjects = [...projectsData.projects].sort((a, b) => {
    // Extract year and month from period string (e.g., "Oct 2024 - Feb 2025" -> 2024)
    const getYear = (period: string) => {
      const yearMatch = period.match(/\d{4}/);
      return yearMatch ? parseInt(yearMatch[0]) : 0;
    };

    const yearA = getYear(a.period);
    const yearB = getYear(b.period);

    if (yearA !== yearB) {
      return yearB - yearA; // Newest year first
    }

    // If same year, sort by month (approximate)
    const monthOrder = {
      Jan: 1,
      Feb: 2,
      Mar: 3,
      Apr: 4,
      May: 5,
      Jun: 6,
      Jul: 7,
      Aug: 8,
      Sep: 9,
      Oct: 10,
      Nov: 11,
      Dec: 12,
    };

    const getMonth = (period: string) => {
      const monthMatch = period.match(/^[A-Za-z]{3}/);
      return monthMatch
        ? monthOrder[monthMatch[0] as keyof typeof monthOrder] || 0
        : 0;
    };

    return getMonth(b.period) - getMonth(a.period);
  });

  const recentProjects = sortedProjects.slice(0, 4);

  return (
    <section id="projects" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Recent Projects
          </h2>
          <Separator className="w-24 mx-auto" />
          <p className="text-foreground/60 mt-6 max-w-2xl mx-auto">
            My latest mobile development projects, showcasing recent work and
            ongoing development in creating innovative mobile applications and
            solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {recentProjects.map((project, index) => (
            <Card
              key={index}
              className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative">
                <div className="aspect-video relative overflow-hidden">
                  {imageErrors[project.title] ? (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <svg
                        className="w-12 h-12 text-muted-foreground"
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
                      className="object-cover"
                      onError={() => handleImageError(project.title)}
                    />
                  )}
                </div>

                {/* Featured Badge */}
                {project.isFeatured && (
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0">
                      ⭐ Featured
                    </Badge>
                  </div>
                )}

                {/* NDA Badge */}
                {project.isNDA && (
                  <div className="absolute top-2 right-2">
                    <Badge variant="destructive">NDA</Badge>
                  </div>
                )}
              </div>

              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg font-semibold text-foreground line-clamp-2">
                    {project.title}
                  </CardTitle>
                </div>
                <CardDescription className="text-foreground/60 text-sm">
                  {project.company} • {project.period}
                </CardDescription>
                <p className="text-foreground/70 text-xs">
                  📍 {project.location}
                </p>
              </CardHeader>

              <CardContent className="pt-0">
                <p className="text-foreground/70 text-sm mb-4 line-clamp-3">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {project.techStacks.slice(0, 3).map((tech, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                  {project.techStacks.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{project.techStacks.length - 3} more
                    </Badge>
                  )}
                </div>

                <div className="flex gap-2">
                  {project.isLive && (
                    <Button
                      size="sm"
                      onClick={() => handleButtonClick(project, "live")}
                      className="flex-1"
                    >
                      Live Demo
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleButtonClick(project, "github")}
                    className={project.isLive ? "flex-1" : "w-full"}
                  >
                    GitHub
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Show All Projects Button */}
        <div className="text-center mt-12">
          <Link href="/projects">
            <Button size="lg" className="group">
              View All Projects
              <svg
                className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
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
    </section>
  );
};

export default Projects;
