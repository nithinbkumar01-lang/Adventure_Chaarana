import { timingSafeEqual } from 'node:crypto';
import type { RequestHandler } from 'express';

export const requireAdmin: RequestHandler = (req, res, next) => {
  const configuredToken = process.env.ADMIN_API_TOKEN;
  if (!configuredToken) {
    res.status(503).json({ error: { code: 'ADMIN_AUTH_NOT_CONFIGURED', message: 'Set ADMIN_API_TOKEN to enable admin access.' } });
    return;
  }

  const authorization = req.header('authorization') ?? '';
  const suppliedToken = authorization.startsWith('Bearer ') ? authorization.slice(7) : '';
  const expected = Buffer.from(configuredToken);
  const supplied = Buffer.from(suppliedToken);
  if (expected.length !== supplied.length || !timingSafeEqual(expected, supplied)) {
    res.status(401).json({ error: { code: 'UNAUTHORIZED', message: 'Admin token is invalid or missing.' } });
    return;
  }

  next();
};
