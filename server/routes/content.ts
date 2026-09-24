import { Router } from 'express';
import type { DocumentData, QueryDocumentSnapshot } from 'firebase-admin/firestore';
import { communityImages as fallbackImages } from '../data/communityImages';
import { treks as fallbackTreks } from '../data/treks';
import { db, isFirestoreConfigured, serializeTimestamp } from '../firestore';

const contentRouter = Router();
const FIRESTORE_CONTENT_TIMEOUT_MS = 2_000;
const FIRESTORE_RETRY_DELAY_MS = 15_000;
let retryFirestoreContentAfter = 0;

async function readFirestoreContent<T>(read: () => Promise<T>): Promise<T | null> {
  if (Date.now() < retryFirestoreContentAfter) return null;

  let timeout: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([
      read(),
      new Promise<never>((_, reject) => {
        timeout = setTimeout(() => reject(new Error('Firestore content request timed out')), FIRESTORE_CONTENT_TIMEOUT_MS);
      }),
    ]);
  } catch (error) {
    retryFirestoreContentAfter = Date.now() + FIRESTORE_RETRY_DELAY_MS;
    const reason = error instanceof Error ? error.message : 'Unknown Firestore error';
    console.warn(`[content] Firestore unavailable (${reason}); serving fallback content temporarily.`);
    return null;
  } finally {
    if (timeout) clearTimeout(timeout);
  }
}

function readTrek(document: QueryDocumentSnapshot<DocumentData>) {
  const data = document.data();
  return { ...(data.content ?? {}), id: document.id, slug: data.slug };
}

function reservationIsActive(reservation: DocumentData, now: number) {
  if (reservation.status === 'confirmed') return true;
  return reservation.status === 'held' && reservation.expiresAt?.toMillis?.() > now;
}

async function reservedSeats(departureId: string) {
  const reservations = await db.collection('departures').doc(departureId).collection('seatReservations').get();
  const now = Date.now();
  return reservations.docs.reduce((sum, doc) => {
    const reservation = doc.data();
    return reservationIsActive(reservation, now) ? sum + Number(reservation.seatCount ?? 0) : sum;
  }, 0);
}

contentRouter.get('/homepage', async (_req, res, next) => {
  try {
    if (!isFirestoreConfigured()) {
      return res.json({
        settings: { pageTitle: 'Adventure Chaarana | Premium Trekking & Adventure Community in Bangalore', heroHeading: 'Adventure Awaits!!' },
        sections: [
          { sectionKey: 'hero', title: 'Adventure Awaits!!', position: 1, settings: {} },
          { sectionKey: 'trust_stats', title: 'Adventure Community', position: 2, settings: {} },
          { sectionKey: 'trek_search', title: 'Find your next trek', position: 3, settings: {} },
          { sectionKey: 'trek_categories', title: 'Explore Treks by Category', position: 4, settings: {} },
          { sectionKey: 'trek_listing', title: 'Upcoming Treks', position: 5, settings: {} },
          { sectionKey: 'community_gallery', title: 'Explorer Showcase Gallery', position: 6, settings: {} },
        ],
      });
    }
    const homepage = await db.collection('homepage').doc('settings').get();
    const sections = await db.collection('homepageSections').where('isEnabled', '==', true).get();
    const treks = await db.collection('treks').where('status', '==', 'published').get();
    const sectionRows: Array<DocumentData & { sectionKey: string }> = sections.docs
      .map((document): DocumentData & { sectionKey: string } => ({ ...document.data(), sectionKey: document.id }))
      .sort((a, b) => Number(a.position ?? 0) - Number(b.position ?? 0));
    const trekSlots = treks.docs.flatMap((document) => {
      const data = document.data();
      return (data.homepageSections ?? []).map((sectionKey: string, position: number) => ({
        section_key: sectionKey,
        position,
        website_content: data.content,
      }));
    });

    return res.json({
      settings: homepage.exists ? homepage.data() : {
        pageTitle: 'Adventure Chaarana | Premium Trekking & Adventure Community in Bangalore',
        heroHeading: 'Adventure Awaits!!',
      },
      sections: sectionRows.length ? sectionRows : [
        { sectionKey: 'hero', title: 'Adventure Awaits!!', position: 1, settings: {} },
        { sectionKey: 'trust_stats', title: 'Adventure Community', position: 2, settings: {} },
        { sectionKey: 'trek_search', title: 'Find your next trek', position: 3, settings: {} },
        { sectionKey: 'trek_categories', title: 'Explore Treks by Category', position: 4, settings: {} },
        { sectionKey: 'trek_listing', title: 'Upcoming Treks', position: 5, settings: {} },
        { sectionKey: 'community_gallery', title: 'Explorer Showcase Gallery', position: 6, settings: {} },
      ],
      trekSlots,
    });
  } catch (error) {
    return next(error);
  }
});

contentRouter.get('/treks', async (req, res, next) => {
  try {
    if (!isFirestoreConfigured()) {
      const category = typeof req.query.category === 'string' ? req.query.category : null;
      const query = typeof req.query.q === 'string' ? req.query.q.trim().toLowerCase() : '';
      return res.json(fallbackTreks.filter((trek) => (!category || trek.category === category)
        && (!query || trek.title.toLowerCase().includes(query) || trek.location.toLowerCase().includes(query))));
    }
    const snapshot = await readFirestoreContent(() => db.collection('treks').where('status', '==', 'published').get());
    if (!snapshot) {
      const category = typeof req.query.category === 'string' ? req.query.category : null;
      const query = typeof req.query.q === 'string' ? req.query.q.trim().toLowerCase() : '';
      return res.json(fallbackTreks.filter((trek) => (!category || trek.category === category)
        && (!query || trek.title.toLowerCase().includes(query) || trek.location.toLowerCase().includes(query))));
    }
    const category = typeof req.query.category === 'string' ? req.query.category : null;
    const query = typeof req.query.q === 'string' ? req.query.q.trim().toLowerCase() : '';
    const result = snapshot.docs.map(readTrek)
      .filter((trek) => (!category || trek.category === category)
        && (!query || trek.title.toLowerCase().includes(query) || trek.location.toLowerCase().includes(query)))
      .sort((a, b) => a.title.localeCompare(b.title));
    return res.json(result.length ? result : (category || query ? [] : fallbackTreks));
  } catch (error) {
    return next(error);
  }
});

contentRouter.get('/treks/:slug', async (req, res, next) => {
  try {
    if (!isFirestoreConfigured()) {
      const fallback = fallbackTreks.find((trek) => trek.slug === req.params.slug);
      return fallback ? res.json(fallback) : res.status(404).json({ error: 'Trek not found' });
    }
    const result = await db.collection('treks').where('slug', '==', req.params.slug).where('status', '==', 'published').limit(1).get();
    if (result.empty) {
      const fallback = fallbackTreks.find((trek) => trek.slug === req.params.slug);
      return fallback ? res.json(fallback) : res.status(404).json({ error: 'Trek not found' });
    }
    return res.json(readTrek(result.docs[0]));
  } catch (error) {
    return next(error);
  }
});

contentRouter.get('/treks/:slug/departures', async (req, res, next) => {
  try {
    if (!isFirestoreConfigured()) return res.status(503).json({ error: { code: 'FIRESTORE_NOT_CONFIGURED', message: 'Departure dates are not configured yet.' } });
    const trek = await db.collection('treks').where('slug', '==', req.params.slug).where('status', '==', 'published').limit(1).get();
    if (trek.empty) return res.status(404).json({ error: 'Trek not found' });
    const snapshot = await db.collection('departures').where('trekSlug', '==', req.params.slug).get();
    const from = typeof req.query.from === 'string' ? Date.parse(req.query.from) : Number.NEGATIVE_INFINITY;
    const to = typeof req.query.to === 'string' ? Date.parse(req.query.to) : Number.POSITIVE_INFINITY;
    const candidates: Array<DocumentData & { id: string }> = snapshot.docs.map((document): DocumentData & { id: string } => ({ ...document.data(), id: document.id }))
      .filter((departure) => ['open', 'sold_out'].includes(String(departure.status))
        && Date.parse(serializeTimestamp(departure.startsAt) ?? '') >= from
        && Date.parse(serializeTimestamp(departure.startsAt) ?? '') < to)
      .sort((a, b) => Date.parse(serializeTimestamp(a.startsAt) ?? '') - Date.parse(serializeTimestamp(b.startsAt) ?? ''))
      .slice(0, 100);
    const rows = await Promise.all(candidates.map(async (departure) => {
      const reserved = await reservedSeats(departure.id);
      return {
        id: departure.id,
        starts_at: serializeTimestamp(departure.startsAt),
        ends_at: serializeTimestamp(departure.endsAt),
        timezone: departure.timezone ?? 'Asia/Kolkata',
        seat_capacity: departure.seatCapacity,
        status: departure.status,
        reserved_seats: reserved,
        remaining_seats: Math.max(0, Number(departure.seatCapacity) - reserved),
        pricing_options: departure.pricingOptions ?? [],
        pickup_points: departure.pickupPoints ?? [],
      };
    }));
    return res.json(rows);
  } catch (error) {
    return next(error);
  }
});

contentRouter.get('/departures/:id', async (req, res, next) => {
  try {
    if (!isFirestoreConfigured()) return res.status(404).json({ error: 'Departure not found' });
    const document = await db.collection('departures').doc(req.params.id).get();
    if (!document.exists) return res.status(404).json({ error: 'Departure not found' });
    const departure = document.data()!;
    if (!['open', 'sold_out'].includes(departure.status)) return res.status(404).json({ error: 'Departure not found' });
    const trek = await db.collection('treks').where('slug', '==', departure.trekSlug).where('status', '==', 'published').limit(1).get();
    if (trek.empty) return res.status(404).json({ error: 'Departure not found' });
    const reserved = await reservedSeats(document.id);
    return res.json({
      id: document.id,
      trek_id: departure.trekId,
      trek_slug: departure.trekSlug,
      trek_title: departure.trekTitle,
      starts_at: serializeTimestamp(departure.startsAt),
      ends_at: serializeTimestamp(departure.endsAt),
      timezone: departure.timezone ?? 'Asia/Kolkata',
      seat_capacity: departure.seatCapacity,
      status: departure.status,
      reserved_seats: reserved,
      remaining_seats: Math.max(0, Number(departure.seatCapacity) - reserved),
    });
  } catch (error) {
    return next(error);
  }
});

contentRouter.get('/community-images', async (_req, res, next) => {
  try {
    if (!isFirestoreConfigured()) return res.json(fallbackImages);
    const result = await readFirestoreContent(() => db.collection('communityGallery').where('isPublished', '==', true).get());
    if (!result) return res.json(fallbackImages);
    const items = result.docs.map((document) => document.data())
      .sort((a, b) => Number(a.position ?? 0) - Number(b.position ?? 0))
      .map((item) => ({ url: item.url, caption: item.caption ?? '' }));
    return res.json(items.length ? items : fallbackImages);
  } catch (error) {
    return next(error);
  }
});

export default contentRouter;
