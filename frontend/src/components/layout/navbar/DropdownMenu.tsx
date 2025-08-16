"use client"

import React from "react";
import Link from "next/link";
import {Pencil, Package, Command, FileText, Mic} from "lucide-react";

interface NavLinkItemProps {
  link: {
    name: string;
    href: string;
    icon: React.ComponentType<{ size?: number }>;
  };
}

interface DropdownMenuProps {
  isOpen: boolean;
  navigationLinks: Array<{
    name: string;
    href: string;
    icon: React.ComponentType<{ size?: number }>;
  }>;
}

function NavLinkItem({ link }: NavLinkItemProps) {
  const IconComponent = link.icon;

  return (
    <li>
      <Link
        href={link.href}
        className="flex items-center gap-2 hover:opacity-70 transition-opacity"
      >
        {link.name}
        <IconComponent size={16} />
      </Link>
    </li>
  );
}

export default function DropdownMenu({ isOpen, navigationLinks }: DropdownMenuProps) {
  return (
    <div className={`absolute top-full left-0 right-0 z-40 overflow-visible transition-all duration-300 ease-out ${
      isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
    }`}>
      <div className={`bg-primary border-l border-b border-r rounded-bl-3xl rounded-br-3xl transition-all duration-300 ease-out ${
        isOpen ? 'translate-y-0' : '-translate-y-4'
      }`} style={{ marginLeft: '-1px', marginRight: '-1px' }}>
        <div className="p-4 text-sm leading-relaxed">
          <ul className="space-y-2">
            {navigationLinks.map((link) => (
              <NavLinkItem key={link.href} link={link} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
