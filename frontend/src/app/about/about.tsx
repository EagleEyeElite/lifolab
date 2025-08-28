import Image from "next/image";
import { Pencil } from "lucide-react";
import SectionHeader from "@/components/ui/sectionHeader";
import ExpandableRows, { ExpandableRowItem } from "@/components/ui/expandableRows/ExpandableRows";
import {graphqlClient} from "@/graphql/client";
import {gql} from "graphql-request";

const GetAboutContent = gql`
  query GetAboutContent {
    aboutSettings {
      aboutOptions {
        aboutTitle
        aboutContentText
        aboutExpandableInfoGroups {
          expandableInfo {
            title
            content
          }
        }
        aboutFeatureImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`;

interface AboutContentQuery {
  aboutSettings?: {
    aboutOptions?: {
      aboutTitle?: string;
      aboutContentText?: string;
      aboutExpandableInfoGroups?: Array<{
        expandableInfo?: Array<{
          title?: string;
          content?: string;
        }> | null;
      }> | null;
      aboutFeatureImage?: {
        node?: {
          sourceUrl?: string;
          altText?: string;
        } | null;
      } | null;
    } | null;
  } | null;
}

export default async function About() {
  const data = await graphqlClient.request<AboutContentQuery>(GetAboutContent);
  const aboutData = data?.aboutSettings?.aboutOptions;

  return (
    <div className="flex justify-start w-full">
      <div className="w-full">
        <div className="px-[1.6rem] py-[1.6rem] space-y-6">
          {/* About section header */}
          <div className="mb-8">
            <SectionHeader icon={Pencil}>About</SectionHeader>
          </div>

          {/* Main content flex container */}
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Main content */}
            <div className="flex-1">
              <h1 className="text-5xl font-normal leading-none text-black/85 tracking-normal mb-8 inline-block">
                {aboutData?.aboutTitle || "Living the Forest Lab"}
              </h1>

              <div className="text-lg leading-tight text-black opacity-85 font-normal text-justify">
                <div dangerouslySetInnerHTML={{ __html: aboutData?.aboutContentText || "" }} />
              </div>
            </div>

            {/* Expandable Info - Grouped */}
            <div className="flex-1 lg:w-80">
              {aboutData?.aboutExpandableInfoGroups?.map((group, groupIndex) => {
                // Transform expandable info to ExpandableRowItem format
                const groupItems: ExpandableRowItem[] = group?.expandableInfo?.map(info => ({
                  name: info?.title || "",
                  content: info?.content || ""
                })) || [];

                return (
                  <div key={groupIndex} className="mb-6">
                    <ExpandableRows items={groupItems} />
                  </div>
                );
              })}
            </div>

            {/* Image */}
            {aboutData?.aboutFeatureImage?.node?.sourceUrl && (
              <Image
                src={aboutData.aboutFeatureImage.node.sourceUrl}
                alt={aboutData.aboutFeatureImage.node.altText || "About image"}
                width={500}
                height={500}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
