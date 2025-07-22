import type { Metadata } from "next";
import React from "react";
import "@/app/globals.css";
import Navbar from "@/components/layout/navbar/Navbar";
import Footer from "@/components/layout/footer/footer";

export const metadata: Metadata = {
  title: "Living the Forest Lab",
  description: `Living the Forest Lab, a research initiative by TU Berlin's Faculty of Electrical Engineering and Computer Science, 
   promotes transdisciplinary forest protection through experimental projects that bridge open-source communities 
   with students and experts to develop prototype solutions for climate change 
   and biodiversity preservation.`,
};

export default async function RootLayout({children}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
    <body>
      <Navbar />
      <main className="min-h-screen pt-navbar">
        {children}
      </main>
      <Footer />
    </body>
    </html>
  );
}
