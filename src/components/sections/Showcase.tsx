'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Eye, Star, MapPin } from 'lucide-react';

const testimonials = [
  {
    name: 'Vikram & Radhika Seth',
    role: 'Luxury Villa Owners',
    location: 'Palm Meadows, Bengaluru',
    text: 'The sliding mesh doors completely opened up our courtyard. We enjoy the monsoon evening breeze without a single mosquito. The aluminium fabrication feels solid and seamlessly integrates with our minimalist decor.',
  },
  {
    name: 'Ar. Michael Thomas',
    role: 'Principal Architect, Studio Forma',
    location: 'Indiranagar, Bengaluru',
    text: 'I specify Perfect Mesh structural aluminium systems for all high-end residential commissions. Their tolerance control, mitered corner finishes, and invisible mesh tensioning are unmatched in the region.',
  },
  {
    name: 'Priya Ramachandran',
    role: 'Interior Architecture Consultant',
    location: 'Koramangala, Bengaluru',
    text: 'The pleated retractable screens for large French balconies solved a persistent client dilemma. Whisper-quiet glide, barrier-free floor track, and zero visual clutter.',
  },
];

export default function Showcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderPosition, setSliderPosition] = useState(50);
  const isDragging = useRef(false);

  const handlePointerDown = () => {
    isDragging.current = true;
  };
  const handlePointerUp = () => {
    isDragging.current = false;
  };
  const handlePointerMove = (e: React.PointerEvent | PointerEvent) => {
    if (!isDragging.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    setSliderPosition((x / rect.width) * 100);
  };

  useEffect(() => {
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointermove', handlePointerMove);
    return () => {
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, []);

  return (
    <section className="py-28 md:py-36 bg-[#080808] relative overflow-hidden border-t border-white/[0.06] w-full" id="showcase">
      <div className="max-w-7xl mx-auto px-6 w-full">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono uppercase tracking-[0.2em] text-zinc-400 mb-4">
            <Eye size={12} className="text-zinc-300" />
            <span>Interactive Comparison</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.08]">
            The Invisible Difference.
            <br />
            <span className="text-zinc-500 font-light">Drag to Reveal The Transformation.</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-4 max-w-xl mx-auto font-light">
            Compare open exterior vulnerability with our installed high-tensile architectural micro-mesh system.
          </p>
        </div>

        {/* Before / After Interactive Slider */}
        <div className="max-w-4xl mx-auto mb-24">
          <div
            ref={containerRef}
            onPointerDown={handlePointerDown}
            className="relative h-[340px] sm:h-[450px] md:h-[520px] rounded-3xl overflow-hidden border border-white/15 select-none touch-none shadow-2xl cursor-ew-resize bg-black"
          >
            {/* After Image (Full Background) */}
            <div className="absolute inset-0">
              <Image
                src="/after.png"
                alt="After: Perfect Mesh Invisible Protection Installed"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute bottom-6 right-6 px-4 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-xs font-mono uppercase tracking-widest text-emerald-400 pointer-events-none">
                After: Perfect Mesh Installed
              </div>
            </div>

            {/* Before Image (Clipped Left Side) */}
            <div
              className="absolute inset-y-0 left-0 overflow-hidden border-r-2 border-white shadow-[0_0_20px_rgba(255,255,255,0.4)]"
              style={{ width: `${sliderPosition}%` }}
            >
              <div className="relative w-full h-full">
                <Image
                  src="/before.png"
                  alt="Before: Vulnerable open doorway without mesh"
                  fill
                  className="object-cover object-left"
                  priority
                />
              </div>
              <div className="absolute bottom-6 left-6 px-4 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-xs font-mono uppercase tracking-widest text-zinc-300 pointer-events-none">
                Before: Vulnerable Opening
              </div>
            </div>

            {/* Center Slider Grab Bar Handle */}
            <div
              className="absolute inset-y-0 -translate-x-1/2 flex items-center justify-center pointer-events-none z-20"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="w-10 h-10 rounded-full bg-white text-black shadow-[0_0_25px_rgba(0,0,0,0.8)] flex items-center justify-center text-xs font-bold border border-white/80">
                ⟷
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 mt-4 text-xs font-mono uppercase tracking-widest text-zinc-500">
            <span>Drag slider horizontally to inspect optical clarity</span>
          </div>
        </div>

        {/* Verified Architectural Client Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-[#0e1013] border border-white/[0.08] hover:border-white/20 transition-all flex flex-col justify-between shadow-xl"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
                <p className="text-zinc-300 text-sm leading-relaxed font-light mb-8 italic">
                  &ldquo;{t.text}&rdquo;
                </p>
              </div>

              <div className="pt-6 border-t border-white/[0.06]">
                <h4 className="text-white font-semibold text-sm tracking-wide">{t.name}</h4>
                <p className="text-xs text-zinc-400 font-light mt-0.5">{t.role}</p>
                <div className="flex items-center gap-1.5 text-[11px] text-zinc-500 mt-2 font-mono">
                  <MapPin size={11} className="text-zinc-400" />
                  <span>{t.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
