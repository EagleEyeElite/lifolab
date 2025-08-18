import React from "react";
import SectionHeader from "@/components/ui/sectionHeader";
import { BookOpen } from "lucide-react";
import { graphqlClient } from "@/graphql/client";
import { gql } from "graphql-request";
import MasonryLayout from "@/components/ui/projectsOverview/masonryLayout";
import CyclopediaEntryCard from "@/components/ui/cyclopediaOverview/CyclopediaEntryCard";

const GetCyclopediaEntriesWithChapters = gql`
  query GetCyclopediaEntriesWithChapters {
    cyclopediaEntries(first: 50) {
      edges {
        node {
          id
          title
          content
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
          cyclopediaEntryDetails {
            chapter {
              nodes {
                ... on CyclopediaChapter {
                  id
                  title
                  cyclopediaChapterOrder {
                    chapterOrder
                  }
                }
              }
            }
            entryOrder
          }
        }
      }
    }
  }
`;

export const revalidate = 10;

export default async function Cyclopedia() {
  // Fetch all entries with their chapter information
  const data = await graphqlClient.request(
    GetCyclopediaEntriesWithChapters
  );
  
  const entries = (data as any)?.cyclopediaEntries?.edges?.map((edge: any) => edge.node) || [];
  
  // Group entries by chapter
  const chaptersMap = new Map<string, { chapter: any; entries: any[] }>();
  
  entries.forEach((entry: any) => {
    const chapterNodes = entry.cyclopediaEntryDetails?.chapter?.nodes || [];
    if (chapterNodes.length > 0) {
      const chapter = chapterNodes[0]; // Assuming each entry belongs to one chapter
      if (!chaptersMap.has(chapter.id)) {
        chaptersMap.set(chapter.id, { chapter, entries: [] });
      }
      chaptersMap.get(chapter.id)?.entries.push(entry);
    }
  });
  
  // Sort chapters by chapter_order and entries by entry_order
  const chaptersWithValidEntries = Array.from(chaptersMap.values())
    .sort((a, b) => {
      const orderA = a.chapter.cyclopediaChapterOrder?.chapterOrder || 999;
      const orderB = b.chapter.cyclopediaChapterOrder?.chapterOrder || 999;
      return orderA - orderB;
    })
    .map(({ chapter, entries }) => ({
      chapter,
      entries: entries.sort((a, b) => {
        const orderA = a.cyclopediaEntryDetails?.entryOrder || 999;
        const orderB = b.cyclopediaEntryDetails?.entryOrder || 999;
        return orderA - orderB;
      })
    }));

  return (
    <div className="flex justify-start w-full" id="cyclopedia">
      <div className="w-full">
        <div className="px-6 py-6 space-y-6">
          <SectionHeader icon={BookOpen}>
            Cyclopedia
          </SectionHeader>
          {chaptersWithValidEntries.length > 0 ? (
            <div className="space-y-8">
              {chaptersWithValidEntries.map(({ chapter, entries }) => (
                <div key={chapter.id} className="space-y-4">
                  <h1 className="text-xl font-body font-bold pb-4">
                    {chapter.title}
                  </h1>
                  <MasonryLayout>
                    {entries.map((entry: any) => (
                      <CyclopediaEntryCard
                        key={entry.id}
                        entry={entry}
                      />
                    ))}
                  </MasonryLayout>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center min-h-64">
              <p className="text-sm font-heading">No entries found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}