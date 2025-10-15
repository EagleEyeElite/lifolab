"use client"

import React from "react";
import { Plus } from "lucide-react";
import DropdownMenu from "./DropdownMenu";

interface MenuColumnProps {
  title: string;
  navigationLinks: Array<{
    name: string;
    href: string;
    icon: React.ComponentType<{ size?: number }>;
  }>;
}

export default function MenuColumn({ title, navigationLinks }: MenuColumnProps) {
  return (
    <div className="relative w-full h-full group">
      {/* Hoverable area that covers the entire navbar height */}
      <div className="absolute left-0 right-0 top-0 bottom-0 z-10" />

      {/* Background wrapper that extends to top of screen and sizes to content */}
      <div className="absolute left-0 right-0 top-0 transition-all duration-300 ease-out origin-top scale-y-0 opacity-0 group-hover:scale-y-100 group-hover:opacity-100 z-10">
        <div className="bg-secondary rounded-b-primary backdrop-blur-sm">
          {/* Title area inside background - full navbar height */}
          <div className="flex items-center justify-between px-4 w-full h-navbar">
            <span className="invisible">{title}</span>
            <Plus size={16} className="invisible" />
          </div>
          {/* Dropdown menu */}
          <DropdownMenu navigationLinks={navigationLinks} />
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