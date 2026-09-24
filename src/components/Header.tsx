import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { X, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../context/AuthContext';

export const Header = ({ isBannerOpen = false }: { isBannerOpen?: boolean }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isHomePage = location.pathname === '/';
  const isDetailsPage = location.pathname.startsWith('/trek/');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on page transition
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLinkClick = (link: { label: string; path: string; isAnchor?: boolean; isExternal?: boolean }) => {
    if (link.isExternal) {
      window.open(link.path, '_blank', 'noopener,noreferrer');
    } else if (link.isAnchor) {
      const targetId = link.path.split('#')[1] || 'treks-section';
      if (isHomePage) {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        navigate('/');
        // Use timeout to allow home page mount before scrolling
        setTimeout(() => {
          const el = document.getElementById(targetId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 120);
      }
    } else {
      navigate(link.path);
    }
    setIsMobileMenuOpen(false);
  };

  if (isDetailsPage) return null;

  const headerClass = isHomePage
    ? isScrolled
      ? 'bg-brand-dark/95 backdrop-blur-md text-white border-b border-white/5 shadow-lg'
      : 'bg-transparent text-white'
    : 'bg-white/90 backdrop-blur-md border-b border-slate-100 text-[#0F0F0F] shadow-sm';

  const menuLinks = {
    treks: { label: 'Upcoming Treks', path: '/#treks-section', isAnchor: true },
    contact: { label: 'Contact Us', path: '/#footer', isAnchor: true },
    join: { label: 'Join Community', path: 'https://wa.me/919980489494?text=Hey%20Adventure%20Chaarana!%20I%20am%20looking%20for%20upcoming%20adventures.', isExternal: true }
  };

  return (
    <header className={`${headerClass} fixed ${isBannerOpen ? 'top-[36px] sm:top-[38px]' : 'top-0'} left-0 right-0 z-40 transition-all duration-300 h-20 md:h-24 flex items-center`}>
      <div className="max-w-7xl mx-auto w-full px-6 relative flex items-center justify-between md:grid md:grid-cols-3">
        {/* Left Column - Upcoming Treks & Contact Us */}
        <div className="hidden md:flex items-center justify-start gap-8">
          <button
            onClick={() => handleLinkClick(menuLinks.treks)}
            className="text-xs transition-colors hover:text-brand-orange uppercase font-black tracking-widest cursor-pointer"
          >
            Upcoming Treks
          </button>
          <button
            onClick={() => handleLinkClick(menuLinks.contact)}
            className="text-xs transition-colors hover:text-brand-orange uppercase font-black tracking-widest cursor-pointer whitespace-nowrap"
          >
            Contact Us
          </button>
        </div>

        {/* Center Column - Logo */}
        <div className="flex items-center justify-center flex-1 md:flex-initial">
          <button
            onClick={() => {
              if (location.pathname === '/') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              } else if (window.history.length > 1) {
                navigate(-1);
              } else {
                navigate('/');
              }
            }}
            className="flex items-center gap-3 group cursor-pointer focus:outline-none"
            aria-label="Adventure Chaarana Logo - Go back"
            title="Click to go back"
          >
            <img 
              src="https://res.cloudinary.com/dmez9koqz/image/upload/v1786011636/logo_eng_fr3ih9.png" 
              alt="Adventure Chaarana Logo" 
              className="h-14 md:h-20 w-auto object-contain transition-all duration-300 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
          </button>
        </div>

        {/* Right Column - Account and community actions */}
        <div className="hidden md:flex items-center justify-end gap-3">
          <Link
            to="/auth"
            className="rounded-full border border-current/15 px-4 py-2.5 text-[10px] font-black uppercase tracking-widest transition-colors hover:text-brand-orange"
          >
            {user ? 'My account' : 'Sign in'}
          </Link>
          <button
            onClick={() => handleLinkClick(menuLinks.join)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest text-white bg-brand-orange shadow-md shadow-brand-orange/20 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
          >
            <img src="https://res.cloudinary.com/dofg6bsom/image/upload/v1779808098/2ef2dd8a-fad0-482b-95d7-19e047dfae07.png" alt="WhatsApp" className="w-4 h-4 object-contain" referrerPolicy="no-referrer" />
            Join Community
          </button>
        </div>

        {/* Mobile Hamburger Trigger */}
        <div className="md:hidden absolute right-6 top-1/2 -translate-y-1/2">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg transition-all focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? (
              <X size={24} />
            ) : (
              <Menu size={24} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`absolute top-20 left-0 right-0 p-6 md:hidden shadow-2xl flex flex-col gap-6 border-b z-40 ${
              isHomePage && !isScrolled
                ? 'bg-brand-dark border-white/10 text-white'
                : 'bg-white border-slate-100 text-brand-dark'
            }`}
          >
            <div className="flex flex-col gap-4">
              <button
                onClick={() => handleLinkClick(menuLinks.treks)}
                className="text-left text-xs uppercase font-black tracking-widest py-2 border-b border-slate-100/10 hover:text-brand-orange transition-colors"
              >
                Upcoming Treks
              </button>
              <button
                onClick={() => handleLinkClick(menuLinks.contact)}
                className="text-left text-xs uppercase font-black tracking-widest py-2 border-b border-slate-100/10 hover:text-brand-orange transition-colors"
              >
                Contact Us
              </button>
              <button
                onClick={() => handleLinkClick({ label: 'Account', path: '/auth' })}
                className="text-left text-xs uppercase font-black tracking-widest py-2 border-b border-slate-100/10 hover:text-brand-orange transition-colors"
              >
                {user ? 'My account' : 'Sign in / Sign up'}
              </button>
              <button
                onClick={() => handleLinkClick(menuLinks.join)}
                className="flex items-center justify-center gap-2 py-3 mt-2 rounded-xl text-xs font-black uppercase tracking-widest text-white bg-brand-orange shadow-md shadow-brand-orange/20 cursor-pointer"
              >
                <img src="https://res.cloudinary.com/dofg6bsom/image/upload/v1779808098/2ef2dd8a-fad0-482b-95d7-19e047dfae07.png" alt="WhatsApp" className="w-[18px] h-[18px] object-contain" referrerPolicy="no-referrer" />
                Join Community
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
