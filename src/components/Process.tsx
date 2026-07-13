"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Eye, Compass, Code, Rocket, BarChart } from "lucide-react";
import { useIsMobile } from "@/hooks/useIsMobile";

interface ProcessStep {
  num: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  desc: string;
  colorClass: string;
  shadowColor: string;
  accentColor: string;
}

function StepCard({
  step,
  dir,
  index,
}: {
  step: ProcessStep;
  dir: "left" | "right";
  index: number;
}) {
  // Single shared hook — no per-card resize listener
  const isMobile = useIsMobile();

  const slideFromLeft = isMobile ? (index % 2 === 0) : (dir === "left");

  return (
    <motion.div
      initial={{ opacity: 0, x: slideFromLeft ? -50 : 50, scale: 0.95 }}
      whileInView={{ opacity: 1, x: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ type: "spring", stiffness: isMobile ? 80 : 90, damping: 14 }}
      className="creative-card p-6 rounded-2xl w-full max-w-[420px] text-left"
    >
      <span className={`font-mono text-xs font-bold uppercase tracking-wider ${step.colorClass}`}>
        Step {step.num}
      </span>
      <h3 className="text-lg font-bold text-white mt-1.5 mb-2">{step.title}</h3>
      <p className="text-slate-300 text-sm leading-relaxed font-medium">{step.desc}</p>
    </motion.div>
  );
}

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
    restDelta: 0.001
  });

  const steps: ProcessStep[] = [
    {
      num: "01",
      title: "Discovery",
      icon: Eye,
      desc: "We perform an extensive audit of your operations, database structures, marketing assets, and software configurations to pinpoint precise bottlenecks.",
      colorClass: "text-brand-teal",
      shadowColor: "rgba(6, 182, 212, 0.2)",
      accentColor: "#06b6d4"
    },
    {
      num: "02",
      title: "Strategy",
      icon: Compass,
      desc: "Our engineering and marketing leads architect custom automation paths, user journey flows, tech stack mappings, and performance marketing strategies.",
      colorClass: "text-brand-purple",
      shadowColor: "rgba(124, 58, 237, 0.2)",
      accentColor: "#7c3aed"
    },
    {
      num: "03",
      title: "Build",
      icon: Code,
      desc: "Elite full-stack engineers and AI system builders assemble custom systems in high-intensity sprints. You see results live through staging endpoints.",
      colorClass: "text-brand-orange",
      shadowColor: "rgba(250, 90, 21, 0.15)",
      accentColor: "#fa5a15"
    },
    {
      num: "04",
      title: "Launch",
      icon: Rocket,
      desc: "We run automated stress tests, speed checks, and secure credential migrations before initiating a seamless server release.",
      colorClass: "text-brand-teal",
      shadowColor: "rgba(6, 182, 212, 0.2)",
      accentColor: "#06b6d4"
    },
    {
      num: "05",
      title: "Scale",
      icon: BarChart,
      desc: "We launch target ad funnels, monitor LLM logs, refine database indexes, and continually optimize configurations for maximum, compounding ROI.",
      colorClass: "text-brand-orange",
      shadowColor: "rgba(250, 90, 21, 0.15)",
      accentColor: "#fa5a15"
    },
  ];

  return (
    <section id="process" ref={containerRef} className="relative py-24 px-6 overflow-hidden bg-transparent">
      {/* Background neon blob */}
      <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full glow-blue -z-10 opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-24">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-slate-800 bg-slate-950/80 md:bg-slate-950/60 md:backdrop-blur-md w-fit mb-4 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-ping" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">
              Roadmap
            </span>
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6"
          >
            The Automated Lifecycle
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-medium"
          >
            An optimized workflow engineered to transition your operations from raw blueprints to automated, hyper-performing digital products.
          </motion.p>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-5xl mx-auto">
          {/* Background track line */}
          <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-[2px] bg-slate-800 -translate-x-1/2 z-0" />
          
          {/* Glowing scroll-linked active line */}
          <motion.div
            className="absolute left-5 md:left-1/2 top-0 w-[2px] bg-gradient-to-b from-brand-orange via-brand-blue to-brand-blue -translate-x-1/2 z-10 origin-top"
            style={{ scaleY, height: "100%" }}
          />

          {/* Steps list */}
          <div className="flex flex-col gap-12 relative z-20">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              const isEven = index % 2 === 0;

              return (
                <div
                  key={step.num}
                  className="flex items-center relative w-full"
                >
                  {/* Timeline Badge */}
                  <div className="absolute left-5 md:left-1/2 -translate-x-1/2 flex items-center justify-center z-30">
                    <motion.div
                      initial={{ scale: 0.5, rotate: -30, opacity: 0 }}
                      whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ type: "spring", stiffness: 200, damping: 12 }}
                      whileHover={{ scale: 1.15 }}
                      className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center shadow-sm cursor-pointer hover:border-slate-700 group"
                      style={{ boxShadow: `0 4px 15px rgba(0,0,0,0.4), 0 0 12px ${step.shadowColor}` }}
                      title={step.title}
                    >
                      <IconComponent className={`w-4 h-4 text-slate-400 group-hover:${step.colorClass} transition-colors`} />
                    </motion.div>
                  </div>

                  {/* Left side — desktop only, even-numbered steps */}
                  <div className="hidden md:flex w-1/2 pr-12 justify-end items-center">
                    {isEven && <StepCard step={step} dir="left" index={index} />}
                  </div>

                  {/* Right side — always shown on mobile; odd-numbered on desktop */}
                  <div className="w-full pl-16 md:w-1/2 md:pl-12 flex justify-start items-center">
                    {/* On mobile always show. On desktop only show odd-numbered steps. */}
                    <div className={isEven ? "md:hidden w-full" : "w-full"}>
                      <StepCard step={step} dir="right" index={index} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
