"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import Image from "next/image";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Hook scroll progress for premium header indicator
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "Process", href: "#process" },
    { name: "Projects", href: "#projects" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || mobileMenuOpen
            ? "bg-slate-950/95 border-b border-slate-900 py-4 shadow-lg backdrop-blur-md"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="relative w-12 h-10 rounded-lg overflow-hidden flex items-center justify-center border border-slate-800 bg-slate-950 shrink-0 shadow-md">
              {/* Next.js Image with explicit dimensions — eliminates CLS */}
              <Image
                src="/logo.jpg"
                alt="Rahvix Technologies Logo"
                width={48}
                height={40}
                className="w-full h-full object-contain p-0.5 group-hover:scale-105 transition-transform duration-500"
                priority
              />
            </div>
            <span className="font-sans font-extrabold tracking-tight text-white transition-colors duration-300">
              Rahvix <span className="text-brand-orange">Technologies</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative text-sm text-slate-350 hover:text-white transition-colors duration-300 group py-1 font-mono font-bold tracking-wide focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-orange focus-visible:outline-offset-4 rounded"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-brand-orange transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="#contact"
              className="relative inline-flex items-center justify-center px-5 py-2.5 text-sm font-bold text-white transition-all duration-300 rounded-lg overflow-hidden bg-brand-orange hover:bg-brand-orange/95 hover:shadow-[0_4px_15px_rgba(250,90,21,0.25)] border border-transparent focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-orange focus-visible:outline-offset-2"
            >
              <span className="relative z-10 flex items-center gap-1.5 font-bold">
                Get Started
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 text-white" />
              </span>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-slate-300 hover:text-white border border-slate-800 rounded-lg bg-slate-900/60 backdrop-blur shadow-sm cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-orange"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Scroll Progress Bar at the bottom of Navbar */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-brand-orange via-brand-blue to-brand-orange origin-left"
          style={{ scaleX }}
        />

        {/* Mobile Nav Drawer (Nested inside header absolutely positioned at top-full) */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              id="mobile-nav"
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="absolute top-full left-0 right-0 bg-slate-950/98 backdrop-blur-lg border-b border-slate-900 shadow-2xl px-6 py-8 overflow-hidden z-40 md:hidden"
            >
              <motion.nav 
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.08,
                      delayChildren: 0.1
                    }
                  }
                }}
                initial="hidden"
                animate="visible"
                className="flex flex-col gap-6" 
                aria-label="Mobile navigation"
              >
                {navLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0 }
                    }}
                    transition={{ type: "spring", stiffness: 120, damping: 14 }}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-base font-mono font-bold text-slate-350 hover:text-brand-orange transition-colors duration-250 border-b border-slate-900 pb-2 flex items-center justify-between group"
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight className="w-4 h-4 text-slate-600 group-hover:text-brand-orange group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                  </motion.a>
                ))}
                <motion.a
                  href="#contact"
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 }
                  }}
                  transition={{ type: "spring", stiffness: 120, damping: 14 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="mt-4 flex items-center justify-center gap-2 w-full py-3.5 rounded-lg bg-brand-orange text-white font-extrabold shadow-lg shadow-brand-orange/15 hover:shadow-brand-orange/30 active:scale-[0.98] transition-all duration-300"
                >
                  Get a Free Consultation
                  <ArrowUpRight className="w-4 h-4" />
                </motion.a>
              </motion.nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
