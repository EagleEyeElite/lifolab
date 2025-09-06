import React from 'react';
import { LucideIcon } from "lucide-react";

interface SectionProps {
  children: React.ReactNode;
  title: string;
  icon?: LucideIcon;
  id?: string;
}

export default function Section({ children, title, icon: Icon, id }: SectionProps) {
  return (
    <div className="py-section" id={id}>
      {/* Section Header */}
      <div className="pb-responsive-md">
        <div className="border-y-2 border-black py-3">
          <h2 className="text-lg pl-3 font-heading font-bold tracking-wide flex items-center gap-2">
            {title} {Icon && <Icon size={16} strokeWidth={2.5} />}
          </h2>
        </div>
      </div>
      
      {/* Section Content */}
      <div className="px-section">
        {children}
      </div>
    </div>
  );
}