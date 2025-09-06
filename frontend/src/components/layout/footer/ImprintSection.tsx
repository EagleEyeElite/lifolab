import React from 'react';
import { FolderClosed } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";
import { graphqlClient } from '@/graphql/client';
import { gql } from 'graphql-request';
import { GetImprintContentQuery, GetImprintContentQueryVariables } from "@/graphql/generatedTypes";

const GetImprintContent = gql`
    query GetImprintContent {
        footerSettings {
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
  const { footerSettings } = await graphqlClient.request<GetImprintContentQuery, GetImprintContentQueryVariables>(
    GetImprintContent,
  );

  const imprintImages = footerSettings?.frontendContent?.imprint?.imprintImages?.nodes || [];

  return (
    <div className="flex-1 space-y-responsive">
      <div className={`border-y border-black py-responsive-sm`}>
        <h2 className={`text-responsive-xs pl-responsive font-heading tracking-wide flex items-center gap-2`}>
          Imprint <FolderClosed size={16} />
        </h2>
      </div>

      <div className="space-y-responsive">
        <div className="flex items-center gap-responsive-xs flex-wrap">
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
                  width={100}
                  height={40}
                  className="object-contain sm:w-[120px] sm:h-[48px]"
                />
              </Link>
            );
          })}
        </div>

        <p className="font-heading text-responsive-xs">
         Copyright: Living the Forest Lab | Reallabor Wald
        </p>
      </div>
    </div>
  );
}