import React from "react";
import ProjectCard from "@/components/ui/projectsOverview/projectCard";
import { graphqlClient } from "@/graphql/client";
import { gql } from "graphql-request";
import { GetProjectsQuery, GetProjectsQueryVariables } from "@/graphql/generatedTypes";
import MasonryLayout from "@/components/ui/projectsOverview/masonryLayout";
import Section from "@/components/ui/Section";
import { sections, strings } from "@/config/siteConfig";

const GetProjects = gql`
    query GetProjects {
        projects(first: 100) {
            edges {
                node {
                    id
                }
            }
        }
    }
`;

export default async function Projects() {
  const data = await graphqlClient.request<GetProjectsQuery, GetProjectsQueryVariables>(
    GetProjects,
  );

  const projects = data?.projects?.edges?.map(edge => edge.node) || [];

  // Show each project once
  const projectCards = projects.map((project) => {
    if (!project || !project.id) {
      return null;
    }

    return (
      <ProjectCard
        key={project.id}
        id={project.id}
      />
    );
  }).filter(Boolean);

  return (
    <Section title={sections.projects.name} icon={sections.projects.icon} id={sections.projects.id}>
      <div className="pt-2">
        <MasonryLayout>
          {projectCards}
        </MasonryLayout>
      </div>
    </Section>
  );
}
