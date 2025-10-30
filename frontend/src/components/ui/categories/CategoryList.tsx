import { graphqlClient } from '@/graphql/client';
import { gql } from 'graphql-request';
import Link from 'next/link';
import { GetTagsByIdsQuery, GetTagsByIdsQueryVariables } from '@/graphql/generatedTypes';
import SelectableCategoryList from '@/components/ui/categories/SelectableCategoryList';
import { getLifoIndexColors } from '@/lib/getSiteColors';

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

export default async function CategoryList({ tagIds, selectedTagSlug, selectable = false }: {
  tagIds: string[];
  selectedTagSlug?: string;
  selectable?: boolean;
}) {
  const { tags } = await graphqlClient.request<GetTagsByIdsQuery, GetTagsByIdsQueryVariables>(GetTagsByIds, { ids: tagIds });
  const { primaryColor } = await getLifoIndexColors();

  if (!tags?.edges?.length) {
    throw new Error(`Error fetching tags for tags ${tagIds}`);
  }

  const tagData = tags.edges.map(({ node: tag }: any) => ({
    id: tag.id,
    name: tag.name,
    slug: tag.slug
  }));

  if (selectable) {
    return <SelectableCategoryList tags={tagData} currentTagSlug={selectedTagSlug} />;
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
            style={{ backgroundColor: primaryColor }}
          >
            {tag.name}
          </Link>
        );
      })}
    </div>
  );
}
