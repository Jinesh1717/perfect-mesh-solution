'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Compass, Sparkles, Sliders, MessageSquare } from 'lucide-react';
import { useSceneStore } from '@/lib/useSceneStore';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const FINISHES = [
  { name: 'Charcoal Noir', color: '#2a2e39', ring: 'border-zinc-500' },
  { name: 'Champagne Bronze', color: '#3f3529', ring: 'border-amber-600' },
  { name: 'Space Titanium', color: '#4a505b', ring: 'border-zinc-400' },
  { name: 'Polar White', color: '#dce0e8', ring: 'border-white' },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const setStage = useSceneStore((s) => s.setStage);
  const frameColor = useSceneStore((s) => s.frameColor);
  const setFrameColor = useSceneStore((s) => s.setFrameColor);
  const isSashOpen = useSceneStore((s) => s.isSashOpenManual);
  const toggleSash = useSceneStore((s) => s.toggleSashManual);

  useEffect(() => {
    if (!sectionRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top center',
      end: 'bottom center',
      onEnter: () => setStage('hero'),
      onEnterBack: () => setStage('hero'),
    });

    return () => trigger.kill();
  }, [setStage]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100svh] w-full flex items-center justify-center overflow-hidden bg-transparent pt-24 pb-16"
      id="hero"
    >
      {/* Contrast Gradients (pointer-events-none so 3D background stays interactive) */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#070809]/40 to-[#070809] z-0 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#070809] to-transparent z-0 pointer-events-none" />

      {/* Floating 3D Interactive Controls */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="absolute top-28 left-6 sm:left-10 z-20 hidden md:flex flex-col gap-3 pointer-events-auto"
      >
        <div className="p-3.5 rounded-2xl bg-black/70 border border-white/10 backdrop-blur-xl shadow-2xl flex flex-col gap-2.5">
          <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-300 flex items-center gap-1.5">
            <Sliders size={12} className="text-zinc-300" />
            <span>Alloy Finish</span>
          </span>
          <div className="flex items-center gap-2">
            {FINISHES.map((finish) => (
              <button
                key={finish.name}
                onClick={() => setFrameColor(finish.color)}
                className={`w-6 h-6 rounded-full border transition-all cursor-pointer ${
                  frameColor === finish.color
                    ? `${finish.ring} scale-125 shadow-[0_0_12px_rgba(255,255,255,0.4)]`
                    : 'border-white/20 opacity-70 hover:opacity-100 hover:scale-110'
                }`}
                style={{ backgroundColor: finish.color }}
                title={finish.name}
                aria-label={`Select ${finish.name} frame finish`}
              />
            ))}
          </div>
          <span className="text-[10px] font-mono text-zinc-400 truncate max-w-[120px]">
            {FINISHES.find((f) => f.color === frameColor)?.name || 'Custom'}
          </span>
        </div>

        {/* Sash Slide Toggle */}
        <button
          onClick={toggleSash}
          className="px-3.5 py-2.5 rounded-xl bg-black/70 border border-white/10 backdrop-blur-xl text-xs font-mono text-zinc-200 hover:text-white hover:border-white/25 transition-all text-left flex items-center justify-between cursor-pointer shadow-xl"
        >
          <span>Sash: {isSashOpen ? 'Open' : 'Closed'}</span>
          <span className={`w-2 h-2 rounded-full ml-2 ${isSashOpen ? 'bg-emerald-400' : 'bg-zinc-500'}`} />
        </button>
      </motion.div>

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col items-center justify-center text-center pointer-events-none mt-10 md:mt-4">
        {/* Architectural Quality Badge */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md mb-8 shadow-xl pointer-events-auto"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-300">
            Precision Architectural Fabrication • Bespoke Engineering
          </span>
        </motion.div>

        {/* Hero Headline */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
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
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="text-base sm:text-lg md:text-xl text-zinc-300 max-w-2xl mt-6 mb-10 font-light leading-relaxed drop-shadow"
        >
          Custom architectural mosquito mesh systems and aluminium fabrication, engineered with 6063-T6 aerospace alloy and 316 marine-grade stainless micro-mesh.
        </motion.p>

        {/* Interactive Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto pointer-events-auto"
        >
          <a
            href="#story"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-black font-semibold text-xs sm:text-sm uppercase tracking-wider hover:bg-zinc-200 transition-all duration-300 hover:scale-[1.02] shadow-[0_0_30px_rgba(255,255,255,0.2)] flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Explore Defense In Action</span>
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="https://wa.me/917012715025?text=Hello%20Perfect%20Mesh,%20I%20would%20like%20to%20book%20a%20free%20in-home%20laser%20measurement%20survey."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-7 py-4 rounded-full bg-[#128C7E]/20 border border-[#25D366]/40 text-[#25D366] font-semibold text-xs sm:text-sm uppercase tracking-wider hover:bg-[#128C7E]/30 transition-all duration-300 hover:scale-[1.02] backdrop-blur-md flex items-center justify-center gap-2 cursor-pointer shadow-lg"
          >
            <MessageSquare size={16} />
            <span>WhatsApp Booking</span>
          </a>
          <a
            href="#contact"
            className="w-full sm:w-auto px-7 py-4 rounded-full bg-white/[0.05] border border-white/15 text-white font-semibold text-xs sm:text-sm uppercase tracking-wider hover:bg-white/10 hover:border-white/30 transition-all duration-300 hover:scale-[1.02] backdrop-blur-md cursor-pointer"
          >
            Free Site Visit
          </a>
        </motion.div>

        {/* Spec Feature Ribbon */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-16 pt-8 border-t border-white/[0.08] grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 text-left w-full max-w-4xl pointer-events-auto"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300">
              <ShieldCheck size={17} />
            </div>
            <div>
              <p className="text-xs font-semibold text-white tracking-wide">316 Stainless Mesh</p>
              <p className="text-[11px] text-zinc-400">Micro-weave barrier</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300">
              <Compass size={17} />
            </div>
            <div>
              <p className="text-xs font-semibold text-white tracking-wide">Aerospace Extrusions</p>
              <p className="text-[11px] text-zinc-400">Structural 6063-T6 alloy</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300">
              <Sparkles size={17} />
            </div>
            <div>
              <p className="text-xs font-semibold text-white tracking-wide">Optical Clarity</p>
              <p className="text-[11px] text-zinc-400">98% natural light & air</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300">
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
        <span className="text-[11px] uppercase font-mono tracking-widest text-zinc-400">
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
