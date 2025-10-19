const { loadEnvFiles } = require('./src/loadEnv');

loadEnvFiles();

module.exports = {
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
