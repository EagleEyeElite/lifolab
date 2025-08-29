import { graphqlClient } from '@/graphql/client';
import { gql } from 'graphql-request';
import Link from 'next/link';
import { GetTagsByIdsQuery, GetTagsByIdsQueryVariables } from '@/graphql/generatedTypes';

const GetTagsByIds = gql`
    query GetTagsByIds($ids: [ID!]!) {
        tags(where: { include: $ids }) {
            edges {
                node {
                    id
                    name
                    slug
                }
            }
        }
    }
`;

export default async function TagList({ tagIds }: {
  tagIds: string[];
}) {
  const { tags } = await graphqlClient.request<GetTagsByIdsQuery, GetTagsByIdsQueryVariables>(GetTagsByIds, { ids: tagIds });

  if (!tags?.edges?.length) {
    throw new Error(`Error fetching tags for tags ${tagIds}`);
  }

  return (
    <div className="flex flex-wrap gap-1">
      {tags.edges.map(({ node: tag }: any) => (
        <Link
          key={tag.id}
          href={`/tags/${tag.slug}`}
          className="inline-flex items-center px-2 py-1 text-xs font-heading bg-secondary border border-gray-500 text-gray-500 rounded-full"
        >
          {tag.name}
        </Link>
      ))}
    </div>
  );
}
