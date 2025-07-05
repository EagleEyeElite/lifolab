import React from "react";
import { graphqlClient } from "@/graphql/client";
import { gql } from "graphql-request";
import PeopleClient from "@/components/ui/people/PeopleClient";
import {
  GetCollaboratorsQuery,
  GetCollaboratorsQueryVariables,
} from "@/graphql/generatedTypes";

interface Person {
  name: string;
  role: string;
  href: string;
  hasLink: boolean;
  content?: string;
  projects?: Array<{
    title: string;
    slug: string;
  }>;
}

const GetCollaborators = gql`
  query GetCollaborators {
    collaborators(first: 100) {
      edges {
        node {
          id
          title
          content
          date
          collaboratorFields {
            coreMember
            roles
            referencedPosts {
              nodes {
                __typename
                ... on Post {
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

// Server component for data fetching
export default async function People() {
  // Fetch collaborators from CMS
  const data = await graphqlClient.request<GetCollaboratorsQuery, GetCollaboratorsQueryVariables>(GetCollaborators);
  
  // Transform CMS data to Person format and filter by coreMember flag
  const allCollaborators: Person[] = data?.collaborators?.edges?.flatMap((edge) => {
    const basePerson = {
      name: edge.node.title || "Unknown",
      role: edge.node.collaboratorFields?.roles || "collaborator",
      href: "#",
      hasLink: false,
      content: edge.node.content || "",
      projects: edge.node.collaboratorFields?.referencedPosts?.nodes?.filter(post => post.__typename === "Post").map(post => ({
        title: post.title || "Untitled",
        slug: post.slug || ""
      })) || []
    };
    
    // Repeat each person 3 times for testing
    return [
      { ...basePerson, name: `${basePerson.name} 1` },
      { ...basePerson, name: `${basePerson.name} 2` },
      { ...basePerson, name: `${basePerson.name} 3` }
    ];
  }) || [];
  
  // Filter collaborators based on coreMember flag
  const coreMembers = allCollaborators.filter((_, index) => {
    const originalIndex = Math.floor(index / 3);
    const edge = data?.collaborators?.edges?.[originalIndex];
    return edge?.node.collaboratorFields?.coreMember === true;
  });
  
  const nonCoreMembers = allCollaborators.filter((_, index) => {
    const originalIndex = Math.floor(index / 3);
    const edge = data?.collaborators?.edges?.[originalIndex];
    return edge?.node.collaboratorFields?.coreMember !== true;
  });
  
  // Core members go to first list (teamMembers), non-core members to second list (collaborators)
  return <PeopleClient teamMembers={coreMembers} collaborators={nonCoreMembers} />;
}
