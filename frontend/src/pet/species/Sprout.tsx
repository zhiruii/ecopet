import React from "react";
export const Sprout = ({ children }: { children?: React.ReactNode }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
    {/* Legs */}
    <path d="M 40 85 L 40 100 M 40 100 L 30 100" stroke="var(--ink)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <path d="M 60 85 L 60 100 M 60 100 L 70 100" stroke="var(--ink)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    {/* Body */}
    <path d="M 50 20 C 10 20 15 50 20 70 C 25 90 75 90 80 70 C 85 50 90 20 50 20 Z" fill="#A8C934" stroke="var(--ink)" strokeWidth="6" strokeLinejoin="round" />
    {/* Leaf */}
    <path d="M 50 20 Q 40 -5 60 0 Q 60 10 50 20 Z" fill="#4CAF50" stroke="var(--ink)" strokeWidth="4" strokeLinejoin="round" />
    {children}
  </svg>
);
