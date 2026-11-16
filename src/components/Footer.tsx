import Link from 'next/link';
import { Phone, Mail, MapPin, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-[#050607] border-t border-white/[0.08] text-zinc-400 text-sm py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-14">
        {/* Brand Column */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 text-white font-semibold tracking-tight mb-4">
            <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-white/20 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:4px_4px]" />
              <div className="w-2.5 h-2.5 rounded-sm bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)] relative z-10" />
            </div>
            <div>
              <span className="text-sm font-bold tracking-widest uppercase text-white font-mono block">
                PERFECT MESH
              </span>
              <span className="text-[10px] tracking-wider uppercase text-zinc-500 font-sans block -mt-0.5">
                Architectural Systems & Aluminium Fabrication
              </span>
            </div>
          </div>
          <p className="text-zinc-400 text-xs sm:text-sm max-w-md font-light leading-relaxed mb-6">
            Pioneering premium insect exclusion and precision architectural aluminium solutions. Engineered with 6063-T6 aerospace alloys and 316 marine-grade stainless micro-mesh for modern residences.
          </p>
          <div className="flex items-center gap-3 text-xs text-zinc-400">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Serving Bengaluru, Mysuru & Southern India</span>
          </div>
        </div>

        {/* Quick Navigation */}
        <div>
          <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-white font-semibold mb-4">
            Architectural Systems
          </h4>
          <ul className="space-y-2.5 text-xs text-zinc-400">
            <li><a href="#products" className="hover:text-white transition-colors">Sliding Mosquito Mesh Doors</a></li>
            <li><a href="#products" className="hover:text-white transition-colors">Pleated Accordion Retractables</a></li>
            <li><a href="#products" className="hover:text-white transition-colors">Magnetic & Casement Screens</a></li>
            <li><a href="#products" className="hover:text-white transition-colors">Balcony Aluminium Partitions</a></li>
            <li><a href="#calculator" className="hover:text-white transition-colors">Instant Cost Estimator</a></li>
          </ul>
        </div>

        {/* Direct Contact */}
        <div>
          <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-white font-semibold mb-4">
            Workshop & Office
          </h4>
          <ul className="space-y-3 text-xs text-zinc-400">
            <li className="flex items-start gap-2.5">
              <MapPin size={15} className="text-zinc-400 shrink-0 mt-0.5" />
              <span>Indiranagar 100ft Road, Bengaluru, Karnataka 560038</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone size={15} className="text-zinc-400 shrink-0" />
              <a href="tel:917012715025" className="hover:text-white transition-colors">+91 70127 15025</a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail size={15} className="text-zinc-400 shrink-0" />
              <a href="mailto:contact@perfectmesh.in" className="hover:text-white transition-colors">contact@perfectmesh.in</a>
            </li>
          </ul>
          <div className="mt-5">
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-white px-4 py-2 rounded-full bg-white/10 border border-white/15 hover:bg-white/20 transition-all"
            >
              <span>Schedule Free Laser Visit</span>
              <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-600 gap-4">
        <div>
          © {new Date().getFullYear()} Perfect Mesh Solutions. All rights reserved.
        </div>
        <div className="flex items-center gap-6">
          <Link href="/admin" className="hover:text-zinc-400 transition-colors">
            Staff Portal
          </Link>
          <span>•</span>
          <span>Aerospace 6063-T6 Standard</span>
          <span>•</span>
          <span>ISO 9001 Certified Quality</span>
        </div>
      </div>
    </footer>
  );
}
