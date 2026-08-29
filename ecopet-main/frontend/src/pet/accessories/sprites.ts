import type { AccessoryId, PetSpeciesId } from 'shared/types'

/**
 * Accessories are pixel sprites drawn on the same 20x20 lattice as the pet
 * bodies (see pixel/PixelBody). '.' is transparent; every other char is a
 * palette key. Placement is the sprite's top-left cell within that lattice,
 * per species, because each body carries its head at a different height.
 */
export interface AccessorySprite {
  grid: string[]
  palette: Record<string, string>
}

const INK = 'var(--ink)'

export const ACCESSORY_SPRITES: Record<AccessoryId, AccessorySprite> = {
  hat: {
    grid: [
      '...KKKK...',
      '..KBBBBK..',
      '..KDDDDK..',
      'KKKKKKKKKK',
    ],
    palette: { K: INK, B: '#5EC7EE', D: '#3D8FB8' },
  },
  leafCrown: {
    grid: [
      '..D.D.D..',
      '.DGDGDGD.',
      'DGGGGGGGD',
      '.KKKKKKK.',
    ],
    palette: { K: INK, G: '#5FA85F', D: '#2F6B33' },
  },
  glasses: {
    grid: [
      '..KK...KK..',
      'KK..KKK..KK',
      '.K..K.K..K.',
      '..KK...KK..',
    ],
    palette: { K: INK },
  },
  scarf: {
    grid: [
      // Stripes run horizontally — vertical ones sat under the mouth and read
      // as a row of teeth. The tail hangs centre, into the gap between the feet,
      // so the band reads as a scarf rather than a plank.
      'KKKKKKKKKKKKKK',
      'KCCCCCCCCCCCCK',
      'KRRRRRRRRRRRRK',
      'KKKKKRRRRKKKKK',
      '.....KRRK.....',
      '.....KKKK.....',
    ],
    palette: { K: INK, R: '#B5533E', C: '#F0E4D4' },
  },
}

/** Top-left cell [col, row] of each sprite, per species. */
export const ACCESSORY_PLACEMENT: Record<PetSpeciesId, Record<AccessoryId, [number, number]>> = {
  chargetchi: { hat: [5, 0], leafCrown: [6, 0], glasses: [5, 7], scarf: [3, 13] },
  hugtchi: { hat: [5, 4], leafCrown: [6, 4], glasses: [5, 7], scarf: [3, 13] },
  punchtchi: { hat: [5, 0], leafCrown: [6, 0], glasses: [5, 7], scarf: [3, 12] },
}

/** Back-to-front draw order. Glasses last so the frame sits over the eyes. */
export const ACCESSORY_LAYER_ORDER: AccessoryId[] = ['scarf', 'hat', 'leafCrown', 'glasses']
