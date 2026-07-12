"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "complete" | "exiting">("loading");
  const [show, setShow] = useState(true);
  const progressRef = useRef(progress);
  progressRef.current = progress;

  // Smooth progress ticker
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const speed = prev < 60 ? 3 : prev < 85 ? 1.5 : 0.6;
        return Math.min(100, prev + speed + Math.random() * 1.5);
      });
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Trigger phase progression
  useEffect(() => {
    if (progress >= 100 && phase === "loading") {
      setPhase("complete");
    }
  }, [progress, phase]);

  useEffect(() => {
    if (phase === "complete") {
      const t = setTimeout(() => {
        setPhase("exiting");
      }, 700);
      return () => clearTimeout(t);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === "exiting") {
      const t = setTimeout(() => {
        setShow(false);
        onComplete();
      }, 1000);
      return () => clearTimeout(t);
    }
  }, [phase, onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-white"
        >
          {/* ── Ambient background orbs ── */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(250,90,21,0.07) 0%, rgba(59,130,246,0.05) 40%, transparent 70%)",
            }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-[20%] right-[15%] w-48 h-48 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)" }}
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-[20%] left-[15%] w-36 h-36 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(250,90,21,0.07) 0%, transparent 70%)" }}
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />

          {/* ── Subtle grid ── */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(to right, #334155 1px, transparent 1px), linear-gradient(to bottom, #334155 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          {/* ── Central content ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex flex-col items-center gap-8 z-10 select-none"
          >
            {/* Logo with orbital ring */}
            <div className="relative flex items-center justify-center w-28 h-28">
              {/* Spinning orbital ring */}
              <motion.svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 112 112"
                fill="none"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <circle
                  cx="56" cy="56" r="50"
                  stroke="url(#ringGrad)"
                  strokeWidth="1"
                  strokeDasharray="80 234"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#fa5a15" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
              </motion.svg>

              {/* Counter-rotating inner ring */}
              <motion.svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 112 112"
                fill="none"
                animate={{ rotate: -360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              >
                <circle
                  cx="56" cy="56" r="40"
                  stroke="url(#ringGrad2)"
                  strokeWidth="0.5"
                  strokeDasharray="40 212"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="ringGrad2" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#fa5a15" stopOpacity="0.1" />
                  </linearGradient>
                </defs>
              </motion.svg>

              {/* Glow backdrop */}
              <motion.div
                className="absolute inset-4 rounded-2xl"
                style={{ background: "radial-gradient(circle, rgba(250,90,21,0.15) 0%, transparent 70%)" }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Logo image */}
              <motion.div
                className="relative w-16 h-16 rounded-xl overflow-hidden border border-slate-200/80 bg-slate-50 shadow-2xl"
                animate={phase === "complete" ? { scale: [1, 1.08, 1] } : {}}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <Image
                  src="/logo.jpg"
                  alt="Rahvix Technologies"
                  width={64}
                  height={64}
                  className="w-full h-full object-contain p-1"
                  priority
                />
              </motion.div>
            </div>

            {/* Brand name */}
            <div className="flex flex-col items-center gap-1">
              <motion.div
                className="flex items-center gap-[3px]"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.3 } },
                }}
              >
                {Array.from("RAHVIX").map((char, i) => (
                  <motion.span
                    key={i}
                    variants={{
                      hidden: { y: 20, opacity: 0, filter: "blur(8px)" },
                      visible: {
                        y: 0,
                        opacity: 1,
                        filter: "blur(0px)",
                        transition: { type: "spring", stiffness: 200, damping: 14 },
                      },
                    }}
                    className="text-2xl font-extrabold tracking-[0.3em] text-slate-900 font-sans"
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.div>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                className="text-[9px] font-bold uppercase tracking-[0.4em] text-slate-500 font-mono"
              >
                Technologies
              </motion.span>
            </div>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "200px" }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex flex-col gap-2 items-center"
            >
              <div className="w-[200px] h-[1.5px] bg-slate-100 rounded-full overflow-hidden relative">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    width: `${Math.min(100, progress)}%`,
                    background: "linear-gradient(90deg, #fa5a15, #3b82f6)",
                    boxShadow: "0 0 8px rgba(250,90,21,0.6)",
                  }}
                />
                {/* Shimmer on the bar */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.5 }}
                />
              </div>
              <div className="flex items-center justify-between w-[200px]">
                <motion.span
                  className="text-[8px] font-mono text-slate-500 tracking-widest uppercase"
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  {phase === "complete" ? "Ready" : "Loading"}
                </motion.span>
                <span className="text-[8px] font-mono font-bold text-brand-orange">
                  {Math.round(Math.min(100, progress))}%
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* ── Curtain exit: two panels slide up + down ── */}
          <AnimatePresence>
            {phase === "exiting" && (
              <>
                <motion.div
                  key="curtain-top"
                  initial={{ scaleY: 0, originY: "top" }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute top-0 left-0 right-0 h-1/2 bg-white z-50"
                />
                <motion.div
                  key="curtain-bottom"
                  initial={{ scaleY: 0, originY: "bottom" }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute bottom-0 left-0 right-0 h-1/2 bg-white z-50"
                />
              </>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
