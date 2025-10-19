import { GraphQLClient } from 'graphql-request';

const API_URL = process.env.WORDPRESS_CMS_PUBLIC_URL!;
const headers: Record<string, string> = {
  'Content-Type': 'application/json',
  'Authorization': `Basic ${Buffer.from(
    `admin:${process.env.FRONTEND_NEXTJS_PASSWORD}`
  ).toString('base64')}`
};

// Transform WordPress URLs to use proxy path
function transformWordPressUrls(obj: any): any {

  if (obj === null || obj === undefined) return obj;

  if (typeof obj === 'string') {
    // Transform WordPress URLs to use the proxy path
    // Match any URL that points to wp-content (handles both localhost:8080 and wordpress:80)
    const wpContentPattern = /https?:\/\/[^\/]+\/wp-content\//g;
    return obj.replace(wpContentPattern, '/wp-proxy/');
  }

  if (Array.isArray(obj)) {
    return obj.map(transformWordPressUrls);
  }

  if (typeof obj === 'object') {
    const transformed: any = {};
    for (const key in obj) {
      transformed[key] = transformWordPressUrls(obj[key]);
    }
    return transformed;
  }

  return obj;
}

export const graphqlClient = new GraphQLClient(`${API_URL}/graphql`, {
  headers,
  fetch: (url: RequestInfo | URL, init?: RequestInit) => {
    return fetch(url, {
      ...init,
      next: { revalidate: 10 }
    });
  },
  responseMiddleware: (response) => {
    // Transform all WordPress URLs in the response
    if (response instanceof Error) {
      throw response;
    }
    if (response.data) {
      response.data = transformWordPressUrls(response.data);
    }
  }
});
