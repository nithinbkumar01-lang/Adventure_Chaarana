import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Clock, MapPin, ArrowLeft, Mountain, Compass, ChevronDown, Sparkles, Camera, Instagram, MessageCircle, Download, FileText, FileDown, Check, Loader2, Star, HelpCircle, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { TrekGallery } from '../components/TrekGallery';
import { useSiteData } from '../context/SiteDataContext';
import type { Trek } from '../../shared/types/trek';

interface Batch {
  start: string;
  end: string;
  year: number;
  dayName: string;
  monthGroup: string;
  remainingSeats?: number;
  seatCapacity?: number;
}

export const TrekDetailsPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { treks, isLoading, error } = useSiteData();
  const trek = treks.find(t => t.slug === slug);
  const isOneDayTrek = trek?.duration?.toLowerCase() === '1 day';
  const isTwoDayWesternGhat = trek?.duration?.toLowerCase()?.includes('2 day') && trek?.category === 'western-ghats';
  const isTwoDayTrek = trek?.duration?.toLowerCase()?.includes('2 day');

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [serverBatches, setServerBatches] = useState<Batch[] | null>(null);

  useEffect(() => {
    if (!slug) return;
    const controller = new AbortController();
    fetch(`/api/v1/treks/${encodeURIComponent(slug)}/departures`, { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error('Departure API unavailable');
        return response.json() as Promise<Array<{ starts_at: string; ends_at: string; remaining_seats: number; seat_capacity: number }>>;
      })
      .then((departures) => setServerBatches(departures.map((departure) => {
        const startDate = new Date(departure.starts_at);
        const endDate = new Date(departure.ends_at);
        const formatDate = (date: Date) => date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
        return {
          start: formatDate(startDate),
          end: formatDate(endDate),
          year: startDate.getFullYear(),
          dayName: startDate.toLocaleDateString('en-US', { weekday: 'short' }),
          monthGroup: startDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
          remainingSeats: departure.remaining_seats,
          seatCapacity: departure.seat_capacity,
        };
      })))
      .catch(() => {
        if (!controller.signal.aborted) setServerBatches(null);
      });
    return () => controller.abort();
  }, [slug]);

  const navTabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'itinerary', label: 'Itinerary' },
    { id: 'inclusions', label: 'Inclusions' },
    { id: 'cancellation', label: 'Cancellation' },
    { id: 'what-to-pack', label: 'What to Pack' },
    { id: 'faqs', label: 'FAQs' },
  ];

  const scrollToSection = (id: string) => {
    setActiveTab(id);
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -64;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      for (let i = navTabs.length - 1; i >= 0; i--) {
        const el = document.getElementById(navTabs[i].id);
        if (el && scrollPosition >= el.offsetTop) {
          setActiveTab(navTabs[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDownloadItineraryPdf = async (url: string, title: string) => {
    if (!url) return;
    setIsDownloadingPdf(true);
    setDownloadSuccess(false);

    const cleanTitle = title.replace(/[^a-zA-Z0-9]/g, '_').replace(/_+/g, '_');
    const filename = `${cleanTitle}_Detailed_Itinerary.pdf`;
    const downloadUrl = url.includes('?') ? `${url}&ik-attachment=true` : `${url}?ik-attachment=true`;

    try {
      const response = await fetch(downloadUrl);
      if (!response.ok) throw new Error('Network error');
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(blobUrl);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (err) {
      console.warn('Direct blob download failed, falling back to direct attachment download:', err);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.setAttribute('download', filename);
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  const getUpcomingBatches = (trek: Trek): Batch[] => {
    const batches: Batch[] = [];
    const isOneDay = trek.duration.toLowerCase().includes('1 day');
    // Friday departure for two-day itineraries (day 5)
    // Saturday departure for one-day itineraries (day 6)
    const targetDay = isOneDay ? 6 : 5;
    
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    const cur = new Date(today);
    let count = 0;
    let safetyCounter = 0;
    
    while (count < 12 && safetyCounter < 180) {
      safetyCounter++;
      if (cur.getDay() === targetDay && cur >= today) {
        const startDate = new Date(cur);
        const endDate = new Date(cur);
        endDate.setDate(startDate.getDate() + (isOneDay ? 1 : 2));

        const formatDate = (d: Date) => d.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
        const monthGroup = startDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

        batches.push({
          start: formatDate(startDate),
          end: formatDate(endDate),
          year: startDate.getFullYear(),
          dayName: startDate.toLocaleDateString('en-US', { weekday: 'short' }),
          monthGroup
        });
        count++;
      }
      cur.setDate(cur.getDate() + 1);
    }
    return serverBatches ?? batches;
  };

  if (!trek) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <Compass size={64} className="text-slate-200 mb-4 animate-spin-slow" />
        <h2 className="text-2xl font-black text-slate-900 mb-2">{isLoading ? 'Loading trek…' : error ? 'Unable to load trek' : 'Trek Not Found'}</h2>
        <p className="text-slate-500 mb-8">{isLoading ? 'Please wait while we load this expedition.' : error ? 'Please refresh and try again.' : "The expedition you're looking for doesn't exist."}</p>
        <Link to="/" className="bg-emerald-500 text-white px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest shadow-lg">
          Back to Explorations
        </Link>
      </div>
    );
  }



  const faqs = [
    {
      q: `How do I book and confirm my slot for ${trek.title}?`,
      a: `Booking is straightforward and fast! Click on "Book Now" or "DM TO 9980489494" on WhatsApp to chat directly with our team. Once we verify slot availability for your chosen batch, you can reserve your spot with a token advance or full payment via UPI or Bank transfer. You'll receive instant booking confirmation details and ticket vouchers.`
    },
    {
      q: `What are the pickup and drop-off points in Bengaluru?`,
      a: `We provide designated central pickup points across Bengaluru: Indiranagar (Narayana Nethralaya - 8:30 PM), Majestic (Shantala Silks - 9:30 PM), Yeshwanthpur (Govardhan Theatre - 10:00 PM), and Gorguntepalya / Nelamangala Toll (10:15 PM). Detailed driver numbers, live vehicle location, and trip captain contact are shared in the dedicated trip WhatsApp group 24 hours prior to departure.`
    },
    {
      q: `What kind of food and accommodation are included?`,
      a: `We arrange authentic local homestays or scenic riverside campsites with separate rooms/tents and hygienic washrooms for men and women. Wholesome vegetarian meals are included (fresh local breakfast, packed trail lunch, and authentic dinner), along with hot evening tea/coffee and refreshments.`
    },
    {
      q: `Is this trek suitable for beginners and solo or female travelers?`,
      a: `Yes, absolutely! Over 55% of our trekkers join solo, and more than 40% are women. Our certified outdoor leads and wilderness first responders ensure a welcoming, inclusive, and strictly smoke-free & alcohol-free community environment. Trek leaders maintain a steady, comfortable pace with frequent hydration and scenic photo breaks.`
    },
    {
      q: `What happens if it rains or weather conditions change?`,
      a: `The Western Ghats are celebrated for their misty atmosphere, lush green mountain ridges, and seasonal streams. Light or moderate rain adds to the magic of the trail! Trekkers should carry a reliable poncho/raincoat and waterproof pouches for mobile phones. In case of extreme weather alerts or forest department closures, we reschedule or offer safe alternative trails per safety protocol.`
    },
    {
      q: `What is the cancellation and refund policy?`,
      a: isOneDayTrek 
        ? `For 1-Day Sunrise Treks, bookings are non-refundable. However, free date rescheduling and slot transfer to a friend is permitted up to 24 hours before departure.`
        : `For 2-Day Weekend Treks: Cancellations made more than 72 hours prior to departure incur only a 45% fee, with refunds processed directly back to your source account in 5-7 business days. Within 72 hours of departure, slots are strictly non-refundable due to pre-booked homestays, non-AC transit, and forest department permits.`
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": trek.title,
    "description": trek.description,
    "image": trek.image,
    "startDate": trek.date.includes('Every') ? undefined : new Date(trek.date).toISOString(),
    "location": {
      "@type": "Place",
      "name": trek.location,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": trek.location,
        "addressRegion": "Karnataka",
        "addressCountry": "IN"
      }
    },
    "offers": {
      "@type": "Offer",
      "price": trek.currentPrice,
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock",
      "url": `https://adventurechaarana.com/trek/${trek.slug}`
    },
    "organizer": {
      "@type": "Organization",
      "name": "Adventure Chaarana",
      "url": "https://adventurechaarana.com"
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-brand-paper relative font-sans selection:bg-brand-orange selection:text-white"
    >
      <Helmet>
        <title>{trek.title} | Adventure Chaarana - Best Treks from Bangalore</title>
        <meta name="description" content={trek.description} />
        <meta name="keywords" content={`${trek.title}, trekking ${trek.location}, ${trek.category} treks, adventure trip from bangalore, adventure chaarana`} />
        <link rel="canonical" href={`https://adventurechaarana.com/trek/${trek.slug}`} />
        
        <meta property="og:type" content="article" />
        <meta property="og:title" content={`${trek.title} | Adventure Chaarana`} />
        <meta property="og:description" content={trek.description} />
        <meta property="og:image" content={trek.image} />
        <meta property="og:url" content={`https://adventurechaarana.com/trek/${trek.slug}`} />

        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      {/* ─── IMMERSIVE CENTERED HERO ─── */}
      <header className="relative pt-16 flex flex-col justify-center items-center min-h-[45vh] md:min-h-[55vh] overflow-hidden text-center px-6">

        {/* Small Back Button in Hero */}
        <div className="absolute top-4 left-4 md:top-6 md:left-8 z-20">
          <button
            id="trek-hero-back-btn"
            onClick={handleGoBack}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 md:px-4 md:py-2 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md border border-white/20 hover:border-white/40 text-white text-[10px] md:text-xs font-black uppercase tracking-wider shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer group"
            aria-label="Go back to explorations"
          >
            <ArrowLeft size={13} className="text-slate-300 group-hover:text-white transition-colors" />
            <span>Back</span>
          </button>
        </div>

        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={trek.image} 
            alt={`Mountain Expedition: ${trek.title} Sunrise Trail`} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/60 via-brand-dark/80 to-brand-dark/95" />
        </div>
        
        <div className="max-w-4xl mx-auto w-full relative z-10 space-y-8">
          <div className="flex justify-center items-center">
            <button
              onClick={handleGoBack}
              className="cursor-pointer group focus:outline-none transition-transform duration-300 hover:scale-105 inline-block"
              aria-label="Adventure Chaarana Logo - Click to go back"
              title="Click to go back"
            >
              <motion.img 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                src="https://res.cloudinary.com/dmez9koqz/image/upload/v1786011636/logo_eng_fr3ih9.png" 
                alt="Adventure Chaarana Logo" 
                className="h-20 md:h-28 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </button>
          </div>

          <div className="space-y-4">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-[0.9] tracking-tighter"
            >
              {trek.title.split(' ')[0]} <br />
              <span className="text-brand-orange-glow italic font-serif opacity-95">{trek.title.split(' ').slice(1).join(' ')}</span>
            </motion.h1>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3.5 text-white/50 font-bold text-[10.5px] uppercase tracking-widest pt-2 max-w-4xl mx-auto"
            >
              <span className="flex items-center gap-1.5"><span className="text-brand-orange-glow text-[13px]">🏔️</span> Max Alt: {trek.elevation}</span>
              {trek.distance && <span className="flex items-center gap-1.5"><span className="text-brand-orange-glow text-[13px]">📏</span> Distance: {trek.distance}</span>}
              {trek.timeHours && <span className="flex items-center gap-1.5"><span className="text-brand-orange-glow text-[13px]">⏱️</span> Time: {trek.timeHours}</span>}
              {trek.modeRating && <span className="flex items-center gap-1.5"><span className="text-brand-orange-glow text-[13px]">⚡</span> Mode: {trek.modeRating}</span>}
              <span className="flex items-center gap-1.5"><span className="text-brand-orange-glow text-[13px]">📍</span> {trek.location}</span>
              <span className="flex items-center gap-1.5"><span className="text-brand-orange-glow text-[13px]">👶</span> Age: {trek.minAge}</span>
              <span className="flex items-center gap-1.5 text-white/90 bg-brand-orange/20 border border-brand-orange/40 px-3 py-1 rounded-full">
                <span className="text-brand-orange-glow text-[13px]">📅</span> 
                {trek.duration.toLowerCase().includes('1 day') ? 'Saturday Departure (1-Day)' : 'Friday Departure (2-Day)'}
              </span>
              <a 
                href="#get-itinerary-section"
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all cursor-pointer ${
                  trek.itineraryPdf 
                    ? 'text-white/95 bg-emerald-500/25 border border-emerald-400/50 hover:bg-emerald-500/35'
                    : 'text-white/80 bg-white/10 border border-white/20 hover:bg-white/20'
                }`}
              >
                <Download size={12} className={trek.itineraryPdf ? "text-emerald-400" : "text-brand-orange"} />
                <span>{trek.itineraryPdf ? 'PDF Itinerary Ready' : 'Get Itinerary'}</span>
              </a>
            </motion.div>
          </div>

          {trek.withoutTransportPrice ? (
            <div className="space-y-4 max-w-4xl mx-auto w-full">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col md:flex-row items-stretch justify-center gap-6 pt-4 w-full"
              >
                {/* Option 1: With Transport */}
                <div className="flex-1 flex flex-col justify-between bg-black/40 backdrop-blur-xl p-6.5 rounded-[2rem] border border-white/10 shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 bg-brand-orange text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-bl-xl text-white">
                    Popular
                  </div>
                  <div className="space-y-4 text-center md:text-left">
                    <div>
                      <span className="text-[9px] font-black text-brand-orange-glow uppercase tracking-widest block mb-1">Travel Package</span>
                      <h4 className="text-lg font-black text-white italic tracking-tight">With <span className="text-brand-orange">Transport</span></h4>
                    </div>
                    <div className="flex items-baseline justify-center md:justify-start gap-3">
                      <span className="text-4xl font-extrabold text-white">₹{trek.currentPrice.toLocaleString()}</span>
                      <span className="text-sm font-bold text-white/35 line-through">₹{trek.originalPrice.toLocaleString()}</span>
                    </div>
                    <p className="text-[10px] text-white/60 leading-relaxed font-semibold">
                      Includes hassle-free round-trip transportation from Bangalore and all standard inclusions.
                    </p>
                  </div>
                </div>

                {/* Option 2: Without Transport */}
                <div className="flex-1 flex flex-col justify-between bg-black/40 backdrop-blur-xl p-6.5 rounded-[2rem] border border-white/10 shadow-2xl relative overflow-hidden group">
                  <div className="space-y-4 text-center md:text-left">
                    <div>
                      <span className="text-[9px] font-black text-cyan-400-glow uppercase tracking-widest block mb-1">Self-Travel</span>
                      <h4 className="text-lg font-black text-white italic tracking-tight">Without <span className="text-cyan-400">Transport</span></h4>
                    </div>
                    <div className="flex items-baseline justify-center md:justify-start gap-3">
                      <span className="text-4xl font-extrabold text-white">₹{trek.withoutTransportPrice.toLocaleString()}</span>
                    </div>
                    <p className="text-[10px] text-white/60 leading-relaxed font-semibold">
                      Make your own way there. All other inclusions and professional tour services remain exactly the same.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          ) : (
            <div className="space-y-4 max-w-4xl mx-auto w-full">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4"
              >
                <div className="flex items-center gap-5 bg-white/5 backdrop-blur-xl px-7 py-4 rounded-3xl border border-white/10 shadow-2xl">
                  <span className="text-4xl font-black text-white">₹{trek.currentPrice.toLocaleString()}</span>
                  <div className="flex flex-col items-start pr-4 border-r border-white/10 mr-4">
                    <span className="text-[11px] font-bold text-white/30 line-through">₹{trek.originalPrice.toLocaleString()}</span>
                    <span className="text-[9px] font-black text-brand-orange-glow uppercase tracking-tighter">All Inclusive</span>
                  </div>
                  {trek.discount && (
                    <div className="flex flex-col">
                      <span className="text-[8px] font-black text-brand-orange-glow uppercase tracking-[0.2em] mb-1">Current Offer</span>
                      <span className="text-[10px] font-black text-white uppercase tracking-wider">{trek.discount}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          )}

          {trek.permitNotice && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="max-w-2xl mx-auto mt-6 bg-amber-500/10 border border-amber-500/20 backdrop-blur-md px-5 py-3.5 rounded-2xl flex items-center justify-center gap-3.5 text-center text-amber-200/90 text-[11px] font-semibold leading-relaxed shadow-[0_4px_20px_rgba(245,158,11,0.05)]"
            >
              <span className="text-base shrink-0">🎫</span>
              <p>{trek.permitNotice}</p>
            </motion.div>
          )}
        </div>
      </header>

      {/* ─── IN-PAGE NAVIGATION HEADER (STATIC PINNED AT TOP ON SCROLL) ─── */}
      <nav 
        aria-label="Trek details sub-navigation"
        className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between">
          <div className="flex items-center gap-1 sm:gap-2 md:gap-8 overflow-x-auto no-scrollbar py-1 w-full lg:w-auto">
            {navTabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => scrollToSection(tab.id)}
                  className={`py-3.5 px-3 md:px-2 text-xs md:text-sm whitespace-nowrap transition-all border-b-2 cursor-pointer flex items-center gap-1.5 shrink-0 ${
                    isActive
                      ? 'border-brand-orange text-brand-orange font-black'
                      : 'border-transparent text-slate-500 hover:text-slate-900 hover:border-slate-300 font-bold'
                  }`}
                >
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center gap-3 py-2 shrink-0 pl-6 border-l border-slate-100">
            <div className="text-right">
              <span className="text-[9px] uppercase font-black tracking-wider text-slate-400 block leading-none">Starting from</span>
              <span className="text-base font-black text-slate-900">₹{trek.currentPrice.toLocaleString()}</span>
            </div>
            {trek.itineraryPdf && (
              <button
                onClick={() => handleDownloadItineraryPdf(trek.itineraryPdf!, trek.title)}
                className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-black text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer"
                title="Download PDF Itinerary"
              >
                <Download size={13} className="text-brand-orange" />
                <span>PDF</span>
              </button>
            )}
            <button
              onClick={() => {
                const message = `Hi Adventure Chaarana! I want to book slots for ${trek.title}. Please provide available dates and booking details.`;
                window.open(`https://wa.me/919980489494?text=${encodeURIComponent(message)}`, '_blank');
              }}
              className="px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              <MessageCircle size={14} className="fill-white" />
              <span>Book Now</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-8 md:py-12 space-y-16 md:space-y-20">
        {/* ─── SECTION 1: OVERVIEW (MATCHING SCREENSHOT LAYOUT) ─── */}
        <section id="overview" className="space-y-8 scroll-mt-20">
          {/* 4 Quick Stat Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {/* 1. DURATION */}
            <div className="bg-white border border-slate-200/80 p-4 md:p-5 rounded-2xl flex items-center gap-3.5 shadow-xs hover:border-brand-orange/40 hover:shadow-md transition-all">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center shrink-0 text-rose-600">
                <Clock size={20} className="stroke-[2.5]" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block leading-tight">
                  DURATION
                </span>
                <span className="text-sm md:text-base font-black text-slate-900 tracking-tight truncate block">
                  {trek.duration}
                </span>
              </div>
            </div>

            {/* 2. DIFFICULTY */}
            <div className="bg-white border border-slate-200/80 p-4 md:p-5 rounded-2xl flex items-center gap-3.5 shadow-xs hover:border-brand-orange/40 hover:shadow-md transition-all">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0 text-brand-orange">
                <Mountain size={20} className="stroke-[2.5]" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block leading-tight">
                  DIFFICULTY
                </span>
                <span className="text-sm md:text-base font-black text-slate-900 tracking-tight truncate block">
                  {trek.difficulty}
                </span>
              </div>
            </div>

            {/* 3. MAX ALTITUDE */}
            <div className="bg-white border border-slate-200/80 p-4 md:p-5 rounded-2xl flex items-center gap-3.5 shadow-xs hover:border-brand-orange/40 hover:shadow-md transition-all">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center shrink-0 text-amber-600">
                <TrendingUp size={20} className="stroke-[2.5]" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block leading-tight">
                  MAX ALTITUDE
                </span>
                <span className="text-sm md:text-base font-black text-slate-900 tracking-tight truncate block">
                  {trek.elevation || '1,894 m'}
                </span>
              </div>
            </div>

            {/* 4. START POINT */}
            <div className="bg-white border border-slate-200/80 p-4 md:p-5 rounded-2xl flex items-center gap-3.5 shadow-xs hover:border-brand-orange/40 hover:shadow-md transition-all">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 text-emerald-600">
                <MapPin size={20} className="stroke-[2.5]" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block leading-tight">
                  START POINT
                </span>
                <span className="text-sm md:text-base font-black text-slate-900 tracking-tight truncate block">
                  Bengaluru
                </span>
              </div>
            </div>
          </div>

          {/* Highlights Row */}
          <div className="space-y-3">
            <h3 className="text-sm md:text-base font-black text-slate-900 tracking-tight flex items-center gap-2">
              <span>Highlights</span>
            </h3>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-slate-200 bg-white text-xs font-bold text-slate-700 shadow-xs hover:border-brand-orange/40 transition-colors">
                <Star size={13} className="text-brand-orange fill-brand-orange" />
                {trek.title.replace(/\s+Trek.*/i, '')} Expedition
              </span>
              {trek.placesCovered && trek.placesCovered.length > 0 ? (
                trek.placesCovered.slice(0, 5).map((place, idx) => (
                  <span key={idx} className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-slate-200 bg-white text-xs font-bold text-slate-700 shadow-xs hover:border-brand-orange/40 transition-colors">
                    <Star size={13} className="text-brand-orange fill-brand-orange" />
                    {place}
                  </span>
                ))
              ) : (
                <>
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-slate-200 bg-white text-xs font-bold text-slate-700 shadow-xs hover:border-brand-orange/40 transition-colors">
                    <Star size={13} className="text-brand-orange fill-brand-orange" />
                    Western Ghats Shola Ridge
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-slate-200 bg-white text-xs font-bold text-slate-700 shadow-xs hover:border-brand-orange/40 transition-colors">
                    <Star size={13} className="text-brand-orange fill-brand-orange" />
                    Waterfalls & Stream Trail
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-slate-200 bg-white text-xs font-bold text-slate-700 shadow-xs hover:border-brand-orange/40 transition-colors">
                    <Star size={13} className="text-brand-orange fill-brand-orange" />
                    Campfire & Mountain Homestay
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Photo Collage Preview (as seen in reference screenshot) */}
          {(() => {
            const baseImgs = [
              trek.image,
              ...(trek.gallery || []).filter(u => !u.toLowerCase().endsWith('.mov'))
            ];
            const fallbackAdditions = [
              "https://res.cloudinary.com/dofg6bsom/image/upload/f_auto,q_auto/v1779440960/WhatsApp_Image_2026-05-22_at_1.33.54_PM_uvvckq.jpg",
              "https://res.cloudinary.com/dofg6bsom/image/upload/f_auto,q_auto/v1778590561/IMG_5569_bhnmtl.jpg"
            ];
            const allImgs = [...baseImgs];
            if (allImgs.length < 4) {
              allImgs.push(...fallbackAdditions);
            }
            const featureImg = allImgs[0];
            const secondaryImgs = allImgs.slice(1, 4);
            const totalCount = allImgs.length;

            return (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 rounded-3xl overflow-hidden shadow-xs border border-slate-200/80 bg-slate-50 p-2">
                {/* Main Feature Image */}
                <div 
                  onClick={() => {
                    const el = document.getElementById('trek-gallery-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="md:col-span-7 h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden relative group cursor-pointer"
                  title="Click to view full photo gallery"
                >
                  <img 
                    src={featureImg} 
                    alt={trek.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent group-hover:opacity-70 transition-opacity" />
                  <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-white text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles size={11} className="text-brand-orange" />
                    <span>Trail View</span>
                  </div>
                </div>

                {/* Right Grid with +Photos button on the last image */}
                <div className="md:col-span-5 grid grid-cols-2 gap-3 h-64 sm:h-80 md:h-96">
                  {secondaryImgs.map((imgUrl, i) => {
                    const isLast = i === secondaryImgs.length - 1;
                    return (
                      <div 
                        key={i}
                        onClick={() => {
                          const el = document.getElementById('trek-gallery-section');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className={`rounded-2xl overflow-hidden relative group cursor-pointer ${
                          secondaryImgs.length === 3 && i === 0 ? 'col-span-2 h-32 sm:h-40 md:h-46' : 'h-30 sm:h-38 md:h-46'
                        }`}
                        title="Click to view full photo gallery"
                      >
                        <img 
                          src={imgUrl} 
                          alt={`${trek.title} moment ${i + 1}`} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                        {isLast && (
                          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center p-3 group-hover:bg-black/70 transition-colors">
                            <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/20 hover:bg-white/30 border border-white/40 text-white font-black text-xs uppercase tracking-wider backdrop-blur-md shadow-lg">
                              <Camera size={13} />
                              +{Math.max(totalCount - 3, 1)} Photos
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })()}

          {/* Overview Text Description */}
          <div className="bg-white border border-slate-200/80 p-6 md:p-8 rounded-3xl space-y-4 shadow-xs">
            <h3 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">Overview</h3>
            <p className="text-slate-700 text-sm md:text-base leading-relaxed font-medium">
              {trek.description}
            </p>
          </div>

          {/* Places We Explore (Curated Landmarks) */}
          {trek.placesCovered && trek.placesCovered.length > 0 && (
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-3">
                <span className="text-brand-orange text-[8px] font-black uppercase tracking-[0.4em]">📍 Key Locations</span>
                <div className="flex-1 h-px bg-slate-100" />
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 md:gap-3">
                {trek.placesCovered.map((place, idx) => (
                  <div key={idx} className="bg-white border border-slate-150 p-3 rounded-xl flex items-center gap-2 hover:shadow-md hover:border-brand-orange/30 transition-all group">
                     <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center shrink-0 group-hover:bg-brand-orange/10 transition-colors">
                       <MapPin size={14} className="text-slate-400 group-hover:text-brand-orange transition-colors" />
                     </div>
                     <span className="text-[10px] font-black text-slate-700 leading-tight uppercase tracking-tight">{place}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* ─── SECTION 2: ITINERARY ─── */}
        <section id="itinerary" className="space-y-12 scroll-mt-20">
          {/* ─── DM TO BOOK BANNER ─── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-brand-dark text-white p-8 md:p-10 rounded-[2.5rem] border border-white/10 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-orange/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="space-y-2 text-center md:text-left z-10">
            <span className="text-brand-orange text-[9px] font-black uppercase tracking-[0.3em] block mb-1">📅 Reserve Your Slot</span>
            <h3 className="text-2xl md:text-3xl font-black italic tracking-tight">Ready to book your slots?</h3>
            <p className="text-white/60 text-xs md:text-sm font-semibold max-w-xl">
              DM us directly on WhatsApp to secure your slots instantly or clear any queries about your upcoming adventure.
            </p>
          </div>
          <a
            href={`https://wa.me/919980489494?text=Hi!%20I'd%20like%20to%20book%20slots%20for%20the%20${encodeURIComponent(trek.title)}.`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#20ba5a] text-white font-extrabold text-xs tracking-wider uppercase px-8 py-4.5 rounded-full shadow-[0_4px_24px_rgba(37,211,102,0.3)] hover:-translate-y-0.5 transition-all duration-300 shrink-0 z-10 font-sans"
          >
            <MessageCircle size={18} className="fill-white" />
            <span>DM TO 9980489494</span>
          </a>
        </motion.div>

        {/* ─── BATCHES & PICKUPS ─── */}
        <section className="grid lg:grid-cols-2 gap-8 sticky-trigger">
          {/* Upcoming Batches */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <span className="text-brand-orange text-[8px] font-black uppercase tracking-[0.4em]">📆 Available Batches</span>
              <div className="flex-1 h-px bg-slate-100" />
            </div>
            
            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-2xl font-black tracking-tight text-brand-dark italic">Upcoming <span className="text-brand-orange">Expeditions</span></h3>
                {(() => {
                  const isOneDay = trek.duration.toLowerCase().includes('1 day');
                  const departureText = serverBatches
                    ? 'Scheduled departures with live seat availability'
                    : isOneDay
                      ? 'Departures every Saturday Night (1-Day Itinerary)'
                      : 'Departures every Friday Night (2-Day Itinerary)';
                  return (
                    <div className="flex items-center gap-2 pt-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                      <p className="text-[11px] uppercase font-black tracking-widest text-brand-orange italic">
                        {departureText}
                      </p>
                    </div>
                  );
                })()}
              </div>
              
              {(() => {
                const grouped = getUpcomingBatches(trek).reduce((acc, batch) => {
                  const group = batch.monthGroup || 'Upcoming Batches';
                  if (!acc[group]) acc[group] = [];
                  acc[group].push(batch);
                  return acc;
                }, {} as Record<string, Batch[]>);

                return (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                    {Object.keys(grouped).map((monthGroup) => {
                      const monthBatches = grouped[monthGroup] || [];
                      return (
                        <div key={monthGroup} className="space-y-4 bg-slate-50/60 hover:bg-white border border-slate-200/50 p-6 rounded-3xl shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06),0_12px_16px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_-5px_rgba(0,0,0,0.12),0_25px_25px_-10px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 border-l-4 border-l-brand-orange">
                          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0f0f0f] bg-brand-orange/5 border border-brand-orange/10 px-3 py-1.5 rounded-full w-fit">
                            {monthGroup}
                          </h4>
                          <div className="flex flex-col gap-2">
                            {monthBatches.map((batch, idx) => {
                              const whatsappMsg = encodeURIComponent(`Hi Adventure Chaarana! I'm interested in booking the ${trek.title} for the batch: ${batch.start} - ${batch.end}, ${batch.year}. Please provide more details.`);
                              const waLink = `https://wa.me/9980489494?text=${whatsappMsg}`;

                              return (
                                <a 
                                  key={idx} 
                                  href={waLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="group bg-white border border-slate-100 hover:bg-brand-orange/[0.03] hover:border-brand-orange/30 p-3.5 rounded-xl flex items-center gap-3 shadow-sm hover:shadow-md transition-all cursor-pointer"
                                >
                                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                                  <p className="font-bold text-slate-800 text-xs tracking-tight">
                                    {batch.start} - {batch.end}
                                  </p>
                                  {batch.remainingSeats !== undefined && (
                                    <span className="ml-auto text-[10px] font-black text-emerald-700">{batch.remainingSeats} seats left</span>
                                  )}
                                </a>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })()}
            </div>
          </div>

          {/* Pickup Points */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-cyan-500 text-[8px] font-black uppercase tracking-[0.4em]">🚍 Pickup Locations</span>
              <div className="flex-1 h-px bg-slate-100" />
            </div>

            <div className="bg-slate-950 border border-slate-850 rounded-[2rem] p-6 text-white relative overflow-hidden group shadow-[0_12px_36px_-6px_rgba(15,23,42,0.6)] hover:shadow-[0_24px_48px_-8px_rgba(15,23,42,0.8)] hover:-translate-y-1 transition-all duration-300">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Compass size={60} className="text-white animate-spin-slow" />
              </div>
              
              <div className="relative z-10 space-y-5">
                {(() => {
                  const allPickups = trek.itinerary[0]?.items.filter(item => item.activity.includes('📍')) || [];
                  const enRouteKeywords = ['hassan', 'tumkur', 'chitradurga', 'shivamogga', 'shimoga'];
                  const enRoutePickups = allPickups.filter(p => {
                    const actLower = p.activity.toLowerCase();
                    return enRouteKeywords.some(kw => actLower.includes(kw)) && !actLower.includes('road');
                  });
                  const bangalorePickups = allPickups.filter(p => !enRoutePickups.includes(p));

                  return (
                    <div className="space-y-6">
                      {bangalorePickups.length > 0 && (
                        <div className="space-y-3">
                          <h3 className="text-xs font-black tracking-widest text-white/50 uppercase">Bangalore <span className="text-cyan-400">Pickups</span></h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {bangalorePickups.map((p, idx) => (
                              <div key={idx} className="bg-white/5 border border-white/5 hover:bg-white/10 hover:border-cyan-400/20 p-3 rounded-xl flex items-center gap-3 transition-all duration-300 shadow-inner">
                                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                                <div className="min-w-0">
                                  <span className="text-[8px] font-bold text-cyan-400 tracking-wider block uppercase">{p.time}</span>
                                  <p className="font-bold text-xs text-white/95 leading-tight truncate">{p.activity.replace('📍', '').trim()}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {enRoutePickups.length > 0 && (
                        <div className="space-y-3 border-t border-white/5 pt-4">
                          <h3 className="text-xs font-black tracking-widest text-white/50 uppercase">En-route <span className="text-brand-orange">Pickups</span></h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {enRoutePickups.map((p, idx) => (
                              <div key={idx} className="bg-white/5 border border-brand-orange/10 hover:bg-white/10 hover:border-brand-orange/30 p-3 rounded-xl flex items-center gap-3 transition-all duration-300 shadow-inner border-l-2 border-l-brand-orange">
                                <div className="w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0 animate-pulse" />
                                <div className="min-w-0">
                                  <span className="text-[8px] font-bold text-brand-orange tracking-wider block uppercase">{p.time}</span>
                                  <p className="font-bold text-xs text-white/95 leading-tight truncate">{p.activity.replace('📍', '').trim()}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>
            </div>

            {/* Important Notes */}
            <div className="bg-white hover:bg-slate-50/50 border border-slate-100 hover:border-brand-orange/20 p-5 rounded-3xl shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06),0_12px_16px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_-5px_rgba(0,0,0,0.12),0_25px_25px_-10px_rgba(0,0,0,0.08)] hover:-translate-y-1 duration-300 transition-all border-l-4 border-l-cyan-400 space-y-3.5">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0f0f0f] bg-cyan-400/5 border border-cyan-400/10 px-3 py-1.5 rounded-full w-fit">
                📢 Important Notes
              </h4>
              <div className="space-y-3">
                <div className="flex items-start gap-2.5">
                  <span className="text-xs mt-0.5 shrink-0">🕒</span>
                  <p className="text-xs text-slate-600 font-bold leading-relaxed">
                    Timings are tentative and subject to change. Updates shared before departure.
                  </p>
                </div>
                <div className="flex items-start gap-2.5 bg-brand-orange/5 border border-brand-orange/10 p-2.5 rounded-xl">
                  <span className="text-xs mt-0.5 shrink-0">⚠️</span>
                  <p className="text-xs text-slate-850 font-black leading-relaxed">
                    Please arrive <span className="text-brand-orange uppercase underline decoration-wavy decoration-brand-orange/30">10 MINUTES EARLY</span>
                  </p>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="text-xs mt-0.5 shrink-0">💬</span>
                  <p className="text-xs text-slate-600 font-bold leading-relaxed">
                    WhatsApp group created 24 hours before departure.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── GET ITINERARY SECTION ─── */}
        <section id="get-itinerary-section" className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="text-brand-orange text-[8px] font-black uppercase tracking-[0.4em]">📄 Official Brochure</span>
            <div className="flex-1 h-px bg-slate-100" />
          </div>

          <div className="space-y-2">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h2 className="text-3xl md:text-5xl font-black text-brand-dark tracking-tighter leading-tight">
                  Get <span className="text-brand-orange italic font-serif">Itinerary</span>
                </h2>
                <p className="text-slate-400 font-medium text-xs max-w-xl mt-1">
                  Download the complete day-by-day expedition schedule, pickup points, campsite details, inclusion breakdown, and gear checklist in high-resolution PDF format.
                </p>
              </div>
              {trek.itineraryPdf && (
                <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-emerald-600 bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 rounded-full self-start md:self-auto shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Official PDF Ready
                </span>
              )}
            </div>
          </div>

          {trek.itineraryPdf ? (
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-slate-900 via-brand-dark to-slate-950 text-white rounded-[2.5rem] p-6 md:p-8 border border-white/10 shadow-2xl relative overflow-hidden group"
            >
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-brand-orange/15 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="flex items-start sm:items-center gap-4 sm:gap-6">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-brand-orange to-red-600 flex flex-col items-center justify-center text-white shadow-2xl shadow-brand-orange/30 shrink-0 border border-white/20 group-hover:scale-105 transition-transform duration-300">
                    <FileText size={28} className="sm:hidden" />
                    <FileText size={32} className="hidden sm:block" />
                    <span className="text-[8px] font-black uppercase tracking-widest mt-0.5">PDF</span>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[9px] font-black uppercase tracking-[0.2em] px-2.5 py-0.5 rounded-md bg-white/10 text-brand-orange-glow border border-white/10">
                        Official Expedition Plan
                      </span>
                      <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        Direct Download
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                      {trek.title} Detailed Itinerary
                    </h3>
                    <p className="text-slate-300 text-xs sm:text-sm font-medium leading-relaxed max-w-xl">
                      Complete timing breakdown, pickup routes, meals schedule, beach campsite guide, and essential traveler guidelines.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2 lg:pt-0 shrink-0">
                  <motion.button
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isDownloadingPdf}
                    onClick={() => handleDownloadItineraryPdf(trek.itineraryPdf!, trek.title)}
                    className={`px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.15em] flex items-center justify-center gap-2.5 shadow-xl transition-all cursor-pointer border ${
                      downloadSuccess
                        ? 'bg-emerald-600 border-emerald-400 text-white shadow-emerald-900/40'
                        : 'bg-brand-orange hover:bg-brand-orange/90 text-white border-white/20 shadow-brand-orange/30'
                    }`}
                  >
                    {isDownloadingPdf ? (
                      <>
                        <Loader2 size={17} className="animate-spin" />
                        <span>Downloading PDF...</span>
                      </>
                    ) : downloadSuccess ? (
                      <>
                        <Check size={17} className="text-white stroke-[3]" />
                        <span>Downloaded!</span>
                      </>
                    ) : (
                      <>
                        <Download size={17} />
                        <span>Download Itinerary (PDF)</span>
                      </>
                    )}
                  </motion.button>

                  <a
                    href={trek.itineraryPdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-4 rounded-2xl bg-white/10 hover:bg-white/15 text-white border border-white/15 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
                    title="Open PDF in new tab"
                  >
                    <FileDown size={16} className="text-slate-300" />
                    <span>View Online</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="bg-slate-50 border border-slate-200/80 rounded-[2.5rem] p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-slate-200/80 text-slate-600 flex items-center justify-center shrink-0">
                  <FileText size={26} />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded-md bg-slate-200 text-slate-600">
                      PDF Document
                    </span>
                  </div>
                  <h3 className="text-xl font-black text-brand-dark tracking-tight">
                    {trek.title} Detailed Itinerary
                  </h3>
                  <p className="text-xs text-slate-500 max-w-xl leading-relaxed">
                    Official PDF brochure for this trek is updated with seasonal weather and forest permits. Request the latest itinerary file instantly on WhatsApp.
                  </p>
                </div>
              </div>

              <a
                href={`https://wa.me/919980489494?text=Hi!%20Could%20you%20please%20send%20me%20the%20detailed%20itinerary%20PDF%20for%20${encodeURIComponent(trek.title)}%3F`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-4 rounded-2xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-lg transition-all self-start md:self-auto shrink-0 cursor-pointer"
              >
                <MessageCircle size={17} />
                <span>Get Itinerary on WhatsApp</span>
              </a>
            </div>
          )}
        </section>

        {/* ─── COMPACT TIMELINE ─── */}
        <section className="space-y-8">
          <div className="flex justify-center items-center py-2">
            <button
              onClick={handleGoBack}
              className="cursor-pointer group focus:outline-none transition-transform duration-300 hover:scale-105 inline-block"
              aria-label="Adventure Chaarana Logo - Click to go back"
              title="Click to go back"
            >
              <img 
                src="https://res.cloudinary.com/dmez9koqz/image/upload/v1786011636/logo_eng_fr3ih9.png" 
                alt="Adventure Chaarana Logo" 
                className="h-20 md:h-28 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </button>
          </div>

          <div className="relative rounded-2xl overflow-hidden p-6 md:p-10 bg-gradient-to-br from-slate-900 via-brand-dark to-slate-900 shadow-2xl">
            <div className="absolute inset-0 z-0">
               <img src={trek.image} alt={`Trek Timeline - ${trek.title}`} className="w-full h-full object-cover opacity-20 grayscale" />
               <div className="absolute inset-0 bg-brand-dark/40 backdrop-blur-[2px]" />
            </div>
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 relative z-10">
              <div className="space-y-1">
                <div className="text-brand-orange text-[8px] font-black uppercase tracking-[0.4em] drop-shadow-lg">📅 Timeline</div>
                <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter leading-tight drop-shadow-xl">
                  Trek <span className="text-brand-orange-glow italic font-serif">Itinerary</span>
                </h2>
              </div>
              <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
                <button
                  id="itinerary-header-back-btn"
                  onClick={handleGoBack}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 md:px-3.5 md:py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-[10px] md:text-xs font-black uppercase tracking-wider transition-all cursor-pointer group shadow-sm hover:scale-105 active:scale-95"
                  aria-label="Go back to previous page"
                >
                  <ArrowLeft size={13} className="text-slate-300 group-hover:text-white transition-colors" />
                  <span>Back</span>
                </button>
                {trek.itineraryPdf ? (
                  <button
                    onClick={() => handleDownloadItineraryPdf(trek.itineraryPdf!, trek.title)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 md:px-3.5 md:py-2 rounded-xl bg-brand-orange hover:bg-brand-orange/90 border border-white/20 text-white text-[10px] md:text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95"
                    title="Download Itinerary PDF"
                  >
                    <Download size={13} className="text-white" />
                    <span>Download PDF</span>
                  </button>
                ) : (
                  <a
                    href="#get-itinerary-section"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 md:px-3.5 md:py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-[10px] md:text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95"
                  >
                    <FileText size={13} className="text-slate-300" />
                    <span>Get Itinerary</span>
                  </a>
                )}
                <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/10 flex items-center gap-3">
                  <span className="text-xl">🗓️</span>
                  <div>
                    <p className="text-[8px] font-black uppercase tracking-widest text-white/50">Batches</p>
                    <p className="font-bold text-white text-[10px]">{isOneDayTrek ? 'Saturday Night Departure' : 'Friday Night Departure'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Day 0 Header Card when available */}
          {(() => {
            const day0 = trek.itinerary.find(d => d.label.toLowerCase() === 'day 0');
            return day0 ? (
              <div className="max-w-4xl mx-auto w-full mb-8">
                <div className="bg-white border border-slate-100/80 rounded-[2rem] p-6 shadow-sm hover:shadow-md transition-all duration-300 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-black uppercase tracking-widest text-brand-orange bg-brand-orange/5 px-3 py-1 rounded-full border border-brand-orange/10">
                        🌌 Day 0
                      </span>
                      <span className="text-xs font-bold text-slate-400">Departure Night</span>
                    </div>
                    <div className="flex items-center gap-3 bg-brand-orange/[0.04] border border-brand-orange/10 px-4 py-3 rounded-2xl flex-1 sm:flex-none">
                      <span className="text-xs font-mono font-black text-brand-orange shrink-0">{isOneDayTrek ? '09:30 PM' : '08:00 PM'}</span>
                      <p className="font-bold text-slate-755 text-xs md:text-sm">Departure from Bangalore time {isOneDayTrek ? '9.30 PM' : '8PM'}</p>
                    </div>
                  </div>

                  {/* Day 0 Accommodation & Meals */}
                  <div className="pt-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100/80 space-y-0.5">
                      <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 block flex items-center gap-1">
                        <span>🏠</span> ACCOMMODATION
                      </span>
                      <span className="text-xs font-black text-slate-800 block">Overnight Journey (Tempo Traveller / Bus)</span>
                    </div>
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100/80 space-y-0.5">
                      <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 block flex items-center gap-1">
                        <span>🍽️</span> MEALS
                      </span>
                      <span className="text-xs font-black text-slate-800 block">Dinner on the way (Self-sponsored)</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : null;
          })()}

          {/* Day 1 & Day 2 Side-by-Side Grid */}
          {(() => {
            const otherDays = trek.itinerary.filter(d => d.label.toLowerCase() !== 'day 0');
            return (
              <div className="space-y-6 max-w-4xl mx-auto w-full">
                <div className={`grid grid-cols-1 gap-6 md:gap-8 items-start ${
                  otherDays.length === 1 
                    ? 'max-w-xl mx-auto' 
                    : otherDays.length === 2 
                    ? 'md:grid-cols-2 w-full' 
                    : 'md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto'
                }`}>
                   {otherDays.map((day, dIdx) => (
                     <div key={dIdx} className="bg-white border border-slate-100/80 rounded-[2rem] p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
                       <div>
                         <div className="flex items-center gap-3 mb-6">
                            <span className="text-xs font-black uppercase tracking-widest text-brand-orange bg-brand-orange/5 px-3 py-1 rounded-full border border-brand-orange/10">
                              {day.emoji} {day.label}
                            </span>
                            <div className="flex-1 h-px bg-slate-100" />
                         </div>
                         
                         <div className="space-y-4 pl-3 relative border-l border-slate-100">
                            {day.items.map((item, idx) => {
                              const isHighlight = item.activity.toLowerCase().includes('sunrise') || item.activity.toLowerCase().includes('trek');
                              return (
                                <div key={idx} className={`relative pl-5 group ${isHighlight ? 'py-1' : ''}`}>
                                  <div className={`absolute left-[-4.5px] top-1 w-2 h-2 rounded-full border-2 border-white transition-all ${isHighlight ? 'bg-brand-orange scale-150' : 'bg-slate-200 group-hover:bg-brand-orange'}`} />
                                  <div className={`space-y-0 ${isHighlight ? 'bg-brand-orange/5 p-3 rounded-xl border border-brand-orange/10' : ''}`}>
                                    <span className="text-[10px] md:text-xs font-black text-brand-orange uppercase tracking-widest">{item.time}</span>
                                    <p className={`font-bold leading-relaxed ${isHighlight ? 'text-brand-dark text-xs md:text-sm' : 'text-slate-705 text-xs md:text-sm'}`}>{item.activity}</p>
                                    {isHighlight && <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-brand-orange mt-1">✨ EXPEDITION POINT</p>}
                                  </div>
                                </div>
                              );
                            })}
                         </div>
                       </div>

                       {/* Accommodation & Meals Badges (Reference Screenshot Feature) */}
                       <div className="mt-6 pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                         <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100/80 space-y-0.5">
                           <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 block flex items-center gap-1">
                             <span>🏠</span> ACCOMMODATION
                           </span>
                           <span className="text-xs font-black text-slate-800 block">
                             {dIdx === 0 
                               ? (isOneDayTrek ? 'Day Trail (No Stay)' : 'Homestay / Campsite') 
                               : (otherDays.length > 2 && dIdx === 1 ? 'Homestay / Campsite' : 'Return Journey')}
                           </span>
                         </div>
                         <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100/80 space-y-0.5">
                           <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 block flex items-center gap-1">
                             <span>🍽️</span> MEALS
                           </span>
                           <span className="text-xs font-black text-slate-800 block">
                             {dIdx === 0 
                               ? (isOneDayTrek ? 'Light Snacks & Tea' : 'Breakfast, Trail Lunch & Dinner') 
                               : (isOneDayTrek ? 'Self-sponsored' : 'Breakfast Included (Lunch Self-sponsored)')}
                           </span>
                         </div>
                       </div>
                     </div>
                   ))}
                </div>

                {isTwoDayWesternGhat && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-amber-500/[0.03] border border-amber-500/20 p-5 rounded-3xl flex gap-4 text-xs font-semibold leading-relaxed text-amber-900 shadow-sm relative overflow-hidden"
                  >
                    <div className="absolute inset-y-0 left-0 w-1.5 bg-amber-500" />
                    <span className="text-2xl shrink-0 select-none">📌</span>
                    <p className="text-slate-700">
                      <strong className="text-amber-600 font-extrabold uppercase tracking-wider text-[11px] block mb-1">Forest Permit & Itinerary Policy</strong>
                      There are certain limitations when it comes to forest permit tickets (only 300 members allowed per day to {(() => {
                        const s = trek.slug.toLowerCase();
                        if (s.includes('nethravathi')) return 'Nethravathi Peak';
                        if (s.includes('kudremukh')) return 'Kudremukh Peak';
                        if (s.includes('kurinjal')) return 'Kurinjal Peak';
                        if (s.includes('gangadikallu')) return 'Gangadikallu Peak';
                        if (s.includes('bandaje')) return 'Bandaje Peak';
                        if (s.includes('kodachadri')) return 'Kodachadri Peak';
                        if (s.includes('dudhsagar')) return 'Dudhsagar Falls';
                        return trek.title.replace(/\s+Trek.*/i, '');
                      })()}). As a result of this, the trek may be conducted either on Saturday or on Sunday. So the Day-1 & Day-2 itineraries may get interchanged without prior notice. Itinerary briefing will be provided at the time of departure.
                    </p>
                  </motion.div>
                )}

                {isTwoDayTrek && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-cyan-500/[0.03] border border-cyan-500/20 p-6 rounded-3xl flex gap-4 text-xs font-semibold leading-relaxed text-slate-700 shadow-sm relative overflow-hidden"
                  >
                    <div className="absolute inset-y-0 left-0 w-1.5 bg-cyan-500" />
                    <span className="text-2xl shrink-0 select-none">🚍</span>
                    <div className="space-y-3">
                      <strong className="text-cyan-600 font-extrabold uppercase tracking-wider text-[11px] block">
                        Important Note – Return & Drop Timings
                      </strong>
                      <ul className="list-disc pl-4 space-y-2 text-slate-650 text-xs font-medium">
                        <li>
                          For all Day 2 (weekend) treks, the return journey begins after the trek, and drop-offs will be on the following morning (typically Monday morning, depending on the itinerary).
                        </li>
                        <li>
                          Our expected drop-off in Bangalore is as per the itinerary. However, delays may occur due to factors beyond our control, such as weather, traffic, road conditions, or unforeseen circumstances.
                        </li>
                        <li>
                          Safety is our priority. If the estimated arrival time falls during hours when public transport is unavailable or unsafe, especially for solo travellers and female participants, we may schedule the final drop by Monday, around 4:00 AM, to ensure safer onward travel.
                        </li>
                        <li>
                          We request all participants to plan their return schedules accordingly and avoid booking time-sensitive commitments immediately after the trek.
                        </li>
                      </ul>
                    </div>
                  </motion.div>
                )}

                {trek.slug === 'munnar-kolukkumalai' && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-amber-500/[0.03] border border-amber-500/20 p-5 rounded-3xl flex gap-4 text-xs font-semibold leading-relaxed text-amber-900 shadow-sm relative overflow-hidden animate-pulse"
                  >
                    <div className="absolute inset-y-0 left-0 w-1.5 bg-amber-500" />
                    <span className="text-2xl shrink-0 select-none">🌅</span>
                    <p className="text-slate-700">
                      <strong className="text-amber-600 font-extrabold uppercase tracking-wider text-[11px] block mb-1">Kolukkumalai Sunrise/Post-Sunrise Notice</strong>
                      Please note that we will be taking you to Kolukkumalai hills either during sunrise or post sunrise. There is no option for participants to choose or switch their batch.
                    </p>
                  </motion.div>
                )}
              </div>
            );
          })()}
        </section>

        {/* ─── FULL SCREEN COMPACT QUOTE ─── */}
        <section className="relative h-[30vh] md:h-[40vh] rounded-[2.5rem] overflow-hidden flex items-center justify-center text-center px-6">
          <div className="absolute inset-0">
             <img 
               src={trek.gallery?.find(u => !u.toLowerCase().endsWith('.mov')) || trek.image} 
               alt={`Mountain views from ${trek.title}`} 
               className="w-full h-full object-cover" 
             />
             <div className="absolute inset-0 bg-brand-dark/50 backdrop-blur-[1px]" />
          </div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative z-10 max-w-2xl space-y-4"
          >
            <p className="text-2xl md:text-3xl lg:text-4xl font-black text-white leading-tight tracking-tighter">
              The mountain calls, <br /> and I <span className="text-brand-orange italic font-serif">must</span> go.
            </p>
            <div className="flex items-center justify-center gap-3">
               <div className="w-6 h-px bg-brand-orange" />
               <span className="text-brand-orange font-black uppercase tracking-[0.3em] text-[8px]">Expedition Diaries</span>
               <div className="w-6 h-px bg-brand-orange" />
            </div>
          </motion.div>
        </section>
        </section>

        {/* ─── SECTION 3: INCLUSIONS ─── */}
        <section id="inclusions" className="space-y-10 scroll-mt-20">
          {/* ─── EXPEDITION PERKS ─── */}
        <section className="space-y-6 md:space-y-8">
          <div className="relative rounded-2xl overflow-hidden p-5 md:p-10 bg-gradient-to-br from-slate-900 via-brand-dark to-slate-900 shadow-xl">
            <div className="absolute inset-0 z-0">
               <img 
                 src={trek.gallery?.find((u, idx) => !u.toLowerCase().endsWith('.mov') && idx > 0) || trek.image} 
                 alt={`Trekking perks at ${trek.title}`} 
                 className="w-full h-full object-cover opacity-20 grayscale" 
               />
               <div className="absolute inset-0 bg-brand-dark/40 backdrop-blur-[2px]" />
            </div>
            <div className="space-y-1 relative z-10">
              <div className="text-brand-orange text-[8px] font-black uppercase tracking-[0.4em] drop-shadow-lg">✨ Included</div>
              <h2 className="text-2xl md:text-4xl font-black text-white tracking-tighter leading-tight drop-shadow-xl">
                Expedition <span className="text-brand-orange-glow italic font-serif">Perks</span>
              </h2>
            </div>
          </div>

          <div className={`grid grid-cols-2 ${isTwoDayWesternGhat ? 'lg:grid-cols-5' : 'lg:grid-cols-4'} gap-3 md:gap-6`}>
            {[
              { icon: '🚌', title: 'Comfortable Transit', desc: 'Round-trip from Bangalore in TT/ Mini bus/ Bus.' },
              { icon: '👤', title: 'Expert Guides', desc: 'Safety-first navigation by certified mountaineers.' },
              { icon: '🎫', title: 'Permissions', desc: 'All forest clearances and entry permits handled.' },
              { icon: '🏅', title: 'Physical Badge', desc: 'A premium physical summit metal badge of honor.' },
              ...(isTwoDayWesternGhat ? [{ icon: '📜', title: 'Accomplished Certificate', desc: 'Official accomplished certificate of achievement.' }] : [])
            ].map((item, i) => (
              <div key={i} className={`group p-4 md:p-6 bg-white border border-slate-100 rounded-2xl hover:shadow-lg transition-all duration-300 ${isTwoDayWesternGhat && i === 4 ? 'col-span-2 lg:col-span-1' : ''}`}>
                <div className="w-10 h-10 md:w-12 md:h-12 bg-slate-50 rounded-xl flex items-center justify-center mb-3 md:mb-4 group-hover:bg-brand-orange/10 transition-all font-bold">
                  <span className="text-xl md:text-2xl">{item.icon}</span>
                </div>
                <h4 className="text-xs md:text-sm font-black text-brand-dark mb-1 group-hover:text-brand-orange transition-colors">{item.title}</h4>
                <p className="text-slate-500 text-[10px] leading-relaxed font-semibold">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── INCLUSIONS & EXCLUSIONS ─── */}
        <section className="space-y-6 md:space-y-10">
          <div className="relative rounded-2xl overflow-hidden p-5 md:p-10 bg-gradient-to-br from-slate-900 via-brand-dark to-slate-900 shadow-xl">
            <div className="absolute inset-0 z-0">
               <img src={trek.image} alt={`Trek inclusions and exclusions for ${trek.title}`} className="w-full h-full object-cover opacity-20 grayscale" />
               <div className="absolute inset-0 bg-brand-dark/40 backdrop-blur-[2px]" />
            </div>
            <div className="space-y-1 relative z-10">
              <div className="text-brand-orange text-[8px] font-black uppercase tracking-[0.4em] drop-shadow-lg">📑 Logistics</div>
              <h3 className="text-2xl md:text-4xl font-black text-white tracking-tighter leading-tight drop-shadow-xl">
                Inclusions & <span className="text-brand-orange-glow italic font-serif">Exclusions</span>
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-12">
            <div className="space-y-4 md:space-y-6 border border-slate-100 bg-white/50 p-4 md:p-5 rounded-2xl md:bg-transparent md:border-none">
              <div className="flex items-center gap-2 border-b border-emerald-500/10 pb-3">
                <span className="text-lg md:text-xl">✅</span>
                <h4 className="text-xs md:text-sm font-black text-brand-dark uppercase tracking-wider">Inclusions</h4>
              </div>
              <ul className="space-y-2 md:space-y-4">
                {trek.inclusions
                  .map((originalItem) => {
                    let item = originalItem;
                    item = item.replace(/Tempo Traveller, Mini Bus, or Bus/g, 'TT/ Mini bus/ Bus');
                    item = item.replace(/Tempo Traveller \/ Mini Bus \/ Bus/gi, 'TT/ Mini bus/ Bus');
                    item = item.replace(/Tempo Traveller/gi, 'TT/ Mini bus/ Bus');
                    item = item.replace(/Tempo Travelers/gi, 'TT/ Mini bus/ Bus');
                    if (isTwoDayWesternGhat) {
                      item = item.replace(/(Complimentary\s+)?participation\s+badge\s+or\s+certificate/gi, 'Complimentary participation badge & Accomplished Certificate');
                    } else {
                      item = item.replace(/(Completion\s+)?certificate\s+&\s+/gi, '');
                      item = item.replace(/(Completion\s+)?Certificate\s+&\s+/gi, '');
                      item = item.replace(/(Complimentary\s+)?participation\s+badge\s+or\s+certificate/gi, 'Complimentary participation badge');
                    }
                    return item;
                  })
                  .filter((item) => {
                    if (isTwoDayWesternGhat) return true;
                    const lower = item.toLowerCase();
                    return !['e-certificate of achievement', 'e-certificate', 'accomplished certificate', 'certificate', 'accomplished certificate of achievement'].includes(lower);
                  })
                  .map((item, idx) => {
                    return (
                      <li key={idx} className="flex gap-2 group">
                        <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 group-hover:bg-emerald-500 group-hover:text-white transition-all text-emerald-600">
                          <span className="text-[8px] font-black">✓</span>
                        </div>
                        <p className="text-slate-755 font-bold text-[10px] md:text-xs leading-relaxed">{item}</p>
                      </li>
                    );
                  })}
              </ul>
            </div>

            <div className="space-y-4 md:space-y-6 border border-slate-100 bg-white/50 p-4 md:p-5 rounded-2xl md:bg-transparent md:border-none">
              <div className="flex items-center gap-2 border-b border-red-500/10 pb-3">
                <span className="text-lg md:text-xl">❌</span>
                <h4 className="text-xs md:text-sm font-black text-brand-dark uppercase tracking-wider">Exclusions</h4>
              </div>
              <ul className="space-y-2 md:space-y-4">
                {trek.exclusions.map((item, idx) => (
                  <li key={idx} className="flex gap-2 group">
                    <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-red-50 border border-red-100 flex items-center justify-center shrink-0 group-hover:bg-red-500 group-hover:text-white transition-all text-red-600">
                      <span className="text-[8px] font-black">✕</span>
                    </div>
                    <p className="text-slate-755 font-bold text-[10px] md:text-xs leading-relaxed">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
        </section>

        {/* ─── SECTION 5: WHAT TO PACK (CHECKLIST) ─── */}
        <section id="what-to-pack" className="bg-slate-900 text-white p-6 md:p-14 rounded-3xl md:rounded-[3rem] relative overflow-hidden scroll-mt-20">
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(232,117,26,0.1),transparent)]" />
          
          <div className="relative z-10 grid lg:grid-cols-3 gap-6 md:gap-12 items-center">
            <div className="space-y-3">
              <div className="space-y-1">
                <div className="text-brand-orange text-[8px] font-black uppercase tracking-[0.4em]">🎒 Checklist</div>
                <h2 className="text-2xl md:text-4xl font-black tracking-tighter leading-none">Gear Up for <br className="hidden md:block" /> the Wild</h2>
              </div>
              <p className="text-white/45 font-bold text-[10px] md:text-[11px] leading-relaxed max-w-xs">Pack light, pack smart. Essential checklist for the rugged trails.</p>
              <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-white/50 text-[9px] leading-tight">
                💡 Wear full trekking pants to avoid scratches.
              </div>
            </div>

            <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {trek.thingsToCarry.map((item, i) => {
                const getIcon = (text: string) => {
                  const t = text.toLowerCase();
                  if (text.includes('shoe') || t.includes('hiking') || t.includes('sturdy') || t.includes('footwear')) return '🥾';
                  if (t.includes('torch') || t.includes('headlamp')) return '🔦';
                  if (t.includes('water') || t.includes('bottle')) return '💧';
                  if (t.includes('jacket') || t.includes('sweater') || t.includes('clothes') || t.includes('wear') || t.includes('pant')) return '🧥';
                  if (t.includes('id') || t.includes('proof') || t.includes('pan') || t.includes('dl') || t.includes('voter') || t.includes('govt')) return '🪪';
                  if (t.includes('medication') || t.includes('aid') || t.includes('kit')) return '🩹';
                  if (t.includes('power') || t.includes('charger') || t.includes('battery')) return '🔋';
                  if (t.includes('bag') || t.includes('pack') || t.includes('polybag')) return '🎒';
                  if (t.includes('rain') || t.includes('umbrella') || t.includes('poncho') || t.includes('coat') || t.includes('essential')) return '☔';
                  if (t.includes('toiletries') || t.includes('brush') || t.includes('brush') || t.includes('soap')) return '🪥';
                  if (t.includes('snack') || t.includes('fruit') || t.includes('snack') || t.includes('food') || t.includes('energy')) return '🍎';
                  if (t.includes('stick') || t.includes('pole') || t.includes('staff')) return '🦯';
                  return '🌲';
                };
                return (
                  <div key={i} className="flex items-center gap-2 bg-white/5 border border-white/5 hover:bg-white/10 hover:border-brand-orange/30 p-2 rounded-xl transition-all duration-350">
                    <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center shrink-0 text-base">
                      {getIcon(item)}
                    </div>
                    <p className="font-semibold text-[10px] leading-tight text-white/90">{item}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── WHY CHOOSE US ─── */}
        <section className="space-y-10">
          <div className="relative rounded-2xl overflow-hidden p-6 md:p-10 bg-slate-100">
            <div className="space-y-1 relative z-10">
              <div className="text-brand-orange text-[8px] font-black uppercase tracking-[0.4em]">🌟 Expertise</div>
              <h3 className="text-3xl md:text-4xl font-black text-brand-dark tracking-tighter leading-tight">
                Why Choose <span className="text-brand-orange italic font-serif">Adventure Chaarana?</span>
              </h3>
            </div>
          </div>
          
          <div className="bg-white border border-slate-100 rounded-3xl p-8 md:p-12 shadow-sm space-y-8">
            <div className="grid md:grid-cols-2 gap-12 font-medium text-slate-600 leading-relaxed">
              <div className="space-y-6">
                <p>
                  With roots in raw exploration, <span className="text-brand-dark font-black">Adventure Chaarana</span> has dedicated the last three years to carving authentic paths through the Himalayas, the emerald Western Ghats, and the sprawling Sahyadris.
                </p>
                <p>
                  Our mission is to bridge the gap between people and the peaks—serving a diverse community of solo souls, families, and corporate teams. Led by <span className="text-brand-dark font-black">Certified Mountaineers and Emergency Responders</span>, we prioritize your safety so you can focus on the summit.
                </p>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { icon: '🚭', text: 'Sober Trails & Pure Air' },
                    { icon: '🌱', text: 'Conscious Footprints' },
                    { icon: '👩', text: 'Inclusive Leadership' },
                    { icon: '🛡️', text: 'Safety-Obsessed Ethics' },
                    { icon: '🚺', text: 'Safe for Solo Souls' },
                    { icon: '💰', text: 'Grit Over Gold' }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-xs">
                      <span className="text-xl">{item.icon}</span>
                      <span className="font-bold text-slate-700">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── TREK SPECIFIC GALLERY ─── */}
        <div id="trek-gallery-section" className="scroll-mt-20">
          <TrekGallery trek={trek} />
        </div>

        {/* ─── POLICY ─── */}
        <section className="space-y-10">
          <div className="relative rounded-2xl overflow-hidden p-6 md:p-10 bg-gradient-to-br from-slate-900 via-brand-dark to-slate-900 shadow-2xl">
            <div className="absolute inset-0 z-0">
               <img src={trek.image} alt={`Booking policy background for ${trek.title}`} className="w-full h-full object-cover opacity-20 grayscale" />
               <div className="absolute inset-0 bg-brand-dark/40 backdrop-blur-[2px]" />
            </div>
            <div className="space-y-1 relative z-10">
              <div className="text-brand-orange text-[8px] font-black uppercase tracking-[0.4em] drop-shadow-lg">📄 Policy</div>
              <h3 className="text-3xl md:text-4xl font-black text-white tracking-tighter leading-tight drop-shadow-xl">
                Rules & <span className="text-brand-orange-glow italic font-serif">Guidelines</span>
              </h3>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { 
                icon: '⚖️', 
                label: 'Reservation Policy', 
                desc: isOneDayTrek 
                  ? 'Bookings for One Day Treks are strictly non-refundable. However, free slot rescheduling is allowed up to 24 hours before departure.' 
                  : 'Prioritize your slot. Cancellations 72h prior incur a 45% fee. No-shows or last-minute changes (within 72h) are strictly non-refundable.' 
              },
              { icon: '⛈️', label: 'Unforeseen Circumstances', desc: 'Safety first! Full refunds (minus standard fees) issued if trips are cancelled by us due to natural events or government restrictions.' },
              { icon: '🚧', label: 'On-the-Road Logic', desc: 'We aren\'t responsible for delays caused by traffic, weather, or sudden local authority changes once the journey has begun.' },
              { icon: '🚫', label: 'Conduct Code', desc: 'We are a strictly dry/smoke-free community. Any substance use will lead to immediate removal and a permanent ban from our trips.' },
              { icon: '⏱️', label: 'Time Integrity', desc: 'Our departures are precise. To respect everyone\'s time and catch the views, the bus will leave exactly as scheduled.' },
              { icon: '🧤', label: 'Nature First', desc: 'Leave nothing behind but footprints. Strictly no littering; help us keep the mountains pristine by carrying your waste back.' }
            ].map((item, i) => (
              <div key={i} className="p-6 bg-slate-50 rounded-xl flex items-start gap-4 hover:bg-white hover:shadow-xl hover:shadow-slate-100 transition-all border border-transparent hover:border-slate-100">
                <span className="text-3xl shrink-0 p-1 bg-white rounded-xl shadow-sm">{item.icon}</span>
                <div className="space-y-1">
                  <h6 className="font-bold text-brand-dark">{item.label}</h6>
                  <p className="text-slate-600 text-xs md:text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── TERMS & CONDITIONS ─── */}
        <section className="space-y-10">
          <div className="relative rounded-2xl overflow-hidden p-6 md:p-10 bg-slate-100">
            <div className="space-y-1 relative z-10">
              <div className="text-brand-orange text-[8px] font-black uppercase tracking-[0.4em]">⚖️ Agreement</div>
              <h3 className="text-3xl md:text-4xl font-black text-brand-dark tracking-tighter leading-tight">
                Terms & <span className="text-brand-orange italic font-serif">Conditions</span>
              </h3>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 text-slate-705">
            <div className="space-y-8">
              <div className="space-y-4">
                <h5 className="font-black text-brand-dark uppercase tracking-tight flex items-center gap-2">
                  <span className="w-2 h-2 bg-brand-orange rounded-full" />
                  Important Note
                </h5>
                <ul className="space-y-3 text-xs md:text-sm font-medium leading-relaxed list-disc pl-4 marker:text-brand-orange text-slate-705">
                  <li>If you want the Trip to be a memorable experience, you need to cooperate with your Trip captain.</li>
                  <li>Strictly no drinking & smoking during the entire duration of trip.</li>
                  <li>Do not create any nuisances on the way by throwing any kind of plastic waste.</li>
                  <li>Sometimes local authorities might restrict entry. Adventure Chaarana will try to make alternate arrangements but is not responsible for authorities' decisions.</li>
                  <li>You will be responsible for your belongings.</li>
                  <li>Arrival might be delayed due to heavy rains, traffic, or other unavoidable circumstances.</li>
                  <li>Do not expect luxury in accommodation. Hot water and campfire are weather-dependent.</li>
                  <li>Mandatory signing of Medical, Risk, and Indemnity forms before starting. Under 18 requires parental consent.</li>
                  <li>No medical/accidental insurance included. It is highly recommended to have insurance.</li>
                  <li>Expect to be out of your comfort zone; no luxury facilities.</li>
                  <li>Views depend on weather conditions, not just what's on social media.</li>
                  <li>Do not enter water bodies/falls without the Trip captain’s permission.</li>
                  <li>Stay with the group at all times; inform lead before separating. Participants wandering separately must formally discontinue the trip by providing an official message.</li>
                  <li>Adventure Chaarana reserves the right to cancel a batch if minimum participants are not reached. Refunds will be issued excluding gateway fees.</li>
                  <li>Seat allocation is first-come, first-served at boarding.</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h5 className="font-black text-brand-dark uppercase tracking-tight flex items-center gap-2">
                  <span className="w-2 h-2 bg-brand-orange rounded-full" />
                  Code of Conduct & Environment
                </h5>
                <div className="space-y-4 text-xs md:text-sm font-medium leading-relaxed text-slate-705">
                  <p>Participants need to respect the ethnicity, culture, environment of the place of visit & fellow trekkers. Any behavior deemed disrespectful, harmful, or illegal may result in immediate expulsion without refund.</p>
                  <p>Littering, damaging, or any illegal activities that harm the ecosystem is strictly prohibited. We maintain a strict "Leave No Trace" policy.</p>
                </div>
              </div>

              <div className="space-y-4">
                <h5 className="font-black text-brand-dark uppercase tracking-tight flex items-center gap-2">
                  <span className="w-2 h-2 bg-brand-orange rounded-full" />
                  Emergency & Risks
                </h5>
                <div className="space-y-4 text-xs md:text-sm font-medium leading-relaxed text-slate-705">
                  <p className="font-bold text-slate-900 mb-2">Natural Hazards:</p>
                  <ul className="list-disc pl-4 space-y-1.5 text-slate-600 text-xs md:text-sm">
                    <li>Extreme weather (rain, flash floods, thunderstorms, lighting)</li>
                    <li>Wildlife encounters (bears, snakes, insects) or harmful plants</li>
                    <li>Natural disasters (landslides, earthquakes, whiteouts)</li>
                  </ul>
                  <p className="font-bold text-slate-900 mb-2 mt-4 text-xs md:text-sm">Altitude & Physical Injury:</p>
                  <ul className="list-disc pl-4 space-y-1.5 text-slate-600 text-xs md:text-sm">
                    <li>AMS, Pulminary Edema (HAPE), Cerebral Edema (HACE)</li>
                    <li>Slips, falls, exposure to sun/cold (frostbite, hypothermia)</li>
                    <li>Difficulty in emergency evacuation from remote locations</li>
                  </ul>
                  <p className="mt-4 italic">In the event of illness or accident, all medical/hospital/repatriation expenses are the participant's responsibility.</p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
               <div className="p-8 bg-slate-900 rounded-[2rem] text-white space-y-6">
                  <h5 className="font-black text-brand-orange uppercase tracking-widest text-xs">Preparation Guidelines</h5>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <p className="text-xs font-black uppercase text-white/50 tracking-widest">Prepare 15 days before:</p>
                      <ul className="text-xs md:text-sm list-disc pl-4 space-y-1.5 text-white/80">
                        <li>Brisk walk/jog 10-12 km daily</li>
                        <li>Stair climbing (10-15 floors)</li>
                        <li>Strength training for legs/core</li>
                        <li>Cardio: Running, Cycling, Swimming</li>
                        <li>Consult a doctor before joining</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs font-black uppercase text-white/50 tracking-widest">30 Days Before (Avoid):</p>
                      <ul className="text-xs md:text-sm list-disc pl-4 space-y-1.5 text-white/80">
                        <li>Smoking, Alcohol, Vaping</li>
                        <li>Sleep Deprivation & Junk Food</li>
                        <li>Sudden intense new workouts</li>
                      </ul>
                    </div>
                  </div>
               </div>

               <div className="space-y-4">
                 <h5 className="font-black text-brand-dark uppercase tracking-tight flex items-center gap-2">
                   <span className="w-2 h-2 bg-brand-orange rounded-full" />
                   Termination Policy
                 </h5>
                 <p className="text-xs md:text-sm font-medium leading-relaxed text-slate-705">
                   Adventure Chaarana reserves the right to terminate a participant's trip for:
                   <span className="block mt-2 font-bold text-red-500 underline underline-offset-4 decoration-red-500/20 text-xs md:text-sm">Smoking, drinking, sexual misconduct, physical/verbal abuse, lack of fitness affecting the team, or ignoring safety rules.</span>
                   No refunds will be provided in case of termination.
                 </p>
               </div>

               <div className="p-6 border-2 border-brand-orange/20 rounded-2xl bg-brand-orange/5">
                 <h6 className="font-black text-brand-orange uppercase tracking-tight text-xs mb-2">Photography Rights</h6>
                 <p className="text-xs md:text-sm font-medium text-slate-600 leading-relaxed italic">
                   Adventure Chaarana reserves the right to use trip photos/videos for promotional purposes. Booking grants us a royalty-free license. If you wish to opt-out, notify us before the journey starts.
                 </p>
               </div>

               <div className="space-y-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                 <h5 className="font-black text-slate-900 uppercase tracking-tight text-xs">Liability Clause</h5>
                 <p className="text-xs md:text-sm font-medium text-slate-600 leading-relaxed">
                   Participants join at their own risk. Adventure Chaarana is not liable for injuries, accidents, death, or loss of personal belongings. Insurance is mandatory.
                 </p>
               </div>

               <div className="p-6 bg-brand-orange/10 border-2 border-brand-orange rounded-2xl">
                 <p className="text-xs md:text-sm font-black text-brand-orange leading-relaxed uppercase tracking-tight">
                   Important: Due to unforeseen circumstances such as natural disasters, roadblocks, local unrest, government mandates, or severe traffic, certain locations in the itinerary may become inaccessible. In such events, Adventure Chaarana shall not be held liable, and no refunds, alternative arrangements, or compensatory claims will be provided.
                 </p>
               </div>
            </div>
          </div>
        </section>
        {/* ─── PROMINENT CANCELLATION POLICY ─── */}
        <section id="cancellation" className="space-y-10 pt-4 scroll-mt-20">
          <div className="bg-white border-2 border-brand-orange/20 rounded-[2.5rem] p-6 md:p-12 shadow-[0_20px_50px_rgba(249,115,22,0.06)] space-y-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-red-500 via-brand-orange to-sky-500" />
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-100 pb-6">
              <div className="space-y-2">
                <span className="bg-brand-orange/10 text-brand-orange font-extrabold text-xs uppercase tracking-[0.25em] px-3 py-1 rounded-full border border-brand-orange/15 inline-block font-sans">
                  Booking Safeguards
                </span>
                <h4 className="text-2xl md:text-3xl font-black text-brand-dark tracking-tight leading-none font-sans">
                  Official Refund & <span className="text-brand-orange italic font-serif">Cancellation Policy</span>
                </h4>
              </div>
              <p className="text-xs md:text-sm text-slate-500 font-bold max-w-sm leading-relaxed uppercase tracking-tight md:text-right font-sans">
                🛡️ Verified transparent refund rates and conditions governing your booking.
              </p>
            </div>

            {isOneDayTrek ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch max-w-4xl mx-auto">
                {/* One Day Trek Card 1: No Refund */}
                <div className="p-6 rounded-3xl bg-rose-50 border border-rose-200 hover:border-red-300 transition-all duration-300 space-y-4 flex flex-col justify-between group">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black uppercase tracking-widest bg-red-600 text-white px-3.5 py-1.5 rounded-full font-sans tracking-tight">
                        CANCELLATION
                      </span>
                      <span className="text-xl">🚨</span>
                    </div>
                    <h6 className="font-extrabold text-brand-dark text-sm md:text-base uppercase tracking-wider font-sans">Payment Safeguard</h6>
                    <p className="text-3xl font-black text-red-600 tracking-tight leading-none font-sans">No refund</p>
                  </div>
                  <p className="text-xs md:text-sm text-slate-700 font-semibold leading-relaxed pt-2 border-t border-rose-100 font-sans">
                    Bookings for all One Day treks are strictly non-refundable under any conditions. No cash refunds or payment reversals.
                  </p>
                </div>

                {/* One Day Trek Card 2: Rescheduling Allowed */}
                <div className="p-6 rounded-3xl bg-emerald-50 border border-emerald-200 hover:border-emerald-300 transition-all duration-300 space-y-4 flex flex-col justify-between group">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black uppercase tracking-widest bg-emerald-600 text-white px-3.5 py-1.5 rounded-full font-sans tracking-tight">
                        DATE MODIFICATION
                      </span>
                      <span className="text-xl">🔄</span>
                    </div>
                    <h6 className="font-extrabold text-brand-dark text-sm md:text-base uppercase tracking-wider font-sans">Slot Transfer</h6>
                    <p className="text-3xl font-black text-emerald-600 tracking-tight leading-none font-sans">Rescheduling Allowed</p>
                  </div>
                  <p className="text-xs md:text-sm text-slate-700 font-semibold leading-relaxed pt-2 border-t border-emerald-100 font-sans">
                    You can reschedule your trek or transfer slots up to <span className="text-emerald-700 font-black">24 hours before your scheduled departure time</span>.
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                {/* Card 1: Within 72 Hours */}
                <div className="p-6 rounded-3xl bg-rose-50 border border-rose-200 hover:border-red-300 transition-all duration-300 space-y-4 flex flex-col justify-between group">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black uppercase tracking-widest bg-red-600 text-white px-3.5 py-1.5 rounded-full font-mono">
                        Within 72 Hrs
                      </span>
                      <span className="text-xl">🚨</span>
                    </div>
                    <h6 className="font-extrabold text-brand-dark text-sm md:text-base uppercase tracking-wider font-sans">Strict Protection Period</h6>
                    <p className="text-3xl font-black text-red-600 tracking-tight leading-none font-sans">0% Refund</p>
                  </div>
                  <p className="text-xs md:text-sm text-slate-700 font-semibold leading-relaxed pt-2 border-t border-rose-100 font-sans">
                    No refund, no credit voucher & no rescheduling — <span className="text-red-700 font-extrabold underline decoration-wavy underline-offset-2">no exceptions</span>.
                  </p>
                </div>

                {/* Card 2: BEFORE 72 HOURS (ULTRA PROMINENT / TOTALLY VISIBLE) */}
                <div className="p-7 rounded-[2rem] bg-amber-50 border-2 border-amber-400 shadow-[0_15px_45px_rgba(245,158,11,0.15)] transform md:-translate-y-1 hover:-translate-y-2 transition-all duration-300 space-y-4 flex flex-col justify-between relative overflow-hidden z-20">
                  <div className="absolute top-0 right-0 bg-amber-500 text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-bl-2xl shadow-sm font-sans">
                    ⚠️ ACTIVE OPTION
                  </div>
                  <div className="space-y-3 relative">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black uppercase tracking-widest bg-amber-500 text-white px-4 py-1.5 rounded-full font-sans font-extrabold animate-pulse">
                        Before 72 Hours
                      </span>
                      <span className="text-2xl">⏳</span>
                    </div>
                    <h6 className="font-extrabold text-amber-955 text-sm md:text-base uppercase tracking-wider font-sans">Cancellation in Advance</h6>
                    <p className="text-3xl font-black text-amber-600 tracking-tight leading-none font-sans">45% Fee</p>
                  </div>
                  <div className="space-y-2 pt-3 border-t border-amber-200 text-slate-700 font-sans">
                    <p className="text-xs md:text-sm font-bold leading-relaxed">
                      Charges are limited to <span className="text-amber-600 font-black">45% of overall price</span>.
                    </p>
                    <p className="text-xs md:text-sm text-slate-600 font-medium leading-relaxed">
                      Enjoy refund execution processed directly back to source in <span className="underline decoration-dotted font-bold text-slate-700">5–7 working days</span>. No rescheduling.
                    </p>
                  </div>
                </div>

                {/* Card 3: Natural Calamity */}
                <div className="p-6 rounded-3xl bg-sky-50 border border-sky-200 hover:border-sky-300 transition-all duration-300 space-y-4 flex flex-col justify-between group">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black uppercase tracking-widest bg-sky-600 text-white px-3.5 py-1.5 rounded-full font-mono font-sans">
                        Calamity Cover
                      </span>
                      <span className="text-xl">⛈️</span>
                    </div>
                    <h6 className="font-extrabold text-[#0f0f0f] text-sm md:text-base uppercase tracking-wider font-sans">Force Majeure</h6>
                    <p className="text-2xl font-black text-sky-700 tracking-tight leading-none font-sans font-extrabold">50/50 Coverage Plan</p>
                  </div>
                  <p className="text-xs md:text-sm text-slate-700 font-semibold leading-relaxed pt-2 border-t border-sky-100 font-sans">
                    50% Cash refund + 50% travel voucher valid for 12 months. GST & gateway charges apply.
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ─── SECTION 6: FAQS (ACCORDION) ─── */}
        <section id="faqs" className="space-y-8 scroll-mt-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/80 pb-6">
            <div className="space-y-2">
              <span className="text-brand-orange text-[9px] font-black uppercase tracking-[0.3em] block">
                ❓ Clarifications & Answers
              </span>
              <h3 className="text-3xl md:text-4xl font-black text-brand-dark tracking-tight leading-none">
                Frequently Asked <span className="text-brand-orange italic font-serif">Questions</span>
              </h3>
            </div>
            <p className="text-xs md:text-sm text-slate-500 font-bold max-w-sm leading-relaxed md:text-right">
              Everything you need to know about the trail, bookings, inclusions, and community standards.
            </p>
          </div>

          <div className="space-y-3 max-w-4xl mx-auto">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className={`border rounded-2xl transition-all duration-200 overflow-hidden ${
                    isOpen 
                      ? 'border-brand-orange/40 bg-white shadow-md shadow-brand-orange/5' 
                      : 'border-slate-200/80 bg-white/70 hover:bg-white hover:border-slate-300 shadow-xs'
                  }`}
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        isOpen ? 'bg-brand-orange text-white' : 'bg-slate-100 text-slate-500'
                      }`}>
                        <HelpCircle size={17} />
                      </div>
                      <span className="font-extrabold text-sm md:text-base text-slate-900 tracking-tight">
                        {faq.q}
                      </span>
                    </div>
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-slate-400 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-brand-orange' : ''
                    }`}>
                      <ChevronDown size={18} />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-6 sm:px-6 pt-0 text-slate-650 text-xs md:text-sm leading-relaxed border-t border-slate-100 font-medium pl-14 sm:pl-16">
                          <p className="pt-3">{faq.a}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

        {/* ─── INSTAGRAM & WHATSAPP SOCIAL HUB ─── */}
        <section className="space-y-10 pt-4">
          <div className="text-center space-y-2 max-w-lg mx-auto">
            <span className="text-brand-orange text-[9px] font-black uppercase tracking-[0.3em] block mb-1">💬 Connect Live</span>
            <h3 className="text-3xl md:text-4xl font-black italic tracking-tight text-brand-dark">Stay Close to the <span className="text-brand-orange">Action</span></h3>
            <p className="text-slate-500 text-xs md:text-sm font-semibold leading-relaxed">
              Explore our historic trail diaries, active trek stories, and book slots instantly with our adventure leads.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto w-full">
            {/* Instagram Card */}
            <a 
              href="https://www.instagram.com/adventure_chaarana/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center text-center p-8 bg-gradient-to-b from-[#1E112A] to-slate-950 border border-slate-800/50 hover:border-pink-500/30 rounded-[2rem] hover:shadow-[0_20px_40px_rgba(219,39,119,0.06)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group"
            >
              {/* Decorative radial blur gradient */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full blur-[40px] pointer-events-none group-hover:bg-pink-500/20 transition-all duration-300" />
              
              <div className="w-16 h-16 bg-gradient-to-tr from-yellow-500 via-red-500 to-pink-500 text-white rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-[0_8px_30px_rgb(236,72,153,0.3)]">
                <Instagram size={32} />
              </div>
              
              <h4 className="text-[10px] font-black text-pink-400 uppercase tracking-widest mb-1.5">Instagram page</h4>
              <p className="text-2xl font-black text-white hover:text-pink-400 transition-colors">@adventure_chaarana</p>
              <span className="text-white/40 text-[11px] font-medium leading-relaxed max-w-xs mt-3">
                Watch our latest reels, raw expedition videos, and join a vibrant trekking family.
              </span>
            </a>

            {/* WhatsApp Card */}
            <a 
              href="https://wa.me/919980489494?text=Hi!%20I'm%20interested%20in%20your%20treks."
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center text-center p-8 bg-gradient-to-b from-[#0B1E13] to-slate-950 border border-slate-800/50 hover:border-[#25D366]/30 rounded-[2rem] hover:shadow-[0_20px_40px_rgba(37,211,102,0.06)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group"
            >
              {/* Decorative radial blur gradient */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#25D366]/10 rounded-full blur-[40px] pointer-events-none group-hover:bg-[#25D366]/20 transition-all duration-300" />
              
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-305 overflow-hidden shadow-[0_8px_30px_rgba(37,211,102,0.2)]">
                <img 
                  src="https://res.cloudinary.com/dofg6bsom/image/upload/v1779808098/2ef2dd8a-fad0-482b-95d7-19e047dfae07.png" 
                  alt="WhatsApp Logo" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              <h4 className="text-[10px] font-black text-[#25D366] uppercase tracking-widest mb-1.5">Direct WhatsApp query</h4>
              <p className="text-2xl font-black text-white hover:text-[#25D366] transition-colors">9980489494</p>
              <span className="text-white/40 text-[11px] font-medium leading-relaxed max-w-xs mt-3">
                Get lightning-fast assistance with payments, custom pickup requests, corporate bookings, or peak availability updates.
              </span>
            </a>
          </div>
        </section>
      </div>

      {/* ─── FLOATING CTA ─── */}
      <div className="fixed bottom-6 left-0 right-0 z-[60] px-6 pointer-events-none">
        <div className="max-w-md mx-auto flex items-center gap-3 pointer-events-auto">
          {trek.itineraryPdf && (
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              disabled={isDownloadingPdf}
              onClick={() => handleDownloadItineraryPdf(trek.itineraryPdf!, trek.title)}
              className="bg-slate-900/95 backdrop-blur-md text-white px-4 py-4 rounded-2xl font-black text-xs uppercase tracking-wider shadow-2xl flex items-center justify-center gap-2 border border-white/20 hover:bg-black transition-all cursor-pointer shrink-0"
              title="Download Itinerary PDF"
            >
              {isDownloadingPdf ? (
                <Loader2 size={16} className="animate-spin text-brand-orange" />
              ) : downloadSuccess ? (
                <Check size={16} className="text-emerald-400 stroke-[3]" />
              ) : (
                <Download size={16} className="text-brand-orange" />
              )}
              <span className="hidden sm:inline">PDF</span>
            </motion.button>
          )}
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              const upcoming = getUpcomingBatches(trek);
              const nextBatchInfo = upcoming.length > 0 ? ` (Upcoming Batch: ${upcoming[0].start} - ${upcoming[0].end})` : '';
              const message = `I want to book the ${trek.title} Expedition${nextBatchInfo}! 🧗`;
              window.open(`https://wa.me/919980489494?text=${encodeURIComponent(message)}`, '_blank');
            }}
            className="flex-1 bg-[#25D366] text-white py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl flex items-center justify-center gap-3 relative overflow-hidden border border-white/20"
          >
            <img src="https://res.cloudinary.com/dofg6bsom/image/upload/v1779808098/2ef2dd8a-fad0-482b-95d7-19e047dfae07.png" alt="WA" className="w-6 h-6 object-contain" referrerPolicy="no-referrer" />
            Confirm My Slot
          </motion.button>
        </div>
      </div>


    </motion.div>
  );
};
