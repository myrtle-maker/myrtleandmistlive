
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useTheme } from './ThemeContext';
import { MEDITATION_QUOTES, BREATHING_PATTERNS } from '../data/themeContent';
import { MIST_PRODUCTS } from '../data/products';

interface Particle {
  id: number;
  angle: number; // in radians
  distance: number; // base distance from center
  size: number;
  speed: number;
}

const MeditationTool: React.FC = () => {
  const { theme } = useTheme();
  
  // State
  const [quote, setQuote] = useState('');
  const [activePatternIdx, setActivePatternIdx] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'Inhale' | 'Hold' | 'Exhale' | 'Rest'>('Inhale');
  const [timerDisplay, setTimerDisplay] = useState(0);

  // Interaction State
  const [ripples, setRipples] = useState<{id: number}[]>([]);
  const [isContracting, setIsContracting] = useState(false);

  // Refs for timer management
  const phaseRef = useRef('Inhale');
  const timeoutRef = useRef<number | null>(null);

  const activePattern = BREATHING_PATTERNS[activePatternIdx];

  // Select recommended products based on theme
  // Mist: Essential Oils (id 6), Tea Set (id 3)
  // Myrtle: Coastal Pine Candle (id 1), Lavender Spray (id 2) - Botanical scents
  const recommendedProducts = useMemo(() => {
    return theme === 'mist' 
      ? [MIST_PRODUCTS.find(p => p.id === 6), MIST_PRODUCTS.find(p => p.id === 3)]
      : [MIST_PRODUCTS.find(p => p.id === 1), MIST_PRODUCTS.find(p => p.id === 2)];
  }, [theme]);

  // Particle System
  const particles = useMemo(() => {
    return Array.from({ length: 36 }).map((_, i) => ({
      id: i,
      angle: (Math.PI * 2 * i) / 36, // Distribute evenly
      distance: 120 + Math.random() * 80, // Start outside the orb (radius ~96px)
      size: 3 + Math.random() * 4,
      speed: 0.5 + Math.random() * 0.5,
      delay: Math.random() * 2
    }));
  }, []);

  // Random Quote on Mount/Theme Change
  useEffect(() => {
    const quotes = MEDITATION_QUOTES[theme];
    const random = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(random);
    stopBreathing(); // Reset breathing on theme change
  }, [theme]);

  const stopBreathing = () => {
    setIsActive(false);
    setPhase('Inhale');
    phaseRef.current = 'Inhale';
    setTimerDisplay(activePattern.inhale);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const startBreathing = () => {
    setIsActive(true);
    runPhase('Inhale');
  };

  const runPhase = (currentPhase: 'Inhale' | 'Hold' | 'Exhale' | 'Rest') => {
    phaseRef.current = currentPhase;
    setPhase(currentPhase);

    let duration = 0;
    let nextPhase: 'Inhale' | 'Hold' | 'Exhale' | 'Rest' = 'Inhale';

    switch (currentPhase) {
      case 'Inhale':
        duration = activePattern.inhale;
        nextPhase = activePattern.hold > 0 ? 'Hold' : 'Exhale';
        break;
      case 'Hold':
        duration = activePattern.hold;
        nextPhase = 'Exhale';
        break;
      case 'Exhale':
        duration = activePattern.exhale;
        nextPhase = activePattern.holdEmpty > 0 ? 'Rest' : 'Inhale';
        break;
      case 'Rest':
         duration = activePattern.holdEmpty;
         nextPhase = 'Inhale';
         break;
    }

    setTimerDisplay(duration);
    
    timeoutRef.current = window.setTimeout(() => {
        if (isActive) return; 
        runPhase(nextPhase);
    }, duration * 1000);
  };

  // Cleanup
  useEffect(() => {
    return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Update timer display for start state when pattern changes
  useEffect(() => {
      if (!isActive) {
          setTimerDisplay(activePattern.inhale);
      }
  }, [activePatternIdx, isActive]);

  // Handle Orb Interactions
  const handleOrbClick = () => {
    const isExpansionPhase = phase === 'Inhale' || phase === 'Hold' || !isActive;

    if (isExpansionPhase) {
        // Trigger Outward Ripple
        const id = Date.now();
        setRipples(prev => [...prev, { id }]);
        // Remove ripple after animation completes (1s for animate-ping)
        setTimeout(() => {
            setRipples(prev => prev.filter(r => r.id !== id));
        }, 1000);
    } else {
        // Trigger Inward Contraction
        setIsContracting(true);
        setTimeout(() => setIsContracting(false), 300);
    }
  };

  // Dynamic Styles
  const getPhaseDuration = () => {
      if (!isActive) return '0.5s';
      switch (phase) {
          case 'Inhale': return `${activePattern.inhale}s`;
          case 'Exhale': return `${activePattern.exhale}s`;
          default: return '0s'; // Holds shouldn't transition movement
      }
  };

  const isExpanded = isActive && (phase === 'Inhale' || phase === 'Hold');
  
  // Calculate scale: Base Breathing Scale * Contraction Interaction Factor
  const baseScale = isExpanded ? 1.5 : 1;
  const interactionScale = isContracting ? 0.9 : 1;
  const currentScale = baseScale * interactionScale;

  // SVG Progress Ring Calculations
  const radius = 136; // Radius of the progress ring
  const circumference = 2 * Math.PI * radius;
  
  const getProgressStyle = () => {
    if (!isActive) return { strokeDashoffset: circumference, transition: 'none' };

    let offset = circumference;
    let duration = '0s';

    switch (phase) {
      case 'Inhale':
        offset = 0; // Fill up
        duration = `${activePattern.inhale}s`;
        break;
      case 'Hold':
        offset = 0; // Stay full
        duration = '0s';
        break;
      case 'Exhale':
        offset = circumference; // Empty out
        duration = `${activePattern.exhale}s`;
        break;
      case 'Rest':
        offset = circumference; // Stay empty
        duration = '0s';
        break;
    }

    return {
      strokeDashoffset: offset,
      transition: `stroke-dashoffset ${duration} linear`
    };
  };

  return (
    <section id="breathe" className={`py-24 theme-transition overflow-hidden relative ${
      theme === 'myrtle' ? 'bg-gradient-to-b from-white to-green-50' : 'bg-gray-900'
    }`}>
      {/* Background Decor */}
      <div className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
         {theme === 'myrtle' ? (
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-green-100/40 via-transparent to-transparent animate-pulse" style={{ animationDuration: '4s' }}></div>
         ) : (
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900/40 via-transparent to-transparent animate-pulse" style={{ animationDuration: '4s' }}></div>
         )}
      </div>

      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        
        {/* Quote Section */}
        <div className="mb-16 animate-fade-in-up">
           <svg className={`w-8 h-8 mx-auto mb-6 opacity-50 ${theme === 'myrtle' ? 'text-myrtle-accent' : 'text-mist-accent'}`} fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.8954 13.1216 16 12.017 16H11.983C10.8784 16 9.983 16.8954 9.983 18L9.983 21H2.00003V11C2.00003 5.47715 6.47718 1 12 1C17.5229 1 22 5.47715 22 11V21H14.017ZM12 3C7.58175 3 4.00003 6.58172 4.00003 11V19H7.98303V18C7.98303 15.7909 9.77389 14 11.983 14H12.017C14.2262 14 16.017 15.7909 16.017 18V19H20V11C20 6.58172 16.4183 3 12 3Z"></path></svg>
           <blockquote className={`text-xl md:text-3xl font-serif italic max-w-2xl mx-auto leading-relaxed transition-colors duration-500 ${
             theme === 'myrtle' ? 'text-myrtle-text' : 'text-white'
           }`}>
             "{quote}"
           </blockquote>
        </div>

        {/* Meditation Visualizer Area */}
        <div className="relative h-[400px] flex items-center justify-center mb-12">
            
            {/* --- PARTICLE SYSTEM --- */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {particles.map((p) => {
                 // Logic: 
                 // Inhale (Expanded): Particles move to outer distance (emit)
                 // Exhale (Contracted): Particles move to 0 (converge)
                 const expansionFactor = isExpanded ? 1 : 0; 
                 const x = Math.cos(p.angle) * p.distance * expansionFactor;
                 const y = Math.sin(p.angle) * p.distance * expansionFactor;
                 
                 // Grow scale when moving out, shrink when moving in
                 const scale = isExpanded ? 1.5 : 0.5;

                 return (
                   <div
                     key={p.id}
                     className={`absolute rounded-full transition-all ease-in-out ${
                       theme === 'myrtle' 
                         ? 'bg-yellow-400/60 shadow-[0_0_10px_rgba(250,204,21,0.4)]' 
                         : 'bg-blue-300/60 shadow-[0_0_15px_rgba(147,197,253,0.6)] blur-[1px]'
                     }`}
                     style={{
                       width: p.size,
                       height: p.size,
                       transform: `translate(${x}px, ${y}px) scale(${scale})`,
                       transitionDuration: getPhaseDuration(),
                       // Fade in when emitting, fade out when converging/center
                       opacity: isActive ? (isExpanded ? 0.8 : 0.0) : 0,
                     }}
                   />
                 );
              })}
            </div>

            {/* --- SVG PROGRESS RING --- */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
               <svg width="400" height="400" className="transform -rotate-90">
                  {/* Background Track */}
                  <circle
                    cx="200"
                    cy="200"
                    r={radius}
                    fill="none"
                    strokeWidth="2"
                    className={`transition-colors duration-500 ${theme === 'myrtle' ? 'stroke-gray-200' : 'stroke-white/10'}`}
                  />
                  {/* Progress Indicator */}
                  <circle
                    cx="200"
                    cy="200"
                    r={radius}
                    fill="none"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    style={getProgressStyle()}
                    className={`${theme === 'myrtle' ? 'stroke-myrtle-accent' : 'stroke-mist-accent'}`}
                  />
               </svg>
            </div>

            {/* --- CENTER ORB --- */}
            <div 
              onClick={handleOrbClick}
              className={`w-48 h-48 rounded-full flex items-center justify-center relative z-10 cursor-pointer transition-all ease-in-out select-none ${
                 theme === 'myrtle' 
                   ? 'bg-gradient-to-br from-green-300 to-emerald-500 shadow-2xl shadow-green-200 hover:shadow-green-300' 
                   : 'bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-500 shadow-[0_0_60px_rgba(139,92,246,0.4)] hover:shadow-[0_0_80px_rgba(139,92,246,0.6)]'
              }`}
              style={{ 
                  transform: `scale(${currentScale})`,
                  transitionDuration: isContracting ? '0.3s' : getPhaseDuration(),
                  transitionProperty: 'transform, box-shadow'
              }}
            >
               {/* Inner Text Content */}
               <div className="text-white font-bold text-center pointer-events-none relative z-20">
                  <div className={`text-sm uppercase tracking-widest mb-1 transition-opacity duration-300 ${isActive ? 'opacity-90' : 'opacity-60'}`}>
                      {isActive ? phase : 'Start'}
                  </div>
                  {/* Icon */}
                  {!isActive && (
                     <svg className="w-6 h-6 mx-auto animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  )}
               </div>

               {/* Decorative Rings */}
               <div className={`absolute inset-0 rounded-full border border-white/30 transition-all duration-1000 ${isExpanded ? 'scale-110 opacity-50' : 'scale-90 opacity-100'}`}></div>
               <div className={`absolute inset-0 rounded-full border border-white/20 transition-all duration-1000 delay-75 ${isExpanded ? 'scale-125 opacity-30' : 'scale-75 opacity-100'}`}></div>

               {/* Interactive Ripples */}
               {ripples.map((r) => (
                   <div 
                      key={r.id}
                      className={`absolute inset-0 rounded-full border-2 opacity-50 animate-ping ${
                          theme === 'myrtle' ? 'border-yellow-200' : 'border-white'
                      }`}
                      style={{ animationDuration: '1s' }}
                   />
               ))}
            </div>

            {/* Outer Glow Ripples (Theme Specific) */}
            {theme === 'mist' && isActive && (
                <div className={`absolute w-48 h-48 bg-purple-500/10 rounded-full blur-3xl transition-all ease-in-out ${
                    isExpanded ? 'scale-[3] opacity-60' : 'scale-100 opacity-0'
                }`} style={{ transitionDuration: getPhaseDuration() }}></div>
            )}
            
            {theme === 'myrtle' && isActive && (
                <div className={`absolute w-48 h-48 border-2 border-green-200/50 rounded-full transition-all ease-in-out ${
                    isExpanded ? 'scale-[2.2] opacity-0' : 'scale-50 opacity-100'
                }`} style={{ transitionDuration: getPhaseDuration() }}></div>
            )}
        </div>

        {/* Controls Container */}
        <div className={`inline-block p-8 rounded-2xl border backdrop-blur-md theme-transition shadow-lg mx-auto w-full max-w-md ${
            theme === 'myrtle' ? 'bg-white/80 border-white shadow-green-100/50' : 'bg-white/5 border-white/10 shadow-black/40'
        }`}>
            {/* Pattern Selector */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
                {BREATHING_PATTERNS.map((pattern, idx) => (
                    <button
                        key={pattern.name}
                        onClick={() => {
                            setActivePatternIdx(idx);
                            stopBreathing();
                        }}
                        className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all transform hover:scale-105 ${
                            activePatternIdx === idx
                                ? (theme === 'myrtle' ? 'bg-myrtle-accent text-white shadow-lg' : 'bg-mist-accent text-mist-bg shadow-lg shadow-mist-accent/30')
                                : (theme === 'myrtle' ? 'bg-gray-100 text-gray-500 hover:bg-gray-200' : 'bg-white/5 text-gray-400 hover:bg-white/10')
                        }`}
                    >
                        {pattern.name}
                    </button>
                ))}
            </div>

            {/* Action Button */}
            <button
                onClick={isActive ? stopBreathing : startBreathing}
                className={`w-full py-4 rounded-xl text-sm font-bold uppercase tracking-[0.2em] transition-all transform active:scale-[0.98] ${
                    isActive 
                        ? 'bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white border border-red-500/20'
                        : (theme === 'myrtle' 
                            ? 'bg-gradient-to-r from-myrtle-accent to-green-700 text-white hover:shadow-xl hover:-translate-y-1' 
                            : 'bg-white text-mist-bg hover:bg-mist-accent hover:text-white hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:-translate-y-1')
                }`}
            >
                {isActive ? 'End Session' : 'Begin Practice'}
            </button>
            
            <p className={`mt-4 text-xs opacity-50 ${theme === 'myrtle' ? 'text-myrtle-text' : 'text-white'}`}>
                Pattern: {activePattern.inhale}s In • {activePattern.hold}s Hold • {activePattern.exhale}s Out
            </p>
        </div>

        {/* Recommended Products */}
        <div className="mt-16 border-t border-white/10 pt-8 max-w-2xl mx-auto">
          <h4 className={`text-xs font-bold uppercase tracking-widest mb-6 ${
              theme === 'myrtle' ? 'text-myrtle-text/60' : 'text-white/60'
          }`}>
              Enhance Your Practice
          </h4>
          <div className="grid grid-cols-2 gap-4">
              {recommendedProducts.filter(Boolean).map(product => (
                  <a 
                      key={product!.id} 
                      href={product!.affiliateUrl}
                      target="_blank"
                      rel="noreferrer"
                      className={`flex items-center gap-4 p-3 rounded-xl border transition-all hover:-translate-y-1 group ${
                          theme === 'myrtle' 
                              ? 'bg-white/60 border-gray-100 hover:border-myrtle-accent/30 hover:shadow-md' 
                              : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-mist-accent/30'
                      }`}
                  >
                      <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0">
                          <img src={product!.image} alt={product!.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="text-left">
                          <h5 className={`text-sm font-bold leading-tight group-hover:underline decoration-1 underline-offset-2 ${
                              theme === 'myrtle' ? 'text-myrtle-text' : 'text-white'
                          }`}>
                              {product!.name}
                          </h5>
                          <span className={`text-[10px] uppercase tracking-wider opacity-60 ${
                              theme === 'myrtle' ? 'text-gray-600' : 'text-gray-400'
                          }`}>
                              View Item
                          </span>
                      </div>
                  </a>
              ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default MeditationTool;
