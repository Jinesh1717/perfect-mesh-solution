'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { motion, animate } from 'framer-motion';
import { Calculator as CalcIcon, ArrowRight, Check, Info } from 'lucide-react';

const PRICING: Record<string, { base: number; perSqFt: number; label: string }> = {
  'sliding-door': { base: 2800, perSqFt: 180, label: 'Sliding Mosquito Mesh Door' },
  'pleated-system': { base: 3200, perSqFt: 220, label: 'Pleated Accordion Retractable Screen' },
  'magnetic-window': { base: 1200, perSqFt: 95, label: 'Magnetic Window Frame Screen' },
  'casement-window': { base: 1600, perSqFt: 125, label: 'Hinged Openable Casement Mesh' },
  'balcony-partition': { base: 4500, perSqFt: 260, label: 'Balcony Aluminium Mesh Partition' },
};

const PRESETS = [
  { name: 'Bedroom Standard Window', width: 120, height: 120, type: 'magnetic-window' },
  { name: 'Living Room 2-Track Slider', width: 150, height: 140, type: 'casement-window' },
  { name: 'Master Balcony Slider', width: 180, height: 210, type: 'sliding-door' },
  { name: 'Wide Terrace Pleated Exit', width: 240, height: 210, type: 'pleated-system' },
];

export default function Calculator() {
  const [width, setWidth] = useState<number>(150);
  const [height, setHeight] = useState<number>(140);
  const [quantity, setQuantity] = useState<number>(1);
  const [type, setType] = useState<string>('sliding-door');

  // Input boundaries
  const clampWidth = (val: number) => Math.max(30, Math.min(600, val));
  const clampHeight = (val: number) => Math.max(30, Math.min(350, val));
  const clampQty = (val: number) => Math.max(1, Math.min(50, val));

  // Compute estimated total based on dimensions and product type
  const estimatedPrice = useMemo(() => {
    // 1 sq ft ≈ 929.03 cm²
    const areaSqFt = (width * height) / 929.03;
    const config = PRICING[type] || PRICING['sliding-door'];
    const pricePerUnit = config.base + areaSqFt * config.perSqFt;
    return Math.round(pricePerUnit * quantity);
  }, [width, height, quantity, type]);

  const [displayPrice, setDisplayPrice] = useState<number>(estimatedPrice);
  const displayPriceRef = useRef(estimatedPrice);

  useEffect(() => {
    const controls = animate(displayPriceRef.current, estimatedPrice, {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (value) => {
        const rounded = Math.round(value);
        displayPriceRef.current = rounded;
        setDisplayPrice(rounded);
      },
    });
    return () => controls.stop();
  }, [estimatedPrice]);

  return (
    <section className="py-28 md:py-36 bg-[#070809] relative overflow-hidden border-t border-white/[0.06] w-full" id="calculator">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono uppercase tracking-[0.2em] text-zinc-400 mb-4">
              <CalcIcon size={12} className="text-zinc-300" />
              <span>Instant Cost Estimator</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.08]">
              Transparent Pricing.
              <br />
              <span className="text-zinc-500 font-light">Custom Sized To The Millimeter.</span>
            </h2>
          </div>
          <p className="text-zinc-400 max-w-md text-sm sm:text-base leading-relaxed font-light">
            Select your architectural configuration and dimensions below for an immediate ballpark estimate. Exact quotations are confirmed during our free in-home laser measurement visit.
          </p>
        </div>

        {/* Preset Dimension Quick-Select Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar max-w-full">
          <span className="text-xs font-mono uppercase tracking-wider text-zinc-500 mr-2 shrink-0">
            Quick Presets:
          </span>
          {PRESETS.map((preset) => (
            <button
              key={preset.name}
              onClick={() => {
                setWidth(preset.width);
                setHeight(preset.height);
                setType(preset.type);
              }}
              className="px-4 py-2 rounded-full text-xs font-medium tracking-wide bg-white/[0.03] border border-white/10 text-zinc-300 hover:text-white hover:bg-white/[0.08] transition-all whitespace-nowrap cursor-pointer shrink-0"
            >
              {preset.name} ({preset.width}×{preset.height} cm)
            </button>
          ))}
        </div>

        {/* Main Calculator Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Controls Column */}
          <div className="lg:col-span-7 bg-[#0e1013] border border-white/[0.08] rounded-3xl p-6 sm:p-10 shadow-2xl">
            {/* System Type Selector */}
            <div className="mb-8">
              <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-3">
                1. Select Architectural System
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.entries(PRICING).map(([key, item]) => (
                  <button
                    key={key}
                    onClick={() => setType(key)}
                    className={`p-4 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                      type === key
                        ? 'bg-white/10 border-white text-white shadow-[0_0_20px_rgba(255,255,255,0.1)]'
                        : 'bg-white/[0.02] border-white/[0.06] text-zinc-400 hover:border-white/20 hover:text-zinc-200'
                    }`}
                  >
                    <span className="text-xs font-semibold tracking-wide block">{item.label}</span>
                    <span className="text-[10px] font-mono text-zinc-500 mt-2">
                      Base ₹{item.base.toLocaleString('en-IN')} + ₹{item.perSqFt}/sq.ft
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Dimension Sliders */}
            <div className="space-y-6">
              {/* Width Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">
                    2. Reveal Width (cm)
                  </span>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={30}
                      max={600}
                      value={width}
                      onChange={(e) => setWidth(clampWidth(Number(e.target.value)))}
                      className="w-20 bg-black/50 border border-white/20 rounded-lg px-2.5 py-1 text-right text-sm font-mono text-white focus:outline-none focus:border-white"
                    />
                    <span className="text-xs text-zinc-500 font-mono">cm</span>
                  </div>
                </div>
                <input
                  type="range"
                  min={30}
                  max={450}
                  step={5}
                  value={width}
                  onChange={(e) => setWidth(Number(e.target.value))}
                  className="w-full accent-white bg-zinc-800 rounded-lg h-2 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-zinc-600 mt-1">
                  <span>30 cm</span>
                  <span>450 cm (Max custom 600cm)</span>
                </div>
              </div>

              {/* Height Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">
                    3. Reveal Height (cm)
                  </span>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={30}
                      max={350}
                      value={height}
                      onChange={(e) => setHeight(clampHeight(Number(e.target.value)))}
                      className="w-20 bg-black/50 border border-white/20 rounded-lg px-2.5 py-1 text-right text-sm font-mono text-white focus:outline-none focus:border-white"
                    />
                    <span className="text-xs text-zinc-500 font-mono">cm</span>
                  </div>
                </div>
                <input
                  type="range"
                  min={30}
                  max={300}
                  step={5}
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  className="w-full accent-white bg-zinc-800 rounded-lg h-2 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-zinc-600 mt-1">
                  <span>30 cm</span>
                  <span>300 cm (Max custom 350cm)</span>
                </div>
              </div>

              {/* Quantity Selector */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">
                    4. Quantity of Openings
                  </span>
                  <span className="text-sm font-mono font-bold text-white">{quantity} units</span>
                </div>
                <div className="flex items-center gap-3">
                  {[1, 2, 3, 5, 10].map((qty) => (
                    <button
                      key={qty}
                      onClick={() => setQuantity(qty)}
                      className={`flex-1 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                        quantity === qty
                          ? 'bg-white text-black shadow-lg'
                          : 'bg-white/[0.04] border border-white/10 text-zinc-400 hover:text-white'
                      }`}
                    >
                      {qty}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Summary Card */}
          <div className="lg:col-span-5 bg-gradient-to-b from-[#14171c] to-[#0c0d10] border border-white/[0.12] rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.02] blur-[100px] rounded-full pointer-events-none" />

            <div>
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-400 block mb-2">
                Estimated Quotation
              </span>
              <div className="text-4xl sm:text-5xl font-black text-white tracking-tight font-mono mb-2">
                ₹ {displayPrice.toLocaleString('en-IN')}
              </div>
              <p className="text-xs text-zinc-400 font-light mb-8">
                Estimated for {quantity} opening(s) • Total approx. {Math.round((width * height * quantity) / 929.03)} sq.ft
              </p>

              {/* Breakdown List */}
              <div className="space-y-3 py-6 border-y border-white/[0.08] text-xs">
                <div className="flex justify-between text-zinc-300">
                  <span>System Selected:</span>
                  <span className="font-semibold text-white">{PRICING[type]?.label}</span>
                </div>
                <div className="flex justify-between text-zinc-300">
                  <span>Dimensions per unit:</span>
                  <span className="font-mono text-white">{width} cm (W) × {height} cm (H)</span>
                </div>
                <div className="flex justify-between text-zinc-300">
                  <span>Aluminium Specification:</span>
                  <span className="text-white">6063-T6 Aerospace Grade</span>
                </div>
                <div className="flex justify-between text-zinc-300">
                  <span>Micro-Mesh Weave:</span>
                  <span className="text-white">316 High-Tensile Stainless</span>
                </div>
                <div className="flex justify-between text-zinc-300">
                  <span>Site Survey & Laser Scan:</span>
                  <span className="text-emerald-400 font-semibold uppercase font-mono">100% Free</span>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <a
                href="#contact"
                className="w-full py-4 rounded-full bg-white text-black font-semibold text-xs sm:text-sm uppercase tracking-wider hover:bg-zinc-200 transition-all duration-300 hover:scale-[1.02] shadow-2xl flex items-center justify-center gap-2 group"
              >
                <span>Book Free In-Home Measurement</span>
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </a>

              <div className="flex items-start gap-2 mt-4 text-[11px] text-zinc-500 font-light">
                <Info size={13} className="shrink-0 mt-0.5 text-zinc-400" />
                <span>
                  *Indicative estimation only. Final quotation provided after on-site laser survey confirms reveal squareness and mounting profile.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
