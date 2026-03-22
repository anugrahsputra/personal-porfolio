import Hero from "@/features/hero/components/Hero";
import About from "@/features/about/components/About";
import Experience from "@/features/resume/components/Experience";
import Projects from "@/features/projects/components/Projects";
import Contact from "@/features/contact/components/Contact";
import FAQStructuredData from "@/components/FAQStructuredData";
import { getResumeDataUseCase } from "@/features/resume/data/container";
import { getAllProjectsUseCase } from "@/features/projects/data/container";

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  // Fetch data on the server
  const resumeData = await getResumeDataUseCase.execute().catch((error) => {
    console.error("Failed to fetch resume data on server:", error);
    return null;
  });
  const projectsData = await getAllProjectsUseCase.execute().catch((error) => {
    console.error("Failed to fetch projects data on server:", error);
    return null;
  });

  return (
    <>
      <FAQStructuredData />
      <Hero initialData={resumeData || undefined} />
      <About initialData={resumeData || undefined} />
      <Experience initialData={resumeData || undefined} limit={3} />
      <Projects initialData={projectsData || undefined} limit={4} />
      <Contact initialData={resumeData || undefined} />
    </>
  );
}
