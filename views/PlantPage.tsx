'use client';

import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useTheme } from '../components/ThemeContext';
import Breadcrumbs from '../components/Breadcrumbs';

/**
 * PlantPage — `/plants/:slug`
 *
 * Serves the Myrtle (care-focused) view of a plant profile.
 * The companion Mist (energy-focused) view lives at `/plants/:slug/energy`.
 *
 * Both views share the same source file: content/plants/[slug].md
 * Content is differentiated by frontmatter sections once the data layer
 * is wired up (e.g., via a Vite glob import or a build-time JSON manifest).
 */
const PlantPage: React.FC = () => {
  const { theme } = useTheme();
  const params = useParams();
  const slug = params?.slug as string | undefined;

  const displaySlug = slug ?? '';
  const displayName = displaySlug
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  useEffect(() => {
    document.title = `${displayName} Care Guide | Myrtle & Mist`;
  }, [displayName]);

  return (
    <>
      <Breadcrumbs title={`${displayName} — Care Guide`} />

      <article className={`min-h-[70vh] py-16 px-4 theme-transition ${
        theme === 'myrtle' ? 'bg-white text-myrtle-text' : 'bg-mist-bg text-mist-text'
      }`}>
        <div className="max-w-3xl mx-auto">

          {/* Dual-view switcher */}
          <div className="flex gap-4 mb-12">
            <span className={`px-4 py-1.5 text-xs font-bold uppercase tracking-widest border ${
              theme === 'myrtle'
                ? 'bg-myrtle-accent text-white border-myrtle-accent'
                : 'bg-mist-accent text-mist-bg border-mist-accent'
            }`}>
              Care Guide
            </span>
            <Link
              href={`/plants/${displaySlug}/energy`}
              className={`px-4 py-1.5 text-xs font-bold uppercase tracking-widest border transition-colors ${
                theme === 'myrtle'
                  ? 'text-myrtle-text border-myrtle-accent/40 hover:bg-myrtle-secondary'
                  : 'text-mist-text border-mist-accent/40 hover:bg-mist-secondary'
              }`}
            >
              Energy Profile
            </Link>
          </div>

          <h1 className={`text-4xl md:text-5xl mb-6 ${
            theme === 'myrtle' ? 'font-geo font-bold' : 'font-serif'
          }`}>
            {displayName}
          </h1>

          <p className="opacity-50 text-sm mb-12">
            Plant care content for <code className="font-mono">/plants/{displaySlug}/</code> is coming soon.
            Add your content to <code className="font-mono">content/plants/{displaySlug}.md</code>.
          </p>

          <div className={`p-6 border rounded-sm text-sm opacity-60 ${
            theme === 'myrtle' ? 'border-myrtle-accent/20 bg-myrtle-bg' : 'border-mist-accent/20 bg-mist-secondary'
          }`}>
            <strong>Data layer note:</strong> Wire up a Vite glob import or build-time JSON manifest
            to read from <code>content/plants/{displaySlug}.md</code> and replace this placeholder.
          </div>
        </div>
      </article>
    </>
  );
};

export default PlantPage;
