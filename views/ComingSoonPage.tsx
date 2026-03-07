'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '../components/ThemeContext';

const ComingSoonPage: React.FC = () => {
  const { theme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    document.title = 'Coming Soon | Myrtle & Mist';
  }, []);

  return (
    <>
      <div className={`min-h-[70vh] flex flex-col items-center justify-center py-24 px-4 theme-transition ${
        theme === 'myrtle' ? 'bg-myrtle-bg text-myrtle-text' : 'bg-mist-bg text-mist-text'
      }`}>
        <span className={`text-xs font-bold uppercase tracking-[0.2em] mb-6 opacity-50 ${
          theme === 'myrtle' ? 'text-myrtle-accent' : 'text-mist-accent'
        }`}>
          Coming Soon
        </span>

        <h1 className={`text-4xl md:text-5xl mb-4 text-center ${
          theme === 'myrtle' ? 'font-geo font-bold' : 'font-serif'
        }`}>
          Under Construction
        </h1>

        <p className="opacity-50 mb-2 text-sm font-mono">{pathname}</p>

        <p className="opacity-60 mb-10 max-w-sm text-center leading-relaxed">
          {theme === 'myrtle'
            ? 'This section is still growing. Check back soon for expert plant care content.'
            : 'This corner of the mist is still forming. Return when the time is right.'}
        </p>

        <Link
          href="/"
          className={`text-sm uppercase tracking-widest border-b pb-0.5 transition-colors ${
            theme === 'myrtle'
              ? 'text-myrtle-accent border-myrtle-accent hover:text-myrtle-text hover:border-myrtle-text'
              : 'text-mist-accent border-mist-accent hover:text-white hover:border-white'
          }`}
        >
          Return Home
        </Link>
      </div>
    </>
  );
};

export default ComingSoonPage;
