import type { Metadata } from "next";
import ExperiencePageClient from "./ExperiencePageClient";
import { getResumeDataUseCase } from "@/features/resume/data/container";

export const dynamic = 'force-dynamic';

// Breadcrumb structured data for experience page
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
      name: "Experience",
      item: "https://downormal.dev/experience",
    },
  ],
};

export const metadata: Metadata = {
  title: "Professional Experience - Mobile Engineer at BRIK & Semesta Arus Teknologi",
  description: "💼 Professional experience as Mobile Engineer at PT. Bangun Rancang Indonesia Kita (BRIK) and PT. Semesta Arus Teknologi. 2+ years specializing in Flutter, Kotlin Multiplatform, clean architecture, CI/CD pipeline development, Firebase analytics, and mobile performance optimization. Jakarta, Indonesia.",
  keywords: [
    "mobile engineer experience",
    "flutter developer experience",
    "kotlin multiplatform experience",
    "clean architecture",
    "CI/CD pipeline",
    "mobile app maintenance",
    "cross-platform development",
    "agile development",
    "firebase analytics",
    "android development",
    "mobile performance optimization",
    "Anugrah Surya Putra experience",
    "BRIK mobile engineer",
    "Semesta Arus Teknologi",
    "Jakarta mobile developer",
    "Indonesia mobile engineer",
    "Flutter developer Jakarta",
    "mobile engineer career",
    "professional mobile developer",
    "mobile app developer experience",
    "Flutter experience",
    "Kotlin experience",
  ],
  openGraph: {
    title: "Professional Experience - Mobile Engineer at BRIK & Semesta Arus Teknologi",
    description: "💼 2+ years as Mobile Engineer at PT. Bangun Rancang Indonesia Kita (BRIK) and PT. Semesta Arus Teknologi. Specializing in Flutter, Kotlin Multiplatform, clean architecture, and CI/CD pipeline development.",
    type: "website",
    url: "https://downormal.dev/experience",
    images: [
      {
        url: "/images/photo/photo.png",
        width: 1200,
        height: 630,
        alt: "Anugrah Surya Putra - Mobile Engineer Professional Experience",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Professional Experience - Mobile Engineer at BRIK & Semesta Arus Teknologi",
    description: "💼 2+ years as Mobile Engineer specializing in Flutter, Kotlin Multiplatform, clean architecture, and CI/CD pipeline development.",
    images: ["/images/photo/photo.png"],
  },
  alternates: {
    canonical: "https://downormal.dev/experience",
  },
};

export default async function ExperiencePage() {
  const resumeData = await getResumeDataUseCase.execute().catch(() => null);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData),
        }}
      />
      <ExperiencePageClient initialData={resumeData || undefined} />
    </>
  );
}