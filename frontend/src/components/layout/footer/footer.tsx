import React from 'react';
import ContactSection from "@/components/layout/footer/ContactSection";
import ImprintSection from "@/components/layout/footer/ImprintSection";


export default function Footer() {
  return (
    <footer className="bg-primary rounded-t-3xl border border-black border-b-0 p-responsive-sm" id="footer">
      <div className="flex flex-col sm:flex-row gap-responsive">
        <ContactSection />
        <ImprintSection />
      </div>
    </footer>
  );
}
