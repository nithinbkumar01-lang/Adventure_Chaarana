import express from 'express';
import { db, FieldValue, isFirestoreConfigured } from './firestore';
import contentRouter from './routes/content';
import adminRouter from './routes/admin';
import bookingRouter from './routes/bookings';

const app = express();
app.use(express.json({ limit: '1mb' }));
app.use('/api', contentRouter);
app.use('/api/v1', contentRouter);
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1', bookingRouter);

app.get('/api/v1/health', async (_req, res) => {
  let firestore = 'not_configured';
  if (isFirestoreConfigured()) {
    let timeout: ReturnType<typeof setTimeout> | undefined;
    try {
      await Promise.race([
        db.collection('treks').limit(1).get(),
        new Promise<never>((_, reject) => {
          timeout = setTimeout(() => reject(new Error('Firestore health check timed out')), 2_000);
        }),
      ]);
      firestore = 'connected';
    } catch {
      firestore = 'unavailable';
    } finally {
      if (timeout) clearTimeout(timeout);
    }
  }
  res.json({ status: 'ok', firestore, database: firestore });
});

app.post('/api/waitlist', async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone || typeof phone !== 'string' || phone.trim().length < 10) {
      return res.status(400).json({ error: 'Valid 10-digit phone number is required' });
    }

    const docRef = await db.collection('waitlist').add({
      phoneNumber: phone.trim(),
      createdAt: FieldValue.serverTimestamp(),
      source: 'website',
    });
    console.log(`[Server] Waitlist entry saved with ID: ${docRef.id}`);
    return res.status(200).json({ success: true, id: docRef.id });
  } catch (error) {
    console.error('[Server] Firestore waitlist error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return res.status(500).json({ error: message || 'Failed to save to database' });
  }
});

export default app;
