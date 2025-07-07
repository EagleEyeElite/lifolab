import { graphqlClient } from '@/graphql/client';
import { gql } from 'graphql-request';
import PostHeader from './PostHeader';
import PostTags from './PostTags';
import CollaboratorSection from '@/components/ui/collaborator/CollaboratorSection';
import {
  GetPostOverviewQuery,
  GetPostOverviewQueryVariables,
} from "@/graphql/generatedTypes";

const GetPostOverview = gql`
    query GetPostOverview($id: ID!) {
        post(id: $id, idType: SLUG) {
            title
            excerpt
            postDetails {
                referencedCollaborators {
                    nodes {
                        __typename
                        ... on Collaborator {
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
        }
    }
`;

interface PostOverviewProps {
  slug: string;
}

export default async function PostOverview({ slug }: PostOverviewProps) {
  const { post } = await graphqlClient.request<GetPostOverviewQuery, GetPostOverviewQueryVariables>(
    GetPostOverview,
    { id: slug }
  );

  if (!post) {
    throw new Error(`Post with slug "${slug}" not found`);
  }

  const collaboratorSlugs = post.postDetails?.referencedCollaborators?.nodes
    ?.filter((node): node is Extract<typeof node, { __typename: "Collaborator" }> =>
      node.__typename === "Collaborator"
    )
    .map(node => node.slug)
    .filter((slug): slug is string => slug !== undefined) || [];

  return (
    <>
      <PostHeader title={post.title} excerpt={post.excerpt} />
      <PostTags tags={post.tags} />
      <CollaboratorSection
        title="Collaborators"
        collaboratorSlugs={collaboratorSlugs}
      />
    </>
  );
}