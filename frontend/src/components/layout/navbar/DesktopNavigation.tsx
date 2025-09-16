"use client"

import React, { useState } from "react";
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
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  const toggleDropdown = (dropdown: number) => {
    setOpenDropdown(current => {
      // If clicking the same dropdown that's already open, close it
      if (current === dropdown) {
        return null;
      }
      // If clicking a different dropdown (or no dropdown is open), open the new one
      return dropdown;
    });
  };

  const closeDropdown = () => {
    setOpenDropdown(null);
  };
  return (
    <div className="relative z-20 px-container">
      <div className="grid grid-cols-3 px-section gap-three-column-gap">
        <div />
        <div className="pointer-events-auto">
          <MenuColumn
            title="Living the Forest Lab"
            isOpen={openDropdown === 1}
            onToggle={() => toggleDropdown(1)}
            onClose={closeDropdown}
            navigationLinks={navigationLivingTheForestLab}
          />
        </div>
        <div className="pointer-events-auto">
        <MenuColumn
          title="Aktivitäten"
          isOpen={openDropdown === 2}
          onToggle={() => toggleDropdown(2)}
          onClose={closeDropdown}
          navigationLinks={navigationActivities}
        />
        </div>
      </div>
      
      {/* Desktop backdrop overlay when dropdown is open */}
      {openDropdown && (
        <button
          className="fixed inset-0 pointer-events-auto z-10"
          onClick={closeDropdown}
          aria-label="Close menu"
        />
      )}
    </div>
  );
}