"use client"

import React from "react";
import { Plus } from "lucide-react";
import DropdownMenu from "./DropdownMenu";

interface MenuColumnProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  navigationLinks: Array<{
    name: string;
    href: string;
    icon: React.ComponentType<{ size?: number }>;
  }>;
}

export default function MenuColumn({ title, isOpen, onToggle, navigationLinks }: MenuColumnProps) {
  return (
    <div className={`relative z-30 pointer-events-auto transition-all duration-300 ${
      isOpen 
        ? 'bg-primary border-l border-r' 
        : 'bg-primary border-l border-b border-r rounded-bl-3xl rounded-br-3xl'
    }`}>
      <button
        onClick={onToggle}
        className="flex items-center justify-between h-full w-full px-4"
        aria-label={`Toggle ${title} menu`}
      >
        <span>{title}</span>
        <Plus
          size={20}
          className={`transition-transform duration-300 ${isOpen ? 'rotate-45' : 'rotate-0'}`}
        />
      </button>
      <DropdownMenu isOpen={isOpen} navigationLinks={navigationLinks} />
    </div>
  );
}