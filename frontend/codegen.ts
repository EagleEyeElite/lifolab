import type { CodegenConfig } from '@graphql-codegen/cli';
import dotenv from 'dotenv';

dotenv.config({
  path: ['.env', '../.env', '../.env.local']
});

const config: CodegenConfig = {
  schema: [
    {
      [`${process.env.WORDPRESS_CMS_PUBLIC_URL}/graphql`]: {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `admin:${process.env.FRONTEND_NEXTJS_PASSWORD}`
          ).toString('base64')}`,
        },
      },
    },
  ],
  documents: ["**/*.{gql,graphql,ts,tsx}"],
  generates: {
    "src/graphql/generatedTypes.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-graphql-request",
      ],
    },
  },
};

export default config;
