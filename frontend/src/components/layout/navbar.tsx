"use client"

import Link from "next/link";
import Image from "next/image";
import Match from '@public/match.svg';
import { useRef, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Package, Pencil, Command, Globe, Mic } from "lucide-react";
import ScrollAnimatedLogo from "@/components/ui/scrollAnimatedLogo";

export default function Navbar() {
  const pathname = usePathname();
  const isRootPage = pathname === '/';
  const [isAtTop, setIsAtTop] = useState(true);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY < 100);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
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

  const shouldShowTitle = isRootPage && isAtTop;
  const shouldStartFromTop = isRootPage;

  return (
    <>
      <nav className="sticky top-0 z-50 py-6 flex justify-between items-center border-black text-black font-mono">
        {/* Logo/Title - Only on root page when at top */}
        {shouldShowTitle && (
          <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
            <h1 className="border p-0.5 px-4 bg-[rgba(0,255,94,0.91)] rounded-3xl text-center whitespace-nowrap">
              Living the Forest Lab
            </h1>
          </div>
        )}

        {/* Desktop Navigation */}
        <div className={`hidden md:flex w-full ${shouldShowTitle ? 'justify-end' : 'justify-end ml-auto'}`}>
          <ul className={`flex gap-3 justify-end items-center border border-r-0 rounded-l-3xl p-0.5 pl-4 ${shouldShowTitle ? 'bg-[rgba(0,255,94,0.91)]' : 'bg-white'}`}>
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link href={isRootPage ? `#${link.name.toLowerCase()}` : `/#${link.name.toLowerCase()}`} className="hover:opacity-70 transition-opacity">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden ml-auto z-20">
          <button
            onClick={toggleMobileMenu}
            className={`border p-0.5 px-4 rounded-3xl hover:opacity-70 transition-opacity ${shouldShowTitle ? 'bg-[rgba(0,255,94,0.91)]' : 'bg-white'}`}
            aria-label="Toggle mobile menu"
          >
            Menu
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">

          {/* Menu Content - Matching the cargo.site styling */}
          <div className={`absolute top-20 left-2 right-2 border border-black border-opacity-85 border-r-0 rounded-l-[1.8rem] p-8 pl-11 pb-4 font-mono ${shouldShowTitle ? 'bg-[rgba(0,255,94,0.91)]' : 'bg-white'}`}>
            <div className="space-y-1">
              {navLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <div key={link.name} className="text-[1.35rem] font-normal leading-[1.95] text-black">
                    <Link
                      href={isRootPage ? `#${link.name.toLowerCase()}` : `/#${link.name.toLowerCase()}`}
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
          </div>
        </div>
      )}

      <>
        {isRootPage && <div className="min-h-screen" ref={containerRef}/>}
        <ScrollAnimatedLogo containerRef={containerRef} shouldStartFromTop={shouldStartFromTop}/>
      </>
    </>
  );
}