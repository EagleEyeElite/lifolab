import { graphqlClient } from '@/graphql/client';
import { gql } from 'graphql-request';
import PostImage from './PostImage';
import {
  GetPostDetailsQuery,
  GetPostDetailsQueryVariables,
} from "@/graphql/generatedTypes";
import HTMLRenderer from "@/components/ui/htmlRenderer";

const GetPostDetails = gql`
    query GetPostDetails($id: ID!) {
        post(id: $id, idType: SLUG) {
            title
            content
            featuredImage {
                node {
                    sourceUrl
                    altText
                }
            }
        }
    }
`;

interface PostContentProps {
  slug: string;
}

export default async function PostContent({ slug }: PostContentProps) {
  const { post } = await graphqlClient.request<GetPostDetailsQuery, GetPostDetailsQueryVariables>(
    GetPostDetails,
    { id: slug }
  );

  if (!post) {
    throw new Error(`Post with slug "${slug}" not found`);
  }

  return (
    <>
      <PostImage image={post.featuredImage} title={post.title} />
      <div className="text-lg leading-relaxed text-black prose-custom">
        <HTMLRenderer content={post.content} />
      </div>
    </>
  );
}