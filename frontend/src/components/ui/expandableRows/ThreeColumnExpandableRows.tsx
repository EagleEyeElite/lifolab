'use client'

import React, { useState, useEffect } from "react";
import ExpandableRow from "./ExpandableRow";
import { ExpandableRowItem } from "./ExpandableRows";

interface ThreeColumnExpandableRowsProps {
  items: ExpandableRowItem[];
  columns?: number;
  primaryColor: string;
  secondaryColor: string;
}

export default function ThreeColumnExpandableRows({ items, primaryColor, secondaryColor }: ThreeColumnExpandableRowsProps) {
  const [numColumns, setNumColumns] = useState(1);

  useEffect(() => {
    const styles = getComputedStyle(document.documentElement);
    const tabletBreakpoint = parseFloat(styles.getPropertyValue('--breakpoint-tablet'));
    const desktopBreakpoint = parseFloat(styles.getPropertyValue('--breakpoint-desktop'));

    const updateColumns = () => {
      const width = window.innerWidth;
      if (width >= desktopBreakpoint) {
        setNumColumns(3);
      } else if (width >= tabletBreakpoint) {
        setNumColumns(2);
      } else {
        setNumColumns(1);
      }
    };

    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  // Distribute items across columns
  const columnArrays = Array.from({ length: numColumns }, (_, columnIndex) => {
    return items.filter((_, index) => index % numColumns === columnIndex);
  });

  const getGridCols = () => {
    switch (numColumns) {
      case 3:
        return 'grid-cols-3';
      case 2:
        return 'grid-cols-2';
      default:
        return 'grid-cols-1';
    }
  };

  return (
    <div className={`grid ${getGridCols()} gap-three-column-gap items-start`}>
      {columnArrays.map((columnItems, columnIndex) => {
        if (columnItems.length === 0) {
          return <div key={columnIndex} />;
        }

        return (
          <ul key={columnIndex} className="divide-y divide-black/75 border-y border-black/75">
            {columnItems.map((item, index) => (
              <li key={index}>
                <ExpandableRow
                  name={item.name}
                  role={item.role}
                  content={item.content}
                  referencedLinks={item.referencedLinks}
                  primaryColor={primaryColor}
                  secondaryColor={secondaryColor}
                />
              </li>
            ))}
          </ul>
        );
      })}
    </div>
  );
}