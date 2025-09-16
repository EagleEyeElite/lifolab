import React from "react";
import { graphqlClient } from "@/graphql/client";
import { gql } from "graphql-request";
import CollaboratorSection from "@/components/ui/collaborator/CollaboratorSection";
import {
  GetCollaboratorsQuery,
  GetCollaboratorsQueryVariables,
} from "@/graphql/generatedTypes";
import Section from "@/components/ui/Section";
import { sections, strings } from "@/config/siteConfig";

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
        teamMemberSlugs.push(slug);
        teamMemberSlugs.push(slug);
        teamMemberSlugs.push(slug);
      } else {
        collaboratorSlugs.push(slug);
        collaboratorSlugs.push(slug);
        collaboratorSlugs.push(slug);
        collaboratorSlugs.push(slug);
        collaboratorSlugs.push(slug);
        collaboratorSlugs.push(slug);
        collaboratorSlugs.push(slug);
        collaboratorSlugs.push(slug);
        collaboratorSlugs.push(slug);
        collaboratorSlugs.push(slug);
      }
    }
  });

  return (
    <Section title={sections.people.name} icon={sections.people.icon} id={sections.people.id}>
      <div className="pb-8">
        <CollaboratorSection
          title={strings.people.teamTitle}
          collaboratorSlugs={teamMemberSlugs}
          columns={3}
        />
      </div>
      <div className="pb-8">
        <CollaboratorSection
          title={strings.people.collaborationsTitle}
          collaboratorSlugs={collaboratorSlugs}
          columns={3}
        />
      </div>
    </Section>
  );
}
