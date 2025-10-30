import Image from "next/image";
import ExpandableRows, { ExpandableRowItem } from "@/components/ui/expandableRows/ExpandableRows";
import {graphqlClient} from "@/graphql/client";
import {gql} from "graphql-request";
import {GetAboutContentQuery} from "@/graphql/generatedTypes";
import Section from "@/components/ui/Section";
import HTMLRenderer from "@/components/ui/renderHtml/htmlRenderer";
import { sections, strings } from "@/config/siteConfig";

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
                        mediaDetails {
                            width
                            height
                        }
                    }
                }
            }
        }
    }
`;

export default async function About() {
  const data = await graphqlClient.request<GetAboutContentQuery>(GetAboutContent);
  const aboutData = data?.aboutSettings?.aboutOptions;

  // Throw error if no image is found
  if (!aboutData?.aboutFeatureImage?.node?.sourceUrl) {
    throw new Error("About Us image is required but not found in the data");
  }

  return (
    <Section title={sections.about.name} icon={sections.about.icon}>
      {/* Main content grid container - responsive layout: 1 col mobile, 2 col tablet, 3 col desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Main content - Text */}
        <div className="order-1">
          <h1 className="text-5xl font-normal leading-none text-black tracking-normal mb-8 inline-block">
            {aboutData?.aboutTitle || "Living the Forest Lab"}
          </h1>
          <HTMLRenderer content={aboutData?.aboutContentText} className="text-lg leading-tight text-black font-normal text-justify max-w-none" />
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
          <Image
            src={aboutData.aboutFeatureImage.node.sourceUrl}
            alt={aboutData.aboutFeatureImage.node.altText || ""}
            width={aboutData.aboutFeatureImage.node.mediaDetails!.width!}
            height={aboutData.aboutFeatureImage.node.mediaDetails!.height!}
            className="w-full h-auto object-cover rounded-primary"
          />
        </div>
      </div>
    </Section>
  );
}
