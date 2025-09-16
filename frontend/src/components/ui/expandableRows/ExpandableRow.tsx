"use client";
import React, { useState } from "react";
import Row from "@/components/ui/expandableRows/Row";
import ExpandableContent from "./ExpandableContent";
import { ExpandableRowItem } from "./ExpandableRows";

export default function ExpandableRow(item: ExpandableRowItem) {
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
      />
  </div>
}