import React from "react";
import { graphqlClient } from "@/graphql/client";
import { gql } from "graphql-request";
import PlaceSection from "@/components/ui/place/PlaceSection";
import SectionHeader from "@/components/ui/sectionHeader";
import { Globe } from "lucide-react";
import {GetPlacesQuery, GetPlacesQueryVariables} from "@/graphql/generatedTypes";

const GetPlaces = gql`
  query GetPlaces {
    places(first: 100) {
      edges {
        node {
          slug
        }
      }
    }
  }
`;

export default async function Places() {
  const data = await graphqlClient.request<GetPlacesQuery, GetPlacesQueryVariables>(GetPlaces);

  const placeSlugs: string[] = data?.places?.edges?.flatMap(
    (edge) => edge.node.slug || []
  ) || []

  return (
    <div className="p-6" id="places">
      <div className="pb-8">
        <SectionHeader icon={Globe}>Places</SectionHeader>
      </div>
      <div className="pb-8">
        <PlaceSection placeSlugs={placeSlugs} />
      </div>
    </div>
  );
}