import { graphqlClient } from '@/graphql/client';
import { gql } from 'graphql-request';
import TagPill from '@/components/ui/tagPill';

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

interface TagNode {
  id: string;
  name: string;
  slug: string;
  count?: number;
}

interface GetAllTagsResponse {
  tags: {
    edges: {
      node: TagNode;
    }[];
  };
}

export default async function TagsPage() {
  const { tags } = await graphqlClient.request<GetAllTagsResponse>(GetAllTags);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">All Tags</h1>
        
        {tags?.edges?.length ? (
          <div className="flex flex-wrap gap-3">
            {tags.edges.map(({ node: tag }) => (
              <TagPill
                key={tag.id}
                name={tag.name}
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
