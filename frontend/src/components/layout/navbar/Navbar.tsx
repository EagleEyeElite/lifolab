"use client"

import React, { useState, useRef } from "react";
import ScrollAnimatedLogo from "@/components/layout/navbar/ScrollAnimatedLogo";
import DesktopNavigation from "@/components/layout/navbar/DesktopNavigation";
import MobileNavigation from "@/components/layout/navbar/MobileNavigation";

import { navbar } from "@/config/siteConfig";

export default function Navbar() {
  const { livingTheForestLab: navigationLivingTheForestLab, activities: navigationActivities } = navbar;
  const [scrollProgress, setScrollProgress] = useState(0);
  const showButtonBackground = scrollProgress >= 1;
  const showFullScreenOverlay = scrollProgress === 0;
  const logoClickTriggerRef = useRef<(() => void) | null>(null);

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
        <div className="hidden md:block">
          <DesktopNavigation
            navigationLivingTheForestLab={navigationLivingTheForestLab}
            navigationActivities={navigationActivities}
            showButtonBackground={showButtonBackground}
          />
        </div>
        <div className="md:hidden">
          <MobileNavigation
            navigationLivingTheForestLab={navigationLivingTheForestLab}
            navigationActivities={navigationActivities}
          />
        </div>
      </nav>
    </>
  );
}
