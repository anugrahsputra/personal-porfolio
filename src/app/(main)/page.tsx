import Hero from "@/features/hero/components/Hero";
import About from "@/features/about/components/About";
import Experience from "@/features/resume/components/Experience";
import Projects from "@/features/projects/components/Projects";
import Videos from "@/features/videos/components/Videos";
import Contact from "@/features/contact/components/Contact";
import FAQStructuredData from "@/components/FAQStructuredData";
import { getResumeData } from "@/features/resume/api";
import { getAllProjects } from "@/features/projects/api";
import { getVideos } from "@/features/videos/api";

export const revalidate = 3600;

export default async function HomePage() {
  const [resumeData, projectsData, videos] = await Promise.all([
    getResumeData(),
    getAllProjects(),
    getVideos(),
  ]);

  return (
    <>
      <FAQStructuredData />
      <Hero initialData={resumeData} />
      <Experience initialData={resumeData} />
      <Projects initialData={projectsData} />
      <About initialData={resumeData} />
      <Videos videos={videos} />
      <Contact initialData={resumeData} />
    </>
  );
}
