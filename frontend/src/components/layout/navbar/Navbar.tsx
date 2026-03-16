"use client"

import React, { useState, useRef, useEffect } from "react";
import ScrollAnimatedLogo from "@/components/layout/navbar/ScrollAnimatedLogo";
import DesktopNavigation from "@/components/layout/navbar/DesktopNavigation";
import MobileNavigation from "@/components/layout/navbar/MobileNavigation";

import { navbar } from "@/config/siteConfig";

type LayoutMode = 'mobile' | 'tablet' | 'desktop';

interface NavbarProps {
  primaryColor: string;
  secondaryColor: string;
}

export default function Navbar({ primaryColor, secondaryColor }: NavbarProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [layoutMode, setLayoutMode] = useState<LayoutMode>('desktop');
  const showButtonBackground = scrollProgress >= 1;
  const showFullScreenOverlay = scrollProgress === 0;
  const logoClickTriggerRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const styles = getComputedStyle(document.documentElement);
    const tabletBreakpoint = parseFloat(styles.getPropertyValue('--breakpoint-tablet'));
    const desktopBreakpoint = parseFloat(styles.getPropertyValue('--breakpoint-desktop'));

    const updateLayout = () => {
      const width = window.innerWidth;
      if (width >= desktopBreakpoint) {
        setLayoutMode('desktop');
      } else if (width >= tabletBreakpoint) {
        setLayoutMode('tablet');
      } else {
        setLayoutMode('mobile');
      }
    };

    updateLayout();
    window.addEventListener('resize', updateLayout);
    return () => window.removeEventListener('resize', updateLayout);
  }, []);

  // Stacking order: DOM order = visual order (bottom → top).
  // Parent stacking context (layout.tsx isolate) isolates from page content.
  // No z-indices needed — last element paints on top.
  return (
    <>
      {/* 1. Full-screen clickable overlay (bottom, only when logo is big) */}
      {showFullScreenOverlay && (
        <div
          className="fixed inset-0"
          onClick={() => logoClickTriggerRef.current?.()}
          aria-label="Scroll to explore"
        />
      )}

      {/* 2. Blur backdrop (visual only) */}
      <div
        className="fixed top-0 w-full pointer-events-none backdrop-blur-sm bg-gradient-to-b from-white/80 via-white/20 to-transparent [mask-image:linear-gradient(to_bottom,black_0%,black_60%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_60%,transparent_100%)]"
        style={{ height: 'calc(var(--spacing-navbar) + 2rem)' }}
      />

      {/* 3. Logo */}
      <ScrollAnimatedLogo
        onScrollProgressChange={setScrollProgress}
        logoClickTriggerRef={logoClickTriggerRef}
      />

      {/* 4. Navigation (top, always accessible) */}
      <nav className="fixed top-0 h-navbar w-full pointer-events-none">
        {layoutMode === 'mobile' ? (
          <MobileNavigation
            showButtonBackground={showButtonBackground}
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
          />
        ) : (
          <DesktopNavigation
            showButtonBackground={showButtonBackground}
            mode={layoutMode}
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
          />
        )}
      </nav>
    </>
  );
}
