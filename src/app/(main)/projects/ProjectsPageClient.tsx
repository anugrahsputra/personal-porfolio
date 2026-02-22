"use client";

import { ProjectsData } from "@/features/projects/data/domain/Project";
import Projects from "@/features/projects/components/Projects";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ProjectsPageClientProps {
  initialData?: ProjectsData;
}

export default function ProjectsPageClient({ initialData }: ProjectsPageClientProps) {
  return (
    <div className="pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Breadcrumbs
          items={[
            { label: "Projects", current: true }
          ]}
        />
        <div className="flex justify-start mt-4">
          <Link href="/#projects">
            <Button variant="ghost" size="sm">
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
      </div>
      <Projects initialData={initialData} />
    </div>
  );
}
