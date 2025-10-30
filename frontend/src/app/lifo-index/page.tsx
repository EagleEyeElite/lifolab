import React from "react";
import { graphqlClient } from "@/graphql/client";
import { gql } from "graphql-request";
import LifoIndexChapter from "@/components/ui/lifo-index/LifoIndexChapter";
import Section from "@/components/ui/Section";
import { sections } from "@/config/siteConfig";


const GetLifoIndexChapters = gql`
  query GetLifoIndexChapters {
    lifoIndexChapters(first: 50) {
      edges {
        node {
          id
          lifoIndexChapterDetails {
            chapterOrder
            backgroundColor
          }
        }
      }
    }
  }
`;

export const revalidate = 10;

export default async function LifoIndex() {
  // Fetch chapters only
  const { lifoIndexChapters } = await graphqlClient.request<any>(
    GetLifoIndexChapters
  );

  const chapters = lifoIndexChapters?.edges?.map((edge: any) => edge.node).filter(Boolean) || [];

  // Sort chapters by chapter_order and extract IDs with colors
  const sortedChaptersData = chapters
    .sort((a: any, b: any) => {
      const orderA = a?.lifoIndexChapterDetails?.chapterOrder || 999;
      const orderB = b?.lifoIndexChapterDetails?.chapterOrder || 999;
      return orderA - orderB;
    })
    .map((chapter: any) => ({
      id: chapter?.id,
      backgroundColor: chapter?.lifoIndexChapterDetails?.backgroundColor
    }))
    .filter((chapter: any) => chapter.id);

  return (
    <Section title={sections.index.name} icon={sections.index.icon}>
      <div className="flex justify-start w-full">
        <div className="w-full">
          <div className="space-y-8">
            {sortedChaptersData.map((chapterData: any) => (
              <LifoIndexChapter
                key={chapterData.id}
                chapterId={chapterData.id}
                backgroundColor={chapterData.backgroundColor}
              />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}