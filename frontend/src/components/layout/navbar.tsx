"use client"

import Link from "next/link";
import {useRef, useState} from "react";
import {Command, Globe, Mic, Package, Pencil} from "lucide-react";
import ScrollAnimatedLogo from "@/components/ui/scrollAnimatedLogo";
import {usePathname, useSearchParams} from "next/navigation";

export default function Navbar() {

  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Determine showFullNav based on route and query params
  const getShowFullNav = () => {
    if (pathname === '/') {
      return true;
    }
    if (pathname === '/test-layout') {
      const fullNavParam = searchParams.get('fullNav');
      return fullNavParam === 'true';
    }
    return false;
  };

  const showFullNav = getShowFullNav();

  const navLinks = [
    { name: "News", icon: Package },
    { name: "About", icon: Pencil },
    { name: "People", icon: Command },
    { name: "Places", icon: Globe },
    { name: "Contact", icon: Mic }
  ];

  const containerRef = useRef(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav className="sticky top-0 z-50 py-6 flex justify-between items-center border-black text-black font-mono">
        {/* Logo/Title */}
        <h1 className="absolute left-1/2 transform -translate-x-1/2 z-10 border p-0.5 px-4 bg-[rgba(0,255,94,0.91)] rounded-3xl text-center whitespace-nowrap">
          Living the Forest Lab
        </h1>


        {/* Desktop Navigation */}
        <ul className={`hidden md:flex gap-3 items-center border border-r-0 rounded-l-3xl p-0.5 pl-4 ml-auto bg-[rgba(0,255,94,0.91)]`}>
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={showFullNav ? `#${link.name.toLowerCase()}` : `/#${link.name.toLowerCase()}`}
                className="hover:opacity-70 transition-opacity"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className={`md:hidden ml-auto z-20 border p-0.5 px-4 rounded-3xl hover:opacity-70 transition-opacity bg-[rgba(0,255,94,0.91)]`}
          aria-label="Toggle mobile menu"
        >
          Menu
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className={`fixed top-20 left-2 right-2 z-40 md:hidden border border-black border-opacity-85 border-r-0 rounded-l-[1.8rem] p-8 pl-11 pb-4 font-mono space-y-1 bg-[rgba(0,255,94,0.91)]`}>
          {navLinks.map((link) => {
            const IconComponent = link.icon;
            return (
              <div key={link.name} className="text-[1.35rem] font-normal leading-[1.95] text-black">
                <Link
                  href={showFullNav ? `#${link.name.toLowerCase()}` : `/#${link.name.toLowerCase()}`}
                  className="inline-flex items-center gap-2 no-underline hover:opacity-70 transition-opacity"
                  onClick={toggleMobileMenu}
                >
                  <IconComponent size={20} />
                  {link.name}
                </Link>
                <br />
              </div>
            );
          })}
        </div>
      )}

      {showFullNav && <div className="min-h-screen" ref={containerRef}/>}
      <ScrollAnimatedLogo containerRef={containerRef} shouldStartFromTop={showFullNav}/>
    </>
  );
}
