import React from 'react';
import ContactSection from "@/components/layout/footer/ContactSection";
import ImprintSection from "@/components/layout/footer/ImprintSection";


export default function Footer() {
  return (
    <footer className="bg-primary rounded-t-3xl border border-black border-b-0 p-6" id="footer">
      <div className="flex flex-col lg:flex-row gap-8">
        <ContactSection />
        <ImprintSection />
      </div>
    </footer>
  );
}
