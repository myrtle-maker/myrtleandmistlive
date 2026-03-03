import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { NAV_LINKS } from '../data/navigation';
import { PILLAR_CONTENT } from '../data/pillarContent';
import { ARTICLES } from '../data/articles';
import { useTheme } from './ThemeContext';
import Logo from './Logo';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  const { theme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownTimeout = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setActiveDropdown(null);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
    setMobileExpanded(null);
  }, [location.pathname]);

  const getHeaderClasses = () => {
    if (!isScrolled && !activeDropdown && !isMobileMenuOpen) return 'bg-transparent py-6 border-transparent';
    return theme === 'myrtle'
      ? 'bg-myrtle-bg/95 shadow-sm py-4 border-b border-gray-100 backdrop-blur-md'
      : 'bg-mist-bg/90 shadow-sm py-4 border-b border-mist-secondary backdrop-blur-md';
  };

  const getLinkClasses = (linkDropdownKey: string | null) => {
    const isActive = activeDropdown === linkDropdownKey;
    const base = "relative px-3 py-2 text-sm font-medium tracking-wide uppercase theme-transition transition-colors duration-300 group";
    let colorClass = "";
    if (!isScrolled && !activeDropdown && !isMobileMenuOpen) {
      colorClass = theme === 'myrtle'
        ? 'text-myrtle-text/80 hover:text-myrtle-accent'
        : 'text-mist-text/80 hover:text-mist-accent';
    } else {
      colorClass = theme === 'myrtle'
        ? 'text-myrtle-text hover:text-myrtle-accent'
        : 'text-mist-text hover:text-mist-accent';
    }
    if (isActive) {
      colorClass = theme === 'myrtle' ? 'text-myrtle-accent' : 'text-mist-accent';
    }
    return `${base} ${colorClass}`;
  };

  const handleMouseEnter = (key: string | undefined) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    if (key) setActiveDropdown(key);
  };

  const handleMouseLeave = () => {
    dropdownTimeout.current = window.setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const handleNavClick = (e: React.MouseEvent, link: typeof NAV_LINKS[number]) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);

    if (!link.hash) {
      navigate(link.path);
    } else {
      if (location.pathname === link.path) {
        const el = document.querySelector(link.hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate(link.path);
        setTimeout(() => {
          const el = document.querySelector(link.hash as string);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      }
    }
  };

  const toggleMobileSubmenu = (key: string) => {
    setMobileExpanded(mobileExpanded === key ? null : key);
  };

  const renderDropdownContent = () => {
    if (!activeDropdown) return null;

    if (activeDropdown === 'guide') {
      const categories = PILLAR_CONTENT[theme].categories;
      return (
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-8 grid grid-cols-2 gap-6">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  navigate('/the-guide');
                  setTimeout(() => {
                    const el = document.getElementById(cat.id);
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }, 100);
                  setActiveDropdown(null);
                }}
                className={`text-left p-3 rounded-lg flex items-start gap-4 transition-all hover:-translate-y-1 ${
                  theme === 'myrtle' ? 'hover:bg-green-50/50 hover:shadow-sm' : 'hover:bg-white/5'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  theme === 'myrtle' ? 'bg-white text-myrtle-accent shadow-sm' : 'bg-white/10 text-mist-accent'
                }`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={cat.icon} />
                  </svg>
                </div>
                <div>
                  <h4 className={`text-sm font-bold mb-1 ${theme === 'myrtle' ? 'text-myrtle-text' : 'text-white'}`}>
                    {cat.title}
                  </h4>
                  <p className={`text-xs ${theme === 'myrtle' ? 'text-gray-500' : 'text-gray-400'}`}>
                    {cat.description}
                  </p>
                </div>
              </button>
            ))}
          </div>

          <div
            className={`col-span-4 p-6 rounded-xl flex flex-col justify-end relative overflow-hidden group cursor-pointer ${
              theme === 'myrtle' ? 'bg-myrtle-secondary' : 'bg-mist-secondary'
            }`}
            onClick={() => { navigate('/the-guide'); setActiveDropdown(null); }}
          >
            <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
            <h4 className={`text-xs font-bold uppercase tracking-widest mb-2 relative z-10 ${
              theme === 'myrtle' ? 'text-myrtle-accent' : 'text-mist-accent'
            }`}>
              Featured Guide
            </h4>
            <p className={`font-serif text-xl font-bold leading-tight relative z-10 ${
              theme === 'myrtle' ? 'text-myrtle-text' : 'text-white'
            }`}>
              {PILLAR_CONTENT[theme].title}
            </p>
          </div>
        </div>
      );
    }

    if (activeDropdown === 'journal') {
      const recentArticles = ARTICLES.slice(0, 3);
      return (
        <div className="grid grid-cols-3 gap-6">
          {recentArticles.map(article => {
            const content = article[theme];
            return (
              <div
                key={article.id}
                onClick={() => { navigate('/journal/' + article.id); setActiveDropdown(null); }}
                className="group cursor-pointer"
              >
                <div className="aspect-video rounded-lg overflow-hidden mb-3 relative">
                  <img
                    src={article.image}
                    alt={content.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity ${
                    theme === 'myrtle' ? 'bg-white/10' : 'bg-black/20'
                  }`}></div>
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-wider mb-1 block ${
                  theme === 'myrtle' ? 'text-myrtle-accent' : 'text-mist-accent'
                }`}>
                  {article.category}
                </span>
                <h4 className={`text-sm font-bold leading-tight line-clamp-2 ${
                  theme === 'myrtle' ? 'text-myrtle-text font-geo' : 'text-white font-serif'
                }`}>
                  {content.title}
                </h4>
              </div>
            );
          })}
        </div>
      );
    }

    return null;
  };

  return (
    <header
      className={`fixed w-full z-40 theme-transition ${getHeaderClasses()}`}
      onMouseLeave={handleMouseLeave}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center relative">

        {/* Logo */}
        <div className="flex-shrink-0 z-50">
          <button
            onClick={() => navigate('/')}
            className={`focus:outline-none theme-transition ${
              isScrolled
                ? (theme === 'myrtle' ? 'text-myrtle-text' : 'text-mist-text')
                : (theme === 'myrtle' ? 'text-myrtle-text' : 'text-white')
            }`}
          >
            <Logo className={!isScrolled && !activeDropdown && !isMobileMenuOpen && theme === 'myrtle' ? 'text-myrtle-text' : ''} />
          </button>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-2 h-full items-center">
          {NAV_LINKS.map((link) => (
            <div key={link.name} className="relative h-full flex items-center">
              <a
                href={link.hash ? link.path + link.hash : link.path}
                onClick={(e) => handleNavClick(e, link)}
                onMouseEnter={() => handleMouseEnter(link.dropdownKey || undefined)}
                className={getLinkClasses(link.dropdownKey)}
              >
                {link.name}
                {activeDropdown === link.dropdownKey && link.dropdownKey && (
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 transform scale-x-100 transition-transform duration-300 ${
                    theme === 'myrtle' ? 'bg-myrtle-accent' : 'bg-mist-accent'
                  }`}></span>
                )}
              </a>
            </div>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden z-50">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`focus:outline-none theme-transition ${
              isScrolled || isMobileMenuOpen
                ? (theme === 'myrtle' ? 'text-myrtle-text' : 'text-mist-text')
                : (theme === 'myrtle' ? 'text-myrtle-text' : 'text-white')
            }`}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Desktop Mega Menu Dropdown */}
      <div
        className={`hidden md:block absolute top-full left-0 w-full border-t overflow-hidden transition-all duration-300 ease-out origin-top ${
          activeDropdown
            ? 'opacity-100 translate-y-0 visible max-h-[500px]'
            : 'opacity-0 -translate-y-2 invisible max-h-0'
        } ${
          theme === 'myrtle'
            ? 'bg-white/95 border-gray-100 shadow-xl backdrop-blur-xl'
            : 'bg-black/80 border-white/10 shadow-2xl backdrop-blur-xl'
        }`}
        onMouseEnter={() => handleMouseEnter(activeDropdown || undefined)}
        onMouseLeave={handleMouseLeave}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {renderDropdownContent()}
        </div>
      </div>

      {/* Mobile Full Screen Menu */}
      <div className={`md:hidden fixed inset-0 z-40 transition-all duration-300 ${
        isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
      }`}>
        <div className={`absolute inset-0 ${theme === 'myrtle' ? 'bg-myrtle-bg/98' : 'bg-mist-bg/98'}`}></div>

        <div className="relative z-50 h-full flex flex-col pt-24 px-6 overflow-y-auto pb-10">
          {NAV_LINKS.map((link) => {
            const hasSubmenu = link.dropdownKey === 'guide';
            const isExpanded = mobileExpanded === 'guide';

            return (
              <div
                key={link.name}
                className={`border-b ${theme === 'myrtle' ? 'border-gray-200' : 'border-white/10'}`}
              >
                <div className="flex items-center justify-between">
                  <a
                    href={link.hash ? link.path + link.hash : link.path}
                    onClick={(e) => {
                      if (hasSubmenu) {
                        e.preventDefault();
                        toggleMobileSubmenu('guide');
                      } else {
                        handleNavClick(e, link);
                      }
                    }}
                    className={`block py-5 text-xl font-bold uppercase tracking-widest transition-colors ${
                      theme === 'myrtle' ? 'text-myrtle-text' : 'text-white'
                    }`}
                  >
                    {link.name}
                  </a>
                  {hasSubmenu && (
                    <button
                      onClick={() => toggleMobileSubmenu('guide')}
                      className={`p-2 ${theme === 'myrtle' ? 'text-myrtle-text' : 'text-white'}`}
                    >
                      <svg
                        className={`w-4 h-4 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  )}
                </div>

                {hasSubmenu && (
                  <div className={`overflow-hidden transition-all duration-300 ${
                    isExpanded ? 'max-h-[500px] opacity-100 mb-4' : 'max-h-0 opacity-0'
                  }`}>
                    <div className="pl-4 space-y-3">
                      {PILLAR_CONTENT[theme].categories.map(cat => (
                        <button
                          key={cat.id}
                          onClick={() => {
                            navigate('/the-guide');
                            setIsMobileMenuOpen(false);
                            setTimeout(() => {
                              const el = document.getElementById(cat.id);
                              if (el) el.scrollIntoView();
                            }, 200);
                          }}
                          className={`block text-sm font-medium w-full text-left ${
                            theme === 'myrtle' ? 'text-gray-600' : 'text-gray-400'
                          }`}
                        >
                          {cat.title}
                        </button>
                      ))}
                      <button
                        onClick={() => { navigate('/the-guide'); setIsMobileMenuOpen(false); }}
                        className={`block text-sm font-bold mt-4 uppercase ${
                          theme === 'myrtle' ? 'text-myrtle-accent' : 'text-mist-accent'
                        }`}
                      >
                        View All Guides
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </header>
  );
};

export default Header;
