import { graphqlClient } from '@/graphql/client';
import { gql } from 'graphql-request';
import HTMLRenderer from "@/components/ui/htmlRenderer";
import { GetAboutPageQuery, GetAboutPageQueryVariables, PageIdType } from "@/graphql/generatedTypes";

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
    <div className="flex justify-center items-center max-w-4xl mx-auto px-8 text-center">
      <div className="text-xl md:text-2xl leading-relaxed text-black font-normal tracking-wide">
        <HTMLRenderer content={page.content} />
      </div>
    </div>
  );
}
