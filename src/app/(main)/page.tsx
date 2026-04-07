import Hero from "@/features/hero/components/Hero";
import About from "@/features/about/components/About";
import Experience from "@/features/resume/components/Experience";
import Projects from "@/features/projects/components/Projects";
import Contact from "@/features/contact/components/Contact";
import FAQStructuredData from "@/components/FAQStructuredData";
import { getResumeData } from "@/features/resume/api";
import { getAllProjects } from "@/features/projects/api";

export const revalidate = 3600;

export default async function HomePage() {
  const [resumeData, projectsData] = await Promise.all([
    getResumeData(),
    getAllProjects(),
  ]);

  return (
    <>
      <FAQStructuredData />
      <Hero initialData={resumeData} />
      <About initialData={resumeData} />
      <Experience initialData={resumeData} limit={3} />
      <Projects initialData={projectsData} limit={4} />
      <Contact initialData={resumeData} />
    </>
  );
}
