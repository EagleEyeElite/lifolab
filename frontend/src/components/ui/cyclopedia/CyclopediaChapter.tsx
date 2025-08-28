import React from "react";
import MasonryLayout from "@/components/ui/projectsOverview/masonryLayout";
import CyclopediaEntryCard from "./CyclopediaEntryCard";
import {graphqlClient} from "@/graphql/client";
import {gql} from "graphql-request";
import {GetChapterWithEntryIdsQuery, GetChapterWithEntryIdsQueryVariables} from "@/graphql/generatedTypes";

const GetChapterWithEntryIds = gql`
    query GetChapterWithEntryIds($chapterId: ID!) {
        cyclopediaChapter(id: $chapterId) {
            id
            title
            cyclopediaChapterDetails {
                entries {
                    nodes {
                        ... on CyclopediaEntry {
                            __typename
                            id
                        }
                    }
                }
            }
        }
    }
`;

interface CyclopediaChapterProps {
  chapterId: string;
}

export default async function CyclopediaChapter({ chapterId }: CyclopediaChapterProps) {
  const { cyclopediaChapter } = await graphqlClient.request<GetChapterWithEntryIdsQuery, GetChapterWithEntryIdsQueryVariables>(GetChapterWithEntryIds, {
    chapterId: chapterId
  });

  const chapter = cyclopediaChapter;
  if (!chapter) {
    throw new Error('Chapter not found');
  }

  const entryNodes = chapter.cyclopediaChapterDetails?.entries?.nodes || [];

  const entries = entryNodes
    .filter((node): node is { __typename?: 'CyclopediaEntry'; id: string } => {
      return Boolean(node) && node.__typename === 'CyclopediaEntry' && 'id' in node;
    });

  if (entries.length == 0) {
    throw new Error('No entries found in chapter');
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-body font-bold pb-4">
        {chapter.title}
      </h1>
      <MasonryLayout>
        {entries.map((entry) => (
          <CyclopediaEntryCard key={entry.id} entryId={entry.id} />
        ))}
      </MasonryLayout>
    </div>
  );
}
