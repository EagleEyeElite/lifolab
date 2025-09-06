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
    <Section title={project.projectDetails?.whenAndWhere || "Project Details"}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4">
          <ProjectOverview id={project.id} />
        </div>
        <div className="lg:col-span-6 pb-32">
          <ProjectContent slug={slug} />
        </div>
      </div>
    </Section>
  );
}