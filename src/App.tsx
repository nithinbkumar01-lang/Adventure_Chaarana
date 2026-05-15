/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useParams, Link, useLocation } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Clock,
  MapPin,
  Heart,
  ArrowRight,
  Mountain,
  Sun,
  Compass,
  Tent,
  X,
  ChevronDown,
  ChevronLeft,
  Instagram,
  Facebook,
  Mail,
  Phone
} from 'lucide-react';

interface ItineraryItem {
  time: string;
  activity: string;
}

interface ItineraryDay {
  label: string;
  emoji: string;
  items: ItineraryItem[];
}

interface Trek {
  id: string;
  slug: string;
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
  itinerary: ItineraryDay[];
  inclusions: string[];
  exclusions: string[];
  thingsToCarry: string[];
  gallery?: string[];
  placesCovered?: string[];
}

const TREKS: Trek[] = [
  {
    id: '1',
    slug: 'shivagange-sunrise-trek',
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
    currentPrice: 749,
    discount: '5% OFF (3+ GROUPS)',
    image: 'https://res.cloudinary.com/dofg6bsom/image/upload/v1777382263/4790249a-ade4-4ee4-b4d8-f5cd5071e794.png',
    gallery: [
      'https://res.cloudinary.com/dofg6bsom/image/upload/v1777382282/f7dd769a-8865-4ad9-9ade-ee2516d72c29.png',
      'https://res.cloudinary.com/dofg6bsom/image/upload/v1777382310/ded261f0-b7f0-4ac9-b3b5-497d4abf800c.png',
      'https://res.cloudinary.com/dofg6bsom/image/upload/v1777382331/81f35b0c-663e-45c9-99e4-5d78e5ac541c.png'
    ],
    badgeColor: 'bg-brand-orange',
    category: 'sunrise',
    itinerary: [
      {
        label: 'Day 0',
        emoji: '🌃',
        items: [
          { time: '09:30 PM', activity: '📍KLM Mall, Marathahalli' },
          { time: '10:00 PM', activity: '📍Silk Board Bus Stand' },
          { time: '10:10 PM', activity: '📍BTM, Udupi Garden Signal' },
          { time: '10:30 PM', activity: '📍Banashankari Bus Stop' },
          { time: '10:50 PM', activity: '📍PES University, Banashankari' },
          { time: '11:10 PM', activity: '📍Nagarabhavi, Marilingappa Extension' },
          { time: '11:30 PM', activity: '📍Gorguntepalya, KLE Dental College' }
        ]
      },
      {
        label: 'Day 1',
        emoji: '🌄',
        items: [
          { time: '01:30 AM', activity: '🚍 Reach Shivagange base — rest in vehicle' },
          { time: '03:30 AM', activity: '🧗 Begin trek — ascent through monolithic rock & iron ladder' },
          { time: '05:45 AM', activity: '⛰️ Reach the summit — peaceful time at the peak' },
          { time: '06:15 AM', activity: '🌅 Witness the breathtaking Sunrise from the summit!' },
          { time: '08:00 AM', activity: '⬇️ Begin descent back to base' },
          { time: '09:30 AM', activity: '🍽️ Reach base — breakfast stop (self-sponsored)' },
          { time: '01:00 PM', activity: '🚌 Return to Bangalore' }
        ]
      }
    ],
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
    slug: 'skandagiri-sunrise-trek',
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
    currentPrice: 1299,
    discount: '5% OFF (3+ GROUPS)',
    image: 'https://res.cloudinary.com/dofg6bsom/image/upload/v1777474738/7078b1c9-a8d1-4e26-84b3-d4acd604a705.png',
    gallery: [
      'https://res.cloudinary.com/dofg6bsom/image/upload/v1777474738/7078b1c9-a8d1-4e26-84b3-d4acd604a705.png',
      'https://res.cloudinary.com/dofg6bsom/image/upload/v1777474835/4f4cf98b-7e87-4312-9656-c4a6648ab864.png',
      'https://res.cloudinary.com/dofg6bsom/image/upload/v1777474854/22f3e119-a172-4cb7-97f0-f9880523fca2.png'
    ],
    badgeColor: 'bg-brand-orange',
    category: 'sunrise',
    itinerary: [
      {
        label: 'Day 0',
        emoji: '🌃',
        items: [
          { time: '09:30 PM', activity: '📍KLM Mall, Marathahalli' },
          { time: '10:00 PM', activity: '📍Silk Board Bus Stand' },
          { time: '10:10 PM', activity: '📍BTM, Udupi Garden Signal' },
          { time: '10:30 PM', activity: '📍Banashankari Bus Stop' },
          { time: '10:50 PM', activity: '📍PES University, Banashankari' },
          { time: '11:10 PM', activity: '📍Nagarabhavi, Marilingappa Extension' },
          { time: '11:30 PM', activity: '📍Gorguntepalya, KLE Dental College' },
          { time: '12:00 AM', activity: '📍Hebbal Flyover' },
          { time: '12:15 AM', activity: '📍Yelahanka, New Town Bus Stand' }
        ]
      },
      {
        label: 'Day 1',
        emoji: '🌄',
        items: [
          { time: '04:00 AM', activity: '🚌Reach Skandagiri base camp — briefing with trek lead' },
          { time: '04:20 AM', activity: '🥾Begin ascent through rocky terrain and dense forest trails' },
          { time: '05:30 AM', activity: '🏔️Reach the summit — explore ancient fort ruins' },
          { time: '06:15 AM', activity: '🌅Witness the breathtaking Sunrise above the cloud sea!' },
          { time: '07:30 AM', activity: '⬇️Begin descent back to base camp' },
          { time: '09:00 AM', activity: '🍽️Reach base — breakfast stop (self-sponsored)' },
          { time: '01:00 PM', activity: '🏠Return journey to Bangalore' }
        ]
      }
    ],
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
    slug: 'kaiwara-betta-sunrise-trek',
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
    currentPrice: 1299,
    discount: '5% OFF (3+ GROUPS)',
    image: 'https://res.cloudinary.com/dofg6bsom/image/upload/v1777474887/4bea2954-7177-4485-910b-014e64cd2e4e.png',
    gallery: [
      'https://res.cloudinary.com/dofg6bsom/image/upload/v1777474887/4bea2954-7177-4485-910b-014e64cd2e4e.png',
      'https://res.cloudinary.com/dofg6bsom/image/upload/v1777474908/0276cc50-a26d-4602-a4d6-982106b75fa5.png',
      'https://res.cloudinary.com/dofg6bsom/image/upload/v1777474931/c19f70e7-a0b0-447e-abe0-17696f60c8f8.png'
    ],
    badgeColor: 'bg-brand-orange',
    category: 'sunrise',
    itinerary: [
      {
        label: 'Day 0',
        emoji: '🌃',
        items: [
          { time: '09:30 PM', activity: '📍KLM Mall, Marathahalli' },
          { time: '10:00 PM', activity: '📍Silk Board Bus Stand' },
          { time: '10:10 PM', activity: '📍BTM, Udupi Garden Signal' },
          { time: '10:30 PM', activity: '📍Banashankari Bus Stop' },
          { time: '10:50 PM', activity: '📍PES University, Banashankari' },
          { time: '11:10 PM', activity: '📍Nagarabhavi, Marilingappa Extension' },
          { time: '11:30 PM', activity: '📍Gorguntepalya, KLE Dental College' },
          { time: '12:00 AM', activity: '📍Hebbal Flyover' },
          { time: '12:15 AM', activity: '📍Yelahanka, New Town Bus Stand' }
        ]
      },
      {
        label: 'Day 1',
        emoji: '🌄',
        items: [
          { time: '04:00 AM', activity: '🚌Reach Kaiwara base camp — briefing with trek lead' },
          { time: '04:20 AM', activity: '🥾Begin ascent through rocky terrain and dense forest trails' },
          { time: '05:30 AM', activity: '🏔️Reach the summit — explore ancient fort ruins' },
          { time: '06:15 AM', activity: '🌅Witness the breathtaking Sunrise above the cloud sea!' },
          { time: '07:30 AM', activity: '⬇️Begin descent back to base camp' },
          { time: '09:00 AM', activity: '🍽️Reach base — breakfast stop (self-sponsored)' },
          { time: '01:00 PM', activity: '🏠Return journey to Bangalore' }
        ]
      }
    ],
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
    slug: 'channarayana-durga-fort-trek',
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
    currentPrice: 749,
    discount: '5% OFF (3+ GROUPS)',
    image: 'https://res.cloudinary.com/dofg6bsom/image/upload/v1777474969/18f3337e-eda7-416e-8136-06cb6d9b31fe.png',
    gallery: [
      'https://res.cloudinary.com/dofg6bsom/image/upload/v1777474969/18f3337e-eda7-416e-8136-06cb6d9b31fe.png',
      'https://res.cloudinary.com/dofg6bsom/image/upload/v1777474987/84522134-5645-4383-bdc1-a0a992b5d501.png',
      'https://res.cloudinary.com/dofg6bsom/image/upload/v1777475006/7f827607-d5d1-4e7a-ae41-4471d40e0717.png'
    ],
    badgeColor: 'bg-brand-orange',
    category: 'sunrise',
    itinerary: [
      {
        label: 'Day 0',
        emoji: '🌃',
        items: [
          { time: '09:30 PM', activity: '📍KLM Mall, Marathahalli' },
          { time: '10:00 PM', activity: '📍Silk Board Bus Stand' },
          { time: '10:10 PM', activity: '📍BTM, Udupi Garden Signal' },
          { time: '10:30 PM', activity: '📍Banashankari Bus Stop' },
          { time: '10:50 PM', activity: '📍PES University, Banashankari' },
          { time: '11:10 PM', activity: '📍Nagarabhavi, Marilingappa Extension' },
          { time: '11:30 PM', activity: '📍Gorguntepalya, KLE Dental College' },
          { time: '12:00 AM', activity: '📍Hebbal/Tumkur Road departure' }
        ]
      },
      {
        label: 'Day 1',
        emoji: '🌄',
        items: [
          { time: '04:00 AM', activity: '🚌Reach Channarayana durga base camp — briefing' },
          { time: '04:20 AM', activity: '🥾Begin ascent through rocky terrain' },
          { time: '05:30 AM', activity: '🏔️Reach the summit — explore ancient fort ruins' },
          { time: '06:15 AM', activity: '🌅Witness the breathtaking Sunrise above the clouds!' },
          { time: '07:30 AM', activity: '⬇️Begin descent back to base camp' },
          { time: '09:00 AM', activity: '🍽️Breakfast stop (self-sponsored)' },
          { time: '01:00 PM', activity: '🏠Return to Bangalore' }
        ]
      }
    ],
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
    slug: 'uttari-betta-sunrise-trek',
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
    currentPrice: 749,
    discount: '5% OFF (3+ GROUPS)',
    image: 'https://res.cloudinary.com/dofg6bsom/image/upload/v1777475034/360f9b85-adf6-480e-b547-adf94014e7f3.png',
    gallery: [
      'https://res.cloudinary.com/dofg6bsom/image/upload/v1777475034/360f9b85-adf6-480e-b547-adf94014e7f3.png',
      'https://res.cloudinary.com/dofg6bsom/image/upload/v1777475056/167b04de-82fe-4163-b580-3fc1e6368cdf.png',
      'https://res.cloudinary.com/dofg6bsom/image/upload/v1777475125/ef67324c-eacb-462e-be2f-4c3d412a5855.png'
    ],
    badgeColor: 'bg-brand-orange',
    category: 'sunrise',
    itinerary: [
      {
        label: 'Day 0',
        emoji: '🌃',
        items: [
          { time: '09:30 PM', activity: '📍KLM Mall, Marathahalli' },
          { time: '10:00 PM', activity: '📍Silk Board Bus Stand' },
          { time: '10:10 PM', activity: '📍BTM, Udupi Garden Signal' },
          { time: '10:30 PM', activity: '📍Banashankari Bus Stop' },
          { time: '10:50 PM', activity: '📍PES University, Banashankari' },
          { time: '11:10 PM', activity: '📍Nagarabhavi, Marilingappa Extension' },
          { time: '11:30 PM', activity: '📍Gorguntepalya, KLE Dental College' },
          { time: '12:00 AM', activity: '📍Tumkur Road departure' }
        ]
      },
      {
        label: 'Day 1',
        emoji: '🌄',
        items: [
          { time: '04:00 AM', activity: '🚌Reach Uttari Betta base camp — briefing' },
          { time: '04:20 AM', activity: '🥾Begin ascent through rocky terrain' },
          { time: '05:30 AM', activity: '🏔️Reach the summit — explore ruins' },
          { time: '06:15 AM', activity: '🌅Witness the breathtaking Sunrise!' },
          { time: '07:30 AM', activity: '⬇️Begin descent back to base camp' },
          { time: '09:00 AM', activity: '🍽️Breakfast stop (self-sponsored)' },
          { time: '01:00 PM', activity: '🏠Return to Bangalore' }
        ]
      }
    ],
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
    slug: 'kunti-betta-sunrise-trek',
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
    currentPrice: 749,
    discount: '5% OFF (3+ GROUPS)',
    image: 'https://res.cloudinary.com/dofg6bsom/image/upload/v1777475200/08b8c95a-1ce5-4460-b4b2-97cceb2a5bba.png',
    gallery: [
      'https://res.cloudinary.com/dofg6bsom/image/upload/v1777475200/08b8c95a-1ce5-4460-b4b2-97cceb2a5bba.png',
      'https://res.cloudinary.com/dofg6bsom/image/upload/v1777475222/8b0a2455-249b-4d76-9613-3446c2a7be8e.png',
      'https://res.cloudinary.com/dofg6bsom/image/upload/v1777475277/72e962b8-aacb-40f0-94a1-bed8d37df76e.png'
    ],
    badgeColor: 'bg-brand-orange',
    category: 'sunrise',
    itinerary: [
      {
        label: 'Day 0',
        emoji: '🌃',
        items: [
          { time: '09:30 PM', activity: '📍KLM Mall, Marathahalli' },
          { time: '10:00 PM', activity: '📍Silk Board Bus Stand' },
          { time: '10:10 PM', activity: '📍BTM, Udupi Garden Signal' },
          { time: '10:30 PM', activity: '📍Banashankari Bus Stop' },
          { time: '10:50 PM', activity: '📍PES University, Banashankari' },
          { time: '11:10 PM', activity: '📍Nayandanahalli Metro Stations' },
          { time: '11:30 PM', activity: '📍Kengeri metro station' },
          { time: '12:00 AM', activity: '📍Departure to base' }
        ]
      },
      {
        label: 'Day 1',
        emoji: '🌄',
        items: [
          { time: '04:00 AM', activity: '🚌Reach Kunti Betta base camp — briefing' },
          { time: '04:20 AM', activity: '🥾Begin ascent through rocky terrain' },
          { time: '05:30 AM', activity: '🏔️Reach the summit — explore ancient fort ruins' },
          { time: '06:15 AM', activity: '🌅Witness the breathtaking Sunrise!' },
          { time: '07:30 AM', activity: '⬇️Begin descent back to base camp' },
          { time: '09:00 AM', activity: '🍽️Breakfast stop (self-sponsored)' },
          { time: '01:00 PM', activity: '🏠Return to Bangalore' }
        ]
      }
    ],
    inclusions: [
      'Travel Bangalore-Bangalore',
      'Guide Support',
      'Entry & Permits',
      'Snacks'
    ],
    exclusions: ['Main Breakfast', 'Personal Expenses'],
    thingsToCarry: ['Water bottle', 'Daypack', 'Trekking shoes', 'Govt ID']
  },
  {
    id: '7',
    slug: 'kodaikanal-weekend-getaway',
    title: 'Kodaikanal Weekend Getaway',
    host: 'Adventure Chaarana',
    date: 'Every Friday Night',
    location: 'Kodaikanal',
    duration: '2 Days / 1 Night',
    difficulty: 'Easy',
    elevation: '2,133 m',
    distance: '',
    minAge: '5 Years',
    description: 'Experience the magic of the "Princess of Hill Stations". From the mist-covered Dolphin\'s Nose to the tranquil Pine Forest, this getaway is the perfect mountain escape.',
    originalPrice: 5499,
    currentPrice: 5299,
    discount: 'LIMITED PRICE',
    image: 'https://res.cloudinary.com/dofg6bsom/image/upload/v1777882021/a074c025-b16c-41af-abb8-fb84452b2237.png',
    gallery: [
      'https://res.cloudinary.com/dofg6bsom/image/upload/v1777882260/36c3c181-ff93-449f-a2b9-88cc2363886c.png',
      'https://res.cloudinary.com/dofg6bsom/image/upload/v1777882199/40410f69-c7c3-44ee-9379-2d45205093c8.png',
      'https://res.cloudinary.com/dofg6bsom/image/upload/v1777882191/b9c456a5-419d-4e76-acef-d92892f1de02.png',
      'https://res.cloudinary.com/dofg6bsom/image/upload/v1777882179/c470f8bc-4a6f-4a45-b2f4-00e014a114f1.png',
      'https://res.cloudinary.com/dofg6bsom/image/upload/v1777882164/81ce5ec6-5f5a-4cdb-8e7a-b075fe6964bd.png'
    ],
    badgeColor: 'bg-brand-orange',
    category: 'weekend',
    itinerary: [
      {
        label: 'Pickups',
        emoji: '🚌',
        items: [
          { time: '08:15 PM', activity: '📍Majestic (Shanthala Silks)' },
          { time: '08:45 PM', activity: '📍Koramangala (Forum Mall)' },
          { time: '09:15 PM', activity: '📍Silk Board (Renault Showroom)' },
          { time: '09:45 PM', activity: '📍Electronic City (M5 Flyover)' }
        ]
      },
      {
        label: 'Day 1',
        emoji: '🏞️',
        items: [
          { time: '07:00 AM', activity: '🏠 Arrival & check-in at homestay' },
          { time: '08:30 AM', activity: '🍽️ Have breakfast and start day 1 itinerary' },
          { time: '09:00 AM', activity: '🏔️ Upper Lake View, Vattakanal Falls' },
          { time: '11:00 AM', activity: '🥾 Dolphin’s Nose (1.5 km trek)' },
          { time: '01:00 PM', activity: '🍽️ Lunch (self-sponsored)' },
          { time: '02:00 PM', activity: '🍫 Chocolate Factory, Bryant Park, Coaker’s Walk' },
          { time: '04:30 PM', activity: '🛶 Kodaikanal Lake (boating & activities self-sponsored)' },
          { time: '08:00 PM', activity: '🔥 Dinner & Campfire overnight stay' }
        ]
      },
      {
        label: 'Day 2',
        emoji: '🌲',
        items: [
          { time: '08:30 AM', activity: '🍽️ Breakfast & check-out' },
          { time: '09:30 AM', activity: '📸 Pillar Rocks, Guna Caves, Pine Forest' },
          { time: '01:00 PM', activity: '🍽️ Lunch (self-sponsored)' },
          { time: '02:00 PM', activity: '🏛️ Natural History Museum' },
          { time: '05:00 PM', activity: '🌊 Silver Cascade Falls' },
          { time: '09:00 PM', activity: '🚌 Departure to Bangalore' },
          { time: '04:00 AM', activity: '🏠 Arrival in Bangalore (Monday)' }
        ]
      }
    ],
    inclusions: [
      'Transportation - Non-AC seater (Tempo Traveller / Mini Bus / Bus depending on group size)',
      'Meals: Day 1 Breakfast & Dinner, Day 2 Breakfast',
      'Accommodation: Basic homestay (Shared rooms/dorms, separate for men & women, common/shared washrooms)',
      'All entry fees as per itinerary'
    ],
    exclusions: [
      'Any other expenses incurred apart from inclusions',
      'Any meals not mentioned in inclusions',
      'Any additional expenses due to emergencies / natural calamities',
      'Travel & Medical insurance',
      'Any activities, additional services & sightseeing',
      'Any travel expenses arising due to vehicle breakdown'
    ],
    thingsToCarry: [
      'Government ID (soft copy)',
      'Extra clothes & small backpack',
      'Water bottle & Toiletries',
      'Jacket/sweater (cold weather)',
      'Raincoat/umbrella',
      'Personal medication & Power bank'
    ],
    placesCovered: [
      'Upper Lake View',
      'Vattakanal Falls',
      'Dolphin’s Nose',
      'Chocolate Factory',
      'Bryant Park',
      'Coaker’s Walk',
      'Kodaikanal Lake',
      'Pillar Rocks',
      'Guna Caves',
      'Pine Forest',
      'Natural History Museum',
      'Silver Cascade Falls'
    ]
  },
  {
    id: '8',
    slug: 'tadiandamol-trek-coorg',
    title: 'Tadiandamol Trek - Coorg',
    host: 'Adventure Chaarana',
    date: 'Every Friday Night',
    location: 'Coorg, Karnataka',
    duration: '2 Days / 1 Night',
    difficulty: 'Moderate',
    elevation: '1,748 m',
    distance: '10 km (5+5)',
    minAge: '8 Years',
    description: 'Trek to the highest peak of Coorg. Experience the lush shola forests and rolling grasslands of the Western Ghats, culminating in a visit to the golden temple and Mysore.',
    originalPrice: 4499,
    currentPrice: 4199,
    discount: '5% OFF (3+ GROUPS)',
    image: 'https://res.cloudinary.com/dofg6bsom/image/upload/v1777988160/246526e1-e4af-4f2b-85c4-be56c2e0b88d.png',
    gallery: [
      'https://res.cloudinary.com/dofg6bsom/image/upload/v1777988091/2e6f0d33-147c-499e-bb9b-10e9b6da0cd9.png',
      'https://res.cloudinary.com/dofg6bsom/image/upload/v1777988362/0742d8da-17a0-4c46-883e-e3a665d9e345.png'
    ],
    badgeColor: 'bg-brand-orange',
    category: 'western-ghats',
    itinerary: [
      {
        label: 'Day 0',
        emoji: '🌃',
        items: [
          { time: '09:00 PM', activity: '📍 Majestic (Shantala Silks) - Pickup' },
          { time: '09:30 PM', activity: '📍 Nayandanahalli Metro - Pickup' },
          { time: '09:45 PM', activity: '📍 Kengeri Metro - Pickup' },
          { time: '10:00 PM', activity: '🚍 Overnight journey from Bangalore' }
        ]
      },
      {
        label: 'Day 1',
        emoji: '🥾',
        items: [
          { time: '05:00 AM', activity: '🏠 Arrival at homestay & freshen up' },
          { time: '07:00 AM', activity: '🍽️ Breakfast and briefing' },
          { time: '07:30 AM', activity: '🧗 Trek start' },
          { time: '01:00 PM', activity: '⛰️ Reach summit & enjoy packed lunch' },
          { time: '02:30 PM', activity: '⬇️ Descend back to base' },
          { time: '04:30 PM', activity: '🏰 Visit Nalknad Palace' },
          { time: '08:00 PM', activity: '🔥 Dinner, Campfire & overnight stay' }
        ]
      },
      {
        label: 'Day 2',
        emoji: '🌄',
        items: [
          { time: '08:00 AM', activity: '🌊 Visit Cheluvara Falls' },
          { time: '11:00 AM', activity: '🚧 Visit Chiklihole Dam' },
          { time: '01:00 PM', activity: '🍽️ Lunch (Self-sponsored)' },
          { time: '02:00 PM', activity: '🛕 Visit Namdroling Monastery (Golden Temple)' },
          { time: '04:00 PM', activity: '🚌 Return journey to Bangalore' },
          { time: '11:00 PM', activity: '🏠 Reach Bangalore (approx.)' }
        ]
      }
    ],
    inclusions: [
      'Transportation (Non-AC Tempo Traveller / Mini Bus)',
      'Trek permits & entry fees',
      'Experienced trek guide',
      'Accommodation (sharing basis)',
      'Meals: 2 Breakfast, 1 Packed Lunch (Day 1), 1 Dinner',
      'Sightseeing as per itinerary',
      'Finishing Badges & Achievement Certificates'
    ],
    exclusions: [
      'Day 2 Lunch & Dinner',
      'Any personal expenses',
      'Anything not mentioned in inclusions'
    ],
    thingsToCarry: [
      'Government ID (soft copy)',
      'Extra clothes & small backpack',
      'Water bottle & Toiletries',
      'Sturdy trekking shoes',
      'Raincoat/umbrella',
      'Personal medication & Power bank',
      'Energy snacks (Dry fruits, etc.)'
    ],
    placesCovered: [
      'Tadiandamol Trek',
      'Nalknad Palace',
      'Cheluvara Falls',
      'Chiklihole Dam',
      'Kushalnagara Lunch',
      'Namdroling Monastery'
    ]
  },
  {
    id: '9',
    slug: 'nethravathi-peak-trek',
    title: 'Nethravathi Peak Trek',
    host: 'Adventure Chaarana',
    date: 'Every Friday Night',
    location: 'Kudremukh, Karnataka',
    duration: '2 Days / 1 Night',
    difficulty: 'Moderate',
    elevation: '1,520 m',
    minAge: '5 Years',
    currentPrice: 4200,
    originalPrice: 5200,
    discount: '5% OFF (3+ GROUPS)',
    badgeColor: 'bg-brand-orange',
    category: 'western-ghats',
    description: 'Explore the heart of the Kudremukh National Park with the breathtaking Nethravathi Peak trek. Known for its rolling green hills, pristine streams, and spectacular views of the Western Ghats range, this trek offers a perfect escape into the pure wild.',
    image: 'https://res.cloudinary.com/dofg6bsom/image/upload/v1778087865/4ddc58ad-9e2c-4c78-949f-9931b0659405.png',
    gallery: [
      'https://res.cloudinary.com/dofg6bsom/image/upload/v1778087833/3245baef-ce1d-412a-9307-8890e1f8b175.png',
      'https://res.cloudinary.com/dofg6bsom/image/upload/v1778087824/8c0f8b5a-2b52-4af3-b965-017a2ee1f961.png',
      'https://res.cloudinary.com/dofg6bsom/image/upload/v1778087805/d176da77-e447-4b01-824c-a7af18f91cdb.png'
    ],
    itinerary: [
      {
        label: 'Day 0',
        emoji: '🌃',
        items: [
          { time: '08:00 PM', activity: '📍HSR Layout' },
          { time: '08:30 PM', activity: '📍Sony Signal, Koramangala' },
          { time: '08:45 PM', activity: '📍Domlur Post Office' },
          { time: '09:15 PM', activity: '📍KTM Mekhri Circle' },
          { time: '09:30 PM', activity: '📍Yeshwantpur' },
          { time: '10:00 PM', activity: '📍Gorguntepalya' },
          { time: '01:00 AM', activity: '📍Hassan KSRTC Bus Stand' }
        ]
      },
      {
        label: 'Day 1',
        emoji: '⛰️',
        items: [
          { time: '06:00 AM', activity: '🚍 Reach Homestay - Check-in & Freshen up' },
          { time: '07:00 AM', activity: '🍽️ Breakfast and Trek Briefing' },
          { time: '08:00 AM', activity: '🥾 Reach Trek Base and Start Climbing' },
          { time: '12:00 PM', activity: '⛰️ Reach Nethravathi Peak & Packed Lunch' },
          { time: '03:00 PM', activity: '⬇️ Descent and reach back to Homestay' },
          { time: '04:30 PM', activity: '🍵 High Tea & Evening Snacks' },
          { time: '06:00 PM', activity: '🔥 Group Games, Campfire & Rest' }
        ]
      },
      {
        label: 'Day 2',
        emoji: '🌿',
        items: [
          { time: '08:00 AM', activity: '🍳 Breakfast and Checkout' },
          { time: '08:30 AM', activity: '🍃 Samse Tea Estate Visit' },
          { time: '10:00 AM', activity: '🌉 Kalasa Hanging Bridge Visit' },
          { time: '11:00 AM', activity: '🏛️ Kalasa Temple (Dakshina Kashi)' },
          { time: '01:00 PM', activity: '🍛 Kottigehara Lunch (Local Malnad food)' },
          { time: '02:30 PM', activity: '🏛️ Visit Historic Belur Temple' },
          { time: '04:00 PM', activity: '🚌 Start journey back to Bangalore' },
          { time: '10:00 PM', activity: '🏡 Final drop-offs in Bangalore' }
        ]
      }
    ],
    inclusions: [
      'Transportation (Bangalore to Bangalore)',
      'Accommodations in Homestay/Tents (Multiple sharing)',
      'Meals: 2 Breakfasts, 1 Lunch, 1 Dinner',
      'Forest entry permissions & Guide fees',
      'Professional Trek Leads',
      'First Aid Support'
    ],
    exclusions: [
      'Day 2: Lunch & Dinner',
      'Personal snacks & Water bottles',
      'Anything not mentioned in inclusions'
    ],
    thingsToCarry: [
      'Small backpack (10-20L)',
      'Two pairs of clothes',
      'Trekking shoes with good grip',
      'Raincoat/Poncho (Mandatory in monsoons)',
      'Water bottles (min 2L)',
      'Personal emergency medicine',
      'Sunglasses & Hat'
    ],
    placesCovered: [
      'Nethravathi Peak',
      'Kudremukh Forest Area',
      'Samse Tea Estate',
      'Kalasa Hanging Bridge',
      'Kalasa Temple (Dakshina Kashi)',
      'Belur Temple'
    ]
  }
];

const Breadcrumbs = () => {
  const { slug } = useParams();
  const trek = TREKS.find(t => t.slug === slug);

  if (!trek) return null;

  return (
    <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex items-center gap-2.5 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
      <ol className="flex items-center gap-2.5" itemScope itemType="https://schema.org/BreadcrumbList">
        <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
          <Link to="/" itemProp="item" className="hover:text-brand-orange transition-colors">
            <span itemProp="name">Home</span>
          </Link>
          <meta itemProp="position" content="1" />
        </li>
        <ArrowRight size={10} className="text-slate-300" />
        <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
          <span itemProp="name" className="text-slate-300">Treks</span>
          <meta itemProp="position" content="2" />
        </li>
        <ArrowRight size={10} className="text-slate-300" />
        <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
          <span itemProp="name" className="text-brand-orange">{trek.title}</span>
          <meta itemProp="position" content="3" />
        </li>
      </ol>
    </nav>
  );
};

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToTreks = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const section = document.getElementById('treks-section');
        if (section) section.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const section = document.getElementById('treks-section');
      if (section) section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToFooter = (e: React.MouseEvent) => {
    e.preventDefault();
    const footer = document.getElementById('footer');
    if (footer) footer.scrollIntoView({ behavior: 'smooth' });
  };

  interface NavItem {
    label: string;
    onClick?: (e: React.MouseEvent) => void;
    path?: string;
  }

  const navLinksLeft: NavItem[] = [
    { label: 'Treks', onClick: scrollToTreks },
    { label: 'Contact', onClick: scrollToFooter },
    { label: 'Terms', path: '/terms' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-[60] transition-all duration-300">
      <div className="absolute inset-0 bg-brand-dark/40 backdrop-blur-xl border-b border-white/5 shadow-2xl" />
      
      {/* Desktop Centered Navbar */}
      <div className="hidden md:grid max-w-7xl mx-auto px-12 h-16 lg:h-20 grid-cols-[1fr_auto_1fr] items-center relative z-10">
        {/* Left Links */}
        <nav className="flex items-center gap-10 justify-start">
          {navLinksLeft.map((item, idx) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + idx * 0.1 }}
            >
              {item.onClick ? (
                <button 
                  onClick={item.onClick}
                  className="text-[10px] font-black uppercase tracking-[0.3em] text-white/80 hover:text-white transition-all hover:tracking-[0.35em] relative group cursor-pointer"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-orange transition-all group-hover:w-full" />
                </button>
              ) : (
                <Link to={item.path || '/'} className="text-[10px] font-black uppercase tracking-[0.3em] text-white/80 hover:text-white transition-all hover:tracking-[0.35em] relative group">
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-orange transition-all group-hover:w-full" />
                </Link>
              )}
            </motion.div>
          ))}
        </nav>

        {/* Logo (Center) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center justify-center cursor-pointer px-10"
          onClick={() => navigate('/')}
        >
          <img 
            src="https://res.cloudinary.com/dofg6bsom/image/upload/v1778076321/logo_eng_v7tdfe.png" 
            alt="Adventure Chaarana - Premium Trekking & Adventure Community Logo" 
            className="h-12 lg:h-16 w-auto object-contain transition-all hover:scale-110"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        {/* Right Section */}
        <div className="flex items-center gap-10 justify-end">
          <motion.button 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Join our WhatsApp community"
            onClick={() => {
              const message = "Hey, i would like to join the community for further updates";
              window.open(`https://wa.me/919980489494?text=${encodeURIComponent(message)}`, '_blank');
            }}
            className="bg-brand-orange text-white px-6 py-2.5 rounded-full text-[9px] font-black uppercase tracking-[0.25em] shadow-[0_8px_20px_rgba(232,117,26,0.3)] hover:shadow-brand-orange/60 transition-all border border-white/20 whitespace-nowrap"
          >
            Join Community
          </motion.button>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="md:hidden flex items-center justify-between px-6 h-14 relative z-10">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="cursor-pointer"
          onClick={() => navigate('/')}
        >
          <img 
            src="https://res.cloudinary.com/dofg6bsom/image/upload/v1778076321/logo_eng_v7tdfe.png" 
            alt="Adventure Chaarana Logo" 
            className="h-10 w-auto object-contain"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={scrollToTreks}
            className="text-[8px] font-black uppercase tracking-widest text-white/70"
          >
            Treks
          </button>
          <motion.button 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => {
              const message = "Hey, i would like to join the community for further updates";
              window.open(`https://wa.me/919980489494?text=${encodeURIComponent(message)}`, '_blank');
            }}
            className="bg-brand-orange text-white px-4 py-2 rounded-full text-[8px] font-black uppercase tracking-widest"
          >
            Join
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
      
      <main className={`relative z-10 flex-1 pt-14 md:pt-16 lg:pt-20`}>
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
                  src="https://res.cloudinary.com/dofg6bsom/image/upload/v1777088068/ChatGPT_Image_Apr_25_2026_08_58_47_AM-Photoroom_lpgwqd.png" 
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
                    icon: <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="w-[18px] h-[18px]" referrerPolicy="no-referrer" />, 
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

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const TermsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const policies = [
    {
      icon: "⚖️",
      title: "Reservation Policy",
      description: "Prioritize your slot. Cancellations 48h prior incur a 45% fee. No-shows or last-minute changes (within 48h) are strictly non-refundable."
    },
    {
      icon: "⛈️",
      title: "Unforeseen Circumstances",
      description: "Safety first! Full refunds (minus standard fees) issued if trips are cancelled by us due to natural events or government restrictions."
    },
    {
      icon: "🚧",
      title: "On-the-Road Logic",
      description: "We aren't responsible for delays caused by traffic, weather, or sudden local authority changes once the journey has begun."
    },
    {
      icon: "🚫",
      title: "Conduct Code",
      description: "We are a strictly dry/smoke-free community. Any substance use will lead to immediate removal and a permanent ban from our trips."
    },
    {
      icon: "⏱️",
      title: "Time Integrity",
      description: "Our departures are precise. To respect everyone's time and catch the views, the bus will leave exactly as scheduled."
    },
    {
      icon: "🧤",
      title: "Nature First",
      description: "Leave nothing behind but footprints. Strictly no littering; help us keep the mountains pristine by carrying your waste back."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Terms & Conditions | Adventure Chaarana</title>
        <meta name="description" content="Read the official terms and conditions of Adventure Chaarana. Booking policies, cancellation rules, and safety guidelines." />
        <link rel="canonical" href="https://adventurechaarana.com/terms" />
      </Helmet>
      {/* Header Spacer */}
      <div className="h-24" />
      
      <div className="max-w-4xl mx-auto px-6 pb-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          <div className="space-y-4">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-orange">Policy</span>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9]">Terms and <br />Conditions</h1>
          </div>

          {/* Quick Policy Grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {policies.map((policy, idx) => (
              <div key={idx} className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 flex flex-col gap-4">
                <span className="text-3xl">{policy.icon}</span>
                <h3 className="font-black text-xs uppercase tracking-wider">{policy.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">{policy.description}</p>
              </div>
            ))}
          </div>

          <div className="space-y-12 pt-12 text-slate-700">
            <section className="space-y-6">
              <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-slate-400">
                <span className="w-12 h-[1px] bg-slate-200" />
                Agreement
              </div>
              <h2 className="text-3xl font-black tracking-tight">Rules & Guidelines</h2>
              <div className="prose prose-slate prose-lg max-w-none">
                <ul className="space-y-4 list-none p-0">
                  <li className="flex gap-4">
                    <span className="text-brand-orange font-bold">01.</span>
                    <p><strong>Team Spirit:</strong> A successful expedition relies on mutual respect and cooperation with your trek captain at all times.</p>
                  </li>
                  <li className="flex gap-4">
                    <span className="text-brand-orange font-bold">02.</span>
                    <p><strong>Sober Trails:</strong> We maintain a strictly alcohol and smoke-free environment throughout the entire journey.</p>
                  </li>
                  <li className="flex gap-4">
                    <span className="text-brand-orange font-bold">03.</span>
                    <p><strong>Pristine Nature:</strong> Help us protect the wild. Disposal of any plastic or non-biodegradable waste on the trail is strictly forbidden.</p>
                  </li>
                  <li className="flex gap-4">
                    <span className="text-brand-orange font-bold">04.</span>
                    <p><strong>Regulatory Compliance:</strong> We respect local authority mandates. While we strive to provide alternatives if access is denied, we are not liable for their final decisions.</p>
                  </li>
                  <li className="flex gap-4">
                    <span className="text-brand-orange font-bold">05.</span>
                    <p><strong>Personal Gear:</strong> Participants are solely responsible for their personal items and equipment throughout the trip.</p>
                  </li>
                  <li className="flex gap-4">
                    <span className="text-brand-orange font-bold">06.</span>
                    <p><strong>Timeline Variance:</strong> Return and arrival times are estimates. Delays due to weather, traffic, or road conditions are possible.</p>
                  </li>
                  <li className="flex gap-4">
                    <span className="text-brand-orange font-bold">07.</span>
                    <p><strong>Aura of Adventure:</strong> Trekking involves basic amenities. Campfires and hot water are communal and subject to weather availability.</p>
                  </li>
                  <li className="flex gap-4">
                    <span className="text-brand-orange font-bold">08.</span>
                    <p><strong>Health & Safety:</strong> Signing our mandatory risk and indemnity disclosure is required for all. Minors must have a guardian's authorization.</p>
                  </li>
                  <li className="flex gap-4">
                    <span className="text-brand-orange font-bold">09.</span>
                    <p><strong>Secure Protection:</strong> While we prioritize safety, personal travel and medical insurance are strongly advised for all participants.</p>
                  </li>
                </ul>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-3xl font-black tracking-tight">Group Etiquette</h2>
              <p className="text-lg leading-relaxed">
                Stay with the group at all times; inform lead before separating. Participants wandering separately must formally discontinue the trip by providing an official message.
              </p>
              <p className="text-slate-500 italic">
                Adventure Chaarana reserves the right to cancel a batch if minimum participants are not reached. Refunds will be issued excluding gateway fees.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-3xl font-black tracking-tight text-red-500 uppercase">Emergency & Risks</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="font-black text-xs uppercase tracking-widest text-slate-400">Natural Hazards</h4>
                  <ul className="text-sm space-y-2 list-disc pl-4 text-slate-600">
                    <li>Extreme weather (rain, flash floods, thunderstorms, lighting)</li>
                    <li>Wildlife encounters (bears, snakes, insects) or harmful plants</li>
                    <li>Natural disasters (landslides, earthquakes, whiteouts)</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="font-black text-xs uppercase tracking-widest text-slate-400">Physical Injury</h4>
                  <ul className="text-sm space-y-2 list-disc pl-4 text-slate-600">
                    <li>AMS, Pulminary Edema (HAPE), Cerebral Edema (HACE)</li>
                    <li>Slips, falls, exposure to sun/cold (frostbite, hypothermia)</li>
                    <li>Difficulty in emergency evacuation from remote locations</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="bg-slate-900 text-white p-12 rounded-[3rem] space-y-8">
              <h2 className="text-3xl font-black tracking-tight text-brand-orange">Preparation Guidelines</h2>
              <div className="grid sm:grid-cols-2 gap-12">
                <div className="space-y-4">
                  <h4 className="font-black text-xs uppercase tracking-widest text-brand-orange/60">Do (15 Days Before)</h4>
                  <ul className="text-sm space-y-2 list-none p-0 text-slate-300">
                    <li>• Brisk walk/jog 10-12 km daily</li>
                    <li>• Stair climbing (10-15 floors)</li>
                    <li>• Strength training for legs/core</li>
                    <li>• Cardio: Running, Cycling, Swimming</li>
                    <li>• Consult a doctor before joining</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="font-black text-xs uppercase tracking-widest text-red-400">Avoid (30 Days Before)</h4>
                  <ul className="text-sm space-y-2 list-none p-0 text-slate-300">
                    <li>• Smoking, Alcohol, Vaping</li>
                    <li>• Sleep Deprivation & Junk Food</li>
                    <li>• Sudden intense new workouts</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="space-y-6 border-t border-slate-100 pt-12">
              <h2 className="text-3xl font-black tracking-tight">Photography Rights</h2>
              <p className="text-slate-600">
                Adventure Chaarana reserves the right to use trip photos/videos for promotional purposes. Booking grants us a royalty-free license. If you wish to opt-out, notify us before the journey starts.
              </p>
            </section>

            <div className="bg-red-50 p-8 rounded-[2rem] border border-red-100 text-red-900">
              <p className="text-sm font-bold leading-relaxed">
                <strong>Liability Clause:</strong> Participants join at their own risk. Adventure Chaarana is not liable for injuries, accidents, death, or loss of personal belongings. Insurance is mandatory.
              </p>
            </div>
            
            <p className="text-xs text-slate-400 font-medium leading-relaxed italic">
              Important: Due to unforeseen circumstances such as natural disasters, roadblocks, local unrest, government mandates, or severe traffic, certain locations in the itinerary may become inaccessible. In such events, Adventure Chaarana shall not be held liable, and no refunds, alternative arrangements, or compensatory claims will be provided.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const RefundPolicyPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Refund & Cancellation Policy | Adventure Chaarana</title>
        <meta name="description" content="Understand our refund process and cancellation charges. 48h cancellation rules and calamity refunds explained." />
        <link rel="canonical" href="https://adventurechaarana.com/refund-policy" />
      </Helmet>
      <div className="h-24" />
      <div className="max-w-4xl mx-auto px-6 pb-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          <div className="space-y-4">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-orange">Transparency</span>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9]">Refund <br />Policy</h1>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-900 text-white p-10 rounded-[3rem] space-y-6">
              <h3 className="text-xl font-black">Standard Cancellations</h3>
              <div className="space-y-4">
                <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                  <span className="text-brand-orange font-black text-xs block mb-1">48 HOURS OR MORE</span>
                  <p className="text-sm font-medium">45% of total package amount will be deducted as cancellation charges.</p>
                </div>
                <div className="p-6 bg-red-500/10 rounded-2xl border border-red-500/20">
                  <span className="text-red-400 font-black text-xs block mb-1">WITHIN 48 HOURS</span>
                  <p className="text-sm font-medium">Strictly no refunds or rescheduling allowed under any circumstances.</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100 flex flex-col justify-center gap-6">
              <h3 className="text-xl font-black">Natural Calamities</h3>
              <p className="text-slate-600 leading-relaxed">
                If a trip is cancelled by Adventure Chaarana due to natural disasters, political unrest, or forest entry prohibitions before the journey starts, a <strong>Full Refund</strong> will be issued (minus GST or Gateway fees).
              </p>
              <div className="flex items-center gap-3 text-brand-orange">
                <span className="text-2xl">⛈️</span>
                <span className="text-xs font-black uppercase tracking-widest">Weather Protection</span>
              </div>
            </div>
          </div>

          <div className="space-y-12 pt-12">
            <section className="space-y-6">
              <h2 className="text-3xl font-black tracking-tight">Terms of Refund</h2>
              <div className="prose prose-slate prose-lg max-w-none text-slate-600">
                <ul className="space-y-4 list-none p-0">
                  <li className="flex gap-4">
                    <span className="text-brand-orange font-bold">•</span>
                    <p><strong>Punctuality:</strong> The bus will leave at the scheduled time. No refunds for latecomers as sunset/sunrise waits for no one.</p>
                  </li>
                  <li className="flex gap-4">
                    <span className="text-brand-orange font-bold">•</span>
                    <p><strong>Route Blocks:</strong> No refunds or alternative arrangements if the itinerary is blocked by traffic, weather, or authority restrictions during travel.</p>
                  </li>
                  <li className="flex gap-4">
                    <span className="text-brand-orange font-bold">•</span>
                    <p><strong>Batch Cancellation:</strong> Adventure Chaarana reserves the right to cancel a batch if minimum participants are not reached. Refunds will be issued excluding gateway fees.</p>
                  </li>
                  <li className="flex gap-4">
                    <span className="text-brand-orange font-bold">•</span>
                    <p><strong>Termination:</strong> Any participant expelled for breach of conduct (smoking, drinking, nuisance) will not be eligible for a refund.</p>
                  </li>
                </ul>
              </div>
            </section>

            <div className="bg-blue-50 p-10 rounded-[3rem] border border-blue-100">
              <h3 className="text-lg font-black mb-4">Refund Processing</h3>
              <p className="text-sm text-blue-900 leading-relaxed font-medium">
                Approved refunds are typically processed within 5-7 working days and credited back to the original payment source. For any queries regarding your cancellation, please contact our support team with your booking ID.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const SafetyPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Safety Code & Conduct | Adventure Chaarana</title>
        <meta name="description" content="Safety is our priority. Learn about our 'Leave No Trace' policy, group conduct rules, and biological risk awareness." />
        <link rel="canonical" href="https://adventurechaarana.com/safety-code" />
      </Helmet>
      <div className="h-24" />
      <div className="max-w-4xl mx-auto px-6 pb-24 text-slate-700">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-16"
        >
          <div className="space-y-4">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-500">Ethics</span>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9]">Safety & <br />Conduct</h1>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-cyan-50 p-10 rounded-[3rem] border border-cyan-100 flex flex-col gap-6">
              <span className="text-4xl">🌍</span>
              <h3 className="text-xl font-black">Environment First</h3>
              <p className="text-sm leading-relaxed font-medium text-cyan-900/70">
                We maintain a strict <strong>"Leave No Trace"</strong> policy. Every piece of plastic or waste you carry in must be carried back to the city. Respect the local flora and fauna.
              </p>
            </div>
            <div className="bg-orange-50 p-10 rounded-[3rem] border border-orange-100 flex flex-col gap-6">
              <span className="text-4xl">🤝</span>
              <h3 className="text-xl font-black">Group Harmony</h3>
              <p className="text-sm leading-relaxed font-medium text-orange-900/70">
                Respect fellow trekkers and local culture. Disrespectful, harmful, or illegal behavior results in immediate expulsion without refund.
              </p>
            </div>
          </div>

          <section className="space-y-8">
            <h2 className="text-3xl font-black tracking-tight">Adventure Safety Code</h2>
            <div className="grid gap-4">
              {[
                { title: "No Sustance Use", desc: "Strictly no drinking or smoking during the entire duration of the trip. Safety depends on your alertness.", icon: "🚫" },
                { title: "Listen to Leads", desc: "Follow the Trip Captain's instructions at all times. Do not enter water bodies or explore solo without permission.", icon: "📣" },
                { title: "Stay Together", desc: "Never separate from the group. If you wander off, you must formally discontinue the trip via an official message.", icon: "👫" },
                { title: "Gear Check", desc: "Ensure you are carrying the recommended gear and wearing appropriate shoes. Safety starts with preparation.", icon: "👟" }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 p-6 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                  <span className="text-2xl shrink-0">{item.icon}</span>
                  <div className="space-y-1">
                    <h4 className="font-black text-sm uppercase tracking-wider">{item.title}</h4>
                    <p className="text-slate-500 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-slate-900 text-white p-12 rounded-[3.5rem] space-y-10">
            <div className="space-y-2">
              <h2 className="text-3xl font-black tracking-tight text-red-400">Biological & Physical Risks</h2>
              <p className="text-slate-400 text-sm">Every participant must be aware of the inherent risks of adventure travel.</p>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-12 text-sm">
              <div className="space-y-4">
                <h4 className="font-black uppercase tracking-widest text-slate-500">Outdoor Hazards</h4>
                <ul className="space-y-3 list-none p-0 text-slate-300">
                  <li className="flex gap-3"><span className="text-red-400">•</span> Flash floods & thunderstorms</li>
                  <li className="flex gap-3"><span className="text-red-400">•</span> Snake bites & insect stings</li>
                  <li className="flex gap-3"><span className="text-red-400">•</span> Landslides & extreme cold</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-black uppercase tracking-widest text-slate-500">Physical Sickness</h4>
                <ul className="space-y-3 list-none p-0 text-slate-300">
                  <li className="flex gap-3"><span className="text-red-400">•</span> AMS & Pulmonary Edema</li>
                  <li className="flex gap-3"><span className="text-red-400">•</span> Heatstroke / Hypothermia</li>
                  <li className="flex gap-3"><span className="text-red-400">•</span> Slips & falls in remote areas</li>
                </ul>
              </div>
            </div>
          </section>

          <div className="bg-blue-50 p-8 rounded-[2.5rem] border border-blue-100 italic text-blue-900 text-sm text-center">
            "We do not inherit the earth from our ancestors, we borrow it from our children." — Let's travel responsibly. 🌲
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const TrekDetailsPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const trek = TREKS.find(t => t.slug === slug);

  const getUpcomingBatches = (trek: Trek) => {
    const batches = [];
    const today = new Date();
    const isOneDay = trek.duration.toLowerCase().includes('1 day');
    
    // Check next 30 days
    for (let i = 0; i < 30; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);
      const day = date.getDay(); // 0: Sun, 5: Fri, 6: Sat

      // One day: Fri & Sat departures
      // Two day: Only Fri departures
      if (day === 5 || (isOneDay && day === 6)) {
        const startDate = new Date(date);
        const endDate = new Date(date);
        endDate.setDate(startDate.getDate() + (isOneDay ? 1 : 2));

        const formatDate = (d: Date) => d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
        
        batches.push({
          start: formatDate(startDate),
          end: formatDate(endDate),
          year: startDate.getFullYear(),
          dayName: startDate.toLocaleDateString('en-IN', { weekday: 'short' })
        });
      }
      if (batches.length >= 4) break;
    }
    return batches;
  };

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

  const onBack = () => navigate(-1);

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
      {/* ─── PROFESSIONAL COMPACT NAV ─── */}
      <nav className="fixed top-0 left-0 right-0 z-[70] bg-white/90 backdrop-blur-xl border-b border-slate-100 px-6 h-12 flex items-center justify-between shadow-sm">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-brand-dark transition-all group"
        >
          <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back
        </button>
        <div className="hidden md:flex items-center gap-3 bg-slate-50 px-4 py-1.5 rounded-full border border-slate-200">
           <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Trek:</span>
           <span className="text-[9px] font-black uppercase tracking-widest text-brand-dark">{trek.title}</span>
        </div>
        <button className="bg-brand-orange text-white px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.2em] shadow-lg shadow-brand-orange/20 hover:scale-105 transition-all">
          Join Now 🧗
        </button>
      </nav>

      {/* ─── IMMERSIVE CENTERED HERO ─── */}
      <header className="relative pt-12 flex flex-col justify-center items-center min-h-[45vh] md:min-h-[55vh] overflow-hidden text-center px-6">
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
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-orange text-white text-[10px] font-black uppercase tracking-[0.4em] rounded-full mx-auto"
          >
            ⛰️ Karnataka Trekking Expedition
          </motion.div>
          
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
              className="flex flex-wrap justify-center gap-6 text-white/50 font-bold text-[10px] uppercase tracking-widest pt-2"
            >
              <span className="flex items-center gap-1.5">🏔️ {trek.elevation}</span>
              {trek.distance && <span className="flex items-center gap-1.5">📏 {trek.distance} Total</span>}
              <span className="flex items-center gap-1.5">📍 {trek.location}</span>
              <span className="flex items-center gap-1.5">👶 Age {trek.minAge}+</span>
            </motion.div>
          </div>

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
              <div className="flex flex-col">
                <span className="text-[8px] font-black text-brand-orange-glow uppercase tracking-[0.2em] mb-1">Current Offer</span>
                <span className="text-[10px] font-black text-white uppercase tracking-wider">{trek.discount}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* ─── SCROLLING OFFERS BAND ─── */}
      <div className="bg-brand-dark/95 text-white/50 py-3 md:py-4 overflow-hidden flex whitespace-nowrap border-y border-white/5 backdrop-blur-md relative">
        {/* Subtle texture overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        
        <motion.div 
          animate={{ x: [0, -1200] }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          className="flex gap-20 items-center px-12 relative z-10"
        >
          {[1,2,3,4,5].map(i => (
            <React.Fragment key={i}>
              <div className="flex items-center gap-3">
                <span className="text-xl md:text-2xl">🎁</span>
                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white/80">Offer: 5% OFF FOR GROUPS ABOVE 3 PEOPLE</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xl md:text-2xl">🌍</span>
                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white/80">{trek.id === '7' ? 'Safe & Eco-Friendly Travel' : 'Eco-Sensitive Explorations'}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xl md:text-2xl">🧗</span>
                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white/80">Certified Expedition Leads</span>
              </div>
            </React.Fragment>
          ))}
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 md:py-12 space-y-16 md:space-y-20">
        {/* ─── PLACES WE COVER ─── */}
        {trek.placesCovered && trek.placesCovered.length > 0 && (
          <section className="space-y-8">
            <div className="flex items-center gap-3">
              <span className="text-brand-orange text-[8px] font-black uppercase tracking-[0.4em]">📍 Highlights</span>
              <div className="flex-1 h-px bg-slate-100" />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-3xl md:text-5xl font-black text-brand-dark tracking-tighter leading-tight">
                Places We <span className="text-brand-orange italic font-serif">Explore</span>
              </h2>
              <p className="text-slate-400 font-medium text-xs max-w-lg">
                Our curated itinerary ensures you witness the most iconic landmarks and hidden gems this landscape has to offer.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3">
              {trek.placesCovered.map((place, idx) => (
                <div key={idx} className="bg-white border border-slate-100 p-3 rounded-xl flex items-center gap-2 hover:shadow-lg hover:shadow-slate-100 transition-all group">
                   <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center shrink-0 group-hover:bg-brand-orange/10 transition-colors">
                     <MapPin size={14} className="text-slate-300 group-hover:text-brand-orange transition-colors" />
                   </div>
                   <span className="text-[9px] font-black text-slate-600 leading-tight uppercase tracking-tight">{place}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ─── BATCHES & PICKUPS ─── */}
        <section className="grid lg:grid-cols-2 gap-8 sticky-trigger">
          {/* Upcoming Batches */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-brand-orange text-[8px] font-black uppercase tracking-[0.4em]">📆 Available Batches</span>
              <div className="flex-1 h-px bg-slate-100" />
            </div>
            
            <div className="space-y-4">
              <h3 className="text-2xl font-black tracking-tight text-brand-dark italic">Upcoming <span className="text-brand-orange">Expeditions</span></h3>
              <div className="grid gap-3">
                {getUpcomingBatches(trek).map((batch, idx) => {
                  const whatsappMsg = encodeURIComponent(`Hi Adventure Chaarana! I'm interested in booking the ${trek.title} for the batch: ${batch.start} - ${batch.end}, ${batch.year}. Please provide more details.`);
                  const waLink = `https://wa.me/9980489494?text=${whatsappMsg}`;

                  return (
                    <a 
                      key={idx} 
                      href={waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group bg-white border border-slate-100 p-5 rounded-2xl flex items-center justify-between hover:border-brand-orange/30 hover:shadow-xl hover:shadow-slate-100 transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-5">
                        <div className="flex flex-col items-center justify-center w-14 h-14 rounded-2xl bg-slate-50 group-hover:bg-brand-orange group-hover:text-white transition-colors">
                          <span className="text-[10px] font-black uppercase tracking-tighter opacity-60">{batch.dayName}</span>
                          <span className="text-lg font-black">{batch.start.split(' ')[0]}</span>
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-brand-orange uppercase tracking-widest mb-0.5">Booking Open</p>
                          <p className="font-bold text-slate-800 text-sm">{batch.start} - {batch.end}, {batch.year}</p>
                        </div>
                      </div>
                      <button className="bg-slate-50 text-slate-400 group-hover:bg-brand-orange group-hover:text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
                        Book Now
                      </button>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Pickup Points */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-cyan-500 text-[8px] font-black uppercase tracking-[0.4em]">🚍 Boarding Points</span>
              <div className="flex-1 h-px bg-slate-100" />
            </div>

            <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Compass size={120} className="text-white animate-spin-slow" />
              </div>
              
              <div className="relative z-10 space-y-8">
                <div className="space-y-1">
                   <h3 className="text-2xl font-black tracking-tight text-white italic">Pickup <span className="text-cyan-400">Locations</span></h3>
                   <p className="text-[10px] uppercase font-black tracking-widest text-white/40 italic">Departures from Bangalore</p>
                </div>

                <div className="space-y-6">
                  {(trek.itinerary[0]?.items.filter(item => item.activity.includes('📍')) || []).map((p, idx, filtered) => (
                    <div key={idx} className="flex gap-4 group/point">
                      <div className="flex flex-col items-center gap-1 shrink-0">
                         <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                         {idx < filtered.length - 1 && <div className="w-px flex-1 bg-white/10" />}
                      </div>
                      <div className="pb-4">
                        <span className="text-[9px] font-black text-cyan-400 uppercase tracking-widest">{p.time}</span>
                        <p className="font-bold text-sm text-white/90">{p.activity.replace('📍', '').trim()}</p>
                        <p className="text-[9px] text-white/40 font-medium uppercase tracking-tighter mt-0.5">Boarding Point</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── COMPACT TIMELINE ─── */}
        <section className="space-y-8">
          <div className="relative rounded-2xl overflow-hidden p-6 md:p-10 bg-gradient-to-br from-slate-900 via-brand-dark to-slate-900 shadow-2xl">
            <div className="absolute inset-0 z-0">
               <img src={trek.image} alt={`Trek Timeline - ${trek.title}`} className="w-full h-full object-cover opacity-20 grayscale" />
               <div className="absolute inset-0 bg-brand-dark/40 backdrop-blur-[2px]" />
            </div>
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 relative z-10">
              <div className="space-y-1">
                <div className="text-brand-orange text-[8px] font-black uppercase tracking-[0.4em] drop-shadow-lg">📅 Timeline</div>
                <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter leading-tight drop-shadow-xl">
                  Departure <span className="text-brand-orange-glow italic font-serif">Schedule</span>
                </h2>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/10 flex items-center gap-3">
                <span className="text-xl">🗓️</span>
                <div>
                  <p className="text-[8px] font-black uppercase tracking-widest text-white/50">Batches</p>
                  <p className="font-bold text-white text-[10px]">Friday Night Departure</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
            <div className="space-y-12">
               {trek.itinerary.map((day, dIdx) => (
                 <div key={dIdx} className="space-y-4">
                   <div className="flex items-center gap-3">
                      <span className="text-[9px] font-black uppercase tracking-widest text-brand-orange bg-brand-orange/5 px-3 py-1 rounded-full border border-brand-orange/10">
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
                              <span className="text-[8px] font-black text-brand-orange uppercase tracking-widest">{item.time}</span>
                              <p className={`font-bold leading-tight ${isHighlight ? 'text-brand-dark text-[11px]' : 'text-slate-600 text-xs'}`}>{item.activity}</p>
                              {isHighlight && <p className="text-[7px] font-black uppercase tracking-[0.2em] text-brand-orange mt-1">✨ EXPEDITION POINT</p>}
                            </div>
                          </div>
                        );
                      })}
                   </div>
                 </div>
               ))}
            </div>

            <div className="hidden lg:block sticky top-20 h-fit">
              <div className="relative rounded-[2rem] overflow-hidden shadow-lg group">
                 <img src={trek.gallery?.[1] || trek.image} alt={`Expedition Highlights - ${trek.title}`} className="w-full aspect-video object-cover transition-transform duration-1000 group-hover:scale-105" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                 <div className="absolute bottom-4 left-4 text-white">
                   <p className="text-xl font-black leading-tight italic">"Where steps lead to <br/> better views."</p>
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── FULL SCREEN COMPACT QUOTE ─── */}
        <section className="relative h-[30vh] md:h-[40vh] rounded-[2.5rem] overflow-hidden flex items-center justify-center text-center px-6">
          <div className="absolute inset-0">
             <img src={trek.gallery?.[0] || trek.image} alt={`Mountain views from ${trek.title}`} className="w-full h-full object-cover" />
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

        {/* ─── EXPEDITION PERKS ─── */}
        <section className="space-y-8">
          <div className="relative rounded-2xl overflow-hidden p-6 md:p-10 bg-gradient-to-br from-slate-900 via-brand-dark to-slate-900 shadow-2xl">
            <div className="absolute inset-0 z-0">
               <img src={trek.gallery?.[1] || trek.image} alt={`Trekking perks at ${trek.title}`} className="w-full h-full object-cover opacity-20 grayscale" />
               <div className="absolute inset-0 bg-brand-dark/40 backdrop-blur-[2px]" />
            </div>
            <div className="space-y-1 relative z-10">
              <div className="text-brand-orange text-[8px] font-black uppercase tracking-[0.4em] drop-shadow-lg">✨ Included</div>
              <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter leading-tight drop-shadow-xl">
                Expedition <span className="text-brand-orange-glow italic font-serif">Perks</span>
              </h2>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '🚌', title: 'Comfortable Transit', desc: 'Hassle-free round-trip travel from Bangalore in our well-maintained and sanitized push-back Tempo Travelers.' },
              { icon: '👤', title: 'Professional Guidance', desc: 'Safety-first navigation by our certified mountaineers and local trek veterans who know the terrain inside out.' },
              { icon: '🎫', title: 'Smooth Clearances', desc: 'We handle all necessary forest permissions and entry permits, so you can focus solely on your adventure.' },
              { icon: '🏅', title: 'Summit Mementos', desc: 'Receive a premium physical metal badge—a badge of honor to remember your mountain conquest.' },
              { icon: '📜', title: 'Official Recognition', desc: 'Get a signed digital certificate of achievement, documenting your grit and successful summit.' }
            ].map((item, i) => (
              <div key={i} className="group p-8 bg-white border border-slate-100 rounded-2xl hover:shadow-xl transition-all duration-300">
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand-orange/10 transition-all font-bold">
                  <span className="text-3xl">{item.icon}</span>
                </div>
                <h4 className="text-lg font-black text-brand-dark mb-2 group-hover:text-brand-orange transition-colors">{item.title}</h4>
                <p className="text-slate-500 text-xs font-medium leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── INCLUSIONS & EXCLUSIONS ─── */}
        <section className="space-y-10">
          <div className="relative rounded-2xl overflow-hidden p-6 md:p-10 bg-gradient-to-br from-slate-900 via-brand-dark to-slate-900 shadow-2xl">
            <div className="absolute inset-0 z-0">
               <img src={trek.image} alt={`Trek inclusions and exclusions for ${trek.title}`} className="w-full h-full object-cover opacity-20 grayscale" />
               <div className="absolute inset-0 bg-brand-dark/40 backdrop-blur-[2px]" />
            </div>
            <div className="space-y-1 relative z-10">
              <div className="text-brand-orange text-[8px] font-black uppercase tracking-[0.4em] drop-shadow-lg">📑 Logistics</div>
              <h3 className="text-3xl md:text-4xl font-black text-white tracking-tighter leading-tight drop-shadow-xl">
                Inclusions & <span className="text-brand-orange-glow italic font-serif">Exclusions</span>
              </h3>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-emerald-500/20 pb-4">
                <span className="text-2xl">✅</span>
                <h4 className="text-xl font-black text-brand-dark uppercase tracking-tight">What's Included</h4>
              </div>
              <ul className="space-y-4">
                {trek.inclusions.map((item, idx) => (
                  <li key={idx} className="flex gap-4 group">
                    <div className="w-6 h-6 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 group-hover:bg-emerald-500 group-hover:text-white transition-all text-emerald-600">
                      <span className="text-[10px] font-black">✓</span>
                    </div>
                    <p className="text-slate-600 font-bold text-xs leading-relaxed">{item}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-red-500/20 pb-4">
                <span className="text-2xl">❌</span>
                <h4 className="text-xl font-black text-brand-dark uppercase tracking-tight">What's Excluded</h4>
              </div>
              <ul className="space-y-4">
                {trek.exclusions.map((item, idx) => (
                  <li key={idx} className="flex gap-4 group">
                    <div className="w-6 h-6 rounded-full bg-red-50 border border-red-100 flex items-center justify-center shrink-0 group-hover:bg-red-500 group-hover:text-white transition-all text-red-600">
                      <span className="text-[10px] font-black">✕</span>
                    </div>
                    <p className="text-slate-600 font-bold text-xs leading-relaxed">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ─── CHECKLIST ─── */}
        <section className="bg-slate-900 text-white p-8 md:p-14 rounded-[3rem] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(232,117,26,0.1),transparent)]" />
          
          <div className="relative z-10 grid lg:grid-cols-3 gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="text-brand-orange text-[9px] font-black uppercase tracking-[0.4em]">🎒 Checklist</div>
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-none">Gear Up for <br/> the Wild</h2>
              </div>
              <p className="text-white/40 font-bold text-sm leading-relaxed max-w-xs">Pack light, pack smart. These essential items ensure you enjoy the rugged mountain terrain without discomfort.</p>
              <div className="p-5 bg-white/5 rounded-2xl border border-white/10 text-white/50 text-[10px] font-bold leading-tight">
                💡 Pro Tip: Wear full-length trekking pants to avoid scratches from wild shrubs and rough rocks.
              </div>
            </div>

            <div className="lg:col-span-2 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {trek.thingsToCarry.map((item, i) => {
                const getIcon = (text: string) => {
                  const t = text.toLowerCase();
                  if (t.includes('shoe')) return '👟';
                  if (t.includes('torch') || t.includes('headlamp')) return '🔦';
                  if (t.includes('water') || t.includes('bottle')) return '💧';
                  if (t.includes('jacket') || t.includes('sweater') || t.includes('clothes')) return '🧥';
                  if (t.includes('id') || t.includes('proof')) return '🪪';
                  if (t.includes('medication') || t.includes('aid')) return '🩹';
                  if (t.includes('power') || t.includes('charger')) return '🔋';
                  if (t.includes('bag') || t.includes('pack')) return '🎒';
                  if (t.includes('rain') || t.includes('umbrella')) return '☔';
                  if (t.includes('toiletries') || t.includes('brush')) return '🪥';
                  if (t.includes('snack') || t.includes('fruit')) return '🍎';
                  return '📍';
                };
                return (
                  <div key={i} className="flex gap-4 group">
                    <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 shrink-0 group-hover:bg-brand-orange transition-colors">
                      <span className="text-2xl">{getIcon(item)}</span>
                    </div>
                    <div className="space-y-1">
                      <h5 className="font-bold text-white text-sm">{item}</h5>
                      <p className="text-white/30 text-[10px] leading-tight">Must-have essential</p>
                    </div>
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

        {/* ─── ONE DAY GALLERY (CONDITIONAL) ─── */}
        {trek.duration.toLowerCase().includes('1 day') && <OneDayGallery />}

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
              { icon: '⚖️', label: 'Reservation Policy', desc: 'Prioritize your slot. Cancellations 48h prior incur a 45% fee. No-shows or last-minute changes (within 48h) are strictly non-refundable.' },
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
                  <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
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

          <div className="grid lg:grid-cols-2 gap-12 text-slate-600">
            <div className="space-y-8">
              <div className="space-y-4">
                <h5 className="font-black text-brand-dark uppercase tracking-tight flex items-center gap-2">
                  <span className="w-2 h-2 bg-brand-orange rounded-full" />
                  Important Note
                </h5>
                <ul className="space-y-3 text-[10px] md:text-[11px] font-medium leading-relaxed list-disc pl-4 marker:text-brand-orange">
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
                <div className="space-y-4 text-[10px] md:text-[11px] font-medium leading-relaxed">
                  <p>Participants need to respect the ethnicity, culture, environment of the place of visit & fellow trekkers. Any behavior deemed disrespectful, harmful, or illegal may result in immediate expulsion without refund.</p>
                  <p>Littering, damaging, or any illegal activities that harm the ecosystem is strictly prohibited. We maintain a strict "Leave No Trace" policy.</p>
                </div>
              </div>

              <div className="space-y-4">
                <h5 className="font-black text-brand-dark uppercase tracking-tight flex items-center gap-2">
                  <span className="w-2 h-2 bg-brand-orange rounded-full" />
                  Emergency & Risks
                </h5>
                <div className="space-y-4 text-[10px] md:text-[11px] font-medium leading-relaxed">
                  <p className="font-bold text-slate-900 mb-2">Natural Hazards:</p>
                  <ul className="list-disc pl-4 space-y-1 text-slate-500">
                    <li>Extreme weather (rain, flash floods, thunderstorms, lighting)</li>
                    <li>Wildlife encounters (bears, snakes, insects) or harmful plants</li>
                    <li>Natural disasters (landslides, earthquakes, whiteouts)</li>
                  </ul>
                  <p className="font-bold text-slate-900 mb-2 mt-4">Altitude & Physical Injury:</p>
                  <ul className="list-disc pl-4 space-y-1 text-slate-500">
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
                      <p className="text-[10px] font-black uppercase text-white/40 tracking-widest">Prepare 15 days before:</p>
                      <ul className="text-[10px] md:text-[11px] list-disc pl-4 space-y-1 text-white/60">
                        <li>Brisk walk/jog 10-12 km daily</li>
                        <li>Stair climbing (10-15 floors)</li>
                        <li>Strength training for legs/core</li>
                        <li>Cardio: Running, Cycling, Swimming</li>
                        <li>Consult a doctor before joining</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <p className="text-[10px] font-black uppercase text-white/40 tracking-widest">30 Days Before (Avoid):</p>
                      <ul className="text-[10px] md:text-[11px] list-disc pl-4 space-y-1 text-white/60">
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
                 <p className="text-[10px] md:text-[11px] font-medium leading-relaxed">
                   Adventure Chaarana reserves the right to terminate a participant's trip for:
                   <span className="block mt-2 font-bold text-red-500 underline underline-offset-4 decoration-red-500/20">Smoking, drinking, sexual misconduct, physical/verbal abuse, lack of fitness affecting the team, or ignoring safety rules.</span>
                   No refunds will be provided in case of termination.
                 </p>
               </div>

               <div className="p-6 border-2 border-brand-orange/20 rounded-2xl bg-brand-orange/5">
                 <h6 className="font-black text-brand-orange uppercase tracking-tight text-xs mb-2">Photography Rights</h6>
                 <p className="text-[9px] md:text-[10px] font-medium text-slate-500 leading-relaxed italic">
                   Adventure Chaarana reserves the right to use trip photos/videos for promotional purposes. Booking grants us a royalty-free license. If you wish to opt-out, notify us before the journey starts.
                 </p>
               </div>

               <div className="space-y-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                 <h5 className="font-black text-slate-900 uppercase tracking-tight text-xs">Liability Clause</h5>
                 <p className="text-[9px] md:text-[10px] font-medium text-slate-500 leading-relaxed">
                   Participants join at their own risk. Adventure Chaarana is not liable for injuries, accidents, death, or loss of personal belongings. Insurance is mandatory.
                 </p>
               </div>

               <div className="p-6 bg-brand-orange/10 border-2 border-brand-orange rounded-2xl">
                 <p className="text-[10px] md:text-[11px] font-black text-brand-orange leading-relaxed uppercase tracking-tight">
                   Important: Due to unforeseen circumstances such as natural disasters, roadblocks, local unrest, government mandates, or severe traffic, certain locations in the itinerary may become inaccessible. In such events, Adventure Chaarana shall not be held liable, and no refunds, alternative arrangements, or compensatory claims will be provided.
                 </p>
               </div>
            </div>
          </div>
        </section>
      </div>

      {/* ─── FLOATING CTA ─── */}
      <div className="fixed bottom-6 left-0 right-0 z-[60] px-6 pointer-events-none">
        <div className="max-w-md mx-auto flex gap-4 pointer-events-auto">
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              const message = `I want to book the ${trek.title} Expedition! 🧗`;
              window.open(`https://wa.me/919980489494?text=${encodeURIComponent(message)}`, '_blank');
            }}
            className="flex-1 bg-[#25D366] text-white py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl flex items-center justify-center gap-3 relative overflow-hidden border border-white/20"
          >
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WA" className="w-6 h-6 brightness-0 invert" />
            Confirm My Slot
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

const TrekCard = ({ trek }: { trek: Trek }) => {
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
        
        <div className="grid grid-cols-2 gap-4 mb-10">
          <div className="flex items-center gap-2 text-slate-400">
            <MapPin size={16} />
            <span className="text-xs font-bold">{trek.location}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <Clock size={16} />
            <span className="text-xs font-bold">{trek.duration}</span>
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between bg-slate-50 p-5 rounded-[2rem] border border-slate-100 transition-all group-hover:bg-brand-orange/5 group-hover:border-brand-orange/10 group-hover:shadow-lg group-hover:shadow-brand-orange/5">
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-0.5">Expedition from</span>
            <span className="text-2xl font-black text-slate-900 tracking-tight">₹{trek.currentPrice.toLocaleString()}</span>
          </div>
          {trek.discount && (
            <div className="bg-brand-orange/10 px-3 py-1 rounded-full border border-brand-orange/20">
              <span className="text-[8px] font-black text-brand-orange uppercase tracking-wider">{trek.discount}</span>
            </div>
          )}
          <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-slate-400 group-hover:text-brand-orange group-hover:scale-110 transition-all border border-slate-100">
            <ArrowRight size={20} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ONE_DAY_TREK_GALLERY = [
  "https://res.cloudinary.com/dofg6bsom/image/upload/f_auto,q_auto/v1778590561/IMG_2607_esvkdr.jpg",
  "https://res.cloudinary.com/dofg6bsom/image/upload/f_auto,q_auto/v1778590561/IMG_5569_bhnmtl.jpg",
  "https://res.cloudinary.com/dofg6bsom/image/upload/f_auto,q_auto/v1778591373/IMG_6197_ltwjvy.jpg",
  "https://res.cloudinary.com/dofg6bsom/image/upload/f_auto,q_auto/v1778591371/WhatsApp_Image_2026-05-12_at_6.38.22_PM_ty88zx.jpg",
  "https://res.cloudinary.com/dofg6bsom/image/upload/f_auto,q_auto/v1778591370/WhatsApp_Image_2026-05-12_at_6.38.12_PM_n44wjf.jpg",
  "https://res.cloudinary.com/dofg6bsom/image/upload/f_auto,q_auto/v1778591370/WhatsApp_Image_2026-05-12_at_6.38.18_PM_yximiw.jpg",
  "https://res.cloudinary.com/dofg6bsom/image/upload/f_auto,q_auto/v1778591369/WhatsApp_Image_2026-05-12_at_6.38.09_PM_xosgii.jpg",
  "https://res.cloudinary.com/dofg6bsom/image/upload/f_auto,q_auto/v1778590560/3_snpy8h.jpg",
  "https://res.cloudinary.com/dofg6bsom/image/upload/f_auto,q_auto/v1778590559/2_fisfsx.jpg",
  "https://res.cloudinary.com/dofg6bsom/image/upload/f_auto,q_auto/v1778590558/IMG_5667_t9uf2n.jpg",
  "https://res.cloudinary.com/dofg6bsom/image/upload/f_auto,q_auto/v1778590560/4_cgzqva.jpg",
  "https://res.cloudinary.com/dofg6bsom/image/upload/f_auto,q_auto/v1778590557/IMG_5646_jvzjm2.jpg",
  "https://res.cloudinary.com/dofg6bsom/image/upload/f_auto,q_auto/v1778590556/IMG_5621_qhbc3b.jpg",
  "https://res.cloudinary.com/dofg6bsom/image/upload/f_auto,q_auto/v1778590556/IMG_5628_xnbiec.jpg",
  "https://res.cloudinary.com/dofg6bsom/image/upload/f_auto,q_auto/v1778590556/IMG_6090_mgegx2.jpg",
  "https://res.cloudinary.com/dofg6bsom/image/upload/f_auto,q_auto/v1778590555/IMG_3743_dinczl.jpg"
];

const OneDayGallery = () => {
  return (
    <section className="py-20 md:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        <div className="text-center space-y-4">
          <div className="text-brand-orange text-[10px] font-black uppercase tracking-[0.4em]">📸 Expedition Moments</div>
          <h2 className="text-4xl md:text-6xl font-black text-brand-dark tracking-tighter leading-tight">
            One-Day <span className="text-brand-orange italic font-serif">Escapes Gallery</span>
          </h2>
          <p className="text-slate-500 font-bold text-sm tracking-wide max-w-xl mx-auto">
            A window into the wild. Authentic captures from our sunrise trails, monolithic climbs, and the vibrant community that calls the mountains home.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {ONE_DAY_TREK_GALLERY.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="relative overflow-hidden rounded-[2rem] border border-slate-100 group aspect-square"
            >
              <img 
                src={img} 
                alt={`Adventure Chaarana One Day Trek Gallery Moment ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-brand-dark/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-6">
                 <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 shadow-2xl translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                   <Mountain size={20} />
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
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
                  Flat 5% Group Discount <br/>
                  <span className="text-[#f15a24] italic uppercase text-xl">for groups above 3 people</span>
                </h3>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl text-center border border-slate-100 relative overflow-hidden group">
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                <p className="text-slate-600 font-bold leading-relaxed relative z-10">
                  Join with your team and save! <br/> 
                  <span className="text-slate-900 font-black uppercase tracking-widest text-xs">Available for all upcoming adventures</span>.
                </p>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  const message = "Hi! I'd like to claim the 5% group discount for groups above 3. How can I proceed?";
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
      <Helmet>
        <title>Adventure Chaarana | Premium Trekking & Adventure Community in Bangalore</title>
        <meta name="description" content="Explore the pure wild with Adventure Chaarana. We offer the best sunrise treks, weekend getaways, and western ghats expeditions from Bangalore. Join our active adventure community." />
        <meta name="keywords" content="trekking bangalore, sunrise treks bangalore, adventure community bangalore, western ghats trek, kodaikanal trip, tadiandamol trek, adventure chaarana" />
        <link rel="canonical" href="https://adventurechaarana.com/" />
        
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://adventurechaarana.com/" />
        <meta property="og:title" content="Adventure Chaarana | Premium Trekking & Adventure Community" />
        <meta property="og:description" content="Explore the pure wild with Bangalore's most active trekking community." />
        <meta property="og:image" content="https://res.cloudinary.com/dofg6bsom/image/upload/v1778076321/logo_eng_v7tdfe.png" />
      </Helmet>
      {/* Hero Section */}
      <section className="relative z-20 min-h-[90vh] flex flex-col items-center justify-center px-4 md:px-6 overflow-hidden">
        {/* Background Image Layer */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://res.cloudinary.com/dofg6bsom/image/upload/v1777477957/Background_tdfgts.png" 
            alt="Scenic mountain range background for Adventure Chaarana" 
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
              <span className="text-brand-orange-glow italic uppercase font-serif block mt-2 md:mt-0 tracking-normal">
                Adventure Chaarana
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="text-xs md:text-lg text-white/60 font-medium leading-relaxed max-w-xl mx-auto drop-shadow-lg px-6"
            >
              Designing genuine wilderness expeditions from Bangalore <br className="hidden md:block" /> 
              for bold adventurers across the majestic Western Ghats.
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
      <section id="treks-section" className="relative z-20 py-12 md:py-20 bg-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-3 md:mb-4">
            Explore Treks by Category
          </h2>
          <p className="text-slate-500 font-bold text-xs md:text-sm tracking-wide mb-8 md:mb-12">
            Choose your next thrill from our handpicked collection of curated escapes.
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

      {/* ─── ONE DAY GALLERY ─── */}
      <OneDayGallery />
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
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Layout showPromo={showPromo} setShowPromo={setShowPromo}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/trek/:slug" element={<TrekDetailsPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/refund-policy" element={<RefundPolicyPage />} />
            <Route path="/safety-code" element={<SafetyPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </HelmetProvider>
  );
}
