import { graphqlClient } from '@/graphql/client';
import { gql } from 'graphql-request';
import ProjectCard from '@/components/ui/projectsOverview/projectCard';
import TagList from '@/components/ui/tags/TagList';

export const revalidate = 10;

const GetPostsByTag = gql`
    query GetPostsByTag($tag: String!) {
        posts(where: { tag: $tag }) {
            edges {
                node {
                    id
                    slug
                }
            }
        }
    }
`;

interface TagPageProps {
  params: Promise<{
    tag: string;
  }>;
}

interface PostNode {
  id: string;
  slug: string;
}

interface GetPostsByTagResponse {
  posts: {
    edges: {
      node: PostNode;
    }[];
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params;
  const { posts } = await graphqlClient.request<GetPostsByTagResponse>(GetPostsByTag, { tag });

  const projectCards = posts?.edges?.map(({ node: post }) => {
    return (
      <ProjectCard
        key={post.id}
        slug={post.slug}
        imageSize="medium"
      />
    );
  }) || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-sm mx-auto space-y-6">
        <div className="flex items-center">
          <h1 className="text-3xl font-body">Category:</h1>
          <div className="pl-2 items-center">
            <TagList tagSlugs={[tag]} />
          </div>
        </div>
        {projectCards.length ? (
          projectCards
        ) : (
          <p className="text-gray-500 font-body">No posts found with this tag.</p>
        )}
      </div>
    </div>
  );
}
