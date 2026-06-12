'use client';

import { useState } from 'react';
import { submitLead } from '@/app/actions';

export default function Contact() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleAction = async (formData: FormData) => {
    setIsLoading(true);
    const result = await submitLead(formData);
    setIsLoading(false);
    if (result.success) {
      setIsSuccess(true);
      // Optional: reset after 3 seconds
      setTimeout(() => setIsSuccess(false), 3000);
    } else {
      alert(result.error);
    }
  };
  return (
    <section className="relative w-full bg-background" id="contact">
      {/* Final CTA Strip */}
      <div className="py-24 md:py-32 bg-accent text-black flex flex-col items-center justify-center text-center px-6">
         <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8">Protect Your Home Today</h2>
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center max-w-xl">
            <a href="tel:917012715025" suppressHydrationWarning className="px-8 py-4 rounded-full bg-black text-white font-bold text-lg hover:bg-gray-800 transition-colors shadow-2xl w-full text-center">
              Call Now
            </a>
            <a href="https://wa.me/917012715025" target="_blank" rel="noreferrer" suppressHydrationWarning className="px-8 py-4 rounded-full bg-[#25D366] text-white font-bold text-lg hover:bg-[#20bd5a] transition-colors shadow-2xl w-full flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              WhatsApp
            </a>
         </div>
      </div>

      {/* Map & Form Area */}
      <div className="py-24 border-t border-white/5">
         <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            
            <div className="space-y-8 glass-panel p-8 md:p-12 rounded-3xl">
               <div>
                 <h3 className="text-3xl font-bold text-white mb-2">Get In Touch</h3>
                 <p className="text-gray-400">Our experts are ready to assist you with free measurement.</p>
               </div>
               
               <form className="space-y-5" action={handleAction}>
                  <div>
                    <input type="text" name="name" required placeholder="Full Name" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-accent transition-colors disabled:opacity-50" disabled={isLoading} />
                  </div>
                  <div>
                    <input type="tel" name="phone" required placeholder="Phone Number" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-accent transition-colors disabled:opacity-50" disabled={isLoading} />
                  </div>
                  <div>
                    <input type="text" name="location" placeholder="Location / Address" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-accent transition-colors disabled:opacity-50" disabled={isLoading} />
                  </div>
                  
                  {isSuccess ? (
                    <div className="w-full bg-green-500/20 text-green-400 font-semibold rounded-xl p-4 text-center border border-green-500/30">
                      Request Confirmed! We will contact you shortly.
                    </div>
                  ) : (
                    <button type="submit" disabled={isLoading} className="w-full bg-white text-black font-semibold rounded-xl p-4 hover:bg-gray-200 transition-colors mt-4 disabled:opacity-50 flex items-center justify-center gap-2">
                      {isLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"/>
                          Sending...
                        </>
                      ) : (
                        'Submit Request'
                      )}
                    </button>
                  )}
               </form>
            </div>
            
            <div className="h-full min-h-[400px] w-full rounded-3xl overflow-hidden glass border border-white/10 relative">
               {/* Map View Iframe */}
               <iframe 
                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.001696423075!2d77.594562714822!3d12.971598790855219!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1713591965251!5m2!1sen!2sin" 
                 width="100%" 
                 height="100%" 
                 style={{ border: 0, minHeight: '400px', filter: 'grayscale(100%) invert(90%) contrast(80%)' }} 
                 allowFullScreen 
                 loading="lazy" 
                 referrerPolicy="no-referrer-when-downgrade"
                 className="absolute inset-0"
               />
               <div className="absolute top-4 left-4 bg-black/80 backdrop-blur border border-white/10 rounded-lg p-3 pointer-events-none">
                 <p className="text-white font-medium text-sm">Perfect Mesh HQ</p>
                 <p className="text-gray-400 text-xs">Bengaluru, KA, India</p>
               </div>
            </div>
            
         </div>
      </div>
      
      <footer className="py-8 text-center text-gray-600 text-sm border-t border-white/5">
         &copy; {new Date().getFullYear()} Perfect Mesh Solutions. All rights reserved.
      </footer>
    </section>
  );
}
