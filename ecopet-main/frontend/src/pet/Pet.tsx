
import { clsx } from 'clsx';
import { motion } from 'framer-motion';
import { PET_COMPONENTS } from './registry';
import { Eyes } from './faces/Eyes';
import { Mouth } from './faces/Mouth';
import { Accessories } from './accessories/Accessories';
import { petVariants } from './animations/variants';
import type { AccessoryId, PetSpeciesId, PetMood } from 'shared/types';
import type { Reaction } from './animations/usePetReaction';

interface PetProps {
  species: PetSpeciesId;
  mood: PetMood;
  reaction: Reaction;
  /** Worn accessories, drawn over the body and face. */
  accessories?: AccessoryId[];
  /** Overrides the default 12rem stage. */
  className?: string;
}

export function Pet({ species, mood, reaction, accessories = [], className }: PetProps) {
  const Component = PET_COMPONENTS[species] || PET_COMPONENTS['chargetchi']; // Fallback
  const activeVariant = reaction !== 'idle' ? reaction : 'idle';

  return (
    <div className={clsx('relative mx-auto flex items-center justify-center', className ?? 'w-48 h-48')}>
      <motion.div
        variants={petVariants}
        animate={activeVariant}
        className="w-full h-full cursor-pointer"
        whileTap="tapSquash"
      >
        <Component>
          <Eyes mood={mood} />
          <Mouth mood={mood} />
          <Accessories species={species} worn={accessories} />
        </Component>
      </motion.div>
    </div>
  );
}
