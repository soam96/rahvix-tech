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
    // 1100ms — fast enough to not frustrate users on good connections,
    // long enough for the brand logo animation to read clearly
    const timer = setTimeout(() => {
      setShow(false);
    }, 1100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {show && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(10px)" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#06152d]"
          role="status"
          aria-busy="true"
          aria-label="Loading Rahvix Technologies"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-6"
          >
            {/* Elegant logo reveal */}
            <div className="relative h-20 sm:h-24 flex items-center justify-center">
              <Image
                src="/logo.jpg"
                alt="Rahvix Technologies"
                width={160}
                height={60}
                className="h-full w-auto object-contain rounded-xl shadow-[0_0_40px_rgba(250,90,21,0.3)]"
                priority
              />
            </div>
            
            {/* Clean, minimalist typography */}
            <motion.div 
              initial={{ opacity: 0, filter: "blur(4px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ delay: 0.2, duration: 0.5 }}
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
