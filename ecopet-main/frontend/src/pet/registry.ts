import { Hugtchi } from './species/Hugtchi';
import { Punchtchi } from './species/Punchtchi';
import { Chargetchi } from './species/Chargetchi';
import type { PetSpeciesId } from 'shared/types';

export const PET_COMPONENTS: Record<PetSpeciesId, React.FC<{ children?: React.ReactNode }>> = {
  hugtchi: Hugtchi,
  punchtchi: Punchtchi,
  chargetchi: Chargetchi,
};

export const PET_SPECIES_LIST: PetSpeciesId[] = ['chargetchi', 'hugtchi', 'punchtchi'];
