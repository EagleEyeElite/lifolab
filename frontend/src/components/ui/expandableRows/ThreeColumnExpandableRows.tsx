import React from "react";
import ExpandableRow from "./ExpandableRow";
import { ExpandableRowItem } from "./ExpandableRows";

interface ThreeColumnExpandableRowsProps {
  items: ExpandableRowItem[];
  columns?: number;
}

export default function ThreeColumnExpandableRows({ items, columns = 1 }: ThreeColumnExpandableRowsProps) {
  // For single column, use the original ExpandableRows layout
  if (columns === 1) {
    return (
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
    );
  }

  // Distribute items across the specified number of columns
  const columnArrays: ExpandableRowItem[][] = Array.from({ length: columns }, () => []);
  items.forEach((item, index) => {
    columnArrays[index % columns].push(item);
  });

  return (
    <div className="flex gap-three-column-gap">
      {columnArrays.map((columnItems, columnIndex) => (
        <div key={columnIndex} className="flex-1">
          <ul className="divide-y divide-black/75 border-y border-black/75">
            {columnItems.map((item, index) => (
              <li key={`col${columnIndex}-${index}`}>
                <ExpandableRow
                  name={item.name}
                  role={item.role}
                  content={item.content}
                  referencedLinks={item.referencedLinks}
                />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}