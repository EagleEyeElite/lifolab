import React from "react";
import { graphqlClient } from "@/graphql/client";
import { gql } from "graphql-request";
import PeopleSection from "@/components/ui/people/PeopleSection";
import {
  GetPeopleQuery,
  GetPeopleQueryVariables,
} from "@/graphql/generatedTypes";
import Section from "@/components/ui/Section";
import { sections, strings } from "@/config/siteConfig";

const GetPeople = gql`
  query GetPeople {
    people(first: 100) {
      edges {
        node {
          slug
          personProfile {
            coreMember
          }
        }
      }
    }
  }
`;

export default async function People() {
  const data = await graphqlClient.request<GetPeopleQuery, GetPeopleQueryVariables>(GetPeople);
  
  const teamMemberSlugs: string[] = [];
  const collaborationSlugs: string[] = [];

  data?.people?.edges?.forEach((edge) => {
    const slug = edge.node.slug;
    if (slug) {
      if (edge.node.personProfile?.coreMember === true) {
        teamMemberSlugs.push(slug);
      } else {
        collaborationSlugs.push(slug);
      }
    }
  });

  return (
    <Section title={sections.people.name} icon={sections.people.icon} id={sections.people.id}>
      <div className="pb-8">
        <PeopleSection
          title={strings.people.teamTitle}
          personSlugs={teamMemberSlugs}
          columns={3}
        />
      </div>
      <div className="pb-8">
        <PeopleSection
          title={strings.people.collaborationsTitle}
          personSlugs={collaborationSlugs}
          columns={3}
        />
      </div>
    </Section>
  );
}
