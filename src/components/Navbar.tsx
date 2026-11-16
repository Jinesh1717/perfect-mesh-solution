'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, ArrowUpRight } from 'lucide-react';

const NAV_LINKS = [
  { href: '#story', label: 'The Story' },
  { href: '#craftsmanship', label: 'Craftsmanship' },
  { href: '#products', label: 'Systems' },
  { href: '#showcase', label: 'Showcase' },
  { href: '#calculator', label: 'Pricing' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#070809]/85 backdrop-blur-md border-b border-white/[0.08] py-4 shadow-2xl'
            : 'bg-transparent py-6 border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 text-white font-semibold tracking-tight group"
          >
            <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-white/20 flex items-center justify-center relative overflow-hidden group-hover:border-white/40 transition-colors">
              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:4px_4px]" />
              <div className="w-2.5 h-2.5 rounded-sm bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)] relative z-10" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-widest uppercase text-white font-mono">
                PERFECT MESH
              </span>
              <span className="text-[10px] tracking-wider uppercase text-zinc-400 font-sans -mt-0.5">
                Architectural Systems
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8 text-xs font-medium tracking-wider uppercase text-zinc-400">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-white transition-colors duration-200 relative py-1"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-4">
            <a
              href="tel:917012715025"
              className="text-xs font-medium text-zinc-300 hover:text-white flex items-center gap-2 py-2 px-3 rounded-full hover:bg-white/5 transition-all"
            >
              <Phone size={13} className="text-zinc-400" />
              <span>+91 70127 15025</span>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider bg-white text-black hover:bg-zinc-200 transition-all hover:scale-[1.02] shadow-[0_0_20px_rgba(255,255,255,0.15)]"
            >
              <span>Free Measurement</span>
              <ArrowUpRight size={13} />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-zinc-300 hover:text-white rounded-lg bg-white/5 border border-white/10 cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-20 z-40 bg-[#0c0d10]/95 backdrop-blur-xl border-b border-white/10 p-6 lg:hidden"
          >
            <div className="flex flex-col gap-4 text-sm font-medium uppercase tracking-wider text-zinc-300">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 border-b border-white/5 hover:text-white"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-4 flex flex-col gap-3">
                <a
                  href="tel:917012715025"
                  className="w-full py-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center gap-2 text-white text-xs font-semibold"
                >
                  <Phone size={14} />
                  <span>Call Direct (+91 70127 15025)</span>
                </a>
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3 rounded-xl bg-white text-black text-center text-xs font-bold uppercase tracking-wider"
                >
                  Book Free Measurement
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
