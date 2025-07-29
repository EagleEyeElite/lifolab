import React from "react";
import { LucideIcon } from "lucide-react";

export default function SectionHeader({children, icon: Icon,}: {
  children: React.ReactNode;
  icon?: LucideIcon;
}) {
  return (
    <div className={`border-y border-black py-3`}>
      <h2 className="text-lg pl-3 font-heading tracking-wide flex items-center gap-2">
        {children} {Icon && <Icon size={18} />}
      </h2>
    </div>
  );
}
