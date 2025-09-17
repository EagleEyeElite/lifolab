import { graphqlClient } from '@/graphql/client';
import { gql } from 'graphql-request';
import ProjectCard from '@/components/ui/projectsOverview/projectCard';
import TagList from '@/components/ui/tags/TagList';
import {
  GetTagWithProjectsAndAllTagsQuery,
  GetTagWithProjectsAndAllTagsQueryVariables
} from '@/graphql/generatedTypes';
import Section from '@/components/ui/Section';
import { Tag } from 'lucide-react';
import React from "react";
import SubHeading from '@/components/ui/SubHeading';
import { strings } from '@/config/siteConfig';
import { notFound } from 'next/navigation';

export const revalidate = 10;

const GetTagWithProjectsAndAllTags = gql`
    query GetTagWithProjectsAndAllTags($slug: [String]) {
        tags(where: { slug: $slug }) {
            edges {
                node {
                    id
                    name
                    slug
                }
            }
        }
        allTags: tags {
            edges {
                node {
                    id
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
  const { tags, allTags, projects } = await graphqlClient.request<GetTagWithProjectsAndAllTagsQuery, GetTagWithProjectsAndAllTagsQueryVariables>(
    GetTagWithProjectsAndAllTags,
    { slug: [tag] }
  );

  if (!tags?.edges?.length) {
    notFound();
  }

  const tagIds = tags.edges.map(({ node }: { node: { id: string; name?: string | null; slug?: string | null } }) => node.id);
  const allTagIds = allTags?.edges?.map(({ node }: { node: { id: string } }) => node.id) || [];

  const AllTagsHeading = <>
    <div className="flex items-center pb-10">
      <div className="pr-2">
        <SubHeading>{strings.tags.categories}:</SubHeading>
      </div>
      <TagList tagIds={allTagIds} selectedTagSlug={tag} />
    </div>
  </>

  const projectCards = projects?.edges?.map(({ node: project }) => (
    <ProjectCard
      key={project.id}
      id={project.id!}
      imageSize="medium"
    />
  )) || [];

  const Projects = <>
    <div className="flex flex-col gap-14">
      {projectCards.length ? (
        projectCards
      ) : (
        <p className="text-gray-500 font-body">{strings.tags.noProjectsFound}</p>
      )}
    </div>
  </>

  return (
    <Section title={strings.tags.categories} icon={Tag}>
      <div className="flex flex-col items-center pt-6">
        <div className="max-w-xl w-full">
          {AllTagsHeading}
        </div>
        <div className="max-w-lg">
          {Projects}
        </div>
      </div>
    </Section>
  );
}
