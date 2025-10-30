"use client";
import React, { useState } from "react";
import Row from "@/components/ui/expandableRows/Row";
import ExpandableContent from "./ExpandableContent";
import { ExpandableRowItem } from "./ExpandableRows";

interface ExpandableRowProps extends ExpandableRowItem {
  primaryColor: string;
  secondaryColor: string;
}

export default function ExpandableRow({ primaryColor, secondaryColor, ...item }: ExpandableRowProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return <div>
      <Row
        item={item}
        isExpanded={isExpanded}
        onToggle={() => setIsExpanded(!isExpanded)}
      />
      <ExpandableContent
        item={item}
        isExpanded={isExpanded}
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
      />
  </div>
}