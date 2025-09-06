import { graphqlClient } from '@/graphql/client';
import { gql } from 'graphql-request';
import HTMLRenderer from "@/components/ui/renderHtml/htmlRenderer";
import React from "react";
import {GetDescriptionContentQuery} from "@/graphql/generatedTypes";

const GetDescriptionContent = gql`
    query GetDescriptionContent {
        descriptionSettings {
            descriptionOptions {
                descriptionContent
            }
        }
    }
`;

export default async function Description() {
  const data = await graphqlClient.request<GetDescriptionContentQuery>(GetDescriptionContent);
  const content = data?.descriptionSettings?.descriptionOptions?.descriptionContent;

  if (!content) {
    throw new Error('Description content not found');
  }

  return (
    <div className="flex justify-center py-[var(--spacing-match-logo-scroll-offset)]">
      <HTMLRenderer content={content} className="font-heading text-xl sm:text-2xl tracking-tight text-center text-gray-700" />
    </div>
  );
}
