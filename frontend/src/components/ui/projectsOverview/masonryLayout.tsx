'use client'

import React, { useState, useEffect } from "react";
import Masonry from "react-smart-masonry";

interface MasonryLayoutProps {
  children: React.ReactNode;
}

export default function MasonryLayout({ children }: MasonryLayoutProps) {
  const [isMounted, setIsMounted] = useState(false);

  // Responsive breakpoints
  const breakpoints = {
    mobile: 0,
    tablet: 600,
    desktop: 1000
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Render fallback during server-side rendering and initial client render
  if (!isMounted) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {children}
      </div>
    );
  }

  return (
    <Masonry
      breakpoints={breakpoints}
      columns={{
        mobile: 1,
        tablet: 2,
        desktop: 3
      }}
      gap={{
        mobile: 35,
        tablet: 35,
        desktop: 35
      }}
      autoArrange={true}
      key={`masonry-${isMounted}`}
    >
      {children}
    </Masonry>
  );
}