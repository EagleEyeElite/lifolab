import { graphqlClient } from '@/graphql/client';
import { gql } from 'graphql-request';
import PostHeader from './PostHeader';
import PostTags from './PostTags';
import CollaboratorSection from '@/components/ui/collaborator/CollaboratorSection';
import {
  GetProjectOverviewQuery,
  GetProjectOverviewQueryVariables,
} from "@/graphql/generatedTypes";

const GetProjectOverview = gql`
    query GetProjectOverview($id: ID!) {
        project(id: $id, idType: SLUG) {
            title
            excerpt
            projectDetails {
                referencedCollaborators {
                    nodes {
                        __typename
                        ... on Collaborator {
                            slug
                        }
                    }
                }
            }
        }
    }
`;

interface ProjectOverviewProps {
  slug: string;
}

export default async function ProjectOverview({ slug }: ProjectOverviewProps) {
  const { project } = await graphqlClient.request<GetProjectOverviewQuery, GetProjectOverviewQueryVariables>(
    GetProjectOverview,
    { id: slug }
  );

  if (!project) {
    throw new Error(`Project with slug "${slug}" not found`);
  }

  const collaboratorSlugs = project.projectDetails?.referencedCollaborators?.nodes
    ?.filter((node): node is Extract<typeof node, { __typename: "Collaborator" }> =>
      node.__typename === "Collaborator"
    )
    .map(node => node.slug)
    .filter((slug): slug is string => slug !== undefined) || [];

  return (
    <>
      <PostHeader title={project.title} excerpt={project.excerpt} />
      <PostTags tags={null} />
      <CollaboratorSection
        title="Collaborators"
        collaboratorSlugs={collaboratorSlugs}
      />
    </>
  );
}