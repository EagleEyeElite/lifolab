import { graphqlClient } from '@/graphql/client';
import { gql } from 'graphql-request';
import { notFound } from 'next/navigation';
import ProjectOverview from '@/components/ui/post/PostOverview';
import ProjectContent from '@/components/ui/post/PostContent';
import {
  GetProjectWhenAndWhereQuery,
  GetProjectWhenAndWhereQueryVariables,
} from "@/graphql/generatedTypes";
import Section from '@/components/ui/Section';

export const revalidate = 10;

const GetProjectWhenAndWhere = gql`
    query GetProjectWhenAndWhere($id: ID!) {
        project(id: $id, idType: SLUG) {
            id
            title
            projectDetails {
                whenAndWhere
            }
        }
    }
`;

export default async function Project({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { project } = await graphqlClient.request<GetProjectWhenAndWhereQuery, GetProjectWhenAndWhereQueryVariables>(
    GetProjectWhenAndWhere,
    { id: slug }
  );

  if (!project) {
    notFound();
  }

  return (
    <Section title={project.title || ""}>
      <div className="max-w-lg lg:max-w-none mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="max-w-lg lg:mr-auto">
            <ProjectOverview id={project.id} whenAndWhere={project.projectDetails?.whenAndWhere} />
          </div>
          <div className="max-w-xl pb-responsive-lg w-full lg:col-span-2 lg:col-start-2">
            <ProjectContent slug={slug} />
          </div>
        </div>
      </div>
    </Section>
  );
}