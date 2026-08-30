import type { IdentifyResult } from 'shared/types';
import { mockIdentify } from './mockIdentify';

/**
 * Converts a Blob to a base64 string (without the data URL prefix).
 */
function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      // result is something like "data:image/jpeg;base64,/9j/4AAQSkZJR..."
      const base64 = result.split(',')[1];
      if (base64) resolve(base64);
      else reject(new Error('Failed to extract base64 from data URL'));
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

// Backend origin. Empty in dev so the request stays relative and the Vite proxy
// (vite.config.ts) forwards it to the local server; in production this is the
// Render service URL, since frontend and backend are on different hosts.
const API_BASE = import.meta.env.VITE_API_BASE_URL ?? '';

/**
 * Real API call to the identify backend.
 * Falls back to mockIdentify in dev or if the backend is unreachable.
 */
export async function identify(imageBlob: Blob): Promise<IdentifyResult[]> {
  try {
    const imageBase64 = await blobToBase64(imageBlob);

    const response = await fetch(`${API_BASE}/api/identify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ imageBase64 }),
    });

    if (!response.ok) {
      throw new Error(`API returned ${response.status}: ${response.statusText}`);
    }

    const data: { items: IdentifyResult[] } = await response.json();
    return data.items;
  } catch (error) {
    console.warn('Real identify API failed, falling back to mock:', error);
    // In production, we don't want to silently fake results if the API is down.
    if (import.meta.env.PROD) {
      throw error;
    }
    // Graceful fallback to mock (e.g. local dev without vercel dev running)
    return mockIdentify();
  }
}
