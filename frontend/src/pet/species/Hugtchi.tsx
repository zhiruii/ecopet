import React from "react";

export const Hugtchi = ({ children }: { children?: React.ReactNode }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
    {/* Floating Heart */}
    <path d="M 85 40 C 85 35 90 35 90 40 C 90 35 95 35 95 40 C 95 45 90 50 90 50 C 90 50 85 45 85 40 Z" fill="#FF759E" stroke="none" />

    {/* Ears */}
    <circle cx="35" cy="30" r="14" fill="#042C5C" stroke="var(--ink)" strokeWidth="4" />
    <circle cx="65" cy="30" r="14" fill="#042C5C" stroke="var(--ink)" strokeWidth="4" />
    
    {/* Fluffy Body */}
    <path d="M 30 40 C 15 40 15 60 20 65 C 10 75 20 90 35 85 C 45 90 55 90 65 85 C 80 90 90 75 80 65 C 85 60 85 40 70 40 C 60 30 40 30 30 40 Z" fill="#FFFFFF" stroke="var(--ink)" strokeWidth="4" strokeLinejoin="round" />
    
    {/* Feet */}
    <path d="M 35 84 C 35 95 45 95 45 84 Z" fill="#FFFFFF" stroke="var(--ink)" strokeWidth="4" />
    <path d="M 55 84 C 55 95 65 95 65 84 Z" fill="#FFFFFF" stroke="var(--ink)" strokeWidth="4" />

    {/* Little clasped hands */}
    <path d="M 42 70 C 42 75 48 75 50 72 C 52 75 58 75 58 70" fill="none" stroke="var(--ink)" strokeWidth="4" strokeLinecap="round" />

    {/* Blush */}
    <circle cx="28" cy="55" r="5" fill="#FFB8CA" stroke="none" />
    <circle cx="72" cy="55" r="5" fill="#FFB8CA" stroke="none" />

    <g transform="translate(0, 5)">
      {children}
    </g>
  </svg>
);

