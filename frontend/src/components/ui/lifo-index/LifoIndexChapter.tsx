import React from "react";
import MasonryLayout from "@/components/ui/projectsOverview/masonryLayout";
import LifoIndexEntryCard from "./LifoIndexEntryCard";
import {graphqlClient} from "@/graphql/client";
import {gql} from "graphql-request";

const GetLifoIndexChapterWithEntryIds = gql`
    query GetLifoIndexChapterWithEntryIds($chapterId: ID!) {
        lifoIndexChapter(id: $chapterId) {
            id
            title
            lifoIndexChapterDetails {
                entries {
                    nodes {
                        ... on LifoIndexEntry {
                            __typename
                            id
                        }
                    }
                }
            }
        }
    }
`;

interface LifoIndexChapterProps {
  chapterId: string;
  backgroundColor: string;
}

export default async function LifoIndexChapter({ chapterId, backgroundColor }: LifoIndexChapterProps) {
  const { lifoIndexChapter } = await graphqlClient.request<any>(GetLifoIndexChapterWithEntryIds, {
    chapterId: chapterId
  });

  const chapter = lifoIndexChapter;
  if (!chapter) {
    throw new Error('Chapter not found');
  }

  const entryNodes = chapter.lifoIndexChapterDetails?.entries?.nodes || [];

  const entries = entryNodes
    .filter((node: any): node is { __typename?: 'LifoIndexEntry'; id: string } => {
      return Boolean(node) && node.__typename === 'LifoIndexEntry' && 'id' in node;
    });

  if (entries.length == 0) {
    throw new Error('No entries found in chapter');
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-body font-bold pt-10">
        {chapter.title}
      </h1>
      <MasonryLayout>
        {entries.map((entry: any) => (
          <LifoIndexEntryCard key={entry.id} entryId={entry.id} backgroundColor={backgroundColor} />
        ))}
      </MasonryLayout>
    </div>
  );
}
