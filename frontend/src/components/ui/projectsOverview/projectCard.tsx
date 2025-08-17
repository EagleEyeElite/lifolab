import React from "react";
import { graphqlClient } from '@/graphql/client';
import { gql } from 'graphql-request';
import ProjectCardClient from './ProjectCardClient';
import TagList from '@/components/ui/tags/TagList';
import {GetProjectCardQuery, GetProjectCardQueryVariables} from "@/graphql/generatedTypes";

const GetProjectCard = gql`
    query GetProjectCard($slug: ID!) {
        project(id: $slug, idType: SLUG) {
            id
            title
            date
            slug
            excerpt
            featuredImage {
                node {
                    sourceUrl
                    altText
                }
            }
            projectDetails {
                whenAndWhere
            }
        }
    }
`;

interface ProjectCardProps {
  slug: string;
  imageSize: 'tiny' | 'small' | 'medium' | 'large' | 'huge' | 'massive';
}

export default async function ProjectCard({ slug, imageSize }: ProjectCardProps) {
  const data = await graphqlClient.request<GetProjectCardQuery, GetProjectCardQueryVariables>(
    GetProjectCard, { slug }
  );
  const project = data.project;
  if (!project) {
    throw new Error(`Project with slug "${slug}" not found`);
  }

  return (
    <ProjectCardClient
      title={project.title!}
      href={`/${project.slug!}`}
      whenAndWhere={project.projectDetails?.whenAndWhere || undefined}
      excerpt={project.excerpt || undefined}
      image={project.featuredImage?.node?.sourceUrl || ''}
      imageSize={imageSize}
      tagList={<TagList tagSlugs={[]} />}
    />
  );
}