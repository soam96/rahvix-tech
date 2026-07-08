"use client";

import React, { useState, useEffect } from "react";
import Lenis from "lenis";
import LoadingScreen from "@/components/LoadingScreen";
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
