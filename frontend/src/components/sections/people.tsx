import React from "react";
import { graphqlClient } from "@/graphql/client";
import { gql } from "graphql-request";
import CollaboratorSection from "@/components/ui/collaborator/CollaboratorSection";
import SectionHeader from "@/components/ui/sectionHeader";
import { Command } from "lucide-react";
import {
  GetCollaboratorsQuery,
  GetCollaboratorsQueryVariables,
} from "@/graphql/generatedTypes";

const GetCollaborators = gql`
  query GetCollaborators {
    collaborators(first: 100) {
      edges {
        node {
          slug
          collaboratorProfile {
            coreMember
          }
        }
      }
    }
  }
`;

export default async function People() {
  const data = await graphqlClient.request<GetCollaboratorsQuery, GetCollaboratorsQueryVariables>(GetCollaborators);
  
  const teamMemberSlugs: string[] = [];
  const collaboratorSlugs: string[] = [];
  
  data?.collaborators?.edges?.forEach((edge) => {
    const slug = edge.node.slug;
    if (slug) {
      if (edge.node.collaboratorProfile?.coreMember === true) {
        teamMemberSlugs.push(slug);
        teamMemberSlugs.push(slug);
        teamMemberSlugs.push(slug);
      } else {
        collaboratorSlugs.push(slug);
        collaboratorSlugs.push(slug);
        collaboratorSlugs.push(slug);
      }
    }
  });

  return (
    <div className="p-6" id="people">
      <div className="pb-8">
        <SectionHeader icon={Command}>People</SectionHeader>
      </div>
      <div className="pb-8">
        <CollaboratorSection
          title="Living the Forest Lab Team"
          collaboratorSlugs={teamMemberSlugs}
        />
      </div>
      <div className="pb-8">
        <CollaboratorSection
          title="Collaborations"
          collaboratorSlugs={collaboratorSlugs}
        />
      </div>
    </div>
  );
}
