import type { Metadata } from "next";
import ProjectsPageClient from "./ProjectsPageClient";

export const metadata: Metadata = {
  title: "Projects - Its Your Boy Putra",
  description: "A comprehensive showcase of all my mobile development projects, from professional work to personal applications. Each project represents unique challenges and learning experiences in mobile development.",
  openGraph: {
    title: "Projects - Its Your Boy Putra",
    description: "A comprehensive showcase of all my mobile development projects, from professional work to personal applications. Each project represents unique challenges and learning experiences in mobile development.",
    type: "website",
  },
};

export default function ProjectsPage() {
  return <ProjectsPageClient />;
}