import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';

export const Breadcrumbs = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { treks } = useSiteData();
  const trek = treks.find(t => t.slug === slug);

  if (!trek) return null;

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-6 md:px-12 py-4 md:py-6 flex items-center justify-between gap-4 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
      <div className="flex items-center gap-3">
        <button
          id="breadcrumb-back-button"
          onClick={handleGoBack}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white hover:bg-slate-50 border border-slate-200 hover:border-brand-orange/40 text-slate-700 hover:text-brand-orange shadow-sm text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer group shrink-0"
          aria-label="Go back to previous page"
        >
          <ArrowLeft size={13} className="text-slate-400 group-hover:text-brand-orange transition-colors" />
          <span>Back</span>
        </button>

        <ol className="flex items-center gap-2.5 overflow-x-auto no-scrollbar" itemScope itemType="https://schema.org/BreadcrumbList">
          <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
            <Link to="/" itemProp="item" className="hover:text-brand-orange transition-colors whitespace-nowrap">
              <span itemProp="name">Home</span>
            </Link>
            <meta itemProp="position" content="1" />
          </li>
          <ArrowRight size={10} className="text-slate-300 shrink-0" />
          <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
            <span itemProp="name" className="text-slate-300 whitespace-nowrap">Treks</span>
            <meta itemProp="position" content="2" />
          </li>
          <ArrowRight size={10} className="text-slate-300 shrink-0" />
          <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
            <span itemProp="name" className="text-brand-orange truncate max-w-[180px] sm:max-w-[280px] md:max-w-none">{trek.title}</span>
            <meta itemProp="position" content="3" />
          </li>
        </ol>
      </div>
    </nav>
  );
};

// Section separator
