import React from 'react';
import { PixelBody } from '../pixel/PixelBody';

const GRID: string[] = [
  '....KKKRRRRRRKKK....',
  '...KKRRRRYYRRRRKK...',
  '...KRRYYYYYYYYRRK...',
  '..KKRYYYYYYKKKKKKK..',
  '..KRRYYYYYYKEEEKRKKK',
  '..KRRYYYYYYKEEEKRKKO',
  '..KRYYYYYYYKEEEKRKOK',
  '..KRYYYYYYYKKKKKRKKO',
  '..KRYYYYYYYYYYYYRKKK',
  '..KRYYYYYYYYYYYYRYYY',
  'KKKRYYYYYYYYYYYYRYYY',
  'YYYRYPPYYYYYYPPYRYYY',
  'YYYRYYYYYYYYYYYYRKKK',
  'YYYRYYYYYYYYYYYYRK..',
  'KKKRYYYYYYYYYYYYRK..',
  '..KRRRRRRRRRRRRRRK..',
  '..KKKKRRRKKRRRKKKK..',
  '.....KRRRKKRRRK.....',
  '.....KKKKKKKKKK.....',
  '....................',
];

const PALETTE: Record<string, string> = {
  K: 'var(--ink)',
  R: '#C98A3E',
  Y: '#F7E3A6',
  E: '#FFC94A',
  O: '#FF7A33',
  P: '#FFB3A0',
};

export const Punchtchi = ({ children }: { children?: React.ReactNode }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
    <PixelBody grid={GRID} palette={PALETTE} />
    {children}
  </svg>
);
