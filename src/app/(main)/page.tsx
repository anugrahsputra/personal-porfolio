import Hero from "@/features/hero/components/Hero";
import About from "@/features/about/components/About";
import Experience from "@/features/resume/components/Experience";
import Projects from "@/features/projects/components/Projects";
import Contact from "@/features/contact/components/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Contact />
    </>
  );
}