import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTheme } from '../components/ThemeContext';

const NotFoundPage: React.FC = () => {
  const { theme } = useTheme();

  return (
    <>
      <Helmet>
        <title>404 Not Found | Myrtle &amp; Mist</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className={`min-h-screen flex items-center justify-center theme-transition ${
        theme === 'myrtle' ? 'bg-myrtle-bg' : 'bg-mist-bg'
      }`}>
        <div className="text-center px-4">
          <div className={`text-8xl font-bold mb-4 theme-transition ${
            theme === 'myrtle' ? 'text-myrtle-accent font-geo' : 'text-mist-accent font-serif'
          }`}>
            404
          </div>
          <h1 className={`text-2xl font-bold mb-4 theme-transition ${
            theme === 'myrtle' ? 'text-myrtle-text font-geo' : 'text-mist-text font-serif'
          }`}>
            Page Not Found
          </h1>
          <p className={`mb-8 text-sm theme-transition ${
            theme === 'myrtle' ? 'text-gray-600' : 'text-gray-400'
          }`}>
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link
            to="/"
            className={`px-8 py-3 rounded-sm font-bold uppercase tracking-widest text-xs inline-block transition-all hover:-translate-y-1 ${
              theme === 'myrtle'
                ? 'bg-myrtle-accent text-white hover:bg-myrtle-text'
                : 'bg-mist-accent text-mist-bg hover:bg-white'
            }`}
          >
            Return Home
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
