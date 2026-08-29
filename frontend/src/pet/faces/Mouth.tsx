import type { PetMood } from 'shared/types';

export const Mouth = ({ mood }: { mood: PetMood }) => {
  if (mood === 'eating') {
    return <circle cx="50" cy="55" r="4" fill="var(--ink)" />;
  }
  if (mood === 'sad') {
    return <path d="M 45 58 Q 50 53 55 58" stroke="var(--ink)" strokeWidth="4" strokeLinecap="round" fill="none" />;
  }
  if (mood === 'sleepy') {
    return <circle cx="50" cy="55" r="2" fill="var(--ink)" />;
  }
  return <path d="M 45 53 Q 50 58 55 53" stroke="var(--ink)" strokeWidth="4" strokeLinecap="round" fill="none" />;
};
