const GRID_SIZE = 20;
const CELL = 100 / GRID_SIZE;

interface PixelBodyProps {
  grid: string[];
  palette: Record<string, string>;
}

/** Renders a 20x20 pixel-art grid (row strings, one char per cell) into the shared 0-100 pet viewBox. */
export const PixelBody = ({ grid, palette }: PixelBodyProps) => (
  <>
    {grid.flatMap((row, y) =>
      [...row].map((ch, x) => {
        if (ch === '.') return null;
        const fill = palette[ch];
        return (
          <rect
            key={`${x}-${y}`}
            x={x * CELL}
            y={y * CELL}
            width={CELL}
            height={CELL}
            fill={fill}
            shapeRendering="crispEdges"
          />
        );
      })
    )}
  </>
);
