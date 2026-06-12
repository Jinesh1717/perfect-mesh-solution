'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import React, { useRef } from 'react';

const categories = [
  {
    title: "Mosquito Mesh",
    subtitle: "Breathable barrier",
    items: ["Window Mesh", "Door Mesh", "Sliding Mesh"],
    image: "linear-gradient(135deg, #111 0%, #050505 100%)",
  },
  {
    title: "Aluminium Fabrication",
    subtitle: "Structural elegance",
    items: ["Premium Windows", "Seamless Railings", "Modern Partitions"],
    image: "linear-gradient(225deg, #141414 0%, #080808 100%)",
  }
];

function TiltCard({ category }: { category: typeof categories[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d"
      }}
      className="relative w-[300px] md:w-[450px] h-[450px] md:h-[550px] rounded-3xl p-8 glass-panel border border-white/5 flex flex-col justify-end overflow-hidden group snap-center flex-shrink-0 cursor-pointer"
    >
      <div className="absolute inset-0 z-0" style={{ background: category.image }} />
      
      {/* Decorative gradient orb */}
      <div className="absolute -top-32 -right-32 w-80 h-80 bg-accent rounded-full blur-[120px] opacity-10 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none" />

      <div className="relative z-10" style={{ transform: "translateZ(40px)" }}>
        <p className="text-accent text-sm md:text-base font-semibold uppercase tracking-widest mb-2">{category.subtitle}</p>
        <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 md:mb-8">{category.title}</h3>
        
        <ul className="space-y-3 md:space-y-4 mb-8">
          {category.items.map((item, idx) => (
            <li key={idx} className="flex items-center text-gray-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-accent mr-4 shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
              {item}
            </li>
          ))}
        </ul>
        
        <button className="px-6 py-3 md:py-4 rounded-full bg-white/5 border border-white/10 text-white font-medium hover:bg-white hover:text-black transition-all duration-300 w-full backdrop-blur-md">
          Explore {category.title.split(' ')[0]}
        </button>
      </div>
    </motion.div>
  );
}

export default function Categories() {
  return (
    <section className="py-32 bg-background relative overflow-hidden" id="products">
      <div className="max-w-7xl mx-auto px-6 mb-16 md:text-center">
        <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">Focus Categories</h2>
        <p className="text-gray-400 mt-6 max-w-2xl text-lg md:mx-auto font-light">Masterfully crafted systems designed for seamless integration and uncompromising performance.</p>
      </div>
      
      <div className="w-full flex md:justify-center overflow-x-auto snap-x snap-mandatory px-6 md:px-0 pb-12 gap-6 md:gap-16 no-scrollbar" style={{ perspective: "1500px" }}>
        {categories.map((category, idx) => (
          <TiltCard key={idx} category={category} />
        ))}
      </div>
    </section>
  );
}
