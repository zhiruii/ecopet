interface PixelSpriteProps {
  grid: string[];
  palette: Record<string, string>;
  unit?: number;
  className?: string;
  style?: React.CSSProperties;
}

/** Generic pixel-grid renderer for background scenery sprites (row strings, one char per cell). */
export function PixelSprite({ grid, palette, unit = 4, className, style }: PixelSpriteProps) {
  const w = grid[0]?.length ?? 0;
  const h = grid.length;
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      width={w * unit}
      height={h * unit}
      className={className}
      style={style}
      shapeRendering="crispEdges"
    >
      {grid.flatMap((row, y) =>
        [...row].map((ch, x) => {
          if (ch === '.') return null;
          return <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={palette[ch]} />;
        })
      )}
    </svg>
  );
}
