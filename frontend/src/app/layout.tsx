import type { Metadata } from "next";
import React, { Suspense } from "react";
import "@/app/globals.css";
import NavbarWithColors from "@/components/layout/navbar/NavbarWithColors";
import Footer from "@/components/layout/footer/footer";
import { siteConfig } from "@/config/siteConfig";

export const metadata: Metadata = {
  title: siteConfig.metadata.title,
  description: siteConfig.metadata.description,
};

export default async function RootLayout({children}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
    <body>
      {/* Navbar needs z-[1] to stack above content that may create stacking contexts
          (transforms, opacity, etc). This is the only z-index in the app. */}
      <div className="relative z-[1]">
        <Suspense>
          <NavbarWithColors/>
        </Suspense>
      </div>
      <div className="px-container">
        <main className="min-h-screen pt-navbar pb-responsive-lg">
          <Suspense>
            {children}
          </Suspense>
        </main>
        <Suspense>
          <Footer />
        </Suspense>
      </div>
    </body>
    </html>
  );
}
