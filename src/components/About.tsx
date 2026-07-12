"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, Zap, Target, Award } from "lucide-react";

export default function About() {
  const pillars = [
    {
      icon: Zap,
      title: "High-Speed Execution",
      desc: "We assemble high-end custom software pipelines in rapid, high-intensity sprints. Zero latency, clean compilation, and immediate deployments.",
      colorClass: "text-brand-orange",
      bgGlow: "rgba(250, 90, 21, 0.05)"
    },
    {
      icon: Target,
      title: "ROI-Focused Systems",
      desc: "Every system, script, and ad funnel we build is strictly optimized for business metrics: client acquisition, conversion rate, and labor cost reduction.",
      colorClass: "text-brand-blue",
      bgGlow: "rgba(59, 130, 246, 0.05)"
    },
    {
      icon: Shield,
      title: "Bank-Grade Standards",
      desc: "Our cloud applications are engineered with enterprise-level security protocols, zero-downtime database configurations, and strict data confidentiality.",
      colorClass: "text-brand-blue",
      bgGlow: "rgba(59, 130, 246, 0.05)"
    },
    {
      icon: Award,
      title: "Elite Engineering Guild",
      desc: "We do not hire managers or juniors. Rahvix is a focused team of elite full-stack builders, database designers, and performance marketers.",
      colorClass: "text-brand-orange",
      bgGlow: "rgba(250, 90, 21, 0.05)"
    }
  ];

  return (
    <section id="about" className="relative py-24 px-6 overflow-hidden bg-transparent">
      {/* Background decoration blobs */}
      <div className="absolute top-[20%] right-[-10%] w-[450px] h-[450px] rounded-full glow-gold opacity-15 pointer-events-none -z-10" />
      <div className="absolute bottom-[20%] left-[-10%] w-[450px] h-[450px] rounded-full glow-blue opacity-15 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-slate-200 bg-slate-50/80 md:bg-slate-50/60 md:backdrop-blur-md w-fit mb-4 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-ping" />
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">
              Who We Are
            </span>
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-6"
          >
            Engineered for Execution. <br />
            Built for Compounding Growth.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-medium"
          >
            Rahvix Technologies is a next-gen engineering studio. We build the high-speed code pipelines and growth systems that propel modern operations forward.
          </motion.p>
        </div>

        {/* Split Grid Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Side: Agency Mission & Description */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, type: "spring", stiffness: 80 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="creative-card p-8 rounded-2xl bg-white/30 border border-slate-850 relative overflow-hidden backdrop-blur-sm">
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-orange/5 rounded-bl-[100px] border-b border-l border-slate-850" />
              <h3 className="text-xl font-extrabold text-slate-900 mb-4">Our Core Philosophy</h3>
              <p className="text-slate-600 text-sm leading-relaxed font-medium">
                Most agencies focus on pitch decks, slide shows, and generic templates. At Rahvix, we build functional software models that automate manual work and run optimized user acquisition tracks.
              </p>
              <div className="mt-6 flex flex-col gap-4 font-mono text-[10px] text-slate-500 uppercase font-semibold">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
                  <span>No outsourcing: All modules built in-house</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
                  <span>Iterative staging: Inspect progress live</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
                  <span>Long-term metrics: Continuous SLA monitoring</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Key Pillars Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
            {pillars.map((pillar, idx) => {
              const PillarIcon = pillar.icon;
              return (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-45px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ 
                    scale: 1.03, 
                    y: -4,
                    boxShadow: `0 20px 40px -10px ${pillar.bgGlow.replace('0.05', '0.18')}`,
                    transition: { type: "spring", stiffness: 250, damping: 18 }
                  }}
                  className="creative-card p-6 rounded-2xl bg-white/20 border border-slate-850/80 hover:border-slate-300/80 transition-colors duration-300 relative group flex flex-col justify-between cursor-default"
                >
                  <div className="flex flex-col gap-4">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center border border-slate-200 bg-slate-50 shadow-sm shrink-0" style={{ boxShadow: `0 4px 10px ${pillar.bgGlow}` }}>
                      <PillarIcon className={`w-4 h-4 ${pillar.colorClass}`} />
                    </div>
                    <div>
                      <h4 className="text-md font-bold text-slate-900 mb-2">{pillar.title}</h4>
                      <p className="text-slate-600 text-xs leading-relaxed font-medium">{pillar.desc}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
