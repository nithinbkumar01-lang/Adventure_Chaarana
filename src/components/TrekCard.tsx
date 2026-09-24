import { useNavigate } from 'react-router-dom';
import { Clock, MapPin, Heart, ArrowRight, Mountain, Calendar, Download } from 'lucide-react';
import { motion } from 'motion/react';
import type { Trek } from '../../shared/types/trek';

export const TrekCard = ({ trek }: { trek: Trek }) => {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      layout
      onClick={() => navigate(`/trek/${trek.slug}`)}
      className="bg-white rounded-[2.5rem] overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_100px_-20px_rgba(37,211,102,0.15)] transition-all duration-500 border border-slate-100 group flex flex-col h-full w-full cursor-pointer relative"
    >
      <div className="relative aspect-[4/3] overflow-hidden m-3 rounded-[2rem]">
        <img 
          src={trek.image} 
          alt={`Trek Expedition: ${trek.title} - ${trek.location}`} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s]"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-md px-4 py-2 rounded-2xl flex items-center gap-2 shadow-sm border border-white/20">
          <Mountain size={14} className="text-brand-orange" />
          <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">{trek.category.replace('-', ' ')}</span>
        </div>
        {trek.discount && (
          <div className="absolute top-4 right-4 bg-brand-orange text-white px-3.5 py-1.5 rounded-2xl flex items-center shadow-[0_8px_20px_rgba(249,115,22,0.3)] border border-white/15">
            <span className="text-[9px] font-black tracking-widest uppercase">{trek.discount}</span>
          </div>
        )}
        {trek.itineraryPdf && (
          <div className="absolute bottom-4 left-4 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-md border border-white/15 text-white text-[9px] font-black uppercase tracking-wider">
            <Download size={11} className="text-emerald-400" />
            <span>PDF Ready</span>
          </div>
        )}
      </div>
      
      <div className="p-8 pt-4 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-6">
          <h3 className="font-black text-2xl text-slate-900 leading-tight group-hover:text-brand-orange transition-colors pr-4">
            {trek.title}
          </h3>
          <div className="bg-slate-50 text-slate-400 p-2 rounded-xl">
             <Heart size={18} />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2 text-slate-400">
            <MapPin size={16} />
            <span className="text-xs font-bold truncate">{trek.location}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <Clock size={16} />
            <span className="text-xs font-bold">{trek.duration}</span>
          </div>
        </div>

        {/* Departure Schedule Highlight */}
        <div className="mb-6 flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-2xl bg-slate-50 border border-slate-100 text-[11px] font-bold">
          <div className="flex items-center gap-2 text-slate-700">
            <Calendar size={14} className="text-brand-orange shrink-0" />
            <span className="text-[11px] font-extrabold text-slate-800">
              {trek.duration.toLowerCase().includes('1 day') ? 'Saturday Departure' : 'Friday Departure'}
            </span>
          </div>
          <span className="text-[9px] font-black uppercase tracking-wider text-brand-orange bg-brand-orange/10 border border-brand-orange/20 px-2 py-0.5 rounded-lg shrink-0">
            {trek.duration.toLowerCase().includes('1 day') ? '1-Day' : '2-Day'}
          </span>
        </div>

        <div className="mt-auto flex items-center justify-between bg-slate-50 p-5 rounded-[2rem] border border-slate-100 transition-all group-hover:bg-brand-orange/5 group-hover:border-brand-orange/10 group-hover:shadow-lg group-hover:shadow-brand-orange/5">
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-0.5">Expedition from</span>
            <span className="text-2xl font-black text-slate-900 tracking-tight">₹{trek.currentPrice.toLocaleString()}</span>
          </div>
          <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-slate-400 group-hover:text-brand-orange group-hover:scale-110 transition-all border border-slate-100">
            <ArrowRight size={20} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
