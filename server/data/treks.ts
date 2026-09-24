import type { Trek } from '../../shared/types/trek';

export const treks: Trek[] = [
  {
id: '1',
    slug: 'shivagange-sunrise-trek',
    title: 'Shivagange Sunrise Trek',
    host: 'Adventure Chaarana',
    date: 'Every Saturday Night',
    location: 'Tumkur',
    duration: '1 day',
    difficulty: 'Moderate',
    elevation: '1,368 m',
    distance: '2–3 km',
    minAge: '4 Years',
    description: 'Known as Dakshina Kashi, this trek offers a vertical climb with stunning sunrise views from the peak.',
    originalPrice: 1100,
    currentPrice: 680,
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
    date: 'Every Saturday Night',
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
    date: 'Every Saturday Night',
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
    date: 'Every Saturday Night',
    location: 'Tumkur',
    duration: '1 day',
    difficulty: 'Moderate',
    elevation: '1373 m',
    distance: '4 km',
    minAge: '4 Years',
    description: 'Explore one of the most historic and strategic forts in Karnataka, featuring multiple layers of fortifications and stunning architecture.',
    originalPrice: 1200,
    currentPrice: 680,
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
    date: 'Every Saturday Night',
    location: 'Tumkur',
    duration: '1 day',
    difficulty: 'Moderate',
    elevation: '1130 m',
    distance: '3 km',
    minAge: '4 Years',
    description: 'A trek to one of the most scenic hills near Kunigal, known for its beautiful trails through rocky gates and historic fort remnants.',
    originalPrice: 1100,
    currentPrice: 499,
    discount: '🇮🇳 Independence Day Offer · ₹499',
    itineraryPdf: 'https://ik.imagekit.io/phj6ifoni/itinery/Itinerary/Sunrise/Uttari%20Betta%20Sunrise%20Trek%20AC.pdf',
    image: 'https://ik.imagekit.io/phj6ifoni/Uttari/IMG_0965.jpeg',
    gallery: [
      'https://ik.imagekit.io/phj6ifoni/Uttari/IMG_0825.jpeg',
      'https://ik.imagekit.io/phj6ifoni/Uttari/20260823_071033.jpg',
      'https://ik.imagekit.io/phj6ifoni/Uttari/IMG_7920.heif',
      'https://ik.imagekit.io/phj6ifoni/Uttari/20260823_063809.jpg',
      'https://ik.imagekit.io/phj6ifoni/Uttari/PXL_20260614_012424943.jpg',
      'https://ik.imagekit.io/phj6ifoni/Uttari/IMG_0961.jpeg',
      'https://ik.imagekit.io/phj6ifoni/Uttari/IMG_0866.jpeg',
      'https://ik.imagekit.io/phj6ifoni/Uttari/IMG_0877.jpeg',
      'https://ik.imagekit.io/phj6ifoni/Uttari/IMG_0903.jpeg',
      'https://ik.imagekit.io/phj6ifoni/Uttari/20260614_081409.jpg',
      'https://ik.imagekit.io/phj6ifoni/Uttari/20260614_070405.jpg',
      'https://ik.imagekit.io/phj6ifoni/Uttari/IMG_0850.jpeg',
      'https://ik.imagekit.io/phj6ifoni/Uttari/IMG_20260614_072048536_HDR_PCT.jpg',
      'https://ik.imagekit.io/phj6ifoni/Uttari/IMG_2006.JPG',
      'https://ik.imagekit.io/phj6ifoni/Uttari/IMG_0880.jpeg',
      'https://ik.imagekit.io/phj6ifoni/Uttari/IMG_20260614_071109498_HDR_PCT.jpg',
      'https://ik.imagekit.io/phj6ifoni/Uttari/original_f3f2f62d-eaf2-4301-99e0-51a15e4e0126_IMG_20260509_031333699_HDR.jpg'
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
    date: 'Every Saturday Night',
    location: 'Mandya',
    duration: '1 day',
    difficulty: 'Moderate',
    elevation: '878 m',
    distance: '4 km',
    minAge: '4 Years',
    description: 'A beautiful trek near Mandya, offering stunning views of Tonnur Lake and the surrounding lush green fields.',
    originalPrice: 1100,
    currentPrice: 680,
    discount: '',
    itineraryPdf: 'https://ik.imagekit.io/phj6ifoni/itinery/Itinerary/Sunrise/Kunthi%20Betta%20AC.pdf',
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
    slug: 'nethravathi-peak-trek',
    title: 'Nethravathi Peak Trek',
    host: 'Adventure Chaarana',
    date: 'Every Friday Night',
    location: 'Dakshina Kannada',
    duration: '2 Days / 1 Night',
    difficulty: 'Moderate',
    elevation: '4500ft+',
    distance: '12km(Round)',
    minAge: '5+',
    timeHours: '8Hrs',
    modeRating: 'Easy - Moderate',
    permitNotice: 'Forest permits are limited to just 300 trekkers per day. Book at least 15–20 days in advance.',
    currentPrice: 4199,
    originalPrice: 4999,
    withoutTransportPrice: 3499,
    discount: '',
    itineraryPdf: 'https://ik.imagekit.io/phj6ifoni/itinery/Itinerary/Western/Nethravathi%20Trek%20AC.pdf',
    badgeColor: 'bg-brand-orange',
    category: 'western-ghats',
    description: 'Explore the heart of the Kudremukh National Park with the breathtaking Nethravathi Peak trek. Known for its rolling green hills, pristine streams, and spectacular views of the Western Ghats range, this trek offers a perfect escape into the pure wild.',
    image: 'https://ik.imagekit.io/phj6ifoni/Nethravathi/IMG_6990.JPG',
    gallery: [
      'https://ik.imagekit.io/phj6ifoni/Nethravathi/IMG_7065.JPG',
      'https://ik.imagekit.io/phj6ifoni/Nethravathi/20260613_101857.jpg',
      'https://ik.imagekit.io/phj6ifoni/Nethravathi/IMG_0674.jpg',
      'https://ik.imagekit.io/phj6ifoni/Nethravathi/IMG_5350.jpg',
      'https://ik.imagekit.io/phj6ifoni/Nethravathi/IMG_5381.jpg',
      'https://ik.imagekit.io/phj6ifoni/Nethravathi/6.JPG',
      'https://ik.imagekit.io/phj6ifoni/Nethravathi/New%20img%204.JPG',
      'https://ik.imagekit.io/phj6ifoni/Nethravathi/New%20img%201.JPG',
      'https://ik.imagekit.io/phj6ifoni/Nethravathi/New%20img%203.JPG',
      'https://ik.imagekit.io/phj6ifoni/Nethravathi/IMG_6951.JPG',
      'https://ik.imagekit.io/phj6ifoni/Nethravathi/IMG_6468.jpg',
      'https://ik.imagekit.io/phj6ifoni/Nethravathi/New%20img%205.JPG'
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
          { time: '06:00 PM', activity: '🔥 Group Games, Campfire (if weather permits) & Rest' }
        ]
      },
      {
        label: 'Day 2',
        emoji: '🌿',
        items: [
          { time: '08:00 AM', activity: '🍳 Breakfast and Checkout' },
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
      'Kalasa Hanging Bridge / KPP Prathistana',
      'Kalasa Temple',
      'Horanadu Temple / Belur Temple'
    ]
  },
  {
id: '8',
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
    currentPrice: 4199,
    originalPrice: 4999,
    withoutTransportPrice: 3499,
    discount: '',
    itineraryPdf: 'https://ik.imagekit.io/phj6ifoni/itinery/Itinerary/Western/Kudremukha%20AC.pdf',
    badgeColor: 'bg-brand-orange',
    category: 'western-ghats',
    description: 'Scale the second-highest peak in Karnataka! Formed in the shape of a horse face, the Kudremukha Trek provides stunning views of the Western Ghats grasslands, deep valleys, misty clouds, and lush green forests.',
    image: 'https://ik.imagekit.io/phj6ifoni/Kudremukha/20260712_101200.jpg',
    gallery: [
      'https://ik.imagekit.io/phj6ifoni/Kudremukha/20260712_101200.jpg',
      'https://ik.imagekit.io/phj6ifoni/Kudremukha/PXL_20260711_040047979.jpg?updatedAt=1789706171807',
      'https://ik.imagekit.io/phj6ifoni/Kudremukha/20260627_075857.jpg?tr=orig-true',
      'https://ik.imagekit.io/phj6ifoni/Kudremukha/PXL_20260712_031031643.MP.jpg',
      'https://ik.imagekit.io/phj6ifoni/Kudremukha/IMG_20260712_084211737.jpg',
      'https://ik.imagekit.io/phj6ifoni/Kudremukha/IMG_7920.heif',
      'https://ik.imagekit.io/phj6ifoni/Kudremukha/20260712_090452(0).jpg',
      'https://ik.imagekit.io/phj6ifoni/Kudremukha/IMG_8937.HEIC',
      'https://ik.imagekit.io/phj6ifoni/Kudremukha/IMG_8905.HEIC',
      'https://ik.imagekit.io/phj6ifoni/Kudremukha/IMG_0399.jpeg',
      'https://ik.imagekit.io/phj6ifoni/Kudremukha/20260711_084554.jpg',
      'https://ik.imagekit.io/phj6ifoni/Kudremukha/IMG_5565.jpg',
      'https://ik.imagekit.io/phj6ifoni/Kudremukha/20260821_083333.jpg',
      'https://ik.imagekit.io/phj6ifoni/Kudremukha/20260808_092509.jpg',
      'https://ik.imagekit.io/phj6ifoni/Kudremukha/IMG_6081.jpg',
      'https://ik.imagekit.io/phj6ifoni/Kudremukha/IMG_7810.HEIC',
      'https://ik.imagekit.io/phj6ifoni/Kudremukha/IMG_4745.jpg',
      'https://ik.imagekit.io/phj6ifoni/Kudremukha/PXL_20260712_063440975.PORTRAIT.jpg?updatedAt=1789705967546'
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
          { time: '06:00 AM', activity: '🛞 Only Jeep ride' },
          { time: '07:00 AM', activity: '🥾 Kudremukha Trek start and scale the horse-face peak' },
          { time: '01:00 PM', activity: '⛰️ Reach majestic Kudremukha peak & enjoy packed lunch' },
          { time: '04:30 PM', activity: '🌊 Visit pristine Mullodi Falls during descent' },
          { time: '05:30 PM', activity: '🏡 Reach back to homestay' },
          { time: '06:00 PM', activity: '🍵 High Tea & Evening Snacks' },
          { time: '08:00 PM', activity: '🔥 Campfire (if weather permits), group games, and traditional local Dinner' }
        ]
      },
      {
        label: 'Day 2',
        emoji: '🌿',
        items: [
          { time: '08:00 AM', activity: '🍳 Breakfast and Checkout' },
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
      'Only Jeep ride',
      'Kudremukh Forest Area',
      'Kalasa Hanging Bridge / KPP Prathistana',
      'Kalasa Temple',
      'Horanadu Temple / Belur Temple'
    ]
  },
  {
id: '9',
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
    originalPrice: 4999,
    withoutTransportPrice: 3499,
    discount: '',
    badgeColor: 'bg-brand-orange',
    category: 'western-ghats',
    description: 'Trek to the pristine Bandaje Waterfalls nestled in the Western Ghats of Karnataka. Immerse yourself in misty grasslands, navigate lush mountain trails, and discover enchanting vistas at Rani Jhari viewpoint, Kodige Falls, Kelgur Tea Estate / KPP, and the ancient Hoysala temples of Belur.',
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
          { time: '08:00 PM', activity: '🔥 Engage in group bonding, Campfire (if weather permits), Dinner & overnight stay' }
        ]
      },
      {
        label: 'Day 2',
        emoji: '🌿',
        items: [
          { time: '07:00 AM', activity: '🍳 Breakfast and Checkout from Homestay' },
          { time: '08:00 AM', activity: '⛰️ Rani Jhari View Point (Gaze at the breathtaking mist-lined valleys)' },
          { time: '09:30 AM', activity: '🌊 Kodige Falls Visit (Play in the safe, refreshing natural cascades)' },
          { time: '11:00 AM', activity: '🍃 Kelgur Tea Estate / KPP Visit (Walk through lush, emerald tea gardens)' },
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
      'Kelgur Tea Estate / KPP',
      'Belur Temple'
    ]
  },
  {
id: '10',
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
    currentPrice: 4199,
    withoutTransportPrice: 3499,
    discount: '',
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
          { time: '08:00 PM', activity: '🔥 Warm Campfire (if weather permits), group activities, and delicious traditional local Dinner' }
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
id: '11',
    slug: 'dudhsagar-falls-trek',
    title: 'Dudhsagar Falls Trek',
    host: 'Adventure Chaarana',
    date: 'Every Friday Night (6:00 PM Departure)',
    location: 'Dudhsagar Falls, Goa & Karnataka',
    duration: '2 Days / 1 Night',
    difficulty: 'Moderate',
    elevation: '310 m',
    distance: '22 KM',
    minAge: '5 Years',
    description: 'Embark on the legendary Dudhsagar Falls trek, a thrilling 22 KM trail through the lush rainforests of the Western Ghats. Witness the spectacular four-tiered "Sea of Milk" waterfall, explore the scenic Magodu Falls, and stand atop Jenukallu Gudda for breathtaking panoramic vistas.',
    originalPrice: 6499,
    currentPrice: 5499,
    withoutTransportPrice: 4500,
    discount: '',
    itineraryPdf: 'https://ik.imagekit.io/phj6ifoni/itinery/Itinerary/Western/Dudhsagar%20Trek%20AC.pdf',
    image: 'https://ik.imagekit.io/phj6ifoni/Dudhsagar/IMG_0882.HEIC?updatedAt=1789978870669',
    gallery: [
      'https://ik.imagekit.io/phj6ifoni/Dudhsagar/IMG_1125.HEIC?updatedAt=1789978872018',
      'https://ik.imagekit.io/phj6ifoni/Dudhsagar/IMG_1022.HEIC?updatedAt=1789978871649',
      'https://ik.imagekit.io/phj6ifoni/Dudhsagar/IMG_0803.HEIC?updatedAt=1789978869017',
      'https://ik.imagekit.io/phj6ifoni/Dudhsagar/IMG_0909.HEIC?updatedAt=1789978866718',
      'https://ik.imagekit.io/phj6ifoni/Dudhsagar/IMG_7321.HEIC?updatedAt=1789978861356',
      'https://ik.imagekit.io/phj6ifoni/Dudhsagar/IMG_0874.HEIC?updatedAt=1789978854540',
      'https://ik.imagekit.io/phj6ifoni/Dudhsagar/Dudhsagar-Waterfalls.webp?updatedAt=1789978842785',
      'https://ik.imagekit.io/phj6ifoni/Dudhsagar/thewanderlostguy_20211014_220452-Copy-min.webp?updatedAt=1789978842871'
    ],
    badgeColor: 'bg-brand-orange',
    category: 'western-ghats',
    itinerary: [
      {
        label: 'Day 0',
        emoji: '🌌',
        items: [
          { time: '06:00 PM', activity: '📍 Majestic, Bangalore - First boarding point. Be 10 minutes early.' },
          { time: '06:20 PM', activity: '📍 Rajajinagar Metro Station' },
          { time: '06:40 PM', activity: '📍 Yeshwantpura Metro Station' },
          { time: '07:00 PM', activity: '📍 Goraguntepalya — KLE Dental College (Use metro to avoid traffic)' },
          { time: 'Overnight', activity: '🚍 Overnight journey to Kulem, Goa. Sit back & relax!' }
        ]
      },
      {
        label: 'Day 1',
        emoji: '🏞️',
        items: [
          { time: '07:00 AM', activity: '🏠 Reach Base — Arrive at Kulem base. Freshen up & enjoy a hot South Indian vegetarian breakfast (Included)' },
          { time: '08:00 AM', activity: '🥾 Trek Begins! Start the 22 KM trail through lush Western Ghats rainforest with certified guide' },
          { time: '01:00 PM', activity: '🌊 Dudhsagar Falls — Reach the iconic four-tiered falls ("Sea of Milk"), enjoy packed lunch & rest (Lunch included)' },
          { time: 'Afternoon', activity: '⬇️ Trek Back to Base through forest, enjoying the sights and sounds at dusk' },
          { time: '10:00 PM', activity: '🏕️ Reach Camping Site — Check in at Dandeli Resort. Unwind with campfire, dinner & stargazing (Dinner included, separate rooms for men & women)' }
        ]
      },
      {
        label: 'Day 2',
        emoji: '🌅',
        items: [
          { time: '07:00 AM', activity: '🍳 Wake Up, Freshen Up & Breakfast at resort (Included)' },
          { time: 'Morning', activity: '🌊 Visit Magodu Falls — A serene, hidden gem cascade surrounded by dense forest canopy' },
          { time: 'Mid Morning', activity: '⛰️ Visit Jenukallu Gudda Viewpoint — Panoramic views of the Western Ghats' },
          { time: 'Afternoon', activity: '🍛 Leisure & Departure — Self-sponsored lunch & free time before return journey' }
        ]
      },
      {
        label: 'Day 3',
        emoji: '🚍',
        items: [
          { time: '06:00 AM', activity: '🏡 Arrive Bangalore — Drop at same pickup points. Subject to traffic and road conditions' }
        ]
      }
    ],
    inclusions: [
      'Return transportation from Bangalore (Bus / Tempo Traveller based on group size)',
      'Accommodation: Rooms, Dormitory or Tent (subject to availability)',
      'Meals: 2 Breakfasts (Veg) + 1 Lunch (Veg) + 1 Dinner (Veg / Non-Veg)',
      'Tea / Coffee & evening snacks',
      'Forest entry permit fees',
      'Certified Trek Guide with Basic First Aid support',
      'Campfire arrangement at base camp',
      'Complimentary participation certificate / badge'
    ],
    exclusions: [
      'Sunday lunch & dinner on return day',
      'Any personal expenses beyond listed inclusions',
      'Costs from medical emergencies or natural calamities',
      'Travel insurance (available on request at extra cost)',
      'Extra activities or sightseeing not in itinerary',
      'Payment gateway charges & GST on website bookings'
    ],
    thingsToCarry: [
      'Govt ID (either Aadhar / PAN / DL / Voter)',
      'Raincoat / Umbrella (essential for monsoon days)',
      'Trekking / hiking shoes or comfortable walking shoes',
      'Small backpack to carry your essentials',
      'Water bottle (please avoid single-use plastics)',
      'A polybag to carry any wet clothes',
      'Toiletries & towel',
      'Cold protective clothes - Sweaters / Jackets',
      'Fresh fruits, juice, Glucon-D, dry fruits, energy bars',
      'Sunscreen, Suncap & sunglasses (for sunny days)',
      'Charger / power bank for electronics',
      'Personal medications if any'
    ],
    placesCovered: [
      'Dudhsagar Falls',
      'Magodu Falls',
      'Jenukallu Gudda'
    ]
  },
  {
id: '12',
    slug: 'kurinjal-peak-trek',
    title: 'Kurinjal Peak Trek',
    host: 'Adventure Chaarana',
    date: 'Every Friday Night',
    location: 'Chikamagaluru',
    duration: '2 Days / 1 Night',
    difficulty: 'Moderate',
    elevation: '1,159 m',
    distance: '14 km (total)',
    minAge: '5+',
    timeHours: '7Hrs',
    modeRating: 'Easy - Moderate',
    permitNotice: 'Forest permits are limited. Book at least 15–20 days in advance.',
    currentPrice: 4199,
    originalPrice: 4999,
    withoutTransportPrice: 3499,
    discount: '',
    badgeColor: 'bg-brand-orange',
    category: 'western-ghats',
    description: 'Trek to the spectacular Kurinjal Peak in the Kudremukh forest range. Walk through high altitude shola grasslands, wind-swept ridges, and find yourself surrounded by the majestic peaks of the Kudremukh National Park.',
    image: 'https://ik.imagekit.io/phj6ifoni/Kudremukha/20260627_075857.jpg?tr=orig-true',
    gallery: [
      'https://ik.imagekit.io/phj6ifoni/Kudremukha/20260627_075857.jpg?tr=orig-true',
      'https://ik.imagekit.io/phj6ifoni/Kudremukha/PXL_20260711_040047979.jpg?updatedAt=1789706171807',
      'https://ik.imagekit.io/phj6ifoni/Kudremukha/20260712_101200.jpg',
      'https://ik.imagekit.io/phj6ifoni/Kudremukha/PXL_20260712_031031643.MP.jpg',
      'https://ik.imagekit.io/phj6ifoni/Kudremukha/IMG_20260712_084211737.jpg',
      'https://ik.imagekit.io/phj6ifoni/Kudremukha/IMG_7920.heif',
      'https://ik.imagekit.io/phj6ifoni/Kudremukha/20260712_090452(0).jpg',
      'https://ik.imagekit.io/phj6ifoni/Kudremukha/IMG_8937.HEIC',
      'https://ik.imagekit.io/phj6ifoni/Kudremukha/IMG_8905.HEIC',
      'https://ik.imagekit.io/phj6ifoni/Kudremukha/IMG_0399.jpeg',
      'https://ik.imagekit.io/phj6ifoni/Kudremukha/20260711_084554.jpg',
      'https://ik.imagekit.io/phj6ifoni/Kudremukha/IMG_5565.jpg',
      'https://ik.imagekit.io/phj6ifoni/Kudremukha/20260821_083333.jpg',
      'https://ik.imagekit.io/phj6ifoni/Kudremukha/20260808_092509.jpg',
      'https://ik.imagekit.io/phj6ifoni/Kudremukha/IMG_6081.jpg',
      'https://ik.imagekit.io/phj6ifoni/Kudremukha/IMG_7810.HEIC',
      'https://ik.imagekit.io/phj6ifoni/Kudremukha/IMG_4745.jpg',
      'https://ik.imagekit.io/phj6ifoni/Kudremukha/PXL_20260712_063440975.PORTRAIT.jpg?updatedAt=1789705967546'
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
          { time: '12:00 PM', activity: '⛰️ Reach Kurinjal Peak & enjoy packed lunch' },
          { time: '03:00 PM', activity: '⬇️ Descent and reach back to Homestay' },
          { time: '04:30 PM', activity: '🍵 High Tea & Evening Snacks' },
          { time: '06:00 PM', activity: '🔥 Group Games, Campfire (if weather permits) & Rest' }
        ]
      },
      {
        label: 'Day 2',
        emoji: '🌿',
        items: [
          { time: '08:00 AM', activity: '🍳 Breakfast and Checkout' },
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
      'Kurinjal Peak',
      'Kudremukh Forest Area',
      'Kalasa Hanging Bridge / KPP Prathistana',
      'Kalasa Temple',
      'Horanadu Temple / Belur Temple'
    ]
  },
  {
id: '13',
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
    currentPrice: 4499,
    originalPrice: 4999,
    withoutTransportPrice: 3499,
    discount: '',
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
          { time: '06:00 PM', activity: '🔥 Group Games, Campfire (if weather permits) & Rest' }
        ]
      },
      {
        label: 'Day 2',
        emoji: '🌿',
        items: [
          { time: '08:00 AM', activity: '🍳 Breakfast and Checkout' },
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
      'Kalasa Hanging Bridge / KPP Prathistana',
      'Kalasa Temple',
      'Horanadu Temple / Belur Temple'
    ]
  },
  {
id: '14',
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
    originalPrice: 5999,
    currentPrice: 5499,
    discount: '',
    itineraryPdf: 'https://ik.imagekit.io/phj6ifoni/itinery/Itinerary/Trips/Kodaikanal%20Trip%20AC.pdf',
    image: 'https://ik.imagekit.io/phj6ifoni/Kodaikanal/pooja.jpg.jpeg',
    gallery: [
      'https://ik.imagekit.io/phj6ifoni/Kodaikanal/IMG_4727.HEIC',
      'https://ik.imagekit.io/phj6ifoni/Kodaikanal/IMG_5156.HEIC',
      'https://ik.imagekit.io/phj6ifoni/Kodaikanal/IMG_7839.JPG',
      'https://ik.imagekit.io/phj6ifoni/Kodaikanal/IMG_7931.JPG',
      'https://ik.imagekit.io/phj6ifoni/Kodaikanal/IMG_8064.JPG',
      'https://ik.imagekit.io/phj6ifoni/Kodaikanal/IMG_7910.JPG',
      'https://ik.imagekit.io/phj6ifoni/Kodaikanal/IMG_7986.JPG',
      'https://ik.imagekit.io/phj6ifoni/Kodaikanal/IMG_7883.JPG',
      'https://ik.imagekit.io/phj6ifoni/Kodaikanal/IMG_7865.JPG',
      'https://ik.imagekit.io/phj6ifoni/Kodaikanal/IMG_7776.JPG',
      'https://ik.imagekit.io/phj6ifoni/Kodaikanal/IMG_7960.JPG'
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
          { time: '08:00 PM', activity: '🔥 Dinner & Campfire (if weather permits) overnight stay' }
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
id: '15',
    slug: 'munnar-kolukkumalai',
    title: 'Munnar (with Kolukkumalai)',
    host: 'Adventure Chaarana',
    date: 'Every Friday Night',
    location: 'Munnar & Kolukkumalai, Kerala',
    duration: '2 Days / 1 Night',
    difficulty: 'Moderate',
    elevation: '2,160 m',
    distance: 'Flexible',
    minAge: '5 Years',
    description: 'An enchanting escape to Munnar and Kolukkumalai—home to the world\'s highest organic tea plantations. Enjoy an adventurous off-road jeep safari, capture breathtaking sunrise views at Jaguar Rock, trek through lush tea estates, and witness gorgeous waterfalls, gardens, and viewpoints.',
    originalPrice: 7499,
    currentPrice: 6499,
    withoutTransportPrice: 5499,
    discount: '',
    itineraryPdf: 'https://ik.imagekit.io/phj6ifoni/itinery/Itinerary/Trips/Munnar%20Trip%20AC.pdf',
    image: 'https://res.cloudinary.com/dofg6bsom/image/upload/v1784004377/e9b00515-f281-420b-bb50-4becfa70c50a.png',
    gallery: [
      'https://res.cloudinary.com/dofg6bsom/image/upload/v1784004377/e9b00515-f281-420b-bb50-4becfa70c50a.png',
      'https://res.cloudinary.com/dofg6bsom/image/upload/v1784004328/d88dbc0a-e24a-45af-bb7b-b17e5db4c650.png',
      'https://res.cloudinary.com/dofg6bsom/image/upload/v1784004287/907c81a6-2a74-4931-8093-79cab585a747.png',
      'https://res.cloudinary.com/dofg6bsom/image/upload/v1784004042/d7afedf9-83e7-49ea-a3a2-624ea1db858e.png',
      'https://res.cloudinary.com/dofg6bsom/image/upload/v1784004009/1bdba3e0-b878-47e3-86c8-2e0d0e520792.png'
    ],
    badgeColor: 'bg-brand-orange',
    category: 'weekend',
    itinerary: [
      {
        label: 'Day 0',
        emoji: '🌌',
        items: [
          { time: '07:40 PM', activity: '📍 Majestic metro station' },
          { time: '08:35 PM', activity: '📍 Koramangala - opp to Forum mall' },
          { time: '08:45 PM', activity: '📍 Silk board - near Renault showroom' },
          { time: '09:05 PM', activity: '📍 Electronic city - Toll plaza' }
        ]
      },
      {
        label: 'Day 1',
        emoji: '🏞️',
        items: [
          { time: '08:00 AM', activity: '🏠 Arrive at your stay in Munnar' },
          { time: '08:30 AM', activity: '🍳 Freshen up & hot delicious breakfast' },
          { time: '09:15 AM', activity: '🎒 Pack a day backpack & board our local transit vehicle' },
          { time: '10:15 AM', activity: '🌊 Visit Echo Point' },
          { time: '11:45 AM', activity: '🌺 Visit Botanical Garden / Rose Garden' },
          { time: '01:00 PM', activity: '🍛 Delicious lunch break' },
          { time: '02:00 PM', activity: '📸 Visit Photo Point: It\'s a chain of hills completely covered with tea estates' },
          { time: '03:00 PM', activity: '🧗 You can do zipline activity through the panoramic view tea estates (self-sponsored)' },
          { time: '04:30 PM', activity: '⛰️ Visit Phantom Hills & enjoy the beautiful sunset' },
          { time: '06:30 PM', activity: '🏡 Head back to stay for evening relaxation' },
          { time: '08:30 PM', activity: '🔥 Campfire (if weather permits), group bonding & dinner' },
          { time: '10:00 PM', activity: '🛌 Rest for the night' }
        ]
      },
      {
        label: 'Day 2',
        emoji: '🌅',
        items: [
          { time: '04:30 AM', activity: '🌅 Wake up & freshen up' },
          { time: '05:00 AM', activity: '🛞 Adventurous Jeep ride to Kolukkumalai hills' },
          { time: '06:00 AM', activity: '⛰️ Visit Jaguar Rock View Point & experience the sunrise (or post-sunrise)' },
          { time: '08:00 AM', activity: '🛞 Jeep ride back to base point through the most beautiful Munnar hill station covered with tea estates' },
          { time: '09:00 AM', activity: '🍳 Pack your bags, checkout from the stay & have breakfast' },
          { time: '10:30 AM', activity: '⛰️ Visit Munnar Gap Road view point' },
          { time: '11:45 AM', activity: '⛰️ Visit Anamudi view point' },
          { time: '01:00 PM', activity: '🍛 Have delicious local lunch' },
          { time: '02:00 PM', activity: '🌊 Visit Lakkom Waterfalls' },
          { time: '04:00 PM', activity: '🚍 Start your journey back to Bangalore' },
          { time: '08:00 PM', activity: '🍽️ Dinner on the way' },
          { time: '05:00 AM', activity: '🏡 Reach Bangalore on Monday early morning (drop timings may vary depending on the ground situation)' }
        ]
      }
    ],
    inclusions: [
      'Transportation: non A/C, seater vehicle (Tempo Traveler / mini bus / Bus depending on the number of people)',
      'Meals: South Indian Vegetarian food (Day 1 → breakfast & dinner, Day 2 → breakfast)',
      'Basic accommodation: Shared rooms / Dormitory / tent - any one of it will be provided (Separate for men & women, common/sharing washroom, no option to choose the accommodation type)',
      'All Entry fee as per itinerary',
      'Jeep ride charges for Kolukkumalai',
      'Certified Guide / First Aid Responder',
      'Tamil Nadu state & Kerala state permit',
      'E pass'
    ],
    exclusions: [
      'Any other expenses incurred apart from inclusions',
      'Any meals not mentioned in inclusions',
      'Any additional expenses due to emergencies / natural calamities',
      'Travel & Medical insurance',
      'Any activities, Any additional service & sightseeing',
      'Any travel expenses arising due to vehicle breakdown'
    ],
    thingsToCarry: [
      'Govt ID (either Aadhar / PAN / DL / Voter)',
      'Raincoat / Umbrella (essential for monsoon days)',
      'Trekking / hiking shoes or comfortable walking shoes',
      'Small backpack to carry your essentials',
      'Water bottle (please avoid single-use plastics)',
      'A polybag to carry any wet clothes',
      'Toiletries & towel',
      'Cold protective clothes - Sweaters / Jackets',
      'Fresh fruits, juice, Glucon-D, dry fruits, energy bars',
      'Sunscreen, Suncap & sunglasses (for sunny days)',
      'Charger / power bank for electronics',
      'Personal medications if any'
    ],
    placesCovered: [
      'Lakkom Waterfalls',
      'Tea estates',
      'Kolukkumalai',
      'Longest dual zipline',
      'Jeep Ride Kolukkumalai',
      'Jaguar rock view point',
      'Gap Road',
      'Anamudi',
      'Phantom Hills',
      'Rose garden',
      'Echo point',
      'Photo point'
    ]
  },
  {
id: '16',
    slug: 'wayanad-adventure-trip',
    title: 'Wayanad Adventure Trip',
    host: 'Adventure Chaarana',
    date: 'Every Friday Night',
    location: 'Wayanad, Kerala',
    duration: '2 Days / 1 Night',
    difficulty: 'Moderate',
    elevation: '950 m',
    distance: 'Flexible',
    minAge: '5 Years',
    description: 'An action-packed adventure and leisure getaway tracing pristine water bodies, lush tea estates, and misty landscapes. Take an off-road jeep ride to 900 Kandi, walk on the thrilling glass bridge, look over India’s largest earth dam, explore Karlad Lake, and marvel at magnificent waterfalls.',
    originalPrice: 5999,
    currentPrice: 4999,
    withoutTransportPrice: 3999,
    discount: '',
    image: 'https://images.unsplash.com/photo-1542856391-010fb87dcfed?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1506477331477-33d5d8b3dc85?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1545244014-f57689189371?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1627664813831-268db4d687af?auto=format&fit=crop&q=80&w=1200'
    ],
    badgeColor: 'bg-brand-orange',
    category: 'weekend',
    itinerary: [
      {
        label: 'Day 0',
        emoji: '🌃',
        items: [
          { time: '09:45 PM', activity: '⚡ Bangalore Departure: Pick up from Majestic (Near Metro station)' },
          { time: '10:15 PM', activity: '⚡ Pick up from Nayandanahalli metro station' },
          { time: '10:30 PM', activity: '⚡ Pick up from Kengeri bus stand' },
          { time: '12:30 AM', activity: '⚡ Mysore Pick up: KSRTC bus stand' }
        ]
      },
      {
        label: 'Day 1',
        emoji: '🏞️',
        items: [
          { time: '06:00 AM', activity: '🚍 Reach Wayanad in the morning & witness the beautiful sceneries' },
          { time: '07:00 AM', activity: '🏠 Reach homestay, freshen up & hot delicious breakfast' },
          { time: '08:15 AM', activity: '🎒 Pack a day backpack & board our local transit vehicle' },
          { time: '09:00 AM', activity: '🍃 Visit scenic Wayanad Tea Estates (Lush, emerald gardens)' },
          { time: '10:15 AM', activity: '🧗 Visit the longest zipline hub (You can indulge in activities like zipline & zipcycle at your own cost)' },
          { time: '01:00 PM', activity: '🍛 Delicious lunch break' },
          { time: '02:00 PM', activity: '🛞 Enjoy off-road jeep ride in Wayanad with picturesque valley views' },
          { time: '02:45 PM', activity: '⛰️ Head to 900 Kandi (Indulge in activities like Sky Walk, Burma Bridge, Archery, Rifle shooting)' },
          { time: '03:30 PM', activity: '🌉 Walk on the thrilling Glass Bridge & Sky hanging swing' },
          { time: '04:30 PM', activity: '🌊 Visit and experience Meenumutty Waterfalls' },
          { time: '06:00 PM', activity: '🏡 Head back to homestay for evening relaxation' },
          { time: '08:30 PM', activity: '🔥 Dinner, campfire (if weather permits) & cozy overnight stay' }
        ]
      },
      {
        label: 'Day 2',
        emoji: '🚣',
        items: [
          { time: '07:30 AM', activity: '🍳 Freshen up, have breakfast & check-out from the homestay' },
          { time: '09:00 AM', activity: '🧱 Visit Banasurasagar Dam, the largest earth dam in India (Indulge in speed boating, Kayaking & Zorbing at your own cost - 2 hours permitted)' },
          { time: '11:45 AM', activity: '⛵ Head to Karlad Lake for outdoor fun (Burma bridge, zipcycling, kayaking, zorbing)' },
          { time: '01:00 PM', activity: '🍛 Traditional self-sponsored local Malnad/Kerala lunch' },
          { time: '02:00 PM', activity: '🚍 Start your return journey to hometown' },
          { time: '05:30 PM', activity: '🌻 If time permits, stop at Gudlupete to see the gorgeous Sunflower farm' },
          { time: '06:00 PM', activity: '🦌 Cross Bandipura Forest checkpoint (Before strict 6 PM curfew)' },
          { time: '08:00 PM', activity: '🍽️ Reach Mysore & stop for a hearty dinner' },
          { time: '10:00 PM', activity: '🏡 Reach Bangalore (drop timings may vary depending on the ground situation)' }
        ]
      }
    ],
    inclusions: [
      'Transportation: non-AC seater vehicle (Tempo Traveler / mini bus / Bus depending on the number of people)',
      'Meals: simple South Indian vegetarian food (Day 1 Breakfast & Dinner, Day 2 Breakfast)',
      'Accommodation: basic homestay accommodation (shared rooms / dormitory, separate for men & women, common/sharing washroom)',
      'All entry fees as per standard itinerary',
      'Kerala state permit charges',
      'Certified Tour Guide / First Aid Responder'
    ],
    exclusions: [
      'Any other personal expenses incurred apart from inclusions',
      'Any meals not mentioned in inclusions',
      'Any additional expenses due to emergencies / natural calamities',
      'Jeep ride charge & entry fee to 900 Kandi',
      'Travel & Medical insurance',
      'Any individual rides, zip cycling, kayaking, zorbing, speed boating, or sightseeing activities at the parks',
      'Any travel expenses arising due to vehicle breakdown'
    ],
    thingsToCarry: [
      'Soft copy of your identity card (Aadhar card / any other Govt. ID)',
      'Additional clothes & extra pants/shorts',
      'Sandals / flip flops',
      'Small backpack to carry your essentials',
      'Water bottle (please avoid single-use plastics)',
      'A polybag to carry any wet clothes',
      'Toiletries & towel',
      'Cold protective clothes - Sweaters / Jackets',
      'Fresh fruits, juice, Glucon-D, dry fruits, energy bars',
      'Sunscreen, Suncap & sunglasses (for sunny days)',
      'Raincoat / Umbrella (for monsoon days)',
      'Charger / power bank for electronics',
      'Personal medications if any'
    ],
    placesCovered: [
      '900 Kandi canopy & forest',
      'Glass bridge',
      'Sky hanging swing',
      'Meenumutty Waterfalls',
      'Banasurasagar Dam (Largest earth dam)',
      'Karlad Lake',
      'Wayanad Tea Estates',
      'Gudlupete Sunflower Farm',
      'Bandipur Forest checkpoint'
    ]
  },
  {
id: '17',
    slug: 'coorg-weekend-getaway',
    title: 'Coorg Weekend Getaway – 2 Days / 1 Night',
    host: 'Adventure Chaarana',
    date: 'Every Friday Night',
    location: 'Coorg, Karnataka',
    duration: '2 Days / 1 Night',
    difficulty: 'Easy',
    elevation: '1,525 m',
    distance: '',
    minAge: '5 Years',
    description: 'Escape into the "Scotland of India" for a captivating 2 Days / 1 Night weekend getaway. Experience sunrise over Mandalpatti, mist at Abbey Falls, Talakaveri, Raja\'s Seat, Namdroling Tibetan Monastery, and the majestic Mysore Palace.',
    originalPrice: 5499,
    currentPrice: 4499,
    withoutTransportPrice: 3499,
    discount: '',
    image: 'https://res.cloudinary.com/dmez9koqz/image/upload/v1786080405/coorg_2_miry9o.jpg',
    gallery: [
      'https://res.cloudinary.com/dmez9koqz/image/upload/v1786080403/coorg_1_xdkd9p.jpg',
      'https://res.cloudinary.com/dmez9koqz/image/upload/v1786080126/6fd0afa8-38fb-46cd-9eb6-ca499c4da06d.png',
      'https://res.cloudinary.com/dmez9koqz/image/upload/v1786080096/c7374b4b-7f6f-43c9-b7de-d5e4483e07e2.png',
      'https://res.cloudinary.com/dmez9koqz/image/upload/v1786080057/7ea4fa8c-cec5-4105-b34b-36c080d984ae.png',
      'https://res.cloudinary.com/dmez9koqz/image/upload/v1786080054/5f8ded74-04fb-4f51-9901-2dbd6eb36341.png'
    ],
    badgeColor: 'bg-brand-orange',
    category: 'weekend',
    itinerary: [
      {
        label: 'Day 1',
        emoji: '🚌',
        items: [
          { time: '09:00 PM', activity: '📍 Majestic (Shanthala Silks) - Boarding point' },
          { time: '09:30 PM', activity: '📍 Nayandanahalli Metro Station' },
          { time: '09:45 PM', activity: '📍 Kengeri Metro Station' },
          { time: 'Overnight', activity: '<ctrl42> Comfortable overnight journey from Bangalore towards Coorg 🌿' }
        ]
      },
      {
        label: 'Day 2',
        emoji: '🌄',
        items: [
          { time: '05:30 AM', activity: '🌅 Sunrise visit to Mandalpatti Peak (Mandalpatti Jeep ride is self-sponsored)' },
          { time: '08:30 AM', activity: '🏠 Check-in & freshen up at homestay 🏡' },
          { time: '09:30 AM', activity: '🍳 Breakfast at homestay' },
          { time: '10:30 AM', activity: '🌊 Visit the beautiful Abbey Falls' },
          { time: '01:00 PM', activity: '🌿 Visit Talakaveri View Point – Origin of River Kaveri' },
          { time: '02:30 PM', activity: '🛕 Explore Bhagamandala Triveni Sangam' },
          { time: '05:30 PM', activity: '🌅 Enjoy sunset views at Raja’s Seat' },
          { time: '08:00 PM', activity: '🔥 Campfire & Music at Homestay (Weather Permitting) & Dinner 🎶' }
        ]
      },
      {
        label: 'Day 3',
        emoji: '🏞️',
        items: [
          { time: '08:00 AM', activity: '🍳 Breakfast and Checkout from Homestay' },
          { time: '09:00 AM', activity: '🛕 Visit Omkareshwara Temple' },
          { time: '11:00 AM', activity: '🌊 Explore the peaceful Chiklihole Reservoir' },
          { time: '01:00 PM', activity: '✨ Visit Namdroling Monastery (Golden Temple) & experience Tibetan culture' },
          { time: '03:30 PM', activity: '🌟 Explore the majestic Mysore Palace' },
          { time: '06:00 PM', activity: '🚌 Start return journey to Bangalore' },
          { time: '11:30 PM', activity: '🏡 Late-night arrival in Bangalore' }
        ]
      }
    ],
    inclusions: [
      'Transportation: non A/C, seater vehicle (Tempo Traveler / mini bus / Bus depending on the number of people)',
      'Meals: South Indian Vegetarian food (Day 1 → breakfast & dinner, Day 2 → breakfast)',
      'Basic accommodation: Shared rooms / Dormitory / tent - any one of it will be provided (Separate for men & women, common/sharing washroom, no option to choose the accommodation type)',
      'All Entry fee as per itinerary',
      'Certified Guide / First Aid Responder'
    ],
    exclusions: [
      'Mandalpatti Jeep ride charges (Self-sponsored)',
      'Any other expenses incurred apart from inclusions',
      'Any meals not mentioned in inclusions',
      'Any additional expenses due to emergencies / natural calamities',
      'Travel & Medical insurance',
      'Any activities, Any additional service & sightseeing',
      'Any travel expenses arising due to vehicle breakdown'
    ],
    thingsToCarry: [
      'Government ID card (Aadhar / Driving License)',
      'Comfortable clothing & extra set of clothes',
      'Light jacket / sweater (cold weather)',
      'Raincoat / umbrella (weather dependent)',
      'Water bottle & personal toiletries',
      'Personal medications & Power bank'
    ],
    placesCovered: [
      'Mandalpatti Peak',
      'Abbey Falls',
      'Talakaveri View Point',
      'Bhagamandala Triveni Sangam',
      'Raja’s Seat',
      'Omkareshwara Temple',
      'Chiklihole Reservoir',
      'Namdroling Monastery',
      'Mysore Palace'
    ]
  },
  {
    id: '18',
    slug: 'gokarna-beach-trek-weekend-trip',
    title: 'Gokarna Beach Trek & Camping',
    host: 'Adventure Chaarana',
    date: 'Every Friday Night',
    location: 'Gokarna & Kumta, Karnataka',
    duration: '2 Days / 1 Night',
    difficulty: 'Easy',
    elevation: 'Sea Level',
    distance: '8 KM (Beach Trek)',
    minAge: '5 Years',
    description: 'Escape to the sun-kissed coastline of Gokarna and Kumta for an unforgettable weekend adventure. Camp right beside the Arabian Sea in 2-sharing tents, trek along golden sands and cliff trails from Belkan Beach to Om Beach, explore historic Mirjan Fort, witness sunrise boating in Honnavara mangroves, marvel at the towering Murudeshwara Shiva temple, and behold the world-famous Jog Falls.',
    originalPrice: 4999,
    currentPrice: 3999,
    withoutTransportPrice: 2999,
    discount: '',
    itineraryPdf: 'https://ik.imagekit.io/phj6ifoni/itinery/Itinerary/Trips/Gokarna,%20Honnavara,%20Murudeshwara%20and%20Jog%20Falls.pdf',
    image: 'https://ik.imagekit.io/phj6ifoni/Gokarna/_%20Lost%20in%20the%20rhythm%20of%20waves,%20where%20every%20sunset%20feels%20like%20a%20story%20and%20every%20breeze%20whispers.jpg',
    gallery: [
      'https://ik.imagekit.io/phj6ifoni/Gokarna/7.jpeg',
      'https://ik.imagekit.io/phj6ifoni/Gokarna/6.jpeg',
      'https://ik.imagekit.io/phj6ifoni/Gokarna/13.jpeg',
      'https://ik.imagekit.io/phj6ifoni/Gokarna/9.jpeg',
      'https://ik.imagekit.io/phj6ifoni/Gokarna/10.jpeg',
      'https://ik.imagekit.io/phj6ifoni/Gokarna/12.jpeg',
      'https://ik.imagekit.io/phj6ifoni/Gokarna/4.jpeg',
      'https://ik.imagekit.io/phj6ifoni/Gokarna/3.jpeg',
      'https://ik.imagekit.io/phj6ifoni/Gokarna/11.jpeg',
      'https://ik.imagekit.io/phj6ifoni/Gokarna/2.jpeg',
      'https://ik.imagekit.io/phj6ifoni/Gokarna/8.jpeg',
      'https://ik.imagekit.io/phj6ifoni/Gokarna/1.jpeg'
    ],
    badgeColor: 'bg-brand-orange',
    category: 'weekend',
    itinerary: [
      {
        label: 'Pickups',
        emoji: '🚌',
        items: [
          { time: '08:00 PM', activity: '📍 HSR Layout (Bangalore Pickup)' },
          { time: '08:30 PM', activity: '📍 Koramangala, Sony Signal (Bangalore Pickup)' },
          { time: '08:45 PM', activity: '📍 Domlur Post Office (Bangalore Pickup)' },
          { time: '09:15 PM', activity: '📍 KTM Mekhri Circle (Bangalore Pickup)' },
          { time: '09:30 PM', activity: '📍 Yeshwanthpura (Bangalore Pickup)' },
          { time: '10:00 PM', activity: '📍 Gorguntepalya (Bangalore Pickup)' },
          { time: '12:00 AM', activity: '📍 Tumkur - Batwadi Bypass (Enroute Pickup)' },
          { time: '01:30 AM', activity: '📍 Chitradurga KSRTC Bus Stop (Enroute Pickup)' },
          { time: '03:00 AM', activity: '📍 Shivamogga KSRTC Bus Stop (Enroute Pickup)' }
        ]
      },
      {
        label: 'Day 1',
        emoji: '🏖️',
        items: [
          { time: '07:30 AM', activity: '⛺ Reach the beach-facing campsite at Kumta Beach in the morning, freshen up and have breakfast' },
          { time: '09:30 AM', activity: '🏰 Visit the historic Mirjan Fort and explore its rich heritage' },
          { time: '11:30 AM', activity: '🛕 Explore Gokarna’s traditional streets and experience the local culture' },
          { time: '01:00 PM', activity: '🍽️ Have lunch and get ready for the beach trek' },
          { time: '02:30 PM', activity: '🥾 Start the beach trek from Belkan Beach to Om Beach' },
          { time: '05:30 PM', activity: '🌅 Reach Om Beach and enjoy a beautiful sunset by the sea' },
          { time: '07:00 PM', activity: '🚌 Drive back to the campsite, freshen up and relax' },
          { time: '08:00 PM', activity: '🌊 Spend some peaceful time by the beach' },
          { time: '08:30 PM', activity: '🍽️ Enjoy dinner at the campsite' },
          { time: '09:30 PM', activity: '🔥 Campfire by the beach, depending on weather conditions' },
          { time: '10:00 PM', activity: '🏮 Light a sky lantern over the sea and end the day on a magical note' },
          { time: '10:30 PM', activity: '⛺ Overnight stay in a beach-facing tent under the stars' }
        ]
      },
      {
        label: 'Day 2',
        emoji: '🌊',
        items: [
          { time: '06:00 AM', activity: '🌅 Wake up early in the morning, freshen up, have breakfast and check out from the campsite' },
          { time: '07:30 AM', activity: '🛶 Watch the sunrise with Honnavara Boating (self-sponsored)' },
          { time: '09:00 AM', activity: '🌿 Explore the beautiful Sharavathi Kandla Mangrove Forest' },
          { time: '10:15 AM', activity: '🌉 Visit the scenic Sharavathi Hanging Bridge' },
          { time: '11:30 AM', activity: '🍽️ Have lunch and get ready for the next leg of the journey' },
          { time: '01:00 PM', activity: '🔱 Drive towards Murudeshwara and visit the magnificent Shiva Temple by the beach' },
          { time: '02:30 PM', activity: '📸 Explore the iconic Shiva Statue and enjoy the coastal views' },
          { time: '04:00 PM', activity: '🌊 Continue the journey towards Jog Falls' },
          { time: '05:15 PM', activity: '💦 Visit Jog Falls and enjoy the breathtaking views' },
          { time: '07:30 PM', activity: '🚌 Start the journey back to Bangalore' },
          { time: '05:00 AM', activity: '🏠 Reach Bangalore the next morning at approximately 5:00 AM' }
        ]
      }
    ],
    inclusions: [
      'Transportation: Non-A/C seater vehicle throughout the trip (Tempo Traveller / Mini Bus / Bus arranged based on group size)',
      'Meals: Authentic South Indian Vegetarian Meals (Saturday: Breakfast & Dinner, Sunday: Breakfast)',
      'Accommodation: Beach-facing campsite – 2-sharing tent accommodation (Separate accommodation for men & women, common/shared washroom facilities)',
      'All entry fees mentioned in the itinerary',
      'Certified Guide / First Aid Responder from Adventure Chaarana'
    ],
    exclusions: [
      'Any expenses incurred other than those specifically mentioned under the inclusions',
      'Friday’s Dinner, Saturday’s Lunch, Sunday’s Lunch & Dinner during the return journey',
      'Honnavara boating & water activities (self-sponsored)',
      'Any additional expenses arising due to emergencies, natural calamities, unforeseen circumstances, or changes in itinerary',
      'Travel & Medical Insurance',
      'Charges for activities not specifically mentioned in the itinerary',
      'Any additional services, personal expenses, or sightseeing not mentioned in the itinerary',
      'Any additional travel expenses arising due to vehicle breakdown or unforeseen transportation issues'
    ],
    thingsToCarry: [
      'Government ID card (original or soft copy)',
      'Comfortable clothes & extra beachwear / change of clothes',
      'Trekking shoes or sturdy sandals with grip for beach and rocks',
      'Water bottle (at least 2L)',
      'Sunscreen, sunglasses & beach hat',
      'Personal toiletries & quick-dry towel',
      'Personal medications & first aid kit',
      'Power bank & torch / headlamp'
    ],
    placesCovered: [
      'Kumta Beach Campsite',
      'Mirjan Fort',
      'Gokarna Traditional Streets',
      'Belkan Beach',
      'Om Beach',
      'Honnavara Boating',
      'Sharavathi Kandla Mangrove Forest',
      'Sharavathi Hanging Bridge',
      'Murudeshwara Shiva Temple & Statue',
      'Jog Falls'
    ]
  },
  {
    id: '19',
    slug: 'ooty-trip',
    title: 'Ooty Trip',
    host: 'Adventure Chaarana',
    date: 'Every Friday Night',
    location: 'Ooty & Nilgiris, Tamil Nadu',
    duration: '2 Days / 1 Night',
    difficulty: 'Easy',
    elevation: '2,240 m',
    distance: 'Sightseeing & Nature Trails',
    minAge: '5 Years',
    description: 'Escape to the Queen of Hill Stations! Explore vibrant botanical gardens, Doddabetta panoramic vistas, scenic boating, aromatic tea plantations, pine forest trails, and picturesque drives through the Nilgiris, Bandipur, and Mudumalai reserves.',
    originalPrice: 6499,
    currentPrice: 5999,
    withoutTransportPrice: 4999,
    discount: '',
    itineraryPdf: 'https://ik.imagekit.io/phj6ifoni/itinery/Itinerary/Trips/Ooty%20Trip%20AC.pdf',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop'
    ],
    badgeColor: 'bg-brand-orange',
    category: 'weekend',
    itinerary: [
      {
        label: 'Day 0',
        emoji: '🌃',
        items: [
          { time: '08:00 PM', activity: 'Boarding begins from Bangalore pickup points' },
          { time: '09:00 PM', activity: 'Scenic night drive through Mysore route to the Nilgiris' }
        ]
      },
      {
        label: 'Day 1',
        emoji: '🌄',
        items: [
          { time: '08:00 AM', activity: 'Arrive at Ooty stay, freshen up and have breakfast' },
          { time: '09:30 AM', activity: 'Pack daypack and visit the Government Botanical Garden' },
          { time: '11:30 AM', activity: 'Head to Doddabetta Peak – highest point in the Nilgiris' },
          { time: '01:30 PM', activity: 'Visit Ooty Boat House (Mini Toy Train & Boating)' },
          { time: '02:30 PM', activity: 'Lunch stop at a local restaurant' },
          { time: '03:45 PM', activity: 'Visit Deer Park and explore tranquil surroundings' },
          { time: '04:45 PM', activity: 'Explore the vibrant Ooty Rose Garden' },
          { time: '07:30 PM', activity: 'Return to stay, dinner and relaxing night' }
        ]
      },
      {
        label: 'Day 2',
        emoji: '🌲',
        items: [
          { time: '07:30 AM', activity: 'Freshen up, breakfast & checkout from the stay' },
          { time: '08:30 AM', activity: 'Visit Karnataka Garden & scenic Pine Forest (Horse riding available)' },
          { time: '11:00 AM', activity: 'Visit stunning Pykara Waterfalls & Ooty Lake' },
          { time: '01:00 PM', activity: 'Head to 9th Mile Shooting Point surrounded by rolling hills' },
          { time: '03:00 PM', activity: 'Visit authentic Tea Estate & Factory for local tea shopping' },
          { time: '05:00 PM', activity: 'Drive through Mudumalai & Bandipur Tiger Reserve forests' },
          { time: '07:00 PM', activity: 'Stop at Mysore for dinner' },
          { time: '10:00 PM', activity: 'Reach Bangalore with memorable moments' }
        ]
      }
    ],
    inclusions: [
      'Round-trip transportation from Bangalore in pushback vehicle',
      'Comfortable stay in Ooty (sharing basis)',
      '2 Breakfasts and 1 Dinner',
      'All entry fees and toll/parking charges',
      'Expert Trip Leaders from Adventure Chaarana',
      'First aid & emergency support'
    ],
    exclusions: [
      'Lunches and Day 2 Dinner en route',
      'Boating, Mini Toy Train ride & Horse riding expenses',
      'Personal shopping and expenses not mentioned in inclusions'
    ],
    thingsToCarry: [
      'Original Govt ID card (mandatory)',
      'Warm jacket / fleece / sweater (Ooty gets chilly)',
      'Comfortable walking/sports shoes',
      'Reusable water bottle (2L)',
      'Personal toiletries and medications',
      'Daypack (20L) for day sightseeing'
    ],
    placesCovered: [
      'Government Botanical Garden',
      'Doddabetta View Point',
      'Ooty Boat House & Lake',
      'Mini Toy Train Ride',
      'Deer Park',
      'Rose Garden',
      'Karnataka Garden',
      'Pine Forest',
      'Pykara Waterfalls',
      '9th Mile Shooting Point',
      'Tea Estate & Factory',
      'Mudumalai & Bandipur Forest Drive'
    ]
  },
  {
    id: '20',
    slug: 'kumaraparvatha-trek',
    title: 'Kumaraparvatha Trek (Beedalli Route)',
    host: 'Adventure Chaarana',
    date: 'Every Friday Night',
    location: 'Somwarpet, Coorg, Karnataka',
    duration: '2 Days / 1 Night',
    difficulty: 'Moderate - Difficult',
    elevation: '1,712 m',
    distance: '14 km (total)',
    minAge: '8+',
    timeHours: '8Hrs',
    modeRating: 'Moderate - Difficult',
    description: 'Conquer the legendary Kumaraparvatha through the lush Somwarpet Beedalli trail. Trek through pristine shola rainforests, sweeping mountain ridges, and gushing streams to reach the summit, complemented by Mallali Falls and Manjarabad Star Fort.',
    originalPrice: 4499,
    currentPrice: 4199,
    withoutTransportPrice: 3199,
    discount: '',
    itineraryPdf: 'https://ik.imagekit.io/phj6ifoni/itinery/Itinerary/Western/Kumaraparvatha%20AC.pdf',
    image: 'https://ik.imagekit.io/phj6ifoni/KP/WhatsApp%20Image%202026-09-21%20at%203.26.16%20PM.jpeg',
    gallery: [
      'https://ik.imagekit.io/phj6ifoni/KP/WhatsApp%20Image%202026-09-21%20at%203.28.57%20PM.jpeg',
      'https://ik.imagekit.io/phj6ifoni/KP/WhatsApp%20Image%202026-09-21%20at%203.27.24%20PM.jpeg',
      'https://ik.imagekit.io/phj6ifoni/KP/WhatsApp%20Image%202026-09-21%20at%203.28.56%20PM.jpeg',
      'https://ik.imagekit.io/phj6ifoni/KP/WhatsApp%20Image%202026-09-21%20at%203.28.58%20PM.jpeg',
      'https://ik.imagekit.io/phj6ifoni/KP/WhatsApp%20Image%202026-09-21%20at%203.26.21%20PM.jpeg',
      'https://ik.imagekit.io/phj6ifoni/KP/WhatsApp%20Image%202026-09-21%20at%203.26.23%20PM.jpeg',
      'https://ik.imagekit.io/phj6ifoni/KP/WhatsApp%20Image%202026-09-21%20at%203.26.19%20PM.jpeg',
      'https://ik.imagekit.io/phj6ifoni/KP/WhatsApp%20Image%202026-09-21%20at%203.26.17%20PM.jpeg',
      'https://ik.imagekit.io/phj6ifoni/KP/WhatsApp%20Image%202026-09-21%20at%203.28.56%20PM%20(1).jpeg'
    ],
    badgeColor: 'bg-brand-orange',
    category: 'western-ghats',
    itinerary: [
      {
        label: 'Day 0',
        emoji: '🌃',
        items: [
          { time: '08:00 PM', activity: 'Boarding from Bangalore pickup points' },
          { time: '09:00 PM', activity: 'Overnight journey towards Somwarpet, Coorg' }
        ]
      },
      {
        label: 'Day 1',
        emoji: '🏔️',
        items: [
          { time: '06:00 AM', activity: 'Reach Beedalli base camp, freshen up and breakfast' },
          { time: '07:30 AM', activity: 'Trek briefing and safety instructions by certified leaders' },
          { time: '08:00 AM', activity: 'Begin ascent towards Kumaraparvatha Peak through dense forests' },
          { time: '01:00 PM', activity: 'Reach the summit ridge and enjoy packed lunch with panoramic views' },
          { time: '02:00 PM', activity: 'Descend back along the trail towards Beedalli' },
          { time: '06:00 PM', activity: 'Reach base camp / homestay, freshen up and hot tea' },
          { time: '08:30 PM', activity: 'Hearty dinner and relaxing overnight rest' }
        ]
      },
      {
        label: 'Day 2',
        emoji: '🌊',
        items: [
          { time: '06:00 AM', activity: 'Wake up early, visit sunrise viewpoint & have breakfast' },
          { time: '08:00 AM', activity: 'Visit Shantha Mallikarjuna Temple & 1,000-year-old Sampige tree' },
          { time: '10:00 AM', activity: 'Reach Kumaradhare River for exciting river rafting (optional)' },
          { time: '12:30 PM', activity: 'Witness the roaring cascades of Mallali Falls' },
          { time: '03:00 PM', activity: 'Explore the historic star-shaped Manjarabad Fort' },
          { time: '04:30 PM', activity: 'Depart towards Bangalore with unforgettable memories' },
          { time: '10:30 PM', activity: 'Reach Bangalore' }
        ]
      }
    ],
    inclusions: [
      'Round-trip transportation from Bangalore in pushback vehicle',
      'Homestay accommodation in Coorg',
      '2 Breakfasts, 1 Packed Lunch, and 1 Dinner',
      'Forest entry permits & guide fees',
      'Experienced Adventure Chaarana trek leads',
      'First aid and emergency assistance'
    ],
    exclusions: [
      'River rafting charges (self-sponsored)',
      'Day 2 Lunch and Dinner en route',
      'Personal gear and expenses'
    ],
    thingsToCarry: [
      'Govt ID card (mandatory for forest checkposts)',
      'Sturdy trekking shoes with excellent grip',
      'Backpack (20–30L) with rain cover',
      'Water bottles (2L reusable)',
      'Trekking pole (recommended)',
      'Personal medical kit & toiletries'
    ],
    placesCovered: [
      'Kumaraparvatha Peak',
      'Beedalli Base Camp',
      'Mallali Falls',
      'Shantha Mallikarjuna Temple',
      '1000-Year-Old Sampige Tree',
      'Kumaradhare River Rafting',
      'Manjarabad Star Fort'
    ]
  },
  {
    id: '21',
    slug: 'kumaraparvatha-beedahalli-to-kukke',
    title: 'Kumaraparvatha Trek (Beedahalli to Kukke)',
    host: 'Adventure Chaarana',
    date: 'Every Friday Night',
    location: 'Coorg to Kukke Subramanya, Karnataka',
    duration: '2 Days / 1 Night',
    difficulty: 'Moderate - Difficult',
    elevation: '1,712 m',
    distance: '22 km (total)',
    minAge: '8+',
    timeHours: '10Hrs',
    modeRating: 'Moderate - Difficult',
    description: 'The ultimate Western Ghats traverse! Cross from Beedahalli in Coorg over the high crest of Kumaraparvatha and Sheshaparvatha, descending past Bhattara Mane to sacred Kukke Subrahmanya, enriched by Bisle Ghat vistas and kayaking.',
    originalPrice: 4499,
    currentPrice: 4199,
    withoutTransportPrice: 3199,
    discount: '',
    itineraryPdf: 'https://ik.imagekit.io/phj6ifoni/itinery/Itinerary/Western/Kumaraparvatha%20Bedahalli%20to%20Kukke%20AC.pdf',
    image: 'https://ik.imagekit.io/phj6ifoni/KP/WhatsApp%20Image%202026-09-21%20at%203.28.58%20PM.jpeg',
    gallery: [
      'https://ik.imagekit.io/phj6ifoni/KP/WhatsApp%20Image%202026-09-21%20at%203.26.16%20PM.jpeg',
      'https://ik.imagekit.io/phj6ifoni/KP/WhatsApp%20Image%202026-09-21%20at%203.28.57%20PM.jpeg',
      'https://ik.imagekit.io/phj6ifoni/KP/WhatsApp%20Image%202026-09-21%20at%203.27.24%20PM.jpeg',
      'https://ik.imagekit.io/phj6ifoni/KP/WhatsApp%20Image%202026-09-21%20at%203.28.56%20PM.jpeg',
      'https://ik.imagekit.io/phj6ifoni/KP/WhatsApp%20Image%202026-09-21%20at%203.26.21%20PM.jpeg',
      'https://ik.imagekit.io/phj6ifoni/KP/WhatsApp%20Image%202026-09-21%20at%203.26.23%20PM.jpeg',
      'https://ik.imagekit.io/phj6ifoni/KP/WhatsApp%20Image%202026-09-21%20at%203.26.19%20PM.jpeg',
      'https://ik.imagekit.io/phj6ifoni/KP/WhatsApp%20Image%202026-09-21%20at%203.26.17%20PM.jpeg',
      'https://ik.imagekit.io/phj6ifoni/KP/WhatsApp%20Image%202026-09-21%20at%203.28.56%20PM%20(1).jpeg'
    ],
    badgeColor: 'bg-brand-orange',
    category: 'western-ghats',
    itinerary: [
      {
        label: 'Day 0',
        emoji: '🌃',
        items: [
          { time: '08:00 PM', activity: 'Boarding starts across Bangalore pickup points' },
          { time: '09:00 PM', activity: 'Overnight journey towards Somwarpet base' }
        ]
      },
      {
        label: 'Day 1',
        emoji: '⛰️',
        items: [
          { time: '06:00 AM', activity: 'Reach base camp, freshen up, breakfast & ID/permit check' },
          { time: '07:30 AM', activity: 'Start the epic traverse trek toward the summit' },
          { time: '12:00 PM', activity: 'Reach Kumaraparvatha Peak (1,712m)' },
          { time: '01:00 PM', activity: 'Reach Sesha Parvatha with majestic panoramic views & packed lunch' },
          { time: '02:00 PM', activity: 'Descend towards Kallu Mantapa and Girigadde (Bhattara Mane)' },
          { time: '05:30 PM', activity: 'Reach Kukke Subramanya stay, freshen up' },
          { time: '07:00 PM', activity: 'Visit the revered Kukke Subrahmanya Temple' },
          { time: '08:30 PM', activity: 'Dinner and well-deserved rest' }
        ]
      },
      {
        label: 'Day 2',
        emoji: '🛶',
        items: [
          { time: '07:00 AM', activity: 'Local cuisine breakfast & checkout' },
          { time: '08:00 AM', activity: 'Scenic drive through the breathtaking Bisle Ghat ridge' },
          { time: '10:30 AM', activity: 'Explore hidden waterfalls with kayaking & boating session' },
          { time: '02:00 PM', activity: 'Lunch stop en route (self-sponsored)' },
          { time: '04:00 PM', activity: 'Depart towards Bengaluru' },
          { time: '11:30 PM', activity: 'Arrival back in Bangalore' }
        ]
      }
    ],
    inclusions: [
      'Round-trip transportation from Bangalore',
      'Accommodation in Kukke Subramanya (sharing basis)',
      '2 Breakfasts, 1 Packed Lunch, 1 Dinner',
      'Forest permits, guide charges, and environmental fees',
      'Trek leaders and medical kit assistance'
    ],
    exclusions: [
      'Day 2 Lunch and Dinner on return',
      'Kayaking/boating entry fee (if applicable)',
      'Temple puja and personal expenses'
    ],
    thingsToCarry: [
      'Valid Government Photo ID',
      'Trekking shoes with solid grip (essential for steep descent)',
      'Light daypack + water bottle (2-3L)',
      'Rain cover / poncho',
      'Knee support/straps (recommended for descent)',
      'Change of clothes & personal medicines'
    ],
    placesCovered: [
      'Kumaraparvatha Peak',
      'Sheshaparvatha',
      'Kallu Mantapa',
      'Girigadhe (Bhattara Mane)',
      'Kukke Subrahmanya Temple',
      'Bisle Ghat Viewpoint',
      'Hidden Waterfalls & Kayaking'
    ]
  },
  {
    id: '22',
    slug: 'badami-rock-climbing-trip',
    title: 'Badami Rock Climbing and Exploration',
    host: 'Adventure Chaarana',
    date: 'Every Friday Night',
    location: 'Badami, Bagalkot, Karnataka',
    duration: '2 Days / 1 Night',
    difficulty: 'Moderate',
    elevation: '593 m',
    distance: 'Rock Climbing & Bouldering',
    minAge: '6 Years',
    description: 'Experience India’s premier rock climbing capital! Scale magnificent red sandstone cliffs with certified climbing instructors, rappel down natural rock faces, and explore ancient rock-cut cave temples, Aihole, and the UNESCO World Heritage site of Pattadakal.',
    originalPrice: 5499,
    currentPrice: 4999,
    withoutTransportPrice: 3499,
    discount: '',
    itineraryPdf: 'https://ik.imagekit.io/phj6ifoni/itinery/Itinerary/Trips/Badami%20Rock%20Climbing%20AC.pdf',
    image: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1522163182402-834f871fd851?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1568454537842-d933259bb258?q=80&w=1200&auto=format&fit=crop'
    ],
    badgeColor: 'bg-brand-orange',
    category: 'weekend',
    itinerary: [
      {
        label: 'Day 0',
        emoji: '🌃',
        items: [
          { time: '08:00 PM', activity: 'Boarding from Bangalore pickup points' },
          { time: '09:00 PM', activity: 'Overnight journey to the heritage kingdom of Badami' }
        ]
      },
      {
        label: 'Day 1',
        emoji: '🧗‍♂️',
        items: [
          { time: '07:30 AM', activity: 'Arrive at Badami, freshen up and enjoy hearty breakfast' },
          { time: '09:00 AM', activity: 'Safety briefing & gear introduction by certified climbing instructors' },
          { time: '09:30 AM', activity: 'Rock climbing & rappelling on natural red sandstone crags' },
          { time: '01:30 PM', activity: 'Delicious local North Karnataka lunch' },
          { time: '03:00 PM', activity: 'Cave exploration at the iconic 6th-century Badami Rock-cut Caves' },
          { time: '05:00 PM', activity: 'Visit Bhoothanatha Gudi along the serene Agastya Lake at sunset' },
          { time: '07:00 PM', activity: 'Return to homestay, evening snacks, campfire and dinner' }
        ]
      },
      {
        label: 'Day 2',
        emoji: '🏛️',
        items: [
          { time: '06:30 AM', activity: 'Auto ride to ancient Mahakuta Temple & sacred natural spring pond' },
          { time: '08:30 AM', activity: 'Breakfast, freshen up and check out' },
          { time: '09:30 AM', activity: 'Heritage trail to the ancient temples of Aihole' },
          { time: '01:00 PM', activity: 'Lunch en route' },
          { time: '02:00 PM', activity: 'Explore UNESCO World Heritage monument complex at Pattadakal' },
          { time: '04:30 PM', activity: 'Begin return journey towards Bengaluru' },
          { time: '11:00 PM', activity: 'Reach Bangalore' }
        ]
      }
    ],
    inclusions: [
      'Round-trip transportation from Bangalore',
      'Homestay / hotel stay in Badami (sharing basis)',
      'Professional climbing and safety gear (harness, helmets, ropes, carabiners)',
      'Certified climbing & rappelling instructors',
      '2 Breakfasts, 1 Lunch, and 1 Dinner',
      'Entry tickets, monument permits & guide fees',
      'First aid & emergency support'
    ],
    exclusions: [
      'Day 2 Lunch and Dinner en route',
      'Personal expenses, snacks & water purchases',
      'Auto ride fare (shared) if outside package inclusions'
    ],
    thingsToCarry: [
      'Original Govt Photo ID',
      'Comfortable sports/climbing shoes (snug fit recommended)',
      'Comfortable stretchable clothing (avoid loose jeans for climbing)',
      'Sun hat/cap & sunscreen',
      'Water bottle (2L reusable)',
      'Towel (if planning to take a dip in Mahakuta pond)',
      'Personal toiletries & medications'
    ],
    placesCovered: [
      'Natural Rock Climbing Sites',
      'Natural Rock Rappelling',
      'Badami Cave Temples',
      'Bhoothanatha Gudi',
      'Agastya Lake',
      'Mahakuta Temple & Natural Spring Pond',
      'Aihole Heritage Site',
      'Pattadakal UNESCO World Heritage Complex',
      'Badami Archaeological Museum'
    ]
  }
];
