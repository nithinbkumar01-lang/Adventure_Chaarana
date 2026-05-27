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
  Phone,
  Menu,
  MessageCircle
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
  timeHours?: string;
  modeRating?: string;
  permitNotice?: string;
  withoutTransportPrice?: number;
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
    currentPrice: 699,
    discount: '',
    image: 'https://res.cloudinary.com/dofg6bsom/image/upload/v1779729654/image_1_bnw4tp.jpg',
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
    discount: '',
    image: 'https://res.cloudinary.com/dofg6bsom/image/upload/v1779802982/86ce7479-7313-47db-b5af-7ae6c8e9fb11.png',
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
    discount: '',
    image: 'https://res.cloudinary.com/dofg6bsom/image/upload/v1779802923/00106417-19b2-46ab-8b9e-c4c5c56e79e7.png',
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
    currentPrice: 699,
    discount: '',
    image: 'https://res.cloudinary.com/dofg6bsom/image/upload/v1779729197/image_3_swk6mc.jpg',
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
    currentPrice: 699,
    discount: '',
    image: 'https://res.cloudinary.com/dofg6bsom/image/upload/v1779802809/82e28a63-fc59-44a2-bac3-2b774cba36ee.png',
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
    currentPrice: 699,
    discount: '',
    image: 'https://res.cloudinary.com/dofg6bsom/image/upload/v1779802763/de1cb9df-c637-419f-883e-da3138f91ea5.png',
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
    image: 'https://res.cloudinary.com/dofg6bsom/image/upload/f_auto,q_auto/v1779440963/7_bs3g3k.jpg',
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
      'Transportation - Non-AC seater (TT/ Mini bus/ Bus depending on group size)',
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
    withoutTransportPrice: 3199,
    discount: '₹200 OFF (5+ GROUPS)',
    image: 'https://res.cloudinary.com/dofg6bsom/image/upload/v1779803084/f50903b9-53b1-436e-9f47-506c3a7e29f5.png',
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
      'Return transportation from Bangalore — Tempo Traveller, Mini Bus, or Bus (non-A/C, based on group size)',
      'All meals as per itinerary — Saturday Breakfast, Lunch & Dinner; Sunday Breakfast (South Indian Vegetarian)',
      'Shared homestay accommodation with separate rooms and washrooms for men & women',
      'Off-road Jeep ride to and from the Forest Department trek start point',
      'Forest entry permit fee',
      'Certified Trek Guide with First Aid training',
      'Local guide throughout the experience',
      'Complimentary participation badge or certificate'
    ],
    exclusions: [
      'Friday night dinner and Sunday lunch & dinner on the return journey',
      'Any personal expenses beyond what is listed above',
      'Costs arising from medical emergencies or natural calamities',
      'Travel insurance of any kind — available on request at additional cost',
      'Any extra activities, sightseeing, or services not mentioned in the itinerary',
      'Payment gateway charges & GST applicable on website bookings'
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
    location: 'Chikamagaluru',
    duration: '2 Days / 1 Night',
    difficulty: 'Moderate',
    elevation: '4500ft+',
    distance: '12km(Round)',
    minAge: '5+',
    timeHours: '8Hrs',
    modeRating: 'Easy - Moderate',
    permitNotice: 'Forest permits are limited to just 300 trekkers per day. Book at least 15–20 days in advance.',
    currentPrice: 4199,
    originalPrice: 4499,
    withoutTransportPrice: 3199,
    discount: '₹200 OFF (5+ GROUPS)',
    badgeColor: 'bg-brand-orange',
    category: 'western-ghats',
    description: 'Explore the heart of the Kudremukh National Park with the breathtaking Nethravathi Peak trek. Known for its rolling green hills, pristine streams, and spectacular views of the Western Ghats range, this trek offers a perfect escape into the pure wild.',
    image: 'https://res.cloudinary.com/dofg6bsom/image/upload/v1779440961/8_yga9f8.jpg',
    gallery: [
      'https://res.cloudinary.com/dofg6bsom/image/upload/v1779440973/2_bckyhk.jpg',
      'https://res.cloudinary.com/dofg6bsom/image/upload/v1779440971/3_itucgf.jpg',
      'https://res.cloudinary.com/dofg6bsom/image/upload/v1779440970/4_iby5xb.jpg',
      'https://res.cloudinary.com/dofg6bsom/image/upload/v1779440967/5_ylvihq.jpg',
      'https://res.cloudinary.com/dofg6bsom/image/upload/v1779440965/6_u5qtbo.jpg',
      'https://res.cloudinary.com/dofg6bsom/image/upload/v1779440963/7_bs3g3k.jpg',
      'https://res.cloudinary.com/dofg6bsom/image/upload/v1779440960/WhatsApp_Image_2026-05-22_at_1.33.54_PM_uvvckq.jpg',
      'https://res.cloudinary.com/dofg6bsom/image/upload/v1778087865/4ddc58ad-9e2c-4c78-949f-9931b0659405.png',
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
          { time: '10:00 AM', activity: '🌉 Kalasa Hanging Bridge / KPP Prathistana' },
          { time: '11:15 AM', activity: '🛕 Visit Kalasa Temple' },
          { time: '12:45 PM', activity: '🍛 Kottigehara Lunch (Local Malnad food)' },
          { time: '02:00 PM', activity: '🛕 Visit Horanadu Temple / Belur Temple' },
          { time: '04:30 PM', activity: '🚌 Start journey back to Bangalore' },
          { time: '10:30 PM', activity: '🏡 Final drop-offs in Bangalore' }
        ]
      }
    ],
    inclusions: [
      'Return transportation from Bangalore — Tempo Traveller, Mini Bus, or Bus (non-A/C, based on group size)',
      'All meals as per itinerary — Saturday Breakfast, Lunch & Dinner; Sunday Breakfast (South Indian Vegetarian)',
      'Shared homestay accommodation with separate rooms and washrooms for men & women',
      'Off-road Jeep ride to and from the Forest Department trek start point',
      'Forest entry permit fee',
      'Certified Trek Guide with First Aid training',
      'Local guide throughout the experience',
      'Complimentary participation badge or certificate'
    ],
    exclusions: [
      'Friday night dinner and Sunday lunch & dinner on the return journey',
      'Any personal expenses beyond what is listed above',
      'Costs arising from medical emergencies or natural calamities',
      'Travel insurance of any kind — available on request at additional cost',
      'Any extra activities, sightseeing, or services not mentioned in the itinerary',
      'Payment gateway charges & GST applicable on website bookings'
    ],
    thingsToCarry: [
      'Govt ID (either PAN / DL / Voter - whatever document submitted during booking)',
      'Raincoat (essential!)',
      'Trekking / Hiking shoes',
      'Trekking stick',
      'Polybag for wet clothes',
      'Sandals / flip flops',
      'Small backpack',
      'Water Bottle and Lunch Box',
      'Toiletries',
      'Sweater / Jacket',
      'Torch / Flashlight',
      'Energy bars, dry fruits, Glucon-D',
      'Suncap & sunglasses',
      'Waterproof phone cover',
      'Charger / Power bank',
      'Personal medications & Dettol'
    ],
    placesCovered: [
      'Nethravathi Peak',
      'Kudremukh Forest Area',
      'Samse Tea Estate',
      'Kalasa Hanging Bridge / KPP Prathistana',
      'Kalasa Temple',
      'Horanadu Temple / Belur Temple'
    ]
  },
  {
    id: '10',
    slug: 'bandaje-waterfalls-trek',
    title: 'Bandaje Waterfalls Trek',
    host: 'Adventure Chaarana',
    date: 'Every Friday Night',
    location: 'Chikmagalur, Karnataka',
    duration: '2 Days / 1 Night',
    difficulty: 'Moderate',
    elevation: '1,012 m',
    minAge: '5 Years',
    currentPrice: 4199,
    originalPrice: 5199,
    withoutTransportPrice: 3199,
    discount: '₹200 OFF (5+ GROUPS)',
    badgeColor: 'bg-brand-orange',
    category: 'western-ghats',
    description: 'Trek to the pristine Bandaje Waterfalls nestled in the Western Ghats of Karnataka. Immerse yourself in misty grasslands, navigate lush mountain trails, and discover enchanting vistas at Rani Jhari viewpoint, Kodige Falls, Samse Tea Estate, and the ancient Hoysala temples of Belur.',
    image: 'https://res.cloudinary.com/dofg6bsom/image/upload/v1779803469/6030ae08-a7a3-4ddb-9d9e-3c135b4aea19.png',
    gallery: [
      'https://res.cloudinary.com/dofg6bsom/image/upload/f_auto,q_auto/v1779440961/8_yga9f8.jpg',
      'https://res.cloudinary.com/dofg6bsom/image/upload/f_auto,q_auto/v1778087833/3245baef-ce1d-412a-9307-8890e1f8b175.png',
      'https://res.cloudinary.com/dofg6bsom/image/upload/f_auto,q_auto/v1778087824/8c0f8b5a-2b52-4af3-b965-017a2ee1f961.png',
      'https://res.cloudinary.com/dofg6bsom/image/upload/f_auto,q_auto/v1779440960/WhatsApp_Image_2026-05-22_at_1.33.54_PM_uvvckq.jpg'
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
        emoji: '🥾',
        items: [
          { time: '06:00 AM', activity: '🚍 Reach Homestay near Charmadi - Check-in & Freshen up' },
          { time: '07:30 AM', activity: '🍽️ Breakfast and Trek Briefing' },
          { time: '08:30 AM', activity: '🥾 Reach Trek Base and Start climbing the Bandaje Waterfalls trail' },
          { time: '01:00 PM', activity: '⛰️ Reach the stunning waterfall cliff edge & enjoy packed lunch by the stream' },
          { time: '02:00 PM', activity: '📸 Explore the pristine forest landscape and capture panoramic valley views' },
          { time: '03:00 PM', activity: '⬇️ Descend back to the base village' },
          { time: '06:00 PM', activity: '🍵 Reach Homestay - High Tea & Hot Snacks' },
          { time: '08:00 PM', activity: '🔥 Engage in group bonding, Campfire, Dinner & overnight stay' }
        ]
      },
      {
        label: 'Day 2',
        emoji: '🌿',
        items: [
          { time: '07:00 AM', activity: '🍳 Breakfast and Checkout from Homestay' },
          { time: '08:00 AM', activity: '⛰️ Rani Jhari View Point (Gaze at the breathtaking mist-lined valleys)' },
          { time: '09:30 AM', activity: '🌊 Kodige Falls Visit (Play in the safe, refreshing natural cascades)' },
          { time: '11:00 AM', activity: '🍃 Samse Tea Estate Visit (Walk through lush, emerald tea gardens)' },
          { time: '01:00 PM', activity: '🍛 Kottigehara Lunch (Traditional local Malnad style food - self sponsored)' },
          { time: '02:30 PM', activity: '🛕 Visit Historic Belur Temple (Marvel at the exquisite Hoysala carvings)' },
          { time: '04:00 PM', activity: '🚌 Start return journey to Bangalore' },
          { time: '10:30 PM', activity: '🏡 Final drop-offs in Bangalore with fond memories' }
        ]
      }
    ],
    inclusions: [
      'Return transportation from Bangalore — Tempo Traveller, Mini Bus, or Bus (non-A/C, based on group size)',
      'All meals as per itinerary — Saturday Breakfast, Lunch & Dinner; Sunday Breakfast (South Indian Vegetarian)',
      'Shared homestay accommodation with separate rooms and washrooms for men & women',
      'Off-road Jeep ride to and from the Forest Department trek start point',
      'Forest entry permit fee & Bandekallu Falls entry fee',
      'Certified Trek Guide with First Aid training',
      'Local guide throughout the experience',
      'Complimentary participation badge or certificate'
    ],
    exclusions: [
      'Friday night dinner and Sunday lunch & dinner on the return journey',
      'Any personal expenses beyond what is listed above',
      'Costs arising from medical emergencies or natural calamities',
      'Travel insurance of any kind — available on request at additional cost',
      'Any extra activities, sightseeing, or services not mentioned in the itinerary',
      'Payment gateway charges & GST applicable on website bookings'
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
      'Bandaje Waterfalls',
      'Rani Jhari View point',
      'Kodige Falls',
      'Tea Estate',
      'Belur Temple'
    ]
  },
  {
    id: '11',
    slug: 'kodachadri-trek-hidlumane-falls',
    title: 'Kodachadri Trek with Hidlumane Falls',
    host: 'Adventure Chaarana',
    date: 'Every Friday Night',
    location: 'Shimoga, Karnataka',
    duration: '2 Days / 1 Night',
    difficulty: 'Moderate',
    elevation: '1,343 m',
    distance: '14 km (total)',
    minAge: '8 Years',
    description: 'Trek to the majestic Kodachadri peak in the Western Ghats, passing through dense tropical rainforests, the stunning Hidlumane waterfalls, and ending at the historical Sarvagna Peeta. Admire rich flora, stunning ridge walks, and deep valleys.',
    originalPrice: 4999,
    currentPrice: 3999,
    withoutTransportPrice: 2999,
    discount: '₹200 OFF (5+ GROUPS)',
    image: 'https://res.cloudinary.com/dofg6bsom/image/upload/v1779799743/image_2_xahwhm.webp',
    gallery: [
      'https://res.cloudinary.com/dofg6bsom/image/upload/v1779799743/image_1_zeockn.webp',
      'https://res.cloudinary.com/dofg6bsom/image/upload/v1779799743/image_3_a8kccv.webp',
      'https://res.cloudinary.com/dofg6bsom/image/upload/v1779799743/image_4_z5jcb8.webp',
      'https://res.cloudinary.com/dofg6bsom/image/upload/v1779799743/main_sf29os.webp',
      'https://res.cloudinary.com/dofg6bsom/image/upload/v1779799743/image_5_jrdwzb.webp',
      'https://res.cloudinary.com/dofg6bsom/image/upload/v1779799743/img_7_c4e3lo.webp',
      'https://res.cloudinary.com/dofg6bsom/image/upload/v1779799743/img7_fsftye.jpg'
    ],
    badgeColor: 'bg-brand-orange',
    category: 'western-ghats',
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
          { time: '11:30 PM', activity: '📍Tumkur' },
          { time: '01:00 AM', activity: '📍Chitradurga' },
          { time: '03:00 AM', activity: '📍Shivamogga' }
        ]
      },
      {
        label: 'Day 1',
        emoji: '🥾',
        items: [
          { time: '06:00 AM', activity: '🚍 Reach Homestay, freshen up, and enjoy breakfast' },
          { time: '08:00 AM', activity: '🥾 Trek start and enter dense tropical forest' },
          { time: '10:00 AM', activity: '🌊 Reach mystical Hidlumane Falls and freshen up in natural cascade' },
          { time: '01:00 PM', activity: '🛞 High energy off-road Jeep ride back and lunch stop' },
          { time: '03:00 PM', activity: '⛰️ Scenic ridge trek to Sarvagna Peeta' },
          { time: '05:00 PM', activity: '🛞 Sunset Jeep ride back to Homestay' },
          { time: '08:00 PM', activity: '🔥 Warm Campfire, group activities, and delicious traditional local Dinner' }
        ]
      },
      {
        label: 'Day 2',
        emoji: '🏰',
        items: [
          { time: '07:30 AM', activity: '🍳 Breakfast and Checkout from Homestay' },
          { time: '08:00 AM', activity: '⛲ Visit peaceful Devagange temple pond' },
          { time: '10:00 AM', activity: '🏰 Visit historic Nagara Fort' },
          { time: '01:00 PM', activity: '🏡 Reach Kavimane (birthplace of legendary poet Kuvempu)' },
          { time: '02:00 PM', activity: '🍛 Delicious traditional malnad style local Lunch (self-sponsored)' },
          { time: '03:30 PM', activity: '🚌 Start return journey to Bangalore' },
          { time: '10:30 PM', activity: '🏡 Final drop-offs in Bangalore with unforgettable memories' }
        ]
      }
    ],
    inclusions: [
      'Return transportation from Bangalore — Tempo Traveller, Mini Bus, or Bus (non-A/C, based on group size)',
      'All meals as per itinerary — Saturday Breakfast, Lunch & Dinner; Sunday Breakfast (South Indian Vegetarian)',
      'Shared homestay accommodation with separate rooms and washrooms for men & women',
      'Off-road Jeep ride to and from the Forest Department trek start point',
      'Forest entry permit fee',
      'Certified Trek Guide with First Aid training',
      'Local guide throughout the experience',
      'Complimentary participation badge or certificate'
    ],
    exclusions: [
      'Friday night dinner and Sunday lunch & dinner on the return journey',
      'Any personal expenses beyond what is listed above',
      'Costs arising from medical emergencies or natural calamities',
      'Travel insurance of any kind — available on request at additional cost',
      'Any extra activities, sightseeing, or services not mentioned in the itinerary',
      'Payment gateway charges & GST applicable on website bookings'
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
      'Hidlumane Falls',
      'Kodachadri Peak',
      'Sarvagna Peeta',
      'Devagange temple pond',
      'Nagara Fort',
      'Kavimane (Kuppali)'
    ]
  },
  {
    id: '12',
    slug: 'gangadikallu-trek-dzukou-valley-of-the-south',
    title: 'Gangadikallu Trek (Dzukou Valley of the South)',
    host: 'Adventure Chaarana',
    date: 'Every Friday Night',
    location: 'Chikamagaluru',
    duration: '2 Days / 1 Night',
    difficulty: 'Moderate',
    elevation: '1,455 m',
    distance: '10km(Round)',
    minAge: '5+',
    timeHours: '7Hrs',
    modeRating: 'Easy - Moderate',
    permitNotice: 'Forest permits are limited. Book at least 15–20 days in advance.',
    currentPrice: 3999,
    originalPrice: 4499,
    withoutTransportPrice: 2999,
    discount: '₹200 OFF (5+ GROUPS)',
    badgeColor: 'bg-brand-orange',
    category: 'western-ghats',
    description: 'Trek to Gangadikallu (also known as the Dzukou Valley of the south), a hidden paradise in the Kudremukh forest range. Experience pristine wind-swept green grasslands, misty rolling hills, and breathtaking vistas away from the crowd.',
    image: 'https://res.cloudinary.com/dofg6bsom/image/upload/v1779800406/img_2_yyldcy.webp',
    gallery: [
      'https://res.cloudinary.com/dofg6bsom/image/upload/v1779800409/WhatsApp_Image_2026-05-22_at_1.33.54_PM_xx2hg3.jpg',
      'https://res.cloudinary.com/dofg6bsom/image/upload/v1779800408/7_msaf0f.jpg',
      'https://res.cloudinary.com/dofg6bsom/image/upload/v1779800407/img3_qiauj3.webp',
      'https://res.cloudinary.com/dofg6bsom/image/upload/v1779800407/6_i7nfl8.jpg',
      'https://res.cloudinary.com/dofg6bsom/image/upload/v1779800407/main_img_kw3yyx.webp',
      'https://res.cloudinary.com/dofg6bsom/image/upload/v1779800406/img_4_gpvmv5.webp',
      'https://res.cloudinary.com/dofg6bsom/image/upload/v1779800406/img_5_kukbyx.webp'
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
          { time: '12:00 PM', activity: '⛰️ Reach Gangadikallu Peak & enjoy packed lunch' },
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
          { time: '10:00 AM', activity: '🌉 Kalasa Hanging Bridge / KPP Prathistana' },
          { time: '11:15 AM', activity: '🛕 Visit Kalasa Temple' },
          { time: '12:45 PM', activity: '🍛 Kottigehara Lunch (Local Malnad food)' },
          { time: '02:00 PM', activity: '🛕 Visit Horanadu Temple / Belur Temple' },
          { time: '04:30 PM', activity: '🚌 Start journey back to Bangalore' },
          { time: '10:30 PM', activity: '🏡 Final drop-offs in Bangalore' }
        ]
      }
    ],
    inclusions: [
      'Return transportation from Bangalore — Tempo Traveller, Mini Bus, or Bus (non-A/C, based on group size)',
      'All meals as per itinerary — Saturday Breakfast, Lunch & Dinner; Sunday Breakfast (South Indian Vegetarian)',
      'Shared homestay accommodation with separate rooms and washrooms for men & women',
      'Off-road Jeep ride to and from the Forest Department trek start point',
      'Forest entry permit fee',
      'Certified Trek Guide with First Aid training',
      'Local guide throughout the experience',
      'Complimentary participation badge or certificate'
    ],
    exclusions: [
      'Friday night dinner and Sunday lunch & dinner on the return journey',
      'Any personal expenses beyond what is listed above',
      'Costs arising from medical emergencies or natural calamities',
      'Travel insurance of any kind — available on request at additional cost',
      'Any extra activities, sightseeing, or services not mentioned in the itinerary',
      'Payment gateway charges & GST applicable on website bookings'
    ],
    thingsToCarry: [
      'Govt ID (either PAN / DL / Voter - whatever document submitted during booking)',
      'Raincoat (essential!)',
      'Trekking / Hiking shoes',
      'Trekking stick',
      'Polybag for wet clothes',
      'Sandals / flip flops',
      'Small backpack',
      'Water Bottle and Lunch Box',
      'Toiletries',
      'Sweater / Jacket',
      'Torch / Flashlight',
      'Energy bars, dry fruits, Glucon-D',
      'Suncap & sunglasses',
      'Waterproof phone cover',
      'Charger / Power bank',
      'Personal medications & Dettol'
    ],
    placesCovered: [
      'Gangadikallu Peak',
      'Kudremukh Forest Area',
      'Samse Tea Estate',
      'Kalasa Hanging Bridge / KPP Prathistana',
      'Kalasa Temple',
      'Horanadu Temple / Belur Temple'
    ]
  },
  {
    id: '13',
    slug: 'kudremukh-trek',
    title: 'Kudremukh Trek',
    host: 'Adventure Chaarana',
    date: 'Every Friday Night',
    location: 'Chikamagaluru',
    duration: '2 Days / 1 Night',
    difficulty: 'Difficult',
    elevation: '1,894 m (6,214 ft)',
    distance: '20 km (total)',
    minAge: '8+',
    timeHours: '12Hrs',
    modeRating: 'Moderate - Difficult',
    permitNotice: 'Forest permits are limited. Book at least 15–20 days in advance.',
    currentPrice: 3999,
    originalPrice: 4499,
    withoutTransportPrice: 2999,
    discount: '₹200 OFF (5+ GROUPS)',
    badgeColor: 'bg-brand-orange',
    category: 'western-ghats',
    description: 'Scale the second-highest peak in Karnataka! Formed in the shape of a horse face, the Kudremukha Trek provides stunning views of the Western Ghats grasslands, deep valleys, misty clouds, and lush green forests.',
    image: 'https://res.cloudinary.com/dofg6bsom/image/upload/v1779801697/kudremukh-trek-image-1_s1oax6.webp',
    gallery: [
      'https://res.cloudinary.com/dofg6bsom/image/upload/v1779801698/img_3_khbvwx.webp',
      'https://res.cloudinary.com/dofg6bsom/image/upload/v1779801697/img2_opcg2z.webp',
      'https://res.cloudinary.com/dofg6bsom/image/upload/v1779801697/img1_cxxmma.webp',
      'https://res.cloudinary.com/dofg6bsom/image/upload/v1779801696/img_6_icag3v.webp',
      'https://res.cloudinary.com/dofg6bsom/image/upload/v1779801660/img_5_smh7lw.webp',
      'https://res.cloudinary.com/dofg6bsom/image/upload/v1779801650/img_4_fvqsuo.webp'
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
          { time: '06:00 AM', activity: '🛞 Jeep ride to Balgal base point' },
          { time: '07:00 AM', activity: '🥾 Kudremukha Trek start and scale the horse-face peak' },
          { time: '01:00 PM', activity: '⛰️ Reach majestic Kudremukha peak & enjoy packed lunch' },
          { time: '04:30 PM', activity: '🌊 Visit pristine Mullodi Falls during descent' },
          { time: '05:30 PM', activity: '🏡 Reach back to homestay' },
          { time: '06:00 PM', activity: '🍵 High Tea & Evening Snacks' },
          { time: '08:00 PM', activity: '🔥 Campfire, group games, and traditional local Dinner' }
        ]
      },
      {
        label: 'Day 2',
        emoji: '🌿',
        items: [
          { time: '08:00 AM', activity: '🍳 Breakfast and Checkout' },
          { time: '08:30 AM', activity: '🍃 Samse Tea Estate Visit' },
          { time: '10:00 AM', activity: '🌉 Kalasa Hanging Bridge / KPP Prathistana' },
          { time: '11:15 AM', activity: '🛕 Visit Kalasa Temple' },
          { time: '12:45 PM', activity: '🍛 Kottigehara Lunch (Local Malnad food)' },
          { time: '02:00 PM', activity: '🛕 Visit Horanadu Temple / Belur Temple' },
          { time: '04:30 PM', activity: '🚌 Start journey back to Bangalore' },
          { time: '10:30 PM', activity: '🏡 Final drop-offs in Bangalore' }
        ]
      }
    ],
    inclusions: [
      'Return transportation from Bangalore — Tempo Traveller, Mini Bus, or Bus (non-A/C, based on group size)',
      'All meals as per itinerary — Saturday Breakfast, Lunch & Dinner; Sunday Breakfast (South Indian Vegetarian)',
      'Shared homestay accommodation with separate rooms and washrooms for men & women',
      'Off-road Jeep ride to and from the Forest Department trek start point',
      'Forest entry permit fee',
      'Certified Trek Guide with First Aid training',
      'Local guide throughout the experience',
      'Complimentary participation badge or certificate'
    ],
    exclusions: [
      'Friday night dinner and Sunday lunch & dinner on the return journey',
      'Any personal expenses beyond what is listed above',
      'Costs arising from medical emergencies or natural calamities',
      'Travel insurance of any kind — available on request at additional cost',
      'Any extra activities, sightseeing, or services not mentioned in the itinerary',
      'Payment gateway charges & GST applicable on website bookings'
    ],
    thingsToCarry: [
      'Govt ID (either PAN / DL / Voter - whatever document submitted during booking)',
      'Raincoat (essential!)',
      'Trekking / Hiking shoes',
      'Trekking stick',
      'Polybag for wet clothes',
      'Sandals / flip flops',
      'Small backpack',
      'Water Bottle and Lunch Box',
      'Toiletries',
      'Sweater / Jacket',
      'Torch / Flashlight',
      'Energy bars, dry fruits, Glucon-D',
      'Suncap & sunglasses',
      'Waterproof phone cover',
      'Charger / Power bank',
      'Personal medications & Dettol'
    ],
    placesCovered: [
      'Kudremukha Peak',
      'Mullodi Falls',
      'Off-Road Jeep Ride to Balgal',
      'Kudremukh Forest Area',
      'Samse Tea Estate',
      'Kalasa Hanging Bridge / KPP Prathistana',
      'Kalasa Temple',
      'Horanadu Temple / Belur Temple'
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

// Section separator
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

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
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
    <header className={`${headerClass} fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-20 md:h-24 flex items-center`}>
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
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src="https://res.cloudinary.com/dofg6bsom/image/upload/v1779805799/logo_eng_oaejh9.png" 
              alt="Adventure Chaarana Logo" 
              className="h-14 md:h-20 w-auto object-contain transition-all duration-300 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
          </Link>
        </div>

        {/* Right Column - Join Community CTA Button */}
        <div className="hidden md:flex items-center justify-end">
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

const Layout = ({ children, showPromo, setShowPromo }: { children: React.ReactNode; showPromo: boolean; setShowPromo: (v: boolean) => void }) => {
  const location = useLocation();
  const isDetailsPage = location.pathname.startsWith('/trek/');

  return (
    <div className="min-h-screen w-full bg-brand-paper text-brand-dark font-sans flex flex-col relative overflow-hidden">
      {!isDetailsPage && <Background />}
      {!isDetailsPage && <Header />}
      
      <main className="relative z-10 flex-1 pt-0">
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
                <div className="p-4 bg-brand-orange/10 rounded-xl border border-brand-orange/20">
                  <span className="text-brand-orange font-black text-xs block mb-1">🌅 ONE DAY & SUNRISE TREKS</span>
                  <p className="text-xs font-semibold leading-relaxed">Bookings are strictly non-refundable under any circumstances. However, slot rescheduling is allowed up to 24 hours before departure for One Day treks.</p>
                </div>
                <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                  <span className="text-cyan-400 font-black text-xs block mb-1">OTHER TREKS: 48 HOURS OR MORE</span>
                  <p className="text-sm font-medium">45% of total package amount will be deducted as cancellation charges.</p>
                </div>
                <div className="p-6 bg-red-500/10 rounded-2xl border border-red-500/20">
                  <span className="text-red-400 font-black text-xs block mb-1">OTHER TREKS: WITHIN 48 HOURS</span>
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

interface Batch {
  start: string;
  end: string;
  year: number;
  dayName: string;
  monthGroup: string;
}

const TrekDetailsPage = () => {
  const { slug } = useParams();
  const trek = TREKS.find(t => t.slug === slug);
  const isOneDayTrek = trek?.duration?.toLowerCase() === '1 day';
  const isTwoDayWesternGhat = trek?.duration?.toLowerCase()?.includes('2 day') && trek?.category === 'western-ghats';

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getUpcomingBatches = (trek: Trek): Batch[] => {
    const batches: Batch[] = [];
    const isOneDay = trek.duration.toLowerCase().includes('1 day');
    
    // We want to generate dates exclusively for June and July 2026
    const startDateLimit = new Date(2026, 5, 1); // June 1st, 2026
    const endDateLimit = new Date(2026, 6, 31);   // July 31st, 2026
    
    const tempDate = new Date(startDateLimit);
    let safetyCounter = 0;
    while (tempDate <= endDateLimit && safetyCounter < 150) {
      safetyCounter++;
      const day = tempDate.getDay(); // 0: Sun, 5: Fri, 6: Sat

      // One day: Fri & Sat departures
      // Two day: Only Fri departures
      if (day === 5 || (isOneDay && day === 6)) {
        const startDate = new Date(tempDate);
        const endDate = new Date(tempDate);
        endDate.setDate(startDate.getDate() + (isOneDay ? 1 : 2));

        const formatDate = (d: Date) => d.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
        const monthGroup = startDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
        
        if (isMobile && monthGroup.includes('July')) {
          tempDate.setDate(tempDate.getDate() + 1);
          continue;
        }

        batches.push({
          start: formatDate(startDate),
          end: formatDate(endDate),
          year: startDate.getFullYear(),
          dayName: startDate.toLocaleDateString('en-US', { weekday: 'short' }),
          monthGroup
        });
      }
      tempDate.setDate(tempDate.getDate() + 1);
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
            <motion.img 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              src="https://res.cloudinary.com/dofg6bsom/image/upload/v1779805799/logo_eng_oaejh9.png" 
              alt="Adventure Chaarana Logo" 
              className="h-20 md:h-28 w-auto object-contain transition-transform duration-300 hover:scale-105"
              referrerPolicy="no-referrer"
            />
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
              
              {trek.discount && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.35 }}
                  className="bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-md px-5 py-3.5 rounded-2xl flex items-center justify-center gap-3 text-emerald-300 text-[11px] font-semibold tracking-wide text-center"
                >
                  <span className="text-sm shrink-0">🎉</span>
                  <span><strong>Group Offer:</strong> Get a <span className="text-emerald-400 font-extrabold">₹200 discount per person</span> for groups of more than 5 members across all 2-day Western Ghats expeditions.</span>
                </motion.div>
              )}
            </div>
          ) : (
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
                  const batches = getUpcomingBatches(trek);
                  const departureDays = Array.from(new Set(batches.map(b => b.dayName)));
                  const departureText = departureDays.includes('Fri') && departureDays.includes('Sat')
                    ? 'Departures every Friday & Saturday Night'
                    : departureDays.includes('Fri')
                    ? 'Departures every Friday Night'
                    : 'Weekend Departures';
                  return (
                    <p className="text-[10px] uppercase font-black tracking-widest text-brand-orange/80 italic">
                      {departureText}
                    </p>
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

        {/* ─── COMPACT TIMELINE ─── */}
        <section className="space-y-8">
          <div className="flex justify-center items-center py-2">
            <img 
              src="https://res.cloudinary.com/dofg6bsom/image/upload/v1779805799/logo_eng_oaejh9.png" 
              alt="Adventure Chaarana Logo" 
              className="h-20 md:h-28 w-auto object-contain transition-transform duration-300 hover:scale-105"
              referrerPolicy="no-referrer"
            />
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
              <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/10 flex items-center gap-3">
                <span className="text-xl">🗓️</span>
                <div>
                  <p className="text-[8px] font-black uppercase tracking-widest text-white/50">Batches</p>
                  <p className="font-bold text-white text-[10px]">Friday Night Departure</p>
                </div>
              </div>
            </div>
          </div>

          {/* Day 0 Header Card when available */}
          {(() => {
            const day0 = trek.itinerary.find(d => d.label.toLowerCase() === 'day 0');
            return day0 ? (
              <div className="max-w-4xl mx-auto w-full mb-8">
                <div className="bg-white border border-slate-100/80 rounded-[2rem] p-6 shadow-sm hover:shadow-md transition-all duration-300">
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
                </div>
              </div>
            ) : null;
          })()}

          {/* Day 1 & Day 2 Side-by-Side Grid */}
          {(() => {
            const otherDays = trek.itinerary.filter(d => d.label.toLowerCase() !== 'day 0');
            return (
              <div className={`grid grid-cols-1 gap-6 md:gap-8 items-start ${
                otherDays.length === 1 
                  ? 'max-w-xl mx-auto' 
                  : otherDays.length === 2 
                  ? 'md:grid-cols-2 max-w-4xl mx-auto' 
                  : 'md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto'
              }`}>
                 {otherDays.map((day, dIdx) => (
                   <div key={dIdx} className="bg-white border border-slate-100/80 rounded-[2rem] p-6 shadow-sm hover:shadow-md transition-all duration-300">
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
                 ))}
              </div>
            );
          })()}
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
        <section className="space-y-6 md:space-y-8">
          <div className="relative rounded-2xl overflow-hidden p-5 md:p-10 bg-gradient-to-br from-slate-900 via-brand-dark to-slate-900 shadow-xl">
            <div className="absolute inset-0 z-0">
               <img src={trek.gallery?.[1] || trek.image} alt={`Trekking perks at ${trek.title}`} className="w-full h-full object-cover opacity-20 grayscale" />
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

        {/* ─── CHECKLIST ─── */}
        <section className="bg-slate-900 text-white p-6 md:p-14 rounded-3xl md:rounded-[3rem] relative overflow-hidden">
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
        <TrekGallery trek={trek} />

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
                  : 'Prioritize your slot. Cancellations 48h prior incur a 45% fee. No-shows or last-minute changes (within 48h) are strictly non-refundable.' 
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
        <section className="space-y-10 pt-4">
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
                {/* Card 1: Within 48 Hours */}
                <div className="p-6 rounded-3xl bg-rose-50 border border-rose-200 hover:border-red-300 transition-all duration-300 space-y-4 flex flex-col justify-between group">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black uppercase tracking-widest bg-red-600 text-white px-3.5 py-1.5 rounded-full font-mono">
                        Within 48 Hrs
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

                {/* Card 2: BEFORE 48 HOURS (ULTRA PROMINENT / TOTALLY VISIBLE) */}
                <div className="p-7 rounded-[2rem] bg-amber-50 border-2 border-amber-400 shadow-[0_15px_45px_rgba(245,158,11,0.15)] transform md:-translate-y-1 hover:-translate-y-2 transition-all duration-300 space-y-4 flex flex-col justify-between relative overflow-hidden z-20">
                  <div className="absolute top-0 right-0 bg-amber-500 text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-bl-2xl shadow-sm font-sans">
                    ⚠️ ACTIVE OPTION
                  </div>
                  <div className="space-y-3 relative">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black uppercase tracking-widest bg-amber-500 text-white px-4 py-1.5 rounded-full font-sans font-extrabold animate-pulse">
                        Before 48 Hours
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
            <img src="https://res.cloudinary.com/dofg6bsom/image/upload/v1779808098/2ef2dd8a-fad0-482b-95d7-19e047dfae07.png" alt="WA" className="w-6 h-6 object-contain" referrerPolicy="no-referrer" />
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
        {trek.discount && (
          <div className="absolute top-4 right-4 bg-brand-orange text-white px-3.5 py-1.5 rounded-2xl flex items-center shadow-[0_8px_20px_rgba(249,115,22,0.3)] border border-white/15">
            <span className="text-[9px] font-black tracking-widest uppercase">{trek.discount}</span>
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
          <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-slate-400 group-hover:text-brand-orange group-hover:scale-110 transition-all border border-slate-100">
            <ArrowRight size={20} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const TrekGallery = ({ trek }: { trek: Trek }) => {
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

  for (const img of communityAdditions) {
    if (uniqueImages.length >= 8) break;
    if (!seen.has(img)) {
      uniqueImages.push(img);
      seen.add(img);
    }
  }

  const items = uniqueImages.map((url) => {
    let caption: string;
    if (url === trek.image) {
      caption = `The Majestic Summit of ${trek.title}`;
    } else if (url.includes('1.33.54_PM')) {
      caption = `Our Wonderful Fellow Explorers Squad!`;
    } else if (url.includes('IMG_5569') || url.includes('IMG_6197')) {
      caption = `Conquering Trails Together`;
    } else if (url.includes('IMG_5667') || url.includes('IMG_5646')) {
      caption = `Shared Smiles & Lifelong Bonds`;
    } else if (url.includes('6.38.09_PM') || url.includes('IMG_5628')) {
      caption = `Pushing Limits on Scenic Steps`;
    } else {
      caption = `Vibrant Summit Vistas at ${trek.title}`;
    }
    return { url, caption };
  });

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex(prev => {
        if (prev === null) return null;
        return prev === 0 ? items.length - 1 : prev - 1;
      });
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex(prev => {
        if (prev === null) return null;
        return prev === items.length - 1 ? 0 : prev + 1;
      });
    }
  };

  return (
    <section id="trek-gallery-section" className="py-10 md:py-20 bg-white overflow-hidden border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6 space-y-8 md:space-y-16">
        <div className="text-center space-y-2 md:space-y-4">
          <div className="text-brand-orange text-[10px] font-black uppercase tracking-[0.4em]">📸 Authentic Expeditions</div>
          <h2 className="text-3xl md:text-5xl font-black text-brand-dark tracking-tighter leading-tight">
            Expedition <span className="text-brand-orange italic font-serif">Moments Gallery</span>
          </h2>
          <p className="text-slate-500 font-bold text-xs md:text-sm tracking-wide max-w-xl mx-auto">
            Real snaps from our actual {trek.title} groups. Breathtaking views, challenging steps, and incredible trail camaraderie.
          </p>
        </div>

        {/* Gallery Symmetrical Square Grid */}
        <div className="grid grid-cols-3 md:grid-cols-4 gap-2 md:gap-6">
          {items.map((img, i) => (
            <motion.div
              key={img.url + i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 8) * 0.05 }}
              onClick={() => setLightboxIndex(i)}
              className="relative overflow-hidden rounded-xl md:rounded-[2rem] border border-slate-100 group aspect-square cursor-pointer shadow-sm hover:shadow-xl hover:border-brand-orange/10 transition-all duration-500"
            >
              <img 
                src={img.url} 
                alt={img.caption}
                className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              {/* Overlay on Hover */}
              <div className="absolute inset-0 bg-brand-dark/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
                 <div className="self-end w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 shadow-2xl translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                   <Mountain size={18} />
                 </div>
                 <div className="text-left space-y-1 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                   <p className="text-white text-xs font-black tracking-wide leading-tight">{img.caption}</p>
                 </div>
              </div>
            </motion.div>
          ))}
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
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-brand-dark/95 backdrop-blur-xl p-4 md:p-8"
          >
            {/* Close Button */}
            <button 
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 z-[110] bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition-colors backdrop-blur-md cursor-pointer"
              aria-label="Close Lightbox"
            >
              <X size={20} />
            </button>

            {/* Container for Image & Controls */}
            <div className="relative max-w-5xl w-full h-[65vh] md:h-[75vh] flex items-center justify-center" onClick={e => e.stopPropagation()}>
              {/* Back Button */}
              <button 
                onClick={handlePrev}
                className="absolute left-2 md:left-6 z-20 bg-white/10 hover:bg-white/20 text-white rounded-full p-4 transition-all backdrop-blur-md hover:scale-105 active:scale-95 cursor-pointer"
                aria-label="Previous Image"
              >
                <ChevronLeft size={24} />
              </button>

              {/* Main Image */}
              <motion.img 
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                src={items[lightboxIndex]?.url} 
                alt={items[lightboxIndex]?.caption}
                className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl border border-white/5"
                referrerPolicy="no-referrer"
              />

              {/* Next Button */}
              <button 
                onClick={handleNext}
                className="absolute right-2 md:right-6 z-20 bg-white/10 hover:bg-white/20 text-white rounded-full p-4 transition-all backdrop-blur-md hover:scale-105 active:scale-95 cursor-pointer"
                aria-label="Next Image"
              >
                <ArrowRight size={24} />
              </button>
            </div>

            {/* Caption & Index Display */}
            <div className="text-center mt-6 space-y-2 z-10 select-none">
              <p className="text-white text-base md:text-lg font-black tracking-wide">
                {items[lightboxIndex]?.caption}
              </p>
              <div className="flex items-center justify-center gap-2">
                <span className="text-[9px] font-black uppercase tracking-widest text-brand-orange bg-brand-orange/10 px-2 py-0.5 rounded-full">
                  {trek.title}
                </span>
                <span className="text-white/40 font-bold text-xs">
                  {lightboxIndex + 1} / {items.length}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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

const COMMUNITY_IMAGES = [
  { url: "https://res.cloudinary.com/dofg6bsom/image/upload/f_auto,q_auto/v1779440973/2_bckyhk.jpg", caption: "Dawn's first light on a misty peak" },
  { url: "https://res.cloudinary.com/dofg6bsom/image/upload/f_auto,q_auto/v1779440971/3_itucgf.jpg", caption: "Kaiwara Betta gold sunrise view" },
  { url: "https://res.cloudinary.com/dofg6bsom/image/upload/f_auto,q_auto/v1779440970/4_iby5xb.jpg", caption: "Green rolling valleys of Karnataka" },
  { url: "https://res.cloudinary.com/dofg6bsom/image/upload/f_auto,q_auto/v1779440967/5_ylvihq.jpg", caption: "Steep ridges of the Western Ghats range" },
  { url: "https://res.cloudinary.com/dofg6bsom/image/upload/f_auto,q_auto/v1779440965/6_u5qtbo.jpg", caption: "Misty mountain paths surrounded by fog" },
  { url: "https://res.cloudinary.com/dofg6bsom/image/upload/f_auto,q_auto/v1779440963/7_bs3g3k.jpg", caption: "The beautiful Bandaje Waterfalls trek" },
  { url: "https://res.cloudinary.com/dofg6bsom/image/upload/f_auto,q_auto/v1779440961/8_yga9f8.jpg", caption: "Sunset across the endless emerald hills" },
  { url: "https://res.cloudinary.com/dofg6bsom/image/upload/f_auto,q_auto/v1779440960/WhatsApp_Image_2026-05-22_at_1.33.54_PM_uvvckq.jpg", caption: "Our joyful group booking memorable journeys" },
  { url: "https://res.cloudinary.com/dofg6bsom/image/upload/v1778087865/4ddc58ad-9e2c-4c78-949f-9931b0659405.png", caption: "The steep, wind-swept ridges of Nethravathi Peak" },
  { url: "https://res.cloudinary.com/dofg6bsom/image/upload/v1778087833/3245baef-ce1d-412a-9307-8890e1f8b175.png", caption: "Overlooking standard western-ghats clouds" },
  { url: "https://res.cloudinary.com/dofg6bsom/image/upload/v1778087824/8c0f8b5a-2b52-4af3-b965-017a2ee1f961.png", caption: "Trekking through lush green slopes of Western Ghats" },
  { url: "https://res.cloudinary.com/dofg6bsom/image/upload/v1778087805/d176da77-e447-4b01-824c-a7af18f91cdb.png", caption: "The misty grasslands trails of Kudremukh Forest" }
];

const CommunityGallery = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex(prev => {
        if (prev === null) return null;
        return prev === 0 ? COMMUNITY_IMAGES.length - 1 : prev - 1;
      });
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex(prev => {
        if (prev === null) return null;
        return prev === COMMUNITY_IMAGES.length - 1 ? 0 : prev + 1;
      });
    }
  };

  return (
    <section id="gallery-section" className="py-20 bg-brand-paper overflow-hidden border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        <div className="text-center space-y-4">
          <div className="text-brand-orange text-[10px] font-black uppercase tracking-[0.4em]">📸 Captured Travels</div>
          <h2 className="text-4xl md:text-5xl font-black text-brand-dark tracking-tighter leading-tight">
            Explorer <span className="text-brand-orange italic font-serif">Showcase Gallery</span>
          </h2>
          <p className="text-slate-500 font-bold text-sm tracking-wide max-w-xl mx-auto">
            A hand-picked mosaic of unforgettable shared moments across raw expeditions, sunrise summits, and stunning landscapes.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {COMMUNITY_IMAGES.map((img, i) => (
            <motion.div
              key={img.url + i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 4) * 0.05 }}
              onClick={() => setLightboxIndex(i)}
              className="relative overflow-hidden rounded-[2rem] border border-slate-100/10 group aspect-[4/3] cursor-pointer shadow-md hover:shadow-xl transition-all duration-500"
            >
              <img 
                src={img.url} 
                alt={img.caption}
                className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              {/* Overlay on Hover */}
              <div className="absolute inset-0 bg-brand-dark/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
                 <div className="self-end w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 shadow-2xl translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                   <Compass size={18} />
                 </div>
                 <div className="text-left space-y-1 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                   <p className="text-white text-xs font-black tracking-wide leading-tight">{img.caption}</p>
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-brand-dark/95 backdrop-blur-xl p-4 md:p-8"
          >
            {/* Close Button */}
            <button 
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 z-[110] bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition-colors backdrop-blur-md cursor-pointer"
              aria-label="Close Lightbox"
            >
              <X size={20} />
            </button>

            {/* Image Container */}
            <div className="relative max-w-5xl w-full h-[65vh] md:h-[75vh] flex items-center justify-center" onClick={e => e.stopPropagation()}>
              <button 
                onClick={handlePrev}
                className="absolute left-2 md:left-6 z-20 bg-white/10 hover:bg-white/20 text-white rounded-full p-4 transition-all backdrop-blur-md hover:scale-105 active:scale-95 cursor-pointer"
                aria-label="Previous Image"
              >
                <ChevronLeft size={24} />
              </button>

              <motion.img 
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                src={COMMUNITY_IMAGES[lightboxIndex]?.url} 
                alt={COMMUNITY_IMAGES[lightboxIndex]?.caption}
                className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl border border-white/5"
                referrerPolicy="no-referrer"
              />

              <button 
                onClick={handleNext}
                className="absolute right-2 md:right-6 z-20 bg-white/10 hover:bg-white/20 text-white rounded-full p-4 transition-all backdrop-blur-md hover:scale-105 active:scale-95 cursor-pointer"
                aria-label="Next Image"
              >
                <ArrowRight size={24} />
              </button>
            </div>

            {/* Caption Indicator */}
            <div className="text-center mt-6 space-y-2 z-10 select-none">
              <p className="text-white text-base md:text-lg font-black tracking-wide">
                {COMMUNITY_IMAGES[lightboxIndex]?.caption}
              </p>
              <div className="flex items-center justify-center gap-2">
                <span className="text-[9px] font-black uppercase tracking-widest text-brand-orange bg-brand-orange/10 px-2 py-0.5 rounded-full">
                  Adventure Community
                </span>
                <span className="text-white/40 font-bold text-xs">
                  {lightboxIndex + 1} / {COMMUNITY_IMAGES.length}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const HomePage = () => {
  const [activeCategory, setActiveCategory] = useState('western-ghats');

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

      <CommunityGallery />

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
