import { Dashitchi } from './species/Dashitchi';
import { Roarchi } from './species/Roarchi';
import { Jumpitchi } from './species/Jumpitchi';
import { Hugtchi } from './species/Hugtchi';
import { Cooltchi } from './species/Cooltchi';
import { Punchtchi } from './species/Punchtchi';
import { Sparkitchi } from './species/Sparkitchi';
import { Chargetchi } from './species/Chargetchi';
import { Peacetchi } from './species/Peacetchi';
import { Spinchi } from './species/Spinchi';
import { Sprout } from './species/Sprout';
import { Bloop } from './species/Bloop';
import { Pebble } from './species/Pebble';
import { Nimbus } from './species/Nimbus';
import { Fern } from './species/Fern';
import { Coco } from './species/Coco';
import type { PetSpeciesId } from 'shared/types';

export const PET_COMPONENTS: Record<PetSpeciesId, React.FC<{ children?: React.ReactNode }>> = {
  dashitchi: Dashitchi,
  roarchi: Roarchi,
  jumpitchi: Jumpitchi,
  hugtchi: Hugtchi,
  cooltchi: Cooltchi,
  punchtchi: Punchtchi,
  sparkitchi: Sparkitchi,
  chargetchi: Chargetchi,
  peacetchi: Peacetchi,
  spinchi: Spinchi,
  sprout: Sprout,
  bloop: Bloop,
  pebble: Pebble,
  nimbus: Nimbus,
  fern: Fern,
  coco: Coco,
};

export const PET_SPECIES_LIST: PetSpeciesId[] = [
  'sprout', 'bloop', 'pebble', 'nimbus', 'fern', 'coco',
  'dashitchi', 'roarchi', 'jumpitchi', 'hugtchi', 'cooltchi', 'punchtchi',
  'sparkitchi', 'chargetchi', 'peacetchi', 'spinchi'
];

