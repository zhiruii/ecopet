import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Bind every interface. Without this Node can bind IPv6 ::1 only, and a
    // browser resolving localhost to 127.0.0.1 gets connection refused while
    // the server log looks healthy. `true` also exposes the Network URL, which
    // is how we test the camera input on a real phone (CLAUDE.md §12).
    host: true,
    // Fail loudly instead of silently drifting to 5174 when 5173 is taken,
    // so the printed URL is always the URL that works.
    port: 5173,
    strictPort: true,
  },
  resolve: {
    alias: {
      shared: fileURLToPath(new URL('../shared', import.meta.url)),
    },
  },
})
