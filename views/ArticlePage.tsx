'use client';

import React, { useEffect, useMemo, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Helmet } from 'react-helmet-async';
import { useTheme } from '../components/ThemeContext';
import { ARTICLES } from '../data/articles';
import { MYRTLE_PRODUCTS, MIST_PRODUCTS } from '../data/products';
import Breadcrumbs from '../components/Breadcrumbs';

interface TocItem {
  id: string;
  text: string;
}

const ArticlePage: React.FC = () => {
  const params = useParams();
  const articleId = params?.articleId as string | undefined;
  const { theme } = useTheme();
  const router = useRouter();

  const article = ARTICLES.find(a => a.id === articleId) || ARTICLES[0];
  const activeContent = article[theme];
  const [tocItems, setTocItems] = useState<TocItem[]>([]);

  // Animation refs and state
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [heroVisible, setHeroVisible] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    setHeroVisible(false);
    setContentVisible(false);
  }, [articleId]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.target === heroRef.current && entry.isIntersecting) {
          setHeroVisible(true);
        }
        if (entry.target === contentRef.current && entry.isIntersecting) {
          setContentVisible(true);
        }
      });
    }, { threshold: 0.1 });

    if (heroRef.current) observer.observe(heroRef.current);
    if (contentRef.current) observer.observe(contentRef.current);

    return () => observer.disconnect();
  }, [articleId]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const headings = document.querySelectorAll('article h2');
      const items: TocItem[] = [];
      headings.forEach((heading) => {
        if (heading.id) {
          items.push({ id: heading.id, text: heading.textContent || '' });
        }
      });
      setTocItems(items);
    }, 100);
    return () => clearTimeout(timer);
  }, [articleId, theme]);

  const relatedArticles = useMemo(() => {
    let related = ARTICLES.filter(a => a.id !== articleId && a.category === article.category);
    if (related.length < 3) {
      const others = ARTICLES.filter(a => a.id !== articleId && a.category !== article.category);
      related = [...related, ...others].slice(0, 3);
    }
    return related;
  }, [articleId, article.category]);

  const shopThisStory = useMemo(() => {
    if (!article.relatedProductIds) return [];
    const allProducts = [...MYRTLE_PRODUCTS, ...MIST_PRODUCTS];
    return allProducts.filter(p => article.relatedProductIds?.includes(p.id));
  }, [article.relatedProductIds]);

  const handleScrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: activeContent.title,
    description: activeContent.excerpt,
    image: article.image,
    url: `https://myrtleandmist.com/journal/${article.id}`,
    publisher: {
      '@type': 'Organization',
      name: 'Myrtle & Mist',
      url: 'https://myrtleandmist.com',
    },
  };

  return (
    <>
      <Helmet>
        <title>{activeContent.title} | Myrtle &amp; Mist</title>
        <meta name="description" content={activeContent.excerpt} />
        <link rel="canonical" href={`https://myrtleandmist.com/journal/${article.id}`} />
        <meta property="og:title" content={`${activeContent.title} | Myrtle & Mist`} />
        <meta property="og:description" content={activeContent.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={article.image} />
        <meta property="og:url" content={`https://myrtleandmist.com/journal/${article.id}`} />
        <script type="application/ld+json">{JSON.stringify(articleJsonLd)}</script>
      </Helmet>

      <div className={`min-h-screen pt-24 pb-20 theme-transition ${
        theme === 'myrtle' ? 'bg-myrtle-bg' : 'bg-mist-bg'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs title={activeContent.title} />

          {/* Header */}
          <header className="mb-12 text-center max-w-4xl mx-auto relative z-10 animate-fade-in-up">
            <span className={`inline-block px-3 py-1 mb-6 text-xs font-bold uppercase tracking-widest rounded-full theme-transition ${
              theme === 'myrtle'
                ? 'bg-myrtle-secondary text-myrtle-accent'
                : 'bg-mist-secondary text-mist-accent'
            }`}>
              {article.category}
            </span>
            <h1 className={`text-4xl md:text-6xl mb-6 leading-tight theme-transition ${
              theme === 'myrtle' ? 'font-geo font-bold text-myrtle-text' : 'font-serif text-mist-text'
            }`}>
              {activeContent.title}
            </h1>
            <p className={`text-sm font-medium theme-transition ${
              theme === 'myrtle' ? 'text-gray-500' : 'text-gray-400'
            }`}>
              {article.readTime} &bull; By {theme === 'myrtle' ? 'Myrtle Team' : 'Mist Editorial'}
            </p>
          </header>

          {/* Animated Hero Image */}
          <div
            ref={heroRef}
            className={`aspect-[21/9] w-full overflow-hidden rounded-xl mb-12 shadow-2xl relative group transform transition-all duration-1000 ease-out ${
              heroVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-[0.98]'
            }`}
          >
            <div className={`absolute inset-0 z-0 theme-transition ${
              theme === 'myrtle' ? 'bg-myrtle-secondary' : 'bg-gray-900'
            }`}>
              {theme === 'myrtle' ? (
                <>
                  <div className="absolute top-[-50%] left-[-20%] w-[100%] h-[200%] bg-gradient-to-br from-green-200/40 via-transparent to-transparent rotate-12 animate-blob"></div>
                  <div className="absolute bottom-[-50%] right-[-20%] w-[100%] h-[200%] bg-gradient-to-tl from-yellow-100/40 via-transparent to-transparent rotate-12 animate-blob" style={{ animationDelay: '5s' }}></div>
                </>
              ) : (
                <>
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-900/30 via-indigo-900/30 to-black/50"></div>
                  <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[100%] bg-mist-accent/10 rounded-full blur-3xl animate-blob"></div>
                </>
              )}
            </div>
            <div className={`absolute inset-0 z-10 mix-blend-overlay theme-transition ${
              theme === 'myrtle' ? 'opacity-30' : 'opacity-20 grayscale'
            }`}>
              <img src={article.image} alt="" className="w-full h-full object-cover" />
            </div>
            <div className={`absolute inset-0 z-20 bg-gradient-to-t ${
              theme === 'myrtle' ? 'from-white/10 to-transparent' : 'from-mist-bg/80 to-transparent'
            }`}></div>
          </div>

          {/* 3-Column Layout */}
          <div
            ref={contentRef}
            className={`grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto transform transition-all duration-1000 ease-out delay-200 ${
              contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            {/* Left Sidebar: TOC */}
            <aside className="hidden lg:block lg:col-span-2 relative">
              <div className={`sticky top-32 p-4 rounded-lg border theme-transition ${
                theme === 'myrtle' ? 'border-gray-100 bg-white/50' : 'border-white/5 bg-white/5 backdrop-blur-md'
              }`}>
                <span className={`text-xs font-bold uppercase tracking-widest block mb-4 ${
                  theme === 'myrtle' ? 'text-myrtle-accent' : 'text-mist-accent'
                }`}>
                  Contents
                </span>
                <ul className="space-y-3">
                  {tocItems.map((item) => (
                    <li key={item.id}>
                      <button
                        onClick={() => handleScrollToSection(item.id)}
                        className={`text-xs text-left transition-colors duration-200 line-clamp-1 ${
                          theme === 'myrtle'
                            ? 'text-gray-500 hover:text-myrtle-accent'
                            : 'text-gray-400 hover:text-mist-accent'
                        }`}
                      >
                        {item.text}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            {/* Center: Main Content */}
            <div className="lg:col-span-7">
              {/* Quick Overview Infobox */}
              <div className={`mb-10 p-6 rounded-lg border theme-transition transform transition-all hover:shadow-lg ${
                theme === 'myrtle'
                  ? 'bg-white border-l-4 border-l-myrtle-accent border-gray-100 shadow-sm'
                  : 'bg-mist-secondary border-l-4 border-l-mist-accent border-mist-accent/10'
              }`}>
                <h3 className={`text-sm font-bold uppercase tracking-widest mb-4 ${
                  theme === 'myrtle' ? 'text-myrtle-text' : 'text-white'
                }`}>
                  {theme === 'myrtle' ? 'Quick Specs' : 'Energetic Profile'}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {activeContent.quickOverview.map((item, idx) => (
                    <div key={idx} className="flex flex-col">
                      <span className={`text-[10px] uppercase font-bold opacity-60 mb-1 ${
                        theme === 'myrtle' ? 'text-gray-500' : 'text-gray-400'
                      }`}>
                        {item.label}
                      </span>
                      <span className={`text-sm font-medium ${
                        theme === 'myrtle' ? 'text-myrtle-accent' : 'text-mist-accent'
                      }`}>
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Article Body */}
              <article className={`prose prose-lg max-w-none theme-transition ${
                theme === 'myrtle'
                  ? 'prose-headings:font-geo text-gray-700 prose-a:text-myrtle-accent hover:prose-a:text-myrtle-text prose-a:transition-colors prose-a:decoration-myrtle-accent/40 prose-a:underline-offset-4'
                  : 'prose-invert text-gray-300 prose-a:text-mist-accent hover:prose-a:text-white prose-a:transition-colors prose-a:decoration-mist-accent/40 prose-a:underline-offset-4'
              }`}>
                <div dangerouslySetInnerHTML={{ __html: activeContent.content }} />
              </article>

              {/* Footer CTA */}
              <div className={`mt-12 p-8 text-center rounded-lg border theme-transition ${
                theme === 'myrtle'
                  ? 'bg-myrtle-secondary border-myrtle-accent/20'
                  : 'bg-mist-secondary border-mist-accent/20'
              }`}>
                <h3 className={`text-xl font-bold mb-2 ${
                  theme === 'myrtle' ? 'font-geo text-myrtle-text' : 'font-serif text-white'
                }`}>
                  {theme === 'myrtle' ? 'Keep Track of Your Growth' : 'Find Your Community'}
                </h3>
                <p className={`mb-6 text-sm ${theme === 'myrtle' ? 'text-gray-600' : 'text-gray-400'}`}>
                  {theme === 'myrtle'
                    ? 'Add this plant to your collection dashboard to get watering reminders.'
                    : 'Join 5,000+ others in our weekly mindfulness newsletter.'}
                </p>
                <button className={`px-8 py-3 rounded-sm font-bold uppercase tracking-widest text-xs transition-transform hover:-translate-y-1 active:scale-95 duration-200 ${
                  theme === 'myrtle'
                    ? 'bg-myrtle-accent text-white hover:bg-myrtle-text'
                    : 'bg-mist-accent text-mist-bg hover:bg-white'
                }`}>
                  {theme === 'myrtle' ? 'Track in Dashboard' : 'Join the Mist Community'}
                </button>
              </div>
            </div>

            {/* Right Sidebar */}
            <aside className="lg:col-span-3 space-y-8 relative">
              <div className="sticky top-32">
                {/* Ad Placeholder */}
                <div className={`p-4 text-center rounded-lg border mb-8 ${
                  theme === 'myrtle' ? 'bg-gray-50 border-gray-200' : 'bg-white/5 border-white/10'
                }`}>
                  <span className="text-[10px] uppercase opacity-50 block mb-2">Advertisement</span>
                  <div className="w-full aspect-square bg-gray-200/50 flex items-center justify-center text-xs opacity-50 rounded-sm">
                    Ad Space
                  </div>
                </div>

                {/* Shop This Story */}
                {shopThisStory.length > 0 && (
                  <div className={`p-6 rounded-xl border theme-transition ${
                    theme === 'myrtle'
                      ? 'bg-white/80 border-gray-100 shadow-xl backdrop-blur-md'
                      : 'bg-mist-secondary/80 border-mist-accent/10 shadow-2xl backdrop-blur-md'
                  }`}>
                    <h3 className={`text-xs font-bold uppercase tracking-widest mb-6 ${
                      theme === 'myrtle' ? 'text-myrtle-accent' : 'text-mist-accent'
                    }`}>
                      Shop This Story
                    </h3>
                    <div className="space-y-6">
                      {shopThisStory.map(product => (
                        <div
                          key={product.id}
                          className="flex gap-4 items-start group cursor-pointer"
                          onClick={() => window.open(product.affiliateUrl, '_blank')}
                        >
                          <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100 shadow-sm relative">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                          </div>
                          <div className="flex-grow pt-1">
                            <h4 className={`text-sm font-bold leading-tight mb-2 ${
                              theme === 'myrtle' ? 'text-myrtle-text' : 'text-white'
                            }`}>
                              {product.name}
                            </h4>
                            <span className={`text-[10px] font-bold px-3 py-1.5 rounded-sm inline-block uppercase tracking-wider transition-all duration-300 group-hover:shadow-md active:scale-95 ${
                              theme === 'myrtle'
                                ? 'bg-myrtle-secondary text-myrtle-accent group-hover:bg-myrtle-accent group-hover:text-white'
                                : 'bg-mist-accent text-mist-bg group-hover:bg-white group-hover:text-mist-bg'
                            }`}>
                              Check Price
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </aside>
          </div>

          {/* Related Articles */}
          <div className={`mt-24 pt-12 border-t ${
            theme === 'myrtle' ? 'border-gray-200' : 'border-white/10'
          }`}>
            <h3 className={`text-2xl mb-8 ${
              theme === 'myrtle' ? 'font-geo font-bold text-myrtle-text' : 'font-serif text-mist-text'
            }`}>
              Related Articles
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((related) => {
                const content = related[theme];
                return (
                  <div
                    key={related.id}
                    onClick={() => router.push('/journal/' + related.id)}
                    className={`group cursor-pointer rounded-lg overflow-hidden border theme-transition transform hover:-translate-y-1 transition-all duration-300 ${
                      theme === 'myrtle'
                        ? 'bg-white border-gray-100 shadow-sm hover:shadow-md'
                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <div className="aspect-video overflow-hidden relative">
                      <img
                        src={related.image}
                        alt={content.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                    </div>
                    <div className="p-4">
                      <span className={`text-[10px] font-bold uppercase tracking-widest mb-2 block ${
                        theme === 'myrtle' ? 'text-myrtle-accent' : 'text-mist-accent'
                      }`}>
                        {related.category}
                      </span>
                      <h4 className={`text-base font-bold leading-tight mb-2 line-clamp-2 ${
                        theme === 'myrtle' ? 'text-myrtle-text font-geo' : 'text-mist-text font-serif'
                      }`}>
                        {content.title}
                      </h4>
                      <div className={`text-xs opacity-60 ${
                        theme === 'myrtle' ? 'text-gray-600' : 'text-gray-400'
                      }`}>
                        Read time: {related.readTime}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArticlePage;
