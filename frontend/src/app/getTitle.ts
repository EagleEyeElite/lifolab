import { ApolloClient, gql } from "@apollo/client";
import {GetPostQuery} from "@/generated/graphql";

const GET_POST = gql`
    query GetPost {
        posts(first: 1) {
            edges {
                node {
                    id
                    title
                }
            }
        }
    }
`;

export async function getPostTitle(client: ApolloClient<any>) {
    try {
        const { data } = await client.query<GetPostQuery>({
            query: GET_POST,
        });
        return data?.posts?.edges?.[0]?.node?.title || "Default Title";
    } catch (error) {
        console.error("Error fetching post title:", error);
        return "Default Title";
    }
}
