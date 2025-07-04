'use client'

import Link from "next/link";
import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import SectionHeader from "@/components/sectionHeader";
import { Package } from "lucide-react";
import Masonry from "react-smart-masonry";
import {gql, useQuery} from '@apollo/client';

/**
 *
 * https://tympanus.net/codrops/2013/07/02/loading-effects-for-grid-items-with-css-animations/
 *
 * use this for loading in animation of the projects cards
 */

// Import your original image
import ExampleForest from '@public/exampleForest.jpeg';

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

const GET_POST = gql`
    query GetPost {
        posts(first: 1) {
            edges {
                node {
                    id
                    title
                    date
                    featuredImage {
                        node {
                            sourceUrl
                            altText
                        }
                    }
                    tags {
                        edges {
                            node {
                                name
                                slug
                            }
                        }
                    }
                }
            }
        }
    }
`;

export default function Projects() {
  const [isMounted, setIsMounted] = useState(false);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Use Apollo's useQuery hook
  const { data, loading, error } = useQuery<any>(GET_POST);

  const postData = data?.posts?.edges?.[0]?.node;
  const postTitle = postData?.title || "Default Title";
  const postDate = postData?.date || null;
  const postTags = postData?.tags?.edges?.map((edge: any) => edge.node) || [];
  const postFeaturedImage = postData?.featuredImage?.node;

  // Define projectsItems
  const projectsItems: ProjectItem[] = [
    {
      title: postTitle,
      href: "#human-nature-technology-entangelments",
      tags: postTags,
      date: postDate,
      image: postFeaturedImage?.sourceUrl || ExampleForest,
      imageSize: "massive"
    },
    {
      title: `${postTitle} #2`,
      href: "#living-the-forest-lab-in-corsica",
      tags: postTags,
      date: postDate,
      image: postFeaturedImage?.sourceUrl || ExampleForest,
      imageSize: "tiny"
    },
    {
      title: `${postTitle} #3`,
      href: "#girls-day-the-sound-of-electrical-devices",
      tags: postTags,
      date: postDate,
      image: postFeaturedImage?.sourceUrl || ExampleForest,
      imageSize: "tiny"
    },
    {
      title: `${postTitle} #4`,
      href: "#digital-forest-twin",
      tags: postTags,
      date: postDate,
      image: postFeaturedImage?.sourceUrl || ExampleForest,
      imageSize: "tiny"
    },
    {
      title: `${postTitle} #5`,
      href: "#co2ntrol",
      tags: postTags,
      date: postDate,
      image: postFeaturedImage?.sourceUrl || ExampleForest,
      imageSize: "tiny"
    },
    {
      title: `${postTitle} #6`,
      href: "#offgrid",
      tags: postTags,
      date: postDate,
      image: postFeaturedImage?.sourceUrl || ExampleForest,
      imageSize: "tiny"
    },
    {
      title: `${postTitle} #7`,
      href: "#spreeberlin-meets-living-the-forest-lab",
      tags: postTags,
      date: postDate,
      image: postFeaturedImage?.sourceUrl || ExampleForest,
      imageSize: "tiny"
    },
    {
      title: `${postTitle} #8`,
      href: "#vulca-seminar",
      tags: postTags,
      date: postDate,
      image: postFeaturedImage?.sourceUrl || ExampleForest,
      imageSize: "large"
    },
    {
      title: `${postTitle} #9`,
      href: "#bol-symposium",
      tags: postTags,
      date: postDate,
      image: postFeaturedImage?.sourceUrl || ExampleForest,
      imageSize: "medium"
    },
    {
      title: `${postTitle} #10`,
      href: "#tag-der-offenen-reallabore",
      tags: postTags,
      date: postDate,
      image: postFeaturedImage?.sourceUrl || ExampleForest,
      imageSize: "huge"
    },
    {
      title: `${postTitle} #11`,
      href: "#patching-gone-wild",
      tags: postTags,
      date: postDate,
      image: postFeaturedImage?.sourceUrl || ExampleForest,
      imageSize: "tiny"
    },
    {
      title: `${postTitle} #12`,
      href: "#modular-hangout",
      tags: postTags,
      date: postDate,
      image: postFeaturedImage?.sourceUrl || ExampleForest,
      imageSize: "small"
    },
    {
      title: `${postTitle} #13`,
      href: "#digital-communication-transfer",
      tags: postTags,
      date: postDate,
      image: postFeaturedImage?.sourceUrl || ExampleForest,
      imageSize: "massive"
    }
  ];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Single observer setup with proper cleanup
  const setupObserver = useCallback(() => {
    // Clean up existing observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Create new observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const newVisibleCards = new Set(visibleCards);
        let hasChanges = false;

        entries.forEach((entry) => {
          const index = parseInt(entry.target.getAttribute('data-index') || '0');
          if (entry.isIntersecting && !newVisibleCards.has(index)) {
            newVisibleCards.add(index);
            hasChanges = true;
          }
        });

        if (hasChanges) {
          setVisibleCards(newVisibleCards);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '20px 0px -20px 0px' // Reduced margins for stability
      }
    );

    // Observe all cards
    cardRefs.current.forEach((ref) => {
      if (ref && observerRef.current) {
        observerRef.current.observe(ref);
      }
    });
  }, [visibleCards]);

  // Setup observer after mount and masonry layout
  useEffect(() => {
    if (!isMounted) return;

    // Delay to ensure Masonry has completed its layout
    const timeoutId = setTimeout(() => {
      setupObserver();
    }, 300);

    return () => {
      clearTimeout(timeoutId);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [isMounted, setupObserver]);

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

  const ProjectCard = ({ item, index }: { item: ProjectItem; index: number }) => {
    const imageClassName = getImageClassName(item.imageSize);
    const isVisible = visibleCards.has(index);

    return (
      <div
        ref={el => {
          cardRefs.current[index] = el;
        }}
        data-index={index}
        className={`space-y-3 group transition-all duration-500 ease-out ${
          isVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-4'
        }`}
        style={{
          // Reduce animation intensity and remove staggered delays
          transitionDelay: '0s'
        }}
      >
        <Link
          href={item.href}
          className="block overflow-hidden rounded-lg hover:shadow-lg transition-shadow duration-300"
        >
          <div className={`relative ${imageClassName}`}>
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              // Add priority loading for images above the fold
              priority={index < 6}
              // Add sizes for better performance
              sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 33vw"
            />
          </div>
        </Link>

        <div className="space-y-2">
          <div className="flex justify-between items-start">
            <Link
              href={item.href}
              className="text-black text-sm font-mono tracking-wide leading-[1.2] no-underline flex-1 pr-2"
            >
              {item.title}
            </Link>
            {item.date && (
              <div className="text-xs font-mono text-gray-600 flex-shrink-0">
                {new Date(item.date).toLocaleDateString()}
              </div>
            )}
          </div>
          <div className="flex flex-wrap gap-1">
            {item.tags?.map((tag, index) => (
              <Link
                key={index}
                href={`/tags/${tag.slug}`}
                className="inline-flex items-center px-[7px] py-[3px] text-xs font-mono leading-[1.2] text-black bg-[rgba(0,255,94,0.91)] border border-black rounded-full no-underline"
              >
                {tag.name}
              </Link>
            ))}
            {item.tag && (
              <Link
                href={item.tagHref || '#'}
                className="inline-flex items-center px-[7px] py-[3px] text-xs font-mono leading-[1.2] text-black bg-[rgba(0,255,94,0.91)] border border-black rounded-full no-underline"
              >
                {item.tag}
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Responsive breakpoints
  const breakpoints = {
    mobile: 0,
    tablet: 600,
    desktop: 1000
  };

  // Render fallback during server-side rendering and initial client render
  if (!isMounted) {
    return (
      <div className="flex justify-start w-full">
        <div className="w-full">
          <div className="px-[1.6rem] py-[1.6rem] space-y-6">
            <SectionHeader icon={Package}>
              Projects
            </SectionHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projectsItems.map((item, index) => (
                <ProjectCard key={index} item={item} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start w-full">
      <div className="w-full">
        <div className="px-[1.6rem] py-[1.6rem] space-y-6">
          <SectionHeader icon={Package}>
            Projects
          </SectionHeader>

          {/* React Smart Masonry with stable configuration */}
          <Masonry
            breakpoints={breakpoints}
            columns={{
              mobile: 1,
              tablet: 2,
              desktop: 3
            }}
            gap={{
              mobile: 12,
              tablet: 14,
              desktop: 17
            }}
            autoArrange={true}
            // Add key to force re-render when needed
            key={`masonry-${isMounted}`}
          >
            {projectsItems.map((item, index) => (
              <ProjectCard key={index} item={item} index={index} />
            ))}
          </Masonry>
        </div>
      </div>
    </div>
  );
}
