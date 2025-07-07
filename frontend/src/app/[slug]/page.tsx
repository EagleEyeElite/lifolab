import { graphqlClient } from '@/graphql/client';
import { gql } from 'graphql-request';
import { notFound } from 'next/navigation';
import SectionHeader from '@/components/ui/sectionHeader';
import PostOverview from '@/components/ui/post/PostOverview';
import PostContent from '@/components/ui/post/PostContent';
import {
  GetPostBySlugQuery,
  GetPostBySlugQueryVariables,
} from "@/graphql/generatedTypes";

const GetPostBySlug = gql`
    query GetPostBySlug($id: ID!) {
        post(id: $id, idType: SLUG) {
            postDetails {
                whenAndWhere
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
    <div className="pt-[45px] px-8">
      <SectionHeader className="py-8">{post.postDetails?.whenAndWhere || "Project Details"}</SectionHeader>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4">
          <PostOverview slug={slug} />
        </div>
        <div className="lg:col-span-6">
          <PostContent slug={slug} />
        </div>
      </div>
    </div>
  );
}