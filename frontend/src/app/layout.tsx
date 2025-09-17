import type { Metadata } from "next";
import React from "react";
import "@/app/globals.css";
import Navbar from "@/components/layout/navbar/Navbar";
import Footer from "@/components/layout/footer/footer";

export const metadata: Metadata = {
  title: "Living the Forest Lab",
  description: `Living the Forest Lab ist eine Forschungsinitiative der Fakultät für Elektrotechnik und Informatik der TU Berlin, 
   die transdisziplinären Waldschutz durch experimentelle Projekte fördert, die Open-Source-Communities 
   mit Studierenden und Experten verbinden, um Prototyplösungen für den Klimawandel 
   und den Erhalt der Artenvielfalt zu entwickeln.`,
};

export default async function RootLayout({children}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en" suppressHydrationWarning>
    <body>
    <div className="relative z-10">
      <Navbar/>
    </div>
    <div className="relative z-0 px-container">
      <main className="min-h-screen pt-navbar pb-responsive-lg">
        {children}
      </main>
      <Footer />
    </div>
    </body>
    </html>
  );
}
