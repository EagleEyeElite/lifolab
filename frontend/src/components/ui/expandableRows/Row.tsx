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
      <div className="flex items-center gap-4 text-left @[600px]:grid @[600px]:grid-cols-3 @[600px]:gap-8">
        <span className="text-lg font-body pl-2 flex-1 @[600px]:flex-none text-black">
          {item.name}
        </span>

        <div className="hidden @[600px]:block">
          <Role role={item.role} />
        </div>

        <div className="pr-2 @[600px]:pr-0 @[600px]:justify-self-auto">
          <Plus
            size={20}
            className={`duration-300 ${isExpanded ? 'rotate-45' : 'rotate-0'}`}
          />
        </div>
      </div>
    </button>
  );
}
