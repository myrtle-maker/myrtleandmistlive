
import React from 'react';
import { useTheme } from './ThemeContext';

interface LogoProps {
  className?: string;
  iconClassName?: string;
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "", iconClassName = "w-10 h-10", showText = true }) => {
  const { theme } = useTheme();

  return (
    <div className={`flex items-center gap-4 select-none ${className}`}>
      <div className={`relative ${iconClassName}`}>
         
         {/* Myrtle Icon: Geometric Monstera Line Art */}
         <svg 
            viewBox="0 0 24 24" 
            className={`absolute inset-0 w-full h-full transition-all duration-700 ease-in-out ${
                theme === 'myrtle' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'
            }`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
         >
            {/* Stem */}
            <path d="M12 22C12 22 12 18 12 15" className="origin-bottom transition-all duration-1000 delay-100" />
            {/* Leaf Body */}
            <path d="M12 15C8 15 5 12 5 8C5 5 7 2 12 2C17 2 19 5 19 8C19 12 16 15 12 15Z" />
            {/* Veins / Fenestrations */}
            <path d="M12 5V10" strokeWidth="1.5" />
            <path d="M9 7L7 6" />
            <path d="M15 7L17 6" />
            <path d="M9 11L7 12" />
            <path d="M15 11L17 12" />
         </svg>

         {/* Mist Icon: Alchemical Moon & Cloud */}
         <svg 
            viewBox="0 0 24 24" 
            className={`absolute inset-0 w-full h-full transition-all duration-700 ease-in-out ${
                theme === 'mist' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-50'
            }`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
         >
            {/* Crescent Moon */}
            <path d="M12 3C10 3 5 6 5 12C5 15 7 18 12 21" className="opacity-40" />
            <path d="M12 3C15 3 19 6 19 12C19 14 18 16 17 17.5" />
            
            {/* Mist/Cloud Formation */}
            <path d="M6 16C6 16 7 14 9 14C11 14 12 16 14 16C16 16 17 14 19 14" />
            <path d="M4 19C4 19 6 17 9 17C12 17 14 19 17 19C20 19 21 17 21 17" className="opacity-70" />
            
            {/* Sparkle */}
            <path d="M15 6L15.5 7L16.5 7.5L15.5 8L15 9L14.5 8L13.5 7.5L14.5 7L15 6Z" fill="currentColor" stroke="none" />
         </svg>
      </div>

      {showText && (
        <div className="flex flex-col justify-center">
            <span className={`text-xl transition-all duration-700 leading-none ${
                theme === 'myrtle' 
                  ? 'font-geo font-black tracking-[0.15em] uppercase text-lg' 
                  : 'font-serif italic font-medium tracking-wide text-2xl'
            }`}>
                Myrtle <span className={`align-middle text-sm px-1 transition-colors ${theme === 'myrtle' ? 'text-myrtle-accent' : 'text-mist-accent'}`}>&</span> Mist
            </span>
            <span className={`text-[0.6rem] uppercase tracking-[0.3em] opacity-60 transition-all duration-700 ${
              theme === 'myrtle' ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0 h-0 overflow-hidden'
            }`}>
              Botanical Living
            </span>
             <span className={`text-[0.6rem] uppercase tracking-[0.3em] opacity-60 transition-all duration-700 ${
              theme === 'mist' ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0 h-0 overflow-hidden'
            }`}>
              Soulful Living
            </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
