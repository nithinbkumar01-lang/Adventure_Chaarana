/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useParams, Link, useLocation } from 'react-router-dom';
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
    originalPrice: 6200,
    currentPrice: 5499,
    discount: '10% OFF Group Discount (3+)',
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
    ]
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

  const navLinksLeft = [
    { label: 'Treks', onClick: scrollToTreks },
    { label: 'Contact', path: '/' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-[60] transition-all duration-300">
      <div className="absolute inset-0 bg-brand-dark/40 backdrop-blur-xl border-b border-white/5 shadow-2xl" />
      
      {/* Desktop Centered Navbar */}
      <div className="hidden md:grid max-w-7xl mx-auto px-12 h-24 lg:h-32 grid-cols-[1fr_auto_1fr] items-center relative z-10">
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
            src="https://res.cloudinary.com/dofg6bsom/image/upload/v1777088068/ChatGPT_Image_Apr_25_2026_08_58_47_AM-Photoroom_lpgwqd.png" 
            alt="Adventure Chaarana" 
            className="h-24 lg:h-32 w-auto object-contain transition-all hover:scale-110"
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
      <div className="md:hidden flex items-center justify-between px-6 h-20 relative z-10">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="cursor-pointer"
          onClick={() => navigate('/')}
        >
          <img 
            src="https://res.cloudinary.com/dofg6bsom/image/upload/v1777088068/ChatGPT_Image_Apr_25_2026_08_58_47_AM-Photoroom_lpgwqd.png" 
            alt="Adventure Chaarana" 
            className="h-14 w-auto object-contain"
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
                <li className="hover:text-brand-orange cursor-pointer transition-colors">Safety Code</li>
                <li className="hover:text-brand-orange cursor-pointer transition-colors">Terms and Conditions</li>
                <li className="hover:text-brand-orange cursor-pointer transition-colors">Refund Policy</li>
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
  const navigate = useNavigate();
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

  const onBack = () => navigate(-1);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-brand-paper relative font-sans selection:bg-brand-orange selection:text-white"
    >
      {/* ─── PROFESSIONAL COMPACT NAV ─── */}
      <nav className="fixed top-0 left-0 right-0 z-[70] bg-white/90 backdrop-blur-xl border-b border-slate-100 px-6 h-14 flex items-center justify-between shadow-sm">
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
      <header className="relative pt-14 flex flex-col justify-center items-center min-h-[65vh] md:min-h-[75vh] overflow-hidden text-center px-6">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={trek.image} 
            alt={trek.title} 
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
              <div className="flex flex-col items-start">
                <span className="text-[11px] font-bold text-white/30 line-through">₹{trek.originalPrice.toLocaleString()}</span>
                <span className="text-[9px] font-black text-brand-orange-glow uppercase tracking-tighter">All Inclusive</span>
              </div>
            </div>
            <button 
              onClick={() => {
                const message = `I want to book the ${trek.title} Expedition! 🧗`;
                window.open(`https://wa.me/919980489494?text=${encodeURIComponent(message)}`, '_blank');
              }}
              className="w-full sm:w-auto bg-[#25D366] text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.25em] shadow-[0_20px_40px_rgba(37,211,102,0.3)] hover:scale-105 transition-all flex items-center justify-center gap-3 active:scale-95"
            >
              <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WA" className="w-5 h-5 brightness-0 invert" />
              Confirm My Seat
            </button>
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
                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white/80">{trek.id === '7' ? 'Group Offer: 10% Discount (3+)' : 'Group Offer: 2+1 Registration'}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xl md:text-2xl">🌍</span>
                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white/80">{trek.id === '7' ? 'Safe & Eco-Friendly Travel' : 'Solo Trekkers Flat 10% Off'}</span>
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
        {/* ─── COMPACT TIMELINE ─── */}
        <section className="space-y-8">
          <div className="relative rounded-2xl overflow-hidden p-6 md:p-10 bg-gradient-to-br from-slate-900 via-brand-dark to-slate-900 shadow-2xl">
            <div className="absolute inset-0 z-0">
               <img src={trek.image} alt="Header Bg" className="w-full h-full object-cover opacity-20 grayscale" />
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
                  <p className="font-bold text-white text-[10px]">Fri & Sat Night Pickup</p>
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
                 <img src={trek.gallery?.[1] || trek.image} alt="Expedition" className="w-full aspect-video object-cover transition-transform duration-1000 group-hover:scale-105" />
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
             <img src={trek.gallery?.[0] || trek.image} alt="Quote Bg" className="w-full h-full object-cover" />
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
               <img src={trek.gallery?.[1] || trek.image} alt="Perks Bg" className="w-full h-full object-cover opacity-20 grayscale" />
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
              { icon: '🚌', title: 'Seamless Travel', desc: 'Comfortable round-trip transportation from Bangalore pickup points in sanitized Tempo Travelers.' },
              { icon: '👤', title: 'Expert Leads', desc: 'Certified outdoor experts and local guides focused on your group safety and navigation throughout the trail.' },
              { icon: '🎫', title: 'Forest Permits', desc: 'All mandatory forest department entry fees and park permissions are pre-booked and handled by us.' }
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
               <img src={trek.image} alt="Inc Exc Bg" className="w-full h-full object-cover opacity-20 grayscale" />
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

        {/* ─── POLICY ─── */}
        <section className="space-y-10">
          <div className="relative rounded-2xl overflow-hidden p-6 md:p-10 bg-gradient-to-br from-slate-900 via-brand-dark to-slate-900 shadow-2xl">
            <div className="absolute inset-0 z-0">
               <img src={trek.image} alt="Policy Bg" className="w-full h-full object-cover opacity-20 grayscale" />
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
              { icon: '⚖️', label: 'Booking & Cancellation', desc: '48h+ before: 45% of total package deducted. Within 48h: No refund or rescheduling under any circumstances.' },
              { icon: '⛈️', label: 'Calamities (Before)', desc: 'Full refund issued for cancellations due to natural disasters, unrest, or forest entry prohibitions (minus GST/Gateway fees).' },
              { icon: '🚧', label: 'During Trip Issues', desc: 'No refunds or alternative arrangements if itinerary is blocked by traffic, weather, or authority restrictions during travel.' },
              { icon: '🚫', label: 'Zero Tolerance', desc: 'Smoking, alcohol, or any form of substance use is strictly prohibited. Violators will be banned.' },
              { icon: '⏱️', label: 'Strict Punctuality', desc: 'The bus will leave at the scheduled time. No refunds for latecomers as sunset/sunrise waits for no one.' },
              { icon: '🧤', label: 'Eco-Sensitive', desc: 'We maintain a strict "Leave No Trace" policy. No littering allowed; carry your plastic waste back to the city.' }
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
      onClick={() => navigate(`/trek/${trek.id}`)}
      className="bg-white rounded-[2.5rem] overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_100px_-20px_rgba(37,211,102,0.15)] transition-all duration-500 border border-slate-100 group flex flex-col h-full w-full cursor-pointer relative"
    >
      <div className="relative aspect-[4/3] overflow-hidden m-3 rounded-[2rem]">
        <img 
          src={trek.image} 
          alt={trek.title} 
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
          <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-slate-400 group-hover:text-brand-orange group-hover:scale-110 transition-all border border-slate-100">
            <ArrowRight size={20} />
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
      <section id="treks-section" className="relative z-20 py-12 md:py-20 bg-white/10">
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
