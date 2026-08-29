import React from "react";

export const Dashitchi = ({ children }: { children?: React.ReactNode }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
    {/* Speed Lines */}
    <path d="M 5 70 L 12 68 M 8 78 L 16 75 M 12 86 L 20 83" stroke="#042C5C" strokeWidth="3" strokeLinecap="round" />
    
    <g>
      {/* Ears (behind body) */}
      <circle cx="28" cy="32" r="15" fill="#042C5C" stroke="var(--ink)" strokeWidth="4" />
      <circle cx="72" cy="32" r="15" fill="#042C5C" stroke="var(--ink)" strokeWidth="4" />
      
      {/* STROKE LAYER for seamless body */}
      <g stroke="var(--ink)" strokeWidth="4" fill="none" strokeLinejoin="round" strokeLinecap="round">
        {/* Legs */}
        <path d="M 32 75 L 32 88 A 6 6 0 0 0 44 88 L 44 75" />
        <path d="M 56 75 L 56 88 A 6 6 0 0 0 68 88 L 68 75" />
        {/* Left Arm */}
        <path d="M 23 65 Q 12 70 16 78 Q 25 73 28 68" />
        {/* Right Arm */}
        <path d="M 77 60 Q 90 45 95 55 Q 85 62 76 65" />
        {/* Body */}
        <path d="M 22 55 C 22 28 35 25 50 25 C 65 25 78 28 78 55 C 78 82 65 85 50 85 C 35 85 22 82 22 55 Z" />
      </g>
      
      {/* FILL LAYER */}
      <g fill="#FDE154" stroke="none">
        <path d="M 32 75 L 32 88 A 6 6 0 0 0 44 88 L 44 75" />
        <path d="M 56 75 L 56 88 A 6 6 0 0 0 68 88 L 68 75" />
        <path d="M 23 65 Q 12 70 16 78 Q 25 73 28 68" />
        <path d="M 77 60 Q 90 45 95 55 Q 85 62 76 65" />
        <path d="M 22 55 C 22 28 35 25 50 25 C 65 25 78 28 78 55 C 78 82 65 85 50 85 C 35 85 22 82 22 55 Z" />
      </g>
    </g>
    
    <g transform="translate(0, 8) scale(1)">
      {children}
    </g>
  </svg>
);

