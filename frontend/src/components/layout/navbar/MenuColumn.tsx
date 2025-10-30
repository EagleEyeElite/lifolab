"use client"

import React from "react";
import { Plus } from "lucide-react";
import DropdownMenu from "./DropdownMenu";
import { useSiteColors } from "@/contexts/ColorContext";

export interface NavigationLink {
  name: string;
  href: string;
  icon: React.ComponentType<{ size?: number }>;
}

export interface NavigationSection {
  title: string;
  links: NavigationLink[];
}

interface MenuColumnProps {
  title: string;
  navigationLinks?: NavigationLink[];
  sections?: NavigationSection[];
  showButtonBackground: boolean;
}

export default function MenuColumn({ title, navigationLinks, sections, showButtonBackground }: MenuColumnProps) {
  const { primaryColor, secondaryColor } = useSiteColors();

  return (
    <div className="relative w-full h-full group">
      {/* Hoverable area that covers the entire navbar height */}
      <div className="absolute left-0 right-0 top-0 bottom-0 z-10" />

      {/* Button background (visible when logo is at 100%) */}
      <div
        className={`absolute left-0 right-0 top-1/2 -translate-y-1/2 h-10 backdrop-blur-sm rounded-primary transition-opacity duration-300 ${
          showButtonBackground ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ backgroundColor: `${primaryColor}e6` }}
      />

      {/* Dropdown background wrapper */}
      <div className="absolute left-0 right-0 top-0 transition-all duration-300 ease-out origin-top scale-y-0 opacity-0 group-hover:scale-y-100 group-hover:opacity-100 z-10">
        <div className="rounded-b-primary backdrop-blur-sm" style={{ backgroundColor: secondaryColor }}>
          {/* Title area inside background - full navbar height */}
          <div className="flex items-center justify-between px-4 w-full h-navbar">
            <span className="invisible">{title}</span>
            <Plus size={16} className="invisible" />
          </div>
          {/* Dropdown menu */}
          <DropdownMenu navigationLinks={navigationLinks} sections={sections} />
        </div>
      </div>

      {/* Visible title (overlays the background) - text left, icon right */}
      <div className="relative z-20 h-full flex items-center justify-between px-4 transition-all duration-300 hover:opacity-70 w-full">
        <span>{title}</span>
        <Plus
          size={16}
          className="transition-transform duration-300 group-hover:rotate-45"
        />
      </div>
    </div>
  );
}