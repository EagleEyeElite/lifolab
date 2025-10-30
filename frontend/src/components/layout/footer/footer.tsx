import React from 'react';
import ContactSection from "@/components/layout/footer/ContactSection";
import ImprintSection from "@/components/layout/footer/ImprintSection";
import FooterWrapper from "@/components/layout/footer/FooterWrapper";


export default function Footer() {
  return (
    <FooterWrapper>
      <div className="flex flex-col sm:flex-row gap-responsive">
        <ContactSection />
        <ImprintSection />
      </div>
    </FooterWrapper>
  );
}
