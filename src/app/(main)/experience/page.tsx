import type { Metadata } from "next";
import ExperiencePageClient from "./ExperiencePageClient";

export const metadata: Metadata = {
  title: "Experience - Its Your Boy Putra",
  description: "A comprehensive overview of my professional journey in mobile development, showcasing my growth, expertise, and contributions across different companies and projects.",
  openGraph: {
    title: "Experience - Its Your Boy Putra",
    description: "A comprehensive overview of my professional journey in mobile development, showcasing my growth, expertise, and contributions across different companies and projects.",
    type: "website",
  },
};

export default function ExperiencePage() {
  return <ExperiencePageClient />;
}