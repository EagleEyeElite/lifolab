"use client"

import Image from 'next/image';
import Match from '@public/match.svg'
import {useScroll, useSpring, useTransform} from "motion/react"
import * as motion from "motion/react-client"
import {easeIn, easeOut} from "motion";

import { RefObject } from 'react';

interface ScrollAnimatedLogoProps {
  containerRef: RefObject<HTMLElement | null>;
}

export default function ScrollAnimatedLogo({ containerRef }: ScrollAnimatedLogoProps) {
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
    [1, targetScale],
    { ease: easeOut}
  )

  const y = useTransform(
    scrollYSpring,
    [0, 1],
    [`calc(0vh + 0% * ${targetScale} + 0px)`, `calc(-50vh + 50% * ${targetScale} + 0px)`],
    { ease: easeOut}
  )
  const x = useTransform(
    scrollYSpring,
    [0, 1],
    [`calc(0vw + 0% * ${targetScale} + 0px)`, `calc(-50vw + 50% * ${targetScale} + 0px)`],
    { ease: easeIn }
  )

  return (
    <>
      <motion.div
        className="fixed inset-0 grid place-items-center"
        style={{
          scale,
          x,
          y,
        }}
      >
        <Image
          src={Match}
          alt="Match"
          width={800}
          height={800}
        />
      </motion.div>
    </>
  );
}