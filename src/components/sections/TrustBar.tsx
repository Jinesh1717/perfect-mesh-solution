'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Ruler, Award, Clock } from 'lucide-react';

const STATS = [
  {
    icon: ShieldCheck,
    value: '10,000+',
    label: 'Custom Installations',
    detail: 'Bengaluru & South India',
  },
  {
    icon: Ruler,
    value: '±0.5mm',
    label: 'Laser Site Precision',
    detail: 'Zero-Gap Tolerance',
  },
  {
    icon: Award,
    value: '10 Years',
    label: 'Structural Warranty',
    detail: '6063-T6 Extrusions',
  },
  {
    icon: Clock,
    value: '24-48h',
    label: 'Site Measurement Handover',
    detail: 'Direct Engineer Consultation',
  },
];

export default function TrustBar() {
  return (
    <section className="relative w-full border-y border-white/[0.08] bg-[#0c0d10] py-10 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {STATS.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-white/15 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-zinc-300 group-hover:scale-105 group-hover:text-white transition-all shrink-0">
                  <Icon size={22} />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-white tracking-tight font-mono">
                    {stat.value}
                  </div>
                  <div className="text-xs font-semibold text-zinc-300 tracking-wide mt-0.5">
                    {stat.label}
                  </div>
                  <div className="text-[11px] text-zinc-500 font-light">
                    {stat.detail}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
