import React from "react";
import SectionHeader from "@/components/ui/sectionHeader";
import { BookOpen } from "lucide-react";
import { graphqlClient } from "@/graphql/client";
import { gql } from "graphql-request";
import CyclopediaChapter from "@/components/ui/cyclopedia/CyclopediaChapter";
import { GetCyclopediaChaptersQuery, GetCyclopediaChaptersQueryVariables } from "@/graphql/generatedTypes";


const GetCyclopediaChapters = gql`
  query GetCyclopediaChapters {
    cyclopediaChapters(first: 50) {
      edges {
        node {
          id
          cyclopediaChapterDetails {
            chapterOrder
          }
        }
      }
    }
  }
`;

export const revalidate = 10;

export default async function Cyclopedia() {
  // Fetch chapters only
  const { cyclopediaChapters } = await graphqlClient.request<GetCyclopediaChaptersQuery, GetCyclopediaChaptersQueryVariables>(
    GetCyclopediaChapters
  );
  
  const chapters = cyclopediaChapters?.edges?.map((edge: any) => edge.node).filter(Boolean) || [];
  
  // Sort chapters by chapter_order and extract just IDs
  const sortedChapterIds = chapters
    .sort((a: any, b: any) => {
      const orderA = a?.cyclopediaChapterDetails?.chapterOrder || 999;
      const orderB = b?.cyclopediaChapterDetails?.chapterOrder || 999;
      return orderA - orderB;
    })
    .map((chapter: any) => chapter?.id)
    .filter(Boolean);

  return (
    <div className="flex justify-start w-full" id="cyclopedia">
      <div className="w-full">
        <div className="px-6 py-6 space-y-6">
          <SectionHeader icon={BookOpen}>
            Cyclopedia
          </SectionHeader>
          <div className="space-y-8">
            {sortedChapterIds.map((chapterId: string) => (
              <CyclopediaChapter
                key={chapterId}
                chapterId={chapterId}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}