'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, SlidersHorizontal, ArrowRight, CheckCircle2, ChevronDown } from 'lucide-react';
import { useSceneStore, ProductSystemType } from '@/lib/useSceneStore';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface SystemItem {
  id: ProductSystemType;
  title: string;
  category: string;
  subtitle: string;
  heroSpec: string;
  fromPrice: string;
  accentColor: string;
  accentGlow: string;
  specs: Array<{ label: string; val: string }>;
  highlights: string[];
}

const SYSTEMS: SystemItem[] = [
  {
    id: 'sliding-door',
    title: 'Sliding Mosquito Mesh Doors',
    category: 'Balcony & French Doors',
    subtitle: 'Heavy-Duty Architectural Enclosures for Wide Openings',
    heroSpec: '6063-T6 Extruded Frame with 316 Marine Stainless Mesh',
    fromPrice: 'From ₹ 2,800 base + ₹ 180 / sq.ft',
    accentColor: '#10b981',
    accentGlow: 'rgba(16, 185, 129, 0.12)',
    specs: [
      { label: 'Alloy Composition', val: '6063-T6 Architectural Grade' },
      { label: 'Wire Cloth', val: '316 Marine Stainless (0.8mm strand)' },
      { label: 'Roller Bearing', val: 'Dual Stainless Sealed Ball Bearings' },
      { label: 'Max Single Span', val: 'Up to 4.2m Height custom build' },
    ],
    highlights: ['Zero Floor Obstruction Track', 'Resistant to Pets & Severe Weather', 'Concealed Multi-Point Lock'],
  },
  {
    id: 'pleated-system',
    title: 'Pleated Accordion Retractable Screen',
    category: 'Terrace & Patio Exits',
    subtitle: 'Barrier-Free Low Profile Accordion for Modern Architecture',
    heroSpec: 'High-Memory UV-Stabilized Polyester Zigzag Weave',
    fromPrice: 'From ₹ 3,200 base + ₹ 220 / sq.ft',
    accentColor: '#f59e0b',
    accentGlow: 'rgba(245, 158, 11, 0.12)',
    specs: [
      { label: 'System Guide', val: '3mm Flat Barrier-Free Floor Track' },
      { label: 'Mesh Fabric', val: 'German High-Memory Pleated Polyester' },
      { label: 'Side Cassette', val: 'Ultra-Slim 35mm Aluminum Pocket' },
      { label: 'Wind Resistance', val: 'High-Tension Wire Core Tensioners' },
    ],
    highlights: ['Wheelchair & Toddler Friendly', 'Collapses Flush Into Side Wall', 'Zero Track Dust Trap'],
  },
  {
    id: 'casement-window',
    title: 'Magnetic & Casement Window Screens',
    category: 'Window Solutions',
    subtitle: 'Invisible In-Frame Fit for uPVC, Aluminium & Wood Reveals',
    heroSpec: 'High-Energy Neodymium Magnetic Perimeter Gasket',
    fromPrice: 'From ₹ 1,200 base + ₹ 95 / sq.ft',
    accentColor: '#06b6d4',
    accentGlow: 'rgba(6, 182, 212, 0.12)',
    specs: [
      { label: 'Mounting Style', val: 'Zero-Drill Magnetic or Hinged Sash' },
      { label: 'Airflow Rating', val: '98.4% Unobstructed Natural Breeze' },
      { label: 'Frame Depths', val: 'Slimline 18mm / 25mm Profiles' },
      { label: 'Maintenance', val: 'Detaches in 3 seconds for tap wash' },
    ],
    highlights: ['Zero Screws on uPVC Windows', 'Airtight Magnetic Perimeter Seal', 'Near-Invisible Optical Clarity'],
  },
  {
    id: 'balcony-partition',
    title: 'Architectural Aluminium Partitions',
    category: 'Custom Fabrication',
    subtitle: 'Custom Balcony Enclosures, Louvers & Structural Dividers',
    heroSpec: 'AkzoNobel 60-80μm Powder Coating with Reinforced Cleats',
    fromPrice: 'From ₹ 4,500 base + ₹ 260 / sq.ft',
    accentColor: '#8b5cf6',
    accentGlow: 'rgba(139, 92, 246, 0.12)',
    specs: [
      { label: 'Surface Coating', val: 'AkzoNobel Architectural Powder Finish' },
      { label: 'Corner Joints', val: 'Hydraulic Mitered Internal Cleats' },
      { label: 'Glass / Mesh', val: 'Hybrid Toughened Glass + Safety Mesh' },
      { label: 'Warranty', val: '10-Year Structural Integrity Warranty' },
    ],
    highlights: ['Custom RAL Palette Matching', 'Severe Monsoon Windload Rating', 'Commercial & Villa Grade'],
  },
];

export default function Categories() {
  const sectionRef = useRef<HTMLElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const setStage = useSceneStore((s) => s.setStage);
  const setActiveSystem = useSceneStore((s) => s.setActiveSystem);

  const activeItem = SYSTEMS[currentIndex];

  useEffect(() => {
    if (!sectionRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top center',
      end: 'bottom center',
      onEnter: () => {
        setStage('product');
        setActiveSystem(SYSTEMS[currentIndex].id);
      },
      onEnterBack: () => {
        setStage('product');
        setActiveSystem(SYSTEMS[currentIndex].id);
      },
    });

    return () => trigger.kill();
  }, [setStage, setActiveSystem, currentIndex]);

  const handlePrev = () => {
    const nextIdx = (currentIndex - 1 + SYSTEMS.length) % SYSTEMS.length;
    setCurrentIndex(nextIdx);
    setActiveSystem(SYSTEMS[nextIdx].id);
  };

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % SYSTEMS.length;
    setCurrentIndex(nextIdx);
    setActiveSystem(SYSTEMS[nextIdx].id);
  };

  const handleSelect = (idx: number) => {
    setCurrentIndex(idx);
    setActiveSystem(SYSTEMS[idx].id);
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-24 bg-[#070809] relative overflow-hidden w-full border-t border-white/[0.08]"
      id="products"
    >
      {/* Dynamic Background Accent Glow (transitions per product) */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] max-w-full h-[350px] blur-[150px] rounded-full pointer-events-none transition-colors duration-700 overflow-hidden"
        style={{ backgroundColor: activeItem.accentGlow }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono uppercase tracking-[0.2em] text-zinc-300 mb-3">
            <SlidersHorizontal size={13} className="text-zinc-300" />
            <span>Focal Architectural Catalog</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.08]">
            Engineered For Modern Living.
          </h2>
          <p className="text-zinc-300 max-w-xl mx-auto text-sm sm:text-base mt-3 font-light">
            Select a system below to preview architectural specs, configurations, and indicative pricing.
          </p>

          {/* System Category Chips Switcher */}
          <div className="flex items-center justify-center gap-2 mt-8 overflow-x-auto pb-2 no-scrollbar max-w-full">
            {SYSTEMS.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => handleSelect(idx)}
                className={`px-4 sm:px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                  currentIndex === idx
                    ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.25)] scale-105'
                    : 'bg-white/[0.04] border border-white/10 text-zinc-300 hover:text-white hover:bg-white/[0.08]'
                }`}
              >
                {item.title.split(' ')[0]} {item.title.split(' ')[1]}
              </button>
            ))}
          </div>
        </div>

        {/* Central Focal Showcase Card (Fizzi Style) */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeItem.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="p-8 sm:p-12 rounded-3xl bg-[#0e1013]/90 border border-white/15 backdrop-blur-2xl shadow-2xl relative"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/[0.08] gap-4">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">
                    {activeItem.category}
                  </span>
                  <h3 className="text-2xl sm:text-4xl font-bold text-white tracking-tight mt-1">
                    {activeItem.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-300 mt-1 font-light">
                    {activeItem.subtitle}
                  </p>
                </div>

                <div className="text-left sm:text-right shrink-0">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 block">
                    Ballpark Pricing
                  </span>
                  <span className="text-lg sm:text-xl font-bold font-mono text-emerald-400 block mt-0.5">
                    {activeItem.fromPrice}
                  </span>
                </div>
              </div>

              {/* Focal Key Metric Highlight */}
              <div className="py-6 border-b border-white/[0.08]">
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                  <div
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: activeItem.accentColor }}
                  />
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 block">
                      Core Architectural Engineering Spec
                    </span>
                    <span className="text-sm sm:text-base font-semibold text-white mt-0.5 block">
                      {activeItem.heroSpec}
                    </span>
                  </div>
                </div>

                {/* Architectural Highlights */}
                <div className="flex flex-wrap gap-2.5 mt-5">
                  {activeItem.highlights.map((h, hIdx) => (
                    <span
                      key={hIdx}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs text-zinc-200"
                    >
                      <CheckCircle2 size={13} className="text-emerald-400" />
                      <span>{h}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Technical Specifications Accordion Drawer */}
              <div className="pt-4">
                <button
                  onClick={() => setDrawerOpen(!drawerOpen)}
                  className="w-full flex items-center justify-between py-2 text-xs font-mono uppercase tracking-wider text-zinc-300 hover:text-white transition-colors cursor-pointer"
                >
                  <span>{drawerOpen ? 'Hide Engineering Specs' : 'View Detailed Technical Specifications'}</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-300 ${drawerOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                <AnimatePresence>
                  {drawerOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden pt-4"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-black/40 border border-white/10 text-xs">
                        {activeItem.specs.map((spec, sIdx) => (
                          <div key={sIdx} className="flex flex-col">
                            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">
                              {spec.label}
                            </span>
                            <span className="text-xs font-medium text-zinc-200 mt-1">
                              {spec.val}
                            </span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Action Buttons & Prev/Next Carousel Nav */}
              <div className="mt-8 pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    className="p-3 rounded-full bg-white/5 border border-white/15 text-white hover:bg-white/15 transition-all cursor-pointer shadow-lg"
                    aria-label="Previous system"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <span className="text-xs font-mono text-zinc-400 px-3">
                    0{currentIndex + 1} / 0{SYSTEMS.length}
                  </span>
                  <button
                    onClick={handleNext}
                    className="p-3 rounded-full bg-white/5 border border-white/15 text-white hover:bg-white/15 transition-all cursor-pointer shadow-lg"
                    aria-label="Next system"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <a
                    href="#calculator"
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-zinc-200 transition-all shadow-xl"
                  >
                    <span>Estimate Price</span>
                    <ArrowRight size={14} />
                  </a>
                  <a
                    href="#contact"
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/[0.05] border border-white/15 text-white font-semibold text-xs uppercase tracking-wider hover:bg-white/10 transition-all"
                  >
                    Book Visit
                  </a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
