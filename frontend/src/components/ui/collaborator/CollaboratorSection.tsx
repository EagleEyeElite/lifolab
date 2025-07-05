import React from "react";
import CollaboratorRow from "@/components/ui/collaborator/CollaboratorRow";

interface CollaboratorSectionProps {
  title: string;
  collaboratorSlugs: string[];
}

export default function CollaboratorSection({ title, collaboratorSlugs }: CollaboratorSectionProps) {
  return (
    <div className="space-y-0">
      <div className="mb-4">
        <span className="text-black text-sm font-mono tracking-wide">
          {title}
        </span>
      </div>
      <div className="space-y-1">
        {collaboratorSlugs.map((slug, index) => (
          <CollaboratorRow
            key={index}
            collaboratorSlug={slug} 
          />
        ))}
      </div>
    </div>
  );
}
