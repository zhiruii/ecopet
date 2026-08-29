import type { PetMood } from 'shared/types';

export const Eyes = ({ mood }: { mood: PetMood }) => {
  if (mood === 'sleepy') {
    return (
      <g stroke="var(--ink)" strokeWidth="5" strokeLinecap="round" fill="none">
        <path d="M 35 45 Q 40 50 45 45" />
        <path d="M 55 45 Q 60 50 65 45" />
      </g>
    );
  }
  if (mood === 'happy') {
    return (
      <g stroke="var(--ink)" strokeWidth="5" strokeLinecap="round" fill="none">
        <path d="M 35 45 Q 40 40 45 45" />
        <path d="M 55 45 Q 60 40 65 45" />
      </g>
    );
  }
  if (mood === 'sad') {
    return (
      <g fill="var(--ink)">
        <circle cx="40" cy="45" r="4" />
        <circle cx="60" cy="45" r="4" />
        {/* Tears */}
        <circle cx="40" cy="55" r="2" fill="#5EC7EE" />
        <circle cx="60" cy="55" r="2" fill="#5EC7EE" />
      </g>
    );
  }
  return (
    <g fill="var(--ink)">
      <circle cx="40" cy="45" r="5" />
      <circle cx="60" cy="45" r="5" />
      <circle cx="42" cy="43" r="1.5" fill="white" />
      <circle cx="62" cy="43" r="1.5" fill="white" />
    </g>
  );
};
