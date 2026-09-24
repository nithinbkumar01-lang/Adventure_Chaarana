import type { Request, Response } from 'express';
import { communityImages } from '../server/data/communityImages';
import { treks } from '../server/data/treks';

function serveFallback(req: Request, res: Response, apiPath: string) {
  const category = typeof req.query.category === 'string' ? req.query.category : null;
  const query = typeof req.query.q === 'string' ? req.query.q.trim().toLowerCase() : '';

  if (req.method === 'GET' && apiPath === '/api/treks') {
    const rows = treks.filter((trek) => (!category || trek.category === category)
      && (!query || trek.title.toLowerCase().includes(query) || trek.location.toLowerCase().includes(query)));
    return res.json(rows);
  }
  if (req.method === 'GET' && apiPath === '/api/community-images') return res.json(communityImages);

  const trekMatch = apiPath.match(/^\/api\/treks\/([^/]+)$/);
  if (req.method === 'GET' && trekMatch) {
    const trek = treks.find((item) => item.slug === decodeURIComponent(trekMatch[1]));
    return trek ? res.json(trek) : res.status(404).json({ error: 'Trek not found' });
  }

  return res.status(503).json({
    error: {
      code: 'BACKEND_UNAVAILABLE',
      message: 'The backend is temporarily unavailable. Please try again shortly.',
    },
  });
}

/**
 * Vercel routes rewrites to this stable, single-segment function. Restore the
 * original API path before passing the request to the shared Express app.
 */
export default async function handler(req: Request, res: Response) {
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
  try {
    const { default: app } = await import('../server/app');
    await new Promise<void>((resolve, reject) => {
      const finish = () => {
        res.off('finish', finish);
        res.off('close', finish);
        resolve();
      };
      res.once('finish', finish);
      res.once('close', finish);
      try {
        app(req, res);
      } catch (error) {
        res.off('finish', finish);
        res.off('close', finish);
        reject(error);
      }
    });
  } catch {
    console.error('[api] Backend initialization failed; serving bundled public content where available.');
    return serveFallback(req, res, requestedPath);
  }
}
