'use client';

import { motion } from 'framer-motion';
import { Ruler, Cog, ShieldCheck, Home } from 'lucide-react';

const STEPS = [
  {
    step: '01',
    icon: Ruler,
    title: 'Laser Measurement',
    subtitle: '±0.5mm Site Survey',
    description:
      'Our engineers visit with digital laser measurement equipment, surveying every window reveal, sill depth, and architectural angle to ensure a bespoke zero-gap fit.',
  },
  {
    step: '02',
    icon: Cog,
    title: 'In-House Fabrication',
    subtitle: 'Automotive Precision CNC',
    description:
      'Aluminium extrusions are mitered and assembled in our specialized workshop. Joints are reinforced with concealed corner brackets and AkzoNobel powder coating.',
  },
  {
    step: '03',
    icon: ShieldCheck,
    title: 'Tension & Seal Quality',
    subtitle: 'Drum-Tight Mesh Calibration',
    description:
      'Stainless steel wire cloth is pneumatically tensioned into the sash frame to eliminate sagging, accompanied by dual EPDM compression weatherseals.',
  },
  {
    step: '04',
    icon: Home,
    title: 'Clean Installation',
    subtitle: 'Zero Dust Handover in 1-2 Days',
    description:
      'Certified technicians install your custom systems with drop cloths and HEPA vacuuming. Silent glide and locks are calibrated before client sign-off.',
  },
];

export default function InstallationProcess() {
  return (
    <section className="py-28 md:py-36 bg-[#080808] relative overflow-hidden border-t border-white/[0.06] w-full">
      {/* Background illumination constrained to max width */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] max-w-full h-[300px] bg-white/[0.02] blur-[140px] pointer-events-none overflow-hidden" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono uppercase tracking-[0.2em] text-zinc-400 mb-4">
            <span>The Fabrication Journey</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.08]">
            From Laser Survey
            <br />
            <span className="text-zinc-500 font-light">To Seamless Handover.</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-4 max-w-xl mx-auto font-light">
            Every screen and frame follows a stringent 4-stage quality protocol manufactured in our Bengaluru facility.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-8 rounded-3xl bg-[#0e1013] border border-white/[0.08] hover:border-white/20 transition-all duration-300 flex flex-col justify-between group shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-xs font-mono font-bold tracking-widest text-zinc-500 group-hover:text-zinc-300 transition-colors">
                      {step.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300 group-hover:scale-110 group-hover:text-white transition-all">
                      <Icon size={18} />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white tracking-tight mb-1">
                    {step.title}
                  </h3>
                  <p className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-4">
                    {step.subtitle}
                  </p>
                  <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-light">
                    {step.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/[0.04] flex items-center gap-2 text-[11px] font-mono text-zinc-500">
                  <ShieldCheck size={12} className="text-emerald-400" />
                  <span>Quality Sign-off Checked</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
