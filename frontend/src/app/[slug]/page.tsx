import { graphqlClient } from '@/graphql/client';
import { gql } from 'graphql-request';
import { notFound } from 'next/navigation';
import SectionHeader from '@/components/ui/sectionHeader';
import ProjectOverview from '@/components/ui/post/PostOverview';
import ProjectContent from '@/components/ui/post/PostContent';
import {
  GetProjectWhenAndWhereQuery,
  GetProjectWhenAndWhereQueryVariables,
} from "@/graphql/generatedTypes";

export const revalidate = 10;

const GetProjectWhenAndWhere = gql`
    query GetProjectWhenAndWhere($id: ID!) {
        project(id: $id, idType: SLUG) {
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
    <div className="px-6 py-6">
      <SectionHeader>{project.projectDetails?.whenAndWhere || "Project Details"}</SectionHeader>
      <div className="pt-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4">
          <ProjectOverview slug={slug} />
        </div>
        <div className="lg:col-span-6 pb-32">
          <ProjectContent slug={slug} />
        </div>
      </div>
    </div>
  );
}