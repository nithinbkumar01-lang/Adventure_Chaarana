import 'dotenv/config';
import { treks } from '../data/treks.js';
import { communityImages } from '../data/communityImages.js';
import { db, Timestamp } from '../firestore.js';

const homepageSections = [
  ['hero', 'Adventure Awaits!!', { backgroundImageUrl: 'https://res.cloudinary.com/dofg6bsom/image/upload/v1777477957/Background_tdfgts.png', primaryCtaLabel: 'Search', primaryCtaTarget: 'treks-section' }],
  ['trust_stats', 'Adventure Community', { stats: [{ value: '50+', label: 'Treks' }, { value: '10+', label: 'Regions' }, { value: '2000+', label: 'Trekkers' }] }],
  ['trek_search', 'Find your next trek', {}],
  ['trek_categories', 'Explore Treks by Category', { categories: ['all', 'sunrise', 'western-ghats', 'weekend'] }],
  ['trek_listing', 'Upcoming Treks', {}],
  ['community_gallery', 'Explorer Showcase Gallery', {}],
] as const;

try {
  const batch = db.batch();
  const now = Timestamp.now();

  for (const trek of treks) {
    const id = trek.id || trek.slug;
    batch.set(db.collection('treks').doc(id), {
      slug: trek.slug,
      title: trek.title,
      category: trek.category,
      status: 'published',
      content: { ...trek, id },
      updatedAt: now,
      createdAt: now,
      publishedAt: now,
    }, { merge: true });
  }

  communityImages.forEach((image, position) => {
    const id = Buffer.from(image.url).toString('base64url').slice(0, 120);
    batch.set(db.collection('communityGallery').doc(id), {
      ...image,
      position,
      isPublished: true,
      updatedAt: now,
    }, { merge: true });
  });

  batch.set(db.collection('homepage').doc('settings'), {
    pageTitle: 'Adventure Chaarana | Premium Trekking & Adventure Community in Bangalore',
    metaDescription: 'Explore the pure wild with Adventure Chaarana. Discover sunrise treks, weekend getaways, and Western Ghats expeditions from Bangalore.',
    heroHeading: 'Adventure Awaits!!',
    heroSubheading: 'Explore treks and weekend escapes with Adventure Chaarana.',
    updatedAt: now,
  }, { merge: true });

  homepageSections.forEach(([sectionKey, title, settings], index) => {
    batch.set(db.collection('homepageSections').doc(sectionKey), {
      title,
      position: index + 1,
      settings,
      isEnabled: true,
      updatedAt: now,
    }, { merge: true });
  });

  await batch.commit();
  console.log(`Imported ${treks.length} treks, ${communityImages.length} gallery images, and ${homepageSections.length} homepage sections to Firestore.`);
} finally {
  await db.terminate();
}
