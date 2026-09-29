import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import SectionLabel from "@/components/SectionLabel";
import { Reveal, RevealLine } from "@/components/motion";
import ProjectCard from "@/features/projects/components/ProjectCard";
import ProjectsStructuredData from "@/features/projects/components/ProjectsStructuredData";
import {
  getAllProjects,
  getProjectContext,
  type ProjectContext,
} from "@/features/projects/api";

export const revalidate = 3600;

// Breadcrumb structured data for projects page
const breadcrumbStructuredData = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://downormal.dev/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Projects",
      item: "https://downormal.dev/projects",
    },
  ],
};

export const metadata: Metadata = {
  title: "Mobile Development Projects - Flutter & Kotlin Multiplatform Apps",
  description: "📱 Explore 6+ mobile development projects by Anugrah Surya Putra including Cosmic App KIOSK Touchscreen, Quraani Quran Mobile App, Change Project Name CLI tool, and E-Market Mobile Applications. Each project showcases expertise in Flutter, Kotlin Multiplatform, clean architecture, Firebase integration, and performance optimization.",
  keywords: [
    "mobile projects",
    "flutter projects",
    "kotlin multiplatform projects",
    "android projects",
    "mobile app development portfolio",
    "cross-platform apps",
    "KIOSK application",
    "Quran mobile app",
    "e-marketplace app",
    "firebase integration",
    "clean architecture",
    "Anugrah Surya Putra projects",
    "Flutter developer portfolio",
    "mobile engineer projects",
    "Indonesia mobile developer",
    "Jakarta Flutter developer",
    "pub.dev packages",
    "CLI tool dart",
    "mobile app examples",
    "Flutter showcase",
    "Kotlin showcase",
  ],
  openGraph: {
    title: "Mobile Development Projects - Flutter & Kotlin Multiplatform Apps",
    description: "📱 Explore 6+ mobile development projects including Cosmic App KIOSK, Quraani Quran App, Change Project Name CLI tool, and E-Market Applications. Showcasing Flutter, Kotlin Multiplatform, and clean architecture expertise.",
    type: "website",
    url: "https://downormal.dev/projects",
    images: [
      {
        url: "/images/photo/photo.png",
        width: 1200,
        height: 630,
        alt: "Anugrah Surya Putra - Mobile Development Projects Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mobile Development Projects - Flutter & Kotlin Multiplatform Apps",
    description: "📱 Explore 6+ mobile development projects including Cosmic App KIOSK, Quraani Quran App, and E-Market Applications. Showcasing Flutter and Kotlin expertise.",
    images: ["/images/photo/photo.png"],
  },
  alternates: {
    canonical: "https://downormal.dev/projects",
  },
};

const GROUPS: { context: ProjectContext; title: string; spacing: string }[] = [
  {
    context: "work",
    title: "Work",
    spacing: "pt-[clamp(2rem,3.5vw,3rem)] pb-[clamp(3rem,5vw,4.5rem)]",
  },
  {
    context: "personal",
    title: "Personal",
    spacing: "pt-[clamp(3rem,5vw,4.5rem)] pb-[clamp(3.5rem,6vw,5.5rem)]",
  },
  {
    context: "academic",
    title: "Academic",
    spacing: "pt-[clamp(2.5rem,4.5vw,4rem)] pb-[clamp(3.5rem,6vw,5.5rem)]",
  },
];

export default async function ProjectsPage() {
  const projectsData = await getAllProjects();

  return (
    <>
      <ProjectsStructuredData initialData={projectsData} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData),
        }}
      />
      <PageHeader
        title="Projects"
        intro="What I've built at work, on my own, and at university."
      />
      {GROUPS.map(({ context, title, spacing }) => {
        // Featured projects first, API order (newest first) otherwise
        const projects = projectsData.projects
          .filter((project) => getProjectContext(project) === context)
          .sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured));
        if (!projects.length) return null;

        return (
          <section key={context} className={spacing}>
            <div className="page-container">
              <RevealLine />
              <Reveal className="flex items-baseline justify-between pt-6">
                <SectionLabel>{title}</SectionLabel>
                <p className="text-xs/4 text-foreground/60">
                  {projects.length} {projects.length === 1 ? "project" : "projects"}
                </p>
              </Reveal>
              <div className="mt-8 grid gap-x-3 gap-y-12 md:grid-cols-2">
                {projects.map((project, index) => (
                  <Reveal key={project.title} delay={(index % 2) * 0.1}>
                    <ProjectCard project={project} index={index} />
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}