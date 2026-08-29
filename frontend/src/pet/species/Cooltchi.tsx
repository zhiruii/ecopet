import React from "react";

export const Cooltchi = ({ children }: { children?: React.ReactNode }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
    {/* Music Note */}
    <path d="M 85 20 L 85 35 A 4 4 0 1 1 80 35 L 80 22 L 92 18 L 92 28 A 4 4 0 1 1 87 28 L 87 18 Z" fill="#9A6DD7" stroke="var(--ink)" strokeWidth="2" />
    
    <g>
      {/* STROKE LAYER */}
      <g stroke="var(--ink)" strokeWidth="4" fill="none" strokeLinejoin="round" strokeLinecap="round">
        <path d="M 70 70 Q 90 60 80 50 Q 75 50 75 60" /> {/* Tail */}
        <path d="M 30 35 L 32 15 L 45 30" /> {/* L Ear */}
        <path d="M 60 35 L 58 15 L 45 30" /> {/* R Ear */}
        <path d="M 25 65 Q 10 70 15 80 Q 25 85 30 80" /> {/* L Leg/Arm */}
        <path d="M 75 75 Q 85 85 75 88 L 60 88" /> {/* R Leg */}
        <path d="M 25 35 C 10 45 10 80 35 85 C 55 88 75 80 75 60 C 75 40 60 25 45 25 C 35 25 25 30 25 35 Z" /> {/* Body */}
      </g>
      
      {/* FILL LAYER */}
      <g fill="#6A4A9C" stroke="none">
        <path d="M 70 70 Q 90 60 80 50 Q 75 50 75 60" />
        <path d="M 30 35 L 32 15 L 45 30" />
        <path d="M 60 35 L 58 15 L 45 30" />
        <path d="M 25 65 Q 10 70 15 80 Q 25 85 30 80" />
        <path d="M 75 75 Q 85 85 75 88 L 60 88" />
        <path d="M 25 35 C 10 45 10 80 35 85 C 55 88 75 80 75 60 C 75 40 60 25 45 25 C 35 25 25 30 25 35 Z" />
      </g>
    </g>
    
    <g transform="translate(-5, -5)">
      {children}
    </g>
  </svg>
);
