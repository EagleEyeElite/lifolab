"use client"

import React from "react";
import Link from "next/link";

interface DropdownMenuProps {
  navigationLinks: Array<{
    name: string;
    href: string;
    icon: React.ComponentType<{ size?: number }>;
  }>;
}

export default function DropdownMenu({ navigationLinks }: DropdownMenuProps) {
  return (
    <div className="px-4 duration-300 ease-out grid grid-rows-[0fr] opacity-0 group-hover:grid-rows-[1fr] group-hover:opacity-100">
      <div className="overflow-hidden">
        <ul className="divide-y divide-black/30 pb-2">
          {navigationLinks.map((link) => {
            const IconComponent = link.icon;
            return (
              <li key={link.href} className="py-3 pl-2">
                <Link
                  href={link.href}
                  className="flex gap-2 text-sm hover:opacity-70 transition-opacity"
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