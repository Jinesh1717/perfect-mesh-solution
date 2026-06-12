'use client';

import { useState, useEffect } from 'react';
import { motion, animate } from 'framer-motion';

const PRICING: Record<string, number> = {
  'window-fixed': 150,
  'window-sliding': 250,
  'door-mesh': 350,
  'balcony-partition': 600
};

export default function Calculator() {
  const [width, setWidth] = useState<number>(100);
  const [height, setHeight] = useState<number>(100);
  const [quantity, setQuantity] = useState<number>(1);
  const [type, setType] = useState<string>('window-fixed');
  const [estimatedPrice, setEstimatedPrice] = useState<number>(0);
  const [displayPrice, setDisplayPrice] = useState<number>(0);

  useEffect(() => {
    // Basic calculation: (width * height in sq feet / 1000) * base price + handling
    // We treat inputs as CM, so 100cm * 100cm = 1 sq meter (approx 10 sq ft)
    const areaSqM = (width * height) / 10000;
    const basePrice = PRICING[type] || 150;
    const rawPrice = areaSqM * basePrice * quantity;
    const finalPrice = Math.max(basePrice, Math.round(rawPrice));
    
    setEstimatedPrice(finalPrice);
  }, [width, height, quantity, type]);

  // Animate the number smoothly
  useEffect(() => {
    const controls = animate(displayPrice, estimatedPrice, {
      duration: 0.5,
      onUpdate: (value) => setDisplayPrice(Math.round(value))
    });
    return controls.stop;
  }, [estimatedPrice]);

  return (
    <section className="py-32 relative flex items-center justify-center bg-gradient-to-b from-background to-[#0a0a0a]" id="calculator">
      {/* Background grids */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0wIDM5LjVoNDBNMzkuNSAwVjQwIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiIHN0cm9rZS13aWR0aD0iMSIvPjwvc3ZnPg==')] z-0 mask-image:linear-gradient(to_bottom,transparent,black,transparent)" />
      
      <div className="relative z-10 w-full max-w-4xl px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">Cost Estimator</h2>
          <p className="text-gray-400 text-lg">Instant pricing estimates for your exact requirements.</p>
        </div>

        <div className="glass-panel rounded-3xl p-8 md:p-12 flex flex-col md:flex-row gap-12 items-center">
          
          {/* Inputs */}
          <div className="w-full md:w-1/2 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Product Type</label>
              <select 
                title="Select product type"
                className="w-full bg-black/50 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-accent transition-colors appearance-none"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="window-fixed">Fixed Window Mesh</option>
                <option value="window-sliding">Sliding Window Mesh</option>
                <option value="door-mesh">Main Door Mesh</option>
                <option value="balcony-partition">Balcony Partition</option>
              </select>
            </div>
            
            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-400 mb-2">Width (cm)</label>
                <input 
                  type="number"
                  title="Width in cm"
                  className="w-full bg-black/50 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-accent transition-colors"
                  value={width}
                  onChange={(e) => setWidth(Number(e.target.value))}
                  min={10}
                />
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-400 mb-2">Height (cm)</label>
                <input 
                  type="number" 
                  title="Height in cm"
                  className="w-full bg-black/50 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-accent transition-colors"
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  min={10}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Quantity</label>
              <div className="flex items-center gap-4 bg-black/50 border border-white/10 rounded-lg p-1 w-max">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center text-white hover:bg-white/10 rounded-md transition-colors"
                >-</button>
                <span className="w-12 text-center font-semibold text-white">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center text-white hover:bg-white/10 rounded-md transition-colors"
                >+</button>
              </div>
            </div>
          </div>

          {/* Output */}
          <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 bg-gradient-to-br from-white/5 to-transparent rounded-2xl border border-white/5 relative overflow-hidden">
            <div className="absolute inset-0 bg-accent/5 blur-[100px] rounded-full" />
            
            <p className="text-gray-400 font-medium tracking-wide uppercase text-sm mb-4">Estimated Total</p>
            <div className="flex items-start">
              <span className="text-3xl text-gray-500 mt-2 mr-2">$</span>
              <motion.span 
                className="text-7xl font-bold tracking-tighter text-white"
                key="price"
              >
                {displayPrice}
              </motion.span>
            </div>
            <p className="text-xs text-gray-500 mt-4 text-center max-w-[200px]">Excludes installation and custom structural modifications.</p>
            
            <button className="mt-8 px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors w-full z-10 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
              Book Official Measurement
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
