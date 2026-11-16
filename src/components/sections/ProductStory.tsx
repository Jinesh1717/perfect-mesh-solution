'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Layers } from 'lucide-react';

export default function ProductStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Stage typography opacities (calibrated for 250vh track)
  const text1Opacity = useTransform(scrollYProgress, [0.0, 0.08, 0.22, 0.28], [0, 1, 1, 0]);
  const text2Opacity = useTransform(scrollYProgress, [0.26, 0.33, 0.47, 0.53], [0, 1, 1, 0]);
  const text3Opacity = useTransform(scrollYProgress, [0.51, 0.58, 0.72, 0.78], [0, 1, 1, 0]);
  const text4Opacity = useTransform(scrollYProgress, [0.76, 0.83, 0.98, 1.0], [0, 1, 1, 1]);

  // Exploded frame motion values
  const frameScale = useTransform(scrollYProgress, [0.0, 0.25], [1, 1.05]);
  const frameSplitLeft = useTransform(scrollYProgress, [0.24, 0.52], [0, -110]);
  const frameSplitRight = useTransform(scrollYProgress, [0.24, 0.52], [0, 110]);
  const frameSplitTop = useTransform(scrollYProgress, [0.24, 0.52], [0, -65]);
  const frameSplitBottom = useTransform(scrollYProgress, [0.24, 0.52], [0, 65]);

  // Mesh layer
  const meshOpacity = useTransform(scrollYProgress, [0.42, 0.54, 0.82], [0.2, 1, 1]);
  const meshScale = useTransform(scrollYProgress, [0.42, 0.54], [0.92, 1.04]);

  // Lock and roller mechanism
  const lockOpacity = useTransform(scrollYProgress, [0.68, 0.80], [0, 1]);
  const lockScale = useTransform(scrollYProgress, [0.68, 0.80], [0.6, 1]);

  return (
    <section ref={containerRef} className="relative h-[250vh] bg-[#080808] w-full" id="craftsmanship">
      {/* Blueprint Grid Atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:32px_32px] opacity-25 pointer-events-none" />

      {/* Sticky Presentation Viewport */}
      <div className="sticky top-0 h-[100dvh] w-full flex flex-col items-center justify-center overflow-hidden select-none">
        
        {/* Top Header Badge & Stage Pills */}
        <div className="absolute top-20 sm:top-24 z-20 text-center px-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono uppercase tracking-[0.2em] text-zinc-400 mb-2">
            <Layers size={13} className="text-zinc-300" />
            <span>Precision Engineering</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            The Anatomy of Protection
          </h2>

          {/* Dynamic Active Step Indicators */}
          <div className="flex items-center justify-center gap-2 mt-3">
            {[
              { label: '01 Frame', op: text1Opacity },
              { label: '02 Reveal', op: text2Opacity },
              { label: '03 Micro-Mesh', op: text3Opacity },
              { label: '04 Hardware', op: text4Opacity },
            ].map((step, idx) => (
              <motion.span
                key={idx}
                style={{ opacity: step.op }}
                className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/10 text-white border border-white/20"
              >
                {step.label}
              </motion.span>
            ))}
          </div>
        </div>

        {/* 2D Exploded Mechanical View Component */}
        <div className="relative w-64 h-96 sm:w-80 sm:h-[440px] md:w-96 md:h-[480px] z-10 flex items-center justify-center mt-[-2vh]">
          {/* Layer 02: High-Tensile Mesh Screen */}
          <motion.div
            className="absolute inset-4 rounded flex items-center justify-center"
            style={{
              opacity: meshOpacity,
              scale: meshScale,
              background:
                'radial-gradient(circle, rgba(255,255,255,0.18) 15%, transparent 15%), radial-gradient(circle, rgba(255,255,255,0.18) 15%, transparent 15%)',
              backgroundSize: '5px 5px',
              backgroundPosition: '0 0, 2.5px 2.5px',
              border: '1.5px solid rgba(255,255,255,0.25)',
              boxShadow: '0 0 40px rgba(255,255,255,0.08) inset',
            }}
          >
            <div className="w-full h-full bg-gradient-to-tr from-white/10 via-transparent to-white/5 mix-blend-overlay" />
            <div className="absolute text-[10px] font-mono uppercase tracking-widest text-zinc-300 bg-black/80 px-3 py-1 rounded border border-white/15">
              316-Stainless Micro-Weave
            </div>
          </motion.div>

          {/* Layer 01: Exploded Outer Aluminium Structural Casings */}
          <motion.div
            className="absolute inset-0 drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
            style={{ scale: frameScale }}
          >
            {/* Left Vertical Frame Section */}
            <motion.div
              className="absolute top-0 bottom-0 left-0 w-7 md:w-9 rounded-l-md z-20 overflow-hidden shadow-2xl border-y border-l border-white/20"
              style={{
                x: frameSplitLeft,
                background: 'linear-gradient(90deg, #111 0%, #2a2c30 40%, #4a4e56 50%, #2a2c30 60%, #111 100%)',
              }}
            >
              <div className="absolute inset-x-0 inset-y-2 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
            </motion.div>

            {/* Right Vertical Frame Section */}
            <motion.div
              className="absolute top-0 bottom-0 right-0 w-7 md:w-9 rounded-r-md z-20 overflow-hidden shadow-2xl border-y border-r border-white/20"
              style={{
                x: frameSplitRight,
                background: 'linear-gradient(90deg, #111 0%, #2a2c30 40%, #4a4e56 50%, #2a2c30 60%, #111 100%)',
              }}
            >
              <div className="absolute inset-x-0 inset-y-2 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
            </motion.div>

            {/* Top Horizontal Header Section */}
            <motion.div
              className="absolute top-0 left-7 right-7 md:left-9 md:right-9 h-7 md:h-9 shadow-xl z-20 overflow-hidden border-x border-t border-white/20"
              style={{
                y: frameSplitTop,
                background: 'linear-gradient(180deg, #3a3d44 0%, #5a5f6a 20%, #222428 50%, #111 100%)',
              }}
            >
              <div className="w-full h-[2px] bg-white/40 absolute top-0" />
            </motion.div>

            {/* Bottom Horizontal Sill Section */}
            <motion.div
              className="absolute bottom-0 left-7 right-7 md:left-9 md:right-9 h-7 md:h-9 shadow-xl z-20 overflow-hidden border-x border-b border-white/20"
              style={{
                y: frameSplitBottom,
                background: 'linear-gradient(0deg, #111 0%, #222428 20%, #3a3d44 80%, #5a5f6a 100%)',
              }}
            >
              <div className="w-full h-[1px] bg-white/30 absolute bottom-0" />
            </motion.div>
          </motion.div>

          {/* Layer 03: Recessed Lock Mechanism & Silent Rollers */}
          <motion.div
            className="absolute top-1/2 right-[-24px] md:right-[-36px] w-14 md:w-16 h-32 md:h-40 bg-[#16181b] rounded-lg flex flex-col items-center justify-center -translate-y-1/2 border border-zinc-600/60 z-30 shadow-[0_0_50px_rgba(255,255,255,0.15)] overflow-hidden"
            style={{ opacity: lockOpacity, scale: lockScale, x: frameSplitRight }}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-transparent pointer-events-none" />
            <div className="w-2.5 md:w-3.5 h-14 md:h-18 bg-[#0a0a0c] rounded-sm shadow-inner mb-3 border border-t-black border-b-white/30" />
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-zinc-200 to-zinc-500 shadow-lg border border-zinc-300 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-black/80" />
            </div>
            <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest mt-2">LOCK</span>
          </motion.div>
        </div>

        {/* Dynamic Synchronized Exploded Stage Typography */}
        <div className="absolute bottom-12 sm:bottom-16 w-full px-6 flex justify-center z-20 pointer-events-none">
          <motion.div style={{ opacity: text1Opacity }} className="absolute text-center max-w-lg">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-zinc-400">Stage 01</span>
            <h3 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mt-1">Laser-Mitered Aluminium Frame</h3>
            <p className="text-zinc-400 mt-2 text-sm sm:text-base font-light">Structural 6063-T6 architectural alloy with invisible corner cleats and scratch-proof electro-coating.</p>
          </motion.div>

          <motion.div style={{ opacity: text2Opacity }} className="absolute text-center max-w-lg">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-zinc-400">Stage 02</span>
            <h3 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mt-1">Four-Point Dimensional Expansion</h3>
            <p className="text-zinc-400 mt-2 text-sm sm:text-base font-light">Precision cut to ±0.5mm site measurements, ensuring a snug rattle-free acoustic seal across all window styles.</p>
          </motion.div>

          <motion.div style={{ opacity: text3Opacity }} className="absolute text-center max-w-lg">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-zinc-400">Stage 03</span>
            <h3 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mt-1">Marine-Grade 316 Micro-Mesh</h3>
            <p className="text-zinc-300 mt-2 text-sm sm:text-base font-light">Blocks 100% of mosquitoes and tiny midges while allowing 98% unobstructed airflow and optical daylight.</p>
          </motion.div>

          <motion.div style={{ opacity: text4Opacity }} className="absolute text-center max-w-lg">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-emerald-400">Stage 04</span>
            <h3 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mt-1">Concealed Multi-Point Lock & Rollers</h3>
            <p className="text-zinc-400 mt-2 text-sm sm:text-base font-light">Stainless steel ball bearings glide silently on heavy-duty tracks, secured with an ergonomic flush architectural latch.</p>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
