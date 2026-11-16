'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { ArrowRight, ShieldCheck, Compass, Sparkles } from 'lucide-react';

// Dynamically import 3D scene to prevent SSR WebGL mismatch
const HeroScene = dynamic(() => import('../3d/HeroScene'), { ssr: false });

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-[#070809] pt-24 pb-16">
      {/* 3D Interactive Window Model Canvas */}
      <HeroScene />

      {/* Atmospheric Vignette & Contrast Gradient */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#070809]/40 to-[#070809] z-0 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#070809] to-transparent z-0 pointer-events-none" />

      {/* Overlay Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col items-center justify-center text-center pointer-events-none mt-10 md:mt-4">
        {/* Architectural Quality Badge */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md mb-8 shadow-xl pointer-events-auto"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-zinc-300">
            Precision Architectural Fabrication • Bespoke Engineering
          </span>
        </motion.div>

        {/* Hero Headline */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl"
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[1.05] drop-shadow-2xl">
            Invisible Protection.
            <br />
            <span className="bg-gradient-to-r from-zinc-100 via-zinc-400 to-zinc-600 bg-clip-text text-transparent">
              Maximum Comfort.
            </span>
          </h1>
        </motion.div>

        {/* Supporting Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-base sm:text-lg md:text-xl text-zinc-400 max-w-2xl mt-6 mb-10 font-light leading-relaxed drop-shadow"
        >
          Custom architectural mosquito mesh systems and aluminium fabrication, engineered with 6063-T6 aerospace alloy and 316 marine-grade stainless micro-mesh.
        </motion.p>

        {/* Interactive Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto pointer-events-auto"
        >
          <a
            href="#story"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-black font-semibold text-xs sm:text-sm uppercase tracking-wider hover:bg-zinc-200 transition-all duration-300 hover:scale-[1.02] shadow-[0_0_30px_rgba(255,255,255,0.2)] flex items-center justify-center gap-2 group"
          >
            <span>Explore Defense In Action</span>
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#contact"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/[0.05] border border-white/15 text-white font-semibold text-xs sm:text-sm uppercase tracking-wider hover:bg-white/10 hover:border-white/30 transition-all duration-300 hover:scale-[1.02] backdrop-blur-md"
          >
            Book Free Laser Measurement
          </a>
        </motion.div>

        {/* Spec Feature Ribbon */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-16 pt-8 border-t border-white/[0.06] grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 text-left w-full max-w-4xl pointer-events-auto"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300">
              <ShieldCheck size={16} />
            </div>
            <div>
              <p className="text-xs font-semibold text-white tracking-wide">316 Stainless Mesh</p>
              <p className="text-[11px] text-zinc-400">Micro-weave barrier</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300">
              <Compass size={16} />
            </div>
            <div>
              <p className="text-xs font-semibold text-white tracking-wide">Aerospace Extrusions</p>
              <p className="text-[11px] text-zinc-400">Structural 6063-T6 alloy</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300">
              <Sparkles size={16} />
            </div>
            <div>
              <p className="text-xs font-semibold text-white tracking-wide">Optical Clarity</p>
              <p className="text-[11px] text-zinc-400">98% natural light & air</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300">
              <span className="font-mono text-xs font-bold text-white">0mm</span>
            </div>
            <div>
              <p className="text-xs font-semibold text-white tracking-wide">Laser Measured</p>
              <p className="text-[11px] text-zinc-400">Flawless seamless fit</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating Scroll Prompt */}
      <motion.a
        href="#story"
        aria-label="Scroll to discover the signature storytelling animation"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-zinc-400 hover:text-white transition-colors cursor-pointer pointer-events-auto"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-500">
          Scroll to explore
        </span>
        <div className="w-5 h-8 rounded-full border border-zinc-700 flex justify-center p-1">
          <motion.div
            className="w-1 h-1.5 bg-white rounded-full"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.a>
    </section>
  );
}
