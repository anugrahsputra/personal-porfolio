import type { Metadata } from "next";
import ExperiencePageClient from "./ExperiencePageClient";

export const metadata: Metadata = {
  title: "Experience - Anugrah Surya Putra",
  description: "Professional experience as Mobile Engineer at PT. Bangun Rancang Indonesia Kita (BRIK) and PT. Semesta Arus Teknologi. Specialized in Flutter, Kotlin Multiplatform, clean architecture, and CI/CD pipeline development.",
  keywords: [
    "mobile engineer experience",
    "flutter developer",
    "kotlin multiplatform",
    "clean architecture",
    "CI/CD pipeline",
    "mobile app maintenance",
    "cross-platform development",
    "agile development",
    "firebase analytics",
    "android development",
    "mobile performance optimization",
    "Anugrah Surya Putra experience",
  ],
  openGraph: {
    title: "Experience - Anugrah Surya Putra",
    description: "Professional experience as Mobile Engineer at PT. Bangun Rancang Indonesia Kita (BRIK) and PT. Semesta Arus Teknologi.",
    type: "website",
    url: "https://itsyourboyputra.vercel.app/experience",
  },
  twitter: {
    card: "summary_large_image",
    title: "Experience - Anugrah Surya Putra",
    description: "Professional experience as Mobile Engineer at PT. Bangun Rancang Indonesia Kita (BRIK) and PT. Semesta Arus Teknologi.",
  },
};

export default function ExperiencePage() {
  return <ExperiencePageClient />;
}