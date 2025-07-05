import { graphqlClient } from '@/graphql/client';
import { gql } from 'graphql-request';
import { notFound } from 'next/navigation';
import SectionHeader from '@/components/ui/sectionHeader';
import PostHeader from '@/components/ui/post/PostHeader';
import PostTags from '@/components/ui/post/PostTags';
import PostImage from '@/components/ui/post/PostImage';
import PostContent from '@/components/ui/post/PostContent';
import {
  GetPostBySlugQuery,
  GetPostBySlugQueryVariables,
} from "@/graphql/generatedTypes";

const GetPostBySlug = gql`
    query GetPostBySlug($id: ID!) {
        post(id: $id, idType: SLUG) {
            title
            content
            excerpt
            postCollaborators {
                referencedCollaborators {
                    nodes {
                        __typename
                        ... on Collaborator {
                            title
                            slug
                        }
                    }
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
            featuredImage {
                node {
                    sourceUrl
                    altText
                }
            }
        }
    }
`;

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { post } = await graphqlClient.request<GetPostBySlugQuery, GetPostBySlugQueryVariables>(
    GetPostBySlug,
    { id: slug }
  );

  if (!post) {
    notFound();
  }

  return (
    <div className="pt-[45px]">
      <header className="px-8 py-8">
        <SectionHeader>Custom Text from CMS</SectionHeader>
      </header>

      <main className="px-8 grid grid-cols-12 gap-8">
        <div className="col-span-4">
          <PostHeader title={post.title} excerpt={post.excerpt} />
          <PostTags tags={post.tags} collaborators={post.postCollaborators} />
        </div>
        
        <div className="col-span-6">
          <PostImage image={post.featuredImage} title={post.title} />
          <PostContent content={post.content} />
        </div>
      </main>
    </div>
  );
}
