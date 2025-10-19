"use client"

import Image from 'next/image';
import {useMotionValue, useSpring, useTransform, useMotionValueEvent} from "motion/react"
import * as motion from "motion/react-client"
import {easeIn, easeOut} from "motion";
import React, {useEffect, useState, useRef} from 'react';
import {useScroll} from "motion/react"
import Match from '@public/match.svg'
import ScrollHint from "@/components/ui/ScrollHint";
import { strings } from '@/config/siteConfig';

interface LogoPositions {
  isReady: boolean;
  logoWidthRange: [number, number];
  logoHeightRange: [number, number];
  logoXRange: [number, number];
  logoYRange: [number, number];
}

export enum AnimationMode {
  StartBig= "startBig",
  StartSmall = "startSmall",
  DontAnimate = "dontAnimate",
}

interface LogoRendererProps {
  animate: AnimationMode;
  onNavigate: () => void;
  onScrollProgressChange: (progress: number) => void;
  logoClickTriggerRef?: React.RefObject<(() => void) | null>;
}

export default function LogoRenderer({ animate, onNavigate, onScrollProgressChange, logoClickTriggerRef }: LogoRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [aspectRatio, setAspectRatio] = useState(0);
  const [showScrollHint, setShowScrollHint] = useState(false);
  const [logoPositions, setLogoPositions] = useState<LogoPositions>({
    isReady: false,
    logoWidthRange: [0, 0],
    logoHeightRange: [0, 0],
    logoXRange: [0, 0],
    logoYRange: [0, 0]
  });

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      requestAnimationFrame(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView();
        }
      });
      return;
    }

    switch (animate) {
      case AnimationMode.StartBig:
        window.scrollTo({top: 0});
        return;
      case AnimationMode.StartSmall:
        // Scroll down the length of the scroll container for startSmall
        // This positions the logo in the top left (small state)
        const scrollContainer = containerRef.current;
        if (!scrollContainer) {
          throw new Error('Invalid containerRef');
        }
        window.scrollTo({top: scrollContainer.offsetHeight});
        return;
      case AnimationMode.DontAnimate:
      default:
        return ;
    }
  }, [animate]);

  useEffect(() => {
    const updateDimensions = () => {
      // client width/height is equivalent to lvh and lvw
      // on mobile when the address bears scrolls away; that stays constant (no jumps)
      const vw = document.documentElement.clientWidth;
      const vh = document.documentElement.clientHeight;

      const styles = getComputedStyle(document.documentElement);
      const fontSize = parseFloat(styles.fontSize);
      const navbarHeight = parseFloat(styles.getPropertyValue('--spacing-navbar')) * fontSize;
      const spacing2 = parseFloat(styles.getPropertyValue('--spacing')) * 2 * fontSize;
      const spacing6 = parseFloat(styles.getPropertyValue('--spacing')) * 6 * fontSize;
      if (isNaN(fontSize) || isNaN(navbarHeight) || isNaN(spacing2) || isNaN(spacing6)) {
        throw new Error(`Invalid CSS variable`);
      }

      // Scale logo to full size, respecting width or height constraints (whichever comes first)
      // subtracts navbar height twice for centering
      const logoHeight = Math.min(vw / aspectRatio, vh - (navbarHeight * 2));
      const logoWidth = logoHeight * aspectRatio;
      const finalHeight = navbarHeight - (spacing2 * 2);
      const finalWidth = finalHeight * aspectRatio;

      setLogoPositions({
        isReady: true,
        logoWidthRange: [logoWidth, finalWidth],
        logoHeightRange: [logoHeight, finalHeight],
        logoXRange: [vw * 0.5, (finalWidth * 0.5) + spacing6],
        logoYRange: [vh * 0.5, navbarHeight * 0.5]
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [aspectRatio]);

  const { scrollYProgress } = useScroll({target: containerRef, offset: ["start start", "end start"]});
  const shouldAnimate = animate === AnimationMode.StartBig || animate === AnimationMode.StartSmall;
  const animationProgress = useMotionValue(shouldAnimate ? scrollYProgress.get() : 1);
  const handleScrollChange = (value: number) => {
    const progress = shouldAnimate ? value : 1;
    animationProgress.set(progress);
    onScrollProgressChange(progress);

    // Calculate scroll hint visibility
    if (animate === AnimationMode.DontAnimate) {
      setShowScrollHint(false);
    } else {
      setShowScrollHint(value === 0);
    }
  };
  useMotionValueEvent(scrollYProgress, "change", handleScrollChange);
  useEffect(() => {
    // force match resize, on animate change
    handleScrollChange(scrollYProgress.get());
  }, [animate]);
  const scrollYSpring = useSpring(animationProgress, { stiffness: 1500, damping: 100, mass: 1 });
  const [width, height, x, y] = [
    useTransform(scrollYSpring, [0, 1], logoPositions.logoWidthRange, { ease: easeOut }),
    useTransform(scrollYSpring, [0, 1], logoPositions.logoHeightRange, { ease: easeOut }),
    useTransform(scrollYSpring, [0, 1], logoPositions.logoXRange, { ease: easeIn }),
    useTransform(scrollYSpring, [0, 1], logoPositions.logoYRange, { ease: easeOut })
  ];

  // Logo click handler
  const handleLogoClick = () => {
    // Simplified 2-State Logo State Machine
    const containerHeight = containerRef.current?.offsetHeight || 0;
    const currentScrollY = window.scrollY;

    enum LogoState {
      GO_HOME = "go_home",           // Click takes you to home position
      HOME_STATE = "home_state"      // At home position, click makes logo big
    }

    // Determine current state
    const getCurrentState = (): LogoState => {
      // If not on root route, always go home
      if (animate === AnimationMode.DontAnimate) {
        return LogoState.GO_HOME;
      }

      // Check if we're at the home position (logo small, description visible)
      const isAtHomePosition = Math.abs(currentScrollY - containerHeight) < 10;

      return isAtHomePosition ? LogoState.HOME_STATE : LogoState.GO_HOME;
    };

    const currentState = getCurrentState();

    // State machine transitions
    switch (currentState) {
      case LogoState.GO_HOME:
        // Take user to home position or navigate to root route
        if (animate === AnimationMode.DontAnimate) {
          onNavigate(); // Navigate to root route
        } else {
          // Scroll to home position (logo small, description visible)
          window.scrollTo({
            top: containerHeight,
            behavior: 'smooth'
          });
        }
        break;

      case LogoState.HOME_STATE:
        // User is at home, scroll up to make logo big (enter scroll-dependent state)
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        break;
    }
  };

  // Expose click handler through ref
  useEffect(() => {
    if (logoClickTriggerRef) {
      logoClickTriggerRef.current = handleLogoClick;
    }
  }, [animate, onNavigate, logoClickTriggerRef]);

  return (
    <>
      {logoPositions.isReady && (
        <motion.div
          className="fixed -translate-x-1/2 -translate-y-1/2 cursor-pointer"
          style={{ width, height, x, y }}
        >
          <Image
            src={Match}
            alt={strings.altText.logo}
            className="size-full"
            priority
            onLoad={(event) => {
              const img = event.currentTarget;
              setAspectRatio(img.naturalWidth / img.naturalHeight);
            }}
            onClick={handleLogoClick}
          />
        </motion.div>
      )}
      <ScrollHint shouldShow={showScrollHint} />
      <div
        className={animate === AnimationMode.DontAnimate ? 'hidden' : 'h-[calc(100lvh-var(--spacing-navbar)-var(--spacing-match-logo-scroll-offset))]'}
        ref={containerRef}
      />
    </>
  );
}
