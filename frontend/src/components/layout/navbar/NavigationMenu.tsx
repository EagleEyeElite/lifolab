"use client"

import Link from "next/link";
import React, {ReactNode, useState} from "react";
import { Command, Package, Pencil, Menu } from "lucide-react";

const navLinks = [
  { name: "About", href: "/#about", icon: Pencil },
  { name: "Projects", href: "/#projects", icon: Package },
  { name: "People", href: "/#people", icon: Command },
];

interface NavPillProps {
  children: ReactNode;
}
function NavPill({ children, ...props }: NavPillProps) {
  return (
    <div
      className="border border-r-0 rounded-l-3xl p-0.5 pl-4 bg-accent-green"
      {...props}
    >
      {children}
    </div>
  );
}

interface NavLinkItemProps {
  link: {
    name: string;
    href: string;
    icon: React.ComponentType<{ size?: number }>;
  };
  callback?: () => void;
}

function NavLinkItem({ link, callback = ()=> {}}: NavLinkItemProps) {
  const IconComponent = link.icon;
  return (
    <Link href={link.href} onClick={callback} className="inline-flex items-center gap-2">
      <IconComponent size={12} />
      {link.name}
    </Link>
  );
}

interface MobileMenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

function MobileMenuOverlay({ isOpen, onClose }: MobileMenuOverlayProps) {
  if (!isOpen) return null;
  return (
    <div className="absolute right-0 z-10">
      <NavPill>
        <div className="flex flex-col p-4">
          {navLinks.map((link) => (
            <NavLinkItem key={link.name} link={link} callback={onClose} />
          ))}
        </div>
      </NavPill>
    </div>
  );
}

export default function NavigationMenu() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="@container">
      <div className="justify-self-end w-fit">
        {/* Mobile Menu Button - shown when the screen is narrow */}
        <div className="@md:hidden w-fit">
          <NavPill>
            <button
              onClick={() => {setIsMobileMenuOpen(!isMobileMenuOpen);}}
              className="flex items-center gap-2"
              aria-label="Toggle mobile menu"
            >
              <Menu size={16} />
              Menu
            </button>
          </NavPill>
          <MobileMenuOverlay
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          />
        </div>

        {/* Desktop Navigation - shown when screen is wide enough */}
        <div className="hidden @md:flex">
          <NavPill>
            <ul className="flex gap-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <NavLinkItem link={link} />
                </li>
              ))}
            </ul>
          </NavPill>
        </div>
      </div>
    </div>
  );
}
