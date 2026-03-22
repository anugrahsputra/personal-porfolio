import type { Metadata } from "next";
import ProjectsPageClient from "./ProjectsPageClient";
import ProjectsStructuredData from "@/features/projects/components/ProjectsStructuredData";
import { getAllProjectsUseCase } from "@/features/projects/data/container";

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

export default async function ProjectsPage() {
  const projectsData = await getAllProjectsUseCase.execute().catch(() => null);

  return (
    <>
      <ProjectsStructuredData initialData={projectsData || undefined} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData),
        }}
      />
      <ProjectsPageClient initialData={projectsData || undefined} />
    </>
  );
}