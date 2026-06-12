'use client';

import { useState, useRef, useEffect } from 'react';

import Image from 'next/image';

const testimonials = [
  { name: "Sarah Jenkins", role: "Homeowner", text: "The invisible mesh completely transformed our living room. We get fresh air all day without a single mosquito." },
  { name: "Michael T.", role: "Architect", text: "I specify Perfect Mesh structural aluminium for all my luxury villa projects. The finish is unmatched." },
  { name: "Priya R.", role: "Interior Designer", text: "Sleek, minimal, and highly functional. The sliding mechanism is butter smooth." }
];

export default function Showcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderPosition, setSliderPosition] = useState(50);
  const isDragging = useRef(false);

  const handlePointerDown = () => { isDragging.current = true; };
  const handlePointerUp = () => { isDragging.current = false; };
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
    <section className="py-32 bg-background relative overflow-hidden" id="showcase">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">The Perfect Transformation</h2>
          <p className="text-gray-400 text-lg">Swipe to see the invisible difference.</p>
        </div>
        
        {/* Before / After Slider */}
        <div 
           ref={containerRef}
           className="relative w-full max-w-5xl h-[400px] md:h-[600px] mx-auto rounded-3xl overflow-hidden cursor-ew-resize select-none glass-panel shadow-2xl"
           onPointerDown={handlePointerDown}
           style={{ touchAction: 'none' }}
        >
          {/* AFTER Image (Bottom Layer) */}
          <div className="absolute inset-0 bg-[#1a1a1a] flex flex-col items-center justify-center">
             <Image src="/after.png" alt="After installing mesh" fill className="object-cover" />
             <div className="absolute inset-0 bg-gradient-to-tr from-[#111]/40 to-transparent" />
             <p className="text-white text-3xl font-black z-10 opacity-70 tracking-widest pl-[50%] drop-shadow-xl saturate-0">AFTER</p>
          </div>

          {/* BEFORE Image (Top Layer, clipped) */}
          <div 
            className="absolute inset-0 bg-[#0d0d0d] flex items-center justify-center border-r-[2px] border-white/50"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          >
             <Image src="/before.png" alt="Before installing mesh" fill className="object-cover" />
             <div className="absolute inset-0 bg-gradient-to-bl from-[#222]/30 to-[#050505]/40" />
             <p className="text-white text-3xl font-black z-10 opacity-70 tracking-widest pr-[50%] drop-shadow-xl saturate-0">BEFORE</p>
          </div>

          {/* Slider Handle */}
          <div 
             className="absolute top-0 bottom-0 w-0.5 bg-white z-20 flex items-center justify-center -ml-0.25 shadow-[0_0_10px_rgba(255,255,255,0.5)]"
             style={{ left: `${sliderPosition}%` }}
          >
             <div className="w-10 h-10 md:w-14 md:h-14 bg-white/10 backdrop-blur-md border border-white/40 rounded-full flex items-center justify-center shadow-2xl text-white">
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18 6-6-6-6"/><path d="m9 18-6-6 6-6"/></svg>
             </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-32">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-12">What Our Clients Say</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div key={idx} className="glass-panel p-8 rounded-2xl flex flex-col justify-between">
                <div>
                  <div className="flex gap-1 mb-4 text-accent">
                    {[1,2,3,4,5].map(star => <svg key={star} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>)}
                  </div>
                  <p className="text-gray-300 italic mb-6">"{t.text}"</p>
                </div>
                <div>
                  <p className="font-bold text-white">{t.name}</p>
                  <p className="text-sm text-gray-500">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
