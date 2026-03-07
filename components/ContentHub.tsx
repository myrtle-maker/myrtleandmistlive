'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTheme } from './ThemeContext';
import { ARTICLES } from '../data/articles';

const ContentHub: React.FC = () => {
  const { theme } = useTheme();
  const router = useRouter();

  // Only show first 3 articles for preview
  const featuredArticles = ARTICLES.slice(0, 3);

  return (
    <section id="journal" className={`py-24 theme-transition ${
      theme === 'myrtle' ? 'bg-white' : 'bg-mist-bg'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div className="max-w-2xl">
            <span className={`block text-xs font-bold uppercase tracking-widest mb-3 ${
              theme === 'myrtle' ? 'text-myrtle-accent' : 'text-mist-accent'
            }`}>
              The Journal
            </span>
            <h2 className={`text-3xl md:text-5xl mb-4 ${
              theme === 'myrtle' ? 'font-geo font-bold text-myrtle-text' : 'font-serif text-mist-text'
            }`}>
              {theme === 'myrtle' ? 'Cultivate Knowledge' : 'Wisdom for the Soul'}
            </h2>
            <p className={`text-lg ${theme === 'myrtle' ? 'text-gray-600' : 'text-gray-400'}`}>
              Deep dives, quick tips, and expert advice.
            </p>
          </div>
          <button
            onClick={() => router.push('/the-guide')}
            className={`mt-6 md:mt-0 border-b pb-1 uppercase text-sm tracking-widest theme-transition ${
              theme === 'myrtle'
                ? 'text-myrtle-text border-myrtle-text hover:text-myrtle-accent hover:border-myrtle-accent'
                : 'text-mist-text border-mist-text hover:text-mist-accent hover:border-mist-accent'
            }`}
          >
            Read the Full Guide
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredArticles.map((article) => {
            const content = article[theme];
            return (
              <Link
                key={article.id}
                href={`/journal/${article.id}`}
                className={`group rounded-xl overflow-hidden border theme-transition transform hover:-translate-y-2 duration-500 block ${
                  theme === 'myrtle'
                    ? 'bg-white border-gray-100 shadow-sm hover:shadow-xl'
                    : 'bg-white/5 border-white/10 hover:bg-white/10 backdrop-blur-sm'
                }`}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={article.image}
                    alt={content.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <span className={`text-xs font-bold uppercase tracking-wide mb-2 block ${
                    theme === 'myrtle' ? 'text-myrtle-accent' : 'text-mist-accent'
                  }`}>
                    {article.category}
                  </span>
                  <h3 className={`text-xl mb-3 leading-tight ${
                    theme === 'myrtle' ? 'font-geo font-bold text-myrtle-text' : 'font-serif text-mist-text'
                  }`}>
                    {content.title}
                  </h3>
                  <p className={`text-sm mb-4 line-clamp-3 ${
                    theme === 'myrtle' ? 'text-gray-600' : 'text-gray-400'
                  }`}>
                    {content.excerpt}
                  </p>
                  <div className={`text-xs font-bold uppercase tracking-widest flex items-center ${
                    theme === 'myrtle' ? 'text-myrtle-text' : 'text-white'
                  }`}>
                    Read Article
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ContentHub;
