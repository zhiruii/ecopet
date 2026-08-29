import React from "react";
export const Nimbus = ({ children }: { children?: React.ReactNode }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
    <path d="M 35 85 L 35 100 M 35 100 L 25 100" stroke="var(--ink)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <path d="M 65 85 L 65 100 M 65 100 L 75 100" stroke="var(--ink)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    {/* Cloud Body */}
    <path d="M 30 50 C 30 20 70 20 70 50 C 90 50 90 80 70 80 C 70 80 30 80 30 80 C 10 80 10 50 30 50 Z" fill="#F7F0A8" stroke="var(--ink)" strokeWidth="6" strokeLinejoin="round" />
    {children}
  </svg>
);
