import * as dotenvSafe from 'dotenv-safe';
import type { CodegenConfig } from '@graphql-codegen/cli';

dotenvSafe.config({
  path: '../.env',
  sample: '../.env.example',
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
  documents: "**/*.{gql,graphql}",
  generates: {
    "src/generated/graphql.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-graphql-request",
      ],
    },
  },
};

export default config;
