import { graphqlClient } from '@/graphql/client';
import { gql } from 'graphql-request';
import ProjectCard from '@/components/ui/projectsOverview/projectCard';
import TagList from '@/components/ui/tags/TagList';
import {
  GetTagWithProjectsQuery,
  GetTagWithProjectsQueryVariables
} from '@/graphql/generatedTypes';

export const revalidate = 10;

const GetTagWithProjects = gql`
    query GetTagWithProjects($slug: [String]) {
        tags(where: { slug: $slug }) {
            edges {
                node {
                    id
                    name
                    slug
                }
            }
        }
        projects(where: { tagSlugIn: $slug }) {
            edges {
                node {
                    id
                    slug
                }
            }
        }
    }
`;

interface TagPageProps {
  params: Promise<{
    tag: string;
  }>;
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params;

  // Get both tag information and projects in a single query
  const { tags, projects } = await graphqlClient.request<GetTagWithProjectsQuery, GetTagWithProjectsQueryVariables>(
    GetTagWithProjects,
    { slug: [tag] }
  );

  if (!tags?.edges?.length) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-sm mx-auto space-y-6">
          <h1 className="text-3xl font-body">Tag not found</h1>
          <p className="text-gray-500 font-body">The requested tag does not exist.</p>
        </div>
      </div>
    );
  }

  const tagIds = tags.edges.map(({ node }) => node.id);

  const projectCards = projects?.edges?.map(({ node: project }) => (
    <ProjectCard
      key={project.id}
      id={project.id!}
      imageSize="medium"
    />
  )) || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-sm mx-auto space-y-6">
        <div className="flex items-center">
          <h1 className="text-3xl font-body">Category:</h1>
          <div className="pl-2 items-center">
            <TagList tagIds={tagIds} />
          </div>
        </div>
        {projectCards.length ? (
          projectCards
        ) : (
          <p className="text-gray-500 font-body">No projects found for this tag.</p>
        )}
      </div>
    </div>
  );
}
