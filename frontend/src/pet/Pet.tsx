
import { motion } from 'framer-motion';
import { PET_COMPONENTS } from './registry';
import { Eyes } from './faces/Eyes';
import { Mouth } from './faces/Mouth';
import { petVariants } from './animations/variants';
import type { PetSpeciesId, PetMood } from 'shared/types';
import type { Reaction } from './animations/usePetReaction';

interface PetProps {
  species: PetSpeciesId;
  mood: PetMood;
  reaction: Reaction;
}

export function Pet({ species, mood, reaction }: PetProps) {
  const Component = PET_COMPONENTS[species] || PET_COMPONENTS['dashitchi']; // Fallback
  const activeVariant = reaction !== 'idle' ? reaction : 'idle';

  return (
    <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
      <motion.div
        variants={petVariants}
        animate={activeVariant}
        className="w-full h-full cursor-pointer"
        whileTap="tapSquash"
      >
        <Component>
          <Eyes mood={mood} />
          <Mouth mood={mood} />
        </Component>
      </motion.div>
    </div>
  );
}
