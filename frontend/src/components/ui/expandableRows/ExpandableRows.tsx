import React from "react";
import ExpandableRow from "./ExpandableRow";

export interface ExpandableRowItem {
  name: string;
  role?: string;
  content: string;
  referencedLinks?: Array<{
    title: string;
    slug: string;
  }>;
}

interface ExpandableRowsProps {
  items: ExpandableRowItem[];
}

export default function ExpandableRows({items}: ExpandableRowsProps) {
  return <>
    <ul className="divide-y divide-black/75 border-y border-black/75">
      {items.map((item, index) => (
        <li key={index}>
          <ExpandableRow
            name={item.name}
            role={item.role}
            content={item.content}
            referencedLinks={item.referencedLinks}
          />
        </li>
      ))}
    </ul>
  </>;
}
