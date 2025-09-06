"use client"

import React from "react";
import Link from "next/link";

interface DropdownMenuProps {
  isOpen: boolean;
  navigationLinks: Array<{
    name: string;
    href: string;
    icon: React.ComponentType<{ size?: number }>;
  }>;
  onClose?: () => void;
}

export default function DropdownMenu({ isOpen, navigationLinks, onClose }: DropdownMenuProps) {
  return (
    <div
      className="px-4 duration-300 ease-out grid grid-rows-[0fr] opacity-0 data-[open=true]:grid-rows-[1fr] data-[open=true]:opacity-100"
      data-open={isOpen}
    >
      <div className="overflow-hidden">
        <ul className="divide-y divide-black/30">
          {navigationLinks.map((link) => {
            const IconComponent = link.icon;
            return (
              <li key={link.href} className="py-4 pl-2">
                <Link
                  href={link.href}
                  className="flex gap-2 text-sm hover:opacity-70 transition-opacity"
                  onClick={onClose}
                >
                  <IconComponent size={16} />
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}