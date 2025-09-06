import React from "react";
import { graphqlClient } from "@/graphql/client";
import { gql } from "graphql-request";
import CollaboratorSection from "@/components/ui/collaborator/CollaboratorSection";
import { Command } from "lucide-react";
import {
  GetCollaboratorsQuery,
  GetCollaboratorsQueryVariables,
} from "@/graphql/generatedTypes";
import Section from "@/components/ui/Section";

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
    <Section title="Personen" icon={Command} id="people">
      <div className="pb-8">
        <CollaboratorSection
          title="Living the Forest Lab Team"
          collaboratorSlugs={teamMemberSlugs}
        />
      </div>
      <div className="pb-8">
        <CollaboratorSection
          title="Kollaborationen"
          collaboratorSlugs={collaboratorSlugs}
        />
      </div>
    </Section>
  );
}
