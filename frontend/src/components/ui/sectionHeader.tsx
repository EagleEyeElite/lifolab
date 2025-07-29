import React from "react";
import { LucideIcon } from "lucide-react";

interface SectionHeaderProps {
  children: React.ReactNode;
  icon?: LucideIcon;
}

export default function SectionHeader({children, icon: Icon}: SectionHeaderProps) {
  return (
    <div className={`border-y-2 border-black py-3`}>
      <h2 className={`text-lg pl-3 font-heading font-bold tracking-wide flex items-center gap-2`}>
        {children} {Icon && <Icon size={16} strokeWidth={2.5}  />}
      </h2>
    </div>
  );
}
