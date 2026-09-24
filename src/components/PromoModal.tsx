import { Sun, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const PromoModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative bg-white rounded-[32px] overflow-hidden shadow-2xl max-w-sm w-full border border-slate-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Design Element */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-orange-100 rounded-full blur-3xl opacity-50" />
            {/* Content */}
            <div className="p-8 md:p-10 space-y-6 md:space-y-8">
              {/* Header / Close Button */}
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full transition-all z-10 group"
              >
                <X size={20} className="text-slate-400 group-hover:text-slate-900 group-hover:rotate-90 transition-transform" />
              </button>

              <div className="flex justify-center">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-orange-50 rounded-2xl md:rounded-3xl flex items-center justify-center border border-orange-100 shadow-inner">
                   <Sun size={32} className="text-[#f2711c]" strokeWidth={2.5} />
                </div>
              </div>

              <div className="text-center space-y-3">
                <p className="text-[#f2711c] font-black uppercase tracking-[0.3em] text-[8px] md:text-[10px]">Group Special</p>
                <h3 className="text-3xl md:text-4xl font-black text-slate-900 leading-[1.1] tracking-tight">
                  ₹200 Group Discount <br/>
                  <span className="text-[#f15a24] italic uppercase text-xl">for groups above 5 people</span>
                </h3>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl text-center border border-slate-100 relative overflow-hidden group">
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                <p className="text-slate-600 font-bold leading-relaxed relative z-10">
                  Join with your team (5+ members) and save! <br/> 
                  <span className="text-slate-900 font-black uppercase tracking-widest text-xs">Available on all 2-Day Western Ghats expeditions</span>.
                </p>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  const message = "Hi! I'd like to claim the ₹200 group discount for groups of more than 5. How can I proceed?";
                  const waUrl = `https://wa.me/919980489494?text=${encodeURIComponent(message)}`;
                  window.open(waUrl, '_blank');
                  onClose();
                }}
                className="w-full bg-[#f2711c] text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-orange-500/20 hover:shadow-orange-500/40 transition-shadow"
              >
                Claim Reward
              </motion.button>
              
              <p className="text-[9px] text-center text-slate-400 font-black uppercase tracking-[0.2em]">
                * Limited slots · Subject to availability
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
