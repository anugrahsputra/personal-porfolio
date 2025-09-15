"use client";

import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import Link from "next/link";
import { useRecentExperiences, useResumeData } from "../hooks/useResume";
import type { Experience } from "../types/Experience";

const Experience = () => {
  const { experiences, loading, error } = useRecentExperiences(3);
  const { resumeData } = useResumeData();

  if (loading) {
    return (
      <section id="experience" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Recent Experience
            </h2>
            <Separator className="w-24 mx-auto" />
          </div>
          <div className="animate-pulse">
            <div className="h-6 bg-muted rounded mb-4"></div>
            <div className="h-4 bg-muted rounded mb-2"></div>
            <div className="h-4 bg-muted rounded mb-4"></div>
            <div className="h-4 bg-muted rounded mb-2"></div>
            <div className="h-4 bg-muted rounded"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="experience" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Recent Experience
            </h2>
            <p className="text-foreground/60">
              Error loading experience: {error}
            </p>
          </div>
        </div>
      </section>
    );
  }

  const hasMoreExperiences = resumeData && resumeData.experience.length > 3;

  return (
    <section id="experience" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Recent Experience
          </h2>
          <Separator className="w-24 mx-auto" />
          <p className="text-foreground/60 mt-6 max-w-2xl mx-auto">
            My recent professional journey in mobile development, showcasing my
            growth and expertise across different companies and projects.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {experiences.map((experience, index) => (
              <div
                key={index}
                className="border-l-2 border-foreground/20 pl-6 relative"
              >
                {/* Timeline dot */}
                <div className="absolute -left-3 top-0 w-6 h-6 bg-background border-2 border-foreground/20 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-foreground/40 rounded-full"></div>
                </div>

                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <h3 className="text-xl font-semibold text-foreground">
                      {experience.position}
                    </h3>
                    <span className="text-sm text-foreground/60 bg-muted px-3 py-1 rounded-full">
                      {experience.period}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <p className="text-foreground/70 font-medium">
                      {experience.company}
                    </p>
                    <p className="text-foreground/60 text-sm">
                      📍 {experience.location}
                    </p>
                  </div>

                  <ul className="text-foreground/60 text-sm leading-relaxed space-y-2">
                    {experience.responsibilities.map((responsibility, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-foreground/40 mr-2 mt-1">•</span>
                        <span>{responsibility}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* View Experience Button */}
          {hasMoreExperiences && (
            <div className="text-center mt-12">
              <Link href="/experience">
                <Button size="lg" className="group">
                  View All Experience
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
          )}
        </div>
      </div>
    </section>
  );
};

export default Experience;
