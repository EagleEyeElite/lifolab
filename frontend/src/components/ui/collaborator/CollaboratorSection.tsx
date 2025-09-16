import React from "react";
import { graphqlClient } from "@/graphql/client";
import { gql } from "graphql-request";
import ThreeColumnExpandableRows from "@/components/ui/expandableRows/ThreeColumnExpandableRows";
import { ExpandableRowItem } from "@/components/ui/expandableRows/ExpandableRows";
import { GetAllCollaboratorsQuery, GetAllCollaboratorsQueryVariables } from "@/graphql/generatedTypes";
import SubHeading from "@/components/ui/SubHeading";

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
  columns?: number;
}

export default async function CollaboratorSection({ title, collaboratorSlugs, columns = 1 }: CollaboratorSectionProps) {
  const data = await graphqlClient.request<GetAllCollaboratorsQuery, GetAllCollaboratorsQueryVariables>(GetAllCollaborators);

  const items: ExpandableRowItem[] = collaboratorSlugs
    .flatMap(slug => {
      const collaboratorData = data.collaborators?.edges?.find((edge: any) =>
        edge.node.slug === slug
      )?.node;

      if (!collaboratorData) return [];

      return [{
        name: collaboratorData.title || '',
        role: collaboratorData.collaboratorProfile?.roles || '',
        content: collaboratorData.content || '',
        referencedLinks: collaboratorData.collaboratorProfile?.referencedProjects?.nodes?.map((project: any) => ({
          title: project.title,
          slug: project.slug
        })) || []
      }];
    });

  return <>
    <div className="pb-4">
      <SubHeading>{title}</SubHeading>
    </div>
    <ThreeColumnExpandableRows items={items} columns={columns} />
  </>
}
