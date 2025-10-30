import React from "react";
import { graphqlClient } from "@/graphql/client";
import { gql } from "graphql-request";
import ThreeColumnExpandableRows from "@/components/ui/expandableRows/ThreeColumnExpandableRows";
import ExpandableRows, { ExpandableRowItem } from "@/components/ui/expandableRows/ExpandableRows";
import { GetAllPeopleQuery, GetAllPeopleQueryVariables } from "@/graphql/generatedTypes";
import SubHeading from "@/components/ui/SubHeading";
import { getLifoIndexColors } from '@/lib/getSiteColors';

const GetAllPeople = gql`
    query GetAllPeople {
        people(first: 100) {
            edges {
                node {
                    id
                    title
                    content
                    slug
                    personProfile {
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

interface PersonSectionProps {
  title: string;
  personSlugs: string[];
  columns?: number;
}

export default async function PeopleSection({ title, personSlugs, columns = 1 }: PersonSectionProps) {
  const data = await graphqlClient.request<GetAllPeopleQuery, GetAllPeopleQueryVariables>(GetAllPeople);
  const { primaryColor, secondaryColor } = await getLifoIndexColors();

  const items: ExpandableRowItem[] = personSlugs
    .flatMap(slug => {
      const personData = data.people?.edges?.find((edge: any) =>
        edge.node.slug === slug
      )?.node;

      if (!personData) return [];

      return [{
        name: personData.title || '',
        role: personData.personProfile?.roles || '',
        content: personData.content || '',
        referencedLinks: personData.personProfile?.referencedProjects?.nodes?.map((project: any) => ({
          title: project.title,
          slug: project.slug
        })) || []
      }];
    });

  return <>
    <div className="pb-4">
      <SubHeading>{title}</SubHeading>
    </div>
    {columns === 1 ? (
      <ExpandableRows items={items} />
    ) : (
      <ThreeColumnExpandableRows items={items} primaryColor={primaryColor} secondaryColor={secondaryColor} />
    )}
  </>
}
