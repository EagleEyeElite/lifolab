import * as dotenvSafe from 'dotenv-safe';

dotenvSafe.config({
    path: '../.env',
    sample: '../.env.example',
});

export default {
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
    documents: '**/*.{gql,graphql}',
};
