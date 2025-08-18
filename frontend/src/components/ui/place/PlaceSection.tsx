import React from "react";
import { graphqlClient } from "@/graphql/client";
import { gql } from "graphql-request";
import ExpandableRows, { ExpandableRowItem } from "@/components/ui/expandableRows/ExpandableRows";

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

interface PlaceSectionProps {
  placeSlugs: string[];
}

export default async function PlaceSection({ placeSlugs }: PlaceSectionProps) {
  const data: any = await graphqlClient.request(GetAllPlaces);

  const items: ExpandableRowItem[] = placeSlugs
    .flatMap(slug => {
      const placeData = data.places?.edges?.find((edge: any) =>
        edge.node.slug === slug
      )?.node;
      if (!placeData) return [];
      return [{
        name: placeData.title,
        content: placeData.content
      }];
    });

  return <ExpandableRows items={items} />
}
