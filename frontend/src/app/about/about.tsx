import Image from "next/image";
import { Pencil } from "lucide-react";
import SectionHeader from "@/components/ui/sectionHeader";
import ExpandableRows, { ExpandableRowItem } from "@/components/ui/expandableRows/ExpandableRows";
import {graphqlClient} from "@/graphql/client";
import {gql} from "graphql-request";
import {GetAboutContentQuery} from "@/graphql/generatedTypes";

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


export default async function About() {
  const data = await graphqlClient.request<GetAboutContentQuery>(GetAboutContent);
  const aboutData = data?.aboutSettings?.aboutOptions;

  return (
    <div className="flex justify-start w-full">
      <div className="w-full">
        <div className="px-[1.6rem] py-[1.6rem] space-y-6">
          {/* About section header */}
          <div className="mb-8">
            <SectionHeader icon={Pencil}>About</SectionHeader>
          </div>

          {/* Main content grid container - responsive layout: 1 col mobile, 2 col tablet, 3 col desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Main content - Text */}
            <div className="order-1">
              <h1 className="text-5xl font-normal leading-none text-black tracking-normal mb-8 inline-block">
                {aboutData?.aboutTitle || "Living the Forest Lab"}
              </h1>

              <div className="text-lg leading-tight text-black font-normal text-justify">
                <div dangerouslySetInnerHTML={{ __html: aboutData?.aboutContentText || "" }} />
              </div>
            </div>

            {/* Expandable Info - Links */}
            <div className="order-2">
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
            <div className="order-3">
              {aboutData?.aboutFeatureImage?.node?.sourceUrl && (
                <Image
                  src={aboutData.aboutFeatureImage.node.sourceUrl}
                  alt={aboutData.aboutFeatureImage.node.altText || "About image"}
                  width={500}
                  height={500}
                  className="w-full h-auto object-cover rounded-lg"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
