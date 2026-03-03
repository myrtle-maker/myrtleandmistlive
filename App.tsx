import React from 'react';
import { BrowserRouter, Routes, Route, ScrollRestoration } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/Header';
import Footer from './components/Footer';
import ThemeToggle from './components/ThemeToggle';
import { ThemeProvider, useTheme } from './components/ThemeContext';

// Existing pages
import HomePage from './pages/HomePage';
import GuidePage from './pages/GuidePage';
import ArticlePage from './pages/ArticlePage';
import NotFoundPage from './pages/NotFoundPage';

// Plant hub — dual-URL architecture
import PlantPage from './pages/PlantPage';
import PlantEnergyPage from './pages/PlantEnergyPage';

// Placeholder for all routes under construction
import ComingSoonPage from './pages/ComingSoonPage';

const AppLayout: React.FC = () => {
  const { theme } = useTheme();
  return (
    <div className={`min-h-screen flex flex-col theme-transition ${
      theme === 'myrtle' ? 'bg-myrtle-bg font-sans' : 'bg-mist-bg font-sans'
    }`}>
      <Header />
      <main className="flex-grow">
        <Routes>
          {/* ── Core ────────────────────────────────────────── */}
          <Route path="/"                      element={<HomePage />} />
          <Route path="/the-guide"             element={<GuidePage />} />
          <Route path="/journal/:articleId"    element={<ArticlePage />} />

          {/* ── Pillar pages (priority 0.9) ──────────────────── */}
          <Route path="/plant-care"            element={<ComingSoonPage />} />
          <Route path="/plant-energy"          element={<ComingSoonPage />} />
          <Route path="/apothecary"            element={<ComingSoonPage />} />

          {/* ── Plant hub — dual-URL per plant ───────────────── */}
          <Route path="/plants/:slug"          element={<PlantPage />} />
          <Route path="/plants/:slug/energy"   element={<PlantEnergyPage />} />

          {/* ── Spoke guides & reviews (priority 0.7) ────────── */}
          <Route path="/guides/:slug"          element={<ComingSoonPage />} />
          <Route path="/reviews/:slug"         element={<ComingSoonPage />} />

          {/* ── Trust / company pages (priority 0.5) ─────────── */}
          <Route path="/about"                 element={<ComingSoonPage />} />
          <Route path="/contact"               element={<ComingSoonPage />} />
          <Route path="/privacy-policy"        element={<ComingSoonPage />} />
          <Route path="/terms-of-service"      element={<ComingSoonPage />} />
          <Route path="/how-we-review"         element={<ComingSoonPage />} />

          {/* ── 404 ──────────────────────────────────────────── */}
          <Route path="*"                      element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
      <ThemeToggle />
      <ScrollRestoration />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <BrowserRouter>
          <AppLayout />
        </BrowserRouter>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default App;
