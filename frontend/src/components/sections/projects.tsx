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
        posts(first: 1) {
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

  const postData = data?.posts?.edges?.[0]?.node;
  const postTitle = postData?.title || "Default Title";
  const postDate = postData?.date || undefined;
  const postSlug = postData?.slug || "";
  const postTags = postData?.tags?.edges?.map((edge: any) => edge.node) || [];
  const postFeaturedImage = postData?.featuredImage?.node;

  // Simplified array with only imageSize
  const imageSizes = [
    "massive", "tiny", "tiny", "tiny", "tiny", "tiny", "tiny",
    "large", "medium", "huge", "tiny", "small", "massive"
  ];

  // Generate projectCards programmatically
  const projectCards = imageSizes.map((size, index) => (
    <ProjectCard
      key={index}
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
  ));

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
