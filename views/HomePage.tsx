'use client';

import React, { useEffect } from 'react';
import { useTheme } from '../components/ThemeContext';
import Hero from '../components/Hero';
import ContentHub from '../components/ContentHub';
import MoonSync from '../components/MoonSync';
import MeditationTool from '../components/MeditationTool';
import LightArchitect from '../components/LightArchitect';
import About from '../components/About';
import ProductGrid from '../components/ProductGrid';

const HomePage: React.FC = () => {
  const { theme } = useTheme();

  const title = theme === 'myrtle'
    ? 'Myrtle & Mist | Botanical Living'
    : 'Myrtle & Mist | Soulful Living';

  const description = theme === 'myrtle'
    ? 'Expert plant care guides, tools, and botanicals for your indoor jungle.'
    : 'Mindfulness tools, wellness rituals, and curated products for slow living.';

  useEffect(() => {
    document.title = title;
  }, [title]);

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Myrtle & Mist',
    url: 'https://myrtleandmist.com',
    description: 'Expert plant care guides, wellness rituals, and curated products.',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />

      <Hero />
      <ContentHub />
      <MoonSync />
      <MeditationTool />
      <LightArchitect />
      <About />
      <ProductGrid />
    </>
  );
};

export default HomePage;
