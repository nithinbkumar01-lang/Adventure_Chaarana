export interface ItineraryItem {
  time: string;
  activity: string;
}

export interface ItineraryDay {
  label: string;
  emoji: string;
  items: ItineraryItem[];
}

export interface Trek {
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
  difficulty: 'Easy' | 'Moderate' | 'Difficult' | 'Moderate - Difficult';
  elevation?: string;
  distance?: string;
  minAge?: string;
  timeHours?: string;
  modeRating?: string;
  permitNotice?: string;
  withoutTransportPrice?: number;
  itineraryPdf?: string;
  itinerary: ItineraryDay[];
  inclusions: string[];
  exclusions: string[];
  thingsToCarry: string[];
  gallery?: string[];
  placesCovered?: string[];
}

export interface CommunityImage {
  url: string;
  caption: string;
}
