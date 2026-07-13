"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, TrendingUp, Cpu, Sparkles, Globe, Shield } from "lucide-react";

interface Project {
  title: string;
  category: string;
  desc: string;
  metrics: string[];
  roi: string;
  tags: string[];
  gradient: string;
  icon: React.ComponentType<{ className?: string }>;
}

export default function Projects() {
  const projects: Project[] = [
    {
      title: "OmniFlow AI System",
      category: "AI & Automation",
      desc: "Architected a custom autonomous agent workflow for a global retail merchant, parsing customer tickets and generating draft resolutions instantly.",
      metrics: ["+340% Ticket Speed", "45% Operation Cost Saved"],
      roi: "6.2x ROI in 90 Days",
      tags: ["Python", "FastAPI", "OpenAI API", "Redis"],
      gradient: "from-brand-blue/12 to-slate-950",
      icon: Cpu,
    },
    {
      title: "Optima CRM Platform",
      category: "Elite Web Dev",
      desc: "Designed and engineered a high-load, multi-tenant enterprise CRM with interactive analytics dashboards, real-time database syncing, and granular security controls.",
      metrics: ["8,500+ Active Users", "99.98% System Uptime"],
      roi: "₹10 Cr+ ARR Added",
      tags: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind"],
      gradient: "from-brand-orange/12 to-slate-950",
      icon: Globe,
    },
    {
      title: "Aura Growth Funnel",
      category: "Digital Growth",
      desc: "Integrated a custom SEO pipeline with paid performance ad campaigns on Google and Meta for a high-ticket skincare brand, boosting organic ranking.",
      metrics: ["4.8x Average ROAS", "180% Organic Growth"],
      roi: "₹28 Cr+ Sales Volume",
      tags: ["Meta Ads", "Google Maps SEO", "Funnel Optim"],
      gradient: "from-brand-orange/12 to-slate-950",
      icon: TrendingUp,
    },
    {
      title: "Apex Cinematic Launch",
      category: "Creative Production",
      desc: "Produced full-suite cinematic commercial videos and targeted UGC ad scripts to execute the global pre-seed launching campaign for a high-ticket tech startup.",
      metrics: ["12M Video Impressions", "+210% CTR Increase"],
      roi: "₹7 Cr+ Funding Raised",
      tags: ["Premiere", "UGC Video", "Cinematic Ads"],
      gradient: "from-brand-blue/12 to-slate-950",
      icon: Sparkles,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useRef(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (!isVisible.current) return;
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % projects.length);
    }, 5000);
  }, [projects.length]);

  // Pause autoplay when section scrolls out of view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible.current = entry.isIntersecting;
      },
      { threshold: 0.2 }
    );
    const el = sectionRef.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, []);

  // Start timer on mount
  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [startTimer]);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 300 : -300,
      opacity: 0
    })
  };

  // Dynamic interactive visual preview engine for projects
  const renderProjectMockup = (index: number) => {
    if (index === 0) {
      return (
        <div className="my-auto w-full max-w-[280px] h-[148px] relative z-10 select-none">
          <svg viewBox="0 0 255 130" className="w-full h-full" fill="none" overflow="visible">
            <defs>
              <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="var(--brand-teal)" stopOpacity="0.45" />
                <stop offset="100%" stopColor="var(--brand-purple)" stopOpacity="0" />
              </radialGradient>
            </defs>
            <line x1="46" y1="55" x2="78" y2="55" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" strokeDasharray="4 3" />
            <line x1="112" y1="55" x2="142" y2="55" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" strokeDasharray="4 3" />
            <line x1="178" y1="55" x2="208" y2="55" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" strokeDasharray="4 3" />
            <motion.circle r="3" cy="55" fill="#14b8a6"
              animate={{ cx: [46, 78], opacity: [0, 1, 1, 0] }}
              transition={{ repeat: Infinity, duration: 1.2, ease: "linear", delay: 0 }}
            />
            <motion.circle r="3" cy="55" fill="#a855f7"
              animate={{ cx: [112, 142], opacity: [0, 1, 1, 0] }}
              transition={{ repeat: Infinity, duration: 1.2, ease: "linear", delay: 0.6 }}
            />
            <motion.circle r="3" cy="55" fill="#f97316"
              animate={{ cx: [178, 208], opacity: [0, 1, 1, 0] }}
              transition={{ repeat: Infinity, duration: 1.2, ease: "linear", delay: 1.2 }}
            />
            <circle cx="30" cy="55" r="16" fill="#0f172a" stroke="#14b8a6" strokeWidth="1.5" />
            <text x="30" y="59" textAnchor="middle" fill="#14b8a6" fontSize="8" fontFamily="monospace" fontWeight="800">IN</text>
            <text x="30" y="82" textAnchor="middle" fill="#94a3b8" fontSize="7" fontFamily="monospace" fontWeight="600">Ticket</text>
            <text x="30" y="91" textAnchor="middle" fill="#94a3b8" fontSize="7" fontFamily="monospace" fontWeight="600">Log</text>
            <circle cx="95" cy="55" r="17" fill="#0f172a" stroke="rgba(168,85,247,0.6)" strokeWidth="1.5" />
            <text x="95" y="52" textAnchor="middle" fill="#c4b5fd" fontSize="7" fontFamily="monospace" fontWeight="800">NLP</text>
            <text x="95" y="62" textAnchor="middle" fill="#c4b5fd" fontSize="7" fontFamily="monospace" fontWeight="800">Parse</text>
            <text x="95" y="82" textAnchor="middle" fill="#94a3b8" fontSize="7" fontFamily="monospace" fontWeight="600">Classify</text>
            <motion.circle cx="160" cy="55" r="26"
              fill="url(#coreGlow)"
              animate={{ r: [22, 28, 22], opacity: [0.6, 1, 0.6] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            />
            <circle cx="160" cy="55" r="22" fill="#0f172a" stroke="#14b8a6" strokeWidth="2" />
            <text x="160" y="52" textAnchor="middle" fill="#e2e8f0" fontSize="8" fontFamily="monospace" fontWeight="900">AI</text>
            <text x="160" y="63" textAnchor="middle" fill="#e2e8f0" fontSize="8" fontFamily="monospace" fontWeight="900">CORE</text>
            <text x="160" y="87" textAnchor="middle" fill="#94a3b8" fontSize="7" fontFamily="monospace" fontWeight="600">LLM Agent</text>
            <circle cx="225" cy="55" r="16" fill="#0f172a" stroke="rgba(168,85,247,0.8)" strokeWidth="1.5" />
            <text x="225" y="59" textAnchor="middle" fill="#a855f7" fontSize="8" fontFamily="monospace" fontWeight="800">OUT</text>
            <text x="225" y="82" textAnchor="middle" fill="#94a3b8" fontSize="7" fontFamily="monospace" fontWeight="600">CRM</text>
            <text x="225" y="91" textAnchor="middle" fill="#94a3b8" fontSize="7" fontFamily="monospace" fontWeight="600">Update</text>
            <rect x="4" y="108" width="56" height="14" rx="7" fill="rgba(20,184,166,0.12)" stroke="rgba(20,184,166,0.3)" strokeWidth="1" />
            <text x="32" y="119" textAnchor="middle" fill="#14b8a6" fontSize="7" fontFamily="monospace" fontWeight="700">+340% Speed</text>
            <rect x="70" y="108" width="68" height="14" rx="7" fill="rgba(249,115,22,0.12)" stroke="rgba(249,115,22,0.3)" strokeWidth="1" />
            <text x="104" y="119" textAnchor="middle" fill="#f97316" fontSize="7" fontFamily="monospace" fontWeight="700">45% Cost Saved</text>
            <rect x="148" y="108" width="56" height="14" rx="7" fill="rgba(168,85,247,0.12)" stroke="rgba(168,85,247,0.3)" strokeWidth="1" />
            <text x="176" y="119" textAnchor="middle" fill="#a855f7" fontSize="7" fontFamily="monospace" fontWeight="700">6.2x ROI</text>
          </svg>
        </div>
      );
    }

    if (index === 1) {
      const barHeights = [40, 75, 55, 95, 80];
      return (
        <div className="my-auto w-full max-w-[280px] h-[140px] flex items-end justify-between px-6 pb-2 relative z-10 select-none">
          {barHeights.map((h, i) => (
            <div key={i} className="flex flex-col items-center gap-1 w-6">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: h }}
                transition={{ type: "spring", stiffness: 100, damping: 12, delay: i * 0.1 }}
                className="w-full rounded-t bg-gradient-to-t from-brand-orange/30 to-brand-blue/80 border border-brand-blue/30"
              />
              <span className="text-[8px] font-mono text-slate-400 font-semibold">M{i+1}</span>
            </div>
          ))}
        </div>
      );
    }

    if (index === 2) {
      return (
        <div className="my-auto w-full max-w-[280px] h-[140px] relative z-10 flex items-center justify-center select-none px-4">
          <svg className="w-full h-full" viewBox="0 0 200 100" fill="none">
            <line x1="0" y1="20" x2="200" y2="20" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            <line x1="0" y1="50" x2="200" y2="50" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            <line x1="0" y1="80" x2="200" y2="80" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            <path d="M 0 90 Q 50 85 90 70 T 170 30 L 170 90 Z" fill="url(#grad)" opacity="0.1" />
            <motion.path
              d="M 0 90 Q 50 85 90 70 T 170 30"
              stroke="url(#strokeGrad)"
              strokeWidth="3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
            <motion.circle
              cx="170"
              cy="30"
              r="4.5"
              fill="var(--brand-orange)"
              animate={{ r: [4, 7, 4] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
            <defs>
              <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--brand-orange)" stopOpacity="0.8" />
                <stop offset="100%" stopColor="var(--brand-orange)" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="strokeGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="var(--brand-teal)" />
                <stop offset="100%" stopColor="var(--brand-orange)" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      );
    }

    const waveBars = [30, 60, 45, 90, 75, 45, 60, 30, 80, 50, 40, 60, 20];
    return (
      <div className="my-auto w-full max-w-[280px] h-[140px] flex items-center justify-between px-2 relative z-10 select-none">
        {waveBars.map((h, i) => (
          <motion.div
            key={i}
            animate={{ height: [h - 10, h + 10, h - 10] }}
            transition={{
              repeat: Infinity,
              duration: 1.2 + (i % 3) * 0.2,
              ease: "easeInOut",
            }}
            className="w-1 rounded-full bg-gradient-to-t from-brand-orange/40 to-brand-blue/80 border-t border-slate-800/60"
            style={{ height: h * 0.8 }}
          />
        ))}
      </div>
    );
  };

  // Manual navigation — resets the autoplay timer so user click isn't overridden
  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % projects.length);
    startTimer();
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
    startTimer();
  };

  const currentProject = projects[currentIndex];
  const IconComponent = currentProject.icon;

  return (
    <section id="projects" ref={sectionRef} className="relative py-24 px-6 overflow-hidden bg-transparent">
      {/* Background decoration */}
      <div className="absolute top-[20%] left-0 w-[450px] h-[450px] rounded-full glow-cyan -z-10 opacity-20" />
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] rounded-full glow-blue -z-10 opacity-25" />

      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-slate-800 bg-slate-950/80 md:bg-slate-950/60 md:backdrop-blur-md w-fit mb-4 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-teal animate-ping" />
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                Case Studies
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
              Proven Metrics. <br />
              High-Ticket Results.
            </h2>
          </div>

          {/* Nav arrows */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              className="p-3 rounded-lg border border-slate-800 bg-slate-900 hover:bg-slate-850 hover:border-slate-700 text-slate-300 hover:text-white shadow-md transition-all cursor-pointer"
              aria-label="Previous project"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="p-3 rounded-lg border border-slate-800 bg-slate-900 hover:bg-slate-850 hover:border-slate-700 text-slate-300 hover:text-white shadow-md transition-all cursor-pointer"
              aria-label="Next project"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Slide Area */}
        <div className="relative min-h-[460px] lg:min-h-[380px] w-full flex items-center justify-center">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(e, info) => {
                const swipeThreshold = 50;
                if (info.offset.x < -swipeThreshold) {
                  handleNext();
                } else if (info.offset.x > swipeThreshold) {
                  handlePrev();
                }
              }}
              className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center cursor-grab active:cursor-grabbing"
            >
              {/* Left Side: Project graphics mock */}
              <div className="lg:col-span-6 flex justify-center order-2 lg:order-1">
                <div
                  className={`w-full aspect-[4/3] rounded-2xl border border-slate-800 p-6 flex flex-col justify-between shadow-lg bg-gradient-to-tr ${currentProject.gradient} relative overflow-hidden`}
                >
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-slate-950/20 filter" />
                  <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center shadow-sm">
                        <IconComponent className="w-4 h-4 text-slate-300" />
                      </div>
                      <span className="text-xs font-mono font-bold text-slate-300">{currentProject.category}</span>
                    </div>
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                    </div>
                  </div>
                  <div className="flex justify-center items-center w-full">
                    {renderProjectMockup(currentIndex)}
                  </div>
                  <div className="flex justify-between border-t border-slate-800/60 pt-4 relative z-10">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono font-bold">
                      <Shield className="w-3.5 h-3.5 text-brand-blue" />
                      <span>Certified Audit</span>
                    </div>
                    <span className="text-xs font-mono font-extrabold text-brand-orange bg-brand-orange/10 border border-brand-orange/25 px-2.5 py-1 rounded-full">
                      {currentProject.roi}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Side: Copy, metrics list, tags */}
              <div className="lg:col-span-6 flex flex-col order-1 lg:order-2">
                <span className="text-xs font-mono font-extrabold text-brand-blue uppercase tracking-widest mb-3">
                  {currentProject.category}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-4">
                  {currentProject.title}
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-medium">
                  {currentProject.desc}
                </p>
                <div className="grid grid-cols-2 gap-4 bg-slate-900/40 border border-slate-800/80 p-4 rounded-xl mb-6 shadow-sm">
                  <div>
                    <span className="text-[9px] text-slate-500 font-extrabold uppercase tracking-widest">Impact Metric</span>
                    <p className="text-sm font-extrabold text-white mt-1 font-mono">{currentProject.metrics[0]}</p>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-500 font-extrabold uppercase tracking-widest">Efficiency Metric</span>
                    <p className="text-sm font-extrabold text-white mt-1 font-mono">{currentProject.metrics[1]}</p>
                  </div>
                </div>
                <div className="mb-6 py-2 px-3.5 border border-brand-orange/25 bg-brand-orange/8 w-fit rounded-lg flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
                  <span className="text-xs font-bold text-brand-orange font-mono">Net Return: {currentProject.roi}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {currentProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded bg-slate-900/60 border border-slate-850 text-[10px] font-bold text-slate-350 font-mono shadow-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel indicator dots */}
        <div className="flex items-center justify-center gap-2 mt-12">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
                startTimer();
              }}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                index === currentIndex
                  ? "bg-brand-teal w-6"
                  : "bg-slate-800 hover:bg-slate-700 w-2"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
