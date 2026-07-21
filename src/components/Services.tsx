"use client";

import React, { useState, useRef, useMemo } from "react";
import { 
  Brain, Database, Cpu, Globe, Smartphone, 
  MapPin, Share2, TrendingUp, Video, Camera, Film, Sparkles, Check, ArrowUpRight
} from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Link from "next/link";
import { servicesData, ServiceCategoryData, ServiceDetail } from "@/data/services";
import Image from "next/image";
import ServiceVisual from "./ServiceVisual";
import { useIsMobile } from "@/hooks/useIsMobile";

// Single canonical interface — removed duplicate that referenced undefined types
interface ServiceCardProps {
  service: ServiceDetail;
  category: ServiceCategoryData;
  index: number;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Brain, Database, Cpu, Globe, Smartphone, 
  MapPin, Share2, TrendingUp, Video, Camera, Film, Sparkles
};

const iconVariants: Variants = {
  initial: { scale: 1, y: 0 },
  hover: { 
    scale: 1.12, 
    y: -6,
    transition: { type: "spring", stiffness: 300, damping: 15 }
  }
};

const blobVariants: Variants = {
  initial: { rotate: 0, scale: 1 },
  hover: { 
    rotate: 15, 
    scale: 1.08,
    transition: { type: "spring", stiffness: 120, damping: 10 }
  }
};

const listContainerVariants: Variants = {
  initial: {},
  hover: {
    transition: {
      staggerChildren: 0.05,
    }
  }
};

const listItemVariants: Variants = {
  initial: { opacity: 0.7, scale: 1 },
  hover: { 
    opacity: 1, 
    scale: 1.05,
    transition: { type: "spring", stiffness: 200, damping: 12 }
  }
};

const arrowVariants: Variants = {
  initial: { opacity: 0, scale: 0.7, x: -4, y: 4 },
  hover: { 
    opacity: 1, 
    scale: 1, 
    x: 0, 
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 15 }
  }
};

const sweepVariants: Variants = {
  initial: { x: "-150%" },
  hover: { 
    x: "150%",
    transition: { duration: 0.75, ease: "easeInOut" }
  }
};

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    }
  }
};

// Module-level helper — defined once, not re-created on every ServiceCard render
const getTicketClass = (title: string): string => {
  switch (title) {
    case "AI & Tech":        return "ticket-ai";
    case "Development":      return "ticket-dev";
    case "Marketing & Growth": return "ticket-marketing";
    case "Creative & Production": return "ticket-creative";
    default:                 return "";
  }
};

function ServiceCard({ service, category, index }: ServiceCardProps) {
  const IconComponent = iconMap[service.iconName] || Brain;
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Single shared hook — no per-card resize listener
  const isMobile = useIsMobile();



  const getVariantsForCategory = (catTitle: string, isMobileMode: boolean): Variants => {
    if (isMobileMode) {
      switch (catTitle) {
        case "AI & Tech":
          return {
            hidden: { opacity: 0, rotateY: -15, scale: 0.92, y: 30 },
            visible: { 
              opacity: 1, 
              rotateY: 0, 
              scale: 1,
              y: 0,
              transition: { type: "spring" as const, stiffness: 85, damping: 14 }
            }
          };
        case "Development":
          return {
            hidden: { opacity: 0, x: -60, scale: 0.95 },
            visible: { 
              opacity: 1, 
              x: 0, 
              scale: 1,
              transition: { type: "spring" as const, stiffness: 80, damping: 15 }
            }
          };
        case "Marketing & Growth":
          return {
            hidden: { opacity: 0, x: 60, scale: 0.95 },
            visible: { 
              opacity: 1, 
              x: 0, 
              scale: 1,
              transition: { type: "spring" as const, stiffness: 80, damping: 15 }
            }
          };
        case "Creative & Production":
          return {
            hidden: { opacity: 0, scale: 0.85, rotate: -2, y: 30 },
            visible: { 
              opacity: 1, 
              scale: 1, 
              rotate: 0,
              y: 0,
              transition: { type: "spring" as const, stiffness: 90, damping: 13 }
            }
          };
        default:
          return {
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 }
          };
      }
    } else {
      return {
        hidden: { opacity: 0, y: 50, scale: 0.93 },
        visible: { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          transition: { 
            type: "spring" as const,
            stiffness: 70,
            damping: 15
          }
        }
      };
    }
  };

  // Memoized — only recomputed when isMobile or category changes, not on every render
  const cardVariants = useMemo(
    () => getVariantsForCategory(category.title, isMobile),
    [category.title, isMobile]
  );

  const ticketClass = useMemo(() => getTicketClass(category.title), [category.title]);

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] max-w-[420px]"
    >
      <Link href={`/services/${service.id}`} className="block w-full h-full">
        {/* Removed infinite float animation — was heavy on CPU for many cards */}
        <motion.div
          ref={cardRef}
          whileHover={{ 
            scale: 1.025, 
            boxShadow: `0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 30px ${category.accentColor}35`,
            transition: { type: "spring", stiffness: 180, damping: 15 }
          }}
          className={`group relative p-7 rounded-2xl overflow-hidden transition-all duration-300 ticket-card-base ${ticketClass} cursor-pointer flex flex-col items-center text-center w-full h-full`}
        >
          <motion.div 
            variants={sweepVariants}
            className="absolute top-0 left-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 pointer-events-none z-20"
          />

          {/* Static CSS-only Spotlight glow on hover */}
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: `radial-gradient(280px circle at center, ${category.accentColor}25 0%, transparent 80%)`
            }}
          />

          {/* Holographic ticket label header */}
          <div className="flex items-center justify-between w-full mb-6 font-mono text-[9px] text-slate-450 tracking-wider relative z-10">
            <span className="flex items-center gap-1 font-bold">
              <span className={`w-1.5 h-1.5 rounded-full ${category.colorClass} animate-pulse`} />
              RT TICKET
            </span>
            <span className="px-2 py-0.5 border border-slate-800 bg-slate-900/80 text-slate-400 rounded font-semibold group-hover:bg-slate-800 group-hover:text-slate-200 group-hover:border-slate-700 transition-colors">
              {service.id}
            </span>
          </div>

          {/* Service Icon with Organic Background shape blob */}
          <motion.div 
            variants={iconVariants}
            className="relative w-12 h-12 flex items-center justify-center mb-5 shrink-0 mx-auto"
            style={{ transform: "translateZ(15px)" }}
          >
            <motion.svg 
              variants={blobVariants}
              viewBox="0 0 100 100" 
              className={`absolute inset-0 w-full h-full opacity-15 group-hover:opacity-25 fill-current ${category.colorClass}`}
            >
              <path d="M25,10 C45,5 85,15 90,40 C95,65 75,85 50,90 C25,95 5,80 10,50 C15,20 5,15 25,10 Z" />
            </motion.svg>
            <IconComponent className={`relative z-10 w-5 h-5 ${category.colorClass} group-hover:text-white transition-colors duration-300`} />
          </motion.div>

          {/* Title */}
          <h4 
            className="text-lg font-bold text-white mb-2 transition-colors duration-350 text-center"
            style={{ transform: "translateZ(20px)" }}
          >
            {service.name}
          </h4>

          {/* Description */}
          <p 
            className="text-slate-400 text-sm leading-relaxed mb-5 group-hover:text-slate-200 transition-colors duration-350 h-16 overflow-hidden font-medium text-center"
            style={{ transform: "translateZ(10px)" }}
          >
            {service.desc}
          </p>

          {/* Service Professional Graphic */}
          <div 
            className="w-full aspect-video rounded-xl overflow-hidden border border-slate-800/80 bg-slate-950 relative mb-5 shadow-sm group-hover:border-slate-700 transition-all duration-300 z-10 shrink-0"
            style={{ transform: "translateZ(10px)" }}
          >
            <ServiceVisual
              serviceId={service.id}
              accentColor={category.accentColor}
            />
          </div>

          {/* Checklist features */}
          <motion.div 
            variants={listContainerVariants}
            className="flex flex-col gap-2 pt-4 border-t border-slate-800/60 group-hover:border-slate-700 transition-colors w-full items-center justify-center"
            style={{ transform: "translateZ(12px)" }}
          >
            {service.features.map((feat, i) => (
              <motion.div 
                key={i} 
                variants={listItemVariants}
                className="flex items-center gap-2 text-xs font-mono text-slate-400 group-hover:text-slate-200 transition-colors duration-350"
              >
                <Check className={`w-3.5 h-3.5 ${category.colorClass} shrink-0`} />
                <span>{feat}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Arrow hover indicator */}
          <motion.div 
            variants={arrowVariants}
            className="absolute bottom-5 right-5 w-5 h-5 rounded border border-slate-800 bg-slate-900 group-hover:bg-slate-850 group-hover:border-slate-700 flex items-center justify-center transition-all duration-300"
          >
            <ArrowUpRight className={`w-3 h-3 ${category.colorClass}`} />
          </motion.div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

export default function Services() {
  const [activeTab, setActiveTab] = useState<string>("All");

  const filterCategories = activeTab === "All" 
    ? servicesData 
    : servicesData.filter(c => c.title === activeTab);

  const totalServices = servicesData.reduce((acc, cat) => acc + cat.services.length, 0);

  return (
    <section id="services" className="relative py-24 px-6 overflow-hidden bg-transparent">
      {/* Background blobs */}
      <div className="absolute top-[10%] right-[5%] w-[400px] h-[400px] rounded-full glow-gold -z-10 opacity-60 pointer-events-none" />
      <div className="absolute bottom-[10%] left-[5%] w-[400px] h-[400px] rounded-full glow-cyan -z-10 opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-slate-800 bg-slate-950/60 backdrop-blur-md w-fit mb-4 shadow-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-ping" />
            <span className="text-[10px] font-bold text-slate-450 uppercase tracking-widest font-mono">
              Capabilities
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6"
          >
            High-Impact Tech <br />
            &amp; Marketing Services
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-medium"
          >
            We deploy a synergistic blend of artificial intelligence, premium software engineering, and high-converting marketing campaigns to scale your operations.
          </motion.p>
        </div>

        {/* Filters Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-16 max-w-3xl mx-auto border border-slate-800 p-1.5 rounded-xl bg-slate-900/45 backdrop-blur-md shadow-lg relative z-10"
          role="tablist"
          aria-label="Filter services by category"
        >
          {[
            { label: "All", count: totalServices },
            ...servicesData.map(c => ({ label: c.title, count: c.services.length }))
          ].map(({ label, count }) => (
            <button
              key={label}
              role="tab"
              aria-selected={activeTab === label}
              onClick={() => setActiveTab(label)}
              className={`relative px-4 py-2.5 text-xs font-mono font-bold rounded-lg transition-all duration-300 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-orange focus-visible:outline-offset-2 ${
                activeTab === label
                  ? "text-white"
                  : "text-slate-450 hover:text-white"
              }`}
            >
              {activeTab === label && (
               <motion.div
                 layoutId="active-tab"
                 className="absolute inset-0 bg-slate-950/85 rounded-lg border border-slate-800 shadow-sm"
                 transition={{ type: "spring", stiffness: 380, damping: 30 }}
               />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                {label}
                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                  activeTab === label
                    ? "bg-brand-orange/15 text-brand-orange"
                    : "bg-slate-900/60 text-slate-400"
                }`}>
                  {count}
                </span>
              </span>
            </button>
          ))}
        </motion.div>

        {/* Categories Display */}
        <div className="flex flex-col gap-16">
          <AnimatePresence mode="popLayout">
            {filterCategories.map((category) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-8"
              >
                {/* Category Header */}
                <div className="flex items-center gap-4">
                  <h3 className={`text-sm font-extrabold tracking-wider uppercase font-mono ${category.colorClass}`}>
                    {category.title}
                  </h3>
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-slate-800 to-transparent" />
                </div>

                {/* Services Flex Container */}
                <div className="flex flex-wrap justify-center gap-6 w-full">
                  {category.services.map((service, idx) => (
                    <ServiceCard 
                      key={service.name} 
                      service={service} 
                      category={category} 
                      index={idx}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
