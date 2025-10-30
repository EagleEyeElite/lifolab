'use client';

import React from 'react';
import { useSiteColors } from "@/contexts/ColorContext";

export default function FooterWrapper({ children }: { children: React.ReactNode }) {
  const { primaryColor } = useSiteColors();

  return (
    <footer
      className="rounded-t-primary border border-black border-b-0 p-responsive-sm"
      id="footer"
      style={{ backgroundColor: primaryColor }}
    >
      {children}
    </footer>
  );
}
