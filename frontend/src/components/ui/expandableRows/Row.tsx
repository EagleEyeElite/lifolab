import React from "react";
import { Plus } from "lucide-react";
import { ExpandableRowItem } from "./ExpandableRows";
import Role from "./Role"

interface ExpandableButtonProps {
  item: ExpandableRowItem;
  isExpanded: boolean;
  onToggle: () => void;
}

export default function Row({ item, isExpanded, onToggle }: ExpandableButtonProps) {
  return (
    <button className="cursor-pointer w-full py-responsive" onClick={onToggle}>
      <div className="text-left items-center flex justify-between gap-responsive-sm sm:grid sm:gap-8 sm:grid-cols-3">
        <span className="text-responsive-sm font-body pl-responsive">
          {item.name}
        </span>

        <div className="hidden sm:block">
          <Role role={item.role} />
        </div>

        <div className="pr-responsive sm:justify-self-auto">
          <Plus
            size={16}
            className={`duration-300 ${isExpanded ? 'rotate-45' : 'rotate-0'}`}
          />
        </div>
      </div>
    </button>
  );
}
