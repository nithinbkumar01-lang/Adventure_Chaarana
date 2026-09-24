import type { RequestHandler } from 'express';
import { isFirestoreConfigured } from '../firestore.js';

export const requireFirestore: RequestHandler = (_req, res, next) => {
  if (!isFirestoreConfigured()) {
    res.status(503).json({
      error: {
        code: 'FIRESTORE_NOT_CONFIGURED',
        message: 'Set GOOGLE_APPLICATION_CREDENTIALS to a Firebase service-account JSON file, or configure Google Application Default Credentials.',
      },
    });
    return;
  }
  next();
};
