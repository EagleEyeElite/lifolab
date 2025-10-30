import React from "react";
import { graphqlClient } from '@/graphql/client';
import { gql } from 'graphql-request';
import ProjectCardClient from './ProjectCardClient';
import CategoryList from '@/components/ui/categories/CategoryList';
import {GetProjectCardQuery, GetProjectCardQueryVariables} from "@/graphql/generatedTypes";
import { getLifoIndexColors } from '@/lib/getSiteColors';

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
                    mediaDetails {
                        width
                        height
                    }
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
}

export default async function ProjectCard({ id }: ProjectCardProps) {
  const data = await graphqlClient.request<GetProjectCardQuery, GetProjectCardQueryVariables>(
    GetProjectCard, { id }
  );
  const { primaryColor, secondaryColor } = await getLifoIndexColors();
  const project = data.project;
  if (!project) {
    throw new Error(`Project with id "${id}" not found`);
  }

  // Extract tag IDs from the project
  const tagIds = project.tags?.edges?.map(({ node }) => node.id) || [];

  const imageWidth = project.featuredImage?.node?.mediaDetails?.width || 800;
  const imageHeight = project.featuredImage?.node?.mediaDetails?.height || 600;

  return (
    <ProjectCardClient
      title={project.title!}
      href={`/${project.slug!}`}
      image={project.featuredImage?.node?.sourceUrl || ''}
      imageWidth={imageWidth}
      imageHeight={imageHeight}
      tagList={<CategoryList tagIds={tagIds} />}
      primaryColor={primaryColor}
      secondaryColor={secondaryColor}
    />
  );
}