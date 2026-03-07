'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from './ThemeContext';

interface BreadcrumbsProps {
  title?: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ title }) => {
  const { theme } = useTheme();
  const pathname = usePathname();

  const baseClasses = "text-xs font-bold uppercase tracking-widest flex items-center space-x-2";
  const textClass = theme === 'myrtle'
    ? 'text-myrtle-text/60 hover:text-myrtle-accent'
    : 'text-gray-500 hover:text-mist-accent';
  const activeClass = theme === 'myrtle' ? 'text-myrtle-text' : 'text-mist-text';

  const isGuide = pathname === '/the-guide';
  const isArticle = pathname?.startsWith('/journal/');

  return (
    <nav className="mb-8">
      <div className={baseClasses}>
        <Link href="/" className={`transition-colors ${textClass}`}>
          Home
        </Link>

        <span className="opacity-40">/</span>

        {isGuide && (
          <span className={activeClass}>Guide</span>
        )}

        {isArticle && (
          <>
            <Link href="/the-guide" className={`transition-colors ${textClass}`}>
              Guide
            </Link>
            <span className="opacity-40">/</span>
            <span className={`truncate max-w-[200px] ${activeClass}`}>
              {title || 'Article'}
            </span>
          </>
        )}
      </div>
    </nav>
  );
};

export default Breadcrumbs;
