/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useParams, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Clock,
  CheckCircle2,
  Calendar,
  MapPin,
  Heart,
  ArrowRight,
  Mountain,
  Sun,
  Compass,
  Tent,
  MessageCircle,
  X,
  Zap,
  ChevronDown,
  Instagram,
  Facebook,
  Mail,
  Phone
} from 'lucide-react';

interface ItineraryItem {
  time: string;
  activity: string;
}

interface Trek {
  id: string;
  title: string;
  host: string;
  date: string;
  location: string;
  description: string;
  originalPrice: number;
  currentPrice: number;
  discount: string;
  image: string;
  badgeColor: string;
  category: string;
  duration: string;
  difficulty: 'Easy' | 'Moderate' | 'Difficult';
  elevation?: string;
  distance?: string;
  minAge?: string;
  itinerary: {
    day1: ItineraryItem[];
    day2: ItineraryItem[];
  };
  inclusions: string[];
  exclusions: string[];
  thingsToCarry: string[];
  gallery?: string[];
}

const TREKS: Trek[] = [
  {
    id: '1',
    title: 'Shivagange Sunrise Trek',
    host: 'Adventure Chaarana',
    date: 'May 3, 2026',
    location: 'Tumkur',
    duration: '1 day',
    difficulty: 'Moderate',
    elevation: '1,368 m',
    distance: '2–3 km',
    minAge: '4 Years',
    description: 'Known as Dakshina Kashi, this trek offers a vertical climb with stunning sunrise views from the peak.',
    originalPrice: 1100,
    currentPrice: 799,
    discount: 'FLAT 27% OFF',
    image: 'https://res.cloudinary.com/dofg6bsom/image/upload/v1777382263/4790249a-ade4-4ee4-b4d8-f5cd5071e794.png',
    gallery: [
      'https://res.cloudinary.com/dofg6bsom/image/upload/v1777382282/f7dd769a-8865-4ad9-9ade-ee2516d72c29.png',
      'https://res.cloudinary.com/dofg6bsom/image/upload/v1777382310/ded261f0-b7f0-4ac9-b3b5-497d4abf800c.png',
      'https://res.cloudinary.com/dofg6bsom/image/upload/v1777382331/81f35b0c-663e-45c9-99e4-5d78e5ac541c.png'
    ],
    badgeColor: 'bg-brand-orange',
    category: 'sunrise',
    itinerary: {
      day1: [
        { time: '09:30 PM', activity: '📍KLM Mall, Marathahalli' },
        { time: '10:00 PM', activity: '📍Silk Board Bus Stand' },
        { time: '10:10 PM', activity: '📍BTM, Udupi Garden Signal' },
        { time: '10:30 PM', activity: '📍Banashankari Bus Stop' },
        { time: '10:50 PM', activity: '📍PES University, Banashankari' },
        { time: '11:10 PM', activity: '📍Nagarabhavi, Marilingappa Extension' },
        { time: '11:30 PM', activity: '📍Gorguntepalya, KLE Dental College' }
      ],
      day2: [
        { time: '01:30 AM', activity: '🚍 Reach Shivagange base — rest in vehicle' },
        { time: '03:30 AM', activity: '🧗 Begin trek — ascent through monolithic rock & iron ladder' },
        { time: '05:45 AM', activity: '⛰️ Reach the summit — peaceful time at the peak' },
        { time: '06:15 AM', activity: '🌅 Witness the breathtaking Sunrise from the summit!' },
        { time: '08:00 AM', activity: '⬇️ Begin descent back to base' },
        { time: '09:30 AM', activity: '🍽️ Reach base — breakfast stop (self-sponsored)' },
        { time: '01:00 PM', activity: '🚌 Return to Bangalore' }
      ]
    },
    inclusions: [
      'Transport — Bangalore to Bangalore',
      'Certified Trek Lead & Guide',
      'All entry fees as per itinerary',
      'Completion certificate & trek badges',
      'Light snacks during the trek',
      'First aid support on trail'
    ],
    exclusions: [
      'Breakfast / meals (self-sponsored)',
      'Personal travel insurance',
      'Any personal expenses',
      'Porter charges if required',
      'Anything not mentioned in inclusions'
    ],
    thingsToCarry: [
      'Water bottle — minimum 2 litres',
      'Small backpack (daypack)',
      'Sun cap / warm jacket / layers',
      'Raincoat or umbrella',
      'Torch or Headlamp (Mandatory!)',
      'Sturdy trekking / sports shoes',
      'Light snacks / energy bars / dry fruits',
      'Government ID proof'
    ]
  },
  {
    id: '2',
    title: 'Skandagiri Sunrise Trek',
    host: 'Adventure Chaarana',
    date: 'Every Weekend',
    location: 'Chikkaballapur',
    duration: '1 day',
    difficulty: 'Moderate',
    elevation: '1450 m',
    distance: '4 km',
    minAge: '4 Years',
    description: 'One of the most famous night treks in Karnataka, offering a spectacular \'sea of clouds\' sunrise view from the ancient Kalavara Durga fort.',
    originalPrice: 2200,
    currentPrice: 1499,
    discount: 'FLAT 32% OFF',
    image: 'https://res.cloudinary.com/dofg6bsom/image/upload/v1777474738/7078b1c9-a8d1-4e26-84b3-d4acd604a705.png',
    gallery: [
      'https://res.cloudinary.com/dofg6bsom/image/upload/v1777474738/7078b1c9-a8d1-4e26-84b3-d4acd604a705.png',
      'https://res.cloudinary.com/dofg6bsom/image/upload/v1777474835/4f4cf98b-7e87-4312-9656-c4a6648ab864.png',
      'https://res.cloudinary.com/dofg6bsom/image/upload/v1777474854/22f3e119-a172-4cb7-97f0-f9880523fca2.png'
    ],
    badgeColor: 'bg-brand-orange',
    category: 'sunrise',
    itinerary: {
      day1: [
        { time: '09:30 PM', activity: '📍KLM Mall, Marathahalli' },
        { time: '10:00 PM', activity: '📍Silk Board Bus Stand' },
        { time: '10:10 PM', activity: '📍BTM, Udupi Garden Signal' },
        { time: '10:30 PM', activity: '📍Banashankari Bus Stop' },
        { time: '10:50 PM', activity: '📍PES University, Banashankari' },
        { time: '11:10 PM', activity: '📍Nagarabhavi, Marilingappa Extension' },
        { time: '11:30 PM', activity: '📍Gorguntepalya, KLE Dental College' },
        { time: '12:00 AM', activity: '📍Hebbal Flyover' },
        { time: '12:15 AM', activity: '📍Yelahanka, New Town Bus Stand' }
      ],
      day2: [
        { time: '04:00 AM', activity: '🚌Reach Skandagiri base camp — briefing with trek lead' },
        { time: '04:20 AM', activity: '🥾Begin ascent through rocky terrain and dense forest trails' },
        { time: '05:30 AM', activity: '🏔️Reach the summit — explore ancient fort ruins' },
        { time: '06:15 AM', activity: '🌅Witness the breathtaking Sunrise above the cloud sea!' },
        { time: '07:30 AM', activity: '⬇️Begin descent back to base camp' },
        { time: '09:00 AM', activity: '🍽️Reach base — breakfast stop (self-sponsored)' },
        { time: '01:00 PM', activity: '🏠Return journey to Bangalore' }
      ]
    },
    inclusions: [
      'Transport — Bangalore to Bangalore',
      'Certified Trek Lead & Guide',
      'Forest Permits & Entry Fees',
      'Completion Certificate & Badge',
      'Light Snacks During Trek',
      'First Aid Support'
    ],
    exclusions: [
      'Breakfast / main meals (Self-sponsored)',
      'Any personal expenses',
      'Anything not mentioned in inclusions'
    ],
    thingsToCarry: [
      'Water bottle — minimum 2 litres',
      'Small backpack (daypack)',
      'Sun cap / warm jacket / layers',
      'Torch or Headlamp (Mandatory!)',
      'Sturdy trekking / sports shoes',
      'Light snacks / energy bars',
      'Government ID proof'
    ]
  },
  {
    id: '3',
    title: 'Kaiwara Betta Sunrise Trek',
    host: 'Adventure Chaarana',
    date: 'Every Weekend',
    location: 'Kolar',
    duration: '1 day',
    difficulty: 'Easy',
    elevation: '822 m',
    distance: '2 km',
    minAge: '4 Years',
    description: 'A beginner-friendly night trek leading to a beautiful sunrise over the Kolar plains, visiting ancient fort ruins.',
    originalPrice: 2200,
    currentPrice: 1499,
    discount: 'FLAT 32% OFF',
    image: 'https://res.cloudinary.com/dofg6bsom/image/upload/v1777474887/4bea2954-7177-4485-910b-014e64cd2e4e.png',
    gallery: [
      'https://res.cloudinary.com/dofg6bsom/image/upload/v1777474887/4bea2954-7177-4485-910b-014e64cd2e4e.png',
      'https://res.cloudinary.com/dofg6bsom/image/upload/v1777474908/0276cc50-a26d-4602-a4d6-982106b75fa5.png',
      'https://res.cloudinary.com/dofg6bsom/image/upload/v1777474931/c19f70e7-a0b0-447e-abe0-17696f60c8f8.png'
    ],
    badgeColor: 'bg-brand-orange',
    category: 'sunrise',
    itinerary: {
      day1: [
        { time: '09:30 PM', activity: '📍KLM Mall, Marathahalli' },
        { time: '10:00 PM', activity: '📍Silk Board Bus Stand' },
        { time: '10:10 PM', activity: '📍BTM, Udupi Garden Signal' },
        { time: '10:30 PM', activity: '📍Banashankari Bus Stop' },
        { time: '10:50 PM', activity: '📍PES University, Banashankari' },
        { time: '11:10 PM', activity: '📍Nagarabhavi, Marilingappa Extension' },
        { time: '11:30 PM', activity: '📍Gorguntepalya, KLE Dental College' },
        { time: '12:00 AM', activity: '📍Hebbal Flyover' },
        { time: '12:15 AM', activity: '📍Yelahanka, New Town Bus Stand' }
      ],
      day2: [
        { time: '04:00 AM', activity: '🚌Reach Kaiwara base camp — briefing with trek lead' },
        { time: '04:20 AM', activity: '🥾Begin ascent through rocky terrain and dense forest trails' },
        { time: '05:30 AM', activity: '🏔️Reach the summit — explore ancient fort ruins' },
        { time: '06:15 AM', activity: '🌅Witness the breathtaking Sunrise above the cloud sea!' },
        { time: '07:30 AM', activity: '⬇️Begin descent back to base camp' },
        { time: '09:00 AM', activity: '🍽️Reach base — breakfast stop (self-sponsored)' },
        { time: '01:00 PM', activity: '🏠Return journey to Bangalore' }
      ]
    },
    inclusions: [
      'Travel from Bangalore to Bangalore (TT/bus, Non AC)',
      'Certified Trek Lead & Guide',
      'Any entry fee as per itinerary',
      'Completion certificate & Badge'
    ],
    exclusions: ['Main meals', 'Insurance', 'Personal expenses'],
    thingsToCarry: ['Water bottle', 'Small backpack', 'Suncap', 'Raincoat', 'Torch (Mandatory)']
  },
  {
    id: '4',
    title: 'Channarayana Durga Fort Trek',
    host: 'Adventure Chaarana',
    date: 'Every Weekend',
    location: 'Tumkur',
    duration: '1 day',
    difficulty: 'Moderate',
    elevation: '1373 m',
    distance: '4 km',
    minAge: '4 Years',
    description: 'Explore one of the most historic and strategic forts in Karnataka, featuring multiple layers of fortifications and stunning architecture.',
    originalPrice: 1200,
    currentPrice: 799,
    discount: 'FLAT 33% OFF',
    image: 'https://res.cloudinary.com/dofg6bsom/image/upload/v1777474969/18f3337e-eda7-416e-8136-06cb6d9b31fe.png',
    gallery: [
      'https://res.cloudinary.com/dofg6bsom/image/upload/v1777474969/18f3337e-eda7-416e-8136-06cb6d9b31fe.png',
      'https://res.cloudinary.com/dofg6bsom/image/upload/v1777474987/84522134-5645-4383-bdc1-a0a992b5d501.png',
      'https://res.cloudinary.com/dofg6bsom/image/upload/v1777475006/7f827607-d5d1-4e7a-ae41-4471d40e0717.png'
    ],
    badgeColor: 'bg-brand-orange',
    category: 'sunrise',
    itinerary: {
      day1: [
        { time: '09:30 PM', activity: '📍KLM Mall, Marathahalli' },
        { time: '10:00 PM', activity: '📍Silk Board Bus Stand' },
        { time: '10:10 PM', activity: '📍BTM, Udupi Garden Signal' },
        { time: '10:30 PM', activity: '📍Banashankari Bus Stop' },
        { time: '10:50 PM', activity: '📍PES University, Banashankari' },
        { time: '11:10 PM', activity: '📍Nagarabhavi, Marilingappa Extension' },
        { time: '11:30 PM', activity: '📍Gorguntepalya, KLE Dental College' },
        { time: '12:00 AM', activity: '📍Hebbal/Tumkur Road departure' }
      ],
      day2: [
        { time: '04:00 AM', activity: '🚌Reach Channarayana durga base camp — briefing' },
        { time: '04:20 AM', activity: '🥾Begin ascent through rocky terrain' },
        { time: '05:30 AM', activity: '🏔️Reach the summit — explore ancient fort ruins' },
        { time: '06:15 AM', activity: '🌅Witness the breathtaking Sunrise above the clouds!' },
        { time: '07:30 AM', activity: '⬇️Begin descent back to base camp' },
        { time: '09:00 AM', activity: '🍽️Breakfast stop (self-sponsored)' },
        { time: '01:00 PM', activity: '🏠Return to Bangalore' }
      ]
    },
    inclusions: [
      'Travel from Bangalore in Non-AC vehicle',
      'Certified Trek Lead',
      'Entry fees & Forest permits',
      'E-Certificate of achievement'
    ],
    exclusions: ['Main breakfast', 'Personal expenses', 'Insurance'],
    thingsToCarry: ['Water bottle (2L)', 'Backpack', 'Govt ID', 'Trekking shoes', 'Torch']
  },
  {
    id: '5',
    title: 'Uttari Betta Sunrise Trek',
    host: 'Adventure Chaarana',
    date: 'Every Weekend',
    location: 'Tumkur',
    duration: '1 day',
    difficulty: 'Moderate',
    elevation: '1130 m',
    distance: '3 km',
    minAge: '4 Years',
    description: 'A trek to one of the most scenic hills near Kunigal, known for its beautiful trails through rocky gates and historic fort remnants.',
    originalPrice: 1100,
    currentPrice: 799,
    discount: 'FLAT 27% OFF',
    image: 'https://res.cloudinary.com/dofg6bsom/image/upload/v1777475034/360f9b85-adf6-480e-b547-adf94014e7f3.png',
    gallery: [
      'https://res.cloudinary.com/dofg6bsom/image/upload/v1777475034/360f9b85-adf6-480e-b547-adf94014e7f3.png',
      'https://res.cloudinary.com/dofg6bsom/image/upload/v1777475056/167b04de-82fe-4163-b580-3fc1e6368cdf.png',
      'https://res.cloudinary.com/dofg6bsom/image/upload/v1777475125/ef67324c-eacb-462e-be2f-4c3d412a5855.png'
    ],
    badgeColor: 'bg-brand-orange',
    category: 'sunrise',
    itinerary: {
      day1: [
        { time: '09:30 PM', activity: '📍KLM Mall, Marathahalli' },
        { time: '10:00 PM', activity: '📍Silk Board Bus Stand' },
        { time: '10:10 PM', activity: '📍BTM, Udupi Garden Signal' },
        { time: '10:30 PM', activity: '📍Banashankari Bus Stop' },
        { time: '10:50 PM', activity: '📍PES University, Banashankari' },
        { time: '11:10 PM', activity: '📍Nagarabhavi, Marilingappa Extension' },
        { time: '11:30 PM', activity: '📍Gorguntepalya, KLE Dental College' },
        { time: '12:00 AM', activity: '📍Tumkur Road departure' }
      ],
      day2: [
        { time: '04:00 AM', activity: '🚌Reach Uttari Betta base camp — briefing' },
        { time: '04:20 AM', activity: '🥾Begin ascent through rocky terrain' },
        { time: '05:30 AM', activity: '🏔️Reach the summit — explore ruins' },
        { time: '06:15 AM', activity: '🌅Witness the breathtaking Sunrise!' },
        { time: '07:30 AM', activity: '⬇️Begin descent back to base camp' },
        { time: '09:00 AM', activity: '🍽️Breakfast stop (self-sponsored)' },
        { time: '01:00 PM', activity: '🏠Return to Bangalore' }
      ]
    },
    inclusions: [
      'Travel Bangalore-Bangalore',
      'Guide & Trek Lead',
      'Entry Fees',
      'Snacks & First Aid'
    ],
    exclusions: ['Breakfast', 'Water bottles'],
    thingsToCarry: ['Water bottle', 'Backpack', 'Sturdy shoes', 'Govt ID']
  },
  {
    id: '6',
    title: 'Kunti Betta Sunrise Trek',
    host: 'Adventure Chaarana',
    date: 'Every Weekend',
    location: 'Mandya',
    duration: '1 day',
    difficulty: 'Moderate',
    elevation: '878 m',
    distance: '4 km',
    minAge: '4 Years',
    description: 'A beautiful trek near Mandya, offering stunning views of Tonnur Lake and the surrounding lush green fields.',
    originalPrice: 1100,
    currentPrice: 799,
    discount: 'FLAT 27% OFF',
    image: 'https://res.cloudinary.com/dofg6bsom/image/upload/v1777475200/08b8c95a-1ce5-4460-b4b2-97cceb2a5bba.png',
    gallery: [
      'https://res.cloudinary.com/dofg6bsom/image/upload/v1777475200/08b8c95a-1ce5-4460-b4b2-97cceb2a5bba.png',
      'https://res.cloudinary.com/dofg6bsom/image/upload/v1777475222/8b0a2455-249b-4d76-9613-3446c2a7be8e.png',
      'https://res.cloudinary.com/dofg6bsom/image/upload/v1777475277/72e962b8-aacb-40f0-94a1-bed8d37df76e.png'
    ],
    badgeColor: 'bg-brand-orange',
    category: 'sunrise',
    itinerary: {
      day1: [
        { time: '09:30 PM', activity: '📍KLM Mall, Marathahalli' },
        { time: '10:00 PM', activity: '📍Silk Board Bus Stand' },
        { time: '10:10 PM', activity: '📍BTM, Udupi Garden Signal' },
        { time: '10:30 PM', activity: '📍Banashankari Bus Stop' },
        { time: '10:50 PM', activity: '📍PES University, Banashankari' },
        { time: '11:10 PM', activity: '📍Nayandanahalli Metro Stations' },
        { time: '11:30 PM', activity: '📍Kengeri metro station' },
        { time: '12:00 AM', activity: '📍Departure to base' }
      ],
      day2: [
        { time: '04:00 AM', activity: '🚌Reach Kunti Betta base camp — briefing' },
        { time: '04:20 AM', activity: '🥾Begin ascent through rocky terrain' },
        { time: '05:30 AM', activity: '🏔️Reach the summit — explore ancient fort ruins' },
        { time: '06:15 AM', activity: '🌅Witness the breathtaking Sunrise!' },
        { time: '07:30 AM', activity: '⬇️Begin descent back to base camp' },
        { time: '09:00 AM', activity: '🍽️Breakfast stop (self-sponsored)' },
        { time: '01:00 PM', activity: '🏠Return to Bangalore' }
      ]
    },
    inclusions: [
      'Travel Bangalore-Bangalore',
      'Guide Support',
      'Entry & Permits',
      'Snacks'
    ],
    exclusions: ['Main Breakfast', 'Personal Expenses'],
    thingsToCarry: ['Water bottle', 'Daypack', 'Trekking shoes', 'Govt ID']
  }
];

const Breadcrumbs = () => {
  const { id } = useParams();
  const trek = TREKS.find(t => t.id === id);

  if (!trek) return null;

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex items-center gap-2.5 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
      <Link to="/" className="hover:text-brand-orange transition-colors">Home</Link>
      <ArrowRight size={10} className="text-slate-300" />
      <span className="text-slate-300">Sunrise Treks</span>
      <ArrowRight size={10} className="text-slate-300" />
      <span className="text-brand-orange">{trek.title}</span>
    </div>
  );
};

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-[60] transition-all duration-300">
      <div className="absolute inset-0 bg-brand-dark/40 backdrop-blur-xl border-b border-white/5 shadow-2xl" />
      <div className="max-w-7xl mx-auto px-4 md:px-12 h-16 md:h-20 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-4 md:gap-10 overflow-hidden">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center cursor-pointer shrink-0"
            onClick={() => navigate('/')}
          >
            <img 
              src="https://res.cloudinary.com/dofg6bsom/image/upload/v1777088068/ChatGPT_Image_Apr_25_2026_08_58_47_AM-Photoroom_lpgwqd.png" 
              alt="Adventure Chaarana" 
              className="h-10 md:h-12 w-auto object-contain filter brightness-0 invert drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] transition-all hover:scale-105"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <nav className="hidden md:flex items-center gap-8">
            {['Home', 'Treks', 'About', 'Contact'].map((item, idx) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + idx * 0.1 }}
              >
                <Link to="/" className="text-[11px] font-black uppercase tracking-[0.25em] text-white/80 hover:text-white transition-all hover:tracking-[0.3em] relative group">
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-orange transition-all group-hover:w-full" />
                </Link>
              </motion.div>
            ))}
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <motion.button 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-brand-orange text-white px-7 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-[0_8px_20px_rgba(232,117,26,0.4)] hover:shadow-brand-orange/60 transition-all border border-white/20"
          >
            Join Community
          </motion.button>
        </div>
      </div>
    </header>
  );
};

const Background = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      {/* Desktop Landscape Background */}
      <div 
        className="hidden md:block absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2670")' }}
      />
      {/* Mobile Portrait Background */}
      <div 
        className="md:hidden absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1519904981063-b0144236c283?auto=format&fit=crop&q=80&w=1000")' }}
      />
      {/* Overlay for legibility */}
      <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px]" />
    </div>
  );
};

const Layout = ({ children, showPromo, setShowPromo }: { children: React.ReactNode; showPromo: boolean; setShowPromo: (v: boolean) => void }) => {
  const location = useLocation();
  const isDetailsPage = location.pathname.startsWith('/trek/');

  return (
    <div className="min-h-screen w-full bg-brand-paper text-brand-dark font-sans flex flex-col relative overflow-hidden">
      {!isDetailsPage && <Background />}
      <Navbar />
      
      <main className={`relative z-10 flex-1 pt-16 md:pt-20`}>
        {isDetailsPage && <Breadcrumbs />}
        {children}
      </main>

      <footer className="relative z-20 bg-brand-dark text-white pt-24 pb-12 w-full shrink-0">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2 space-y-8">
              <Link 
                to="/"
                className="inline-block"
              >
                <img 
                  src="https://res.cloudinary.com/dofg6bsom/image/upload/v1777088068/ChatGPT_Image_Apr_25_2026_08_58_47_AM-Photoroom_lpgwqd.png" 
                  alt="Adventure Chaarana" 
                  className="h-16 w-auto object-contain filter brightness-0 invert opacity-90 transition-all hover:opacity-100"
                  referrerPolicy="no-referrer"
                />
              </Link>
              <p className="text-white/40 text-sm max-w-xs font-medium leading-relaxed">
                Exploring the soul of the Western Ghats since 2018. We cultivate authentic connections between people and the mountains.
              </p>
              <div className="flex gap-4">
                {[
                  { icon: <Instagram size={18} />, url: 'https://instagram.com/adventurechaarana', label: 'Instagram' },
                  { icon: <MessageCircle size={18} />, url: 'https://wa.me/919980489494', label: 'WhatsApp' },
                  { icon: <Facebook size={18} />, url: 'https://facebook.com/adventurechaarana', label: 'Facebook' }
                ].map((social) => (
                  <a 
                    key={social.label} 
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center bg-white/5 border border-white/10 rounded-full text-white/60 hover:bg-brand-orange hover:text-brand-dark hover:border-brand-orange transition-all duration-300"
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
                <li className="hover:text-brand-orange cursor-pointer transition-colors">Our Story</li>
                <li className="hover:text-brand-orange cursor-pointer transition-colors">Safety Code</li>
                <li className="hover:text-brand-orange cursor-pointer transition-colors">Adventure Journal</li>
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
              <p className="text-white/20 text-[10px] font-bold uppercase tracking-[0.25em]">Handcrafted in BLR</p>
              <p className="text-white/20 text-[10px] font-bold uppercase tracking-[0.25em]">Leave No Trace</p>
            </div>
          </div>
        </div>
      </footer>

      <PromoModal isOpen={showPromo} onClose={() => setShowPromo(false)} />
    </div>
  );
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const TrekDetailsPage = () => {
  const { id } = useParams();
  const trek = TREKS.find(t => t.id === id);

  if (!trek) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <Compass size={64} className="text-slate-200 mb-4 animate-spin-slow" />
        <h2 className="text-2xl font-black text-slate-900 mb-2">Trek Not Found</h2>
        <p className="text-slate-500 mb-8">The expedition you're looking for doesn't exist.</p>
        <Link to="/" className="bg-emerald-500 text-white px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest shadow-lg">
          Back to Explorations
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-brand-paper pb-20 font-sans min-h-screen">
      {/* Hero Section */}
      <header className="relative min-h-[70svh] flex flex-col justify-end bg-brand-dark overflow-hidden mx-6 md:mx-12 rounded-[2rem] md:rounded-[3rem] mt-4 mb-20 shadow-2xl">
        <motion.div 
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 0.4, scale: 1 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img 
            src={trek.image} 
            alt={trek.title} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        
        {/* Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/25 via-brand-dark/5 to-brand-dark/95" 
             style={{ background: 'linear-gradient(to bottom, rgba(15,15,15,0.25) 0%, rgba(15,15,15,0.05) 35%, rgba(15,15,15,0.65) 68%, rgba(15,15,15,0.97) 100%)' }}
        />

        {/* Hero Body */}
        <div className="relative z-10 px-6 md:px-16 pb-16 md:pb-24 max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.25 }}
            className="space-y-6 md:space-y-10"
          >
            <div className="space-y-4 md:space-y-6">
              <div className="inline-flex items-center gap-2 bg-brand-orange text-white text-[10px] font-bold uppercase tracking-[0.3em] px-4 py-1.5 rounded-sm">
                ⛰️ {trek.host} · KARNATAKA
              </div>
              
              <div className="flex flex-col lg:flex-row lg:items-end gap-10 lg:gap-20">
                <div className="flex-1">
                  <h1 className="text-white font-serif text-6xl md:text-8xl lg:text-9xl font-bold leading-[0.85] tracking-tight">
                    {trek.title.split(' ')[0]}<br />
                    <span className="text-brand-orange-glow italic block mt-2">{trek.title.split(' ').slice(1).join(' ')}</span>
                  </h1>
                </div>

                <div className="flex items-center gap-8 lg:pb-6">
                  {/* Vertical Divider for desktop */}
                  <div className="hidden lg:block w-px h-32 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
                  
                  <div className="flex flex-col gap-5 shrink-0">
                    <div className="space-y-2">
                      <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 block ml-1 flex items-center gap-2">
                        <Zap size={10} className="text-brand-orange-glow" /> 
                        Exclusive Deal
                      </span>
                      <div className="flex items-center gap-6">
                        <div className="bg-brand-orange/20 backdrop-blur-xl border border-white/20 px-8 py-6 rounded-[2.5rem] shadow-[0_20px_50px_rgba(232,117,26,0.4)] flex flex-col items-center justify-center relative overflow-hidden group">
                          {/* Inner glow effect */}
                          <div className="absolute inset-0 bg-gradient-to-tr from-brand-orange/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                          <span className="text-5xl md:text-7xl font-mono font-bold text-white leading-none relative z-10">₹{trek.currentPrice.toLocaleString()}</span>
                          <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-white/70 mt-3 relative z-10">Per Person · All Inc.</span>
                        </div>
                        <div className="flex flex-col justify-center gap-2">
                           <div className="flex flex-col">
                             <span className="text-white/30 text-xs font-bold uppercase tracking-widest line-through decoration-brand-orange/40 italic">₹{trek.originalPrice.toLocaleString()}</span>
                             <span className="text-[10px] font-bold text-white/50 uppercase tracking-tighter">List Price</span>
                           </div>
                           <span className="bg-white text-brand-dark px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider shadow-lg transform -rotate-2">
                             Save {trek.discount.split(' ')[1]}
                           </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 md:gap-4 text-white/60 text-xs md:text-sm">
                <span className="flex items-center gap-1.5 font-medium tracking-wide">🏔️ {trek.elevation}</span>
                <div className="w-1 h-1 bg-white/30 rounded-full" />
                <span className="flex items-center gap-1.5 font-medium tracking-wide">{trek.distance} Round Trip</span>
                <div className="w-1 h-1 bg-white/30 rounded-full" />
                <span className="flex items-center gap-1.5 font-medium tracking-wide">{trek.location}</span>
                <div className="w-1 h-1 bg-white/30 rounded-full" />
                <span className="flex items-center gap-1.5 font-medium tracking-wide">Min Age {trek.minAge}</span>
              </div>
            </div>

            {/* Stats Glass Bar */}
            <div className="inline-flex flex-wrap bg-white/10 backdrop-blur-3xl border border-white/15 rounded-2xl overflow-hidden shadow-2xl">
              {[
                { label: 'Difficulty', val: trek.difficulty, accent: true },
                { label: 'Distance', val: trek.distance },
                { label: 'Elevation', val: trek.elevation },
                { label: 'Min Age', val: trek.minAge },
                { label: 'Type', val: trek.category === 'sunrise' ? 'Sunrise' : trek.category, accent: true }
              ].map((stat, i) => (
                <div key={i} className="px-6 md:px-8 py-4 md:py-6 border-r border-white/10 last:border-none hover:bg-brand-orange/15 transition-all text-center md:text-left min-w-[120px] md:min-w-0">
                  <span className="block text-[9px] font-bold uppercase tracking-[0.25em] text-white/45 mb-1.5">{stat.label}</span>
                  <span className={`block font-mono text-xs md:text-sm font-semibold text-white whitespace-nowrap ${stat.accent ? 'text-brand-orange-glow' : ''}`}>
                    {stat.val}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </header>

      {/* ─── OFFERS BAND ─────────────────────────────────────── */}
      <div className="bg-brand-orange relative z-20 flex flex-col md:flex-row justify-center items-stretch text-white border-y border-white/10">
        {[
          { icon: '🎁', title: '2 + 1 Offer', desc: 'Book 2 seats, bring 1 friend absolutely FREE' },
          { icon: '🧍', title: 'Solo Booking — 10% Off', desc: 'Flat discount when you register as a solo trekker' }
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-4 px-8 md:px-12 py-6 flex-1 border-b md:border-b-0 md:border-r border-white/20 last:border-none">
            <span className="text-3xl leading-none">{item.icon}</span>
            <div>
              <div className="text-sm md:text-base font-bold leading-tight">{item.title}</div>
              <div className="text-xs text-white/80 mt-0.5">{item.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16 md:py-24 space-y-24">
        {/* ─── DEPARTURE SCHEDULE ───────────────────────────────── */}
        <section>
          {/* Section Heading */}
          <div className="mb-12">
            <div className="flex items-center gap-2 text-brand-orange text-[10px] font-bold uppercase tracking-[0.3em] mb-3">
              📅 <span className="mt-0.5">Schedule</span>
            </div>
            <div className="flex items-center gap-5">
              <h2 className="font-serif text-3xl md:text-5xl font-bold text-brand-dark whitespace-nowrap leading-none">
                Departure <em className="text-brand-orange italic font-bold not-italic">Schedule</em>
              </h2>
              <div className="flex-1 h-px bg-gradient-to-r from-slate-200 to-transparent min-w-10" />
            </div>
          </div>

          <div className="bg-brand-dark rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl mb-12 relative min-h-[140px] flex items-center justify-center text-center p-10 group">
            <img 
              src={trek.gallery?.[0] || trek.image} 
              alt="Schedule Background" 
              className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 transition-all duration-1000"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-brand-dark/80 group-hover:bg-brand-dark/60 transition-all duration-700" />
            
            <div className="relative z-10 space-y-3">
              <h3 className="font-serif text-3xl md:text-4xl font-bold text-white leading-tight">
                Every <em className="text-brand-orange-glow hover:text-white transition-colors italic font-bold not-italic">Friday & Saturday</em> Night Departure
              </h3>
              <p className="text-white/60 text-sm tracking-wide">
                Night departure from Bangalore · Return by Sunday morning
              </p>
            </div>
          </div>

          {/* Timeline Itinerary */}
          <div className="space-y-16">
            {/* Day 0 */}
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-brand-orange bg-brand-orange-pale border border-brand-orange/25 px-3 py-1 rounded-sm">
                  🌃 Day 0 — Friday / Saturday Night
                </span>
                <div className="flex-1 h-px bg-gradient-to-r from-brand-orange/30 to-transparent" />
              </div>

              <div className="relative space-y-4 pl-0 before:absolute before:left-[82px] md:before:left-[102px] before:top-3 before:bottom-3 before:w-px before:bg-gradient-to-b before:from-brand-orange before:via-slate-200 before:to-transparent">
                {trek.itinerary.day1.map((item, idx) => (
                   <div key={idx} className="flex gap-0 group hover:bg-brand-orange-pale/50 rounded-lg transition-all p-3 md:p-4 -ml-3 md:-ml-4">
                     <span className="w-20 md:w-24 font-mono text-[11px] font-semibold text-brand-orange pt-1">{item.time}</span>
                     <div className="relative z-10 w-4 md:w-6 flex justify-center pt-2 md:pt-2.5">
                       <div className="w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-brand-orange ring-4 ring-brand-paper" />
                     </div>
                     <div className="flex-1 pl-4 md:pl-6 pt-0.5 font-medium text-brand-dark text-sm md:text-base leading-relaxed">
                       {item.activity}
                     </div>
                   </div>
                ))}
              </div>
            </div>

            {/* Day 1 */}
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-brand-orange bg-brand-orange-pale border border-brand-orange/25 px-3 py-1 rounded-sm">
                   🌄 Day 1 — Saturday / Sunday
                </span>
                <div className="flex-1 h-px bg-gradient-to-r from-brand-orange/30 to-transparent" />
              </div>

              <div className="relative space-y-4 pl-0 before:absolute before:left-[82px] md:before:left-[102px] before:top-3 before:bottom-3 before:w-px before:bg-gradient-to-b before:from-brand-orange before:via-slate-200 before:to-transparent">
                {trek.itinerary.day2.map((item, idx) => {
                  const isHighlight = item.activity.toLowerCase().includes('sunrise');
                  return (
                   <div key={idx} className={`flex gap-0 rounded-xl transition-all p-3 md:p-4 -ml-3 md:-ml-4 ${isHighlight ? 'bg-gradient-to-r from-brand-orange-pale to-[#FFE8CC] border border-brand-orange/20 shadow-sm my-2' : 'hover:bg-brand-orange-pale/50 group'}`}>
                     <span className="w-20 md:w-24 font-mono text-[11px] font-semibold text-brand-orange pt-1">{item.time}</span>
                     <div className="relative z-10 w-4 md:w-6 flex justify-center pt-2 md:pt-2.5">
                       <div className={`rounded-full bg-brand-orange ${isHighlight ? 'w-3.5 h-3.5 ring-4 ring-brand-orange/20 mt-[-2px]' : 'w-2 h-2 ring-4 ring-brand-paper'}`} />
                     </div>
                     <div className={`flex-1 pl-4 md:pl-6 pt-0.5 leading-relaxed ${isHighlight ? 'font-bold text-[#7A3800] text-base md:text-lg' : 'font-medium text-brand-dark text-sm md:text-base'}`}>
                       {item.activity}
                       {isHighlight && <div className="text-xs md:text-sm font-medium text-brand-orange-glow mt-1 italic leading-tight">The moment you climbed all night for ✨</div>}
                     </div>
                   </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ─── QUOTE SECTION ───────────────────────────────────── */}
        <section className="relative h-[400px] md:h-[600px] rounded-[2rem] md:rounded-[4rem] overflow-hidden flex items-center justify-center text-center px-6">
          <motion.div 
            initial={{ scale: 1.1 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 2 }}
            className="absolute inset-0"
          >
            <img src={trek.gallery?.[1] || trek.image} alt="Inspiring view" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </motion.div>
          <div className="absolute inset-0 bg-brand-dark/40" />
          <div className="relative z-10 max-w-2xl">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="font-serif text-3xl md:text-6xl text-white font-bold leading-tight"
            >
              "The best view comes after the <em className="text-brand-orange-glow italic font-bold not-italic underline decoration-brand-orange underline-offset-8">hardest climb</em>."
            </motion.p>
          </div>
        </section>

        {/* ─── WHAT YOU GET ────────────────────────────────────── */}
        <section className="space-y-12">
          <div className="mb-12">
            <div className="flex items-center gap-2 text-brand-orange text-[10px] font-bold uppercase tracking-[0.3em] mb-3">
              ✨ <span className="mt-0.5">The Perks</span>
            </div>
            <div className="flex items-center gap-5">
              <h2 className="font-serif text-3xl md:text-5xl font-bold text-brand-dark whitespace-nowrap leading-none">
                What <em className="text-brand-orange italic font-bold not-italic">You Get</em>
              </h2>
              <div className="flex-1 h-px bg-gradient-to-r from-slate-200 to-transparent min-w-10" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '🚌', title: 'Seamless Transport', desc: `Round trip from Bangalore in a comfortable traveler/bus.` },
              { icon: '👤', title: 'Expert Guides', desc: 'Led by certified mountaineers with deep local knowledge.' },
              { icon: '🎫', title: 'All Entry Fees', desc: 'No hidden costs. Forest permits and entry fees are on us.' },
              { icon: '⛩️', title: 'Cultural Insight', desc: 'Visit ancient temples and learn local heritage.' },
              { icon: '🏅', title: 'Achievement', desc: 'Earn your trek badge and certificate of completion.' },
              { icon: '🍿', title: 'Light Refreshments', desc: 'Energy-boosting snacks and drinks at the summit.' }
            ].map((item, i) => (
              <div key={i} className="bg-brand-surface p-8 rounded-3xl border border-transparent hover:border-brand-orange/20 hover:bg-white hover:shadow-xl hover:shadow-brand-orange/5 transition-all duration-300 group">
                <span className="text-4xl inline-block mb-6 group-hover:scale-110 transition-transform">{item.icon}</span>
                <h4 className="text-lg font-bold text-brand-dark mb-2">{item.title}</h4>
                <p className="text-brand-dark/60 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── INCLUSIONS & EXCLUSIONS ─── */}
        <section className="grid lg:grid-cols-2 gap-8 md:gap-12 text-brand-dark">
           {/* Inclusions */}
           <div className="bg-white border border-slate-100 p-8 md:p-12 rounded-[2.5rem] shadow-sm">
             <div className="flex items-center gap-4 mb-8">
               <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 border border-emerald-100">
                 <CheckCircle2 size={24} />
               </div>
               <h3 className="font-serif text-2xl md:text-3xl font-bold">Inclusions</h3>
             </div>
             <ul className="grid gap-4">
               {trek.inclusions.map((item, i) => (
                 <li key={i} className="flex gap-4 items-start text-brand-dark/70 font-medium">
                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                   {item}
                 </li>
               ))}
             </ul>
           </div>

           {/* Exclusions */}
           <div className="bg-white border border-slate-100 p-8 md:p-12 rounded-[2.5rem] shadow-sm">
             <div className="flex items-center gap-4 mb-8">
               <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-red-600 border border-red-100">
                 <X size={24} />
               </div>
               <h3 className="font-serif text-2xl md:text-3xl font-bold">Exclusions</h3>
             </div>
             <ul className="grid gap-4">
               {trek.exclusions.map((item, i) => (
                 <li key={i} className="flex gap-4 items-start text-brand-dark/70 font-medium italic opacity-80">
                   <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                   {item}
                 </li>
               ))}
             </ul>
           </div>
        </section>

        {/* ─── THINGS TO CARRY ─── */}
        <section className="bg-brand-dark text-white p-8 md:p-16 rounded-[2.5rem] md:rounded-[4rem] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-orange/5 blur-[120px] rounded-full" />
          
          <div className="relative z-10">
            <div className="mb-12">
              <div className="flex items-center gap-2 text-brand-orange-glow text-[10px] font-bold uppercase tracking-[0.3em] mb-3">
                🎒 <span className="mt-0.5">The Checklist</span>
              </div>
              <h2 className="font-serif text-3xl md:text-5xl font-bold text-white whitespace-nowrap leading-none">
                Things to <em className="text-brand-orange-glow italic font-bold not-italic">Carry</em>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: '👟', title: 'Trekking Shoes', desc: 'Mandatory! Sturdy sport shoes work too.' },
                { icon: '🔦', title: 'Headlamp/Torch', desc: 'Essential for night treks. Mobile torch NOT advised.' },
                { icon: '💧', title: 'Hydration', desc: 'At least 2L of water in reusable bottles.' },
                { icon: '🧥', title: 'Extra Layer', desc: 'It gets surprisingly chilly at the summit.' },
                { icon: '🍫', title: 'Power Snacks', desc: 'Energy bars, dry fruits or simple chocolates.' },
                { icon: '🎒', title: 'Backpack', desc: 'A small daypack to carry your essentials.' },
                { icon: '🪪', title: 'Valid ID', desc: 'Original Govt. ID proof is mandatory.' },
                { icon: '🔋', title: 'Powerbank', desc: 'Keep your memories powered up.' }
              ].map((item, i) => (
                <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors">
                  <span className="text-3xl inline-block mb-4">{item.icon}</span>
                  <h5 className="font-bold text-white mb-1">{item.title}</h5>
                  <p className="text-white/40 text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── TERMS & CONDITIONS ─── */}
        <section className="space-y-12 text-brand-dark">
          <div className="mb-12">
            <div className="flex items-center gap-2 text-brand-orange text-[10px] font-bold uppercase tracking-[0.3em] mb-3">
              📄 <span className="mt-0.5">The Fine Print</span>
            </div>
            <div className="flex items-center gap-5">
              <h2 className="font-serif text-3xl md:text-5xl font-bold text-brand-dark whitespace-nowrap leading-none">
                Terms & <em className="text-brand-orange italic font-bold not-italic">Conditions</em>
              </h2>
              <div className="flex-1 h-px bg-gradient-to-r from-slate-200 to-transparent min-w-10 " />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            {[
              { label: 'Booking & Refunds', desc: 'Once booked, amount is non-refundable and no rescheduling is allowed under any circumstance.', icon: '💳' },
              { label: 'Zero Substance Policy', desc: 'No smoking, drinking or any intoxicating substances. Flouting leads to immediate termination.', icon: '🚫' },
              { label: 'Code of Conduct', desc: 'Any sexual misconduct or abusive behavior results in immediate removal without refund.', icon: '⚖️' },
              { label: 'Fitness & Health', desc: 'Lack of fitness affecting team average time or health issues rendering one unable to finish.', icon: '🫀' },
              { label: 'Punctuality', desc: 'Pick-up timings are fixed. Arrive 10 mins early. No waiting for latecomers.', icon: '⏱️' },
              { label: 'Property Respect', desc: 'No damage to provided equipment or forest property. Fines apply for damages.', icon: '⛺' }
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-6 md:p-8 bg-brand-surface rounded-3xl border border-transparent hover:border-slate-200 transition-all">
                <span className="text-2xl mt-1">{item.icon}</span>
                <div>
                  <h6 className="font-bold text-brand-dark text-lg mb-1">{item.label}</h6>
                  <p className="text-brand-dark/50 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ─── FLOATING CTA ────────────────────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-6 md:p-10 flex justify-center pointer-events-none">
        <motion.button
          whileHover={{ scale: 1.02, y: -4 }}
          whileTap={{ scale: 0.98 }}
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ type: 'spring', damping: 20 }}
          onClick={() => {
            const message = `Hey, I'd like more info about ${trek.title} Trek!`;
            const waUrl = `https://wa.me/919980489494?text=${encodeURIComponent(message)}`;
            window.open(waUrl, '_blank');
          }}
          className="pointer-events-auto w-full max-w-lg bg-[#25D366] text-white py-5 rounded-2xl md:rounded-3xl font-bold text-sm uppercase tracking-[0.2em] shadow-[0_20px_50px_rgba(37,211,102,0.4)] flex items-center justify-center gap-4 group overflow-hidden relative"
        >
          <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
          <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white relative z-10" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .004 5.411.001 12.045a11.871 11.871 0 001.592 5.925L0 24l6.103-1.595a11.826 11.826 0 005.946 1.594h.005c6.634 0 12.045-5.411 12.048-12.044a11.83 11.83 0 00-3.535-8.508z" />
          </svg>
          <span className="relative z-10">Start Your Adventure</span>
        </motion.button>
      </div>
    </div>
  );
};

const TrekCard = ({ trek }: { trek: Trek }) => {
  const navigate = useNavigate();
  const handleWhatsAppInquiry = (e: React.MouseEvent) => {
    e.stopPropagation();
    const message = `Hey, can i get more information about ${trek.title} trek?`;
    const waUrl = `https://wa.me/919980489494?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      layout
      onClick={() => navigate(`/trek/${trek.id}`)}
      className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-slate-200 transition-all duration-300 border border-slate-100 group flex flex-col h-full w-full cursor-pointer"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={trek.image} 
          alt={trek.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
          <Mountain size={12} className="text-slate-900" />
          <span className="text-[10px] font-black text-slate-900 uppercase tracking-wider">{trek.category.replace('-', ' ')}</span>
        </div>
        <button className="absolute top-4 right-4 p-2.5 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-red-500 transition-all shadow-sm border border-white/30">
          <Heart size={16} fill="transparent" />
        </button>
      </div>
      
      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-bold text-xl text-slate-900 text-left mb-4 group-hover:text-brand-accent transition-colors">
          {trek.title}
        </h3>
        
        <div className="grid grid-cols-2 gap-y-3 mb-6">
          <div className="flex items-center gap-2 text-slate-500">
            <MapPin size={16} className="text-emerald-500" />
            <span className="text-xs font-bold uppercase tracking-tight">{trek.location}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-500">
            <Clock size={16} className="text-emerald-500" />
            <span className="text-xs font-bold">{trek.duration}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-500">
            <Mountain size={16} className="text-emerald-500" />
            <span className="text-xs font-bold">{trek.difficulty}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-500">
            <Calendar size={16} className="text-emerald-500" />
            <span className="text-xs font-bold whitespace-nowrap">Next: {trek.date.split(',')[0]}</span>
          </div>
        </div>

        <div className="mt-auto pt-5 border-t border-slate-100 flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900 tracking-tight">₹{trek.currentPrice.toLocaleString()}</span>
              <span className="text-sm font-bold text-slate-400 line-through">₹{trek.originalPrice.toLocaleString()}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <motion.button 
               whileHover={{ scale: 1.1 }}
               whileTap={{ scale: 0.9 }}
               onClick={handleWhatsAppInquiry}
               className="p-3 bg-emerald-500 text-white rounded-full shadow-lg shadow-emerald-500/30 hover:bg-emerald-600 transition-colors flex items-center justify-center"
               title="Inquiry on WhatsApp"
            >
              <MessageCircle size={20} fill="currentColor" />
            </motion.button>
            <motion.div 
               whileHover={{ x: 5 }}
               className="text-emerald-500"
            >
              <ArrowRight size={20} />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const PromoModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
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
            
            {/* Header / Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full transition-all z-10 group"
            >
              <X size={20} className="text-slate-400 group-hover:text-slate-900 group-hover:rotate-90 transition-transform" />
            </button>

            {/* Content */}
            <div className="p-8 md:p-10 space-y-6 md:space-y-8">
              <div className="flex justify-center">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-orange-50 rounded-2xl md:rounded-3xl flex items-center justify-center border border-orange-100 shadow-inner">
                   <Sun size={32} className="text-[#f2711c] md:size-40" strokeWidth={2.5} />
                </div>
              </div>
              
              <div className="text-center space-y-3">
                <p className="text-[#f2711c] font-black uppercase tracking-[0.3em] text-[8px] md:text-[10px]">Flash Offer</p>
                <h3 className="text-3xl md:text-4xl font-black text-slate-900 leading-[1.1] tracking-tight">
                  Buy 2 and get 1 <br/>
                  <span className="text-[#f15a24] italic uppercase">FREE</span>
                </h3>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl text-center border border-slate-100 relative overflow-hidden group">
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                <p className="text-slate-600 font-bold leading-relaxed relative z-10">
                  Valid for all <span className="text-[#f2711c]">Sunrise Treks</span> <br/> 
                  during the month of <span className="text-slate-900 font-black">May</span>.
                </p>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  const message = "Hi! I'd like to claim the 'Buy 2 Get 1 FREE' offer for the May Sunrise Treks. How can I proceed?";
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

const HomePage = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Treks', icon: <Mountain size={14} /> },
    { id: 'sunrise', label: 'Sunrise Treks', icon: <Sun size={14} /> },
    { id: 'western-ghats', label: 'Western Ghats', icon: <Compass size={14} /> },
    { id: 'weekend', label: 'Weekend getaways', icon: <Tent size={14} /> },
  ];

  const filteredTreks = TREKS.filter(trek => 
    activeCategory === 'all' || trek.category === activeCategory
  );

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative z-20 min-h-[90vh] flex flex-col items-center justify-center px-4 md:px-6 overflow-hidden">
        {/* Background Image Layer */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://res.cloudinary.com/dofg6bsom/image/upload/v1777477957/Background_tdfgts.png" 
            alt="Mountainscape" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-brand-dark/40 backdrop-blur-[2px]" />
        </div>
        
        <div className="max-w-4xl mx-auto text-center space-y-6 md:space-y-8 relative z-10 text-white pt-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-3 px-4 py-1.5 bg-white/5 backdrop-blur-xl rounded-full text-white/50 border border-white/10 font-black tracking-[0.3em] text-[8px] md:text-[10px] uppercase shadow-2xl"
          >
            <Clock size={12} className="animate-pulse text-brand-orange-glow" />
            Adventure awaits in the wild
          </motion.div>
          
          <div className="space-y-6">
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-6xl lg:text-7xl font-black leading-[0.9] tracking-tighter text-white drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
            >
              Explore the <br className="hidden md:block" /> Pure Wild with <br />
              <span className="text-brand-orange-glow italic uppercase font-serif block mt-2 md:mt-0 tracking-normal">ADVENTURE ಚಾರಣ</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="text-xs md:text-lg text-white/60 font-medium leading-relaxed max-w-xl mx-auto drop-shadow-lg px-6"
            >
              Crafting authentic mountain expeditions <br className="hidden md:block" /> 
              for the modern explorer in the heart of the Western Ghats.
            </motion.p>
          </div>
        </div>

        {/* Swipe to Explore Overlay */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-20 pointer-events-none"
        >
          <div className="flex flex-col items-center gap-1 group">
             <motion.div 
               animate={{ y: [0, 10, 0] }}
               transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
               className="relative flex flex-col items-center"
             >
               <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.5em] text-white/60 mb-2 drop-shadow-lg">Swipe to explore treks</span>
               <div className="w-px h-12 bg-gradient-to-b from-white/60 to-transparent" />
               <ChevronDown size={24} className="text-white mt-[-8px] drop-shadow-2xl" strokeWidth={3} />
             </motion.div>
          </div>
          
          {/* Animated decorative ring */}
          <motion.div 
             animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
             transition={{ duration: 3, repeat: Infinity }}
             className="absolute -bottom-4 w-32 h-32 rounded-full border border-white/10"
          />
        </motion.div>
      </section>

      {/* Category Section */}
      <section className="relative z-20 py-12 md:py-20 bg-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-3 md:mb-4">
            Explore Treks by Category
          </h2>
          <p className="text-slate-500 font-bold text-xs md:text-sm tracking-wide mb-8 md:mb-12">
            Find your next adventure based on what you love.
          </p>

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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 text-left">
            <AnimatePresence mode="popLayout">
              {filteredTreks.map((trek) => (
                <TrekCard 
                  key={trek.id} 
                  trek={trek} 
                />
              ))}
            </AnimatePresence>
          </div>
          
          {filteredTreks.length === 0 && (
            <div className="py-20 text-center">
              <Compass size={48} className="mx-auto text-slate-200 mb-4 animate-spin-slow" />
              <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No treks found in this category yet</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default function App() {
  const [showPromo, setShowPromo] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPromo(true);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout showPromo={showPromo} setShowPromo={setShowPromo}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/trek/:id" element={<TrekDetailsPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
