import React from "react";
import SectionHeader from "@/components/ui/sectionHeader";
import ProjectCard, { ProjectItem } from "@/components/ui/projectCard";
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
                    id
                    title
                    date
                    slug
                    featuredImage {
                        node {
                            sourceUrl
                            altText
                        }
                    }
                    tags {
                        edges {
                            node {
                                name
                                slug
                            }
                        }
                    }
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
    
    if (!currentPost) {
      return null;
    }

    const postTitle = currentPost.title || "Default Title";
    const postDate = currentPost.date || undefined;
    const postSlug = currentPost.slug || "";
    const postTags = currentPost.tags?.edges?.map((edge: any) => edge.node) || [];
    const postFeaturedImage = currentPost.featuredImage?.node;

    return (
      <ProjectCard
        key={`${currentPost.id}-${index}`}
        item={{
          title: `${postTitle} #${index + 1}`,
          href: `/${postSlug}`,
          tags: postTags,
          date: postDate,
          image: postFeaturedImage?.sourceUrl!,
          imageSize: size as ProjectItem['imageSize']
        }}
        index={index}
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
