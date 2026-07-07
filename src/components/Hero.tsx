"use client";

import React, { useRef, useEffect, useState } from "react";
import { ArrowUpRight, Play, Zap, Cpu, Award, Users } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform, useInView } from "framer-motion";

// Animated counter that counts up from 0 when in view
function AnimatedStat({
  value,
  label,
  icon: Icon,
  colorClass,
}: {
  value: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  colorClass: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [displayed, setDisplayed] = useState("0");

  useEffect(() => {
    if (!isInView) return;

    const match = value.match(/^(₹?|\$?)([0-9.]+)(.*)$/);
    if (!match) {
      setDisplayed(value);
      return;
    }

    const prefix = match[1]; // "₹" or "$"
    const target = parseFloat(match[2]);
    const suffix = match[3]; // "%", "x", "Cr+", "M+", etc.
    const duration = 1800;
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;
      const formatted =
        current < 10
          ? current.toFixed(1)
          : Math.round(current).toString();
      setDisplayed(`${prefix}${formatted}${suffix}`);
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [isInView, value]);

  return (
    <div ref={ref} className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-2 text-slate-100">
        <Icon className={`w-5 h-5 ${colorClass}`} />
        <span className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${colorClass}`}>
          {displayed}
        </span>
      </div>
      <p className="text-[11px] text-slate-450 font-bold uppercase tracking-wider">{label}</p>
    </div>
  );
}

interface HeroProps {
  isLoaded?: boolean;
}

export default function Hero({ isLoaded = true }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse tilt variables for 3D card effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const rafRef = useRef<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    if (rafRef.current) return;

    rafRef.current = requestAnimationFrame(() => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      x.set((e.clientX - rect.left - width / 2) / width);
      y.set((e.clientY - rect.top - height / 2) / height);
      rafRef.current = null;
    });
  };

  const handleMouseLeave = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    x.set(0);
    y.set(0);
  };

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const stats = [
    { value: "99.9%", label: "System Uptime", icon: Cpu, colorClass: "text-brand-teal" },
    { value: "10x", label: "Efficiency Boost", icon: Award, colorClass: "text-brand-purple" },
    { value: "₹40Cr+", label: "ROI Generated", icon: Users, colorClass: "text-brand-orange" },
  ];

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex items-center justify-center pt-32 pb-24 overflow-hidden px-6 bg-transparent"
    >
      {/* Background Decorative Blobs */}
      <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] rounded-full glow-cyan -z-10 opacity-60 pointer-events-none" />
      <div className="absolute bottom-[10%] right-[20%] w-[500px] h-[500px] rounded-full glow-blue -z-10 opacity-50 pointer-events-none" />
      
      {/* 3D grid line overlay */}
      <div className="absolute inset-0 neon-grid opacity-30 -z-10 pointer-events-none" />

      {/* Floating Accent Shapes */}
      <div className="absolute top-[20%] right-[15%] w-3 h-3 rounded-full bg-brand-orange/40 animate-float-slow -z-10" />
      <div className="absolute bottom-[25%] left-[15%] w-4 h-4 rounded-full bg-brand-purple/40 animate-float -z-10" />
      <div className="absolute top-[35%] left-[10%] w-2 h-2 rounded-full bg-brand-teal/50 animate-float-slow -z-10" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10 text-left">
        
        {/* Left Column: Text Content */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-slate-800 bg-slate-950/60 backdrop-blur-md w-fit mb-6 shadow-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-teal animate-ping" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">
              Automation &amp; Scale
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.08] max-w-2xl font-sans"
          >
            Architecting <span className="text-gradient-cyan-blue">Digital</span>{" "}
            Monopolies for <span className="text-gradient-orange">Scale.</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="text-slate-300 text-base sm:text-lg max-w-xl mb-10 leading-relaxed font-medium"
          >
            We build next-generation automated software pipelines, elite cloud applications, and data-driven client acquisition systems.
          </motion.p>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <a
              href="#contact"
              className="relative inline-flex items-center justify-center px-8 py-4 rounded-lg bg-brand-orange text-white font-extrabold text-sm hover:shadow-[0_0_30px_rgba(250,90,21,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 group w-full sm:w-auto focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-orange focus-visible:outline-offset-2"
            >
              Deploy Your System
              <ArrowUpRight className="w-4 h-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </a>

            <a
              href="#services"
              className="relative inline-flex items-center justify-center px-8 py-4 rounded-lg border border-slate-800 bg-slate-900/60 text-slate-300 font-bold text-sm hover:bg-slate-880 hover:border-brand-teal/50 hover:text-white hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] active:scale-[0.98] transition-all duration-300 group w-full sm:w-auto focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-teal focus-visible:outline-offset-2"
            >
              <span className="flex items-center gap-2">
                <Play className="w-4 h-4 text-brand-teal fill-brand-teal/20 group-hover:scale-110 transition-transform" />
                Explore Capabilities
              </span>
            </a>
          </motion.div>

          {/* Animated Social Proof metrics */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  staggerChildren: 0.12,
                  delayChildren: 0.8,
                }
              }
            }}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
            className="mt-16 p-6 sm:p-8 rounded-2xl border border-slate-800/80 bg-slate-950/40 backdrop-blur-md grid grid-cols-1 sm:grid-cols-3 gap-8 w-full max-w-3xl lg:mx-0 mx-auto font-mono"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
              >
                <AnimatedStat {...stat} />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Right Column: Hero Interactive Illustration */}
        <div className="lg:col-span-5 flex justify-center w-full relative">
          <motion.div
            style={{
              rotateX: isMobile ? 0 : rotateX,
              rotateY: isMobile ? 0 : rotateY,
              transformPerspective: 1000,
              transformStyle: "preserve-3d"
            }}
            initial={{ opacity: 0, scale: 0.95, y: 25 }}
            animate={isLoaded 
              ? (isMobile 
                ? { opacity: 1, scale: 1, y: [0, -10, 0], rotate: [0, 0.5, -0.5, 0] } 
                : { opacity: 1, scale: 1, y: 0 }) 
              : { opacity: 0, scale: 0.95, y: 25 }
            }
            transition={isLoaded && isMobile ? {
              repeat: Infinity,
              duration: 6,
              ease: "easeInOut"
            } : { duration: 0.8, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
            // Changed aspect ratio on mobile from aspect-square to aspect-[4/5] to resolve mobile cut-off
            className="w-full max-w-[440px] aspect-[4/5] sm:aspect-square rounded-3xl border border-slate-800 bg-slate-900/60 p-3 sm:p-4 shadow-2xl backdrop-blur-md relative overflow-hidden"
          >
            {/* Holographic scanner active line overlay */}
            <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-brand-orange via-brand-purple to-brand-teal opacity-50 z-20 animate-scanline pointer-events-none" />

            {/* Changed padding to p-3 on mobile to maximize viewport area */}
            <div className="w-full h-full rounded-2xl bg-slate-950/80 border border-slate-800/80 p-3 sm:p-4 font-mono flex flex-col justify-between relative shadow-inner select-none overflow-hidden">
              {/* Window Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-900 mb-3 sm:mb-4 shrink-0">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-[9px] text-slate-550 font-bold uppercase tracking-widest">pipeline.config.yaml</span>
                <span className="text-[9px] text-brand-blue font-bold">active</span>
              </div>

              {/* Grid Lines */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:16px_16px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-25 pointer-events-none" />

              {/* Core visual layout - reduced gap size on mobile to fit vertical viewport */}
              <div className="flex-1 flex flex-col justify-between gap-2.5 sm:gap-4 relative z-10">
                {/* Visual Pipeline Nodes */}
                <div className="grid grid-cols-3 gap-1.5 sm:gap-2 items-center">
                  <div className="bg-slate-900/60 border border-slate-850 p-2 sm:p-2.5 rounded-lg flex flex-col gap-1 items-center">
                    <span className="text-[9px] text-slate-450 font-bold">SOURCE</span>
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-brand-blue/10 border border-brand-blue/30 flex items-center justify-center">
                      <Cpu className="w-3.5 h-3.5 text-brand-blue" />
                    </div>
                    <span className="text-[8px] text-slate-550">API Ingest</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-[8px] text-brand-orange font-bold animate-pulse">PROCESSING</span>
                    <div className="w-full flex items-center justify-center py-2">
                      <svg className="w-full h-2" fill="none">
                        <line x1="0" y1="4" x2="100%" y2="4" stroke="rgba(250,90,21,0.2)" strokeWidth="1.5" strokeDasharray="3 3" />
                        <motion.circle r="2" fill="var(--brand-orange)" cy="4"
                          animate={{ cx: ["0%", "100%"] }}
                          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-850 p-2 sm:p-2.5 rounded-lg flex flex-col gap-1 items-center">
                    <span className="text-[9px] text-slate-450 font-bold">MODEL</span>
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-brand-orange/10 border border-brand-orange/30 flex items-center justify-center">
                      <Zap className="w-3.5 h-3.5 text-brand-orange" />
                    </div>
                    <span className="text-[8px] text-slate-550">LLM Parse</span>
                  </div>
                </div>

                {/* Simulated Code Panel - scaled font and padding to prevent cutoff on mobile */}
                <div className="flex-1 bg-slate-900/40 border border-slate-850 p-2 sm:p-3 rounded-lg flex flex-col justify-between font-mono text-[8.5px] sm:text-[10px] text-slate-400 leading-relaxed overflow-hidden">
                  <div className="text-[8px] sm:text-[9.5px] space-y-0.5">
                    <p className="text-slate-500">// Initialize autonomous routing</p>
                    <p className="text-brand-blue"><span className="text-purple-400">const</span> agent <span className="text-slate-300">=</span> <span className="text-amber-300">new</span> <span className="text-emerald-400">RahvixAgent</span><span className="text-slate-300">({'{'}</span></p>
                    <p className="pl-3 sm:pl-4">model: <span className="text-brand-orange">&quot;gpt-4o-automation&quot;</span>,</p>
                    <p className="pl-3 sm:pl-4">temperature: <span className="text-brand-orange">0.0</span>,</p>
                    <p className="pl-3 sm:pl-4">pipeline: <span className="text-brand-orange">&quot;custom-crm-sync&quot;</span></p>
                    <p className="text-slate-300">{'}'});</p>
                  </div>
                  <div className="border-t border-slate-850/50 pt-1.5 flex items-center justify-between text-[7.5px] sm:text-[8px] text-slate-500 font-semibold uppercase">
                    <span>uptime: 99.9%</span>
                    <span>latency: 48ms</span>
                  </div>
                </div>

                {/* Stats Pill / Chart Graphic */}
                <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
                  <div className="bg-slate-900/50 border border-slate-850 p-2 sm:p-2.5 rounded-lg flex items-center justify-between">
                    <div>
                      <span className="text-[8px] text-slate-550 uppercase font-bold">Efficiency</span>
                      <p className="text-xs font-bold text-white mt-0.5">+340%</p>
                    </div>
                    <div className="h-6 w-10 flex items-end gap-0.5 pb-0.5">
                      <div className="w-1.5 h-2 bg-slate-800 rounded-t" />
                      <div className="w-1.5 h-3 bg-slate-800 rounded-t" />
                      <div className="w-1.5 h-4 bg-brand-blue/60 rounded-t" />
                      <div className="w-1.5 h-6 bg-brand-blue rounded-t" />
                    </div>
                  </div>
                  <div className="bg-slate-900/50 border border-slate-850 p-2 sm:p-2.5 rounded-lg flex items-center justify-between">
                    <div>
                      <span className="text-[8px] text-slate-550 uppercase font-bold">ROI generated</span>
                      <p className="text-xs font-bold text-brand-orange mt-0.5">6.2x</p>
                    </div>
                    <div className="h-6 w-10 flex items-center justify-center">
                      <div className="w-4 h-4 rounded-full border-2 border-brand-orange border-t-transparent animate-spin" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
