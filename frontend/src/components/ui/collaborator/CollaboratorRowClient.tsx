"use client";
import React, { useState } from "react";
import { Plus } from "lucide-react";
import Link from "next/link";
import HTMLRenderer from "@/components/ui/htmlRenderer";

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

export default function CollaboratorRowClient(collaborator: Collaborator) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mb-1 @container">
      <div className="h-px bg-black/75 w-full"></div>

      <div className="flex items-center justify-between py-2 @[600px]:grid @[600px]:grid-cols-3 @[600px]:gap-8">
        <span className="text-lg leading-tight text-black opacity-85 font-normal">
          {collaborator.name}
        </span>

        <span className="hidden @[600px]:block text-black text-sm font-mono tracking-wide">
          {collaborator.role || ""}
        </span>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-black hover:opacity-75 bg-transparent border-none p-1 cursor-pointer rounded-sm flex-shrink-0 @[600px]:justify-self-start"
        >
          <Plus
            size={20}
            className={`transition-transform duration-300 ${
              isExpanded ? 'rotate-45' : 'rotate-0'
            }`}
          />
        </button>
      </div>

      <div className={`overflow-hidden transition-all duration-300 ease-out ${
        isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="pt-2 pb-3">
          <div className={`p-4 rounded-sm text-black text-sm leading-relaxed bg-[rgba(0,255,94,0.91)] transition-all duration-300 ease-out ${
            isExpanded ? 'translate-y-0' : '-translate-y-2'
          }`}>
            {collaborator.content ? (
              <HTMLRenderer content={collaborator.content} className="text-sm" />
            ) : (
              <p>More information about {collaborator.name} coming soon...</p>
            )}

            <div className="my-4">
              <div className="h-px bg-black/20"></div>
            </div>

            {collaborator.role && (
              <div className="mb-4 @[600px]:hidden">
                <span className="text-black text-sm font-mono tracking-wide">
                  {collaborator.role}
                </span>
              </div>
            )}

            {collaborator.projects && collaborator.projects.length > 0 && (
              <div className="space-y-2">
                {collaborator.projects.map((project, index) => (
                  <div key={index}>
                    <Link
                      href={`/${project.slug}`}
                      className="text-black font-mono text-sm leading-tight block hover:opacity-75 transition-opacity duration-200"
                    >
                      {project.title} <span className="inline-block ml-1">↗</span>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}