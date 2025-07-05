"use client";
import React, { useState, useRef, useEffect } from "react";
import { Plus } from "lucide-react";
import Link from "next/link";
import HTMLRenderer from "@/components/ui/htmlRenderer";

interface Person {
  name: string;
  role: string;
  href: string;
  hasLink: boolean;
  content?: string;
  projects?: Array<{
    title: string;
    slug: string;
  }>;
}

interface PersonRowProps {
  person: Person;
}

export default function PersonRow({ person }: PersonRowProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isExpanded ? contentRef.current.scrollHeight : 0);
    }
  }, [isExpanded]);

  return (
    <div className="mb-1">
      <div className="h-px bg-black/75 w-full"></div>
      <div className="grid grid-cols-3 gap-8 py-2">
        <span className="text-lg leading-tight text-black opacity-85 font-normal">
          {person.name}
        </span>
        <span className="text-black text-sm font-mono tracking-wide">
          {person.role}
        </span>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-black hover:opacity-75 bg-transparent border-none p-1 cursor-pointer rounded-sm justify-self-start flex-shrink-0"
        >
          <Plus
            size={20}
            className={`flex-shrink-0 transition-transform duration-300 ease-out ${
              isExpanded ? 'rotate-45' : 'rotate-0'
            }`}
          />
        </button>
      </div>
      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-300 ease-out"
        style={{ height: `${height}px` }}
      >
        <div className="pt-2 pb-3">
          <div className={`p-4 rounded-sm text-black text-sm leading-relaxed transition-all duration-300 ease-out bg-[rgba(0,255,94,0.91)] ${
            isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
          }`}>
            {person.content ? (
              <HTMLRenderer content={person.content} className="text-sm" />
            ) : (
              <p>More information about {person.name} coming soon...</p>
            )}
            
            {person.projects && person.projects.length > 0 && (
              <div className="mt-4 pt-4 border-t border-black/20">
                <div className="space-y-2">
                  {person.projects.map((project, index) => (
                    <div key={index} className="block">
                      <Link 
                        href={`/${project.slug}`}
                        className="text-black font-mono text-sm leading-tight block hover:opacity-75 transition-opacity duration-200"
                      >
                        {project.title} <span className="inline-block ml-1">↗</span>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
