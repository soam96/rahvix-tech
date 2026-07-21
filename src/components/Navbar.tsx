"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import Image from "next/image";

interface NavbarProps {
  isLoaded?: boolean;
}

export default function Navbar({ isLoaded = true }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Hook scroll progress for sleek top progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
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
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={isLoaded ? { y: 0, opacity: 1 } : { y: -80, opacity: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="fixed top-0 left-0 right-0 z-50 pointer-events-none px-3 sm:px-6 pt-3"
      >
        <div
          className={`pointer-events-auto max-w-5xl mx-auto transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isScrolled || mobileMenuOpen
              ? "bg-[#06152d]/85 backdrop-blur-2xl border border-white/[0.12] rounded-full py-2 px-4 shadow-[0_16px_40px_-10px_rgba(2,12,27,0.85)] sm:px-6"
              : "bg-white/[0.03] backdrop-blur-md border border-white/[0.06] rounded-2xl py-3 px-5 sm:px-7"
          } flex items-center justify-between h-12 relative overflow-hidden`}
        >
          {/* Subtle Ambient Light Sweep Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent -translate-x-full animate-[shimmer_8s_infinite_linear] pointer-events-none" />

          {/* Brand Logo - Seamless Logo Only Display */}
          <motion.a
            href="#"
            initial={{ opacity: 0, x: -12 }}
            animate={isLoaded ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
            transition={{ type: "spring", stiffness: 120, damping: 16, delay: 0.2 }}
            className="flex items-center group focus:outline-none z-10"
            aria-label="Rahvix Technologies Home"
          >
            <div className="relative h-9 sm:h-10.5 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/logo.jpg"
                alt="Rahvix Technologies Logo"
                width={150}
                height={45}
                className="h-full w-auto object-contain max-h-9 sm:max-h-10 rounded-lg"
                priority
              />
            </div>
          </motion.a>

          {/* Desktop Nav - Apple Hover Pill Slider */}
          <motion.nav
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.05,
                  delayChildren: 0.25,
                }
              }
            }}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
            onMouseLeave={() => setHoveredIndex(null)}
            className="hidden md:flex items-center gap-0.5 relative z-10"
            aria-label="Main navigation"
          >
            {navLinks.map((link, idx) => (
              <motion.a
                key={link.name}
                href={link.href}
                onMouseEnter={() => setHoveredIndex(idx)}
                variants={{
                  hidden: { opacity: 0, y: -8 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ type: "spring", stiffness: 130, damping: 15 }}
                className="relative px-3.5 py-1.5 rounded-full text-[12.5px] font-sans font-medium text-slate-300 hover:text-white transition-colors duration-200 focus-visible:outline-none"
              >
                {/* Animated Liquid Background Pill on Hover */}
                {hoveredIndex === idx && (
                  <motion.div
                    layoutId="navbarHoverPill"
                    className="absolute inset-0 bg-white/10 border border-white/15 rounded-full z-0"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </motion.a>
            ))}
          </motion.nav>

          {/* CTA - Apple Glow Pill Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isLoaded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 120, damping: 15, delay: 0.35 }}
            className="hidden md:flex items-center gap-3 z-10"
          >
            <a
              href="#contact"
              className="group relative inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-brand-orange via-orange-500 to-amber-500 shadow-[0_2px_14px_rgba(250,90,21,0.35)] hover:shadow-[0_4px_22px_rgba(250,90,21,0.55)] hover:scale-105 active:scale-95 transition-all duration-300 border border-white/20 overflow-hidden"
            >
              {/* Shimmer sweep inside button */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
              <Sparkles className="w-3.5 h-3.5 text-white/90 group-hover:rotate-12 transition-transform duration-300" />
              <span>Get Started</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-white/90 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </a>
          </motion.div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-1.5 text-slate-300 hover:text-white border border-white/15 rounded-full bg-white/10 backdrop-blur shadow-sm cursor-pointer focus:outline-none z-10 active:scale-90 transition-transform"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

        {/* Scroll Progress Indicator Bar */}
        <motion.div 
          className="max-w-5xl mx-auto h-[1px] bg-gradient-to-r from-brand-orange via-brand-blue to-brand-orange origin-left opacity-90 mt-1 rounded-full"
          style={{ scaleX }}
        />

        {/* Mobile Nav Drawer Sheet */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              id="mobile-nav"
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-auto max-w-5xl mx-auto mt-2 bg-[#06152d]/95 backdrop-blur-2xl border border-white/15 rounded-2xl shadow-2xl px-6 py-6 overflow-hidden md:hidden"
            >
              <motion.nav 
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.05,
                      delayChildren: 0.05
                    }
                  }
                }}
                initial="hidden"
                animate="visible"
                className="flex flex-col gap-3.5" 
                aria-label="Mobile navigation"
              >
                {navLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    variants={{
                      hidden: { opacity: 0, x: -12 },
                      visible: { opacity: 1, x: 0 }
                    }}
                    transition={{ type: "spring", stiffness: 120, damping: 14 }}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm font-sans font-medium text-slate-200 hover:text-white transition-colors duration-200 border-b border-white/[0.06] pb-2 flex items-center justify-between group"
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-brand-orange transition-transform duration-200" />
                  </motion.a>
                ))}
                <motion.a
                  href="#contact"
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  transition={{ type: "spring", stiffness: 120, damping: 14 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="mt-2 flex items-center justify-center gap-2 w-full py-2.5 rounded-full bg-gradient-to-r from-brand-orange to-orange-500 text-white text-xs font-bold shadow-lg shadow-brand-orange/25 active:scale-[0.98] transition-all duration-200"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Get Started</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </motion.a>
              </motion.nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
