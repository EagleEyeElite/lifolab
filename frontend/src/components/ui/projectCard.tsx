'use client'

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import TagPill from "./tagPill";

interface ProjectItem {
  title: string;
  href: string;
  tag?: string;
  tagHref?: string;
  tags?: Array<{ name: string; slug: string }>;
  date?: string;
  image: any;
  imageSize: 'tiny' | 'small' | 'medium' | 'large' | 'huge' | 'massive';
}

interface ProjectCardProps {
  item: ProjectItem;
  index: number;
}

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

export default function ProjectCard({ item, index }: ProjectCardProps) {
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

  return (
    <div
      ref={cardRef}
      data-index={index}
      className={`space-y-3 group ${shouldAnimate ? 'transition-all duration-500 ease-out' : ''} ${
        isVisible ? 'opacity-100 translate-y-0' : shouldAnimate ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
      }`}
    >
      <Link href={item.href} className="block overflow-hidden rounded-lg hover:shadow-lg transition-shadow duration-300">
        <div className={`relative ${getImageClassName(item.imageSize)}`}>
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            priority={index < 6}
            sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 33vw"
          />
        </div>
      </Link>

      <div className="space-y-2">
        <div className="flex justify-between items-start">
          <Link href={item.href} className="text-black text-sm font-mono tracking-wide leading-[1.2] no-underline flex-1 pr-2">
            {item.title}
          </Link>
          {item.date && (
            <div className="text-xs font-mono text-gray-600 flex-shrink-0">
              {new Date(item.date).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' })}
            </div>
          )}
        </div>
        {(item.tags?.length || item.tag) && (
          <div className="flex flex-wrap gap-1">
            {[
              ...(item.tags || []).map(tag => ({ name: tag.name, href: `/tags/${tag.slug}` })),
              ...(item.tag ? [{ name: item.tag, href: item.tagHref || '#' }] : [])
            ].map((tag, tagIndex) => (
              <TagPill key={tagIndex} name={tag.name} href={tag.href} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export type { ProjectItem };