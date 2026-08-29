import React from 'react';
import { PixelBody } from '../pixel/PixelBody';

const GRID: string[] = [
  '..KKKKKK....KKKKKHKH',
  '.KKNNNNKK..KKNNNNHHH',
  '.KNNNNNNK..KNNNNNNHK',
  '.KNNNNNNK..KNNNNNNKK',
  '.KNNNNNNK..KNNNNNNK.',
  '.KKNNNNKK..KKNNNNKK.',
  '..KKKKKKKKKKKKKKKK..',
  '....KKKCCCCCCKKK....',
  '...KKCCCCCCCCCCKK...',
  '..KKCCCCCCCCCCCCKK..',
  '..KCCCCCCCCCCCCCCK..',
  '..KCCCCCCCCCCCCCCK..',
  '..KCPPCCCCCCCCPPCK..',
  '..KCCPCCCCCCCCPCCK..',
  '..KCCCCCCKKCCCCCCK..',
  '..KCCCCCKCCKCCCCCK..',
  '..KCCCCCCCCCCCCCCK..',
  '..KKKCCCCCCCCCCKKK..',
  '....KKCCCCCCCCKK....',
  '.....KCCCKKCCCK.....',
];

const PALETTE: Record<string, string> = {
  K: 'var(--ink)',
  C: '#FFF9F0',
  N: 'var(--ink)',
  H: '#FF6F91',
  P: '#FFB3C1',
};

export const Hugtchi = ({ children }: { children?: React.ReactNode }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
    <PixelBody grid={GRID} palette={PALETTE} />
    {children}
  </svg>
);
