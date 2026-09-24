export default function handler(_req: unknown, res: { status(code: number): typeof res; json(body: unknown): void }) {
  res.status(200).json({ status: 'function-runtime-ok' });
}
