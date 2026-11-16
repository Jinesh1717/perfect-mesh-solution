'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Wind, Sun, ShieldCheck } from 'lucide-react';
import { useSceneStore } from '@/lib/useSceneStore';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const DUST_PARTICLES = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  y: 20 + ((i * 37) % 360),
  duration: 5 + (i % 4) * 1.2,
  delay: (i * 0.4) % 3.2,
}));

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const setStage = useSceneStore((s) => s.setStage);

  useEffect(() => {
    if (!sectionRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top center',
      end: 'bottom center',
      onEnter: () => setStage('hidden'),
      onEnterBack: () => setStage('hidden'),
    });

    return () => trigger.kill();
  }, [setStage]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-16 md:py-20 bg-[#070809] overflow-hidden flex flex-col items-center justify-center border-t border-white/[0.08]"
      id="experience"
    >
      <div className="max-w-7xl mx-auto px-6 w-full text-center mb-10 md:mb-12 relative z-20">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono uppercase tracking-[0.2em] text-zinc-300 mb-3">
          <Wind size={13} className="text-zinc-300" />
          <span>Microclimate Balance</span>
        </div>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.08]">
          Uncompromised Living.
          <br />
          <span className="text-zinc-400 font-light">Natural Air In. Invaders Stopped.</span>
        </h2>
        <p className="text-zinc-300 max-w-2xl mx-auto text-sm sm:text-base mt-3 font-light leading-relaxed">
          Experience the effortless balance of uninterrupted cross-ventilation and natural daylight, while maintaining an impenetrable barrier against mosquitoes, midges, and airborne debris.
        </p>
      </div>

      <div className="relative w-full max-w-5xl h-[380px] md:h-[440px] border border-white/15 rounded-3xl overflow-hidden mx-auto shadow-2xl backdrop-blur-sm bg-black/70">
        {/* The Window Mesh Barrier Pillar Divider */}
        <div className="absolute top-0 bottom-0 left-1/2 w-4 md:w-5 bg-gradient-to-r from-zinc-700 via-zinc-300 to-zinc-700 -translate-x-1/2 z-20 shadow-[0_0_40px_rgba(0,0,0,0.95)] border-x border-white/30 flex items-center justify-center">
          <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:3px_3px] opacity-40" />
          <div className="w-1.5 h-16 rounded-full bg-white/80 shadow-[0_0_15px_rgba(255,255,255,0.9)] z-10" />
        </div>

        {/* LEFT SIDE: EXTERIOR */}
        <div className="absolute inset-y-0 left-0 right-1/2 bg-[#060708] overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:24px_24px] opacity-25" />

          {/* Mosquitoes approaching and bouncing */}
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={`bug-${i}`}
              className="absolute w-2.5 h-2.5 rounded-full bg-amber-500/80 shadow-[0_0_10px_rgba(245,158,11,0.6)]"
              initial={{
                x: -30,
                y: 40 + i * 36,
                opacity: 0,
              }}
              animate={{
                x: ['0%', '82%', '74%', '88%', '40%'],
                y: [35 + i * 36, 55 + i * 36, 40 + i * 36, 50 + i * 36],
                opacity: [0, 0.95, 0.95, 0.85, 0],
              }}
              transition={{
                duration: 4.5 + (i % 4),
                repeat: Infinity,
                ease: 'easeInOut',
                delay: (i * 0.4) % 3,
              }}
            >
              <div className="w-1 h-0.5 bg-white/70 -top-1 absolute rounded-full" />
            </motion.div>
          ))}

          {/* Dust motes */}
          {DUST_PARTICLES.map((particle) => (
            <motion.div
              key={`dust-${particle.id}`}
              className="absolute w-1 h-1 bg-zinc-500/50 rounded-full"
              initial={{ x: -20, y: particle.y }}
              animate={{ x: ['0%', '180%'], opacity: [0, 0.7, 0] }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                ease: 'linear',
                delay: particle.delay,
              }}
            />
          ))}

          <div className="absolute bottom-6 left-6 z-10 flex items-center gap-2 px-3.5 py-2 rounded-xl bg-black/80 border border-white/15 text-xs font-mono text-zinc-300">
            <ShieldAlert size={14} className="text-amber-400 shrink-0" />
            <span className="hidden sm:inline">EXTERIOR: INVASIVE PESTS BLOCKED</span>
            <span className="sm:hidden">EXTERIOR</span>
          </div>
        </div>

        {/* RIGHT SIDE: INTERIOR */}
        <div className="absolute inset-y-0 left-1/2 right-0 bg-gradient-to-r from-[#0a0d12] to-[#12151a] overflow-hidden flex items-center justify-center">
          {/* Fresh Airflow Streamlines */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`air-${i}`}
              className="absolute h-[1.5px] w-48 sm:w-64 bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent rounded-full"
              style={{ top: 60 + i * 55 }}
              initial={{ x: '-60%', opacity: 0 }}
              animate={{ x: '140%', opacity: [0, 0.85, 0] }}
              transition={{
                duration: 3.5 + (i % 3),
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.5,
              }}
            />
          ))}

          <div className="absolute inset-0 bg-gradient-to-br from-amber-100/10 via-transparent to-transparent opacity-60 mix-blend-screen pointer-events-none" />

          {/* Interior Metrics Floater */}
          <div className="absolute top-6 right-6 z-10 hidden sm:flex flex-col gap-2">
            <div className="px-3.5 py-1.5 rounded-xl bg-white/[0.05] border border-white/10 backdrop-blur-md text-[11px] font-mono text-zinc-200 flex items-center gap-2">
              <Sun size={12} className="text-amber-300" />
              <span>Daylight Transmission: 98.4%</span>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-white/[0.05] border border-white/10 backdrop-blur-md text-[11px] font-mono text-zinc-200 flex items-center gap-2">
              <Wind size={12} className="text-cyan-300" />
              <span>Natural Cross-Flow: 100%</span>
            </div>
          </div>

          <div className="absolute bottom-6 right-6 z-10 flex items-center gap-2 px-3.5 py-2 rounded-xl bg-black/80 border border-white/15 text-xs font-mono text-zinc-200">
            <ShieldCheck size={14} className="text-emerald-400 shrink-0" />
            <span className="hidden sm:inline">INTERIOR: PRISTINE AIR & SERENITY</span>
            <span className="sm:hidden">INTERIOR</span>
          </div>
        </div>
      </div>
    </section>
  );
}
