"use client"

import Image from 'next/image';
import Link from 'next/link';
import Match from '@public/match.svg'
import {useScroll, useSpring, useTransform} from "motion/react"
import * as motion from "motion/react-client"
import {easeIn, easeOut} from "motion";

import { RefObject } from 'react';

interface ScrollAnimatedLogoProps {
  containerRef: RefObject<HTMLElement | null>;
  shouldStartFromTop?: boolean;
}

export default function ScrollAnimatedLogo({ containerRef, shouldStartFromTop = true }: ScrollAnimatedLogoProps) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const scrollYSpring = useSpring(scrollYProgress,
    {
      stiffness: 1500,
      damping: 100,
      mass: 1
    })

  // Define your target sizes explicitly
  const initialSize = 800;
  const targetSize = 100;
  const targetScale = targetSize / initialSize;

  const scale = useTransform(
    scrollYSpring,
    [0, 1],
    shouldStartFromTop ? [1, targetScale] : [targetScale, targetScale],
    { ease: easeOut}
  )

  const y = useTransform(
    scrollYSpring,
    [0, 1],
    shouldStartFromTop ? [`calc(0vh + 0% * ${targetScale} + 0px)`, `calc(-50vh + 50% * ${targetScale} + 0px)`] : [`calc(-50vh + 50% * ${targetScale} + 0px)`, `calc(-50vh + 50% * ${targetScale} + 0px)`],
    { ease: easeOut}
  )
  const x = useTransform(
    scrollYSpring,
    [0, 1],
    shouldStartFromTop ? [`calc(0vw + 0% * ${targetScale} + 0px)`, `calc(-50vw + 50% * ${targetScale} + 0px)`] : [`calc(-50vw + 50% * ${targetScale} + 0px)`, `calc(-50vw + 50% * ${targetScale} + 0px)`],
    { ease: easeIn }
  )

  return (
    <>
      <motion.div
        className="fixed z-100 inset-0 grid place-items-center"
        style={{
          scale,
          x,
          y,
        }}
      >
        <Link href="/" className="hover:opacity-70 transition-opacity">
          <Image
            src={Match}
            alt="Living the Forest Lab"
            width={800}
            height={800}
            className="cursor-pointer"
          />
        </Link>
      </motion.div>
    </>
  );
}