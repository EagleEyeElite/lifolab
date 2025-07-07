import React from 'react';
import { FolderClosed } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";
import SectionHeader from '../../ui/sectionHeader';
import { graphqlClient } from '@/graphql/client';
import { gql } from 'graphql-request';
import { GetImprintContentQuery, GetImprintContentQueryVariables } from "@/graphql/generatedTypes";

const GetImprintContent = gql`
    query GetImprintContent {
        frontendContentSettings {
            frontendContent {
                imprint {
                    imprintImages {
                        nodes {
                            id
                            sourceUrl
                            altText
                        }
                    }
                }
            }
        }
    }
`;

export default async function ImprintSection() {
  const { frontendContentSettings } = await graphqlClient.request<GetImprintContentQuery, GetImprintContentQueryVariables>(
    GetImprintContent,
  );

  const imprintImages = frontendContentSettings?.frontendContent?.imprint?.imprintImages?.nodes || [];

  return (
    <div className="flex-1 space-y-4">
      <SectionHeader icon={FolderClosed}>Imprint</SectionHeader>

      <div className="space-y-6">
        <div className="flex items-center justify-center gap-6 flex-wrap">
          {imprintImages.map(({ id, sourceUrl, altText }) => {
            if (!sourceUrl) {
              throw new Error(`Invalid sourceUrl for imprint image with id: ${id}`);
            }

            return (
              <Link
                key={id}
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Image
                  src={sourceUrl}
                  alt={altText || 'Imprint Image'}
                  width={120}
                  height={48}
                  className="object-contain"
                />
              </Link>
            );
          })}
        </div>

        <div className="text-center font-mono text-sm text-black space-y-1">
          <p className="font-medium">Copyright:</p>
          <p>Living the Forest Lab | Reallabor Wald</p>
        </div>
      </div>
    </div>
  );
}