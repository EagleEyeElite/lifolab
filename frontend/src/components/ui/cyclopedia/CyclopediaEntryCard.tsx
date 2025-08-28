import React from "react";
import { graphqlClient } from "@/graphql/client";
import { gql } from "graphql-request";
import { GetCyclopediaEntryQuery, GetCyclopediaEntryQueryVariables } from "@/graphql/generatedTypes";
import CyclopediaEntryCardClient from "./CyclopediaEntryCardClient";


const GetCyclopediaEntry = gql`
    query GetCyclopediaEntry($entryId: ID!) {
        cyclopediaEntry(id: $entryId) {
            id
            title
            content
            slug
            featuredImage {
                node {
                    sourceUrl
                    altText
                }
            }
        }
    }
`;

interface CyclopediaEntryProps {
  entryId: string;
}

export default async function CyclopediaEntryCard({ entryId }: CyclopediaEntryProps) {
  const { cyclopediaEntry } = await graphqlClient.request<GetCyclopediaEntryQuery, GetCyclopediaEntryQueryVariables>(GetCyclopediaEntry, {
    entryId: entryId
  });

  if (!cyclopediaEntry) {
    throw new Error('Entry not found');
  }


  return (
    <CyclopediaEntryCardClient
      id={cyclopediaEntry.id}
      title={cyclopediaEntry.title}
      content={cyclopediaEntry.content}
      slug={cyclopediaEntry.slug}
      featuredImage={cyclopediaEntry.featuredImage}
    />
  );
}