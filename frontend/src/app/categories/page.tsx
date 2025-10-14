import { graphqlClient } from '@/graphql/client';
import { gql } from 'graphql-request';
import {
  GetAllTagsQuery,
  GetAllTagsQueryVariables,
} from "@/graphql/generatedTypes";
import CategoryList from "@/components/ui/categories/CategoryList";
import Section from '@/components/ui/Section';
import { Tag } from 'lucide-react';
import React from "react";
import SubHeading from '@/components/ui/SubHeading';
import { strings } from '@/config/siteConfig';

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
    <Section title={strings.tags.categories} icon={Tag}>
      <div className="pb-8">
        <CategoryList tagIds={ids} selectable={true} />
      </div>
    </Section>
  );
}
