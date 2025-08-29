import { graphqlClient } from '@/graphql/client';
import { gql } from 'graphql-request';
import {
  GetAllTagsQuery,
  GetAllTagsQueryVariables,
} from "@/graphql/generatedTypes";
import TagList from "@/components/ui/tags/TagList";

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
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-body mb-8">All Tags</h1>
        <TagList tagIds={ids} />
      </div>
    </div>
  );
}
