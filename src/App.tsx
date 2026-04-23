/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Clock,
  CheckCircle2,
  AlertCircle,
  Loader2
} from 'lucide-react';

const ComingSoon = () => {
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;

    setStatus('loading');
    setErrorMessage('');

    try {
      const cleanPhone = phone.trim();
      if (cleanPhone.length < 10) {
        throw new Error('Enter a valid 10-digit phone number');
      }

      console.log("Sending to server proxy...");
      // 1. Save via Server API
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone: cleanPhone }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Server error occurred');
      }

      console.log("Server save successful.");

      // 2. Success state
      setStatus('success');
      setPhone('');

      // 3. Fallback WhatsApp logic - Use window.top to avoid iframe restrictions
      const message = `New person has joined the waitlist - ${phone}`;
      const waUrl = `https://api.whatsapp.com/send?phone=919980489494&text=${encodeURIComponent(message)}`;
      
      setTimeout(() => {
        try {
          if (window.top) {
            window.top.location.href = waUrl;
          } else {
            window.location.href = waUrl;
          }
        } catch (e) {
          window.location.href = waUrl;
        }
      }, 1500);
    } catch (err: any) {
      console.error("Waitlist Error:", err);
      setStatus('error');
      
      let message = 'Error occurred';
      if (err instanceof Error) {
        message = err.message;
      }
      
      // Better hint for AdBlocker issues
      if (err.message?.includes('offline') || err.message?.includes('failed to fetch') || err.code === 'unavailable') {
        message = "Connection blocked. Please disable AdBlocker.";
      } else if (err.code === 'permission-denied') {
        message = "Permission Denied. Check Firebase DB setup.";
      }
      
      setErrorMessage(message);
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <div className="h-screen w-full bg-slate-950 text-white font-sans flex flex-col relative overflow-hidden">
      {/* Social Sidebar - Left (Instagram) */}
      <div className="fixed left-0 top-1/2 -translate-y-1/2 z-50 px-4 py-6 bg-white/5 backdrop-blur-xl border-r border-y border-white/10 rounded-r-3xl hidden md:flex flex-col gap-6 items-center shadow-2xl">
        <motion.a 
          href="https://www.instagram.com/adventure_chaarana?igsh=MWFjc3k3YjRncHJlNQ==" 
          target="_blank" 
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1, x: 5 }}
          whileTap={{ scale: 0.9 }}
          className="group"
        >
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg" 
            alt="Instagram"
            className="w-8 h-8 drop-shadow-lg"
          />
        </motion.a>
      </div>

      {/* Social Sidebar - Right (WhatsApp) */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 px-4 py-6 bg-white/5 backdrop-blur-xl border-l border-y border-white/10 rounded-l-3xl hidden md:flex flex-col gap-6 items-center shadow-2xl">
        <motion.a 
          href="https://wa.me/919980489494" 
          target="_blank" 
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1, x: -5 }}
          whileTap={{ scale: 0.9 }}
          className="group"
        >
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
            alt="WhatsApp"
            className="w-8 h-8 drop-shadow-lg"
          />
        </motion.a>
      </div>

      {/* Mobile Social Bar */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex gap-6 bg-white/10 backdrop-blur-2xl px-8 py-4 rounded-full border border-white/20 shadow-2xl">
        <a href="https://www.instagram.com/adventure_chaarana?igsh=MWFjc3k3YjRncHJlNQ==" target="_blank" rel="noopener noreferrer">
          <img src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg" className="w-6 h-6" alt="Instagram" />
        </a>
        <a href="https://wa.me/919980489494" target="_blank" rel="noopener noreferrer">
          <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" className="w-6 h-6" alt="WhatsApp" />
        </a>
      </div>

      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-40 scale-105"
        >
          <source 
            src="https://res.cloudinary.com/dofg6bsom/video/upload/v1776959643/12259582_3840_2160_25fps_1_u8jgu6.mp4" 
            type="video/mp4" 
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/60 via-slate-950/40 to-slate-950 z-10" />
      </div>

      {/* Header */}
      <header className="relative z-20 p-6 md:p-8 flex justify-start max-w-7xl mx-auto w-full shrink-0">
        <div className="flex items-center">
           <img 
            src="https://res.cloudinary.com/dofg6bsom/image/upload/v1776960283/ChatGPT_Image_Apr_23__2026__01_31_02_PM-removebg-preview_xtxycg.png" 
            alt="Adventure Charana" 
            className="h-16 md:h-20 w-auto object-contain drop-shadow-2xl"
            referrerPolicy="no-referrer"
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-20 flex-1 flex flex-col items-center justify-center px-4 text-center max-w-7xl mx-auto w-full">
        <div className="max-w-4xl mx-auto -mt-12 md:-mt-16 text-center">
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 text-brand-accent font-bold tracking-[0.3em] text-[8px] md:text-[10px] uppercase mb-6 md:mb-10 bg-white/10 px-4 py-1.5 rounded-full border border-white/20 backdrop-blur-md">
              <Clock size={10} className="animate-pulse" />
              Western Ghats. Raw. Real. Unfiltered.
            </div>
            
            <h1 className="text-4xl md:text-7xl font-black leading-tight tracking-tighter mb-4 italic uppercase text-white">
              Adventure <span className="text-brand-accent">ಚಾರಣ</span>
            </h1>

            <h2 className="text-lg md:text-2xl font-bold text-slate-200 mb-8 md:mb-10 tracking-tight">
              Explore Beyond Roads.
            </h2>
            
            <p className="text-sm md:text-lg text-slate-300 mb-10 md:mb-14 max-w-xl mx-auto leading-relaxed font-medium">
              A trekking & travel community exploring the wild heart of the Western Ghats. <br className="hidden md:block" />
              <span className="text-brand-accent font-bold">Curated treks. Real people. Zero fluff.</span>
            </p>

            <div className="relative w-full max-w-md mx-auto">
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    className="flex flex-col items-center gap-3 p-6 bg-emerald-500/10 backdrop-blur-xl border border-emerald-500/20 rounded-2xl"
                  >
                    <CheckCircle2 className="text-emerald-500 w-10 h-10" />
                    <div>
                      <p className="text-brand-accent font-bold text-sm tracking-widest uppercase mb-1">Success</p>
                      <p className="text-slate-300 text-xs text-center leading-relaxed">
                        Saved to our list!<br/>Redirecting to WhatsApp for confirmation...
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form 
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col md:flex-row gap-3 w-full"
                  >
                    <div className="flex-1 relative group">
                       <input 
                        type="tel" 
                        placeholder="Your Phone Number"
                        required
                        value={phone}
                        disabled={status === 'loading'}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3 md:px-6 md:py-4 text-xs md:text-sm focus:outline-none focus:border-brand-accent focus:bg-white/10 transition-all font-medium placeholder:text-slate-500 text-white disabled:opacity-50"
                      />
                      {status === 'error' && (
                        <div className="absolute -bottom-6 left-0 flex items-center gap-1 text-[10px] text-red-400 font-bold uppercase tracking-wider">
                          <AlertCircle size={10} />
                          {errorMessage}
                        </div>
                      )}
                    </div>
                    
                    <button 
                      type="submit"
                      disabled={status === 'loading'}
                      className="bg-brand-accent text-white px-6 py-3 md:px-8 md:py-4 rounded-xl font-bold text-[9px] md:text-[10px] tracking-[0.2em] uppercase hover:bg-orange-600 active:scale-95 transition-all shadow-xl shadow-orange-600/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[140px]"
                    >
                      {status === 'loading' ? (
                        <>
                          <Loader2 size={14} className="animate-spin" />
                          Processing
                        </>
                      ) : (
                        'Join Waitlist'
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-20 p-8 md:p-10 flex flex-col items-center gap-4 mt-auto w-full shrink-0">
        <div className="flex flex-col md:flex-row items-center gap-4 text-[7px] md:text-[9px] text-slate-500 font-bold tracking-[0.4em] uppercase text-center">
            <span>&copy; 2024 Adventure Charana</span>
            <span className="flex items-center gap-2">
                <div className="w-1 h-1 bg-brand-accent rounded-full animate-pulse shadow-[0_0_8px_rgba(249,115,22,0.5)]"></div>
                Community Launch Imminent
            </span>
            <span className="hidden md:inline px-2 opacity-30">|</span>
            <span>Est. 1996</span>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <main>
      <ComingSoon />
    </main>
  );
}
