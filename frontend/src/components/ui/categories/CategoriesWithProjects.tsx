'use client';

import { graphqlClient } from '@/graphql/client';
import { gql } from 'graphql-request';
import Link from 'next/link';
import ProjectCard from '@/components/ui/projectsOverview/projectCard';
import SubHeading from '@/components/ui/SubHeading';
import { useState, useEffect } from 'react';
import {
  GetAllTagsQuery,
  GetAllTagsQueryVariables,
  GetProjectsByTagQuery,
  GetProjectsByTagQueryVariables
} from '@/graphql/generatedTypes';
import { strings } from '@/config/siteConfig';

const GetAllTagsWithDetails = gql`
    query GetAllTagsWithDetails {
        tags {
            edges {
                node {
                    id
                    name
                    slug
                }
            }
        }
    }
`;

const GetProjectsByTag = gql`
    query GetProjectsByTag($slug: [String]) {
        projects(where: { tagSlugIn: $slug }) {
            edges {
                node {
                    id
                    slug
                }
            }
        }
    }
`;

interface TagsWithProjectsProps {
  selectedTagSlug?: string;
}

export default function TagsWithProjects({ selectedTagSlug }: TagsWithProjectsProps) {
  const [tags, setTags] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(selectedTagSlug || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTags() {
      try {
        const { tags: tagsData } = await graphqlClient.request<GetAllTagsQuery, GetAllTagsQueryVariables>(GetAllTagsWithDetails);
        setTags(tagsData?.edges?.map(({ node }) => node) || []);
      } catch (error) {
        console.error('Error fetching tags:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchTags();
  }, []);

  useEffect(() => {
    async function fetchProjects() {
      if (!selectedTag) {
        setProjects([]);
        return;
      }

      try {
        const { projects: projectsData } = await graphqlClient.request<GetProjectsByTagQuery, GetProjectsByTagQueryVariables>(
          GetProjectsByTag,
          { slug: [selectedTag] }
        );
        setProjects(projectsData?.edges?.map(({ node }) => node) || []);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setProjects([]);
      }
    }
    fetchProjects();
  }, [selectedTag]);

  const handleTagClick = (tagSlug: string) => {
    if (selectedTag === tagSlug) {
      setSelectedTag(null);
    } else {
      setSelectedTag(tagSlug);
    }
  };

  if (loading) {
    return <div>{strings.ui.loading}</div>;
  }

  return (
    <div className="flex flex-col items-center pt-6">
      <div className="max-w-xl w-full pb-10">
        <div className="flex items-center">
          <div className="pr-2">
            <SubHeading>{strings.ui.categoriesLabel}</SubHeading>
          </div>
          <div className="flex flex-wrap gap-1">
            {tags.map((tag) => (
              <button
                key={tag.id}
                onClick={() => handleTagClick(tag.slug)}
                className={`inline-flex items-center px-2 py-1 text-xs font-heading border border-gray-500 rounded-full transition-colors ${
                  selectedTag === tag.slug
                    ? 'bg-gray-500 text-white'
                    : 'bg-secondary text-gray-500 hover:bg-gray-100'
                }`}
              >
                {tag.name}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {selectedTag && (
        <div className="max-w-lg">
          <div className="flex flex-col gap-14">
            {projects.length ? (
              projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  id={project.id}
                  imageSize="medium"
                />
              ))
            ) : (
              <p className="text-gray-500 font-body">{strings.ui.noCategoryProjects}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}