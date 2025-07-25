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


  const animationMode = ((): AnimationMode => {
    if (process.env.NODE_ENV !== 'development' && pathname.startsWith('/test')) {
      const searchParams = useSearchParams();
      if(searchParams.get('fullNav') === 'true') return AnimationMode.StartBig;
      if(pathname.startsWith('/test/id1')) return AnimationMode.DontAnimate;
      if(pathname.startsWith('/test/id2')) return AnimationMode.StartSmall;
      if(pathname.startsWith('/test/id3')) return AnimationMode.StartBig;
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
    />
  );
}
