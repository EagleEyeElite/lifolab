import { graphqlClient } from '@/graphql/client';
import { gql } from 'graphql-request';
import ProjectCard from '@/components/ui/projectCard';

const GetPostsByTag = gql`
    query GetPostsByTag($tag: String!) {
        posts(where: { tag: $tag }) {
            edges {
                node {
                    id
                    title
                    slug
                    date
                    excerpt
                    featuredImage {
                        node {
                            sourceUrl
                            altText
                        }
                    }
                    tags {
                        edges {
                            node {
                                name
                                slug
                            }
                        }
                    }
                }
            }
        }
    }
`;

interface TagPageProps {
  params: {
    tag: string;
  };
}

interface PostNode {
  id: string;
  title: string;
  slug: string;
  date?: string;
  excerpt?: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText?: string;
    };
  };
  tags?: {
    edges: {
      node: {
        name: string;
        slug: string;
      };
    }[];
  };
}

interface GetPostsByTagResponse {
  posts: {
    edges: {
      node: PostNode;
    }[];
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const { posts } = await graphqlClient.request<GetPostsByTagResponse>(GetPostsByTag, { tag: params.tag });

  const projectCards = posts?.edges?.map(({ node: post }, index) => {
    const postTags = post.tags?.edges?.map(edge => edge.node) || [];

    return (
      <ProjectCard
        key={post.id}
        item={{
          title: post.title,
          href: `/${post.slug}`,
          tags: postTags,
          date: post.date,
          image: post.featuredImage?.node?.sourceUrl || '',
          imageSize: "medium"
        }}
        index={index}
      />
    );
  }) || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-sm mx-auto space-y-6">
        <h1 className="text-3xl font-bold mb-8">Category: {params.tag}</h1>

        {projectCards.length ? (
          projectCards
        ) : (
          <p className="text-gray-500">No posts found with this tag.</p>
        )}
      </div>
    </div>
  );
}
