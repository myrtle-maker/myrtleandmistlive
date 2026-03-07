'use client';

import React, { useMemo, useEffect, useState } from 'react';
import { useTheme } from './ThemeContext';
import { MOON_PHASES } from '../data/moonPhases';

const MoonSync: React.FC = () => {
  const { theme } = useTheme();
  const [percentage, setPercentage] = useState(0);

  // Calculate precise moon phase on mount
  useEffect(() => {
    const knownNewMoon = new Date('2024-01-11T11:57:00Z').getTime();
    const now = new Date().getTime();
    const cycleLength = 29.53059 * 24 * 60 * 60 * 1000; // in ms
    
    const diff = now - knownNewMoon;
    const currentCyclePos = diff % cycleLength;
    const perc = currentCyclePos / cycleLength;
    setPercentage(perc);
  }, []);

  // Map percentage to 0-7 index for text descriptions
  const phaseIndex = Math.floor(percentage * 8) % 8;
  const currentPhase = MOON_PHASES[phaseIndex];

  // SVG Path Generator for Moon Phase
  // Renders the illuminated portion of the moon
  const getMoonPath = (p: number) => {
    // p is 0..1
    // 0 = New, 0.5 = Full, 1 = New
    const r = 40;
    const cx = 50;
    const cy = 50;
    
    // We draw the shape of the LIGHT.
    // The base circle is the shadow.
    
    // Northern Hemisphere: Light grows from Right to Left
    // 0..0.5 (Waxing): Right side is arc, Left side is terminator
    // 0.5..1 (Waning): Left side is arc, Right side is terminator
    
    const isWaxing = p <= 0.5;
    const sweep = isWaxing ? 1 : 0; // 1 for waxing (right side arc), 0 for waning (left side arc)
    
    // Calculate the 'bulge' of the terminator line.
    // It varies from -r to r.
    // Waxing: Starts at -r (New), goes to 0 (Quarter), to r (Full)
    // Waning: Starts at r (Full), goes to 0 (Quarter), to -r (New)
    
    // Map p to specific ranges for the elliptical arc radius x
    let rx = 0;
    
    if (isWaxing) {
        // p goes 0 -> 0.5
        // We want rx to go -40 -> 40
        // Formula: (p * 4) - 1 ?? No.
        // cos(p * 2PI) gives 1 -> -1 -> 1.
        // Let's use cosine for the visual curve width
        // p=0, cos(0)=1. p=0.25, cos(PI/2)=0. p=0.5, cos(PI)=-1.
        // We need the inverse mapping for visual "width" of the ellipse center.
        rx = r * Math.cos(p * 2 * Math.PI);
    } else {
        rx = r * Math.cos(p * 2 * Math.PI);
    }

    // Direction of the terminator arc depends on convexity
    // Waxing Crescent (0-0.25): Concave light. 
    // Waxing Gibbous (0.25-0.5): Convex light.
    // We can handle this via the sweep-flag of the inner arc or simply coordinate math.
    
    // Simplified Path Construction:
    // M 50 10 (Top)
    // Arc to 50 90 (Bottom) along the outer edge (Right for Waxing, Left for Waning)
    // Elliptical Arc back to 50 10 (Top)
    
    // Outer Arc
    const outerSweep = isWaxing ? 1 : 0; 
    const outerArc = `A ${r} ${r} 0 0 ${outerSweep} ${cx} ${cy + r}`;
    
    // Inner Terminator Arc
    // The x-radius is absolute value of width, but we flip sweep based on sign
    const innerRx = Math.abs(rx);
    const innerSweep = isWaxing ? (p < 0.25 ? 0 : 1) : (p < 0.75 ? 0 : 1);
    
    // SVG Path
    // Start top -> Outer Arc -> Bottom -> Inner Arc -> Top
    return `M ${cx} ${cy - r} ${outerArc} A ${innerRx} ${r} 0 0 ${innerSweep} ${cx} ${cy - r} Z`;
  };

  const MoonGraphic = () => {
    return (
        <div className={`relative w-48 h-48 flex items-center justify-center transition-all duration-1000 ${
            theme === 'mist' ? 'scale-110' : 'scale-100'
        }`}>
            {/* Glow Container (Mist Only) */}
            {theme === 'mist' && (
               <div className="absolute inset-0 bg-mist-accent/20 blur-[60px] rounded-full animate-pulse"></div>
            )}

            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl">
                <defs>
                    {/* Mist Glow Filter */}
                    <filter id="mistGlow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
                        <feColorMatrix in="blur" type="matrix" values="
                            1 0 0 0 0
                            0 1 0 0 0
                            0 0 1 0 0
                            0 0 0 18 -7
                        " result="goo" />
                        <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
                    </filter>
                    
                    {/* Myrtle Texture Pattern */}
                    <pattern id="craterTexture" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                         <circle cx="2" cy="2" r="1" fill="#000" fillOpacity="0.1" />
                         <circle cx="10" cy="12" r="1.5" fill="#000" fillOpacity="0.05" />
                         <circle cx="15" cy="5" r="0.8" fill="#000" fillOpacity="0.08" />
                    </pattern>
                </defs>

                {/* Base Shadow Circle (Dark Side) */}
                <circle 
                    cx="50" 
                    cy="50" 
                    r="40" 
                    fill={theme === 'myrtle' ? '#e5e7eb' : '#1a1a1a'} 
                    className="transition-colors duration-700"
                />

                {/* Illuminated Path */}
                <path 
                    d={getMoonPath(percentage)} 
                    fill={theme === 'myrtle' ? '#f3f4f6' : '#ffffff'}
                    className="transition-all duration-1000 ease-in-out"
                    filter={theme === 'mist' ? 'url(#mistGlow)' : ''}
                    opacity={theme === 'mist' ? 0.9 : 1}
                />
                
                {/* Texture Overlay (Myrtle) */}
                {theme === 'myrtle' && (
                    <circle cx="50" cy="50" r="40" fill="url(#craterTexture)" className="mix-blend-multiply opacity-40 pointer-events-none" />
                )}

                {/* Shadow Gradient Overlay for 3D effect */}
                <circle cx="50" cy="50" r="40" fill="url(#shadowGrad)" opacity="0.2" className="pointer-events-none" />
                <defs>
                   <radialGradient id="shadowGrad" cx="50%" cy="50%" r="50%" fx="30%" fy="30%">
                      <stop offset="0%" stopColor="white" stopOpacity="0" />
                      <stop offset="90%" stopColor="black" stopOpacity="0.5" />
                   </radialGradient>
                </defs>
            </svg>
        </div>
    );
  };

  return (
    <section id="moonsync" className={`py-20 theme-transition overflow-hidden relative ${
        theme === 'myrtle' ? 'bg-myrtle-bg' : 'bg-[#0f0f11]'
    }`}>
      {/* Background Ambience */}
      {theme === 'mist' && (
         <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-mist-accent/5 via-transparent to-transparent pointer-events-none"></div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`rounded-3xl p-8 md:p-12 border overflow-hidden relative theme-transition transition-all duration-500 ${
            theme === 'myrtle' 
                ? 'bg-white border-myrtle-accent/10 shadow-xl shadow-green-100/50' 
                : 'bg-white/5 border-white/10 backdrop-blur-md shadow-2xl shadow-black/50'
        }`}>
            {/* Header */}
            <div className="text-center mb-12 relative z-10">
                <span className={`text-xs font-bold uppercase tracking-[0.2em] mb-3 block ${
                    theme === 'myrtle' ? 'text-myrtle-accent' : 'text-mist-accent'
                }`}>
                    Live Cycle Tracking
                </span>
                <h2 className={`text-3xl md:text-5xl mb-4 ${
                    theme === 'myrtle' ? 'font-geo font-bold text-myrtle-text' : 'font-serif text-white'
                }`}>
                    {theme === 'myrtle' ? 'Biodynamic Gardening' : 'Lunar Energy Alignment'}
                </h2>
                <p className={`max-w-2xl mx-auto ${
                    theme === 'myrtle' ? 'text-gray-600' : 'text-gray-400'
                }`}>
                    {theme === 'myrtle' 
                     ? 'Align your planting schedule with the gravitational pull of the moon to maximize yield.' 
                     : 'Harness the cosmic tides. As the moon wanes, we release; as it waxes, we build.'}
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
                
                {/* Visual Side */}
                <div className="flex flex-col items-center justify-center order-1 md:order-1">
                    <MoonGraphic />
                    <div className="mt-8 text-center">
                        <div className={`text-2xl font-bold tracking-widest uppercase mb-1 ${
                            theme === 'myrtle' ? 'font-geo text-myrtle-text' : 'font-serif text-white'
                        }`}>
                            {currentPhase.name}
                        </div>
                        <div className={`text-xs font-mono opacity-50 ${theme === 'myrtle' ? 'text-gray-500' : 'text-gray-400'}`}>
                            {(percentage * 100).toFixed(1)}% Illuminated
                        </div>
                    </div>
                </div>

                {/* Content Side */}
                <div className="text-center md:text-left order-2 md:order-2">
                    <div className={`p-8 rounded-2xl border mb-8 transition-colors duration-500 relative overflow-hidden group ${
                        theme === 'myrtle' 
                            ? 'bg-myrtle-secondary/30 border-myrtle-accent/20 hover:border-myrtle-accent/40' 
                            : 'bg-mist-secondary border-mist-accent/20 hover:border-mist-accent/40'
                    }`}>
                        <div className={`absolute top-0 left-0 w-1 h-full transition-colors ${
                            theme === 'myrtle' ? 'bg-myrtle-accent' : 'bg-mist-accent'
                        }`}></div>

                        <span className={`text-[10px] font-bold uppercase tracking-wider block mb-3 opacity-70 ${
                            theme === 'myrtle' ? 'text-myrtle-text' : 'text-white'
                        }`}>
                            Current Action
                        </span>
                        <h3 className={`text-3xl font-bold mb-4 leading-tight ${
                            theme === 'myrtle' ? 'text-myrtle-accent font-geo' : 'text-mist-accent font-serif'
                        }`}>
                            {theme === 'myrtle' ? currentPhase.myrtleAction : currentPhase.mistAction}
                        </h3>
                        <p className={`text-sm leading-relaxed ${
                            theme === 'myrtle' ? 'text-gray-700' : 'text-gray-300'
                        }`}>
                            {theme === 'myrtle' ? currentPhase.myrtleDesc : currentPhase.mistDesc}
                        </p>
                    </div>

                    <button className={`px-8 py-4 rounded-sm text-xs font-bold uppercase tracking-[0.15em] transition-all hover:-translate-y-1 ${
                        theme === 'myrtle'
                            ? 'bg-myrtle-text text-white hover:bg-myrtle-accent shadow-lg shadow-gray-200'
                            : 'bg-white/5 text-white hover:bg-mist-accent hover:text-mist-bg border border-white/20 shadow-lg shadow-black/20'
                    }`}>
                        {theme === 'myrtle' ? 'View Full Calendar' : 'Start Moon Ritual'}
                    </button>
                </div>
            </div>
            
            {/* Decorative Background Blur */}
            {theme === 'mist' && (
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-900/20 rounded-full blur-[100px] pointer-events-none -ml-20 -mb-20"></div>
            )}
        </div>
      </div>
    </section>
  );
};

export default MoonSync;
