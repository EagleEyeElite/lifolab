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

export default async function CategoryList({ tagIds, selectedTagSlug }: {
  tagIds: string[];
  selectedTagSlug?: string;
}) {
  const { tags } = await graphqlClient.request<GetTagsByIdsQuery, GetTagsByIdsQueryVariables>(GetTagsByIds, { ids: tagIds });

  if (!tags?.edges?.length) {
    throw new Error(`Error fetching tags for tags ${tagIds}`);
  }

  return (
    <div className="flex flex-wrap gap-1">
      {tags.edges.map(({ node: tag }: any) => {
        const isSelected = selectedTagSlug === tag.slug;
        return (
          <Link
            key={tag.id}
            href={`/categories/${tag.slug}`}
            className={`inline-flex items-center px-2 py-1 text-xs font-heading rounded-full ${
              isSelected
                ? 'text-black'
                : 'text-black'
            }`}
            style={{ backgroundColor: '#d3ff17' }}
          >
            {tag.name}
          </Link>
        );
      })}
    </div>
  );
}
