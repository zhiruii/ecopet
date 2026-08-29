import React from "react";
export const Bloop = ({ children }: { children?: React.ReactNode }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
    <path d="M 35 85 L 35 100 M 35 100 L 25 100" stroke="var(--ink)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <path d="M 65 85 L 65 100 M 65 100 L 75 100" stroke="var(--ink)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <path d="M 50 20 C 5 20 5 60 15 75 C 25 90 75 90 85 75 C 95 60 95 20 50 20 Z" fill="#5EC7EE" stroke="var(--ink)" strokeWidth="6" strokeLinejoin="round" />
    {children}
  </svg>
);
