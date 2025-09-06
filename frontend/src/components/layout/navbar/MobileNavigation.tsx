"use client"

import React, { useState } from "react";
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
      <div className="flex justify-end pr-8">
        <button
          onClick={toggle}
          className="flex items-center gap-2 px-4 py-2 mt-4 bg-primary rounded-lg hover:opacity-70 transition-opacity"
        >
          <span className={isOpen ? '' : 'underline'}>Menu</span>
          <Plus size={16} className={`transition-transform ${isOpen ? 'rotate-45' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute top-full right-8 w-80 mt-2 bg-primary border border-black/20 rounded-lg shadow-lg">
            <div className="p-6">
              {/* Living the Forest Lab */}
              <div className="mb-6">
                <h3 className="font-bold text-sm text-black/80 mb-4 pb-2 border-b border-black/20">
                  Living the Forest Lab
                </h3>
                <ul className="space-y-3">
                  {navigationLivingTheForestLab.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        onClick={close}
                        className="flex items-center gap-3 hover:opacity-70 transition-opacity"
                      >
                        <link.icon size={18} />
                        <span>{link.name}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Activities */}
              <div>
                <h3 className="font-bold text-sm text-black/80 mb-4 pb-2 border-b border-black/20">
                  Aktivitäten
                </h3>
                <ul className="space-y-3">
                  {navigationActivities.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        onClick={close}
                        className="flex items-center gap-3 hover:opacity-70 transition-opacity"
                      >
                        <link.icon size={18} />
                        <span>{link.name}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/15"
          onClick={close}
        />
      )}
    </>
  );
}
