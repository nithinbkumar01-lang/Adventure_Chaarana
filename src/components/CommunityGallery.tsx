import React, { useState, useEffect } from 'react';
import { Compass, X, ChevronLeft, ChevronRight, Sparkles, Maximize2, Camera } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useSiteData } from '../context/SiteDataContext';

export const CommunityGallery = () => {
  const { communityImages } = useSiteData();
  const images = communityImages;
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setLightboxIndex(prev => (prev === null || prev === 0 ? images.length - 1 : prev - 1));
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex(prev => (prev === null || prev === images.length - 1 ? 0 : prev + 1));
      } else if (e.key === 'Escape') {
        setLightboxIndex(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, images.length]);

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex(prev => {
        if (prev === null) return null;
        return prev === 0 ? images.length - 1 : prev - 1;
      });
    }
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex(prev => {
        if (prev === null) return null;
        return prev === images.length - 1 ? 0 : prev + 1;
      });
    }
  };

  // Helper for Bento Big and Small configuration
  const getCommunityTileConfig = (i: number, total: number) => {
    const remaining = total - i;
    if (remaining === 1) {
      return {
        spanClass: 'col-span-2 md:col-span-4 row-span-1 md:row-span-2',
        isBig: true,
        badge: 'Panoramic Vista'
      };
    }
    if (remaining === 2) {
      return {
        spanClass: 'col-span-1 md:col-span-2 row-span-1',
        isBig: false,
        badge: 'Scenic Valley'
      };
    }
    const cycle = i % 8;
    if (cycle === 0) {
      return {
        spanClass: 'col-span-2 md:col-span-2 row-span-2',
        isBig: true,
        badge: i === 0 ? 'Golden Dawn' : 'Expedition Showcase'
      };
    }
    if (cycle === 7) {
      return {
        spanClass: 'col-span-2 md:col-span-2 row-span-2',
        isBig: true,
        badge: 'Sunset Serenity'
      };
    }
    if (cycle === 3 || cycle === 6) {
      return {
        spanClass: 'col-span-2 md:col-span-2 row-span-1',
        isBig: false,
        badge: 'Mountain Ridge'
      };
    }
    return {
      spanClass: 'col-span-1 md:col-span-1 row-span-1',
      isBig: false,
      badge: null
    };
  };

  return (
    <section id="gallery-section" className="py-16 md:py-24 bg-brand-paper overflow-hidden border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10 md:space-y-14">
        <div className="text-center space-y-3 md:space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-[10px] font-black uppercase tracking-[0.35em]">
            <Camera size={13} className="text-brand-orange" />
            <span>Captured Travels</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-brand-dark tracking-tighter leading-tight">
            Explorer <span className="text-brand-orange italic font-serif">Showcase Gallery</span>
          </h2>
          <p className="text-slate-500 font-bold text-xs md:text-sm tracking-wide max-w-xl mx-auto">
            A dynamic mosaic of raw expeditions, golden sunrises, sweeping grasslands, and triumphant moments shared by our adventurers.
          </p>
        </div>

        {/* Dynamic Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 auto-rows-[160px] sm:auto-rows-[190px] md:auto-rows-[220px] lg:auto-rows-[240px] grid-flow-dense">
          {images.map((img, i) => {
            const tile = getCommunityTileConfig(i, images.length);
            return (
              <motion.div
                key={img.url + i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 6) * 0.05 }}
                onClick={() => setLightboxIndex(i)}
                className={`relative overflow-hidden rounded-2xl md:rounded-[2rem] border group cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500 ${tile.spanClass} ${
                  tile.isBig 
                    ? 'border-brand-orange/30 shadow-brand-orange/5 hover:border-brand-orange ring-1 ring-brand-orange/20' 
                    : 'border-slate-200/80 hover:border-brand-orange/40 bg-white'
                }`}
              >
                <img 
                  src={img.url} 
                  alt={img.caption}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />

                {/* Gradient Scrim */}
                <div className={`absolute inset-0 transition-opacity duration-300 ${
                  tile.isBig 
                    ? 'bg-gradient-to-t from-black/80 via-black/20 to-transparent' 
                    : 'bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-0 group-hover:opacity-100'
                }`} />

                {/* Top Badge for Big Sections */}
                {tile.badge && (
                  <div className="absolute top-3 left-3 md:top-4 md:left-4 z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[9px] md:text-[10px] font-black uppercase tracking-wider shadow-lg">
                      <Sparkles size={11} className="text-brand-orange" />
                      {tile.badge}
                    </span>
                  </div>
                )}

                {/* Expand Icon */}
                <div className="absolute top-3 right-3 md:top-4 md:right-4 z-10 w-8 h-8 md:w-9 md:h-9 bg-black/40 hover:bg-brand-orange text-white rounded-full backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 border border-white/20 shadow-lg scale-90 group-hover:scale-100">
                  <Maximize2 size={14} />
                </div>

                {/* Bottom Caption Overlay */}
                <div className={`absolute inset-x-0 bottom-0 p-3 md:p-5 flex flex-col justify-end z-10 transition-all duration-300 ${
                  tile.isBig 
                    ? 'opacity-100' 
                    : 'opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0'
                }`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
                    <span className="text-brand-orange font-black uppercase tracking-[0.25em] text-[8px] md:text-[9px]">
                      {tile.isBig ? 'Featured Shot' : 'Community Moment'}
                    </span>
                  </div>
                  <p className={`text-white font-bold leading-tight drop-shadow-md line-clamp-2 ${
                    tile.isBig ? 'text-sm md:text-base font-black' : 'text-xs'
                  }`}>
                    {img.caption}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-between bg-brand-dark/95 backdrop-blur-2xl p-3 md:p-6"
          >
            {/* Top Bar */}
            <div className="w-full max-w-6xl flex items-center justify-between z-[110] select-none py-2 px-2" onClick={e => e.stopPropagation()}>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-brand-orange/20 border border-brand-orange/30 text-brand-orange text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5">
                  <Compass size={12} /> Adventure Community
                </span>
                <span className="text-white/60 font-bold text-xs">
                  {lightboxIndex + 1} of {images.length}
                </span>
              </div>

              <button 
                onClick={() => setLightboxIndex(null)}
                className="bg-white/10 hover:bg-white/20 text-white rounded-full p-2.5 transition-all backdrop-blur-md hover:scale-105 active:scale-95 cursor-pointer border border-white/10"
                aria-label="Close Lightbox"
              >
                <X size={20} />
              </button>
            </div>

            {/* Image Container */}
            <div className="relative max-w-5xl w-full flex-1 flex items-center justify-center my-2" onClick={e => e.stopPropagation()}>
              <button 
                onClick={handlePrev}
                className="absolute left-2 md:left-4 z-20 bg-black/50 hover:bg-brand-orange text-white rounded-full p-3 md:p-4 transition-all backdrop-blur-md hover:scale-110 active:scale-95 cursor-pointer border border-white/10 shadow-2xl"
                aria-label="Previous Image"
              >
                <ChevronLeft size={22} />
              </button>

              <motion.img 
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.2 }}
                src={images[lightboxIndex]?.url} 
                alt={images[lightboxIndex]?.caption}
                className="max-w-full max-h-[60vh] md:max-h-[65vh] object-contain rounded-2xl shadow-2xl border border-white/10 select-none"
                referrerPolicy="no-referrer"
              />

              <button 
                onClick={handleNext}
                className="absolute right-2 md:right-4 z-20 bg-black/50 hover:bg-brand-orange text-white rounded-full p-3 md:p-4 transition-all backdrop-blur-md hover:scale-110 active:scale-95 cursor-pointer border border-white/10 shadow-2xl"
                aria-label="Next Image"
              >
                <ChevronRight size={22} />
              </button>
            </div>

            {/* Caption Indicator & Thumbnails */}
            <div className="w-full max-w-5xl space-y-3 z-10 select-none" onClick={e => e.stopPropagation()}>
              <div className="text-center px-4">
                <p className="text-white text-sm md:text-base font-bold tracking-wide">
                  {images[lightboxIndex]?.caption}
                </p>
              </div>

              {/* Thumbnail Strip */}
              <div className="flex items-center justify-center gap-2 overflow-x-auto py-2 px-4 no-scrollbar max-w-full">
                {images.map((item, idx) => (
                  <button
                    key={item.url + idx}
                    onClick={() => setLightboxIndex(idx)}
                    className={`relative shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-xl overflow-hidden transition-all duration-300 cursor-pointer ${
                      idx === lightboxIndex 
                        ? 'ring-2 ring-brand-orange scale-110 shadow-lg border-2 border-white' 
                        : 'opacity-40 hover:opacity-90 hover:scale-105 border border-white/10'
                    }`}
                  >
                    <img 
                      src={item.url} 
                      alt={`Thumbnail ${idx + 1}`} 
                      className="w-full h-full object-cover" 
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
