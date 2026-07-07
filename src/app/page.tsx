import Navbar from "@/components/Navbar";
import InteractiveBackground from "@/components/InteractiveBackground";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      {/* Dynamic Interactive Particle Grid Canvas */}
      <InteractiveBackground />
      
      {/* Sticky Glassmorphism Header */}
      <Navbar />
      
      {/* Main Sections */}
      <main className="flex-1 w-full relative z-10">
        {/* Cinematic Hero Segment */}
        <Hero />
        
        {/* Capabilities Grid */}
        <Services />
        
        {/* Workflow Progression Roadmap */}
        <Process />
        
        {/* Swipeable Case Studies Carousel */}
        <Projects />
        
        {/* Core Pillars & Studio Story */}
        <About />
        
        {/* Client Brief Entry Form & Agency Location */}
        <Contact />
      </main>
      
      {/* Footer Navigation Map */}
      <Footer />
    </>
  );
}
