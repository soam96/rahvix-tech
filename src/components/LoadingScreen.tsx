"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("INITIALIZING NODE NETWORKS...");
  const [show, setShow] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
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

        const increment = Math.max(1, Math.floor((100 - prev) * 0.15) + Math.floor(Math.random() * 2));
        const nextProgress = Math.min(100, prev + increment);

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
        setIsExiting(true);
        setTimeout(() => {
          setShow(false);
          // Wait for exit transition to complete before triggering callback
          setTimeout(onComplete, 600);
        }, 400);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [progress, onComplete]);

  const logoLetters = Array.from("RAHVIX");

  const letterContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      }
    }
  };

  const letterVariants = {
    hidden: { y: 15, opacity: 0, scale: 0.8 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { type: "spring" as const, stiffness: 160, damping: 10 }
    }
  };

  // Safe type-casted variant with text shadow animation (removed string ease to pass TS check)
  const letterGlowVariants = {
    visible: (i: number) => ({
      textShadow: [
        "0 0 4px rgba(250,90,21,0.1)",
        "0 0 16px rgba(250,90,21,0.6), 0 0 24px rgba(59,130,246,0.3)",
        "0 0 4px rgba(250,90,21,0.1)"
      ],
      color: ["#ffffff", "#fff5eb", "#ffffff"],
      transition: {
        repeat: Infinity,
        duration: 2.5,
        delay: i * 0.2,
      }
    })
  };

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
          {/* Cyber connection portal flash effect */}
          <AnimatePresence>
            {isExiting && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 2.5 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.95)_0%,rgba(59,130,246,0.4)_50%,transparent_100%)] z-50 pointer-events-none"
              />
            )}
          </AnimatePresence>

          {/* Moving particle grid backdrop decoration (minimal contrast) */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:40px_40px] opacity-10 pointer-events-none" />
          
          <div className="absolute top-[25%] left-1/2 -translate-x-1/2 w-[350px] h-[350px] rounded-full glow-cyan opacity-15 blur-3xl pointer-events-none" />
          <div className="absolute bottom-[25%] left-1/3 w-[250px] h-[250px] rounded-full glow-gold opacity-10 blur-3xl pointer-events-none" />

          {/* Central content container */}
          <div className="relative flex flex-col items-center gap-5 max-w-sm px-6 w-full text-center z-10 select-none">
            
            {/* Minimal and Aesthetic Corporate Logo Container */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative w-20 h-20 flex items-center justify-center mb-1"
            >
              {/* Outer soft glowing pulse border */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-brand-orange/20 to-brand-blue/20 blur-sm animate-pulse" />
              
              {/* Actual Logo Image - Frosted Rounded Corner Container */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 p-1 flex items-center justify-center shadow-2xl">
                <Image
                  src="/logo.jpg"
                  alt="Rahvix Technologies Logo"
                  width={72}
                  height={72}
                  className="w-full h-full object-contain rounded-xl p-0.5"
                  priority
                />
              </div>
            </motion.div>

            {/* Staggered letter-by-letter typing and neon light reveal */}
            <div className="flex flex-col gap-1 items-center">
              <motion.div
                variants={letterContainerVariants}
                initial="hidden"
                animate="visible"
                className="flex items-center justify-center gap-1 font-sans font-extrabold text-xl tracking-[0.25em] translate-x-[0.125em]"
              >
                {logoLetters.map((char, index) => (
                  <motion.span
                    key={index}
                    variants={letterVariants}
                    custom={index}
                    className="inline-block"
                  >
                    <motion.span
                      variants={letterGlowVariants}
                      custom={index}
                      className="inline-block"
                    >
                      {char}
                    </motion.span>
                  </motion.span>
                ))}
              </motion.div>
              <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest font-mono">
                Technologies
              </span>
            </div>

            {/* Status indicators */}
            <div className="w-[180px] flex flex-col gap-2 mt-6">
              <div className="flex items-center justify-between font-mono text-[8px] font-bold text-slate-450 tracking-wider">
                <span className="animate-pulse">{statusText}</span>
                <span className="text-brand-orange">{progress}%</span>
              </div>
              
              {/* Ultra-minimal progress track */}
              <div className="w-full h-[2px] bg-slate-900 rounded-full overflow-hidden relative">
                <motion.div
                  className="h-full bg-gradient-to-r from-brand-orange to-brand-blue rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
