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
const allowed = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: allowed.length === 0 ? true : allowed,
  })
);

// Render pings this to decide the service is live, and it is the fastest way to
// tell "backend is down" apart from "OpenAI call failed".
app.get('/health', (_req, res) => {
  res.json({ ok: true, model: process.env.OPENAI_MODEL || 'gpt-4o-mini' });
});

// The handler was written against Vercel's req/res, which are structurally the
// Node originals Express also extends, so it mounts unchanged.
app.post('/api/identify', (req, res) => handler(req as never, res as never));

const port = Number(process.env.PORT) || 3000;
app.listen(port, () => {
  console.log(`identify backend listening on :${port}`);
});
