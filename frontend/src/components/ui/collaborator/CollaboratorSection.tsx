import React from "react";
import { graphqlClient } from "@/graphql/client";
import { gql } from "graphql-request";
import ExpandableRows, { ExpandableRowItem } from "@/components/ui/expandableRows/ExpandableRows";

const GetAllCollaborators = gql`
    query GetAllCollaborators {
        collaborators(first: 100) {
            edges {
                node {
                    id
                    title
                    content
                    slug
                    collaboratorProfile {
                        coreMember
                        roles
                        referencedProjects {
                            nodes {
                                __typename
                                ... on Project {
                                    title
                                    slug
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;

interface CollaboratorSectionProps {
  title: string;
  collaboratorSlugs: string[];
}

export default async function CollaboratorSection({ title, collaboratorSlugs }: CollaboratorSectionProps) {
  const data: any = await graphqlClient.request(GetAllCollaborators);

  const items: ExpandableRowItem[] = collaboratorSlugs
    .flatMap(slug => {
      const collaboratorData = data.collaborators?.edges?.find((edge: any) =>
        edge.node.slug === slug
      )?.node;

      if (!collaboratorData) return [];

      return [{
        name: collaboratorData.title,
        role: collaboratorData.collaboratorProfile?.roles,
        content: collaboratorData.content,
        referencedLinks: collaboratorData.collaboratorProfile?.referencedProjects?.nodes?.map((project: any) => ({
          title: project.title,
          slug: project.slug
        })) || []
      }];
    });

  return <>
    <h1 className="text-xl font-body font-bold pb-4">{title}</h1>
    <ExpandableRows items={items} />
  </>
}
