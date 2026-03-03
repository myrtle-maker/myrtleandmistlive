import React from 'react';
import { useTheme } from './ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-all duration-500 hover:scale-110 focus:outline-none theme-transition ${
        theme === 'myrtle' 
          ? 'bg-myrtle-accent text-white hover:bg-myrtle-text' 
          : 'bg-mist-accent text-mist-bg hover:bg-mist-text hover:text-mist-bg'
      }`}
      aria-label="Toggle Theme"
    >
      <div className="relative w-6 h-6">
        {/* Sun Icon (Myrtle) */}
        <svg 
          className={`absolute inset-0 w-6 h-6 transform transition-transform duration-700 ${
            theme === 'myrtle' ? 'rotate-0 opacity-100' : 'rotate-90 opacity-0'
          }`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>

        {/* Moon Icon (Mist) */}
        <svg 
          className={`absolute inset-0 w-6 h-6 transform transition-transform duration-700 ${
            theme === 'mist' ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'
          }`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      </div>
    </button>
  );
};

export default ThemeToggle;