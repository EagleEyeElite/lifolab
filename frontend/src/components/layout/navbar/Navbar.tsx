"use client"

import React, { useState, useRef, useEffect } from "react";
import ScrollAnimatedLogo from "@/components/layout/navbar/ScrollAnimatedLogo";
import DesktopNavigation from "@/components/layout/navbar/DesktopNavigation";
import MobileNavigation from "@/components/layout/navbar/MobileNavigation";

import { navbar } from "@/config/siteConfig";

type LayoutMode = 'mobile' | 'tablet' | 'desktop';

export default function Navbar() {
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

  return (
    <>
      {/* Layer 0: Full-screen clickable overlay (lowest, only visible when logo is big) */}
      {showFullScreenOverlay && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => logoClickTriggerRef.current?.()}
          aria-label="Scroll to explore"
        />
      )}

      {/* Layer 1: Blur backdrop */}
      <div
        className="fixed top-0 w-full backdrop-blur-sm bg-gradient-to-b from-white/80 via-white/20 to-transparent [mask-image:linear-gradient(to_bottom,black_0%,black_60%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_60%,transparent_100%)]"
        style={{ height: 'calc(var(--spacing-navbar) + 2rem)' }}
      />

      {/* Layer 2: Logo (middle) */}
      <ScrollAnimatedLogo
        onScrollProgressChange={setScrollProgress}
        logoClickTriggerRef={logoClickTriggerRef}
      />

      {/* Layer 3: Links with backgrounds (highest) */}
      <nav className="fixed top-0 h-navbar w-full pointer-events-none">
        {layoutMode === 'mobile' ? (
          <MobileNavigation showButtonBackground={showButtonBackground} />
        ) : (
          <DesktopNavigation
            showButtonBackground={showButtonBackground}
            mode={layoutMode}
          />
        )}
      </nav>
    </>
  );
}
