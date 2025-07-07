import React from "react";
import { graphqlClient } from '@/graphql/client';
import { gql } from 'graphql-request';
import ProjectCardClient from './ProjectCardClient';
import {GetPostCardQuery, GetPostCardQueryVariables} from "@/graphql/generatedTypes";

const GetPostCard = gql`
    query GetPostCard($slug: ID!) {
        post(id: $slug, idType: SLUG) {
            id
            title
            date
            slug
            excerpt
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
`;

interface ProjectCardProps {
  slug: string;
  imageSize: 'tiny' | 'small' | 'medium' | 'large' | 'huge' | 'massive';
}

export default async function ProjectCard({ slug, imageSize }: ProjectCardProps) {
  const data = await graphqlClient.request<GetPostCardQuery, GetPostCardQueryVariables>(
    GetPostCard, { slug }
  );
  const post = data.post;
  if (!post) {
    throw new Error(`Post with slug "${slug}" not found`);
  }

  const postTags = post.tags?.edges?.map((edge) => ({
    name: edge.node!.name!,
    slug: edge.node!.slug!
  })) || [];

  return (
    <ProjectCardClient
      title={post.title!}
      href={`/${post.slug!}`}
      tags={postTags}
      date={post.date!}
      excerpt={post.excerpt || undefined}
      image={post.featuredImage?.node?.sourceUrl || ''}
      imageSize={imageSize}
    />
  );
}