import React from "react";

export const Roarchi = ({ children }: { children?: React.ReactNode }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
    {/* Surprise Lines */}
    <path d="M 70 5 L 72 15 M 82 8 L 80 18 M 90 18 L 83 25" stroke="#F15A24" strokeWidth="4" strokeLinecap="round" />
    
    <g>
      {/* STROKE LAYER */}
      <g stroke="var(--ink)" strokeWidth="4" fill="none" strokeLinejoin="round" strokeLinecap="round">
        {/* Legs */}
        <path d="M 35 75 L 30 88 A 5 5 0 0 0 40 90 L 45 80" />
        <path d="M 65 80 L 65 92 A 5 5 0 0 0 75 92 L 75 80" />
        {/* Arms (on the right) */}
        <path d="M 76 35 L 90 35 A 4 4 0 0 1 90 43 L 78 43" />
        <path d="M 78 50 L 88 50 A 4 4 0 0 1 88 58 L 76 58" />
        {/* Tail (on the left) */}
        <path d="M 25 65 Q 15 70 20 75 Q 25 70 30 75" />
        {/* Body Blob */}
        <path d="M 28 35 C 28 10 65 10 75 25 C 85 40 85 70 75 80 C 65 85 30 85 25 70 C 20 50 28 35 28 35 Z" />
      </g>
      
      {/* FILL LAYER */}
      <g fill="#81C229" stroke="none">
        <path d="M 35 75 L 30 88 A 5 5 0 0 0 40 90 L 45 80" />
        <path d="M 65 80 L 65 92 A 5 5 0 0 0 75 92 L 75 80" />
        <path d="M 76 35 L 90 35 A 4 4 0 0 1 90 43 L 78 43" />
        <path d="M 78 50 L 88 50 A 4 4 0 0 1 88 58 L 76 58" />
        <path d="M 25 65 Q 15 70 20 75 Q 25 70 30 75" />
        <path d="M 28 35 C 28 10 65 10 75 25 C 85 40 85 70 75 80 C 65 85 30 85 25 70 C 20 50 28 35 28 35 Z" />
      </g>
      
      {/* Yellow cheek */}
      <circle cx="35" cy="50" r="8" fill="#A9D840" stroke="none" />
    </g>
    
    <g transform="translate(-12, -15)">
      {children}
    </g>
  </svg>
);

