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
      <div className="flex flex-col sm:flex-row gap-responsive">
        <ContactSection />
        <ImprintSection />
      </div>
    </footer>
  );
}
