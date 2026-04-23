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
      const message = `Welcome to Adventure Chaarana - New entry: ${phone}`;
      const waUrl = `https://api.whatsapp.com/send?phone=919980489494&text=${encodeURIComponent(message)}`;
      
      setTimeout(() => {
        try {
          if (window.top) {
            window.top.location.href = waUrl;
          } else {
            window.location.href = waUrl;
          }
        } catch {
          window.location.href = waUrl;
        }
      }, 1500);
    } catch (err: unknown) {
      console.error("Waitlist Error:", err);
      setStatus('error');
      
      let message = 'Error occurred';
      if (err instanceof Error) {
        message = err.message;
      }
      const errorMsg = String(err);
      
      // Better hint for AdBlocker issues
      if (message.includes('offline') || message.includes('failed to fetch') || errorMsg.includes('unavailable')) {
        message = "Connection blocked. Please disable AdBlocker.";
      }
      
      setErrorMessage(message);
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 text-slate-900 font-sans flex flex-col relative overflow-x-hidden scroll-smooth">
      {/* Social Sidebar - Right (Instagram & WhatsApp) */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 px-3 py-5 bg-white/80 backdrop-blur-xl border-l border-y border-slate-200 rounded-l-3xl hidden md:flex flex-col gap-6 items-center shadow-xl">
        <motion.a 
          href="https://www.instagram.com/adventure_chaarana?igsh=MWFjc3k3YjRncHJlNQ==" 
          target="_blank" 
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1, x: -5 }}
          whileTap={{ scale: 0.9 }}
          className="group"
        >
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg" 
            alt="Instagram"
            className="w-9 h-9 md:w-10 md:h-10 drop-shadow-lg"
          />
        </motion.a>
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
            className="w-9 h-9 md:w-10 md:h-10 drop-shadow-lg"
          />
        </motion.a>
      </div>

      {/* Mobile Social Bar */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex gap-8 bg-white/90 backdrop-blur-xl px-10 py-5 rounded-full border border-slate-200 shadow-2xl">
        <motion.a 
          href="https://www.instagram.com/adventure_chaarana?igsh=MWFjc3k3YjRncHJlNQ==" 
          target="_blank" 
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <img src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg" className="w-8 h-8" alt="Instagram" />
        </motion.a>
        <motion.a 
          href="https://wa.me/919980489494" 
          target="_blank" 
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" className="w-8 h-8" alt="WhatsApp" />
        </motion.a>
      </div>

      {/* Background Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.video
          autoPlay
          loop
          muted
          playsInline
          animate={{ scale: [1.02, 1.05, 1.02] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="w-full h-full object-cover opacity-40"
        >
          <source 
            src="https://res.cloudinary.com/dofg6bsom/video/upload/v1776959643/12259582_3840_2160_25fps_1_u8jgu6.mp4" 
            type="video/mp4" 
          />
        </motion.video>
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/40 to-slate-50/90 z-10" />
      </div>

      {/* Header */}
      <header className="relative z-20 p-6 md:p-10 flex justify-center max-w-7xl mx-auto w-full shrink-0">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ 
            opacity: 1, 
            y: [0, -10, 0],
          }}
          transition={{
            opacity: { duration: 0.8 },
            y: { 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }
          }}
          className="flex items-center cursor-pointer"
          whileHover={{ rotate: [0, -1, 1, -1, 0], scale: 1.05 }}
        >
           <img 
            src="https://res.cloudinary.com/dofg6bsom/image/upload/v1776960283/ChatGPT_Image_Apr_23__2026__01_31_02_PM-removebg-preview_xtxycg.png" 
            alt="Adventure Charana" 
            className="h-24 md:h-36 w-auto object-contain drop-shadow-xl"
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </header>

      {/* Main Content */}
      <main className="relative z-20 flex-1 flex flex-col items-center justify-start pt-0 px-4 text-center max-w-7xl mx-auto w-full pb-12">
        <div className="max-w-4xl mx-auto text-center -mt-2">
          <motion.div
             initial="hidden"
             animate="visible"
             variants={{
               hidden: { opacity: 0 },
               visible: {
                 opacity: 1,
                 transition: {
                   staggerChildren: 0.15
                 }
               }
             }}
          >
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 }
              }}
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                y: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
              className="inline-flex flex-col items-center gap-3 mb-6 md:mb-8"
            >
              <div className="inline-flex items-center gap-2 text-white font-black tracking-[0.3em] text-[10px] md:text-[12px] uppercase bg-brand-accent px-5 py-2 rounded-full shadow-lg shadow-brand-accent/20">
                <Clock size={12} className="animate-pulse" />
                Coming Soon
              </div>
            </motion.div>
            
            <motion.h1 
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1 }
                }
              }}
              className="text-4xl md:text-7xl font-black leading-tight tracking-tighter mb-4 italic uppercase text-slate-900 py-2"
            >
              <motion.span 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="block text-lg md:text-xl font-medium tracking-[0.2em] not-italic text-slate-500 mb-1"
              >
                Welcome to
              </motion.span>
              <div className="flex flex-wrap justify-center gap-x-4">
                {["Adventure", "ಚಾರಣ"].map((word, i) => (
                  <motion.span
                    key={i}
                    variants={{
                      hidden: { opacity: 0, y: 50, rotateX: -90 },
                      visible: { 
                        opacity: 1, 
                        y: 0, 
                        rotateX: 0,
                        transition: { type: "spring", damping: 12, stiffness: 100 }
                      }
                    }}
                    className={word === "ಚಾರಣ" ? "text-brand-accent drop-shadow-[0_0_15px_rgba(249,115,22,0.3)] cursor-default" : "cursor-default"}
                  >
                    {word}
                  </motion.span>
                ))}
              </div>
            </motion.h1>

            <motion.p
              variants={{
                hidden: { opacity: 0, letterSpacing: "0.2em" },
                visible: { 
                  opacity: 1, 
                  letterSpacing: "0.4em",
                  transition: { duration: 1.5, ease: "easeOut" }
                }
              }}
              animate={{
                letterSpacing: ["0.35em", "0.45em", "0.35em"]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-[9px] md:text-[11px] font-bold text-slate-500 uppercase mb-8"
            >
              Western Ghats • Raw • Real • Unfiltered
            </motion.p>

            <motion.p 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className="text-sm md:text-lg text-slate-600 mb-8 md:mb-12 max-w-xl mx-auto leading-relaxed font-medium"
            >
              A trekking & travel community exploring the wild heart of the Western Ghats. <br className="hidden md:block" />
              <span className="text-brand-accent font-bold">Authentic trails. Real experiences. Pure adventure.</span>
            </motion.p>

            <motion.div 
              variants={{
                hidden: { opacity: 0, scale: 0.95 },
                visible: { opacity: 1, scale: 1 }
              }}
              className="relative w-full max-w-md mx-auto"
            >
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
                        Welcome to Adventure Chaarana!<br/>Redirecting for confirmation...
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
                      <motion.input 
                        type="tel" 
                        placeholder="Your Phone Number"
                        required
                        value={phone}
                        disabled={status === 'loading'}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                          setPhone(val);
                        }}
                        whileFocus={{ scale: 1.01, boxShadow: "0 0 20px rgba(249, 115, 22, 0.1)" }}
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 md:px-6 md:py-4 text-xs md:text-sm focus:outline-none focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/5 transition-all font-medium placeholder:text-slate-400 text-slate-900 disabled:opacity-50 shadow-sm"
                      />
                      {status === 'error' && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute -bottom-8 left-0 flex items-center gap-2 text-[10px] text-red-500 font-bold uppercase tracking-wider bg-red-500/10 px-2 py-1 rounded-md border border-red-500/20"
                        >
                          <AlertCircle size={10} />
                          {errorMessage}
                        </motion.div>
                      )}
                    </div>
                    
                    <motion.button 
                      type="submit"
                      disabled={status === 'loading' || phone.trim().length < 10}
                      whileHover={status !== 'loading' && phone.trim().length >= 10 ? { scale: 1.02, backgroundColor: "#ea580c" } : {}}
                      whileTap={status !== 'loading' && phone.trim().length >= 10 ? { scale: 0.98 } : {}}
                      className="bg-brand-accent text-white px-6 py-3 md:px-8 md:py-4 rounded-xl font-bold text-[9px] md:text-[10px] tracking-[0.2em] uppercase transition-colors shadow-xl shadow-orange-600/20 disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[140px]"
                    >
                      {status === 'loading' ? (
                        <>
                          <Loader2 size={14} className="animate-spin" />
                          Processing
                        </>
                      ) : (
                        'Join Waitlist'
                      )}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-20 p-8 md:p-10 pb-32 md:pb-10 flex flex-col items-center gap-4 mt-auto w-full shrink-0">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex flex-col md:flex-row items-center gap-4 text-[7px] md:text-[9px] text-slate-500 font-bold tracking-[0.4em] uppercase text-center"
        >
            <span>&copy; 2026 Adventure Charana</span>
            <span className="flex items-center gap-2">
                <div className="w-1 h-1 bg-brand-accent rounded-full animate-pulse shadow-[0_0_8px_rgba(249,115,22,0.5)]"></div>
                Community Launch Imminent
            </span>
            <span className="hidden md:inline px-2 opacity-30">|</span>
            <span>Est. 2026</span>
        </motion.div>
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
