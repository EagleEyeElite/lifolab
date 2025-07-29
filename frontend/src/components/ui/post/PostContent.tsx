import { graphqlClient } from '@/graphql/client';
import { gql } from 'graphql-request';
import PostImage from './PostImage';
import {
  GetPostDetailsQuery,
  GetPostDetailsQueryVariables,
} from "@/graphql/generatedTypes";
import HTMLRenderer from "@/components/ui/renderHtml/htmlRenderer";

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
      <div className="pb-8">
        <PostImage image={post.featuredImage} title={post.title} />
      </div>
      <HTMLRenderer  className="prose-lg" content={post.content} />
    </>
  );
}