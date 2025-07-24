import { graphqlClient } from '@/graphql/client';
import { gql } from 'graphql-request';
import TagPill from '@/components/ui/tagPill';
import {
  GetAllTagsQuery,
  GetAllTagsQueryVariables,
} from "@/graphql/generatedTypes";

export const revalidate = 10;

const GetAllTags = gql`
    query GetAllTags {
        tags {
            edges {
                node {
                    id
                    name
                    slug
                    count
                }
            }
        }
    }
`;

export default async function TagsPage() {
  const { tags } = await graphqlClient.request<GetAllTagsQuery, GetAllTagsQueryVariables>(GetAllTags);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">All Tags</h1>
        
        {tags?.edges?.length ? (
          <div className="flex flex-wrap gap-3">
            {tags.edges.map(({ node: tag }) => (
              <TagPill
                key={tag.id}
                name={tag.name!}
                href={`/tags/${tag.slug}`}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No tags found.</p>
        )}
      </div>
    </div>
  );
}
