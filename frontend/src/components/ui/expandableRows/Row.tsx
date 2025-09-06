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
      <div className="text-left items-center flex justify-between gap-4 @[600px]:grid @[600px]:gap-8 @[600px]:grid-cols-3">
        <span className="text-lg font-body pl-2">
          {item.name}
        </span>

        <div className="hidden @[600px]:block">
          <Role role={item.role} />
        </div>

        <div className="pr-2 @[600px]:justify-self-auto @[600px]:pr-0">
          <Plus
            size={20}
            className={`duration-300 ${isExpanded ? 'rotate-45' : 'rotate-0'}`}
          />
        </div>
      </div>
    </button>
  );
}
