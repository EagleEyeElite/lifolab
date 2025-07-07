import React from 'react';
import ContactSection from './footer/ContactSection';
import ImprintSection from './footer/ImprintSection';

export default function Footer() {
  return (
    <footer className="bg-[rgba(0,255,94,0.91)] rounded-t-3xl border border-black border-b-0 mx-6 p-6">
      <div className="flex flex-col lg:flex-row gap-8">
        <ContactSection />
        <ImprintSection />
      </div>
    </footer>
  );
}
