"use client"

import Image from 'next/image';
import Match from '@public/match.svg'
import {useScroll, useSpring, useTransform} from "motion/react"
import * as motion from "motion/react-client"
import {easeIn, easeOut} from "motion";
import React, {useRef} from 'react';

interface ScrollAnimatedLogoProps {
  showFullNav?: boolean;
}

export default function ScrollAnimatedLogo({ showFullNav = true }: ScrollAnimatedLogoProps) {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const scrollYSpring = useSpring(scrollYProgress, { stiffness: 1500, damping: 100, mass: 1 })

  const scale = useTransform(
    scrollYSpring,
    [0, 1],
    [1, 0.2],
    { ease: easeOut}
  )

  return (
    <>
      <motion.div
        className="fixed z-100 grid place-items-center"
        style={{
          scale,
        }}
      >
        <Image
          src={Match}
          alt="Living the Forest Lab"
          width={800}
          height={800}
          className="cursor-pointer"
        />
      </motion.div>
      {showFullNav && <div className="h-lvh bg-blue-300" ref={containerRef}/>}
    </>
  );
}