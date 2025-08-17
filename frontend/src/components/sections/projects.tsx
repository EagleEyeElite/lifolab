import React from "react";
import SectionHeader from "@/components/ui/sectionHeader";
import ProjectCard from "@/components/ui/projectsOverview/projectCard";
import { Package } from "lucide-react";
import { graphqlClient } from "@/graphql/client";
import { gql } from "graphql-request";
import { GetProjectsQuery, GetProjectsQueryVariables } from "@/graphql/generatedTypes";
import MasonryLayout from "@/components/ui/projectsOverview/masonryLayout";

const GetProjects = gql`
    query GetProjects {
        allProject(first: 50) {
            edges {
                node {
                    slug
                }
            }
        }
    }
`;

export default async function Projects() {
  const data = await graphqlClient.request<GetProjectsQuery, GetProjectsQueryVariables>(
    GetProjects,
  );

  const projects = data?.allProject?.edges?.map(edge => edge.node) || [];

  // Simplified array with only imageSize
  const imageSizes = [
    "massive", "tiny", "tiny", "tiny", "tiny", "tiny", "tiny",
    "large", "medium", "huge", "tiny", "small", "massive"
  ];

  // Generate 13 project cards, cycling through available projects
  const projectCards = imageSizes.map((size, index) => {
    // Cycle through projects if we have fewer projects than cards needed
    const projectIndex = projects.length > 0 ? index % projects.length : 0;
    const currentProject = projects[projectIndex];

    if (!currentProject || !currentProject.slug) {
      throw new Error(`Project "${currentProject}" with slug not found`);
    }

    return (
      <ProjectCard
        key={index}
        slug={currentProject.slug}
        imageSize={size as 'tiny' | 'small' | 'medium' | 'large' | 'huge' | 'massive'}
      />
    );
  }).filter(Boolean);

  return (
    <div className="flex justify-start w-full" id="projects">
      <div className="w-full">
        <div className="px-6 py-6 space-y-6">
          <SectionHeader icon={Package}>
            Projects
          </SectionHeader>
          <MasonryLayout>
            {projectCards}
          </MasonryLayout>
        </div>
      </div>
    </div>
  );
}
