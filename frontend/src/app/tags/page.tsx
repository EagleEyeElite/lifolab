import { graphqlClient } from '@/graphql/client';
import { gql } from 'graphql-request';
import {
  GetAllTagsQuery,
  GetAllTagsQueryVariables,
} from "@/graphql/generatedTypes";
import TagList from "@/components/ui/tags/TagList";
import Section from '@/components/ui/Section';
import { Tag } from 'lucide-react';
import React from "react";

export const revalidate = 10;

const GetAllTags = gql`
    query GetAllTags {
        tags {
            edges {
                node {
                    id
                }
            }
        }
    }
`;

export default async function TagsPage() {
  const { tags } = await graphqlClient.request<GetAllTagsQuery, GetAllTagsQueryVariables>(GetAllTags);
  const ids = tags?.edges?.map(({ node: tag }) => (
    tag.id!
  )) || []

  return (
    <Section title="All Categories" icon={Tag}>
      <div className="flex items-center pt-6 pb-10">
        <h1 className="text-xl font-body font-bold pr-2">
          All Categories:
        </h1>
        <TagList tagIds={ids} />
      </div>
    </Section>
  );
}
