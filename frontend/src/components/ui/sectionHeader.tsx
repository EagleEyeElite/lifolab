import React from "react";
import {LucideIcon} from "lucide-react";

export default function SectionHeader({ children, icon: Icon, className }: {
  children: React.ReactNode;
  icon?: LucideIcon;
  className?: string;
}) {
  return (
    <header className={`space-y-2 ${className || ''}`}>
      <hr className="border-black border-t" />
      <p className="text-black text-sm font-mono tracking-wide flex items-center gap-2">
        {children} {Icon && <Icon size={16} />}
      </p>
      <hr className="border-black border-t" />
    </header>
  );
}