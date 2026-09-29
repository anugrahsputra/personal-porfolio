import type { Metadata } from "next";
import Link from "next/link";
import { Download } from "lucide-react";

import PageHeader from "@/components/layout/PageHeader";
import { Reveal, RevealLine } from "@/components/motion";
import { Button } from "@/components/ui/button";
import { getResumeData } from "@/features/resume/api";
import { RESUME_PDF_URL } from "@/lib/site";

export const revalidate = 3600;

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
  const { experience: roles, education } = await getResumeData();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData),
        }}
      />
      <PageHeader
        title="Experience"
        intro="Where I've worked as a mobile engineer, newest first."
      />

      <div className="page-container">
        {roles.map((role, index) => {
          const isCurrent = index === 0 && role.period.endsWith("Present");
          return (
            <div key={`${role.company}-${role.period}`}>
              <RevealLine />
              <Reveal
                as="article"
                className={`flex flex-col gap-x-[clamp(2rem,4vw,4rem)] gap-y-3 py-[clamp(2rem,3.5vw,3.5rem)] md:flex-row ${
                  index === roles.length - 1 ? "pb-[clamp(3rem,5vw,4.5rem)]" : ""
                }`}
              >
                <div className="shrink-0 md:basis-[240px] lg:basis-[300px]">
                  <p className="text-sm/5 font-medium">{role.period}</p>
                  <p className="mt-1 text-xs/4 font-medium text-foreground/60">
                    {role.location}
                  </p>
                </div>
                <div className="min-w-0 flex-1">
                  <h2
                    className={
                      isCurrent
                        ? "text-2xl/[30px] font-semibold tracking-[-0.02em]"
                        : "type-h3"
                    }
                  >
                    {role.position}
                  </h2>
                  <p className="mt-1 text-sm/5 text-muted-foreground">
                    {role.company}
                  </p>
                  <ul className="mt-4 max-w-[65ch] list-disc space-y-2 pl-5 text-base/[26px] text-pretty text-foreground/70 marker:text-foreground/40">
                    {role.responsibilities.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          );
        })}
      </div>

      {education.length > 0 && (
        <section className="border-y bg-card py-[clamp(2.5rem,4.5vw,4rem)]">
          <Reveal className="page-container flex flex-col gap-x-[clamp(2rem,4vw,4rem)] gap-y-4 md:flex-row">
            <h2 className="type-h2 shrink-0 md:basis-[240px] lg:basis-[300px]">
              Education
            </h2>
            <div className="min-w-0 flex-1 space-y-4">
              {education.map((edu) => (
                <div key={edu.school}>
                  <h3 className="type-h3">
                    {edu.degree}, {edu.fieldOfStudy}
                  </h3>
                  <p className="mt-1 text-sm/5 text-muted-foreground">
                    {edu.school}, {new Date(edu.startDate).getFullYear()} to{" "}
                    {new Date(edu.graduationDate).getFullYear()}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </section>
      )}

      <section className="page-container flex flex-wrap gap-3 py-[clamp(3rem,5vw,5rem)]">
        <Button size="lg" asChild>
          <Link href="/#contact">Contact me</Link>
        </Button>
        <Button size="lg" variant="outline" asChild>
          <a href={RESUME_PDF_URL} target="_blank" rel="noopener noreferrer">
            <Download />
            Download resume
          </a>
        </Button>
      </section>
    </>
  );
}