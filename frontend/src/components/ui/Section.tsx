import React from 'react';
import { LucideIcon } from "lucide-react";
import SubHeading from "@/components/ui/SubHeading";

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
        <div className="border-y-2 border-black p-3 flex items-center gap-2">
          {Icon && <Icon size={18} strokeWidth={3} />}
          <SubHeading>{title}</SubHeading>
        </div>
      </div>
      
      {/* Section Content */}
      <div className="px-section">
        {children}
      </div>
    </div>
  );
}