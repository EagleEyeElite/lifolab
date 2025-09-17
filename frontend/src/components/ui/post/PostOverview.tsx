import { graphqlClient } from '@/graphql/client';
import { gql } from 'graphql-request';
import PostHeader from './PostHeader';
import PostTags from './PostTags';
import PeopleSection from '@/components/ui/people/PeopleSection';
import {
  GetProjectOverviewQuery,
  GetProjectOverviewQueryVariables,
} from "@/graphql/generatedTypes";
import {siteConfig} from "@/config/siteConfig";

const GetProjectOverview = gql`
    query GetProjectOverview($id: ID!) {
        project(id: $id) {
            title
            excerpt
            tags {
                edges {
                    node {
                        id
                        name
                        slug
                    }
                }
            }
            projectDetails {
                referencedPeople {
                    nodes {
                        __typename
                        ... on Person {
                            slug
                        }
                    }
                }
            }
        }
    }
`;

interface ProjectOverviewProps {
  id: string;
}

export default async function ProjectOverview({ id }: ProjectOverviewProps) {
  const { project } = await graphqlClient.request<GetProjectOverviewQuery, GetProjectOverviewQueryVariables>(
    GetProjectOverview,
    { id }
  );

  if (!project) {
    throw new Error(`Project with id "${id}" not found`);
  }

  const personSlugs = project.projectDetails?.referencedPeople?.nodes
    ?.filter((node): node is Extract<typeof node, { __typename: "Person" }> =>
      node.__typename === "Person"
    )
    .map(node => node.slug)
    .filter((slug): slug is string => slug !== undefined) || [];

  // Extract tag IDs from the project tags
  const tagIds = project.tags?.edges?.map(({ node }) => node.id) || [];
  
  return (
    <>
      <PostHeader title={project.title} excerpt={project.excerpt} />
      <PostTags tags={tagIds} />
      <PeopleSection
        title={siteConfig.strings.postOverView.collaborators}
        personSlugs={personSlugs}
      />
    </>
  );
}