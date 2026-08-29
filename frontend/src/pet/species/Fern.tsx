import React from "react";
export const Fern = ({ children }: { children?: React.ReactNode }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
    <path d="M 35 85 L 35 100 M 35 100 L 25 100" stroke="var(--ink)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <path d="M 65 85 L 65 100 M 65 100 L 75 100" stroke="var(--ink)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <path d="M 50 25 C 20 25 20 85 50 85 C 80 85 80 25 50 25 Z" fill="#F27DB0" stroke="var(--ink)" strokeWidth="6" strokeLinejoin="round" />
    {/* Fins */}
    <path d="M 22 55 L 10 50 L 15 65 Z" fill="#F27DB0" stroke="var(--ink)" strokeWidth="4" strokeLinejoin="round" />
    <path d="M 78 55 L 90 50 L 85 65 Z" fill="#F27DB0" stroke="var(--ink)" strokeWidth="4" strokeLinejoin="round" />
    {children}
  </svg>
);
