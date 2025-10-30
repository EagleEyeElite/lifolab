import React from "react";
import { graphqlClient } from "@/graphql/client";
import { gql } from "graphql-request";
import LifoIndexEntryCardClient from "./LifoIndexEntryCardClient";


const GetLifoIndexEntry = gql`
    query GetLifoIndexEntry($entryId: ID!) {
        lifoIndexEntry(id: $entryId) {
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

interface LifoIndexEntryProps {
  entryId: string;
  backgroundColor: string;
}

export default async function LifoIndexEntryCard({ entryId, backgroundColor }: LifoIndexEntryProps) {
  const { lifoIndexEntry } = await graphqlClient.request<any>(GetLifoIndexEntry, {
    entryId: entryId
  });

  if (!lifoIndexEntry) {
    throw new Error('Entry not found');
  }


  return (
    <LifoIndexEntryCardClient
      id={lifoIndexEntry.id}
      title={lifoIndexEntry.title}
      content={lifoIndexEntry.content}
      slug={lifoIndexEntry.slug}
      featuredImage={lifoIndexEntry.featuredImage}
      backgroundColor={backgroundColor}
    />
  );
}