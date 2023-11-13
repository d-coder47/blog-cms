import { request, gql } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = async () => {
  const query = gql`
    query SelectPost {
      postsConnection {
        edges {
          node {
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
            author {
              id
              name
              bio
              photo {
                url
              }
            }
          }
        }
      }
    }
  `;

  const results = await request(graphqlAPI, query);
  return results.postsConnection.edges;
};
