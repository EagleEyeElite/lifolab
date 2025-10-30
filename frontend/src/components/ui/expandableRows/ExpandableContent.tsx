'use client';

import React from "react";
import Link from "next/link";
import HTMLRenderer from "@/components/ui/renderHtml/htmlRenderer";
import { ArrowUpRight } from "lucide-react";
import { ExpandableRowItem } from "./ExpandableRows";
import Role from "./Role";

interface ExpandableContentProps {
  item: ExpandableRowItem;
  isExpanded: boolean;
  primaryColor: string;
  secondaryColor: string;
}

function Expandable({ isExpanded, children }: { isExpanded: boolean; children: React.ReactNode }) {
  const transitionClasses = isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0";
  const marginClass = !isExpanded ? "-mb-[2px]" : "mb-0";
  return (
    <div className={`duration-300 ease-out grid ${transitionClasses} ${marginClass}`}>
      <div className="overflow-hidden">
        {children}
      </div>
    </div>
  );
}

function ReferencedLinks({ links }: { links?: Array<{ slug: string; title: string }> }) {
  if (!links || links.length === 0) return null;

  return (
    <ol className="space-y-0">
      {links.map((link, index) => (
        <li key={index}>
          <Link
            href={`/${link.slug}`}
            className="font-heading text-xs text-black underline"
          >
            {link.title} <ArrowUpRight className="inline-block" size={16} />
          </Link>
        </li>
      ))}
    </ol>
  );
}


export default function ExpandableContent({ item, isExpanded, primaryColor, secondaryColor }: ExpandableContentProps) {

  return (
    <Expandable isExpanded={isExpanded}>
      <div className="@container pt-2 pb-3">
        <div
          className={`p-4 rounded-primary text-sm leading-relaxed transition-all duration-300 ease-out ${
            isExpanded ? 'translate-y-0' : '-translate-y-2'
          }`}
          style={{ backgroundColor: secondaryColor }}
        >
          {/* 1. Role first */}
          {item.role && (
            <div className="pb-3 @[600px]:hidden">
              <Role role={item.role} />
            </div>
          )}

          {/* 2. Info text second */}
          <HTMLRenderer content={item.content} className="text-black"/>

          {/* 3. Links last */}
          {item.referencedLinks && item.referencedLinks.length > 0 && (
            <div className="pt-3">
              <ReferencedLinks links={item.referencedLinks} />
            </div>
          )}
        </div>
      </div>
    </Expandable>
  );
}
