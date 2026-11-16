'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { ShieldCheck, Wind, Sparkles } from 'lucide-react';
import { useSceneStore } from '@/lib/useSceneStore';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function MosquitoWindowScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const setStage = useSceneStore((s) => s.setStage);
  const setStoryProgress = useSceneStore((s) => s.setStoryProgress);

  useEffect(() => {
    if (!containerRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.8,
      onEnter: () => setStage('story'),
      onEnterBack: () => setStage('story'),
      onUpdate: (self) => {
        setStoryProgress(self.progress);
      },
    });

    return () => trigger.kill();
  }, [setStage, setStoryProgress]);

  if (shouldReduceMotion) {
    return (
      <section className="relative w-full min-h-[90svh] bg-[#070809] overflow-hidden border-t border-white/10 flex items-center justify-center py-20" id="story">
        <div className="absolute inset-0">
          <Image
            src="/house.jpg"
            alt="Modern Architectural Villa"
            fill
            sizes="100vw"
            className="object-cover opacity-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070809] via-black/60 to-[#070809]" />
        </div>
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-mono uppercase tracking-[0.2em] text-zinc-300 mb-6">
            Engineered For Everyday Comfort
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-6">
            LET FRESH AIR IN.<br />
            <span className="text-zinc-400">KEEP MOSQUITOES OUT.</span>
          </h2>
          <p className="text-base sm:text-lg text-zinc-300 max-w-xl mx-auto mb-8 font-light">
            High-tensile woven micro-mesh barrier paired with aerospace-grade aluminium extrusions.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section ref={containerRef} className="relative h-[250vh] w-full bg-[#070809]" id="story">
      {/* 100svh Sticky Presentation Viewport */}
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden select-none flex flex-col justify-between p-6 sm:p-12">
        {/* Subtle Architectural Atmosphere Backdrop */}
        <div className="absolute inset-0 opacity-25 pointer-events-none">
          <Image
            src="/house.jpg"
            alt="Architectural House Facade"
            fill
            sizes="100vw"
            className="object-cover blur-[2px]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#070809] via-[#070809]/80 to-[#070809]" />
        </div>

        {/* Top Header Badge */}
        <div className="relative z-10 text-center pt-8 pointer-events-none">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-black/75 border border-white/15 backdrop-blur-xl shadow-2xl">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-zinc-200">
              Architectural Defense in Motion
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mt-3 drop-shadow-2xl">
            Impenetrable Physical Barrier.
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm font-mono mt-1">
            Observe the 3D high-tensile wire mesh deflect invasive insects
          </p>
        </div>

        {/* Bottom Benefits Cards */}
        <div className="relative z-10 w-full max-w-5xl mx-auto pb-4 pointer-events-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            <div className="p-4 sm:p-5 rounded-2xl bg-[#0e1013]/90 border border-white/10 backdrop-blur-xl shadow-2xl">
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300 mb-2.5">
                <ShieldCheck size={16} />
              </div>
              <h4 className="text-white font-semibold text-xs sm:text-sm">High-Tensile 316</h4>
              <p className="text-[12px] text-zinc-400 font-light mt-1">Claw, knife & weather resistant wire cloth</p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-[#0e1013]/90 border border-white/10 backdrop-blur-xl shadow-2xl">
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300 mb-2.5">
                <Wind size={16} />
              </div>
              <h4 className="text-white font-semibold text-xs sm:text-sm">98% Cross-Ventilation</h4>
              <p className="text-[12px] text-zinc-400 font-light mt-1">Maximum daylight & cool natural airflow</p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-[#0e1013]/90 border border-white/10 backdrop-blur-xl shadow-2xl">
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300 mb-2.5">
                <Sparkles size={16} />
              </div>
              <h4 className="text-white font-semibold text-xs sm:text-sm">Near-Invisible View</h4>
              <p className="text-[12px] text-zinc-400 font-light mt-1">Micro-mesh preserves outdoor panoramic views</p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-[#0e1013]/90 border border-white/10 backdrop-blur-xl shadow-2xl">
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300 mb-2.5">
                <span className="font-mono text-xs font-bold text-white">±0.5</span>
              </div>
              <h4 className="text-white font-semibold text-xs sm:text-sm">Laser-Measured</h4>
              <p className="text-[12px] text-zinc-400 font-light mt-1">Zero perimeter gaps for pests to slip through</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
