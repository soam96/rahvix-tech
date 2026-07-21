"use client";

import React, { useState, useEffect } from "react";
import Lenis from "lenis";
import dynamic from "next/dynamic";
// Above-fold components — eagerly loaded
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import InteractiveBackground from "@/components/InteractiveBackground";
import Hero from "@/components/Hero";

// Below-fold components — lazily loaded to shrink the initial JS bundle.
// Next.js will split these into separate chunks that load after the page is interactive.
const Services = dynamic(() => import("@/components/Services"), { ssr: false });
const Process = dynamic(() => import("@/components/Process"), { ssr: false });
const Projects = dynamic(() => import("@/components/Projects"), { ssr: false });
const About = dynamic(() => import("@/components/About"), { ssr: false });
const Contact = dynamic(() => import("@/components/Contact"), { ssr: false });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: false });


export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  // Lock scroll during loading
  useEffect(() => {
    if (!isLoaded) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [isLoaded]);

  // Initialize Lenis smooth scrolling after the loader completes
  useEffect(() => {
    if (!isLoaded) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [isLoaded]);

  return (
    <>
      {/* Premium Loader Screen overlay */}
      <LoadingScreen onComplete={() => setIsLoaded(true)} />

      {/* Dynamic Interactive Particle Grid Canvas */}
      <InteractiveBackground />
      
      {/* Sticky Glassmorphism Header — slides down after loader finishes */}
      <Navbar isLoaded={isLoaded} />
      
      {/* Main Sections */}
      <main className="flex-1 w-full relative z-10">
        {/* Cinematic Hero Segment — entrance animations wait for loader */}
        <Hero isLoaded={isLoaded} />
        
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
