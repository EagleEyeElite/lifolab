'use client';

import React, { createContext, useContext } from 'react';

export interface SiteColors {
  primaryColor: string;
  secondaryColor: string;
}

const ColorContext = createContext<SiteColors | null>(null);

export function ColorProvider({
  children,
  colors,
}: {
  children: React.ReactNode;
  colors: SiteColors;
}) {
  return (
    <ColorContext.Provider value={colors}>{children}</ColorContext.Provider>
  );
}

/**
 * Hook to access site colors from WordPress CMS
 * @returns Site colors (primary and secondary)
 * @throws Error if used outside of ColorProvider
 */
export function useSiteColors(): SiteColors {
  const context = useContext(ColorContext);
  if (!context) {
    throw new Error('useSiteColors must be used within a ColorProvider');
  }
  return context;
}
