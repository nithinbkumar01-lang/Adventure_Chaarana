import type { Trek } from './types/trek';

export const SITE_URL = 'https://www.adventurechaarana.in';
export const SITE_NAME = 'Adventure Chaarana';
export const BRAND_LOGO = 'https://res.cloudinary.com/dmez9koqz/image/upload/v1786011636/logo_eng_fr3ih9.png';
export const DEFAULT_SOCIAL_IMAGE = 'https://res.cloudinary.com/dofg6bsom/image/upload/v1777477957/Background_tdfgts.png';

export interface SeoMetadata {
  title: string;
  description: string;
  path: string;
  image?: string;
  noindex?: boolean;
  schema?: Record<string, unknown> | Array<Record<string, unknown>>;
}

export const homeSeo: SeoMetadata = {
  title: 'Guided Treks & Weekend Getaways from Bengaluru | Adventure Chaarana',
  description: 'Discover guided sunrise treks, Western Ghats trails and weekend getaways from Bengaluru. Compare itineraries, difficulty, trip details and prices with Adventure Chaarana.',
  path: '/',
};

export const policySeo: Record<string, SeoMetadata> = {
  terms: {
    title: 'Booking Terms & Conditions | Adventure Chaarana',
    description: 'Review Adventure Chaarana booking, participation and travel terms before joining a trek or weekend trip from Bengaluru.',
    path: '/terms',
  },
  refund: {
    title: 'Trek Cancellation & Refund Policy | Adventure Chaarana',
    description: 'Understand cancellation timelines, rescheduling options and refund terms for Adventure Chaarana treks and trips.',
    path: '/refund-policy',
  },
  safety: {
    title: 'Trekking Safety Code & Responsible Travel | Adventure Chaarana',
    description: 'Read the trail safety, group conduct and Leave No Trace guidelines for Adventure Chaarana trekking trips.',
    path: '/safety-code',
  },
};

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'TravelAgency',
  '@id': `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  logo: BRAND_LOGO,
  image: DEFAULT_SOCIAL_IMAGE,
  description: 'Guided treks, Western Ghats expeditions and weekend getaways departing from Bengaluru, India.',
  email: 'adventurechaarana@gmail.com',
  telephone: '+919980489494',
  areaServed: [
    { '@type': 'City', name: 'Bengaluru' },
    { '@type': 'AdministrativeArea', name: 'Karnataka' },
    { '@type': 'Country', name: 'India' },
  ],
  sameAs: [
    'https://www.instagram.com/adventure_chaarana/',
  ],
};

export const homeSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    Object.fromEntries(Object.entries(organizationSchema).filter(([key]) => key !== '@context')),
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: SITE_NAME,
      inLanguage: 'en-IN',
      publisher: { '@id': `${SITE_URL}/#organization` },
    },
  ],
};

export function cleanSeoDescription(value: string, maxLength = 158) {
  const text = value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  if (text.length <= maxLength) return text;
  const clipped = text.slice(0, maxLength - 1);
  const lastSpace = clipped.lastIndexOf(' ');
  return `${clipped.slice(0, lastSpace > 90 ? lastSpace : clipped.length).trimEnd()}…`;
}

export function trekSeo(trek: Trek): SeoMetadata {
  const path = `/trek/${trek.slug}`;
  const description = cleanSeoDescription(
    `${trek.title} in ${trek.location}. ${trek.duration}, ${trek.difficulty.toLowerCase()} trip from Bengaluru, from ₹${trek.currentPrice.toLocaleString('en-IN')}. ${trek.description}`,
  );
  return {
    title: `${trek.title} from Bengaluru | Itinerary & Price | Adventure Chaarana`,
    description,
    path,
    image: trek.image || DEFAULT_SOCIAL_IMAGE,
    schema: [
      organizationSchema,
      {
        '@context': 'https://schema.org',
        '@type': 'TouristTrip',
        name: trek.title,
        description,
        url: `${SITE_URL}${path}`,
        image: trek.gallery?.length ? [trek.image, ...trek.gallery] : trek.image,
        touristType: 'Trekking and outdoor adventure',
        provider: { '@id': `${SITE_URL}/#organization` },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Treks', item: `${SITE_URL}/#treks-section` },
          { '@type': 'ListItem', position: 3, name: trek.title, item: `${SITE_URL}${path}` },
        ],
      },
    ],
  };
}

export function serializeJsonLd(value: SeoMetadata['schema']) {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
