import type { RequestHandler } from 'express';
import { getAuth } from 'firebase-admin/auth';
import '../firestore.js';

const adminEmails = () => (process.env.ADMIN_EMAILS ?? process.env.ADMIN_EMAIL ?? '')
  .split(',')
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean);

export const requireAdmin: RequestHandler = async (req, res, next) => {
  const allowedEmails = adminEmails();
  if (!allowedEmails.length) {
    res.status(503).json({ error: { code: 'ADMIN_AUTH_NOT_CONFIGURED', message: 'Set ADMIN_EMAILS to enable admin access.' } });
    return;
  }

  const authorization = req.header('authorization') ?? '';
  const idToken = authorization.startsWith('Bearer ') ? authorization.slice(7) : '';
  if (!idToken) {
    res.status(401).json({ error: { code: 'UNAUTHORIZED', message: 'Sign in with your admin email and password.' } });
    return;
  }

  try {
    const decodedToken = await getAuth().verifyIdToken(idToken);
    const email = decodedToken.email?.trim().toLowerCase();
    if (!email || !decodedToken.email_verified) {
      res.status(403).json({ error: { code: 'ADMIN_EMAIL_NOT_VERIFIED', message: 'Verify your admin email before signing in.' } });
      return;
    }
    if (!allowedEmails.includes(email)) {
      res.status(403).json({ error: { code: 'ADMIN_ACCESS_DENIED', message: 'This account is not allowed to access the admin panel.' } });
      return;
    }
    next();
  } catch {
    res.status(401).json({ error: { code: 'UNAUTHORIZED', message: 'Your sign-in session is invalid or expired. Please sign in again.' } });
  }
};
