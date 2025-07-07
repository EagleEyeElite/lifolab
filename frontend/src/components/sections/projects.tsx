import React from "react";
import SectionHeader from "@/components/ui/sectionHeader";
import ProjectCard from "@/components/ui/projectCard";
import { Package } from "lucide-react";
import { graphqlClient } from "@/graphql/client";
import { gql } from "graphql-request";
import { GetPostsQuery, GetPostsQueryVariables } from "@/graphql/generatedTypes";
import MasonryLayout from "@/components/ui/masonryLayout";

const GetPosts = gql`
    query GetPosts {
        posts(first: 50) {
            edges {
                node {
                    slug
                }
            }
        }
    }
`;

export default async function Projects() {
  const data = await graphqlClient.request<GetPostsQuery, GetPostsQueryVariables>(
    GetPosts,
  );

  const posts = data?.posts?.edges?.map(edge => edge.node) || [];

  // Simplified array with only imageSize
  const imageSizes = [
    "massive", "tiny", "tiny", "tiny", "tiny", "tiny", "tiny",
    "large", "medium", "huge", "tiny", "small", "massive"
  ];

  // Generate 13 project cards, cycling through available posts
  const projectCards = imageSizes.map((size, index) => {
    // Cycle through posts if we have fewer posts than cards needed
    const postIndex = posts.length > 0 ? index % posts.length : 0;
    const currentPost = posts[postIndex];

    if (!currentPost || !currentPost.slug) {
      throw new Error(`Post "${currentPost}" with slug not found`);
    }

    return (
      <ProjectCard
        key={index}
        slug={currentPost.slug}
        imageSize={size as 'tiny' | 'small' | 'medium' | 'large' | 'huge' | 'massive'}
      />
    );
  }).filter(Boolean);

  return (
    <div className="flex justify-start w-full">
      <div className="w-full">
        <div className="px-[1.6rem] py-[1.6rem] space-y-6">
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
