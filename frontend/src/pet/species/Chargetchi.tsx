import React from 'react';
import { PixelBody } from '../pixel/PixelBody';

const GRID: string[] = [
  '........KKKK........',
  '.......KKDDKK.......',
  'KKK...KKDDDDKK......',
  'KBK...KDDDDDDK......',
  'BKK...KDDDDDDK......',
  'KKK..KKDDDDDDKK.....',
  'KBKKKKBBBBBBBBKKK...',
  'BKKKBBBBBBBBBBBBKK..',
  'KKKBBBBBBBBBBBBBBK..',
  '.KKBBBBBBBBBBBBBBKK.',
  '.KBBBBBBBBBBBBBBBBK.',
  'KKDBBBBBBBBBBBBBBDKK',
  'KDDBBBBBBBBBBBBBBDDK',
  'KKDBPPBBBBBBBBPPBDKK',
  '.KKDBBBBBBBBBBBBDKK.',
  '..KBBBBBBBBBBBBBBK..',
  '..KKKBBBBBBBBBBKKK..',
  '....KKFFFKKFFFKK....',
  '.....KFFFKKFFFK.....',
  '.....KKKKKKKKKK.....',
];

const PALETTE: Record<string, string> = {
  K: 'var(--ink)',
  B: '#8FCBEA',
  D: '#4E9FD1',
  F: '#FFF6E0',
  P: '#FFB3C1',
};

export const Chargetchi = ({ children }: { children?: React.ReactNode }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
    <PixelBody grid={GRID} palette={PALETTE} />
    {children}
  </svg>
);
