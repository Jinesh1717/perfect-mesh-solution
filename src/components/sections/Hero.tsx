'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Link from 'next/link';

// Dynamically import the 3D scene to avoid SSR issues
const HeroScene = dynamic(() => import('../3d/HeroScene'), { ssr: false });

export default function Hero() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-background">
      {/* 3D Background */}
      <HeroScene />
      
      {/* Cinematic Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background z-0 pointer-events-none" />

      {/* Overlay Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col items-center justify-center text-center mt-20 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white mb-6 drop-shadow-2xl">
            Invisible Protection.<br />
            <span className="text-accent bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-gray-500">
              Maximum Comfort.
            </span>
          </h1>
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-lg md:text-xl text-gray-400 max-w-2xl mb-10 drop-shadow-md font-light"
        >
          Premium mosquito mesh and aluminium solutions for modern homes. Engineered for durability, designed for elegance.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center gap-4 pointer-events-auto"
        >
          <Link 
            href="#products" 
            className="px-8 py-4 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-all hover:scale-105"
          >
            Explore Products
          </Link>
          <Link 
            href="#calculator" 
            className="px-8 py-4 rounded-full glass font-semibold hover:bg-white/10 transition-all border border-white/20 hover:scale-105"
          >
            Get Free Measurement
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator down */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center text-gray-500 text-sm gap-2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        Scroll to discover
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg>
      </motion.div>
    </section>
  );
}
