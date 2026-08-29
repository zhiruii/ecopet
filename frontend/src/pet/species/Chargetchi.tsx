import React from "react";

export const Chargetchi = ({ children }: { children?: React.ReactNode }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
    <circle cx="15" cy="40" r="3" fill="#8DBEE8" stroke="none" />
    <circle cx="10" cy="50" r="4" fill="#8DBEE8" stroke="none" />

    <g stroke="var(--ink)" strokeWidth="4" fill="none" strokeLinejoin="round">
      <path d="M 30 50 C 30 25 60 25 70 35 L 85 25 L 75 45 C 80 50 85 60 85 75 L 70 85 L 60 90 L 50 85 C 35 85 30 70 30 50 Z" />
      <path d="M 45 28 L 50 10 L 60 26" />
      <path d="M 25 65 L 15 70 L 28 75" />
    </g>
    <g fill="#8DBEE8" stroke="none">
      <path d="M 30 50 C 30 25 60 25 70 35 L 85 25 L 75 45 C 80 50 85 60 85 75 L 70 85 L 60 90 L 50 85 C 35 85 30 70 30 50 Z" />
      <path d="M 45 28 L 50 10 L 60 26 Z" />
      <path d="M 25 65 L 15 70 L 28 75 Z" />
    </g>
    <g transform="translate(-10, -5)">
      {children}
    </g>
  </svg>
);
