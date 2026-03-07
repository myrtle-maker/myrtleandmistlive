'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from './ThemeContext';
import { LIGHT_ZONES } from '../data/lightZones';

type ObstructionType = 'none' | 'sheer' | 'trees' | 'blinds';

const LightArchitect: React.FC = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const [distance, setDistance] = useState(2);
  const [direction, setDirection] = useState<'N' | 'E' | 'S' | 'W'>('S');
  const [obstruction, setObstruction] = useState<ObstructionType>('none');

  const windowIntensities = {
    'S': 2000,
    'W': 1500,
    'E': 1000,
    'N': 500,
  };

  const obstructionMultipliers: Record<ObstructionType, number> = {
    'none': 1.0,
    'sheer': 0.6,
    'trees': 0.5,
    'blinds': 0.25,
  };

  const calculateLux = (dist: number, dir: 'N' | 'E' | 'S' | 'W', obs: ObstructionType) => {
    const sourceIntensity = windowIntensities[dir];
    const modifier = obstructionMultipliers[obs];
    const rawFc = (sourceIntensity * modifier) / Math.pow(Math.max(dist, 0.5), 2);
    return Math.min(Math.round(rawFc), 10000);
  };

  const currentFc = useMemo(() => calculateLux(distance, direction, obstruction), [distance, direction, obstruction]);

  const currentZone = useMemo(() => {
    return LIGHT_ZONES.find(z => currentFc >= z.minFc) || LIGHT_ZONES[LIGHT_ZONES.length - 1];
  }, [currentFc]);

  const gaugeMax = 2000;
  const gaugePercent = Math.min(currentFc / gaugeMax, 1);
  const radius = 80;
  const arcLength = Math.PI * radius;
  const strokeDashoffset = arcLength * (1 - gaugePercent);

  return (
    <section id="tools" className={`py-20 theme-transition ${
      theme === 'myrtle' ? 'bg-myrtle-secondary' : 'bg-gray-950'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid lg:grid-cols-12 gap-0 rounded-3xl overflow-hidden shadow-2xl theme-transition border ${
          theme === 'myrtle'
            ? 'bg-white border-white shadow-green-100/50'
            : 'bg-mist-bg border-white/10 shadow-black/60'
        }`}>

          {/* LEFT: CONTROL CENTER */}
          <div className={`lg:col-span-5 p-8 md:p-10 flex flex-col relative z-20 ${
            theme === 'myrtle' ? 'bg-gray-50' : 'bg-white/5 backdrop-blur-md'
          }`}>
            <div className="mb-8">
              <span className={`text-xs font-bold uppercase tracking-[0.2em] mb-2 block ${
                theme === 'myrtle' ? 'text-myrtle-accent' : 'text-mist-accent'
              }`}>
                Light Architect
              </span>
              <h2 className={`text-3xl font-bold leading-tight ${
                theme === 'myrtle' ? 'text-myrtle-text font-geo' : 'text-white font-serif'
              }`}>
                Configure Your Space
              </h2>
            </div>

            {/* 1. Window Direction */}
            <div className="mb-8">
              <label className={`text-xs font-bold uppercase mb-3 block opacity-70 ${
                theme === 'myrtle' ? 'text-myrtle-text' : 'text-white'
              }`}>
                1. Window Direction
              </label>
              <div className="grid grid-cols-4 gap-2">
                {(['N', 'E', 'S', 'W'] as const).map(dir => (
                  <button
                    key={dir}
                    onClick={() => setDirection(dir)}
                    className={`py-3 rounded-lg text-sm font-bold transition-all ${
                      direction === dir
                        ? (theme === 'myrtle' ? 'bg-myrtle-accent text-white shadow-lg' : 'bg-mist-accent text-mist-bg shadow-lg shadow-mist-accent/20')
                        : (theme === 'myrtle' ? 'bg-white border border-gray-200 text-gray-500 hover:border-myrtle-accent' : 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10')
                    }`}
                  >
                    {dir}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Obstructions */}
            <div className="mb-8">
              <label className={`text-xs font-bold uppercase mb-3 block opacity-70 ${
                theme === 'myrtle' ? 'text-myrtle-text' : 'text-white'
              }`}>
                2. Obstructions
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'none', label: 'Unobstructed' },
                  { id: 'sheer', label: 'Sheer Curtains' },
                  { id: 'trees', label: 'Trees / Buildings' },
                  { id: 'blinds', label: 'Blinds / Screens' },
                ].map((obs) => (
                  <button
                    key={obs.id}
                    onClick={() => setObstruction(obs.id as ObstructionType)}
                    className={`py-3 px-4 rounded-lg text-xs font-bold text-left transition-all flex items-center justify-between ${
                      obstruction === obs.id
                        ? (theme === 'myrtle' ? 'bg-green-100 text-myrtle-accent border-green-200 border' : 'bg-white/10 text-white border-white/20 border')
                        : (theme === 'myrtle' ? 'bg-white border border-gray-200 text-gray-500 hover:bg-gray-50' : 'bg-transparent border border-white/10 text-gray-400 hover:bg-white/5')
                    }`}
                  >
                    {obs.label}
                    {obstruction === obs.id && (
                      <div className={`w-2 h-2 rounded-full ${theme === 'myrtle' ? 'bg-myrtle-accent' : 'bg-mist-accent'}`}></div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Distance Slider */}
            <div className="mb-4">
              <div className={`flex justify-between text-xs font-bold uppercase mb-3 opacity-70 ${
                theme === 'myrtle' ? 'text-myrtle-text' : 'text-white'
              }`}>
                <span>3. Distance from Glass</span>
                <span>{distance} ft</span>
              </div>
              <div className="relative h-12 flex items-center">
                <div className={`absolute w-full h-2 rounded-full ${
                  theme === 'myrtle'
                    ? 'bg-gradient-to-r from-yellow-400 to-gray-200'
                    : 'bg-gradient-to-r from-indigo-400 to-gray-800'
                }`}></div>
                <input
                  type="range"
                  min="0.5"
                  max="10"
                  step="0.5"
                  value={distance}
                  onChange={(e) => setDistance(parseFloat(e.target.value))}
                  className="w-full absolute z-10 opacity-0 cursor-pointer h-full"
                />
                <div
                  className={`absolute h-6 w-6 rounded-full border-2 shadow-lg flex items-center justify-center pointer-events-none transition-all duration-75 ${
                    theme === 'myrtle' ? 'bg-white border-myrtle-accent' : 'bg-mist-bg border-mist-accent'
                  }`}
                  style={{ left: `calc(${((distance - 0.5) / 9.5) * 100}% - 12px)` }}
                >
                  <div className={`w-2 h-2 rounded-full ${theme === 'myrtle' ? 'bg-myrtle-accent' : 'bg-mist-accent'}`}></div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: RESULTS DASHBOARD */}
          <div className={`lg:col-span-7 p-8 md:p-10 relative flex flex-col ${
            theme === 'myrtle' ? 'bg-white' : 'bg-black/40'
          }`}>
            <div className={`absolute inset-0 pointer-events-none opacity-20 ${
              theme === 'myrtle'
                ? 'bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-yellow-200 via-transparent to-transparent'
                : 'bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-500 via-transparent to-transparent'
            }`}></div>

            {/* Gauge & Zone Info */}
            <div className="flex flex-col md:flex-row gap-8 mb-10 items-center md:items-start relative z-10">
              <div className="relative w-48 h-32 flex flex-col items-center justify-end shrink-0">
                <svg viewBox="0 0 200 110" className="w-full h-full">
                  <defs>
                    <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor={theme === 'myrtle' ? '#08503C' : '#4f46e5'} />
                      <stop offset="100%" stopColor={theme === 'myrtle' ? '#facc15' : '#a855f7'} />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 20 100 A 80 80 0 0 1 180 100"
                    fill="none"
                    stroke={theme === 'myrtle' ? '#e5e7eb' : '#333'}
                    strokeWidth="20"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 20 100 A 80 80 0 0 1 180 100"
                    fill="none"
                    stroke={theme === 'myrtle' ? 'url(#gaugeGrad)' : '#B099D0'}
                    strokeWidth="20"
                    strokeLinecap="round"
                    strokeDasharray={arcLength}
                    strokeDashoffset={strokeDashoffset}
                    className="transition-all duration-700 ease-out"
                  />
                </svg>
                <div className="absolute bottom-0 text-center w-full translate-y-1/2">
                  <span className={`text-3xl font-bold block leading-none ${
                    theme === 'myrtle' ? 'text-myrtle-text' : 'text-white'
                  }`}>
                    {currentFc}
                  </span>
                  <span className="text-[10px] uppercase font-bold opacity-50 whitespace-nowrap block mt-1">Foot Candles</span>
                </div>
              </div>

              <div className="flex-grow text-center md:text-left mt-6 md:mt-0">
                <div className={`inline-block px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider mb-3 ${
                  theme === 'myrtle' ? 'bg-myrtle-secondary text-myrtle-accent' : 'bg-white/10 text-mist-accent'
                }`}>
                  Current Zone
                </div>
                <h3 className={`text-3xl font-bold mb-2 ${
                  theme === 'myrtle' ? 'text-myrtle-text font-geo' : 'text-white font-serif'
                }`}>
                  {currentZone.label}
                </h3>
                <p className={`text-sm opacity-70 italic ${
                  theme === 'myrtle' ? 'text-gray-600' : 'text-gray-400'
                }`}>
                  "{currentZone.description}"
                </p>
              </div>
            </div>

            {/* Range Bar */}
            <div className={`w-full h-2 rounded-full mb-8 relative overflow-hidden mt-6 ${
              theme === 'myrtle' ? 'bg-gray-100' : 'bg-white/10'
            }`}>
              <div
                className={`absolute top-0 bottom-0 w-2 rounded-full shadow-[0_0_10px_currentColor] transition-all duration-300 ${
                  theme === 'myrtle' ? 'bg-myrtle-accent text-myrtle-accent' : 'bg-mist-accent text-mist-accent'
                }`}
                style={{ left: `calc(${Math.min((currentFc / 2000) * 100, 98)}%)` }}
              ></div>
              <div className="absolute top-0 bottom-0 left-[5%] w-px bg-current opacity-20"></div>
              <div className="absolute top-0 bottom-0 left-[25%] w-px bg-current opacity-20"></div>
              <div className="absolute top-0 bottom-0 left-[50%] w-px bg-current opacity-20"></div>
            </div>
            <div className={`flex justify-between text-[10px] font-bold uppercase opacity-40 mb-10 ${
              theme === 'myrtle' ? 'text-gray-500' : 'text-white'
            }`}>
              <span>Survival</span>
              <span>Maintenance</span>
              <span>Growth</span>
              <span>Thriving</span>
            </div>

            {/* Plant Recommendations */}
            <div>
              <h4 className={`text-xs font-bold uppercase tracking-widest mb-4 ${
                theme === 'myrtle' ? 'text-myrtle-text/60' : 'text-white/60'
              }`}>
                Suggested For This Light
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {currentZone.plants.map((plant, idx) => {
                  const isLink = !!plant.linkPath;
                  return (
                    <button
                      key={idx}
                      onClick={() => isLink && router.push(plant.linkPath!)}
                      disabled={!isLink}
                      className={`group p-3 rounded-lg text-left transition-all relative overflow-hidden border flex items-center justify-between ${
                        theme === 'myrtle'
                          ? 'bg-gray-50 border-gray-100 hover:border-myrtle-accent hover:shadow-sm'
                          : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-mist-accent'
                      } ${isLink ? 'cursor-pointer' : 'cursor-default'}`}
                    >
                      <span className={`text-sm font-bold ${
                        theme === 'myrtle' ? 'text-myrtle-text' : 'text-white'
                      }`}>
                        {plant.name}
                      </span>
                      {isLink && (
                        <svg
                          className={`w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1 ${
                            theme === 'myrtle' ? 'text-myrtle-accent' : 'text-mist-accent'
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LightArchitect;
