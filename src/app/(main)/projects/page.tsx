import type { Metadata } from "next";
import ProjectsPageClient from "./ProjectsPageClient";

export const metadata: Metadata = {
  title: "Projects - Anugrah Surya Putra",
  description: "Explore my mobile development projects including Cosmic App KIOSK Touchscreen, Quraani Quran Mobile App, and E-Market Mobile Applications. Each project showcases expertise in Flutter, Kotlin Multiplatform, and clean architecture.",
  keywords: [
    "mobile projects",
    "flutter projects",
    "kotlin multiplatform",
    "android projects",
    "mobile app development",
    "cross-platform apps",
    "KIOSK application",
    "Quran mobile app",
    "e-marketplace app",
    "firebase integration",
    "clean architecture",
    "Anugrah Surya Putra projects",
  ],
  openGraph: {
    title: "Projects - Anugrah Surya Putra",
    description: "Explore my mobile development projects including Cosmic App KIOSK Touchscreen, Quraani Quran Mobile App, and E-Market Mobile Applications.",
    type: "website",
    url: "https://itsyourboyputra.vercel.app/projects",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects - Anugrah Surya Putra",
    description: "Explore my mobile development projects including Cosmic App KIOSK Touchscreen, Quraani Quran Mobile App, and E-Market Mobile Applications.",
  },
};

export default function ProjectsPage() {
  return <ProjectsPageClient />;
}