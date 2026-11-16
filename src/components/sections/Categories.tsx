'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, CheckCircle2, SlidersHorizontal, Shield, Sparkles } from 'lucide-react';

const PRODUCTS = [
  {
    id: 'sliding-mesh',
    category: 'Door Systems',
    title: 'Sliding Mosquito Mesh Doors',
    subtitle: 'Heavy-Duty Architectural Balcony & Patio Enclosures',
    description:
      'Engineered for wide-span balcony openings and French doors. Features ultra-smooth silent ball-bearing rollers housed within an extruded 6063-T6 architectural aluminium frame with 316-grade high-tensile stainless steel mesh.',
    image: '/products/sliding_mesh_door.jpg',
    specs: [
      { label: 'Frame Alloy', val: '6063-T6 Architectural Aluminium' },
      { label: 'Mesh Material', val: '316 Marine-Grade Stainless Steel' },
      { label: 'Roller Hardware', val: 'Silent Stainless Ball Bearings' },
      { label: 'Maximum Span', val: 'Custom built up to 4.2m Height' },
    ],
    highlights: ['Zero Floor Obstruction Track', 'Resistant to Pets & Severe Weather', 'Concealed Lock System'],
  },
  {
    id: 'pleated-mesh',
    category: 'Retractable Screens',
    title: 'Pleated Accordion Retractable Systems',
    subtitle: 'Barrier-Free Low Profile for Modern Terraces',
    description:
      'German-engineered zigzag pleated polyester mesh that glides effortlessly and collapses neatly into a slim 35mm side cassette when opened. Designed with a 3mm barrier-free floor guide ideal for high-traffic patio exits.',
    image: '/products/pleated_mesh_system.jpg',
    specs: [
      { label: 'System Type', val: 'Horizontal Retractable Accordion' },
      { label: 'Bottom Track', val: '3mm Flat Barrier-Free Guide' },
      { label: 'Mesh Weave', val: 'UV-Stabilized High-Memory Mesh' },
      { label: 'Cassette Width', val: 'Slim 35mm Flush Profile' },
    ],
    highlights: ['Wheelchair & Kid Friendly', 'Tension Cord Wind Resistance', 'Compact Lateral Storage'],
  },
  {
    id: 'casement-window',
    category: 'Window Solutions',
    title: 'Magnetic & Casement Window Screens',
    subtitle: 'Invisible In-Frame Fit for uPVC, Wood & Aluminium',
    description:
      'Seamlessly attaches to existing window frames without compromising window handles or curtains. Features high-energy neodymium magnetic perimeter seals for an airtight barrier that detaches in seconds for cleaning.',
    image: '/products/casement_window_mesh.jpg',
    specs: [
      { label: 'Mounting Style', val: 'Flush Magnetic or Hinged Casement' },
      { label: 'Airflow Index', val: '98% Uninhibited Cross Ventilation' },
      { label: 'Frame Depths', val: 'Slimline 18mm / 25mm Profiles' },
      { label: 'Maintenance', val: 'Snap-Off Washable Screen' },
    ],
    highlights: ['Zero Drilling on uPVC Profiles', 'High-Strength Neodymium Strips', 'Crystal Clear Wire Finish'],
  },
  {
    id: 'aluminium-fabrication',
    category: 'Aluminium Works',
    title: 'Architectural Aluminium Fabrication',
    subtitle: 'Custom Partitions, Balcony Enclosures & Louvers',
    description:
      'Precision architectural aluminium fabrication for bespoke architectural partitions, glass balconies, ventilation louvers, and commercial structural facades finished in matte architectural AkzoNobel powder coating.',
    image: '/products/aluminium_fabrication.jpg',
    specs: [
      { label: 'Coating Standard', val: 'AkzoNobel 60-80 Micron Powder Coat' },
      { label: 'Corner Joints', val: 'Mitered Precision Hydraulic Cleats' },
      { label: 'Applications', val: 'Balconies, Utility Shafts & Facades' },
      { label: 'Thermal Rating', val: 'Heavy Acoustic & Weather Sealing' },
    ],
    highlights: ['Bespoke RAL Colors Available', 'Heavy Structural Load Tolerance', 'Rustproof 20-Year Lifespan'],
  },
];

const CATEGORIES_FILTER = ['All Systems', 'Door Systems', 'Retractable Screens', 'Window Solutions', 'Aluminium Works'];

export default function Categories() {
  const [activeFilter, setActiveFilter] = useState('All Systems');

  const filteredProducts =
    activeFilter === 'All Systems'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeFilter);

  return (
    <section className="py-28 md:py-36 bg-[#080808] relative overflow-hidden w-full max-w-full" id="products">
      {/* Subtle ambient lighting constrained to viewport */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] max-w-full h-[350px] bg-white/[0.02] blur-[150px] rounded-full pointer-events-none overflow-hidden" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono uppercase tracking-[0.2em] text-zinc-400 mb-4">
              <SlidersHorizontal size={12} className="text-zinc-300" />
              <span>Architectural Systems</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.08]">
              Engineered For Modern Living.
              <br />
              <span className="text-zinc-500 font-light">Crafted Without Compromise.</span>
            </h2>
          </div>

          <p className="text-zinc-400 max-w-md text-sm sm:text-base leading-relaxed font-light">
            Every mosquito mesh system and aluminium frame is custom-fabricated to exact site dimensions using aerospace-grade extrusions and marine-grade mesh weaves.
          </p>
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-12 no-scrollbar max-w-full">
          {CATEGORIES_FILTER.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                activeFilter === cat
                  ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.2)]'
                  : 'bg-white/[0.04] border border-white/10 text-zinc-400 hover:text-white hover:bg-white/[0.08]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Editorial Product Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 w-full">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative rounded-3xl bg-[#0e1013] border border-white/[0.08] hover:border-white/20 transition-all duration-500 overflow-hidden flex flex-col shadow-2xl w-full"
              >
                {/* Product Architectural Image Container */}
                <div className="relative w-full h-72 sm:h-80 md:h-96 overflow-hidden bg-black/40">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={idx === 0}
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out brightness-[0.9] group-hover:brightness-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e1013] via-transparent to-black/30" />
                  
                  {/* Category Pill Tag */}
                  <div className="absolute top-5 left-5 z-10 px-3.5 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[11px] font-mono uppercase tracking-widest text-white">
                    {product.category}
                  </div>
                </div>

                {/* Content Panel */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-zinc-100 transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-xs font-mono uppercase tracking-wider text-zinc-400 mt-1 mb-4">
                      {product.subtitle}
                    </p>
                    <p className="text-zinc-400 text-sm leading-relaxed font-light mb-6">
                      {product.description}
                    </p>

                    {/* Technical Specifications Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-4 border-y border-white/[0.06] mb-6">
                      {product.specs.map((spec, sIdx) => (
                        <div key={sIdx} className="flex flex-col">
                          <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                            {spec.label}
                          </span>
                          <span className="text-xs font-medium text-zinc-300 mt-0.5">
                            {spec.val}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Architecture Feature Bullet Points */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {product.highlights.map((h, hIdx) => (
                        <span
                          key={hIdx}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-xs text-zinc-300"
                        >
                          <CheckCircle2 size={12} className="text-zinc-400" />
                          <span>{h}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Booking CTA Bar */}
                  <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-wider text-zinc-500">
                      Bespoke On-Site Fabrication
                    </span>
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.05] hover:bg-white text-zinc-300 hover:text-black font-semibold text-xs uppercase tracking-wider transition-all duration-300 border border-white/10 hover:border-white shadow-lg"
                    >
                      <span>Get Site Estimate</span>
                      <ArrowUpRight size={14} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
