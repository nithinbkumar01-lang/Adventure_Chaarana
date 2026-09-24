import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MapPin, Instagram, Facebook, Mail, Phone } from 'lucide-react';
import { Breadcrumbs } from './Breadcrumbs';
import { Background } from './Background';
import { IndependenceDayBanner } from './IndependenceDayBanner';
import { Header } from './Header';
import { PromoModal } from './PromoModal';

export const Layout = ({ children, showPromo, setShowPromo }: { children: React.ReactNode; showPromo: boolean; setShowPromo: (v: boolean) => void }) => {
  const location = useLocation();
  const isDetailsPage = location.pathname.startsWith('/trek/');
  const [isBannerOpen, setIsBannerOpen] = useState(true);

  return (
    <div className={`min-h-screen w-full bg-brand-paper text-brand-dark font-sans flex flex-col relative ${isDetailsPage ? 'overflow-x-clip' : 'overflow-hidden'}`}>
      {!isDetailsPage && <Background />}
      <IndependenceDayBanner isOpen={isBannerOpen} onClose={() => setIsBannerOpen(false)} />
      {!isDetailsPage && <Header isBannerOpen={isBannerOpen} />}
      
      <main className="relative z-10 flex-1 transition-all duration-300">
        {isDetailsPage && <Breadcrumbs />}
        {children}
      </main>

      <footer id="footer" className="relative z-20 bg-brand-dark text-white pt-24 pb-12 w-full shrink-0">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2 space-y-8">
              <Link 
                to="/"
                className="inline-block"
              >
                <img 
                  src="https://res.cloudinary.com/dmez9koqz/image/upload/v1786011643/ChatGPT_Image_Apr_25_2026_08_58_47_AM-Photoroom_jso4lv.png" 
                  alt="Adventure Chaarana Footer Logo" 
                  className="h-24 md:h-32 w-auto object-contain opacity-90 transition-all hover:opacity-100"
                  referrerPolicy="no-referrer"
                />
              </Link>
              <p className="text-white/40 text-sm max-w-xs font-medium leading-relaxed">
                Exploring the soul of the Western Ghats since 2018. We cultivate authentic connections between people and the mountains.
              </p>
              <div className="flex gap-4">
                {[
                  { icon: <Instagram size={18} />, url: 'https://www.instagram.com/adventure_chaarana/', label: 'Instagram' },
                  { 
                    icon: <img src="https://res.cloudinary.com/dofg6bsom/image/upload/v1779808098/2ef2dd8a-fad0-482b-95d7-19e047dfae07.png" alt="WhatsApp" className="w-5 h-5 object-contain" referrerPolicy="no-referrer" />, 
                    url: `https://wa.me/919980489494?text=${encodeURIComponent("Hey, I'm ready for adventure")}`, 
                    label: 'WhatsApp' 
                  },
                  { icon: <Facebook size={18} />, url: 'https://www.facebook.com/share/17MFdPjuWJ/', label: 'Facebook' }
                ].map((social) => (
                  <a 
                    key={social.label} 
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center bg-white/5 border border-white/10 rounded-full text-white/60 hover:bg-white hover:text-brand-dark hover:border-white transition-all duration-300"
                    title={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h5 className="font-serif text-lg font-bold">Quick Links</h5>
              <ul className="space-y-4 text-white/40 text-sm font-medium">
                <li><Link to="/" className="hover:text-brand-orange transition-colors">Upcoming Treks</Link></li>
                <li><Link to="/safety-code" className="hover:text-brand-orange transition-colors">Safety Code</Link></li>
                <li><Link to="/terms" className="hover:text-brand-orange transition-colors">Terms and Conditions</Link></li>
                <li><Link to="/refund-policy" className="hover:text-brand-orange transition-colors">Refund Policy</Link></li>
              </ul>
            </div>

            <div className="space-y-6">
              <h5 className="font-serif text-lg font-bold">Base Camp</h5>
              <div className="space-y-4 text-white/40 text-sm font-medium">
                <p className="flex items-center gap-3">
                  <MapPin size={16} className="text-brand-orange/60" />
                  Bengaluru, KA, India
                </p>
                <p className="flex items-center gap-3">
                  <Mail size={16} className="text-brand-orange/60" />
                  adventurechaarana@gmail.com
                </p>
                <p className="flex items-center gap-3">
                  <Phone size={16} className="text-brand-orange/60" />
                  +91 9980489494
                </p>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-white/20 text-[10px] font-bold uppercase tracking-[0.25em]">
              © 2026 Adventure Chaarana · All Rights Reserved
            </p>
            <div className="flex gap-8">
              <Link to="/safety-code" className="text-white/20 hover:text-white transition-colors text-[10px] uppercase font-black tracking-widest">Safety</Link>
              <Link to="/terms" className="text-white/20 hover:text-white transition-colors text-[10px] uppercase font-black tracking-widest">Terms</Link>
              <Link to="/refund-policy" className="text-white/20 hover:text-white transition-colors text-[10px] uppercase font-black tracking-widest">Refund Policy</Link>
            </div>
          </div>
        </div>
      </footer>

      <PromoModal isOpen={showPromo} onClose={() => setShowPromo(false)} />
    </div>
  );
};
