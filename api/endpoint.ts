import type { Request, Response } from 'express';
import { communityImages } from '../server/data/communityImages.js';
import { treks } from '../server/data/treks.js';

async function withFirestoreTimeout<T>(query: Promise<T>) {
  let timeout: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([
      query,
      new Promise<never>((_, reject) => {
        timeout = setTimeout(() => reject(new Error('Firestore request timed out')), 2_000);
      }),
    ]);
  } finally {
    if (timeout) clearTimeout(timeout);
  }
}

function serveFallback(method: string, res: Response, apiPath: string, searchParams: URLSearchParams) {
  const category = searchParams.get('category');
  const query = (searchParams.get('q') ?? '').trim().toLowerCase();

  if (method === 'GET' && apiPath === '/api/treks') {
    const rows = treks.filter((trek) => (!category || trek.category === category)
      && (!query || trek.title.toLowerCase().includes(query) || trek.location.toLowerCase().includes(query)));
    return res.json(rows);
  }
  if (method === 'GET' && apiPath === '/api/community-images') return res.json(communityImages);

  const trekMatch = apiPath.match(/^\/api\/treks\/([^/]+)$/);
  if (method === 'GET' && trekMatch) {
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

async function readPublicContent(req: Request, res: Response, apiPath: string, searchParams: URLSearchParams) {
  const method = req.method ?? 'GET';
  if (method !== 'GET') return false;
  const trekDetail = /^\/api\/treks\/[^/]+$/.test(apiPath);
  if (apiPath !== '/api/treks' && !trekDetail && apiPath !== '/api/community-images' && apiPath !== '/api/v1/health') return false;

  if (apiPath === '/api/v1/health') {
    try {
      if (!process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
        return res.json({ status: 'ok', firestore: 'not_configured', database: 'not_configured' });
      }
      const { db } = await import('../server/firestore.js');
      await withFirestoreTimeout(db.collection('treks').limit(1).get());
      return res.json({ status: 'ok', firestore: 'connected', database: 'connected' });
    } catch {
      return res.json({ status: 'ok', firestore: 'unavailable', database: 'unavailable' });
    }
  }

  if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
    try {
      const { db } = await import('../server/firestore.js');
      if (apiPath === '/api/treks') {
        const snapshot = await withFirestoreTimeout(db.collection('treks').where('status', '==', 'published').get());
        const category = searchParams.get('category');
        const query = (searchParams.get('q') ?? '').trim().toLowerCase();
        const rows = snapshot.docs.map((document) => {
          const data = document.data();
          return { ...(data.content ?? {}), id: document.id, slug: data.slug };
        }).filter((trek) => (!category || trek.category === category)
          && (!query || String(trek.title ?? '').toLowerCase().includes(query)
            || String(trek.location ?? '').toLowerCase().includes(query)))
          .sort((a, b) => String(a.title ?? '').localeCompare(String(b.title ?? '')));
        if (rows.length || category || query) return res.json(rows);
      }

      if (apiPath === '/api/community-images') {
        const snapshot = await withFirestoreTimeout(db.collection('communityGallery').where('isPublished', '==', true).get());
        const rows = snapshot.docs.map((document) => document.data())
          .sort((a, b) => Number(a.position ?? 0) - Number(b.position ?? 0))
          .map((item) => ({ url: item.url, caption: item.caption ?? '' }));
        if (rows.length) return res.json(rows);
      }

      const trekMatch = apiPath.match(/^\/api\/treks\/([^/]+)$/);
      if (trekMatch) {
        const snapshot = await withFirestoreTimeout(db.collection('treks')
          .where('slug', '==', decodeURIComponent(trekMatch[1]))
          .where('status', '==', 'published')
          .limit(1)
          .get());
        if (!snapshot.empty) {
          const document = snapshot.docs[0];
          const data = document.data();
          return res.json({ ...(data.content ?? {}), id: document.id, slug: data.slug });
        }
      }
    } catch {
      console.error('[api] Firestore read failed; serving bundled public content.');
    }
  }

  serveFallback(method, res, apiPath, searchParams);
  return true;
}

/**
 * Vercel routes rewrites to this stable, single-segment function. Restore the
 * original API path before passing the request to the shared Express app.
 */
export default async function handler(req: Request, res: Response) {
  const requestUrl = new URL(req.url ?? '/', 'https://api.local');
  const requestedPath = requestUrl.searchParams.get('__path');
  if (!requestedPath?.startsWith('/api/')) {
    res.status(400).json({ error: { code: 'INVALID_API_PATH', message: 'The API path is invalid.' } });
    return;
  }

  const query = new URLSearchParams(requestUrl.searchParams);
  query.delete('__path');

  const search = query.toString();
  req.url = `${requestedPath}${search ? `?${search}` : ''}`;
  const handled = await readPublicContent(req, res, requestedPath, query);
  if (handled) return;

  try {
    const { default: app } = await import('../server/app.js');
    return app(req, res);
  } catch {
    console.error('[api] Backend initialization failed; serving bundled public content where available.');
    return serveFallback(req.method ?? 'GET', res, requestedPath, query);
  }
}
