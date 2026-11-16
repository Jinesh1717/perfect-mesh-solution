'use client';

import { useState } from 'react';
import { submitLead } from '@/app/actions';
import { Phone, Send, MapPin, Clock, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';

export default function Contact() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleAction = async (formData: FormData) => {
    setIsLoading(true);
    setErrorMessage('');
    const result = await submitLead(formData);
    setIsLoading(false);
    if (result.success) {
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 7000);
    } else {
      setErrorMessage(result.error || 'Submission failed. Please call us directly.');
    }
  };

  return (
    <section className="relative w-full bg-[#080808] border-t border-white/[0.06]" id="contact">
      {/* High-Impact Architectural Consultation Banner */}
      <div className="py-20 md:py-28 bg-gradient-to-b from-[#0f1114] to-[#080808] border-b border-white/[0.08] px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono uppercase tracking-[0.2em] text-zinc-400 mb-6">
            <ShieldCheck size={13} className="text-emerald-400" />
            <span>Direct Client Consultation</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.08] mb-6">
            Protect Your Living Space.
            <br />
            <span className="text-zinc-500 font-light">Schedule Free In-Home Laser Measurement.</span>
          </h2>

          <p className="text-zinc-400 max-w-xl mx-auto text-sm sm:text-base font-light mb-10 leading-relaxed">
            Our fabrication engineers visit your residence with actual aluminium profile samples, mesh swatches, and laser measurement instruments.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center max-w-md mx-auto">
            <a
              href="tel:917012715025"
              className="px-8 py-4 rounded-full bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-zinc-200 transition-all hover:scale-[1.02] shadow-2xl flex items-center justify-center gap-2"
            >
              <Phone size={14} />
              <span>Call +91 70127 15025</span>
            </a>
            <a
              href="#booking-form"
              className="px-8 py-4 rounded-full bg-white/[0.05] border border-white/15 text-white font-semibold text-xs uppercase tracking-wider hover:bg-white/10 transition-all backdrop-blur-md flex items-center justify-center"
            >
              Request Callback Online
            </a>
          </div>
        </div>
      </div>

      {/* Booking Form & Contact Details Grid */}
      <div id="booking-form" className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Form Card */}
          <div className="lg:col-span-7 bg-[#0e1013] border border-white/[0.08] rounded-3xl p-8 sm:p-12 shadow-2xl">
            <h3 className="text-2xl font-bold text-white tracking-tight mb-2">
              Book Your Free Laser Survey
            </h3>
            <p className="text-zinc-400 text-sm font-light mb-8">
              Leave your details below. Our technical supervisor will reach out within 2 hours to confirm your convenient appointment time.
            </p>

            {isSuccess && (
              <div className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs sm:text-sm flex items-center gap-3">
                <CheckCircle2 size={18} className="shrink-0 text-emerald-400" />
                <span>
                  Thank you! Your measurement request has been received. Our engineer will contact you shortly.
                </span>
              </div>
            )}

            {errorMessage && (
              <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-300 text-xs sm:text-sm flex items-center gap-3">
                <AlertCircle size={18} className="shrink-0 text-red-400" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form action={handleAction} className="space-y-6">
              {/* Spam Honeypot Field (invisible to genuine users) */}
              <div className="hidden" aria-hidden="true">
                <input type="text" name="botTrap" tabIndex={-1} autoComplete="off" />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Vikram Seth"
                  className="w-full px-5 py-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder:text-zinc-600 text-sm focus:outline-none focus:border-white focus:bg-white/[0.06] transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="+91 98765 43210"
                    className="w-full px-5 py-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder:text-zinc-600 text-sm focus:outline-none focus:border-white focus:bg-white/[0.06] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">
                    Locality / Area
                  </label>
                  <input
                    type="text"
                    name="location"
                    placeholder="e.g. Indiranagar, Whitefield"
                    className="w-full px-5 py-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder:text-zinc-600 text-sm focus:outline-none focus:border-white focus:bg-white/[0.06] transition-all"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 rounded-full bg-white text-black font-semibold text-xs sm:text-sm uppercase tracking-wider hover:bg-zinc-200 transition-all duration-300 hover:scale-[1.01] shadow-2xl flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Send size={15} />
                  <span>{isLoading ? 'Submitting Request...' : 'Confirm Free Measurement Booking'}</span>
                </button>
              </div>

              <p className="text-[11px] text-zinc-500 text-center font-light">
                Zero commitment. We measure, show frame swatches, and quote exact prices on-site.
              </p>
            </form>
          </div>

          {/* Right Column: Direct Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-[#0e1013] border border-white/[0.08]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
                  <Phone size={18} />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm">Direct Phone Consultation</h4>
                  <p className="text-xs text-zinc-400 font-light">Instant quotes & emergency site visits</p>
                </div>
              </div>
              <a
                href="tel:917012715025"
                className="text-xl sm:text-2xl font-bold text-white hover:text-zinc-300 font-mono tracking-tight block transition-colors"
              >
                +91 70127 15025
              </a>
              <p className="text-xs text-zinc-500 font-mono mt-2">Available Mon – Sun: 8:00 AM – 9:00 PM</p>
            </div>

            <div className="p-8 rounded-3xl bg-[#0e1013] border border-white/[0.08]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
                  <MapPin size={18} />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm">Workshop & Service Territory</h4>
                  <p className="text-xs text-zinc-400 font-light">Direct in-house manufacturing</p>
                </div>
              </div>
              <p className="text-sm text-zinc-300 font-light leading-relaxed">
                Indiranagar 100ft Road, Bengaluru, Karnataka 560038
              </p>
              <div className="mt-4 pt-4 border-t border-white/[0.06] flex items-center gap-2 text-xs text-zinc-400 font-mono">
                <Clock size={13} />
                <span>Next-day site visits across Greater Bengaluru</span>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-[#0e1013] border border-white/[0.08]">
              <h4 className="text-white font-semibold text-sm mb-3">Our Quality Guarantee</h4>
              <ul className="space-y-2 text-xs text-zinc-400 font-light">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                  <span>10-Year structural warranty on aluminium extrusions</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                  <span>316 marine-grade stainless mesh with zero rust guarantee</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                  <span>100% dust-free professional HEPA-vacuumed installation</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
