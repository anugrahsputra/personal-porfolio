import Navbar from "@/presentation/components/Navbar";
import Hero from "@/presentation/components/Hero";
import About from "@/presentation/components/About";
import Experience from "@/presentation/components/Experience";
import Projects from "@/presentation/components/Projects";
import Contact from "@/presentation/components/Contact";
import Footer from "@/presentation/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}
