"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Keep the loading screen visible for a short, elegant duration
    const timer = setTimeout(() => {
      setShow(false);
    }, 1400);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {show && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#020617]"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-6"
          >
            {/* Elegant logo reveal */}
            <div className="relative w-20 h-20 rounded-2xl overflow-hidden shadow-2xl border border-white/5 bg-black/40 backdrop-blur-md flex items-center justify-center">
              <Image
                src="/logo.jpg"
                alt="Rahvix Technologies"
                width={80}
                height={80}
                className="w-full h-full object-contain p-1.5"
                priority
              />
            </div>
            
            {/* Clean, minimalist typography */}
            <motion.div 
              initial={{ opacity: 0, filter: "blur(4px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex items-center"
            >
              <span className="text-xl font-bold tracking-[0.25em] text-white font-sans uppercase">
                Rahvix
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
