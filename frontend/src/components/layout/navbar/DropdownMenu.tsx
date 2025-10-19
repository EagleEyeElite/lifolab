"use client"

import React from "react";
import Link from "next/link";
import { NavigationLink, NavigationSection } from "./MenuColumn";

interface DropdownMenuProps {
  navigationLinks?: NavigationLink[];
  sections?: NavigationSection[];
}

interface MenuLinkProps {
  link: NavigationLink;
  variant?: 'flat' | 'section';
}

function MenuLink({ link, variant = 'flat' }: MenuLinkProps) {
  const IconComponent = link.icon;

  return (
    <li>
      <Link
        href={link.href}
        className="flex gap-2 py-3 pl-2 text-sm hover:opacity-70 transition-opacity"
      >
        <IconComponent size={16} />
        <span>{link.name}</span>
      </Link>
    </li>
  );
}

export default function DropdownMenu({ navigationLinks, sections }: DropdownMenuProps) {
  const showSectionTitles = sections && sections.length > 1;

  return (
    <div className="px-4 duration-300 ease-out grid grid-rows-[0fr] opacity-0 group-hover:grid-rows-[1fr] group-hover:opacity-100">
      <div className="overflow-hidden">
        {sections ? (
          <div className="pb-2">
            {sections.map((section, sectionIndex) => (
              <div key={section.title} className={sectionIndex > 0 ? "mt-4" : ""}>
                {showSectionTitles && (
                  <h3 className="font-bold text-sm text-black/80 mb-2">
                    {section.title}
                  </h3>
                )}
                <ul className="divide-y divide-black/30">
                  {section.links.map((link) => (
                    <MenuLink key={link.href} link={link} variant="section" />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <ul className="divide-y divide-black/30 pb-2">
            {navigationLinks?.map((link) => (
              <MenuLink key={link.href} link={link} variant="flat" />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}