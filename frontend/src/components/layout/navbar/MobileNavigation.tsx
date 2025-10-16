"use client"

import React, { useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";

interface NavigationLink {
  name: string;
  href: string;
  icon: React.ComponentType<{ size?: number }>;
}

interface MobileNavigationProps {
  navigationLivingTheForestLab: NavigationLink[];
  navigationActivities: NavigationLink[];
}

export default function MobileNavigation({
                                           navigationLivingTheForestLab,
                                           navigationActivities,
                                         }: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-x-0 top-0 h-lvh bg-black/15 pointer-events-auto transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={close}
      />
      <div className="flex justify-end px-8">
        <button
          onClick={toggle}
          className="flex items-center gap-2 px-4 py-2 mt-4 bg-primary rounded-primary hover:opacity-70 transition-opacity pointer-events-auto"
        >
          <span className={isOpen ? '' : 'underline'}>Menu</span>
          <Plus size={16} className={`transition-transform ${isOpen ? 'rotate-45' : ''}`} />
        </button>
      </div>
      <div className={`absolute top-full left-8 right-8 sm:left-auto sm:right-8 sm:w-80 mt-2 bg-primary rounded-primary backdrop-blur-sm pointer-events-auto transition-all duration-300 transform-gpu ${
        isOpen
          ? 'opacity-100 scale-100 translate-y-0'
          : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
      }`}>
        <div className="p-6">
          {/* Living the Forest Lab */}
          <div className="mb-6">
            <h3 className="font-bold text-sm text-black/80 mb-2 pb-2 border-b border-black/20">
              Living the Forest Lab
            </h3>
            <ul>
              {navigationLivingTheForestLab.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={close}
                    className="flex items-center gap-3 py-1.5 hover:opacity-70 transition-opacity"
                  >
                    <link.icon size={18} />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Activities */}
          <div>
            <h3 className="font-bold text-sm text-black/80 mb-2 pb-2 border-b border-black/20">
              Aktivitäten
            </h3>
            <ul>
              {navigationActivities.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={close}
                    className="flex items-center gap-3 py-1.5 hover:opacity-70 transition-opacity"
                  >
                    <link.icon size={18} />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
