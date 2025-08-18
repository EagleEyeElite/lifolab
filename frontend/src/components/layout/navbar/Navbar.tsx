"use client"

import React, { useState } from "react";
import {Pencil, Package, Command, Globe, Mic, BookOpen} from "lucide-react";
import ScrollAnimatedLogo from "@/components/layout/navbar/ScrollAnimatedLogo";
import MenuColumn from "@/components/layout/navbar/MenuColumn";

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  const navigationLinks = [
    { name: "About", href: "/#about", icon: Pencil },
    { name: "People", href: "/#people", icon: Command },
    { name: "Places", href: "/#places", icon: Globe },
    { name: "Contact", href: "#footer", icon: Mic }
  ];

  const navigationLinks2 = [
    { name: "Projects", href: "/#projects", icon: Package },
    { name: "Cyclopedia of ...", href: "/#", icon: BookOpen },
  ];

  const toggleDropdown = (dropdown: number) => {
    setOpenDropdown(current => current === dropdown ? null : dropdown);
  };

  return <>
    <nav className="fixed top-0 h-navbar w-full z-30 pointer-events-none">
      <div className="grid grid-cols-3 h-full">
        <div />
        <MenuColumn
          title="Living the Forest Lab"
          isOpen={openDropdown === 1}
          onToggle={() => toggleDropdown(1)}
          navigationLinks={navigationLinks}
        />
        <MenuColumn
          title="Activities"
          isOpen={openDropdown === 2}
          onToggle={() => toggleDropdown(2)}
          navigationLinks={navigationLinks2}
        />
      </div>
    </nav>
    <div className="relative z-10">
      <ScrollAnimatedLogo />
    </div>
    {/* Backdrop overlay when dropdown is open */}
    {openDropdown && (
      <button
        className="fixed inset-0 z-10"
        onClick={() => setOpenDropdown(null)}
        aria-label="Close menu"
      />
    )}
  </>;
}
