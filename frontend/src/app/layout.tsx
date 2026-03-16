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
      <div className="relative z-10">
        <Suspense>
          <NavbarWithColors/>
        </Suspense>
      </div>
      <div className="relative z-0 px-container">
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
