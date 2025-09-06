import React from "react";
import { graphqlClient } from "@/graphql/client";
import { gql } from "graphql-request";
import ExpandableRows, { ExpandableRowItem } from "@/components/ui/expandableRows/ExpandableRows";
import { Globe } from "lucide-react";
import { GetAllPlacesQuery, GetAllPlacesQueryVariables } from "@/graphql/generatedTypes";
import Section from "@/components/ui/Section";

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
    <Section title="Places" icon={Globe} id="places">
      <div className="pb-8">
        <ExpandableRows items={items} />
      </div>
    </Section>
  );
}