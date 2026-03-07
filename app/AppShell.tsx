'use client';

import React from 'react';
import { useTheme } from '../components/ThemeContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ThemeToggle from '../components/ThemeToggle';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen flex flex-col theme-transition ${
      theme === 'myrtle' ? 'bg-myrtle-bg font-sans' : 'bg-mist-bg font-sans'
    }`}>
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <ThemeToggle />
    </div>
  );
}
