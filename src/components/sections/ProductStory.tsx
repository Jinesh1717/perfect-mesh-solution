'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, ShieldCheck, Cog, Maximize2 } from 'lucide-react';
import { useSceneStore } from '@/lib/useSceneStore';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const STAGES = [
  {
    step: '01',
    name: 'Structural Frame',
    icon: Layers,
    title: 'Laser-Mitered 6063-T6 Aluminium Frame',
    detail: 'Extruded aerospace alloy with internal reinforced corner cleats and AkzoNobel powder coating.',
  },
  {
    step: '02',
    name: 'Precision Expansion',
    icon: Maximize2,
    title: 'Four-Point Precision Reveal Calibration',
    detail: 'Machined to ±0.5mm site survey dimensions, creating a snug acoustic and vibration-free perimeter fit.',
  },
  {
    step: '03',
    name: 'Marine-Grade Mesh',
    icon: ShieldCheck,
    title: 'High-Tensile 316 Stainless Wire Cloth',
    detail: 'Pneumatically tensioned micro-weave blocks 100% of mosquitoes while permitting 98% unimpeded airflow.',
  },
  {
    step: '04',
    name: 'Silent Glide Rollers',
    icon: Cog,
    title: 'Concealed Multi-Point Locks & Rollers',
    detail: 'Ultra-smooth stainless ball-bearing cartridges gliding silently across an extruded double bottom track.',
  },
];

export default function ProductStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const setStage = useSceneStore((s) => s.setStage);
  const setExplodeProgress = useSceneStore((s) => s.setExplodeProgress);
  const [activeStageIdx, setActiveStageIdx] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.8,
      onEnter: () => setStage('exploded'),
      onEnterBack: () => setStage('exploded'),
      onUpdate: (self) => {
        setExplodeProgress(self.progress);
        const stageIndex = Math.min(
          3,
          Math.floor(self.progress * 4)
        );
        setActiveStageIdx(stageIndex);
      },
    });

    return () => trigger.kill();
  }, [setStage, setExplodeProgress]);

  const currentStage = STAGES[activeStageIdx];

  return (
    <section ref={containerRef} className="relative h-[250vh] bg-transparent w-full" id="anatomy">
      <div id="craftsmanship" className="sr-only" />
      {/* Sticky 100svh Presentation Viewport */}
      <div className="sticky top-0 h-[100svh] w-full flex flex-col justify-between p-4 sm:p-8 md:p-10 overflow-hidden select-none">
        
        {/* Top Header Badge & Stage Navigation (Cleanly positioned below navbar) */}
        <div className="relative z-10 text-center pt-16 sm:pt-20 pointer-events-none">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono uppercase tracking-[0.2em] text-zinc-300 mb-2">
            <Layers size={13} className="text-zinc-300" />
            <span>Precision Engineering Dissection</span>
          </div>
          <h2 className="text-xl sm:text-4xl md:text-5xl font-black text-white tracking-tight drop-shadow-2xl">
            The Anatomy of Protection
          </h2>

          {/* Interactive Stage Progress Bar */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 mt-3 sm:mt-4 pointer-events-auto">
            {STAGES.map((s, idx) => (
              <div
                key={s.step}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-300 ${
                  activeStageIdx === idx
                    ? 'bg-white text-black font-bold shadow-[0_0_15px_rgba(255,255,255,0.3)] scale-105'
                    : 'bg-white/[0.04] text-zinc-400 border border-white/10'
                }`}
              >
                <span>{s.step}</span>
                <span className="hidden sm:inline">{s.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Synchronized Exploded Stage Typography (Cleanly positioned at bottom with safe bounds) */}
        <div className="relative z-10 w-full max-w-2xl mx-auto text-center pb-4 sm:pb-6 mb-2 sm:mb-4 pointer-events-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStage.step}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="p-4 sm:p-6 rounded-3xl bg-[#0e1013]/92 border border-white/20 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.85)]"
            >
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-400 mb-1.5">
                <span>Stage {currentStage.step} of 04</span>
                <span>•</span>
                <span>{currentStage.name}</span>
              </div>
              <h3 className="text-lg sm:text-2xl md:text-3xl font-bold tracking-tight text-white leading-tight">
                {currentStage.title}
              </h3>
              <p className="text-zinc-300 text-xs sm:text-sm md:text-base font-light mt-2 leading-relaxed">
                {currentStage.detail}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
