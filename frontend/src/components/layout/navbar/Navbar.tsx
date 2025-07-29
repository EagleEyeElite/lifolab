"use client"

import React from "react";
import Link from "next/link";
import ScrollAnimatedLogo from "@/components/layout/navbar/ScrollAnimatedLogo";
import NavigationMenu from "@/components/layout/navbar/NavigationMenu";

export default function Navbar() {
  return <>
    <nav className="fixed top-0 h-navbar w-full z-20 pointer-events-none">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center h-full">
        <div/>
        <Link href="/">
          <h1 className="p-0.5 px-4 border rounded-3xl bg-primary relative z-30 pointer-events-auto">
            Living the Forest Lab
          </h1>
        </Link>
        <div className="relative z-30 pointer-events-auto">
          <NavigationMenu/>
        </div>
      </div>
    </nav>
    <div className="relative z-10">
      <ScrollAnimatedLogo />
    </div>
  </>;
}
