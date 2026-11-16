'use client';

import { useState, useEffect } from 'react';
import { useProgress } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const { progress } = useProgress();
  const [isLoaded, setIsLoaded] = useState(false);
  const [displayProgress, setDisplayProgress] = useState(0);

  useEffect(() => {
    // Smooth progress count-up from 0 to 100 in ~650ms
    const start = performance.now();
    const duration = 650;

    const frame = () => {
      const now = performance.now();
      const elapsed = now - start;
      const linear = Math.min(1, elapsed / duration);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - linear, 3);
      const computed = Math.max(Math.round(eased * 100), Math.round(progress));

      setDisplayProgress(computed);

      if (computed < 100) {
        requestAnimationFrame(frame);
      } else {
        setTimeout(() => setIsLoaded(true), 200);
      }
    };

    const animId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(animId);
  }, [progress]);

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#070809] text-white select-none pointer-events-auto"
        >
          {/* Brand Emblem */}
          <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/20 flex items-center justify-center relative overflow-hidden mb-8 shadow-2xl">
            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:4px_4px]" />
            <div className="w-3.5 h-3.5 rounded-sm bg-white shadow-[0_0_15px_rgba(255,255,255,0.9)] relative z-10" />
          </div>

          <div className="flex flex-col items-center text-center">
            <span className="text-sm font-bold tracking-[0.3em] uppercase text-white font-mono">
              PERFECT MESH
            </span>
            <span className="text-[11px] tracking-[0.2em] uppercase text-zinc-400 font-sans mt-1">
              Architectural Systems
            </span>
          </div>

          {/* Progress Bar & Percentage */}
          <div className="w-48 mt-8">
            <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                style={{ width: `${displayProgress}%` }}
              />
            </div>
            <div className="flex justify-between items-center mt-3 text-[11px] font-mono text-zinc-400">
              <span>INITIALIZING PBR SHADERS</span>
              <span className="text-white font-bold">{displayProgress}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
