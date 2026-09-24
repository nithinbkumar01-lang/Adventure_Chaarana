import React, { useState } from 'react';
import { MapPin, Mountain, Sun, Compass, Tent, X, ChevronDown, Search, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { TrekCard } from '../components/TrekCard';
import { TrekCardSkeleton } from '../components/TrekCardSkeleton';
import { CommunityGallery } from '../components/CommunityGallery';
import { useSiteData } from '../context/SiteDataContext';

export const HomePage = () => {
  const { treks, isLoading, error } = useSiteData();
  const [activeCategory, setActiveCategory] = useState('western-ghats');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'All Treks', icon: <Mountain size={14} /> },
    { id: 'sunrise', label: 'Sunrise Treks', icon: <Sun size={14} /> },
    { id: 'western-ghats', label: 'Western Ghats', icon: <Compass size={14} /> },
    { id: 'weekend', label: 'Weekend getaways', icon: <Tent size={14} /> },
  ];

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const el = document.getElementById('treks-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const filteredTreks = treks.filter(trek => {
    const q = searchQuery.trim().toLowerCase();
    
    if (q) {
      const matchesQuery = 
        trek.title.toLowerCase().includes(q) ||
        trek.location.toLowerCase().includes(q) ||
        trek.category.toLowerCase().includes(q) ||
        trek.description.toLowerCase().includes(q) ||
        (trek.placesCovered && trek.placesCovered.some(p => p.toLowerCase().includes(q)));
      
      return matchesQuery;
    }

    return activeCategory === 'all' || trek.category === activeCategory;
  });

  return (
    <div className="flex flex-col">
      <Helmet>
        <title>Adventure Chaarana | Premium Trekking & Adventure Community in Bangalore</title>
        <meta name="description" content="Explore the pure wild with Adventure Chaarana. We offer the best sunrise treks, weekend getaways, and western ghats expeditions from Bangalore. Join our active adventure community." />
        <meta name="keywords" content="trekking bangalore, sunrise treks bangalore, adventure community bangalore, western ghats trek, kodaikanal trip, adventure chaarana" />
        <link rel="canonical" href="https://adventurechaarana.com/" />
        
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://adventurechaarana.com/" />
        <meta property="og:title" content="Adventure Chaarana | Premium Trekking & Adventure Community" />
        <meta property="og:description" content="Explore the pure wild with Bangalore's most active trekking community." />
        <meta property="og:image" content="https://res.cloudinary.com/dmez9koqz/image/upload/v1786011636/logo_eng_fr3ih9.png" />
      </Helmet>
      {/* Hero Section */}
      <section className="relative z-20 min-h-[90vh] sm:min-h-[85vh] flex flex-col items-center justify-center px-4 md:px-6 overflow-hidden pt-24 pb-16">
        {/* Background Image Layer */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://res.cloudinary.com/dofg6bsom/image/upload/v1777477957/Background_tdfgts.png" 
            alt="Scenic mountain range background for Adventure Chaarana" 
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
        </div>
        
        <div className="w-full max-w-4xl mx-auto text-center space-y-5 sm:space-y-6 relative z-10 text-white">
          {/* Main Hero Title */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.8 }}
            className="py-1 sm:py-2 select-none"
          >
            <h1 className="font-bebas text-6xl sm:text-8xl md:text-9xl lg:text-[8.5rem] tracking-[0.04em] leading-[0.9] text-white drop-shadow-[0_8px_30px_rgba(0,0,0,0.9)] uppercase">
              Adventure{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5E36] via-[#FFAE34] to-[#FF6542] drop-shadow-[0_4px_25px_rgba(255,101,66,0.4)]">
                Awaits!!
              </span>
            </h1>
          </motion.div>

          {/* Stats Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex flex-wrap items-center justify-center gap-5 sm:gap-8 md:gap-12 text-white/95 text-xs sm:text-sm md:text-base font-semibold drop-shadow-md pb-2"
          >
            <div className="flex items-center gap-2">
              <span className="text-[#FF6542] text-sm sm:text-base font-black">▲</span>
              <span>50+ Treks</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-[#FF6542] fill-[#FF6542]" />
              <span>10+ Regions</span>
            </div>
            <div className="flex items-center gap-2">
              <Users size={17} className="text-[#FF6542]" />
              <span>2000+ Trekkers</span>
            </div>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.8 }}
            className="pt-2 w-full"
          >
            <form 
              onSubmit={handleSearchSubmit}
              className="w-full max-w-3xl mx-auto bg-white rounded-full p-1.5 sm:p-2 pl-5 sm:pl-6 shadow-[0_20px_60px_rgba(0,0,0,0.4)] flex items-center gap-3 border border-white/60 focus-within:ring-4 focus-within:ring-[#FF6542]/25 transition-all"
            >
              <Search size={20} className="text-slate-400 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search treks or regions..."
                className="w-full bg-transparent text-slate-800 placeholder:text-slate-400 text-sm sm:text-base font-medium focus:outline-none py-1.5"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full transition-colors shrink-0"
                  title="Clear search"
                >
                  <X size={16} />
                </button>
              )}
              <button
                type="submit"
                className="bg-[#FF6542] hover:bg-[#ff522b] text-white px-7 sm:px-10 py-3 rounded-full font-bold text-sm sm:text-base shadow-lg shadow-[#FF6542]/30 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer shrink-0"
              >
                Search
              </button>
            </form>
          </motion.div>
        </div>

        {/* Swipe to Explore Overlay */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 pointer-events-none"
        >
          <div className="flex flex-col items-center group">
             <motion.div 
               animate={{ y: [0, 8, 0] }}
               transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
               className="relative flex flex-col items-center"
             >
               <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] text-white/70 mb-1.5 drop-shadow-lg">Swipe to explore treks</span>
               <ChevronDown size={22} className="text-white drop-shadow-2xl" strokeWidth={3} />
             </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Category Section */}
      <section id="treks-section" className="relative z-20 py-12 md:py-20 bg-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-3 md:mb-4">
            Explore Treks by Category
          </h2>
          <p className="text-slate-500 font-bold text-xs md:text-sm tracking-wide mb-8 md:mb-12">
            Choose your next thrill from our handpicked collection of curated escapes.
          </p>

          {searchQuery && (
            <div className="flex items-center justify-center gap-3 mb-8">
              <span className="text-xs sm:text-sm font-bold text-slate-700 bg-white shadow-sm px-4 py-2 rounded-full border border-slate-200">
                Found {filteredTreks.length} {filteredTreks.length === 1 ? 'trek' : 'treks'} for "{searchQuery}"
              </span>
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs font-black uppercase tracking-wider text-[#FF6542] hover:underline cursor-pointer bg-white px-3 py-2 rounded-full border border-slate-200 shadow-sm"
              >
                Clear Search ✕
              </button>
            </div>
          )}

          <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-10 md:mb-20 overflow-x-auto pb-4 px-2 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 md:px-6 py-2.5 md:py-3 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap shadow-sm border ${
                  activeCategory === cat.id
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-emerald-200'
                    : 'bg-white text-slate-500 border-slate-100 hover:border-emerald-200 hover:text-emerald-600'
                }`}
              >
                <div className="md:size-4">{cat.icon}</div>
                {cat.label}
              </button>
            ))}
          </div>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 text-left"
            aria-busy={isLoading}
            aria-label={isLoading ? 'Loading trek cards' : 'Available treks'}
          >
            {isLoading && Array.from({ length: 4 }, (_, index) => (
              <TrekCardSkeleton key={`trek-skeleton-${index}`} />
            ))}
            <AnimatePresence mode="popLayout">
              {filteredTreks.map((trek) => (
                <TrekCard 
                  key={trek.id} 
                  trek={trek} 
                />
              ))}
            </AnimatePresence>
          </div>

          {isLoading && <p role="status" className="sr-only">Loading treks…</p>}

          {error && (
            <p role="alert" className="py-12 text-center text-red-600 font-bold">Unable to load treks. Please refresh and try again.</p>
          )}
          
          {!isLoading && !error && filteredTreks.length === 0 && (
            <div className="py-20 text-center">
              <Compass size={48} className="mx-auto text-slate-200 mb-4 animate-spin-slow" />
              <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No treks found in this category yet</p>
            </div>
          )}
        </div>
      </section>

      <CommunityGallery />

    </div>
  );
};
