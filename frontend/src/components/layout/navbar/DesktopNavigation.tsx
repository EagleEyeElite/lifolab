"use client"

import React from "react";
import MenuColumn from "./MenuColumn";

interface NavigationLink {
  name: string;
  href: string;
  icon: React.ComponentType<{ size?: number }>;
}

interface DesktopNavigationProps {
  navigationLivingTheForestLab: NavigationLink[];
  navigationActivities: NavigationLink[];
}

export default function DesktopNavigation({
  navigationLivingTheForestLab,
  navigationActivities,
}: DesktopNavigationProps) {
  return (
    <div className="relative z-20 px-container h-full flex items-center">
      <div className="w-full flex flex-col items-center gap-0 md:grid md:grid-cols-3 px-section md:gap-three-column-gap">
        <div className="hidden md:block" />
        <div className="pointer-events-auto relative z-30 h-navbar w-full">
          <MenuColumn
            title="Living the Forest Lab"
            navigationLinks={navigationLivingTheForestLab}
          />
        </div>
        <div className="pointer-events-auto relative z-30 h-navbar w-full">
        <MenuColumn
          title="Activities"
          navigationLinks={navigationActivities}
        />
        </div>
      </div>
    </div>
  );
}