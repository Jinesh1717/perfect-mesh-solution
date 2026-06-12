'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Experience() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative w-full py-32 bg-[#080808] overflow-hidden flex flex-col items-center justify-center border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 w-full text-center mb-16 relative z-20">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-md text-white tracking-tight">Uncompromised Living</h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">Experience the perfect balance of natural elements while keeping the unwanted outside.</p>
      </div>

      <div className="relative w-full max-w-5xl h-[500px] border border-white/10 rounded-3xl overflow-hidden mx-auto shadow-2xl backdrop-blur-sm bg-black/40">
        
        {/* The Window Mesh Divider */}
        <div className="absolute top-0 bottom-0 left-1/2 w-4 bg-gradient-to-r from-gray-700 via-gray-400 to-gray-700 -translate-x-1/2 z-10 shadow-[0_0_30px_rgba(0,0,0,0.9)] border-x border-white/20">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjMDAwIiBmaWxsLW9wYWNpdHk9IjAuNiIvPgo8cGF0aCBkPSJNMCAweDR2NEgweiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utb3BhY2l0eT0iMC4yIi8+Cjwvc3ZnPg==')] opacity-60" />
        </div>

        {/* LEFT SIDE: Outside (Mosquitos & Dust) */}
        <div className="absolute inset-y-0 left-0 right-1/2 bg-[#050505] overflow-hidden">
          {mounted && [...Array(15)].map((_, i) => (
            <motion.div
              key={`bug-${i}`}
              className="absolute w-1.5 h-1.5 bg-red-500/50 rounded-full blur-[1px]"
              initial={{ 
                x: -50, 
                y: Math.random() * 500,
                opacity: 0
              }}
              animate={{ 
                x: ["0%", "80%", "70%", "85%", "40%"],
                y: [Math.random() * 500, Math.random() * 500, Math.random() * 500],
                opacity: [0, 1, 1, 0.5, 0]
              }}
              transition={{ 
                duration: 4 + Math.random() * 3, 
                repeat: Infinity, 
                ease: "linear",
                delay: Math.random() * 5
              }}
            />
          ))}
          {mounted && [...Array(20)].map((_, i) => (
            <motion.div
              key={`dust-${i}`}
              className="absolute w-1 h-1 bg-gray-500/30 rounded-full"
              initial={{ x: 0, y: Math.random() * 500 }}
              animate={{ x: 400 }}
              transition={{ duration: 5 + Math.random() * 5, repeat: Infinity, ease: "linear" }}
            />
          ))}
          <div className="absolute bottom-8 left-8 text-gray-500 font-mono text-sm tracking-widest font-semibold">OUTSIDE</div>
        </div>

        {/* RIGHT SIDE: Inside (Clean Air & Light) */}
        <div className="absolute inset-y-0 left-1/2 right-0 bg-gradient-to-r from-[#0d0d0d] to-[#1a1a1a] overflow-hidden flex items-center justify-center">
          {mounted && [...Array(8)].map((_, i) => (
            <motion.div
              key={`air-${i}`}
              className="absolute h-[1px] w-48 bg-gradient-to-r from-transparent via-blue-200/20 to-transparent"
              style={{ top: 50 + (i * 50) }}
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 600, opacity: [0, 1, 0] }}
              transition={{ 
                duration: 3 + Math.random() * 2, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: Math.random() * 2
              }}
            />
          ))}

          {/* Natural Light Rays */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50 mix-blend-screen" />
          
          <div className="absolute bottom-8 right-8 text-gray-400 font-mono text-sm tracking-widest font-semibold z-10">INSIDE</div>
        </div>

      </div>
    </section>
  );
}
