import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ChevronRight, Package, Target } from "lucide-react";
import { servicesData } from "@/data/services";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import ServiceVisual from "@/components/ServiceVisual";

// Pre-render all service detail pages at build time
export function generateStaticParams() {
  const params: { id: string }[] = [];
  for (const cat of servicesData) {
    for (const service of cat.services) {
      params.push({ id: service.id });
    }
  }
  return params;
}

// Generate per-page SEO metadata
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let foundService = null;
  let foundCategory = null;

  for (const cat of servicesData) {
    const s = cat.services.find((serv) => serv.id === id);
    if (s) {
      foundService = s;
      foundCategory = cat;
      break;
    }
  }

  if (!foundService || !foundCategory) return {};

  return {
    title: `${foundService.name} | Rahvix Technologies`,
    description: foundService.longDescription.slice(0, 155) + "…",
    openGraph: {
      title: `${foundService.name} | Rahvix Technologies`,
      description: foundService.desc,
    },
  };
}

export default async function ServiceDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Await params as required by Next.js 16
  const { id } = await params;

  let foundService = null;
  let foundCategory = null;

  for (const cat of servicesData) {
    const s = cat.services.find((serv) => serv.id === id);
    if (s) {
      foundService = s;
      foundCategory = cat;
      break;
    }
  }

  if (!foundService || !foundCategory) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-36 pb-20 px-6 overflow-hidden border-b border-slate-900 bg-slate-950/40">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:24px_24px] opacity-10 pointer-events-none" />
        <div 
          className="absolute inset-0 opacity-15 pointer-events-none" 
          style={{ background: `radial-gradient(circle at 50% 0%, ${foundCategory.accentColor}, transparent 75%)` }} 
        />
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Left Column: Text */}
          <div className="lg:col-span-7">
            <Link 
              href="/#services" 
              className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors mb-8 uppercase tracking-wider font-bold"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Services
            </Link>

            <div className="flex items-center gap-3 mb-5">
              <span className={`px-3 py-1 text-[10px] font-mono font-bold tracking-widest rounded bg-slate-900/80 border border-slate-800/85 uppercase ${foundCategory.colorClass}`}>
                {foundCategory.title}
              </span>
              <span className="text-[10px] font-mono text-slate-400 border border-slate-800 px-2.5 py-1 rounded bg-slate-900/80 uppercase font-semibold">
                {foundService.id}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              {foundService.name}
            </h1>
            <p className="text-base sm:text-lg text-slate-300 font-medium leading-relaxed mb-8 max-w-2xl">
              {foundService.desc}
            </p>

            <a 
              href="/#contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-white font-extrabold transition-all hover:scale-105 active:scale-95 shadow-lg"
              style={{ backgroundColor: foundCategory.accentColor, boxShadow: `0 4px 20px ${foundCategory.accentColor}30` }}
            >
              Book a Free Consultation
              <ChevronRight className="w-5 h-5" />
            </a>
          </div>

          {/* Right Column: Visual Mockup */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-[400px] aspect-[4/3] rounded-2xl border border-slate-800 bg-slate-900/30 p-3 shadow-2xl relative overflow-hidden backdrop-blur-md">
              <div className="w-full h-full rounded-xl overflow-hidden relative border border-slate-850">
                <ServiceVisual
                  serviceId={foundService.id}
                  accentColor={foundCategory.accentColor}
                />
              </div>
              <div className="absolute top-5 left-5 px-2.5 py-0.5 rounded bg-slate-950/80 border border-slate-800 font-mono text-[8px] font-bold text-slate-400 tracking-widest uppercase">
                {foundService.id} VISUAL
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        
        {/* Left Column: Description & Benefits */}
        <div className="lg:col-span-7 flex flex-col gap-12">
          
          <div>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2.5">
              <Target className={`w-5 h-5 ${foundCategory.colorClass}`} />
              Overview
            </h2>
            <p className="text-slate-300 leading-relaxed text-base sm:text-lg font-medium">
              {foundService.longDescription}
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2.5">
              <CheckCircle2 className={`w-5 h-5 ${foundCategory.colorClass}`} />
              Key Business Benefits
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {foundService.benefits.map((benefit, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-slate-850 bg-slate-900/20 backdrop-blur-sm">
                  <div className="mt-1.5 shrink-0 w-2 h-2 rounded-full" style={{ backgroundColor: foundCategory.accentColor }} />
                  <span className="text-slate-300 font-medium text-sm leading-snug">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2.5">
              <Package className={`w-5 h-5 ${foundCategory.colorClass}`} />
              What You Get (Deliverables)
            </h2>
            <ul className="flex flex-col gap-3">
              {foundService.deliverables.map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-350 border-b border-slate-900 pb-3 last:border-0">
                  <span className="text-lg font-bold font-mono opacity-40" style={{ color: foundCategory.accentColor }}>0{i + 1}</span>
                  <span className="font-medium text-sm sm:text-base">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Pricing */}
        <div className="lg:col-span-5">
          <div className="sticky top-32 flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-white mb-2">Indian Market Pricing Models</h2>
            
            {foundService.pricing.map((tier, i) => (
              <div 
                key={i} 
                className="relative creative-card p-6 rounded-2xl flex flex-col bg-slate-900/40 border border-slate-850 backdrop-blur-sm"
                style={{ borderTopWidth: i === 1 ? "4px" : "1px", borderTopColor: i === 1 ? foundCategory.accentColor : "" }}
              >
                {i === 1 && (
                  <span 
                    className="absolute -top-3 right-6 px-3 py-0.5 rounded-full text-[10px] font-bold text-white uppercase tracking-wider shadow-md"
                    style={{ backgroundColor: foundCategory.accentColor }}
                  >
                    Most Popular
                  </span>
                )}
                
                <h3 className="text-lg font-bold text-white">{tier.name}</h3>
                <p className="text-slate-450 text-sm mt-1 mb-4 min-h-[40px] font-medium">{tier.description}</p>
                
                <div className="mb-6 flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-white">{tier.price}</span>
                </div>
                
                <ul className="flex flex-col gap-3 mb-8 flex-1">
                  {tier.features.map((feat, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-slate-350">
                      <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-slate-500" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
                
                <a 
                  href="/#contact" 
                  className="w-full py-3 rounded-lg text-center font-extrabold text-sm transition-all border block"
                  style={
                    i === 1 
                      ? { backgroundColor: foundCategory.accentColor, color: "white", borderColor: foundCategory.accentColor } 
                      : { backgroundColor: "transparent", color: "white", borderColor: "rgba(255,255,255,0.08)" }
                  }
                >
                  Request Proposal
                </a>
              </div>
            ))}
            
            <p className="text-[10px] text-center text-slate-500 mt-4 font-mono uppercase tracking-wider font-semibold">
              * Pricing is indicative. GST (18%) applicable as per Govt of India norms.
            </p>
          </div>
        </div>

      </section>

      <Footer />
    </main>
  );
}
