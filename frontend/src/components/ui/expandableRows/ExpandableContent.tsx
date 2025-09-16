import React from "react";
import Link from "next/link";
import HTMLRenderer from "@/components/ui/renderHtml/htmlRenderer";
import { ArrowUpRight } from "lucide-react";
import { ExpandableRowItem } from "./ExpandableRows";
import Role from "./Role";

interface ExpandableContentProps {
  item: ExpandableRowItem;
  isExpanded: boolean;
}

function Expandable({ isExpanded, children }: { isExpanded: boolean; children: React.ReactNode }) {
  const transitionClasses = isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0";
  return (
    <div className={`duration-300 ease-out grid ${transitionClasses}`}>
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
            className="font-heading text-xs text-gray-500"
          >
            {link.title} <ArrowUpRight className="inline-block" size={16} />
          </Link>
        </li>
      ))}
    </ol>
  );
}

function ContentMeta({ item }: { item: ExpandableRowItem }) {
  const hasContent = item.role || (item.referencedLinks && item.referencedLinks.length > 0);
  if (!hasContent) return null;

  return <>
    <div className="pt-8 pb-2">
      <div className="h-px bg-gray-400" />
    </div>
    <div className="pb-3 @[600px]:hidden">
      <Role role={item.role} />
    </div>
    <ReferencedLinks links={item.referencedLinks} />
  </>
}

export default function ExpandableContent({ item, isExpanded }: ExpandableContentProps) {
  return (
    <Expandable isExpanded={isExpanded}>
      <div className="@container pt-2 pb-3">
        <div className={`p-4 rounded-primary text-sm leading-relaxed bg-primary transition-all duration-300 ease-out ${
          isExpanded ? 'translate-y-0' : '-translate-y-2'
        }`}>
          <HTMLRenderer content={item.content} className="text-black"/>
          <ContentMeta item={item} />
        </div>
      </div>
    </Expandable>
  );
}
