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
        }
      }
    }
  }
`;

// Server component for data fetching
export default async function People() {
  // Fetch collaborators from CMS
  const data = await graphqlClient.request<GetCollaboratorsQuery, GetCollaboratorsQueryVariables>(GetCollaborators);
  
  // Transform CMS data to Person format
  const cmsCollaborators: Person[] = data?.collaborators?.edges?.map((edge) => ({
    name: edge.node.title || "Unknown",
    role: edge.node.content ? edge.node.content.replace(/<[^>]*>/g, '').trim() : "collaborator",
    href: "#",
    hasLink: false,
    content: edge.node.content || ""
  })) || [];
  
  // Use CMS data for both team members and collaborators
  return <PeopleClient teamMembers={cmsCollaborators} collaborators={cmsCollaborators} />;
}
