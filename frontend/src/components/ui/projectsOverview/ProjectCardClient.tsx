'use client'

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import HTMLRenderer from "@/components/ui/renderHtml/htmlRenderer";
import SubHeading from "@/components/ui/SubHeading";

const getImageClassName = (size: 'tiny' | 'small' | 'medium' | 'large' | 'huge' | 'massive') => {
  switch (size) {
    case 'tiny':
      return "w-full h-32";
    case 'small':
      return "w-full h-44";
    case 'medium':
      return "w-full h-64";
    case 'large':
      return "w-full h-80";
    case 'huge':
      return "w-full h-96";
    case 'massive':
      return "w-full h-[28rem]";
    default:
      return "w-full h-64";
  }
};

/**
 *
 * https://tympanus.net/codrops/2013/07/02/loading-effects-for-grid-items-with-css-animations/
 *
 * use this for loading in animation of the projects cards
 */

interface ProjectCardClientProps {
  title: string;
  href: string;
  whenAndWhere?: string;
  excerpt?: string;
  image: string;
  imageSize: 'tiny' | 'small' | 'medium' | 'large' | 'huge' | 'massive';
  tagList?: React.ReactNode;
}

export default function ProjectCardClient({ 
  title, 
  href, 
  whenAndWhere, 
  excerpt,
  image, 
  imageSize,
  tagList,
}: ProjectCardClientProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

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
      <div className={`relative duration-200 ${getImageClassName(imageSize)}`}>
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover rounded-primary group-hover:blur-xs duration-200"
          sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 33vw"
        />
      </div>
      <div className="pt-2 group-hover:text-secondary">
        <SubHeading>{title}</SubHeading>
      </div>
    </Link>
    <div className="font-heading pt-3 relative z-10 group-hover:blur-xs duration-200">
      {tagList}
    </div>
    </div>
  </>
}
