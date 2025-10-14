import { graphqlClient } from '@/graphql/client';
import { gql } from 'graphql-request';
import ProjectCard from '@/components/ui/projectsOverview/projectCard';
import CategoryList from '@/components/ui/categories/CategoryList';
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
import MasonryLayout from '@/components/ui/projectsOverview/masonryLayout';

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
    <div className="pb-6">
      <CategoryList
        tagIds={allTagIds}
        selectedTagSlug={tag}
        selectable={true}
      />
    </div>
  </>

  const imageSizes = [
    "massive", "tiny", "tiny", "tiny", "tiny", "tiny", "tiny",
    "large", "medium", "huge", "tiny", "small", "massive"
  ];

  const projectCards = projects?.edges?.map(({ node: project }, index) => {
    const size = imageSizes[index % imageSizes.length];
    return (
      <ProjectCard
        key={project.id}
        id={project.id!}
        imageSize={size as 'tiny' | 'small' | 'medium' | 'large' | 'huge' | 'massive'}
      />
    );
  }) || [];

  const Projects = <>
    {projectCards.length ? (
      <MasonryLayout>
        {projectCards}
      </MasonryLayout>
    ) : (
      <p className="text-gray-500 font-body">{strings.tags.noProjectsFound}</p>
    )}
  </>

  return (
    <Section title={strings.tags.categories} icon={Tag}>
      <div className="pb-8">
        {AllTagsHeading}
      </div>
      <div className="pt-2">
        {Projects}
      </div>
    </Section>
  );
}
