'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function ProductStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Texts Opacity
  const text1Opacity = useTransform(scrollYProgress, [0, 0.15, 0.22, 0.28], [0, 1, 1, 0]);
  const text2Opacity = useTransform(scrollYProgress, [0.25, 0.35, 0.45, 0.5], [0, 1, 1, 0]);
  const text3Opacity = useTransform(scrollYProgress, [0.48, 0.58, 0.7, 0.75], [0, 1, 1, 0]);
  const text4Opacity = useTransform(scrollYProgress, [0.73, 0.85, 1, 1], [0, 1, 1, 1]);

  // Visuals Animation based on scroll
  const frameScale = useTransform(scrollYProgress, [0, 0.25], [1, 1.05]);
  const frameSplitLeft = useTransform(scrollYProgress, [0.25, 0.5], [0, -120]);
  const frameSplitRight = useTransform(scrollYProgress, [0.25, 0.5], [0, 120]);
  const frameSplitTop = useTransform(scrollYProgress, [0.25, 0.5], [0, -60]);
  const frameSplitBottom = useTransform(scrollYProgress, [0.25, 0.5], [0, 60]);
  
  const meshOpacity = useTransform(scrollYProgress, [0.4, 0.55, 0.75], [0.1, 0.9, 0.9]);
  const meshScale = useTransform(scrollYProgress, [0.4, 0.55], [0.95, 1.05]);
  const meshColor = useTransform(scrollYProgress, [0.4, 0.55], ["#333", "#a0a0a0"]); 
  
  const lockOpacity = useTransform(scrollYProgress, [0.65, 0.75], [0, 1]);
  const lockScale = useTransform(scrollYProgress, [0.65, 0.75], [0.5, 1.1]);

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-background w-full" id="features">
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        
        {/* Product Visuals (2D Exploded View Simulation) */}
        <div className="relative w-64 h-96 md:w-80 md:h-[500px] z-10 flex items-center justify-center mt-[-10vh]">
           {/* Center Mesh Layer */}
           <motion.div 
             className="absolute inset-4 rounded flex items-center justify-center transition-colors"
             style={{ 
               opacity: meshOpacity, 
               scale: meshScale,
               background: "radial-gradient(circle, rgba(255,255,255,0.12) 15%, transparent 15%), radial-gradient(circle, rgba(255,255,255,0.12) 15%, transparent 15%)",
               backgroundSize: "6px 6px",
               backgroundPosition: "0 0, 3px 3px",
               border: "2px inset rgba(255,255,255,0.2)",
               boxShadow: useTransform(scrollYProgress, [0.4, 0.55], ["none", "0 0 50px rgba(160,160,160,0.15) inset"])
             }}
           >
              {/* Subtle inner reflection */}
              <div className="w-full h-full bg-gradient-to-tr from-white/5 to-transparent mix-blend-overlay" />
           </motion.div>

           {/* Outer Frame Wrapper for uniform scaling */}
           <motion.div className="absolute inset-0 drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]" style={{ scale: frameScale }}>
             {/* Left Frame Part */}
             <motion.div 
               className="absolute top-0 bottom-0 left-0 w-6 md:w-8 rounded-l-md z-20 overflow-hidden shadow-2xl border-y border-l border-white/20"
               style={{ 
                 x: frameSplitLeft,
                 background: "linear-gradient(90deg, #111 0%, #333 40%, #555 50%, #333 60%, #111 100%)"
               }}
             >
                <div className="absolute inset-x-0 inset-y-2 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
             </motion.div>
             
             {/* Right Frame Part */}
             <motion.div 
               className="absolute top-0 bottom-0 right-0 w-6 md:w-8 rounded-r-md z-20 overflow-hidden shadow-2xl border-y border-r border-white/20"
               style={{ 
                 x: frameSplitRight,
                 background: "linear-gradient(90deg, #111 0%, #333 40%, #555 50%, #333 60%, #111 100%)"
               }}
             >
                <div className="absolute inset-x-0 inset-y-2 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
             </motion.div>
             
             {/* Top Frame Part */}
             <motion.div 
               className="absolute top-0 left-6 right-6 md:left-8 md:right-8 h-6 md:h-8 shadow-xl z-25 overflow-hidden border-x border-t border-white/20"
               style={{ 
                 y: frameSplitTop,
                 background: "linear-gradient(180deg, #444 0%, #666 20%, #222 50%, #111 100%)"
               }}
             >
               <div className="w-full h-[2px] bg-white/30 absolute top-0" />
             </motion.div>
             
             {/* Bottom Frame Part */}
             <motion.div 
               className="absolute bottom-0 left-6 right-6 md:left-8 md:right-8 h-6 md:h-8 shadow-xl z-25 overflow-hidden border-x border-b border-white/20"
               style={{ 
                 y: frameSplitBottom,
                 background: "linear-gradient(0deg, #111 0%, #333 20%, #444 80%, #666 100%)"
               }}
             >
               <div className="w-full h-[1px] bg-white/20 absolute bottom-0" />
             </motion.div>
           </motion.div>

           {/* Locking Mechanism Object */}
           <motion.div 
             className="absolute top-1/2 right-[-20px] md:right-[-32px] w-12 md:w-16 h-28 md:h-36 bg-[#1a1a1a] rounded flex flex-col items-center justify-center -translate-y-1/2 border border-gray-600/50 z-30 shadow-[0_0_40px_rgba(255,255,255,0.1)] overflow-hidden"
             style={{ opacity: lockOpacity, scale: lockScale, x: frameSplitRight }}
           >
             {/* Metallic Sheen */}
             <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent" />
             <div className="w-2 md:w-3 h-12 md:h-16 bg-[#0a0a0a] rounded-sm shadow-inner mb-3 border border-t-black border-b-white/20" />
             <div className="w-5 h-5 rounded-full bg-gradient-to-br from-gray-300 to-gray-600 shadow-md border border-gray-400 flex items-center justify-center">
               <div className="w-2 h-2 rounded-full bg-black/60" />
             </div>
           </motion.div>
        </div>

        {/* Text Areas */}
        <div className="absolute bottom-[10vh] md:bottom-[15vh] w-full px-6 flex justify-center z-20">
          <motion.div style={{ opacity: text1Opacity }} className="absolute text-center">
             <h2 className="text-3xl md:text-5xl font-bold tracking-tight">The Perfect Frame</h2>
             <p className="text-gray-400 mt-3 text-lg">Scroll to explore the anatomy of protection.</p>
          </motion.div>
          <motion.div style={{ opacity: text2Opacity }} className="absolute text-center">
             <h2 className="text-3xl md:text-5xl font-bold tracking-tight">High Durability Aluminium</h2>
             <p className="text-gray-400 mt-3 text-lg">Aerospace-grade strength. Minimalist profile.</p>
          </motion.div>
          <motion.div style={{ opacity: text3Opacity }} className="absolute text-center">
             <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Ultra-fine Mesh Layer</h2>
             <p className="text-accent mt-3 text-lg font-medium">Allows natural air. Blocks microscopic pests.</p>
          </motion.div>
          <motion.div style={{ opacity: text4Opacity }} className="absolute text-center">
             <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Smooth Sliding Mechanism</h2>
             <p className="text-gray-400 mt-3 text-lg">Frictionless movement with auto-lock security.</p>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
