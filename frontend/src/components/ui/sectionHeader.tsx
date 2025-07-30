import React from "react";
import { LucideIcon } from "lucide-react";

interface SectionHeaderProps {
  children: React.ReactNode;
  icon?: LucideIcon;
  size?: 'default' | 'small';
}

export default function SectionHeader({children, icon: Icon, size = 'default'}: SectionHeaderProps) {
  const textSize = size === 'small' ? 'text-sm' : 'text-lg';
  const iconSize = size === 'small' ? 16 : 18;
  
  return (
    <div className={`border-y border-black py-3`}>
      <h2 className={`${textSize} pl-3 font-heading tracking-wide flex items-center gap-2`}>
        {children} {Icon && <Icon size={iconSize} />}
      </h2>
    </div>
  );
}
