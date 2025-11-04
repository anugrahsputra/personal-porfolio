"use client";

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
import Link from "next/link";
import { useResumeData } from "@/features/resume/hooks/useResume";
import Breadcrumbs from "@/components/layout/Breadcrumbs";

export default function ExperiencePageClient() {
  const { resumeData, loading, error } = useResumeData();

  if (loading) {
    return (
      <div className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              All Experience
            </h1>
            <Separator className="w-24 mx-auto" />
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-8 bg-muted rounded mb-2"></div>
                  <div className="h-4 bg-muted rounded mb-2"></div>
                  <div className="h-4 bg-muted rounded mb-4"></div>
                  <div className="h-4 bg-muted rounded mb-2"></div>
                  <div className="h-4 bg-muted rounded"></div>
                </div>
              ))}
            </div>
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
              All Experience
            </h1>
            <p className="text-foreground/60">
              Error loading experience: {error}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: "Experience", current: true }
          ]}
        />
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <Link href="/#experience">
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
            All Experience
          </h1>
          <Separator className="w-24 mx-auto" />
          <p className="text-foreground/60 mt-6 max-w-3xl mx-auto text-lg">
            A comprehensive overview of my professional journey in mobile
            development, showcasing my growth, expertise, and contributions
            across different companies and projects.
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="max-w-5xl mx-auto">
          <div className="space-y-12">
            {resumeData!.experience.map((experience, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 group"
              >
                <CardHeader className="pb-4">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="space-y-2">
                      <CardTitle className="text-2xl font-semibold text-foreground group-hover:text-foreground/80 transition-colors">
                        {experience.position}
                      </CardTitle>
                      <CardDescription className="text-foreground/60 text-lg">
                        {experience.company}
                      </CardDescription>
                      <div className="flex items-center gap-4 text-sm text-foreground/70">
                        <span className="flex items-center">
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          {experience.period}
                        </span>
                        <span className="flex items-center">
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          {experience.location}
                        </span>
                      </div>
                    </div>

                    {/* Period Badge */}
                    <Badge variant="outline" className="text-sm px-4 py-2">
                      {experience.period}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-foreground mb-3 text-lg">
                        Key Responsibilities & Achievements:
                      </h4>
                      <ul className="space-y-3">
                        {experience.responsibilities.map(
                          (responsibility, idx) => (
                            <li
                              key={idx}
                              className="flex items-start group/item"
                            >
                              <div className="flex-shrink-0 w-2 h-2 bg-foreground/40 rounded-full mt-2 mr-3 group-hover/item:bg-foreground/60 transition-colors"></div>
                              <span className="text-foreground/70 leading-relaxed">
                                {responsibility}
                              </span>
                            </li>
                          ),
                        )}
                      </ul>
                    </div>

                    {/* Company Info */}
                    <div className="border-t border-border pt-4 mt-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                            <svg
                              className="w-4 h-4 text-foreground/60"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                              />
                            </svg>
                          </div>
                          <span className="text-sm text-foreground/60">
                            {experience.company}
                          </span>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {experience.location}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
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
      </div>
    </div>
  );
}