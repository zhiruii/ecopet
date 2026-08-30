// Loads backend/.env for local dev. On Render the variables come from the
// dashboard instead and there is no file, where this quietly does nothing.
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import handler from './api/identify';

const app = express();

// The frontend posts a base64 JPEG. Keep this in sync with the client-side
// downscale in frontend/src/features/scan/capture.ts (CLAUDE.md section 4).
app.use(express.json({ limit: '4mb' }));

// Frontend (Vercel) and backend (Render) are different origins, so the browser
// preflights every POST. ALLOWED_ORIGINS is a comma-separated allowlist; unset
// means allow all, which is only acceptable before the Vercel URL is known.
//
// An Origin header never carries a trailing slash, but the URL copied out of a
// dashboard usually does, and the mismatch fails as a silently missing header
// rather than an error. Normalise both sides so the paste just works.
const normalise = (o: string) => o.trim().replace(/\/+$/, '');

const allowed = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map(normalise)
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      // Same-origin and server-to-server callers send no Origin at all.
      if (!origin || allowed.length === 0) return callback(null, true);
      const ok = allowed.includes(normalise(origin));
      if (!ok) console.warn(`CORS: rejected origin ${origin}; allowed: ${allowed.join(', ')}`);
      return callback(null, ok);
    },
  })
);

// Render pings this to decide the service is live, and it is the fastest way to
// tell "backend is down" apart from "OpenAI call failed". It also reports the
// parsed allowlist, since a CORS mismatch is otherwise invisible from outside.
app.get('/health', (_req, res) => {
  res.json({
    ok: true,
    model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
    allowedOrigins: allowed.length === 0 ? 'all' : allowed,
  });
});

// The handler was written against Vercel's req/res, which are structurally the
// Node originals Express also extends, so it mounts unchanged.
app.post('/api/identify', (req, res) => handler(req as never, res as never));

const port = Number(process.env.PORT) || 3000;
app.listen(port, () => {
  console.log(`identify backend listening on :${port}`);
});
