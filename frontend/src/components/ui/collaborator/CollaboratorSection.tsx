import React from "react";
import CollaboratorRow from "@/components/ui/collaborator/CollaboratorRow";

interface CollaboratorSectionProps {
  title: string;
  collaboratorSlugs: string[];
}

export default function CollaboratorSection({ title, collaboratorSlugs }: CollaboratorSectionProps) {
  return (
    <div>
      <h1 className="text-xl font-body font-bold pb-4">{title}</h1>
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
