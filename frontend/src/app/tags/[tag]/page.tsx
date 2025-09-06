import { graphqlClient } from '@/graphql/client';
import { gql } from 'graphql-request';
import ProjectCard from '@/components/ui/projectsOverview/projectCard';
import TagList from '@/components/ui/tags/TagList';
import {
  GetTagWithProjectsQuery,
  GetTagWithProjectsQueryVariables
} from '@/graphql/generatedTypes';
import Section from '@/components/ui/Section';
import { Tag } from 'lucide-react';
import React from "react";

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
      <Section title="Tag not found" icon={Tag}>
        <div className="max-w-sm mx-auto space-y-6">
          <p className="text-gray-500 font-body">The requested tag does not exist.</p>
        </div>
      </Section>
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
    <Section title="Category" icon={Tag}>
      <div className="flex justify-center">
        <div className="max-w-sm">
          <div className="flex items-center pt-6 pb-10">
            <h1 className="text-xl font-body font-bold pr-2">
              Category:
            </h1>
            <TagList tagIds={tagIds} />
          </div>
          <div className="flex flex-col gap-4">
            {projectCards.length ? (
              projectCards
            ) : (
              <p className="text-gray-500 font-body">No projects found for this tag.</p>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}
