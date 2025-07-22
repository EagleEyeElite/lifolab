"use client"

import React from "react";
import { usePathname, useSearchParams } from "next/navigation";
import ScrollAnimatedLogo from "@/components/ui/scrollAnimatedLogo";
import NavigationMenu from "@/components/layout/navbar/NavigationMenu";

// Determine showFullNav based on route and query params
function getShowFullNav() {
  const pathname = usePathname();
  //const searchParams = useSearchParams();
  if (pathname === '/') {
    return true;
  }
  if (pathname === '/test-layout') {
    //const fullNavParam = searchParams.get('fullNav');
    //return fullNavParam === 'true';
    return true;
  }
  return false;
}

export default function Navbar() {
  const showFullNav = getShowFullNav();

  return <>
    <nav className="fixed top-0 h-navbar w-full">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center h-full">
        <div />
        <h1 className="p-0.5 px-4 border rounded-3xl bg-accent-green">
          Living the Forest Lab
        </h1>
        <NavigationMenu/>
      </div>
    </nav>
    <ScrollAnimatedLogo showFullNav={showFullNav}/>
  </>;
}
