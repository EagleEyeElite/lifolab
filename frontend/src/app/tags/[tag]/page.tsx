import { graphqlClient } from '@/graphql/client';
import { gql } from 'graphql-request';
import ProjectCard from '@/components/ui/projectsOverview/projectCard';
import TagList from '@/components/ui/tags/TagList';
import { GetProjectsByTagQuery, GetProjectsByTagQueryVariables } from '@/graphql/generatedTypes';

export const revalidate = 10;

const GetProjectsByTag = gql`
    query GetProjectsByTag {
        allProject {
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
  const { allProject } = await graphqlClient.request<GetProjectsByTagQuery, GetProjectsByTagQueryVariables>(GetProjectsByTag);

  const projectCards = allProject?.edges?.map(({ node: project }) => {
    return (
      <ProjectCard
        key={project.id}
        slug={project.slug!}
        imageSize="medium"
      />
    );
  }) || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-sm mx-auto space-y-6">
        <div className="flex items-center">
          <h1 className="text-3xl font-body">Category:</h1>
          <div className="pl-2 items-center">
            <TagList tagSlugs={[tag]} />
          </div>
        </div>
        {projectCards.length ? (
          projectCards
        ) : (
          <p className="text-gray-500 font-body">No projects found. Note: Projects don't support tag filtering yet.</p>
        )}
      </div>
    </div>
  );
}
