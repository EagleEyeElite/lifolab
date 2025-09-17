'use client'

import React, { useState, useEffect } from "react";
import Masonry from "react-smart-masonry";

interface MasonryLayoutProps {
  children: React.ReactNode;
}

export default function MasonryLayout({ children }: MasonryLayoutProps) {
  const [gapSize, setGapSize] = useState<number | null>(null);

  // Responsive breakpoints
  const breakpoints = {
    mobile: 0,
    tablet: 600,
    desktop: 1000
  };

  useEffect(() => {
    // Get the three-column gap from CSS custom properties
    const styles = getComputedStyle(document.documentElement);
    const fontSize = parseFloat(styles.fontSize);
    const threeColumnGap = parseFloat(styles.getPropertyValue('--spacing-three-column-gap')) * fontSize;

    setGapSize(threeColumnGap);
  }, []);

  const cards = React.Children.map(children, (child, index) => (
      <div className="pb-3">
        {child}
      </div>
    ))

  const isMounted = gapSize != null;

  // Render fallback during server-side rendering and initial client render
  if (!isMounted) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards}
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
        mobile: gapSize,
        tablet: gapSize,
        desktop: gapSize
      }}
      autoArrange={true}
      key={`masonry-${isMounted}`}
    >
      {cards}
    </Masonry>
  );
}
