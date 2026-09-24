import type { Request, Response } from 'express';
import app from '../server/app';

/**
 * Vercel routes rewrites to this stable, single-segment function. Restore the
 * original API path before passing the request to the shared Express app.
 */
export default function handler(req: Request, res: Response) {
  const requestedPath = req.query.__path;
  if (typeof requestedPath !== 'string' || !requestedPath.startsWith('/api/')) {
    res.status(400).json({ error: { code: 'INVALID_API_PATH', message: 'The API path is invalid.' } });
    return;
  }

  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(req.query)) {
    if (key === '__path') continue;
    if (typeof value === 'string') query.append(key, value);
    else if (Array.isArray(value)) {
      for (const item of value) {
        if (typeof item === 'string') query.append(key, item);
      }
    }
  }

  const search = query.toString();
  req.url = `${requestedPath}${search ? `?${search}` : ''}`;
  return app(req, res);
}
