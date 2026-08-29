import type { AccessoryId, PetSpeciesId } from 'shared/types';
import { ACCESSORY_SPRITES, ACCESSORY_PLACEMENT, ACCESSORY_LAYER_ORDER } from './sprites';

const GRID_SIZE = 20;
const CELL = 100 / GRID_SIZE;

interface AccessoriesProps {
  species: PetSpeciesId;
  worn: AccessoryId[];
}

/** Draws every worn sprite into the shared 0-100 pet viewBox, back to front. */
export const Accessories = ({ species, worn }: AccessoriesProps) => (
  <>
    {ACCESSORY_LAYER_ORDER.filter((id) => worn.includes(id)).map((id) => {
      const [col, row] = ACCESSORY_PLACEMENT[species][id];
      const { grid, palette } = ACCESSORY_SPRITES[id];
      return (
        <g key={id}>
          {grid.flatMap((line, y) =>
            [...line].map((ch, x) => {
              if (ch === '.') return null;
              return (
                <rect
                  key={`${x}-${y}`}
                  x={(col + x) * CELL}
                  y={(row + y) * CELL}
                  width={CELL}
                  height={CELL}
                  fill={palette[ch]}
                  shapeRendering="crispEdges"
                />
              );
            })
          )}
        </g>
      );
    })}
  </>
);
