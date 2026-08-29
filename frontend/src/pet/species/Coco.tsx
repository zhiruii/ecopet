import React from "react";
export const Coco = ({ children }: { children?: React.ReactNode }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
    <path d="M 35 85 L 35 100 M 35 100 L 25 100" stroke="var(--ink)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <path d="M 65 85 L 65 100 M 65 100 L 75 100" stroke="var(--ink)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    {/* Tuft */}
    <path d="M 45 25 L 50 15 L 55 25 Z" fill="#F5C9A0" stroke="var(--ink)" strokeWidth="4" strokeLinejoin="round" />
    {/* Egg body */}
    <path d="M 50 25 C 15 25 10 90 50 90 C 90 90 85 25 50 25 Z" fill="#F5C9A0" stroke="var(--ink)" strokeWidth="6" strokeLinejoin="round" />
    {children}
  </svg>
);
