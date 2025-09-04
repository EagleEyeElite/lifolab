"use client"

import React from "react";
import Link from "next/link";
import {Pencil, Package, Command, FileText, Mic} from "lucide-react";

interface DropdownListProps {
  navigationLinks: Array<{
    name: string;
    href: string;
    icon: React.ComponentType<{ size?: number }>;
  }>;
}

function DropdownList({ navigationLinks }: DropdownListProps) {
  return (
    <ul className="space-y-2">
      {navigationLinks.map((link) => {
        const IconComponent = link.icon;

        return (
          <li key={link.href}>
            <Link
              href={link.href}
              className="flex items-center gap-2 hover:opacity-70 transition-opacity"
            >
              {link.name}
              <IconComponent size={16} />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

function DropdownAnimationWrapper({ isOpen, children }: {
  isOpen: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={`absolute top-full left-0 right-0 z-40 overflow-hidden transition-all duration-300 ease-out ${
      isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
    }`}>
      <div className={`bg-primary border-l border-b border-r rounded-bl-3xl rounded-br-3xl transition-all duration-300 ease-out ${
        isOpen ? 'translate-y-0' : '-translate-y-4'
      }`} style={{ marginLeft: '-1px', marginRight: '-1px' }}>
        <div className={`p-4 text-sm leading-relaxed transition-all duration-300 ${
          isOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}>
          {children}
        </div>
      </div>
    </div>
  );
}

interface DropdownMenuProps extends DropdownListProps {
  isOpen: boolean;
}

export default function DropdownMenu({ isOpen, navigationLinks }: DropdownMenuProps) {
  return (
    <DropdownAnimationWrapper isOpen={isOpen}>
      <DropdownList navigationLinks={navigationLinks} />
    </DropdownAnimationWrapper>
  );
}
