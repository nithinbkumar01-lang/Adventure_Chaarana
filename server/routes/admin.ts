import { randomUUID } from 'node:crypto';
import { Router } from 'express';
import type { Response } from 'express';
import type { Trek } from '../../shared/types/trek';
import { db, Timestamp, serializeTimestamp } from '../firestore.js';
import { treks as websiteTreks } from '../data/treks.js';
import { requireAdmin } from '../middleware/adminAuth.js';
import { requireFirestore } from '../middleware/requireFirestore.js';

const adminRouter = Router();
const ADMIN_TREK_READ_TIMEOUT_MS = 2_000;
const ADMIN_TREK_RETRY_DELAY_MS = 15_000;
let retryAdminTrekReadAfter = 0;
adminRouter.use(requireAdmin);

function handleError(error: unknown, res: Response) {
  const candidate = error as { status?: number; code?: string };
  const status = candidate.status ?? 500;
  res.status(status).json({
    error: {
      code: candidate.code ?? 'INTERNAL_ERROR',
      message: status === 500 ? 'The server could not complete the request. Check Firestore credentials and server logs.' : 'The request could not be completed.',
    },
  });
}

function readTrek(value: unknown): Trek | null {
  if (!value || typeof value !== 'object') return null;
  const item = value as Partial<Trek>;
  if (typeof item.title !== 'string' || !item.title.trim()) return null;
  if (typeof item.slug !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.slug)) return null;
  if (typeof item.currentPrice !== 'number' || item.currentPrice < 0) return null;
  if (typeof item.location !== 'string' || typeof item.description !== 'string') return null;
  return item as Trek;
}

function isActiveReservation(data: FirebaseFirestore.DocumentData, now: number) {
  return data.status === 'confirmed'
    || (data.status === 'held' && Number(data.expiresAt?.toMillis?.() ?? 0) > now);
}

async function reservationSummary(departureId: string) {
  const snapshot = await db.collection('departures').doc(departureId).collection('seatReservations').get();
  const now = Date.now();
  return snapshot.docs.reduce((sum, document) => {
    const data = document.data();
    return isActiveReservation(data, now) ? sum + Number(data.seatCount ?? 0) : sum;
  }, 0);
}

adminRouter.post('/auth/verify', (_req, res) => res.json({ authenticated: true, role: 'owner' }));
adminRouter.use(requireFirestore);

adminRouter.get('/dashboard', async (_req, res) => {
  try {
    const [treksSnapshot, publishedSnapshot, upcomingSnapshot, bookingsSnapshot, pendingSnapshot] = await Promise.all([
      db.collection('treks').count().get(),
      db.collection('treks').where('status', '==', 'published').count().get(),
      db.collection('departures').where('status', 'in', ['open', 'sold_out']).where('startsAt', '>=', Timestamp.now()).count().get(),
      db.collection('bookings').count().get(),
      db.collection('bookings').where('status', '==', 'payment_pending').count().get(),
    ]);
    res.json({
      treks: { total: treksSnapshot.data().count, published: publishedSnapshot.data().count },
      departures: { upcoming: upcomingSnapshot.data().count },
      bookings: { total: bookingsSnapshot.data().count, payment_pending: pendingSnapshot.data().count },
      pendingPayments: pendingSnapshot.data().count,
    });
  } catch (error) {
    handleError(error, res);
  }
});

adminRouter.get('/treks', async (_req, res) => {
  const trekRows = new Map<string, {
    id: string;
    slug: string;
    status: 'draft' | 'published' | 'archived';
    updated_at: string | null;
    category_name: string;
    website_content: Trek;
  }>(websiteTreks.map((trek) => {
    const id = trek.id || trek.slug;
    return [id, {
      id,
      slug: trek.slug,
      status: 'published' as const,
      updated_at: null,
      category_name: String(trek.category ?? '').replaceAll('-', ' '),
      website_content: { ...trek, id, slug: trek.slug },
    }];
  }));
  const websiteRows = () => [...trekRows.values()].sort((a, b) => (b.updated_at ?? '').localeCompare(a.updated_at ?? ''));

  if (Date.now() < retryAdminTrekReadAfter) {
    res.json(websiteRows());
    return;
  }

  let timeout: ReturnType<typeof setTimeout> | undefined;
  try {
    const result = await Promise.race([
      db.collection('treks').get(),
      new Promise<never>((_, reject) => {
        timeout = setTimeout(() => reject(new Error('Firestore trek list request timed out')), ADMIN_TREK_READ_TIMEOUT_MS);
      }),
    ]);
    result.docs.forEach((document) => {
      const data = document.data();
      trekRows.set(document.id, {
        id: document.id,
        slug: data.slug,
        status: data.status,
        updated_at: serializeTimestamp(data.updatedAt),
        category_name: String(data.category ?? '').replaceAll('-', ' '),
        website_content: { ...(data.content ?? {}), id: document.id, slug: data.slug },
      });
    });
    res.json(websiteRows());
  } catch (error) {
    retryAdminTrekReadAfter = Date.now() + ADMIN_TREK_RETRY_DELAY_MS;
    console.warn('[admin] Could not read Firestore treks; returning website treks for editing.', error instanceof Error ? error.message : error);
    res.json(websiteRows());
  } finally {
    if (timeout) clearTimeout(timeout);
  }
});

async function saveTrek(trek: Trek, status: 'draft' | 'published', id: string = randomUUID()) {
  const ref = db.collection('treks').doc(id);
  const existing = await ref.get();
  const publishedAt = status === 'published'
    ? (existing.get('publishedAt') ?? Timestamp.now())
    : null;
  await ref.set({
    slug: trek.slug,
    title: trek.title,
    category: trek.category || 'uncategorized',
    status,
    content: { ...trek, id, slug: trek.slug },
    updatedAt: Timestamp.now(),
    createdAt: existing.get('createdAt') ?? Timestamp.now(),
    publishedAt,
  }, { merge: true });
  return id;
}

adminRouter.post('/treks', async (req, res) => {
  const trek = readTrek(req.body);
  if (!trek) {
    res.status(400).json({ error: { code: 'INVALID_TREK', message: 'A title, slug, location, description, and non-negative price are required.' } });
    return;
  }
  try {
    const status = req.body.status === 'published' ? 'published' : 'draft';
    const id = await saveTrek(trek, status);
    res.status(201).json({ id, slug: trek.slug, status });
  } catch (error) {
    handleError(error, res);
  }
});

adminRouter.put('/treks/:id', async (req, res) => {
  const trek = readTrek(req.body);
  if (!trek) {
    res.status(400).json({ error: { code: 'INVALID_TREK', message: 'The trek payload is invalid.' } });
    return;
  }
  try {
    const status = req.body.status === 'published' ? 'published' : 'draft';
    const id = await saveTrek(trek, status, req.params.id);
    res.json({ id, slug: trek.slug, status });
  } catch (error) {
    handleError(error, res);
  }
});

adminRouter.patch('/treks/:id/status', async (req, res) => {
  const status = req.body.status;
  if (!['draft', 'published', 'archived'].includes(status)) {
    res.status(400).json({ error: { code: 'INVALID_STATUS', message: 'Status must be draft, published, or archived.' } });
    return;
  }
  try {
    const ref = db.collection('treks').doc(req.params.id);
    const trek = await ref.get();
    if (!trek.exists) {
      const websiteTrek = websiteTreks.find((item) => (item.id || item.slug) === req.params.id);
      if (!websiteTrek) {
        res.status(404).json({ error: { code: 'TREK_NOT_FOUND', message: 'Trek not found.' } });
        return;
      }
      await saveTrek(websiteTrek, status, req.params.id);
    } else {
      await ref.update({ status, updatedAt: Timestamp.now(), publishedAt: status === 'published' ? (trek.get('publishedAt') ?? Timestamp.now()) : null });
    }
    res.json({ id: req.params.id, status });
  } catch (error) {
    handleError(error, res);
  }
});

adminRouter.get('/departures', async (req, res) => {
  try {
    let query: FirebaseFirestore.Query = db.collection('departures');
    if (typeof req.query.status === 'string') query = query.where('status', '==', req.query.status);
    const snapshot = await query.get();
    const rows = await Promise.all(snapshot.docs.map(async (document) => {
      const data = document.data();
      const reserved = await reservationSummary(document.id);
      return {
        id: document.id,
        trek_id: data.trekId,
        trek_title: data.trekTitle,
        starts_at: serializeTimestamp(data.startsAt),
        ends_at: serializeTimestamp(data.endsAt),
        seat_capacity: data.seatCapacity,
        reserved_seats: reserved,
        remaining_seats: Math.max(0, Number(data.seatCapacity) - reserved),
        status: data.status,
        operations_notes: data.operationsNotes ?? '',
      };
    }));
    res.json(rows.sort((a, b) => (b.starts_at ?? '').localeCompare(a.starts_at ?? '')).slice(0, 200));
  } catch (error) {
    handleError(error, res);
  }
});

adminRouter.get('/bookings', async (_req, res) => {
  try {
    const snapshot = await db.collection('bookings').orderBy('createdAt', 'desc').limit(200).get();
    res.json(snapshot.docs.map((document) => {
      const data = document.data();
      return {
        id: document.id,
        booking_code: data.bookingCode,
        status: data.status,
        participant_count: data.participantCount,
        total_minor: data.totalMinor,
        currency: data.currency,
        customer_name: data.customer?.fullName ?? '',
        customer_phone: data.customer?.phone ?? '',
        trek_title: data.trekTitle,
        starts_at: serializeTimestamp(data.startsAt),
        pickup_name: data.pickupName ?? null,
        reservation_status: data.reservationStatus,
        participants: data.participants ?? [],
        created_at: serializeTimestamp(data.createdAt),
      };
    }));
  } catch (error) {
    handleError(error, res);
  }
});

adminRouter.post('/departures', async (req, res) => {
  const { trekId, startsAt, endsAt, seatCapacity, pickupPointIds = [] } = req.body as {
    trekId?: string; startsAt?: string; endsAt?: string; seatCapacity?: number; pickupPointIds?: string[];
  };
  if (!trekId || !startsAt || !endsAt || !Number.isFinite(Date.parse(startsAt)) || !Number.isFinite(Date.parse(endsAt)) || !Number.isInteger(seatCapacity) || (seatCapacity ?? 0) < 1) {
    res.status(400).json({ error: { code: 'INVALID_DEPARTURE', message: 'trekId, valid start and end dates, and a positive seatCapacity are required.' } });
    return;
  }
  try {
    const trek = await db.collection('treks').doc(trekId).get();
    if (!trek.exists || trek.get('status') !== 'published') {
      res.status(404).json({ error: { code: 'TREK_NOT_FOUND', message: 'Published trek not found.' } });
      return;
    }
    const content = trek.get('content') as Trek & { pickupPoints?: Array<{ id?: string }> };
    const pickupPoints = (content.pickupPoints ?? [])
      .filter((point: { id?: string }) => pickupPointIds.includes(point.id ?? ''));
    const departure = {
      trekId,
      trekSlug: trek.get('slug'),
      trekTitle: trek.get('title'),
      startsAt: Timestamp.fromDate(new Date(startsAt)),
      endsAt: Timestamp.fromDate(new Date(endsAt)),
      timezone: 'Asia/Kolkata',
      seatCapacity,
      status: 'draft',
      reservedSeats: 0,
      pickupPoints,
      pricingOptions: [
        { id: `${trekId}-with-transport`, code: 'with-transport', name: 'With Transport', transportIncluded: true, priceMinor: Math.round(content.currentPrice * 100), originalPriceMinor: content.originalPrice > content.currentPrice ? Math.round(content.originalPrice * 100) : null },
        ...(content.withoutTransportPrice === undefined ? [] : [{ id: `${trekId}-self-travel`, code: 'self-travel', name: 'Self Travel', transportIncluded: false, priceMinor: Math.round(content.withoutTransportPrice * 100), originalPriceMinor: null }]),
      ],
      operationsNotes: '',
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    };
    const created = await db.collection('departures').add(departure);
    res.status(201).json({ id: created.id, ...departure, startsAt: startsAt, endsAt: endsAt });
  } catch (error) {
    handleError(error, res);
  }
});

adminRouter.patch('/departures/:id', async (req, res) => {
  const allowedStatuses = ['draft', 'open', 'sold_out', 'cancelled', 'completed'];
  const { startsAt, endsAt, seatCapacity, status, operationsNotes } = req.body as {
    startsAt?: string; endsAt?: string; seatCapacity?: number; status?: string; operationsNotes?: string;
  };
  if ((status !== undefined && !allowedStatuses.includes(status))
      || (seatCapacity !== undefined && (!Number.isInteger(seatCapacity) || seatCapacity < 1))) {
    res.status(400).json({ error: { code: 'INVALID_DEPARTURE', message: 'The supplied departure fields are invalid.' } });
    return;
  }
  try {
    const ref = db.collection('departures').doc(req.params.id);
    const document = await ref.get();
    if (!document.exists) {
      res.status(404).json({ error: { code: 'DEPARTURE_NOT_FOUND', message: 'Departure not found.' } });
      return;
    }
    const reserved = await reservationSummary(document.id);
    if (seatCapacity !== undefined && seatCapacity < reserved) {
      res.status(409).json({ error: { code: 'DEPARTURE_UPDATE_CONFLICT', message: 'Capacity cannot be lower than reserved seats.' } });
      return;
    }
    const update: Record<string, unknown> = { updatedAt: Timestamp.now() };
    if (startsAt !== undefined && Number.isFinite(Date.parse(startsAt))) update.startsAt = Timestamp.fromDate(new Date(startsAt));
    if (endsAt !== undefined && Number.isFinite(Date.parse(endsAt))) update.endsAt = Timestamp.fromDate(new Date(endsAt));
    if (seatCapacity !== undefined) update.seatCapacity = seatCapacity;
    if (status !== undefined) update.status = status;
    if (operationsNotes !== undefined) update.operationsNotes = operationsNotes;
    await ref.update(update);
    res.json({ id: document.id, ...document.data(), ...update });
  } catch (error) {
    handleError(error, res);
  }
});

export default adminRouter;
