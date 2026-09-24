import { createHash, randomBytes } from 'node:crypto';
import { Router } from 'express';
import type { Response } from 'express';
import { db, Timestamp } from '../firestore.js';
import { requireFirestore } from '../middleware/requireFirestore.js';

const bookingRouter = Router();

function handleError(error: unknown, res: Response) {
  const candidate = error as { status?: number; code?: string };
  res.status(candidate.status ?? 500).json({
    error: {
      code: candidate.code ?? 'INTERNAL_ERROR',
      message: candidate.status ? 'The booking request could not be completed.' : 'The server could not complete the request.',
    },
  });
}

function isActiveReservation(reservation: FirebaseFirestore.DocumentData, now: number) {
  return reservation.status === 'confirmed'
    || (reservation.status === 'held' && Number(reservation.expiresAt?.toMillis?.() ?? 0) > now);
}

bookingRouter.post('/booking-holds', requireFirestore, async (req, res) => {
  const idempotencyKey = req.header('Idempotency-Key');
  const { departureId, pricingOptionId, pickupPointId, primaryCustomer, participants } = req.body as {
    departureId?: string;
    pricingOptionId?: string;
    pickupPointId?: string;
    primaryCustomer?: { fullName?: string; phone?: string; email?: string };
    participants?: Array<{ fullName?: string; age?: number; gender?: string; phone?: string }>;
  };

  if (!idempotencyKey || idempotencyKey.length < 12 || idempotencyKey.length > 128) {
    res.status(400).json({ error: { code: 'INVALID_IDEMPOTENCY_KEY', message: 'Send a unique Idempotency-Key header (12–128 characters).' } });
    return;
  }
  if (!departureId || !pricingOptionId || !primaryCustomer?.fullName?.trim() || !primaryCustomer.phone?.trim()
      || !participants?.length || participants.length > 25 || participants.some((person) => !person.fullName?.trim())) {
    res.status(400).json({ error: { code: 'INVALID_BOOKING', message: 'A departure, pricing option, primary customer, and 1–25 participant names are required.' } });
    return;
  }

  const departureRef = db.collection('departures').doc(departureId);
  const idempotencyId = createHash('sha256').update(idempotencyKey).digest('hex');
  const idempotencyRef = db.collection('bookingIdempotency').doc(idempotencyId);
  const bookingCode = `AC-${randomBytes(6).toString('hex').toUpperCase()}`;
  const bookingRef = db.collection('bookings').doc(bookingCode);
  const reservationRef = departureRef.collection('seatReservations').doc(bookingCode);
  const now = Timestamp.now();
  const expiresAt = Timestamp.fromMillis(now.toMillis() + 15 * 60 * 1000);
  const seatCount = participants.length;

  try {
    const result = await db.runTransaction(async (transaction) => {
      const [prior, departureDocument, reservations] = await Promise.all([
        transaction.get(idempotencyRef),
        transaction.get(departureRef),
        transaction.get(departureRef.collection('seatReservations')),
      ]);

      if (prior.exists) {
        const existingBooking = await transaction.get(db.collection('bookings').doc(String(prior.get('bookingCode'))));
        if (!existingBooking.exists) throw Object.assign(new Error('Idempotent booking record is incomplete.'), { status: 409, code: 'BOOKING_CONFLICT' });
        const existing = existingBooking.data()!;
        return {
          created: false,
          bookingCode: existing.bookingCode,
          amountMinor: existing.totalMinor,
          currency: existing.currency,
          holdExpiresAt: existing.holdExpiresAt,
          status: existing.status,
        };
      }

      const departure = departureDocument.data();
      if (!departureDocument.exists || departure.status !== 'open' || departure.startsAt.toMillis() <= now.toMillis()) {
        throw Object.assign(new Error('This departure is not open for booking.'), { status: 409, code: 'DEPARTURE_UNAVAILABLE' });
      }
      const pricing = (departure.pricingOptions ?? []).find((option: { id?: string; code?: string }) => option.id === pricingOptionId || option.code === pricingOptionId);
      if (!pricing || !Number.isInteger(pricing.priceMinor) || pricing.priceMinor < 0) {
        throw Object.assign(new Error('The selected price is not available for this departure.'), { status: 400, code: 'INVALID_PRICING_OPTION' });
      }
      const pickup = pickupPointId
        ? (departure.pickupPoints ?? []).find((point: { id?: string }) => point.id === pickupPointId)
        : null;
      if (pickupPointId && !pickup) {
        throw Object.assign(new Error('Pickup is not available for this departure.'), { status: 400, code: 'INVALID_PICKUP' });
      }

      const activeReservations = reservations.docs.filter((document) => isActiveReservation(document.data(), now.toMillis()));
      const currentSeats = activeReservations.reduce((sum, document) => sum + Number(document.get('seatCount') ?? 0), 0);
      if (currentSeats + seatCount > Number(departure.seatCapacity)) {
        throw Object.assign(new Error('Not enough seats remain.'), { status: 409, code: 'INSUFFICIENT_SEATS' });
      }
      if (pickup?.capacity != null) {
        const pickupSeats = activeReservations
          .filter((document) => document.get('pickupPointId') === pickupPointId)
          .reduce((sum, document) => sum + Number(document.get('seatCount') ?? 0), 0);
        if (pickupSeats + seatCount > Number(pickup.capacity)) {
          throw Object.assign(new Error('Not enough seats remain at this pickup point.'), { status: 409, code: 'PICKUP_FULL' });
        }
      }

      const customer = {
        fullName: primaryCustomer.fullName.trim(),
        phone: primaryCustomer.phone.trim(),
        email: primaryCustomer.email?.trim() || null,
      };
      const booking = {
        bookingCode,
        departureId,
        departureStartsAt: departure.startsAt,
        trekId: departure.trekId,
        trekSlug: departure.trekSlug,
        trekTitle: departure.trekTitle,
        pickupPointId: pickupPointId ?? null,
        pickupName: pickup?.name ?? null,
        pricingOptionId: pricing.id,
        participantCount: seatCount,
        participants: participants.map((person) => ({
          fullName: person.fullName!.trim(),
          age: person.age ?? null,
          gender: person.gender ?? null,
          phone: person.phone?.trim() || null,
        })),
        customer,
        status: 'payment_pending',
        reservationStatus: 'held',
        totalMinor: pricing.priceMinor * seatCount,
        currency: pricing.currency ?? 'INR',
        idempotencyKeyHash: idempotencyId,
        holdExpiresAt: expiresAt,
        createdAt: now,
        updatedAt: now,
      };

      for (const expired of reservations.docs) {
        if (expired.get('status') === 'held' && !isActiveReservation(expired.data(), now.toMillis())) {
          transaction.update(expired.ref, { status: 'expired', updatedAt: now });
        }
      }
      transaction.create(bookingRef, booking);
      transaction.create(reservationRef, {
        bookingCode,
        departureId,
        pickupPointId: pickupPointId ?? null,
        seatCount,
        status: 'held',
        expiresAt,
        createdAt: now,
        updatedAt: now,
      });
      transaction.create(idempotencyRef, { bookingCode, createdAt: now });
      transaction.update(departureRef, { reservedSeats: currentSeats + seatCount, updatedAt: now });

      return {
        created: true,
        bookingCode,
        amountMinor: booking.totalMinor,
        currency: booking.currency,
        holdExpiresAt: expiresAt,
        status: booking.status,
      };
    });

    res.status(result.created ? 201 : 200).json({
      bookingCode: result.bookingCode,
      amountMinor: result.amountMinor,
      currency: result.currency,
      holdExpiresAt: result.holdExpiresAt.toDate().toISOString(),
      status: result.status,
    });
  } catch (error) {
    handleError(error, res);
  }
});

bookingRouter.post('/bookings/:bookingCode/payment-session', requireFirestore, async (_req, res) => {
  res.status(501).json({ error: { code: 'PAYMENT_PROVIDER_NOT_CONFIGURED', message: 'Online payments are not configured yet.' } });
});

export default bookingRouter;
