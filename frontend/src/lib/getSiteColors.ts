import { graphqlClient } from '@/graphql/client';
import { gql } from 'graphql-request';

// GraphQL Query to fetch site color settings
const GetSiteColorsQuery = gql`
  query GetSiteColors {
    siteColorSettings {
      siteColors {
        lifoIndexColors {
          primaryColor
          secondaryColor
        }
      }
    }
  }
`;

// Types for the color data structure
export interface LifolabColors {
  primaryColor?: string | null;
  secondaryColor?: string | null;
}

export interface SiteColors {
  lifoIndexColors?: LifolabColors | null;
}

export interface SiteColorSettings {
  siteColors?: SiteColors | null;
}

export interface GetSiteColorsQueryResponse {
  siteColorSettings?: SiteColorSettings | null;
}

/**
 * Fetches site-wide color settings from WordPress
 * @returns Promise containing the site color configuration
 * @example
 * ```tsx
 * const colors = await getSiteColors();
 * const primaryColor = colors?.siteColors?.lifoIndexColors?.primaryColor || '#FED7AA';
 * ```
 */
export async function getSiteColors(): Promise<SiteColorSettings | null> {
  try {
    const response = await graphqlClient.request<GetSiteColorsQueryResponse>(
      GetSiteColorsQuery
    );
    return response.siteColorSettings || null;
  } catch (error) {
    console.error('Failed to fetch site colors:', error);
    return null;
  }
}

/**
 * Gets Lifolab colour palette from WordPress CMS
 * @returns Lifolab color configuration
 * @throws Error if colors are not configured in WordPress
 */
export async function getLifoIndexColors(): Promise<{ primaryColor: string; secondaryColor: string }> {
  const siteColors = await getSiteColors();
  const colors = siteColors?.siteColors?.lifoIndexColors;

  if (!colors?.primaryColor || !colors?.secondaryColor) {
    throw new Error('Site colors not configured in WordPress. Please set colors in Site Content > Site Colors.');
  }

  return {
    primaryColor: colors.primaryColor,
    secondaryColor: colors.secondaryColor,
  };
}
