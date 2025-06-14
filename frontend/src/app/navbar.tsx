"use client"

import Link from "next/link";
import ScrollAnimatedLogo from "@/app/scrollAnimatedLogo";
import {useRef} from "react";

export default function Navbar() {
  const navLinks = ["News", "About", "People", "Places", "Contact"];
  const containerRef = useRef(null)

  return (
    <>
    <nav className="sticky top-0 z-10 py-6 flex justify-between items-center border-black text-black text-lg font-light">
      <div className="w-40 h-5 " />
      <h1 className="border p-0.5 px-4 bg-[rgba(0,255,94,0.91)] rounded-3xl text-center">
        Living the Forest Lab
      </h1>
      <ul className="flex gap-3 justify-end items-center border border-r-0 rounded-l-3xl p-0.5 pl-4 bg-[rgba(0,255,94,0.91)]">
        {navLinks.map((link) => (
          <li key={link}>
            <Link href={`#${link.toLowerCase()}`}>
              {link}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
    <div className="min-h-screen bg-lime-100" ref={containerRef}/>
    <ScrollAnimatedLogo containerRef={containerRef}/>
    </>
  );
}
