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
      <div className="flex flex-col items-center pt-6">
        <div className="max-w-xl w-full pb-10">
          <div className="flex items-center">
            <div className="pr-2">
              <SubHeading>{strings.tags.categories}:</SubHeading>
            </div>
            <CategoryList tagIds={ids} />
          </div>
        </div>
      </div>
    </Section>
  );
}
