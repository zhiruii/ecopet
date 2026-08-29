const SIZE = 8;

export interface PixelIconProps {
  size?: number;
  className?: string;
  /** Accepted for drop-in compatibility with the lucide-react icon API; unused (icons are solid fills). */
  strokeWidth?: number;
}

/** Renders an 8x8 pixel-art glyph (row strings, 'X' = filled) using currentColor. */
export function pixelIcon(grid: string[]) {
  return function PixelIcon({ size = 20, className }: PixelIconProps) {
    return (
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        width={size}
        height={size}
        className={className}
        shapeRendering="crispEdges"
      >
        {grid.flatMap((row, y) =>
          [...row].map((ch, x) =>
            ch === 'X' ? (
              <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill="currentColor" />
            ) : null
          )
        )}
      </svg>
    );
  };
}
