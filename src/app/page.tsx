import Navbar from "@/components/layout/Navbar";
import Hero from "@/features/hero/components/Hero";
import About from "@/features/about/components/About";
import Experience from "@/features/resume/components/Experience";
import Projects from "@/features/projects/components/Projects";
import Contact from "@/features/contact/components/Contact";
import Footer from "@/components/layout/Footer";
import FAQStructuredData from "@/components/FAQStructuredData";

export default function Home() {
  return (
    <>
      <FAQStructuredData />
      <main className="min-h-screen bg-background">
        <Navbar />
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
