"use client"

import React, {useState, useEffect, useRef} from 'react';
import {usePathname, useSearchParams, useRouter} from "next/navigation";
import LogoRenderer, {AnimationMode} from '@/components/layout/navbar/LogoRenderer';

interface ScrollAnimatedLogoProps {
  onScrollProgressChange: (progress: number) => void;
  logoClickTriggerRef?: React.RefObject<(() => void) | null>;
}

export default function ScrollAnimatedLogo({ onScrollProgressChange, logoClickTriggerRef }: ScrollAnimatedLogoProps) {
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


  const animationMode = ((): AnimationMode => {
    if (process.env.NODE_ENV === 'development' && pathname.startsWith('/test')) {
      const searchParams = useSearchParams();
      const animationModeParam = searchParams.get('animationMode');

      if (animationModeParam === AnimationMode.StartBig) return AnimationMode.StartBig;
      if (animationModeParam === AnimationMode.StartSmall) return AnimationMode.StartSmall;
      if (animationModeParam === AnimationMode.DontAnimate) return AnimationMode.DontAnimate;
      return AnimationMode.DontAnimate;
    }

    if (pathname === '/') {
      if (hasNavigatedInternally) return AnimationMode.StartSmall;
      else return AnimationMode.StartBig;
    }
    return AnimationMode.DontAnimate;

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
      onScrollProgressChange={onScrollProgressChange}
      logoClickTriggerRef={logoClickTriggerRef}
    />
  );
}
