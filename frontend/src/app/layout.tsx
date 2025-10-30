import type { Metadata } from "next";
import React from "react";
import "@/app/globals.css";
import Navbar from "@/components/layout/navbar/Navbar";
import Footer from "@/components/layout/footer/footer";
import { siteConfig } from "@/config/siteConfig";
import { ColorProvider } from "@/contexts/ColorContext";
import { getLifoIndexColors } from "@/lib/getSiteColors";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: siteConfig.metadata.title,
  description: siteConfig.metadata.description,
};

export default async function RootLayout({children}: {
  children: React.ReactNode
}) {
  const colors = await getLifoIndexColors();

  return (
    <html lang="en" suppressHydrationWarning>
    <body>
    <ColorProvider colors={colors}>
      <div className="relative z-10">
        <Navbar/>
      </div>
      <div className="relative z-0 px-container">
        <main className="min-h-screen pt-navbar pb-responsive-lg">
          {children}
        </main>
        <Footer />
      </div>
    </ColorProvider>
    </body>
    </html>
  );
}
