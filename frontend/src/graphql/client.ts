import { GraphQLClient } from 'graphql-request';

const API_URL = process.env.WORDPRESS_CMS_PUBLIC_URL!;
const headers: Record<string, string> = {
  'Content-Type': 'application/json',
  'Authorization': `Basic ${Buffer.from(
    `admin:${process.env.FRONTEND_NEXTJS_PASSWORD}`
  ).toString('base64')}`
};

export const graphqlClient = new GraphQLClient(`${API_URL}/graphql`, {
  headers,
  fetch: (url: RequestInfo | URL, init?: RequestInit) => {
    return fetch(url, {
      ...init,
    });
  }
});
