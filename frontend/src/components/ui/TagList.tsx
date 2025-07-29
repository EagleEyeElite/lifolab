import { graphqlClient } from '@/graphql/client';
import { gql } from 'graphql-request';
import TagPill from './tagPill';

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

interface TagListProps {
  tagSlugs: string[];
  className?: string;
}

export default async function TagList({ tagSlugs, className = "flex flex-wrap gap-1" }: TagListProps) {
  if (!tagSlugs.length) {
    return null;
  }

  try {
    const { tags } = await graphqlClient.request<any>(GetTagsBySlugs, { slugs: tagSlugs });
    
    if (!tags?.edges?.length) {
      return null;
    }

    return (
      <div className={className}>
        {tags.edges.map(({ node: tag }: any) => (
          <TagPill
            key={tag.id}
            name={tag.name}
            href={`/tags/${tag.slug}`}
          />
        ))}
      </div>
    );
  } catch (error) {
    console.error('Failed to fetch tags:', error);
    return null;
  }
}