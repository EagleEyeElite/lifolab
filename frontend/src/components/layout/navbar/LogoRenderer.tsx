"use client"

import Image from 'next/image';
import {useMotionValue, useSpring, useTransform, useMotionValueEvent} from "motion/react"
import * as motion from "motion/react-client"
import {easeIn, easeOut} from "motion";
import React, {useEffect, useState, useRef} from 'react';
import {useScroll} from "motion/react"
import Match from '@public/match.svg'

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
}

export default function LogoRenderer({ animate, onNavigate }: LogoRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [aspectRatio, setAspectRatio] = useState(0);
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
      if (isNaN(fontSize) || isNaN(navbarHeight) || isNaN(spacing2)) {
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
        logoXRange: [vw * 0.5, (finalWidth * 0.5) + spacing2],
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
    animationProgress.set(shouldAnimate ? value : 1);
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

  return (
    <>
      {logoPositions.isReady && (
        <motion.div
          className="fixed -translate-x-1/2 -translate-y-1/2 cursor-pointer z-[25]"
          style={{ width, height, x, y }}
        >
          <Image
            src={Match}
            alt="Living the Forest Lab"
            className="size-full"
            priority
            onLoad={(event) => {
              const img = event.currentTarget;
              setAspectRatio(img.naturalWidth / img.naturalHeight);
            }}
            onClick={() => {
              if (animationProgress.get() >= 1) {
                onNavigate();
              } else {
                const currentScrollY = window.scrollY;
                const screenHeight = window.innerHeight;
                const scrollAmount = screenHeight * 0.7;
                window.scrollTo({
                  top: currentScrollY + scrollAmount,
                  behavior: 'smooth'
                });
              }
            }}
          />
        </motion.div>
      )}
      <div
        className={animate === AnimationMode.DontAnimate ? 'hidden' : 'h-lvh'}
        ref={containerRef}
      />
    </>
  );
}
