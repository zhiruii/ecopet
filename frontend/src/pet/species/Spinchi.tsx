import React from "react";

export const Spinchi = ({ children }: { children?: React.ReactNode }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
    <g stroke="var(--ink)" strokeWidth="4" fill="none" strokeLinejoin="round">
      <path d="M 25 60 C 25 30 40 25 50 25 C 60 25 75 30 75 60 C 75 80 85 80 85 85 C 70 95 60 85 50 90 C 40 85 30 95 15 85 C 15 80 25 80 25 60 Z" />
      <path d="M 25 60 L 15 55 A 4 4 0 0 1 15 45 L 27 50 M 75 60 L 85 55 A 4 4 0 0 0 85 45 L 73 50" />
    </g>
    <g fill="#C5E5C4" stroke="none">
      <path d="M 25 60 C 25 30 40 25 50 25 C 60 25 75 30 75 60 C 75 80 85 80 85 85 C 70 95 60 85 50 90 C 40 85 30 95 15 85 C 15 80 25 80 25 60 Z" />
      <path d="M 25 60 L 15 55 A 4 4 0 0 1 15 45 L 27 50 Z M 75 60 L 85 55 A 4 4 0 0 0 85 45 L 73 50 Z" />
    </g>
    <g transform="translate(60, 20) rotate(15)">
      <path d="M -15 0 L 15 0" stroke="var(--ink)" strokeWidth="4" strokeLinecap="round" />
      <rect x="-10" y="-15" width="20" height="15" fill="#042C5C" stroke="var(--ink)" strokeWidth="4" strokeLinejoin="round" />
      <rect x="-10" y="-5" width="20" height="5" fill="#F15A24" stroke="none" />
    </g>
    <g transform="translate(0, 10)">
      {children}
    </g>
  </svg>
);
