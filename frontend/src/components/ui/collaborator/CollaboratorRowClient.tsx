"use client";
import React, { useState } from "react";
import { Plus } from "lucide-react";
import Link from "next/link";
import HTMLRenderer from "@/components/ui/renderHtml/htmlRenderer";
import { ArrowUpRight } from "lucide-react"

interface Collaborator {
  name: string;
  role?: string;
  href: string;
  hasLink: boolean;
  content?: string;
  projects?: Array<{
    title: string;
    slug: string;
  }>;
}


function Role({ className, role }: {
  className?: string;
  role?: string;
}) {
  if (!role) return null;

  return <div className={className}>
    <span className={`text-sm text-gray-500 font-heading tracking-wide`}>
      {role}
    </span>
  </div>
}

export default function CollaboratorRowClient(collaborator: Collaborator) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mb-1 @container">
      <div className="h-px bg-black/75 w-full"></div>

      <div
        className="flex items-center justify-between py-2 @[600px]:grid @[600px]:grid-cols-3 @[600px]:gap-8 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span className="text-lg leading-tight opacity-85 font-body">
          {collaborator.name}
        </span>

        <Role className="hidden @[600px]:block" role={collaborator.role} />

        <div className="p-1 rounded-sm flex-shrink-0 @[600px]:justify-self-start">
          <Plus
            size={20}
            className={`transition-transform duration-300 ${
              isExpanded ? 'rotate-45' : 'rotate-0'
            }`}
          />
        </div>
      </div>

      <div className={`overflow-hidden transition-all duration-300 ease-out ${
        isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="pt-2 pb-3">
          <div className={`p-4 rounded-sm text-sm leading-relaxed bg-primary transition-all duration-300 ease-out ${
            isExpanded ? 'translate-y-0' : '-translate-y-2'
          }`}>

            {collaborator.content ? (
              <HTMLRenderer content={collaborator.content} className="text-black"/>
            ) : (
              <p>More information about {collaborator.name} coming soon...</p>
            )}

            <div className="pt-8 pb-2">
              <div className="h-px bg-gray-400" />
            </div>

            <Role className="pb-3 @[600px]:hidden" role={collaborator.role} />

            {collaborator.projects && collaborator.projects.length > 0 && (
              <ol className="space-y-0">
                {collaborator.projects.map((project, index) => (
                  <li key={index}>
                    <Link
                      href={`/${project.slug}`}
                      className="font-heading text-xs text-gray-500"
                      key={index}
                    >
                      {project.title} <ArrowUpRight className="inline-block" size={16} />
                    </Link>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}