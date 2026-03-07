'use client';

import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from '../components/ThemeContext';
import AppShell from './AppShell';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <AppShell>{children}</AppShell>
      </ThemeProvider>
    </HelmetProvider>
  );
}
