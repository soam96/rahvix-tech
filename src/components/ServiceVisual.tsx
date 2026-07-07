"use client";

import React from "react";
import { motion } from "framer-motion";

interface ServiceVisualProps {
  serviceId: string;
  accentColor: string;
  className?: string;
}

export default function ServiceVisual({ serviceId, accentColor, className = "" }: ServiceVisualProps) {
  // Common container motion
  const hoverTransition = { duration: 0.5, ease: "easeOut" };

  switch (serviceId) {
    // ==========================================
    // 1. AI Automation (RT-AI-01)
    // ==========================================
    case "RT-AI-01":
      return (
        <div className={`relative w-full h-full bg-slate-950 flex items-center justify-center overflow-hidden p-6 rounded-xl ${className}`}>
          {/* Animated Matrix Grid */}
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-[size:24px_24px]" />
          
          <svg className="w-full h-full max-w-[280px] max-h-[160px]" viewBox="0 0 240 140" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="aiGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor={accentColor} stopOpacity="0.8" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            {/* Connection Paths */}
            <motion.path 
              d="M 20 70 Q 70 30 120 70 T 220 70" 
              stroke={accentColor} 
              strokeWidth="1.5" 
              strokeDasharray="4 4"
              animate={{ strokeDashoffset: [0, -20] }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            />
            <motion.path 
              d="M 20 70 Q 70 110 120 70 T 220 70" 
              stroke="#06b6d4" 
              strokeWidth="1.5" 
              strokeDasharray="4 4"
              animate={{ strokeDashoffset: [0, 20] }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            />
            {/* Nodes */}
            <circle cx="20" cy="70" r="5" fill="#334155" />
            <circle cx="70" cy="45" r="4" fill="#475569" />
            <circle cx="70" cy="95" r="4" fill="#475569" />
            <circle cx="170" cy="45" r="4" fill="#475569" />
            <circle cx="170" cy="95" r="4" fill="#475569" />
            <circle cx="220" cy="70" r="5" fill="#334155" />

            {/* Central glowing processor */}
            <g transform="translate(100, 50)">
              <rect x="0" y="0" width="40" height="40" rx="8" fill="url(#aiGrad)" stroke={accentColor} strokeWidth="1.5" className="backdrop-blur-sm" />
              <motion.circle 
                cx="20" 
                cy="20" 
                r="10" 
                stroke="#ffffff" 
                strokeWidth="1"
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.8, 0.3] }}
                transition={{ repeat: Infinity, duration: 3 }}
              />
              <path d="M16 20 L24 20 M20 16 L20 24" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
            </g>
          </svg>
        </div>
      );

    // ==========================================
    // 2. Custom CRM Solutions (RT-CRM-02)
    // ==========================================
    case "RT-CRM-02":
      return (
        <div className={`relative w-full h-full bg-slate-900 flex items-center justify-center overflow-hidden p-4 rounded-xl ${className}`}>
          {/* Mockup CRM Dashboard window */}
          <div className="w-11/12 h-5/6 bg-slate-950/80 rounded-lg border border-slate-800 flex flex-col overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="h-6 border-b border-slate-800 px-3 flex items-center justify-between bg-slate-900/50">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
              </div>
              <div className="w-24 h-2 bg-slate-800 rounded-sm" />
              <div className="w-4 h-4 rounded-full bg-slate-800" />
            </div>
            {/* Content area */}
            <div className="flex-1 flex p-2 gap-2">
              {/* Sidebar */}
              <div className="w-1/4 flex flex-col gap-1.5 border-r border-slate-900/80 pr-1.5">
                <div className="w-full h-3 bg-slate-800 rounded-sm" />
                <div className="w-4/5 h-2 bg-slate-900 rounded-sm" />
                <div className="w-3/4 h-2 bg-slate-900 rounded-sm" />
                <div className="w-2/3 h-2 bg-slate-900 rounded-sm" />
              </div>
              {/* Analytics main view */}
              <div className="flex-1 flex flex-col gap-2">
                {/* Stats cards */}
                <div className="flex gap-1.5">
                  <div className="flex-1 h-5 bg-slate-900/80 border border-slate-800 rounded-sm p-1 flex items-center justify-between">
                    <span className="text-[5px] text-slate-500">LEADS</span>
                    <span className="text-[6px] font-bold text-green-400 font-mono">+42%</span>
                  </div>
                  <div className="flex-1 h-5 bg-slate-900/80 border border-slate-800 rounded-sm p-1 flex items-center justify-between">
                    <span className="text-[5px] text-slate-500">SALES</span>
                    <span className="text-[6px] font-bold text-cyan-400 font-mono">12.5k</span>
                  </div>
                </div>
                {/* Visual Area Chart */}
                <div className="flex-1 border border-slate-800/80 rounded-sm bg-slate-900/30 p-1.5 relative overflow-hidden flex items-end">
                  <svg className="w-full h-full" viewBox="0 0 120 40">
                    <defs>
                      <linearGradient id="crmChartGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={accentColor} stopOpacity="0.4" />
                        <stop offset="100%" stopColor={accentColor} stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <motion.path
                      d="M 0 35 Q 25 15 50 25 T 100 10 L 120 15 L 120 40 L 0 40 Z"
                      fill="url(#crmChartGrad)"
                    />
                    <motion.path
                      d="M 0 35 Q 25 15 50 25 T 100 10 L 120 15"
                      stroke={accentColor}
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    // ==========================================
    // 3. Enterprise IT Setup (RT-ENT-03)
    // ==========================================
    case "RT-ENT-03":
      return (
        <div className={`relative w-full h-full bg-slate-950 flex items-center justify-center overflow-hidden p-4 rounded-xl ${className}`}>
          {/* Server Rack visual */}
          <div className="w-2/3 h-5/6 bg-slate-900 border border-slate-800 rounded-lg flex flex-col p-2.5 gap-2 relative shadow-2xl">
            {/* Blinking server plates */}
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-6 border border-slate-800 rounded bg-slate-950/80 px-2 flex items-center justify-between">
                <div className="flex gap-1.5 items-center">
                  <div className="w-1.5 h-1.5 bg-slate-800 rounded-sm" />
                  <div className="w-10 h-1 bg-slate-900 rounded-sm" />
                </div>
                <div className="flex gap-1">
                  <motion.div 
                    animate={{ opacity: [1, 0.4, 1] }} 
                    transition={{ repeat: Infinity, duration: 1.2 + i * 0.3 }} 
                    className="w-1 h-1 rounded-full bg-green-500" 
                  />
                  <motion.div 
                    animate={{ opacity: [0.3, 1, 0.3] }} 
                    transition={{ repeat: Infinity, duration: 0.8 + i * 0.2 }} 
                    className="w-1 h-1 rounded-full bg-cyan-500" 
                  />
                </div>
              </div>
            ))}
            {/* Glass security emblem overlay */}
            <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[1.5px] flex items-center justify-center">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="w-14 h-14 rounded-full border border-slate-700 bg-slate-900/90 shadow-xl flex items-center justify-center"
              >
                <svg className="w-7 h-7 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </motion.div>
            </div>
          </div>
        </div>
      );

    // ==========================================
    // 4. Web Development (RT-DEV-01)
    // ==========================================
    case "RT-DEV-01":
      return (
        <div className={`relative w-full h-full bg-slate-900 flex items-center justify-center overflow-hidden p-4 rounded-xl ${className}`}>
          {/* Split IDE and browser window mockup */}
          <div className="w-11/12 h-5/6 flex rounded-lg border border-slate-800 overflow-hidden shadow-2xl bg-slate-950">
            {/* Code Window (Left) */}
            <div className="w-1/2 border-r border-slate-800 flex flex-col">
              <div className="h-5 px-2 flex items-center gap-1 border-b border-slate-900 bg-slate-950">
                <div className="w-1 h-1 rounded-full bg-slate-700" />
                <span className="text-[5px] text-slate-500 font-mono">Page.tsx</span>
              </div>
              <div className="flex-1 p-2 flex flex-col gap-1 font-mono text-[4px] text-slate-500">
                <div className="text-purple-400">import React from &apos;react&apos;;</div>
                <div className="text-blue-400">export default function App() &#123;</div>
                <div className="pl-2 text-slate-400">return (</div>
                <div className="pl-4 text-green-400">&lt;div className=&quot;w-full bg-slate-50&quot;&gt;</div>
                <div className="pl-6 text-yellow-400">&lt;Navbar logo=&#123;logo&#125; /&gt;</div>
                <div className="pl-6 text-yellow-400">&lt;Hero title=&quot;Next-Gen&quot; /&gt;</div>
                <div className="pl-4 text-green-400">&lt;/div&gt;</div>
                <div className="pl-2 text-slate-400">);</div>
                <div className="text-blue-400">&#125;</div>
              </div>
            </div>
            {/* Render Window (Right) */}
            <div className="w-1/2 flex flex-col bg-slate-900/40">
              <div className="h-5 px-2 flex items-center gap-1 border-b border-slate-800 bg-slate-950/60 justify-between">
                <div className="w-16 h-2 bg-slate-800 rounded-sm" />
                <div className="w-4 h-2 bg-green-500/20 rounded-[2px] flex items-center justify-center">
                  <span className="text-[4px] text-green-400 font-bold">100</span>
                </div>
              </div>
              <div className="flex-1 p-2 flex flex-col gap-2">
                <div className="w-full h-3 bg-slate-800/80 rounded-[2px] flex items-center px-1">
                  <div className="w-4 h-1 bg-slate-600 rounded-sm" />
                </div>
                <div className="flex-1 border border-slate-800/60 rounded-[2px] bg-slate-950/40 flex flex-col items-center justify-center gap-1.5 p-1">
                  <div className="w-10 h-1 bg-slate-800 rounded-sm" />
                  <div className="w-12 h-1 bg-slate-800 rounded-sm" />
                  <div className="w-6 h-2.5 rounded-sm" style={{ backgroundColor: accentColor }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    // ==========================================
    // 5. App Development (RT-MOB-02)
    // ==========================================
    case "RT-MOB-02":
      return (
        <div className={`relative w-full h-full bg-slate-950 flex items-center justify-center overflow-hidden p-4 rounded-xl ${className}`}>
          {/* Smartphone Container */}
          <div className="w-[100px] h-[150px] border-[3px] border-slate-800 bg-slate-900 rounded-[18px] relative shadow-2xl flex flex-col overflow-hidden">
            {/* Top speaker grill notch */}
            <div className="absolute top-1 left-1/2 -translate-x-1/2 w-10 h-1.5 bg-slate-800 rounded-full z-20" />
            
            {/* App Screen content */}
            <div className="flex-1 bg-slate-950 pt-4 p-2 flex flex-col gap-2 z-10">
              {/* App header */}
              <div className="flex items-center justify-between">
                <div className="w-6 h-2.5 bg-slate-800 rounded-sm" />
                <div className="w-3 h-3 rounded-full bg-slate-800" />
              </div>
              {/* Main Visual glassmorphic cards */}
              <div className="flex-1 border border-slate-800/80 rounded-lg p-1.5 flex flex-col gap-1.5 bg-slate-900/30">
                <div className="w-3/4 h-2 bg-slate-800 rounded-sm" />
                <div className="w-full h-1 bg-slate-800/50 rounded-sm" />
                <div className="w-full h-1 bg-slate-800/50 rounded-sm" />
                
                {/* Floating active card mockup */}
                <motion.div 
                  animate={{ y: [0, -3, 0] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  className="h-10 border border-slate-700/60 rounded-md p-1 bg-slate-900/90 shadow-lg flex flex-col gap-1"
                >
                  <div className="flex items-center gap-1">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: accentColor }} />
                    <div className="w-10 h-1.5 bg-slate-700 rounded-sm" />
                  </div>
                  <div className="w-full h-1 bg-slate-800 rounded-sm" />
                  <div className="w-full h-1 bg-slate-800 rounded-sm" />
                </motion.div>
              </div>
            </div>
            
            {/* Bottom Indicator bar */}
            <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-slate-800 rounded-full z-20" />
          </div>
        </div>
      );

    // ==========================================
    // 6. SEO & GMB Setup (RT-SEO-01)
    // ==========================================
    case "RT-SEO-01":
      return (
        <div className={`relative w-full h-full bg-slate-900 flex items-center justify-center overflow-hidden p-4 rounded-xl ${className}`}>
          {/* Vector Map concept */}
          <div className="w-11/12 h-5/6 bg-slate-950 border border-slate-800 rounded-lg shadow-2xl relative overflow-hidden flex flex-col">
            {/* Top Search bar mockup */}
            <div className="h-6 border-b border-slate-900 px-2 flex items-center bg-slate-900/40 gap-1.5">
              <svg className="w-3 h-3 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <div className="w-24 h-2 bg-slate-850 rounded-sm" />
            </div>
            {/* Map lines */}
            <div className="flex-1 relative bg-slate-950/20">
              <svg className="absolute inset-0 w-full h-full stroke-slate-850" strokeWidth="1" fill="none">
                <path d="M 0 30 H 240 M 0 90 H 240 M 60 0 V 140 M 180 0 V 140 M 0 10 L 240 130" />
              </svg>
              {/* Location Pin */}
              <motion.div 
                animate={{ y: [0, -4, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
              >
                <svg className="w-8 h-8 text-orange-500 drop-shadow-[0_4px_10px_rgba(249,115,22,0.4)]" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
              </motion.div>
              {/* Rising rankings card */}
              <div className="absolute bottom-2 left-2 border border-slate-800 bg-slate-900/90 rounded p-1 shadow-lg flex items-center gap-1.5 z-10">
                <div className="flex flex-col">
                  <span className="text-[4px] text-slate-400">GOOGLE MAPS</span>
                  <span className="text-[6px] font-bold text-white font-mono">RANK #1</span>
                </div>
                <div className="w-5 h-3 bg-green-500/20 border border-green-500/30 rounded-sm flex items-center justify-center">
                  <span className="text-[4px] text-green-400 font-bold">+86%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    // ==========================================
    // 7. Social Growth (SMM) (RT-SMM-02)
    // ==========================================
    case "RT-SMM-02":
      return (
        <div className={`relative w-full h-full bg-slate-950 flex items-center justify-center overflow-hidden p-4 rounded-xl ${className}`}>
          {/* Social Network Node vector representation */}
          <svg className="w-11/12 h-5/6 max-w-[240px] max-h-[140px]" viewBox="0 0 240 140" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="socialChartGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            {/* Graph curve */}
            <path d="M 10 110 Q 50 110 90 80 T 170 50 T 230 15 L 230 130 L 10 130 Z" fill="url(#socialChartGrad)" />
            <motion.path 
              d="M 10 110 Q 50 110 90 80 T 170 50 T 230 15" 
              stroke="#f43f5e" 
              strokeWidth="2" 
              strokeLinecap="round"
            />
            {/* Glowing nodes (followers) */}
            <circle cx="90" cy="80" r="4" fill="#ffffff" stroke="#f43f5e" strokeWidth="1.5" />
            <circle cx="170" cy="50" r="4" fill="#ffffff" stroke="#f43f5e" strokeWidth="1.5" />
            <motion.circle 
              cx="230" 
              cy="15" 
              r="5" 
              fill="#ffffff" 
              stroke="#f43f5e" 
              strokeWidth="2"
              animate={{ r: [5, 7, 5] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
            {/* Float Social badge */}
            <g transform="translate(20, 20)">
              <rect x="0" y="0" width="60" height="20" rx="4" fill="rgba(30, 41, 59, 0.9)" stroke="rgba(244, 63, 94, 0.2)" strokeWidth="1" />
              <text x="30" y="12" fill="#ffffff" fontSize="5" fontWeight="bold" textAnchor="middle" fontFamily="monospace">VIRAL REACH</text>
            </g>
          </svg>
        </div>
      );

    // ==========================================
    // 8. Performance Ads (RT-ADS-03)
    // ==========================================
    case "RT-ADS-03":
      return (
        <div className={`relative w-full h-full bg-slate-900 flex items-center justify-center overflow-hidden p-4 rounded-xl ${className}`}>
          {/* Conversion Funnel diagram */}
          <div className="w-11/12 h-5/6 border border-slate-800 bg-slate-950 rounded-lg p-3 flex flex-col justify-between shadow-2xl">
            {/* Reach stat */}
            <div className="flex items-center justify-between border-b border-slate-900 pb-1">
              <span className="text-[5px] text-slate-500 font-mono">REACH FUNNEL</span>
              <span className="text-[6px] font-bold text-slate-300 font-mono">1.2M IMPRESSIONS</span>
            </div>
            {/* Graphic Funnel Shapes */}
            <div className="flex-1 flex flex-col items-center justify-center py-2 gap-1 relative">
              {/* Funnel Stage 1 */}
              <div className="w-4/5 h-2.5 rounded bg-slate-900 border border-slate-850 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-orange-500/10" />
                <span className="text-[4px] text-orange-400 font-mono font-bold">CLICK RATE - 5.8%</span>
              </div>
              {/* Arrow */}
              <div className="w-0.5 h-1.5 bg-slate-800" />
              {/* Funnel Stage 2 */}
              <div className="w-3/5 h-2.5 rounded bg-slate-900 border border-slate-850 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-cyan-500/10" />
                <span className="text-[4px] text-cyan-400 font-mono font-bold">LEADS INTAKE</span>
              </div>
              {/* Arrow */}
              <div className="w-0.5 h-1.5 bg-slate-800" />
              {/* Funnel Stage 3 */}
              <div className="w-2/5 h-2.5 rounded bg-slate-900 border border-slate-850 flex items-center justify-center relative overflow-hidden" style={{ borderColor: accentColor }}>
                <div className="absolute inset-0" style={{ backgroundColor: `${accentColor}20` }} />
                <span className="text-[4px] font-mono font-bold" style={{ color: accentColor }}>SALES CONVERSION</span>
              </div>
            </div>
            {/* ROI footer indicator */}
            <div className="flex items-center justify-between border-t border-slate-900 pt-1">
              <span className="text-[5px] text-slate-500 font-mono">ROAS METRIC</span>
              <span className="text-[6px] font-bold text-green-400 font-mono">6.8X TARGET</span>
            </div>
          </div>
        </div>
      );

    // ==========================================
    // 9. UGC Ads Shooting (RT-UGC-01)
    // ==========================================
    case "RT-UGC-01":
      return (
        <div className={`relative w-full h-full bg-slate-950 flex items-center justify-center overflow-hidden p-4 rounded-xl ${className}`}>
          {/* Portrait camera UI mockup */}
          <div className="w-[85px] h-[140px] border border-slate-800 rounded-md relative shadow-2xl flex flex-col justify-between p-2">
            {/* Blinking REC dot */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <motion.div 
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="w-1.5 h-1.5 rounded-full bg-red-500" 
                />
                <span className="text-[4px] text-slate-400 font-bold font-mono">REC</span>
              </div>
              <span className="text-[4px] text-slate-400 font-mono">00:14</span>
            </div>
            {/* Safe zone brackets */}
            <div className="flex-1 border border-dashed border-slate-800/80 my-2 rounded flex flex-col items-center justify-center relative">
              <svg className="w-10 h-6 text-rose-500/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              </svg>
              {/* Graphic waves representing audio */}
              <div className="absolute bottom-1 w-4/5 flex gap-0.5 justify-center items-center h-3">
                {[...Array(9)].map((_, i) => (
                  <motion.div 
                    key={i} 
                    animate={{ height: [2, 10 - Math.abs(i - 4) * 2, 2] }}
                    transition={{ repeat: Infinity, duration: 0.6 + i * 0.1, ease: "easeInOut" }}
                    className="w-[1.5px] rounded-full bg-rose-500" 
                  />
                ))}
              </div>
            </div>
            {/* Camera settings bottom info */}
            <div className="flex justify-between items-center text-[4px] text-slate-500 font-mono">
              <span>UGC PREVIEW</span>
              <span>4K 60FPS</span>
            </div>
          </div>
        </div>
      );

    // ==========================================
    // 10. Cinematic Productions (RT-VID-02)
    // ==========================================
    case "RT-VID-02":
      return (
        <div className={`relative w-full h-full bg-slate-900 flex items-center justify-center overflow-hidden p-4 rounded-xl ${className}`}>
          {/* Cinema camera Director monitor frame */}
          <div className="w-11/12 h-5/6 bg-slate-950 border border-slate-800 rounded-lg p-2.5 flex flex-col justify-between shadow-2xl relative">
            {/* Screen layout with letterbox film strip */}
            <div className="flex-1 border border-slate-900 flex flex-col justify-between relative overflow-hidden bg-slate-900/10">
              {/* Letterbox dark overlays */}
              <div className="h-2.5 bg-slate-950 w-full z-10" />
              <div className="h-2.5 bg-slate-950 w-full z-10" />
              {/* Focus rectangle overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-8 border border-white/20 rounded relative">
                  <div className="absolute -top-1 -left-1 w-1.5 h-1.5 border-t border-l border-red-500" />
                  <div className="absolute -top-1 -right-1 w-1.5 h-1.5 border-t border-r border-red-500" />
                  <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 border-b border-l border-red-500" />
                  <div className="absolute -bottom-1 -right-1 w-1.5 h-1.5 border-b border-r border-red-500" />
                </div>
              </div>
            </div>
            {/* Camera telemetry settings */}
            <div className="flex items-center justify-between text-[4px] text-slate-500 font-mono pt-1">
              <span>ISO 800</span>
              <span>2.39:1 CINEMATIC</span>
              <span>LUT ACTIVE</span>
            </div>
          </div>
        </div>
      );

    // ==========================================
    // 11. Post Video Editing (RT-EDT-03)
    // ==========================================
    case "RT-EDT-03":
      return (
        <div className={`relative w-full h-full bg-slate-950 flex items-center justify-center overflow-hidden p-4 rounded-xl ${className}`}>
          {/* Video editing timeline layout */}
          <div className="w-11/12 h-5/6 bg-slate-900 border border-slate-800 rounded-lg p-2 flex flex-col gap-1.5 shadow-2xl">
            {/* Timeline Header */}
            <div className="h-4 border-b border-slate-950 px-1.5 flex items-center justify-between text-[4.5px] text-slate-400 font-mono">
              <span>00:04:12:00</span>
              <div className="flex gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                <div className="w-1.5 h-1.5 rounded-full bg-slate-800" />
              </div>
            </div>
            {/* Tracks */}
            <div className="flex-1 flex flex-col gap-1 relative">
              {/* Video Track 1 */}
              <div className="h-4 bg-slate-950/80 rounded flex items-center px-1 border-l-[3px] border-violet-500 overflow-hidden">
                <div className="w-2/3 h-2 bg-violet-600/30 rounded-sm" />
                <div className="w-[2px] h-3 bg-slate-800 mx-1" />
                <div className="w-1/4 h-2 bg-violet-600/30 rounded-sm" />
              </div>
              {/* Video Track 2 */}
              <div className="h-4 bg-slate-950/80 rounded flex items-center px-1 border-l-[3px] border-cyan-500 overflow-hidden">
                <div className="w-1/3 h-2 bg-cyan-600/30 rounded-sm" />
                <div className="w-1/2 h-2 bg-cyan-600/30 rounded-sm ml-1" />
              </div>
              {/* Audio Track 1 */}
              <div className="h-4 bg-slate-950/80 rounded flex items-center px-1 border-l-[3px] border-green-500 overflow-hidden">
                {/* Wavy waveforms schematic */}
                <div className="w-full flex gap-0.5 justify-center items-center h-2 opacity-50">
                  {[...Array(14)].map((_, i) => (
                    <div key={i} className="w-[1px] bg-green-500" style={{ height: `${2 + (i % 3) * 2}px` }} />
                  ))}
                </div>
              </div>
              {/* Timeline playhead cursor line */}
              <motion.div 
                animate={{ x: [20, 80, 20] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute top-0 bottom-0 w-[1.5px] bg-red-500 z-10" 
              />
            </div>
          </div>
        </div>
      );

    // ==========================================
    // 12. Branding & Identity (RT-BRN-04)
    // ==========================================
    case "RT-BRN-04":
      return (
        <div className={`relative w-full h-full bg-slate-900 flex items-center justify-center overflow-hidden p-4 rounded-xl ${className}`}>
          {/* Blueprint style Logo drafting layout */}
          <div className="w-11/12 h-5/6 border border-slate-850/80 bg-slate-950 rounded-lg p-3 flex flex-col justify-between shadow-2xl relative">
            {/* Drafting Grid lines overlay */}
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-[size:10px_10px]" />
            
            {/* Blueprint graphic vector */}
            <div className="flex-1 relative flex items-center justify-center">
              <svg className="w-20 h-20 text-rose-500/20" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Construction circles */}
                <circle cx="50" cy="50" r="30" stroke="rgba(244,63,94,0.3)" strokeWidth="1" strokeDasharray="3 3" />
                <circle cx="50" cy="50" r="18" stroke="rgba(244,63,94,0.2)" strokeWidth="1" />
                {/* Diagonal drafting rules */}
                <line x1="10" y1="10" x2="90" y2="90" stroke="rgba(244,63,94,0.15)" strokeWidth="1" />
                <line x1="90" y1="10" x2="10" y2="90" stroke="rgba(244,63,94,0.15)" strokeWidth="1" />
                
                {/* Actual Logo symbol geometry */}
                <path d="M50 20 L80 70 H20 Z" stroke="#f43f5e" strokeWidth="2" strokeLinejoin="round" />
                <circle cx="50" cy="46" r="8" stroke="#f43f5e" strokeWidth="1.5" />
              </svg>
            </div>
            {/* Color Swatch tiles bottom */}
            <div className="flex justify-between items-center">
              <span className="text-[4px] text-slate-500 font-mono">IDENTITY SPECS</span>
              <div className="flex gap-1">
                <div className="w-2.5 h-2.5 rounded-full bg-[#f43f5e]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#38bdf8]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#1e293b]" />
              </div>
            </div>
          </div>
        </div>
      );

    default:
      return (
        <div className={`relative w-full h-full bg-slate-900 rounded-xl ${className}`}>
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 to-slate-900" />
        </div>
      );
  }
}
