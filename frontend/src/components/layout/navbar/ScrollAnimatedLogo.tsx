"use client"

import React, {useState, useEffect, useRef} from 'react';
import {usePathname, useSearchParams, useRouter} from "next/navigation";
import LogoRenderer, {AnimationMode} from '@/components/layout/navbar/LogoRenderer';

export default function ScrollAnimatedLogo() {
  const router = useRouter();
  const pathname = usePathname();
  const [hasNavigatedInternally, setHasNavigatedInternally] = useState(false);
  const isInitialRender = useRef(true);

  // Detect if this is a fresh page load or internal navigation
  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      const navigationEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
      const isReload = navigationEntries.length > 0 && (navigationEntries[0].type === 'reload' || navigationEntries[0].type === 'navigate');
      setHasNavigatedInternally(!isReload);
    } else {
      setHasNavigatedInternally(true);
    }
  }, [pathname]);

  // Determine animation mode based on page and navigation state
  const animationMode = ((): AnimationMode => {
    const supportsAnimation = (() => {
      if (pathname === '/') {
        return true;
      }
      if (process.env.NODE_ENV !== 'development' && pathname.startsWith('/test')) {
        const searchParams = useSearchParams();
        return searchParams.get('fullNav') === 'true';
      }
      return false;
    })();

    if (!supportsAnimation) {
      return AnimationMode.DontAnimate;
    }
    if (!hasNavigatedInternally) {
      return AnimationMode.StartBig;
    }
    return AnimationMode.StartSmall;
  })();

  return (
    <LogoRenderer
      animate={animationMode}
      onNavigate={() => {
        if (pathname === '/') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
        router.push('/');
      }}
    />
  );
}
