"use client"

import React from "react";
import { Plus } from "lucide-react";
import DropdownMenu from "./DropdownMenu";

interface MenuColumnProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  onClose?: () => void;
  navigationLinks: Array<{
    name: string;
    href: string;
    icon: React.ComponentType<{ size?: number }>;
  }>;
}

export default function MenuColumn({ title, isOpen, onToggle, onClose, navigationLinks }: MenuColumnProps) {
  return <>
    <div className="relative flex flex-col transition-all duration-300">
      {/* LAYER 1: Button background (bottom layer) */}
      <div className="absolute top-4 left-0 right-0 h-10 bg-primary/90 backdrop-blur-sm rounded-primary" />

      {/* LAYER 2: Dropdown background (middle layer) */}
      <div
        className="absolute inset-0 bg-primary rounded-b-primary border-x border-b border-black/20 transition-all duration-300 ease-out origin-top shadow-lg scale-y-0 opacity-0 data-[open=true]:scale-y-100 data-[open=true]:opacity-100"
        data-open={isOpen}
      />

      {/* LAYER 3: Dropdown menu (now 3rd) */}
      <div className="relative order-2">
        <DropdownMenu isOpen={isOpen} navigationLinks={navigationLinks} onClose={onClose} />
      </div>

      {/* LAYER 4: Interactive content (now 4th) */}
      <div className="relative order-1">
        <button
          onClick={onToggle}
          className="flex items-center justify-center gap-2 px-4 py-2 transition-all duration-300 mt-4 hover:opacity-70 w-full"
          aria-label={`Toggle ${title} menu`}
        >
          <span className="data-[open=false]:underline" data-open={isOpen}>{title}</span>
          <Plus
            size={16}
            className="transition-transform duration-300 data-[open=true]:rotate-45"
            data-open={isOpen}
          />
        </button>
      </div>
    </div>
  </>;
}