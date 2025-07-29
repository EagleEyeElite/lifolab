import { graphqlClient } from '@/graphql/client';
import { gql } from 'graphql-request';
import HTMLRenderer from "@/components/ui/renderHtml/htmlRenderer";
import { GetAboutPageQuery, GetAboutPageQueryVariables, PageIdType } from "@/graphql/generatedTypes";
import React from "react";

const GetAboutPage = gql`
    query GetAboutPage {
        page(id: "about-section", idType: URI) {
            title
            content
        }
    }
`;

export default async function About() {
  const { page } = await graphqlClient.request<GetAboutPageQuery, GetAboutPageQueryVariables>(
    GetAboutPage
  );

  if (!page) {
    throw new Error(`Page with uri "about-section" not found`);
  }

  return (
    <div className="flex justify-center px-6 pt-5 pb-28" id="about">
      <HTMLRenderer content={page.content} className="font-heading text-2xl tracking-tight text-center text-gray-700" />
    </div>
  );
}
