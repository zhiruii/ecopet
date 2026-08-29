import { PixelSprite } from '../components/PixelSprite';

const SUN_GRID = ['..XXXX..', '.XXXXXX.', 'XXXXXXXX', 'XXXXXXXX', 'XXXXXXXX', 'XXXXXXXX', '.XXXXXX.', '..XXXX..'];
const SUN_PALETTE = { X: '#FFD25A' };

import { useState, useCallback } from 'react';

export function PixelSun({ className, onClick }: { className?: string; onClick?: () => void }) {
  const [bursts, setBursts] = useState<number[]>([]);

  const handleClick = useCallback(() => {
    const id = Date.now();
    setBursts(b => [...b, id]);
    setTimeout(() => {
      setBursts(b => b.filter(x => x !== id));
    }, 600); // sunburst-line animation is roughly 0.6s
    if (onClick) onClick();
  }, [onClick]);

  return (
    <div
      className={`${onClick ? 'cursor-pointer pointer-events-auto' : ''} ${className || 'relative'}`}
      onClick={handleClick}
    >
      <PixelSprite grid={SUN_GRID} palette={SUN_PALETTE} unit={6} className="relative z-10" />

      {/* Sunburst lines */}
      {bursts.map(id => (
        <div key={id} className="absolute inset-0 pointer-events-none">
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <div
              key={deg}
              className="absolute top-1/2 left-1/2 origin-left"
              style={{ transform: `translateY(-50%) rotate(${deg}deg)` }}
            >
              <div
                className="w-4 h-1 bg-[#FFD25A] ml-8"
                style={{ animation: 'sunburst-line 0.6s ease-out forwards' }}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
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

export function PixelBush({ className, onClick }: { className?: string; onClick?: () => void }) {
  return (
    <div 
      className={`${className || ''} ${onClick ? 'cursor-pointer pointer-events-auto transition-transform duration-150 active:scale-95' : ''}`}
      onClick={onClick}
    >
      <PixelSprite grid={BUSH_GRID} palette={{ X: '#3A7A3E' }} unit={4} />
    </div>
  );
}

const PLANE_GRID = [
  '.............................XXXX...',
  '............................XBBBBX..',
  '...........................XBBBBBX..',
  '..........................XBBBBBBX..',
  '.........................XBBBBBBBX..',
  '.........................XOOOOOOOX..',
  '........XXXXXXXXXXXXX....XWWWWWWWX..',
  '.......XBBBBBBBBBBBBBX..XWWWWWWWWX..',
  '......XWLLLLXWLLXWLLLWXXXWWWWWWWWX..',
  '....XXWWWWWWWWWWWWWWWWWWWWWWWWWWWX..',
  '...XWWWWWWWWWWWWWWWWWWWWWWWWWWWWWX..',
  '...XBBBBBBBBBBBBBBBBBBBBBBBBBBBBBXX.',
  '...XBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBX.',
  '...XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.',
  '......XX......................XX....'
];

const PLANE_PALETTE = {
  X: 'var(--ink)',
  W: '#FFFFFF',
  B: '#1B365D', // Navy Blue
  L: '#8ED1F2', // Window Light Blue
  O: '#F28C28', // Orange Stripe
};

export function PixelPlane({ className }: { className?: string }) {
  const unit = 4;
  return (
    <div
      className={`absolute z-10 flex items-center ${className || ''}`}
      style={{ animation: 'plane-fly 40s linear forwards', left: 0 }}
    >
      {/* Banner */}
      <div
        className="flex items-center origin-left absolute"
        style={{
          animation: 'banner-wave 1.5s ease-in-out infinite',
          left: '128px', // positioned behind the tail
          top: '32px'
        }}
      >
        {/* Banner string attached to tail */}
        <div className="w-4 h-0.5 bg-ink" />
        <div className="w-0.5 h-4 bg-ink -ml-0.5 mt-2" style={{ transform: 'rotate(-45deg)' }} />
        <div className="w-4 h-0.5 bg-ink -ml-0.5 mt-4" />

        {/* Banner body */}
        <div className="relative px-4 py-1.5 bg-white border-2 border-ink pixel-notch-sm text-[#2C6E33] font-black text-[10px] tracking-widest whitespace-nowrap ml-1">
          RECYCLE!!
        </div>
      </div>

      {/* Plane Body Sprite */}
      <div className="relative">
        <PixelSprite grid={PLANE_GRID} palette={PLANE_PALETTE} unit={unit} />

        {/* Tail fin NUS text (Pixel Perfect SVG) */}
        <div
          className="absolute"
          style={{
            top: '7px',
            right: '21px',
            width: '13px',
            height: '5px'
          }}
        >
          <svg viewBox="0 0 13 5" className="w-full h-full fill-white" shapeRendering="crispEdges">
            {/* N */}
            <rect x="0" y="0" width="1" height="5" />
            <rect x="1" y="1" width="1" height="2" />
            <rect x="2" y="2" width="1" height="2" />
            <rect x="3" y="0" width="1" height="5" />
            {/* U */}
            <rect x="5" y="0" width="1" height="4" />
            <rect x="7" y="0" width="1" height="4" />
            <rect x="5" y="4" width="3" height="1" />
            {/* S */}
            <rect x="9" y="0" width="3" height="1" />
            <rect x="9" y="1" width="1" height="1" />
            <rect x="9" y="2" width="3" height="1" />
            <rect x="11" y="3" width="1" height="1" />
            <rect x="9" y="4" width="3" height="1" />
          </svg>
        </div>

        {/* Propeller */}
        <div
          className="absolute w-2 h-[28px]"
          style={{ top: '32px', left: '4px' }}
        >
          <div className="absolute inset-0 bg-[#A0A0A0] border-2 border-ink" style={{ animation: 'propeller-spin 0.1s steps(2, end) infinite' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-ink z-10" />

        </div>
      </div>
    </div>
  );
}

export function PixelBin({ onClick }: { onClick: () => void }) {
  return (
    <div
      className="absolute bottom-[calc(38%+20px)] left-[4%] w-[60px] pointer-events-auto cursor-pointer transition-transform duration-150 hover:-translate-y-1 active:translate-y-0"
      onClick={onClick}
    >
      <img
        src="/recyclingbin.png"
        alt="Recycle Bin"
        className="w-full h-auto drop-shadow-md"
        style={{
          imageRendering: 'pixelated',
          filter: 'hue-rotate(115deg) saturate(1.2)'
        }}
      />
    </div>
  );
}
