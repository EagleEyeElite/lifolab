import React from "react";
import { graphqlClient } from '@/graphql/client';
import { gql } from 'graphql-request';
import ProjectCardClient from './ProjectCardClient';
import CategoryList from '@/components/ui/categories/CategoryList';
import {GetProjectCardQuery, GetProjectCardQueryVariables} from "@/graphql/generatedTypes";

const GetProjectCard = gql`
    query GetProjectCard($id: ID!) {
        project(id: $id) {
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
            tags {
                edges {
                    node {
                        id
                        name
                        slug
                    }
                }
            }
            projectDetails {
                whenAndWhere
            }
        }
    }
`;

interface ProjectCardProps {
  id: string;
  imageSize: 'tiny' | 'small' | 'medium' | 'large' | 'huge' | 'massive';
}

export default async function ProjectCard({ id, imageSize }: ProjectCardProps) {
  const data = await graphqlClient.request<GetProjectCardQuery, GetProjectCardQueryVariables>(
    GetProjectCard, { id }
  );
  const project = data.project;
  if (!project) {
    throw new Error(`Project with id "${id}" not found`);
  }

  // Extract tag IDs from the project
  const tagIds = project.tags?.edges?.map(({ node }) => node.id) || [];

  return (
    <ProjectCardClient
      title={project.title!}
      href={`/${project.slug!}`}
      whenAndWhere={project.projectDetails?.whenAndWhere || undefined}
      excerpt={project.excerpt || undefined}
      image={project.featuredImage?.node?.sourceUrl || ''}
      imageSize={imageSize}
      tagList={<CategoryList tagIds={tagIds} />}
    />
  );
}