import { PixelSprite } from '../components/PixelSprite';
import { IconRecycle } from '../components/icons';

const SUN_GRID = ['..XXXX..', '.XXXXXX.', 'XXXXXXXX', 'XXXXXXXX', 'XXXXXXXX', 'XXXXXXXX', '.XXXXXX.', '..XXXX..'];
const SUN_PALETTE = { X: '#FFD25A' };

export function PixelSun({ className }: { className?: string }) {
  return <PixelSprite grid={SUN_GRID} palette={SUN_PALETTE} unit={6} className={className} />;
}

const CLOUD_GRID = [
  '....XXXX........',
  '...XXXXXXXX.....',
  '..XXXXXXXXXXX...',
  '.XXXXXXXXXXXXXX.',
  'XXXXXXXXXXXXXXXX',
  '.XXXXXXXXXXXXXX.',
  '..XXXXXXXXXXX...',
];
const CLOUD_PALETTE = { X: '#FFFFFF' };

export function PixelCloud({ className }: { className?: string }) {
  return <PixelSprite grid={CLOUD_GRID} palette={CLOUD_PALETTE} unit={4} className={className} />;
}

const BIRD_GRID = ['XX...XX', '..X.X..'];
const BIRD_PALETTE = { X: 'var(--ink)' };

export function PixelBird({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return <PixelSprite grid={BIRD_GRID} palette={BIRD_PALETTE} unit={3} className={className} style={style} />;
}

const TREE_GRID = [
  '....XX....',
  '...XXXX...',
  '..XXXXXX..',
  '.XXXXXXXX.',
  'XXXXXXXXXX',
  '.XXXXXXXX.',
  '..XXXXXX..',
];

export function PixelTree({ className, tone = '#3A7A3E' }: { className?: string; tone?: string }) {
  return <PixelSprite grid={TREE_GRID} palette={{ X: tone }} unit={5} className={className} />;
}

const BUSH_GRID = ['...XXXX.....', '..XXXXXXXX..', '.XXXXXXXXXX.', 'XXXXXXXXXXXX', '.XXXXXXXXXX.'];

export function PixelBush({ className }: { className?: string }) {
  return <PixelSprite grid={BUSH_GRID} palette={{ X: '#3A7A3E' }} unit={4} className={className} />;
}

/** Flat-color pixel recycling bin — replaces the gradient/shadow version. */
export function PixelBin({ onClick }: { onClick: () => void }) {
  return (
    <div
      className="absolute bottom-[38%] left-[4%] w-14 h-20 pointer-events-auto cursor-pointer transition-transform duration-150 hover:-translate-y-1 active:translate-y-0"
      onClick={onClick}
    >
      <div className="absolute top-0 -left-0.5 w-[110%] h-4 border-[3px] border-ink bg-[#7BCAEE]" />
      <div className="absolute bottom-0 w-full h-16 border-[3px] border-ink bg-[#4C9FCB] flex items-center justify-center">
        <IconRecycle size={24} className="text-white" />
      </div>
    </div>
  );
}
