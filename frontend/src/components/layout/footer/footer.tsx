import React from 'react';
import ContactSection from "@/components/layout/footer/ContactSection";
import ImprintSection from "@/components/layout/footer/ImprintSection";
import { getLifoIndexColors } from '@/lib/getSiteColors';


export default async function Footer() {
  const { primaryColor } = await getLifoIndexColors();

  return (
    <footer
      className="rounded-t-primary border border-black border-b-0 p-responsive-sm"
      id="footer"
      style={{ backgroundColor: primaryColor }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-responsive">
        <ContactSection />
        <ImprintSection />
      </div>
    </footer>
  );
}
