import React from "react";
import { graphqlClient } from "@/graphql/client";
import { gql } from "graphql-request";
import ThreeColumnExpandableRows from "@/components/ui/expandableRows/ThreeColumnExpandableRows";
import { ExpandableRowItem } from "@/components/ui/expandableRows/ExpandableRows";
import { GetAllPlacesQuery, GetAllPlacesQueryVariables } from "@/graphql/generatedTypes";
import Section from "@/components/ui/Section";
import { sections } from "@/config/siteConfig";

const GetAllPlaces = gql`
    query GetAllPlaces {
        places(first: 100) {
            edges {
                node {
                    id
                    title
                    content
                    slug
                }
            }
        }
    }
`;

export default async function Places() {
  const data = await graphqlClient.request<GetAllPlacesQuery, GetAllPlacesQueryVariables>(GetAllPlaces);

  const items: ExpandableRowItem[] = data?.places?.edges?.flatMap(
    (edge) => {
      const placeData = edge.node;
      if (!placeData.slug || !placeData.title) return [];
      return [{
        name: placeData.title,
        role: '',
        content: placeData.content || '',
        referencedLinks: []
      }];
    }
  ) || [];

  return (
    <Section title={sections.places.name} icon={sections.places.icon} id={sections.places.id}>
      <div className="pb-8">
        <ThreeColumnExpandableRows items={items} />
      </div>
    </Section>
  );
}