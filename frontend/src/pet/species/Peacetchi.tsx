import React from "react";

export const Peacetchi = ({ children }: { children?: React.ReactNode }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
    <path d="M 85 45 L 90 40 M 90 55 L 95 50" stroke="#FFD633" strokeWidth="3" strokeLinecap="round" />
    <g stroke="var(--ink)" strokeWidth="4" fill="none" strokeLinejoin="round">
      <circle cx="50" cy="55" r="32" />
      <path d="M 25 35 L 15 25 L 30 30 M 35 25 L 30 15 L 40 22 M 75 35 L 85 25 L 70 30 M 65 25 L 70 15 L 60 22" />
      <path d="M 25 65 L 15 70 L 22 75 M 75 60 L 85 55 M 85 55 L 82 45 M 85 55 L 90 47" strokeWidth="4" strokeLinecap="round" />
    </g>
    <g fill="#EA3623" stroke="none">
      <circle cx="50" cy="55" r="32" />
      <path d="M 25 35 L 15 25 L 30 30 Z M 35 25 L 30 15 L 40 22 Z M 75 35 L 85 25 L 70 30 Z M 65 25 L 70 15 L 60 22 Z" />
    </g>
    <g transform="translate(0, 5)">
      {children}
    </g>
  </svg>
);
