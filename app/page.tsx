import Hero from "@/components/sections/hero";
import Navigation from "@/components/sections/navigation";
import About from "@/components/sections/about";
import TechStack from "@/components/sections/tech-stack";
import Experience from "@/components/sections/experience";
import Projects from "@/components/sections/projects";
import Education from "@/components/sections/education";
import Certificates from "@/components/sections/certificates";
import Blog from "@/components/sections/blog";
import Footer from "@/components/sections/footer";
import FloatingPills from "@/components/floating-pills";

export default function Home() {
  return (
    <main className="bg-background text-foreground">
      <Navigation />
      <Hero />
      <About />
      <TechStack />
      <Experience />
      <Projects />
      <Education />
      <Certificates />
      <Blog />
      <Footer />
      <FloatingPills />
    </main>
  );
}
