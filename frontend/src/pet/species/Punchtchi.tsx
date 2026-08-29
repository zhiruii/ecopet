import React from "react";

export const Punchtchi = ({ children }: { children?: React.ReactNode }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
    {/* Action Lines */}
    <path d="M 85 45 L 95 40 M 88 55 L 98 52 M 85 65 L 95 68" stroke="#D1501A" strokeWidth="3" strokeLinecap="round" />
    
    {/* Left Arm Wound Up (Behind crust) */}
    <path d="M 25 60 L 15 65 A 5 5 0 1 1 12 55 L 20 50" fill="#F7E5AD" stroke="var(--ink)" strokeWidth="4" />

    {/* Feet */}
    <path d="M 35 80 L 32 92 A 4 4 0 0 0 42 92 L 45 80" fill="#FFF" stroke="var(--ink)" strokeWidth="4" />
    <path d="M 65 80 L 62 92 A 4 4 0 0 0 72 92 L 75 80" fill="#FFF" stroke="var(--ink)" strokeWidth="4" />

    {/* Crust */}
    <path d="M 25 35 C 25 15 45 10 50 15 C 55 10 75 15 75 35 L 75 75 C 75 85 25 85 25 75 Z" fill="#C27A2F" stroke="var(--ink)" strokeWidth="4" strokeLinejoin="round" />
    
    {/* Bread Face */}
    <path d="M 30 38 C 30 22 45 18 50 22 C 55 18 70 22 70 38 L 70 70 C 70 78 30 78 30 70 Z" fill="#F7E5AD" stroke="none" />
    
    {/* Egg */}
    <path d="M 62 30 C 68 28 75 32 72 38 C 75 45 65 48 60 42 C 55 45 52 38 56 32 C 52 28 58 25 62 30 Z" fill="#FFF" stroke="var(--ink)" strokeWidth="3" strokeLinejoin="round" />
    <circle cx="64" cy="35" r="5" fill="#F8C02B" stroke="var(--ink)" strokeWidth="3" />
    
    {/* Right Arm Punching (In front of crust) */}
    <path d="M 75 60 L 85 55 A 5 5 0 1 1 88 65 L 75 68" fill="#F7E5AD" stroke="var(--ink)" strokeWidth="4" />

    <g transform="translate(0, 5)">
      {children}
    </g>
  </svg>
);
