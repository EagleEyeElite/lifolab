"use client"

import React from "react";
import {Pencil, Package, Command, Globe, Mic, BookOpen} from "lucide-react";
import ScrollAnimatedLogo from "@/components/layout/navbar/ScrollAnimatedLogo";
import DesktopNavigation from "@/components/layout/navbar/DesktopNavigation";
import MobileNavigation from "@/components/layout/navbar/MobileNavigation";

export default function Navbar() {
  const navigationLivingTheForestLab = [
    { name: "Über uns", href: "/about", icon: Pencil },
    { name: "Personen", href: "/#people", icon: Command },
    { name: "Orte", href: "/#places", icon: Globe },
    { name: "Kontakt", href: "/#footer", icon: Mic }
  ];

  const navigationActivities = [
    { name: "Projekte", href: "/#projects", icon: Package },
    { name: "Enzyklopädie von ...", href: "/cyclopedia", icon: BookOpen },
  ];

  return <>
    {/* Layer 1: Blur backdrop (lowest) */}
    <div
      className="fixed top-0 w-full backdrop-blur-sm bg-gradient-to-b from-white/80 via-white/20 to-transparent [mask-image:linear-gradient(to_bottom,black_0%,black_60%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_60%,transparent_100%)]"
      style={{ height: 'calc(var(--spacing-navbar) + 2rem)' }}
    />
    
    {/* Layer 2: Logo (middle) */}
    <ScrollAnimatedLogo />

    {/* Layer 3: Links with backgrounds (highest) */}
    <nav className="fixed top-0 h-navbar w-full pointer-events-none">
      <div className="hidden sm:block">
        <DesktopNavigation
          navigationLivingTheForestLab={navigationLivingTheForestLab}
          navigationActivities={navigationActivities}
        />
      </div>
      <div className="sm:hidden">
        <MobileNavigation
          navigationLivingTheForestLab={navigationLivingTheForestLab}
          navigationActivities={navigationActivities}
        />
      </div>
    </nav>
  </>;
}
