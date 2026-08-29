import React from "react";

export const Jumpitchi = ({ children }: { children?: React.ReactNode }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
    {/* Left Arm (Behind) */}
    <g stroke="var(--ink)" strokeWidth="4" fill="none">
      <path d="M 25 55 Q 10 60 15 70 Q 22 65 25 65" />
    </g>
    <g fill="#48A8E8" stroke="none">
      <path d="M 25 55 Q 10 60 15 70 Q 22 65 25 65" />
    </g>

    {/* Body */}
    <circle cx="50" cy="55" r="32" fill="#48A8E8" stroke="var(--ink)" strokeWidth="4" />
    
    {/* Hair */}
    <path d="M 22 40 C 35 15 65 15 78 40 C 70 30 60 28 50 32 C 40 28 30 30 22 40 Z" fill="#042C5C" stroke="var(--ink)" strokeWidth="4" strokeLinejoin="round" />
    
    {/* Right arm stick & Wand */}
    <path d="M 72 50 L 95 35" stroke="var(--ink)" strokeWidth="4" />
    <path d="M 95 20 L 98 28 L 108 28 L 100 34 L 103 42 L 95 38 L 87 42 L 90 34 L 82 28 L 92 28 Z" fill="#FFD633" stroke="var(--ink)" strokeWidth="3" strokeLinejoin="round" />
    
    {/* Right Arm overlay */}
    <g stroke="var(--ink)" strokeWidth="4" fill="#48A8E8">
      <path d="M 68 55 Q 75 52 80 45 Q 75 60 65 62" />
    </g>

    {/* White Shoes */}
    <path d="M 35 85 C 30 95 45 95 45 85 Z" fill="#FFF" stroke="var(--ink)" strokeWidth="4" />
    <path d="M 55 82 C 60 95 75 90 70 80 Z" fill="#FFF" stroke="var(--ink)" strokeWidth="4" />

    <g transform="translate(0, 5)">
      {children}
    </g>
  </svg>
);

