import { graphqlClient } from '@/graphql/client';
import { gql } from 'graphql-request';
import Link from 'next/link';
import { GetTagsBySlugsQuery, GetTagsBySlugsQueryVariables } from '@/graphql/generatedTypes';

const GetTagsBySlugs = gql`
  query GetTagsBySlugs($slugs: [String!]!) {
    tags(where: { slug: $slugs }) {
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

export default async function TagList({ tagSlugs }: {
  tagSlugs: string[];
}) {
  const { tags } = await graphqlClient.request<GetTagsBySlugsQuery, GetTagsBySlugsQueryVariables>(GetTagsBySlugs, { slugs: tagSlugs });

  if (!tags?.edges?.length) {
    throw new Error(`Error fetching tags for tags ${tagSlugs}`);
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