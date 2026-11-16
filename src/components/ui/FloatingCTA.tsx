'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, Calendar, ArrowRight } from 'lucide-react';
import { useSceneStore } from '@/lib/useSceneStore';

export default function FloatingCTA() {
  const [scrolled, setScrolled] = useState(false);
  const stage = useSceneStore((s) => s.stage);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled down past ~450px
      if (window.scrollY > 450) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const visible = scrolled && stage !== 'exploded' && stage !== 'story';

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 p-1.5 rounded-full bg-[#0e1013]/90 backdrop-blur-xl border border-white/15 shadow-[0_12px_40px_rgba(0,0,0,0.7)]"
        >
          <a
            href="#calculator"
            className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider text-zinc-300 hover:text-white hover:bg-white/5 transition-all"
          >
            <Calculator size={14} className="text-amber-400" />
            <span className="hidden sm:inline">Price</span> Calculator
          </a>

          <div className="w-[1px] h-4 bg-white/10" />

          <a
            href="#contact"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-zinc-950 text-xs font-bold uppercase tracking-wider hover:bg-zinc-200 transition-all shadow-md group"
          >
            <Calendar size={14} className="text-zinc-950" />
            <span>Book Laser Survey</span>
            <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
