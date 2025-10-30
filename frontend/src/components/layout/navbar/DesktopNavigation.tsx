"use client"

import React from "react";
import MenuColumn from "./MenuColumn";
import { navbar } from "@/config/siteConfig";

interface DesktopNavigationProps {
  showButtonBackground: boolean;
  mode: 'desktop' | 'tablet';
  primaryColor: string;
  secondaryColor: string;
}

export default function DesktopNavigation({
  showButtonBackground,
  mode,
  primaryColor,
  secondaryColor,
}: DesktopNavigationProps) {
  const isDesktop = mode === 'desktop';

  const menuColumnWrapper = "pointer-events-auto relative z-30 h-navbar w-full";

  // For tablet mode, combine all links into sections
  const tabletSections = [
    {
      title: navbar.livingTheForestLab.title,
      links: navbar.livingTheForestLab.links,
    },
    {
      title: navbar.activities.title,
      links: navbar.activities.links,
    },
  ];

  // For desktop mode, each column gets a single section (title will be hidden automatically)
  const livingTheForestLabSections = [
    {
      title: navbar.livingTheForestLab.title,
      links: navbar.livingTheForestLab.links,
    },
  ];

  const activitiesSections = [
    {
      title: navbar.activities.title,
      links: navbar.activities.links,
    },
  ];

  return (
    <div className="relative z-20 px-container h-full flex items-center">
      <div className={`w-full grid ${isDesktop ? 'grid-cols-3' : 'grid-cols-2'} px-section gap-three-column-gap`}>
        <div />

        <div className={menuColumnWrapper}>
          <MenuColumn
            title={isDesktop ? navbar.livingTheForestLab.title : navbar.menu}
            sections={isDesktop ? livingTheForestLabSections : tabletSections}
            showButtonBackground={showButtonBackground}
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
          />
        </div>

        {isDesktop && (
          <div className={menuColumnWrapper}>
            <MenuColumn
              title={navbar.activities.title}
              sections={activitiesSections}
              showButtonBackground={showButtonBackground}
              primaryColor={primaryColor}
              secondaryColor={secondaryColor}
            />
          </div>
        )}
      </div>
    </div>
  );
}
