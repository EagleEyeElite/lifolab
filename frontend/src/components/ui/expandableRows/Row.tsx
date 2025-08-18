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
    <button className="@container cursor-pointer w-full py-2" onClick={onToggle}>
      <div className="text-left items-center grid gap-8 grid-cols-2 @[600px]:grid-cols-3">
        <span className="text-lg font-body">
          {item.name}
        </span>

        <div className="hidden @[600px]:block">
          <Role role={item.role} />
        </div>

        <div className="justify-self-end @[600px]:justify-self-auto pr-2 @[600px]:pr-0">
          <Plus
            size={20}
            className={`duration-300 ${isExpanded ? 'rotate-45' : 'rotate-0'}`}
          />
        </div>
      </div>
    </button>
  );
}
