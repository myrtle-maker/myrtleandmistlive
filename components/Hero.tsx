'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from './ThemeContext';
import { THEME_CONTENT } from '../data/themeContent';

const Hero: React.FC = () => {
  const { theme } = useTheme();
  const content = THEME_CONTENT[theme];
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden theme-transition bg-gray-900">
      {/* Myrtle Background */}
      <div className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out ${
        theme === 'myrtle' ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}>
        <div className="absolute inset-0 bg-gradient-to-br from-[#f0fdf4] via-[#fffbeb] to-[#fff7ed]"></div>
        <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-gradient-to-b from-yellow-50 via-white to-transparent opacity-80 rounded-full blur-3xl"></div>
        <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-lime-300/30 rounded-full mix-blend-multiply filter blur-[60px] animate-blob" style={{ animationDuration: '35s' }}></div>
        <div className="absolute top-[30%] right-[10%] w-[600px] h-[600px] bg-amber-200/40 rounded-full mix-blend-multiply filter blur-[80px] animate-blob" style={{ animationDelay: '5s', animationDuration: '45s' }}></div>
        <div className="absolute -bottom-32 left-[30%] w-[700px] h-[700px] bg-emerald-100/50 rounded-full mix-blend-multiply filter blur-[70px] animate-blob" style={{ animationDelay: '8s', animationDuration: '40s' }}></div>
        <div className="absolute inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
      </div>

      {/* Mist Background */}
      <div className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out ${
        theme === 'mist' ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}>
        <div className="absolute inset-0 bg-[#020617]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a] via-transparent to-[#020617] opacity-90"></div>
        <div className="absolute top-[20%] left-[20%] w-[800px] h-[800px] bg-indigo-900/40 rounded-full mix-blend-screen filter blur-[120px] animate-blob" style={{ animationDuration: '60s' }}></div>
        <div className="absolute bottom-[10%] right-[10%] w-[600px] h-[600px] bg-violet-900/30 rounded-full mix-blend-screen filter blur-[100px] animate-blob" style={{ animationDelay: '5s', animationDuration: '50s' }}></div>
        <div className="absolute top-[40%] left-[-10%] w-[500px] h-[500px] bg-slate-800/40 rounded-full mix-blend-screen filter blur-[90px] animate-blob" style={{ animationDelay: '2s', animationDuration: '45s' }}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-80"></div>
        <div className="absolute inset-0 opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      </div>

      <div className="relative z-20 text-center px-4 max-w-5xl mx-auto mt-16">
        <div className="overflow-hidden mb-6">
          <span className={`block text-xs md:text-sm tracking-[0.4em] uppercase font-bold transition-all duration-700 transform ${
            theme === 'myrtle'
              ? 'text-myrtle-accent translate-y-0 opacity-100'
              : 'text-mist-accent/80 translate-y-0 opacity-100'
          }`}>
            {content.tagline}
          </span>
        </div>

        <h1 className={`mb-8 transition-all duration-700 ${
          theme === 'myrtle'
            ? 'font-geo text-5xl md:text-7xl lg:text-8xl font-black text-myrtle-text tracking-tighter drop-shadow-sm'
            : 'font-serif text-5xl md:text-7xl lg:text-8xl text-white tracking-wide drop-shadow-2xl'
        }`}>
          {theme === 'mist' ? (
            <span className="block animate-fade-in-up">
              Breathe in the <span className="italic font-light text-mist-accent opacity-90">Silence</span>
            </span>
          ) : (
            <span className="block animate-fade-in-up">
              Bring <span className="text-transparent bg-clip-text bg-gradient-to-r from-myrtle-accent to-green-600">Life</span> Inside
            </span>
          )}
        </h1>

        <div className={`h-px w-24 mx-auto mb-8 transition-colors duration-700 ${
          theme === 'myrtle' ? 'bg-myrtle-text/20' : 'bg-white/20'
        }`}></div>

        <p className={`text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed transition-all duration-700 ${
          theme === 'myrtle'
            ? 'text-myrtle-text/80 font-medium'
            : 'text-gray-300 font-light tracking-wide'
        }`}>
          {content.subheadline}
        </p>

        <div className="flex justify-center items-center gap-4">
          <button
            onClick={() => router.push('/the-guide')}
            className={`px-10 py-4 rounded-sm font-bold uppercase tracking-widest text-xs transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 ${
              theme === 'myrtle'
                ? 'bg-myrtle-accent text-white hover:bg-myrtle-text ring-1 ring-myrtle-accent'
                : 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm border border-white/30'
            }`}
          >
            {theme === 'myrtle' ? 'Discover The Guide' : 'Begin Your Practice'}
          </button>
        </div>
      </div>

      <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce transition-colors duration-700 ${
        theme === 'myrtle' ? 'text-myrtle-text/40' : 'text-white/30'
      }`}>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  );
};

export default Hero;
