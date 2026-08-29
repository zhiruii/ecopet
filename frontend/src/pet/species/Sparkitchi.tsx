import React from "react";

export const Sparkitchi = ({ children }: { children?: React.ReactNode }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
    <path d="M 15 25 L 20 30 M 10 35 L 18 38 M 80 25 L 85 20 M 85 35 L 90 32" stroke="#FFD633" strokeWidth="3" strokeLinecap="round" />
    
    <g>
      <g stroke="var(--ink)" strokeWidth="4" fill="none">
        <circle cx="50" cy="55" r="32" />
        <path d="M 50 23 C 50 10 65 10 65 20 C 65 25 55 25 55 20" />
        <path d="M 35 87 L 35 95 M 42 87 L 42 95 M 58 87 L 58 95 M 65 87 L 65 95" strokeLinecap="round" />
      </g>
      <circle cx="50" cy="55" r="32" fill="#FC8704" stroke="none" />
    </g>
    <g transform="translate(0, 5)">
      {children}
    </g>
  </svg>
);
