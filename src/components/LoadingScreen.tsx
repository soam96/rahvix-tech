"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("INITIALIZING NODE NETWORKS...");
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Dynamic status text transition based on progress percentage
    const statusSteps = [
      { max: 25, text: "CONNECTING TO RAHVIX CLOUD..." },
      { max: 55, text: "ESTABLISHING DATA PIPELINES..." },
      { max: 80, text: "TUNING NEURAL CORE MODELS..." },
      { max: 95, text: "COMPILING WEB INTERFACES..." },
      { max: 100, text: "SYSTEM INITIALIZED. WELCOME." },
    ];

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }

        // Accelerating progress bar speed
        const increment = Math.max(1, Math.floor((100 - prev) * 0.15) + Math.floor(Math.random() * 2));
        const nextProgress = Math.min(100, prev + increment);

        // Find matching status text
        const step = statusSteps.find((s) => nextProgress <= s.max);
        if (step) {
          setStatusText(step.text);
        }

        return nextProgress;
      });
    }, 70);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const timeout = setTimeout(() => {
        setShow(false);
        // Wait for exit transition to complete before triggering callback
        setTimeout(onComplete, 600);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [progress, onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            y: "-100vh",
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
          }}
          className="fixed inset-0 w-full h-full bg-slate-950 flex flex-col items-center justify-center z-[9999] overflow-hidden"
        >
          {/* Subtle moving particle nodes behind the loader */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:30px_30px] opacity-15 pointer-events-none" />
          
          <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full glow-cyan opacity-20 blur-3xl pointer-events-none" />
          <div className="absolute bottom-[20%] left-1/3 w-[300px] h-[300px] rounded-full glow-gold opacity-15 blur-3xl pointer-events-none" />

          {/* Central brand container */}
          <div className="relative flex flex-col items-center gap-6 max-w-sm px-6 w-full text-center z-10 select-none">
            {/* Pulsing high-tech animated geometric SVG logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative w-20 h-20 flex items-center justify-center"
            >
              {/* Outer rotating ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                className="absolute inset-0 border-2 border-dashed border-brand-orange/45 rounded-full"
              />
              {/* Inner counter-rotating ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
                className="absolute inset-1.5 border border-brand-blue/35 rounded-full"
              />
              {/* Central glowing core node */}
              <motion.div
                animate={{ scale: [0.9, 1.1, 0.9] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-orange to-brand-blue flex items-center justify-center shadow-[0_0_24px_rgba(250,90,21,0.5)] border border-white/10"
              >
                <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 24 24">
                  <path d="M12 2L2 22h20L12 2zm0 4.5l6.5 11.5H5.5L12 6.5z" />
                </svg>
              </motion.div>
            </motion.div>

            {/* Logo Text Typography */}
            <div className="flex flex-col gap-1.5">
              <motion.h1 
                initial={{ letterSpacing: "0.2em", opacity: 0 }}
                animate={{ letterSpacing: "0.4em", opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="font-sans font-extrabold text-2xl tracking-[0.4em] text-white text-center translate-x-[0.2em]"
              >
                RAHVIX
              </motion.h1>
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest font-mono">
                Technologies
              </span>
            </div>

            {/* Status updates & progress display */}
            <div className="w-full flex flex-col gap-2.5 mt-8">
              <div className="flex items-center justify-between font-mono text-[9px] font-bold text-slate-450 tracking-wider">
                <span className="animate-pulse">{statusText}</span>
                <span className="text-brand-orange text-right">{progress}%</span>
              </div>
              
              {/* Progress track */}
              <div className="w-full h-1 bg-slate-900 border border-slate-900 rounded-full overflow-hidden relative">
                <motion.div
                  className="h-full bg-gradient-to-r from-brand-orange via-brand-blue to-brand-orange rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Console output decoration */}
            <div className="font-mono text-[8px] text-slate-650 flex flex-col gap-0.5 mt-4 text-center select-none opacity-50 uppercase tracking-wide">
              <span>SECURE SSL LINK DETECTED</span>
              <span>latency: 42ms // core: active</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
