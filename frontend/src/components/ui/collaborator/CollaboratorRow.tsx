import { graphqlClient } from '@/graphql/client';
import { gql } from 'graphql-request';
import CollaboratorRowClient from './CollaboratorRowClient';

const GetAllCollaborators = gql`
    query GetAllCollaborators {
        collaborators(first: 100) {
            edges {
                node {
                    id
                    title
                    content
                    slug
                    collaboratorFields {
                        coreMember
                        roles
                        referencedPosts {
                            nodes {
                                __typename
                                ... on Post {
                                    title
                                    slug
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;

interface CollaboratorRowProps {
  collaboratorSlug: string;
}

export default async function CollaboratorRow({ collaboratorSlug }: CollaboratorRowProps) {
  const data: any = await graphqlClient.request(GetAllCollaborators);
  const collaboratorData = data.collaborators?.edges?.find((edge: any) =>
    edge.node.slug === collaboratorSlug
  )?.node;

  return (
    <CollaboratorRowClient
      name= {collaboratorData.title}
      role= {collaboratorData.collaboratorFields?.roles || ''}
      href= {`/collaborators/${collaboratorData.slug}`}
      hasLink= {true}
      content= {collaboratorData.content}
      projects= {collaboratorData.collaboratorFields?.referencedPosts?.nodes?.map((post: any) => ({
        title: post.title,
        slug: post.slug
      })) || []}
    />
  );
}
