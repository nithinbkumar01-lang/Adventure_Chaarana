import { useNavigate, useLocation } from 'react-router-dom';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const IndependenceDayBanner = ({
  isOpen,
  onClose
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isDetailsPage = location.pathname.startsWith('/trek/');

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          className={`${isDetailsPage ? 'relative' : 'fixed top-0 left-0 right-0'} z-50 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white border-b border-orange-500/25 shadow-md overflow-hidden`}
          aria-label="Independence Day Special Announcement"
        >
          {/* Subtle Tricolor Top Accent Line */}
          <div className="h-[2px] w-full bg-gradient-to-r from-[#ff9933] via-white to-[#138808]" />

          <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2 flex items-center justify-between gap-2.5 sm:gap-4">
            {/* Promo Text & Badge */}
            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-wider bg-orange-500/20 text-orange-400 border border-orange-500/30 shrink-0">
                🇮🇳 Independence Day Special
              </span>
              <p className="text-[11px] sm:text-xs font-semibold text-slate-200 truncate">
                <span className="text-white font-extrabold">Uttari Betta Sunrise Trek</span> at just{' '}
                <span className="text-emerald-400 font-black text-xs sm:text-sm">₹499/person</span>!
                <span className="hidden md:inline text-slate-400 font-medium ml-1.5">(Limited festival slots available)</span>
              </p>
            </div>

            {/* Actions: Direct Link & Close Button */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <button
                id="banner-book-uttari-btn"
                onClick={() => navigate('/trek/uttari-betta-sunrise-trek')}
                className="px-3 sm:px-4 py-1 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-wider bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
              >
                Book at ₹499
              </button>

              <button
                id="close-independence-banner"
                onClick={onClose}
                aria-label="Close Independence Day Banner"
                className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};
