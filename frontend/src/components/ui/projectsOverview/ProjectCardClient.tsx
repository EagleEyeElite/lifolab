'use client'

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import HTMLRenderer from "@/components/ui/renderHtml/htmlRenderer";
import SubHeading from "@/components/ui/SubHeading";

/**
 *
 * https://tympanus.net/codrops/2013/07/02/loading-effects-for-grid-items-with-css-animations/
 *
 * use this for loading in animation of the projects cards
 */

interface ProjectCardClientProps {
  title: string;
  href: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  tagList?: React.ReactNode;
  primaryColor: string;
  secondaryColor: string;
}

export default function ProjectCardClient({
  title,
  href,
  image,
  imageWidth,
  imageHeight,
  tagList,
  primaryColor,
  secondaryColor,
}: ProjectCardClientProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const element = cardRef.current;
    if (!element) return;

    // Check if already visible on mount
    const rect = element.getBoundingClientRect();
    const inViewOnMount = rect.top < window.innerHeight && rect.bottom > 0;
    
    if (inViewOnMount) {
      setIsVisible(true);
      setShouldAnimate(false);
      return;
    }

    // Set up for animation - start hidden, enable transitions
    setShouldAnimate(true);
    setIsVisible(false);
    
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.1, rootMargin: '20px 0px -20px 0px' }
    );

    observer.observe(element);
    return () => observer.unobserve(element);
  }, []);

  return <>
    <div
      ref={cardRef}
      className={`group relative ${shouldAnimate ? 'duration-200 ease-out' : ''} ${
        isVisible ? 'opacity-100 translate-y-0' : shouldAnimate ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
      }`}
    >
    <Link href={href} className="relative z-10">
      <div className="relative rounded-primary group-hover:blur-xs duration-200 w-full max-h-[800px] overflow-hidden">
        <Image
          src={image}
          alt={title}
          width={imageWidth}
          height={imageHeight}
          className="object-cover"
          sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 33vw"
        />
      </div>
      <div
        className="pt-2 transition-colors"
        style={{ color: isHovered ? secondaryColor : 'inherit' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <SubHeading>{title}</SubHeading>
      </div>
    </Link>
    <div className="font-heading pt-3 relative z-10">
      {tagList}
    </div>
    </div>
  </>
}
