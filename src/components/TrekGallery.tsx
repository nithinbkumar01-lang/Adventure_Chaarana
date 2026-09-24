import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Sparkles, Maximize2, Camera, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import type { Trek } from '../../shared/types/trek';

export const TrekGallery = ({ trek }: { trek: Trek }) => {
  // Combine trek cover, trek gallery, and some relevant community images
  const baseImages = [trek.image, ...(trek.gallery || [])];
  
  // Add some beautiful general group/scenic pictures that fit the theme
  const communityAdditions = [
    "https://res.cloudinary.com/dofg6bsom/image/upload/f_auto,q_auto/v1779440960/WhatsApp_Image_2026-05-22_at_1.33.54_PM_uvvckq.jpg",
    "https://res.cloudinary.com/dofg6bsom/image/upload/f_auto,q_auto/v1778590561/IMG_5569_bhnmtl.jpg",
    "https://res.cloudinary.com/dofg6bsom/image/upload/f_auto,q_auto/v1778590558/IMG_5667_t9uf2n.jpg",
    "https://res.cloudinary.com/dofg6bsom/image/upload/f_auto,q_auto/v1778590557/IMG_5646_jvzjm2.jpg",
    "https://res.cloudinary.com/dofg6bsom/image/upload/f_auto,q_auto/v1778591373/IMG_6197_ltwjvy.jpg",
    "https://res.cloudinary.com/dofg6bsom/image/upload/f_auto,q_auto/v1778591369/WhatsApp_Image_2026-05-12_at_6.38.09_PM_xosgii.jpg"
  ];

  const uniqueImages: string[] = [];
  const seen = new Set<string>();

  baseImages.forEach(img => {
    if (img && !seen.has(img)) {
      uniqueImages.push(img);
      seen.add(img);
    }
  });

  if (uniqueImages.length < 8) {
    for (const img of communityAdditions) {
      if (uniqueImages.length >= 8) break;
      if (!seen.has(img)) {
        uniqueImages.push(img);
        seen.add(img);
      }
    }
  }

  const isVideoUrl = (url: string) => url.toLowerCase().endsWith('.mov') || url.toLowerCase().endsWith('.mp4') || url.includes('.mov');
  const getPosterUrl = (url: string) => isVideoUrl(url) ? `${url}/ik-thumbnail.jpg` : url;

  const items = uniqueImages.map((url) => {
    const isVideo = isVideoUrl(url);
    const posterUrl = getPosterUrl(url);
    let caption: string;
    if (url === trek.image) {
      caption = `The Majestic Summit of ${trek.title}`;
    } else if (url.includes('Uttari/IMG_0965') || (url.includes('IMG_0965') && trek.slug.includes('uttari'))) {
      caption = `Golden Sunrise Over the Historic Fort of Uttari Betta`;
    } else if (url.includes('Uttari/IMG_0825') || (url.includes('IMG_0825') && trek.slug.includes('uttari'))) {
      caption = `Trekker Ascent Through Ancient Stone Fort Gates`;
    } else if (url.includes('20260823_071033')) {
      caption = `Panoramic Horizon and Cloud Inversion at Sunrise`;
    } else if (url.includes('20260823_063809')) {
      caption = `First Glimmer of Dawn from the Summit Plateau`;
    } else if (url.includes('PXL_20260614_012424943')) {
      caption = `Starlit Night Hike Ascending the Rocky Trails`;
    } else if (url.includes('IMG_0961')) {
      caption = `Sunbeams Piercing Morning Mist on the Slopes`;
    } else if (url.includes('IMG_0866')) {
      caption = `Navigating the Scenic Stone Steps of Hutridurga`;
    } else if (url.includes('IMG_0877')) {
      caption = `Summit Explorers Celebrating Dawn above the Clouds`;
    } else if (url.includes('IMG_0903')) {
      caption = `Expansive 360-Degree Tumkur Countryside Vistas`;
    } else if (url.includes('20260614_081409')) {
      caption = `Morning Sunlight Illuminating Ancient Fort Walls`;
    } else if (url.includes('20260614_070405')) {
      caption = `Rolling Green Foothills Under Early Morning Skies`;
    } else if (url.includes('IMG_0850')) {
      caption = `Group Fellowship Along the Boulder Ridgeline`;
    } else if (url.includes('072048536')) {
      caption = `Lush Monsoonal Greenery along the Mountain Trail`;
    } else if (url.includes('IMG_2006')) {
      caption = `Dramatic Rocky Escarpments of Uttari Betta`;
    } else if (url.includes('IMG_0880')) {
      caption = `Summit Moments of Wonder and Mountain Breeze`;
    } else if (url.includes('071109498')) {
      caption = `Golden Morning Glow Over the Valley Plains`;
    } else if (url.includes('031333699')) {
      caption = `Pre-Dawn Gathering Under the Starry Night Canopy`;
    } else if (url.includes('IMG_0882')) {
      caption = `The Roaring "Sea of Milk" at Dudhsagar Falls`;
    } else if (url.includes('IMG_1125')) {
      caption = `Railway Viaduct Crossing over Roaring Dudhsagar Falls`;
    } else if (url.includes('IMG_1022')) {
      caption = `Trekking Along the Historic Western Ghats Railway Line`;
    } else if (url.includes('IMG_0803')) {
      caption = `Misty Rainforest Trails Leading to the Cascades`;
    } else if (url.includes('IMG_0909')) {
      caption = `Spectacular Four-Tiered Waterfall Plunge in Full Force`;
    } else if (url.includes('IMG_7321')) {
      caption = `Fellow Explorers Immersed in the Natural Water Mist`;
    } else if (url.includes('IMG_0874')) {
      caption = `Crystal Clear Streams & Forest Canopies of Bhagwan Mahaveer Sanctuary`;
    } else if (url.includes('Dudhsagar-Waterfalls')) {
      caption = `Iconic Vista of Dudhsagar Waterfalls & Train Overpass`;
    } else if (url.includes('thewanderlostguy')) {
      caption = `Deep Green Jungle Trails of Dudhsagar Trek`;
    } else if (url.includes('Gokarna')) {
      if (url.includes('7.jpeg')) {
        caption = 'Gokarna Coastal Waves & Golden Sandy Shores';
      } else if (url.includes('6.jpeg')) {
        caption = 'Trekking Along the Scenic Rocky Ocean Cliffs';
      } else if (url.includes('13.jpeg')) {
        caption = 'Peaceful Golden Hour at Kumta Beach Campsite';
      } else if (url.includes('9.jpeg')) {
        caption = 'Beachside Palms & Soothing Ocean Breezes';
      } else if (url.includes('10.jpeg')) {
        caption = 'Iconic Sunset Vista by the Sea at Om Beach';
      } else if (url.includes('12.jpeg')) {
        caption = 'Exploring the Historic Stone Bastions of Mirjan Fort';
      } else if (url.includes('4.jpeg')) {
        caption = 'Boardwalk Through Sharavathi Kandla Mangrove Forest';
      } else if (url.includes('3.jpeg')) {
        caption = 'Scenic Sharavathi Hanging Bridge Crossing';
      } else if (url.includes('11.jpeg')) {
        caption = 'Murudeshwara Beachside Shiva Temple & Monumental Statue';
      } else if (url.includes('2.jpeg')) {
        caption = 'Spectacular Cascades & Misty Vistas of Jog Falls';
      } else if (url.includes('8.jpeg')) {
        caption = 'Beach-Facing Tents Under the Evening Star Canopy';
      } else if (url.includes('1.jpeg')) {
        caption = 'Magical Sky Lantern Released Over the Arabian Sea';
      } else {
        caption = 'Lost in the Rhythm of Waves Along the Gokarna Coastline';
      }
    } else if (url.includes('/KP/')) {
      if (url.includes('3.26.16')) {
        caption = 'Majestic View of Kumaraparvatha Peak & Sweeping Shola Ridge';
      } else if (url.includes('3.28.57')) {
        caption = 'Traversing the Expansive Panoramic Grasslands of Sheshaparvatha';
      } else if (url.includes('3.27.24')) {
        caption = 'High-Altitude Western Ghats Grasslands Under Dramatic Monsoon Clouds';
      } else if (url.includes('3.28.56%20PM.jpeg') || (url.includes('3.28.56') && !url.includes('(1)'))) {
        caption = 'Chaarana Trekkers Navigating the Steep Mountain Ridge Trail';
      } else if (url.includes('3.28.58')) {
        caption = 'Breathtaking Summit Crest Horizon Overlooking Rolling Mist Valleys';
      } else if (url.includes('3.26.21')) {
        caption = 'Atmospheric Morning Trail Ascending Toward the Sacred Peak';
      } else if (url.includes('3.26.23')) {
        caption = 'Verdant Green Ridgelines of the Pushpagiri Wildlife Sanctuary';
      } else if (url.includes('3.26.19')) {
        caption = 'Conquering the Rocky Summit Ridge of Kumaraparvatha (1,712m)';
      } else if (url.includes('3.26.17')) {
        caption = 'Pristine Shola Rainforest Canopy and Mountain Stream Trails';
      } else if (url.includes('(1)')) {
        caption = 'Dramatic Cloud Formations and Sunset Glow Across the Western Ghats';
      } else {
        caption = 'The Breathtaking Wilderness of Kumaraparvatha Expedition';
      }
    } else if (url.includes('pooja.jpg.jpeg')) {
      caption = `Scenic Mountain Vistas of Kodaikanal Hills & Valleys`;
    } else if (url.includes('IMG_4727')) {
      caption = `Pine Forest Trails & Mountain Mist in Kodaikanal`;
    } else if (url.includes('IMG_5156')) {
      caption = `Panoramic Valley Views from Dolphin's Nose Ridge`;
    } else if (url.includes('IMG_7839')) {
      caption = `Charming Hill Station Landscapes of Kodaikanal`;
    } else if (url.includes('IMG_7931')) {
      caption = `Explorers Wandering Among the Majestic Pine Trees`;
    } else if (url.includes('IMG_8064')) {
      caption = `Tranquil Lakes & Misty Hills of Kodaikanal`;
    } else if (url.includes('IMG_7910')) {
      caption = `Serene Forest Pathways & Mountain Breezes`;
    } else if (url.includes('IMG_7986')) {
      caption = `Pillar Rocks & Dramatic Valley Drop-offs`;
    } else if (url.includes('IMG_7883')) {
      caption = `Coaker's Walk Panoramic Edge Views`;
    } else if (url.includes('IMG_7865')) {
      caption = `Vibrant Mountain Escapes across Kodaikanal`;
    } else if (url.includes('IMG_7776')) {
      caption = `Vattakanal Falls & Cascading Mountain Streams`;
    } else if (url.includes('IMG_7960')) {
      caption = `Memorable Travel Moments in Kodaikanal`;
    } else if (url.includes('IMG_6990')) {
      caption = `The Majestic Summit View of Nethravathi Peak`;
    } else if (url.includes('11.mov')) {
      caption = `Ridge Winds & Mountain Trail Motion at ${trek.title}`;
    } else if (url.includes('IMG_7065')) {
      caption = `Panoramic Grasslands & Shola Clouds from Nethravathi Ridge`;
    } else if (url.includes('IMG_0674')) {
      caption = `Trekker Fellowship on the High Western Ghats Escarpment`;
    } else if (url.includes('IMG_5350')) {
      caption = `Ascending through the Emerald Kudremukh Hills`;
    } else if (url.includes('IMG_5381')) {
      caption = `Pushing the Limits along the Serpentine Peak Trail`;
    } else if (url.includes('/6.JPG') || url.endsWith('/6.JPG')) {
      caption = `Expedition Squad Against the Endless Green Horizon`;
    } else if (url.includes('New%20img%204') || url.includes('New img 4')) {
      caption = `Sweeping Vistas of Kudremukh Forest Valleys`;
    } else if (url.includes('New%20img%201') || url.includes('New img 1')) {
      caption = `Golden Hour Glow across the High Elevation Slopes`;
    } else if (url.includes('New%20img%203') || url.includes('New img 3')) {
      caption = `Navigating Pristine Mountain Streams and Forest Trails`;
    } else if (url.includes('IMG_6951')) {
      caption = `Dramatic Cloud Formations Over Nethravathi Peak`;
    } else if (url.includes('IMG_6468')) {
      caption = `Untouched Shola Forest and Fresh Waterways`;
    } else if (url.includes('New%20img%205') || url.includes('New img 5')) {
      caption = `Triumphant Explorer Summit Celebrations at Nethravathi`;
    } else if (url.includes('20260613_101857')) {
      caption = `Breathtaking Morning Vista from Nethravathi Peak`;
    } else if (url.includes('1.33.54_PM')) {
      caption = `Our Wonderful Fellow Explorers Squad!`;
    } else if (url.includes('IMG_5569') || url.includes('IMG_6197')) {
      caption = `Conquering Trails Together`;
    } else if (url.includes('IMG_5667') || url.includes('IMG_5646')) {
      caption = `Shared Smiles & Lifelong Bonds`;
    } else if (url.includes('6.38.09_PM') || url.includes('IMG_5628')) {
      caption = `Pushing Limits on Scenic Steps`;
    } else if (url.includes('040047979')) {
      caption = `Misty Morning Trails through Shola Forests`;
    } else if (url.includes('075857')) {
      caption = `Rolling Green Grasslands of Kudremukha`;
    } else if (url.includes('031031643')) {
      caption = `Scaling the Horse-Face Mountain Ridges`;
    } else if (url.includes('084211737')) {
      caption = `Pristine Western Ghats Horizon`;
    } else if (url.includes('7920')) {
      caption = `Panoramic Views across Kudremukh National Park`;
    } else if (url.includes('090452')) {
      caption = `Trailblazing the Lush Green Shola Ridges`;
    } else if (url.includes('8937')) {
      caption = `Misty Slopes and Cloud Cover at Kudremukha`;
    } else if (url.includes('8905')) {
      caption = `Unwinding amidst the Emerald Hills`;
    } else if (url.includes('0399')) {
      caption = `Trekker Fellowship on the Kudremukh Trail`;
    } else if (url.includes('084554')) {
      caption = `Cascading Mountain Breezes & Shola Valleys`;
    } else if (url.includes('5565')) {
      caption = `Crossing Bababudan & Kudremukh Streams`;
    } else if (url.includes('083333')) {
      caption = `Spectacular Ridge Walk under Floating Clouds`;
    } else if (url.includes('092509')) {
      caption = `Untouched Wilderness of the Western Ghats`;
    } else if (url.includes('6081')) {
      caption = `Reaching the Iconic Horse-Face Peak Point`;
    } else if (url.includes('7810')) {
      caption = `Moments of Solitude at the Summit Ridge`;
    } else if (url.includes('4745')) {
      caption = `Vibrant Green Carpet of Kudremukha Hills`;
    } else if (url.includes('063440975')) {
      caption = `Victorious Trekkers at Kudremukha`;
    } else {
      caption = `Vibrant Summit Vistas at ${trek.title}`;
    }
    return { url, caption, isVideo, posterUrl };
  });

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setLightboxIndex(prev => (prev === null || prev === 0 ? items.length - 1 : prev - 1));
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex(prev => (prev === null || prev === items.length - 1 ? 0 : prev + 1));
      } else if (e.key === 'Escape') {
        setLightboxIndex(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, items.length]);

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex(prev => {
        if (prev === null) return null;
        return prev === 0 ? items.length - 1 : prev - 1;
      });
    }
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex(prev => {
        if (prev === null) return null;
        return prev === items.length - 1 ? 0 : prev + 1;
      });
    }
  };

  // Helper for Bento Big and Small configuration
  const getTileConfig = (i: number, total: number) => {
    if (items[i]?.isVideo) {
      return {
        spanClass: 'col-span-2 md:col-span-2 row-span-2',
        isBig: true,
        badge: 'Trail Reel 🎥',
        typeLabel: 'Video Reel'
      };
    }
    const remaining = total - i;
    if (remaining === 1) {
      return {
        spanClass: 'col-span-2 md:col-span-4 row-span-1 md:row-span-2',
        isBig: true,
        badge: 'Expedition Panorama',
        typeLabel: 'Panoramic Vista'
      };
    }
    if (remaining === 2) {
      return {
        spanClass: 'col-span-1 md:col-span-2 row-span-1',
        isBig: false,
        badge: 'Scenic Horizon',
        typeLabel: 'Wide Vista'
      };
    }
    const cycle = i % 8;
    if (cycle === 0) {
      return {
        spanClass: 'col-span-2 md:col-span-2 row-span-2',
        isBig: true,
        badge: i === 0 ? 'Summit Feature' : 'Expedition Highlight',
        typeLabel: 'Featured Big'
      };
    }
    if (cycle === 7) {
      return {
        spanClass: 'col-span-2 md:col-span-2 row-span-2',
        isBig: true,
        badge: 'Iconic Peak Wonder',
        typeLabel: 'Featured Big'
      };
    }
    if (cycle === 3 || cycle === 6) {
      return {
        spanClass: 'col-span-2 md:col-span-2 row-span-1',
        isBig: false,
        badge: 'Scenic Trailway',
        typeLabel: 'Landscape Wide'
      };
    }
    return {
      spanClass: 'col-span-1 md:col-span-1 row-span-1',
      isBig: false,
      badge: null,
      typeLabel: 'Trail Snap'
    };
  };

  return (
    <section id="trek-gallery-section" className="py-12 md:py-24 bg-white overflow-hidden border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8 md:space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-[10px] font-black uppercase tracking-[0.3em]">
              <Camera size={13} className="text-brand-orange" />
              <span>Authentic Trail Snaps</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-brand-dark tracking-tighter leading-tight">
              Expedition <span className="text-brand-orange italic font-serif">Moments Gallery</span>
            </h2>
            <p className="text-slate-500 font-bold text-xs md:text-sm tracking-wide max-w-xl">
              Real, unedited shots captured by our leaders and fellow trekkers across {trek.title}. Experience the raw peaks, misty ridge trails, and triumphant summits.
            </p>
          </div>

          {/* Quick Counter Badge */}
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 bg-slate-50 border border-slate-200/80 rounded-2xl flex items-center gap-2.5 shadow-sm">
              <Sparkles size={16} className="text-brand-orange" />
              <div className="text-left">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Curated Collection</p>
                <p className="text-sm font-black text-brand-dark">{items.length} High-Res Moments</p>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery Bento Grid with Big & Small Sections */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 auto-rows-[160px] sm:auto-rows-[190px] md:auto-rows-[220px] lg:auto-rows-[240px] grid-flow-dense">
          {items.map((img, i) => {
            const tile = getTileConfig(i, items.length);
            return (
              <motion.div
                key={img.url + i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 8) * 0.04 }}
                onClick={() => setLightboxIndex(i)}
                className={`relative overflow-hidden rounded-2xl md:rounded-[2rem] border group cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500 ${tile.spanClass} ${
                  tile.isBig 
                    ? 'border-brand-orange/30 shadow-brand-orange/5 hover:border-brand-orange ring-1 ring-brand-orange/20' 
                    : 'border-slate-200/80 hover:border-brand-orange/40 bg-slate-50'
                }`}
              >
                <img 
                  src={img.posterUrl} 
                  alt={img.caption}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />

                {/* Video Play Button Indicator */}
                {img.isVideo && (
                  <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-brand-orange/95 text-white flex items-center justify-center shadow-2xl backdrop-blur-sm border-2 border-white group-hover:scale-110 group-hover:bg-brand-orange transition-all duration-300">
                      <Play size={20} className="fill-white translate-x-0.5" />
                    </div>
                  </div>
                )}

                {/* Subtle dark gradient for legibility */}
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

                {/* Top Right Expand Icon Button */}
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
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
                    <span className="text-brand-orange font-black uppercase tracking-[0.25em] text-[8px] md:text-[9px]">
                      {img.isVideo ? 'Video Reel' : tile.isBig ? 'Featured View' : 'Trail Snap'}
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

      {/* Fullscreen Interactive Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-between bg-brand-dark/95 backdrop-blur-2xl p-3 md:p-6"
          >
            {/* Top Bar with Info & Close Button */}
            <div className="w-full max-w-6xl flex items-center justify-between z-[110] select-none py-2 px-2" onClick={e => e.stopPropagation()}>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-brand-orange/20 border border-brand-orange/30 text-brand-orange text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5">
                  <Camera size={12} /> {trek.title} Expedition
                </span>
                <span className="text-white/60 font-bold text-xs">
                  {lightboxIndex + 1} of {items.length}
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

            {/* Main Image Container & Navigation Controls */}
            <div className="relative max-w-5xl w-full flex-1 flex items-center justify-center my-2" onClick={e => e.stopPropagation()}>
              {/* Previous Button */}
              <button 
                onClick={handlePrev}
                className="absolute left-2 md:left-4 z-20 bg-black/50 hover:bg-brand-orange text-white rounded-full p-3 md:p-4 transition-all backdrop-blur-md hover:scale-110 active:scale-95 cursor-pointer border border-white/10 shadow-2xl"
                aria-label="Previous Media"
              >
                <ChevronLeft size={22} />
              </button>

              {/* Active Image or Video */}
              {items[lightboxIndex]?.isVideo ? (
                <video
                  key={lightboxIndex}
                  src={items[lightboxIndex]?.url}
                  poster={items[lightboxIndex]?.posterUrl}
                  controls
                  autoPlay
                  playsInline
                  className="max-w-full max-h-[60vh] md:max-h-[65vh] object-contain rounded-2xl shadow-2xl border border-white/10"
                />
              ) : (
                <motion.img 
                  key={lightboxIndex}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.2 }}
                  src={items[lightboxIndex]?.url} 
                  alt={items[lightboxIndex]?.caption}
                  className="max-w-full max-h-[60vh] md:max-h-[65vh] object-contain rounded-2xl shadow-2xl border border-white/10 select-none"
                  referrerPolicy="no-referrer"
                />
              )}

              {/* Next Button */}
              <button 
                onClick={handleNext}
                className="absolute right-2 md:right-4 z-20 bg-black/50 hover:bg-brand-orange text-white rounded-full p-3 md:p-4 transition-all backdrop-blur-md hover:scale-110 active:scale-95 cursor-pointer border border-white/10 shadow-2xl"
                aria-label="Next Media"
              >
                <ChevronRight size={22} />
              </button>
            </div>

            {/* Caption & Thumbnail Strip at Bottom */}
            <div className="w-full max-w-5xl space-y-3 z-10 select-none" onClick={e => e.stopPropagation()}>
              {/* Caption */}
              <div className="text-center px-4">
                <p className="text-white text-sm md:text-base font-bold tracking-wide">
                  {items[lightboxIndex]?.caption}
                </p>
              </div>

              {/* Thumbnail Strip */}
              <div className="flex items-center justify-center gap-2 overflow-x-auto py-2 px-4 no-scrollbar max-w-full">
                {items.map((item, idx) => (
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
                      src={item.posterUrl} 
                      alt={`Thumbnail ${idx + 1}`} 
                      className="w-full h-full object-cover" 
                      referrerPolicy="no-referrer"
                    />
                    {item.isVideo && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                        <Play size={14} className="fill-white text-white translate-x-0.5" />
                      </div>
                    )}
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
