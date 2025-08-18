import { graphqlClient } from '@/graphql/client';
import { gql } from 'graphql-request';
import PostImage from './PostImage';
import {
  GetProjectDetailsQuery,
  GetProjectDetailsQueryVariables,
} from "@/graphql/generatedTypes";
import HTMLRenderer from "@/components/ui/renderHtml/htmlRenderer";

const GetProjectDetails = gql`
    query GetProjectDetails($id: ID!) {
        project(id: $id, idType: SLUG) {
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

interface ProjectContentProps {
  slug: string;
}

export default async function ProjectContent({ slug }: ProjectContentProps) {
  const { project } = await graphqlClient.request<GetProjectDetailsQuery, GetProjectDetailsQueryVariables>(
    GetProjectDetails,
    { id: slug }
  );

  if (!project) {
    throw new Error(`Project with slug "${slug}" not found`);
  }

  return (
    <>
      <div className="pb-8">
        <PostImage image={project.featuredImage} title={project.title} />
      </div>
      <HTMLRenderer  className="prose-lg" content={project.content} />
    </>
  );
}