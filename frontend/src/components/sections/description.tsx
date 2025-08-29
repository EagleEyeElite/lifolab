import { graphqlClient } from '@/graphql/client';
import { gql } from 'graphql-request';
import HTMLRenderer from "@/components/ui/renderHtml/htmlRenderer";
import React from "react";

const GetDescriptionContent = gql`
    query GetDescriptionContent {
        descriptionSettings {
            descriptionOptions {
                descriptionContent
            }
        }
    }
`;

interface DescriptionContentQuery {
  descriptionSettings?: {
    descriptionOptions?: {
      descriptionContent?: string;
    } | null;
  } | null;
}

export default async function Description() {
  const data = await graphqlClient.request<DescriptionContentQuery>(GetDescriptionContent);
  const content = data?.descriptionSettings?.descriptionOptions?.descriptionContent;

  if (!content) {
    throw new Error('Description content not found');
  }

  return (
    <div className="flex justify-center px-6 pt-5 pb-28" id="about">
      <HTMLRenderer content={content} className="font-heading text-2xl tracking-tight text-center text-gray-700" />
    </div>
  );
}
