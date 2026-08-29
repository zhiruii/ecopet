import React from "react";
export const Pebble = ({ children }: { children?: React.ReactNode }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
    {/* Ears */}
    <path d="M 35 30 C 20 0 45 0 45 30" fill="#7E93BC" stroke="var(--ink)" strokeWidth="6" strokeLinejoin="round" />
    <path d="M 65 30 C 80 0 55 0 55 30" fill="#7E93BC" stroke="var(--ink)" strokeWidth="6" strokeLinejoin="round" />
    {/* Legs */}
    <path d="M 35 85 L 35 100 M 35 100 L 25 100" stroke="var(--ink)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <path d="M 65 85 L 65 100 M 65 100 L 75 100" stroke="var(--ink)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    {/* Body */}
    <circle cx="50" cy="60" r="30" fill="#7E93BC" stroke="var(--ink)" strokeWidth="6" />
    {children}
  </svg>
);
