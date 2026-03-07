'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Helmet } from 'react-helmet-async';
import { useTheme } from '../components/ThemeContext';
import Breadcrumbs from '../components/Breadcrumbs';

/**
 * PlantEnergyPage — `/plants/:slug/energy`
 *
 * Serves the Mist (energy/spiritual) view of a plant profile.
 * The companion Myrtle (care-focused) view lives at `/plants/:slug`.
 *
 * Both views share the same source file: content/plants/[slug].md
 */
const PlantEnergyPage: React.FC = () => {
  const { theme } = useTheme();
  const params = useParams();
  const slug = params?.slug as string | undefined;

  const displaySlug = slug ?? '';
  const displayName = displaySlug
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  return (
    <>
      <Helmet>
        <title>{displayName} Energy Profile | Myrtle &amp; Mist</title>
        <meta
          name="description"
          content={`The energetic and spiritual properties of ${displayName} — chakras, elements, and ritual uses.`}
        />
        <link rel="canonical" href={`https://myrtleandmist.com/plants/${displaySlug}/energy/`} />
      </Helmet>

      <Breadcrumbs title={`${displayName} — Energy Profile`} />

      <article className={`min-h-[70vh] py-16 px-4 theme-transition ${
        theme === 'myrtle' ? 'bg-white text-myrtle-text' : 'bg-mist-bg text-mist-text'
      }`}>
        <div className="max-w-3xl mx-auto">

          {/* Dual-view switcher */}
          <div className="flex gap-4 mb-12">
            <Link
              href={`/plants/${displaySlug}`}
              className={`px-4 py-1.5 text-xs font-bold uppercase tracking-widest border transition-colors ${
                theme === 'myrtle'
                  ? 'text-myrtle-text border-myrtle-accent/40 hover:bg-myrtle-secondary'
                  : 'text-mist-text border-mist-accent/40 hover:bg-mist-secondary'
              }`}
            >
              Care Guide
            </Link>
            <span className={`px-4 py-1.5 text-xs font-bold uppercase tracking-widest border ${
              theme === 'myrtle'
                ? 'bg-myrtle-accent text-white border-myrtle-accent'
                : 'bg-mist-accent text-mist-bg border-mist-accent'
            }`}>
              Energy Profile
            </span>
          </div>

          <h1 className={`text-4xl md:text-5xl mb-6 ${
            theme === 'myrtle' ? 'font-geo font-bold' : 'font-serif'
          }`}>
            {displayName}: Energy Profile
          </h1>

          <p className="opacity-50 text-sm mb-12">
            Energy content for <code className="font-mono">/plants/{displaySlug}/energy/</code> is coming soon.
            Add the <code className="font-mono">energy</code> frontmatter section to{' '}
            <code className="font-mono">content/plants/{displaySlug}.md</code>.
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

export default PlantEnergyPage;
