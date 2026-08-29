import { useState, useCallback } from 'react';

export type Reaction = 'idle' | 'wobble' | 'tapSquash';

export function usePetReaction() {
  const [reaction, setReaction] = useState<Reaction>('idle');

  const triggerReaction = useCallback((type: Reaction) => {
    setReaction(type);
    if (type !== 'idle') {
      setTimeout(() => setReaction('idle'), 600); // Reset after animation
    }
  }, []);

  return { reaction, triggerReaction };
}
