'use client'

import Link from "next/link";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import SectionHeader from "@/components/sectionHeader";
import { Package } from "lucide-react";
import Masonry from "react-smart-masonry";

// Import your original image
import ExampleForest from '@public/exampleForest.jpeg';

interface NewsItem {
  title: string;
  href: string;
  tag: string;
  tagHref: string;
  image: any;
  imageSize: 'tiny' | 'small' | 'medium' | 'large' | 'huge' | 'massive';
}

export default function News() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const newsItems: NewsItem[] = [
    {
      title: "Title Projekt #1",
      href: "#human-nature-technology-entangelments",
      tag: "Workshop",
      tagHref: "workshop",
      image: ExampleForest,
      imageSize: "massive" // Keep your original sizes
    },
    {
      title: "Title Projekt #2",
      href: "#living-the-forest-lab-in-corsica",
      tag: "Excursion",
      tagHref: "excursion",
      image: ExampleForest,
      imageSize: "tiny"
    },
    {
      title: "Title Projekt #3",
      href: "#girls-day-the-sound-of-electrical-devices",
      tag: "Workshop",
      tagHref: "workshop",
      image: ExampleForest,
      imageSize: "tiny"
    },
    {
      title: "Title Projekt #4",
      href: "#digital-forest-twin",
      tag: "Project",
      tagHref: "project",
      image: ExampleForest,
      imageSize: "tiny"
    },
    {
      title: "Title Projekt #5",
      href: "#co2ntrol",
      tag: "Project",
      tagHref: "project",
      image: ExampleForest,
      imageSize: "tiny"
    },
    {
      title: "Title Projekt #6",
      href: "#offgrid",
      tag: "Project",
      tagHref: "project",
      image: ExampleForest,
      imageSize: "tiny"
    },
    {
      title: "Title Projekt #7",
      href: "#spreeberlin-meets-living-the-forest-lab",
      tag: "Workshop",
      tagHref: "workshop",
      image: ExampleForest,
      imageSize: "tiny"
    },
    {
      title: "Title Projekt #8",
      href: "#vulca-seminar",
      tag: "Talk",
      tagHref: "talk",
      image: ExampleForest,
      imageSize: "large"
    },
    {
      title: "Title Projekt #9",
      href: "#bol-symposium",
      tag: "Talk",
      tagHref: "talk",
      image: ExampleForest,
      imageSize: "medium"
    },
    {
      title: "Title Projekt #10",
      href: "#tag-der-offenen-reallabore",
      tag: "Talk",
      tagHref: "talk",
      image: ExampleForest,
      imageSize: "huge"
    },
    {
      title: "Title Projekt #11",
      href: "#patching-gone-wild",
      tag: "Workshop",
      tagHref: "workshop",
      image: ExampleForest,
      imageSize: "tiny"
    },
    {
      title: "Title Projekt #12",
      href: "#modular-hangout",
      tag: "Workshop",
      tagHref: "workshop",
      image: ExampleForest,
      imageSize: "small"
    },
    {
      title: "Title Projekt #13",
      href: "#digital-communication-transfer",
      tag: "Laboratory",
      tagHref: "laboratory",
      image: ExampleForest,
      imageSize: "massive"
    }
  ];

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

  const NewsCard = ({ item }: { item: NewsItem }) => {
    const imageClassName = getImageClassName(item.imageSize);

    return (
      <div className="space-y-3 group">
        <Link
          href={item.href}
          className="block overflow-hidden rounded-lg hover:shadow-lg transition-shadow duration-300"
        >
          <div className={`relative ${imageClassName}`}>
            <Image
              src={item.image}
              alt={item.title}
              fill
              sizes="(max-width: 350px) 100vw, (max-width: 750px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </Link>

        <div className="space-y-2">
          <Link
            href={item.href}
            className="block text-lg leading-tight text-black opacity-85 font-normal hover:opacity-75 transition-opacity no-underline"
          >
            {item.title}
          </Link>
          <div>
            <Link
              href={item.tagHref}
              className="inline-block px-2 py-1 text-xs font-mono tracking-wide text-black/70 border border-black/20 rounded hover:bg-black/5 transition-colors no-underline"
            >
              {item.tag}
            </Link>
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
              News
            </SectionHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {newsItems.map((item, index) => (
                <NewsCard key={index} item={item} />
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
            News
          </SectionHeader>

          {/* React Smart Masonry - The Perfect Solution! */}
          <Masonry
            breakpoints={breakpoints}
            columns={{
              mobile: 1,
              tablet: 2,
              desktop: 3
            }}
            gap={{
              mobile: 20,
              tablet: 30,
              desktop: 32 // 2rem = 32px
            }}
            autoArrange={true} // 🎯 This is the magic! Smart balance when gaps get too big
          >
            {newsItems.map((item, index) => (
              <NewsCard key={index} item={item} />
            ))}
          </Masonry>
        </div>
      </div>
    </div>
  );
}