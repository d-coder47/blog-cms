import { Category } from "@/interfaces";
import { request, gql } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = async () => {
  const query = gql`
    query SelectPosts {
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

export const getRecentPosts = async () => {
  const query = gql`
    query GetPostDetails() {
      posts(
				orderBy: createdAt_ASC
				last: 3
			) {
				slug
				title
				createdAt
				featuredImage {
					url
				}
			}			
    }
  `;

  const result = await request(graphqlAPI, query);
  return result.posts;
};

export const getSimilarPosts = async (categories: Category[], slug: string) => {
  const query = gql`
    query GetPostDetails($slug: String!, $categories: [String!]) {
      posts(
        where: {
          slug_not: $slug
          AND: { categories_some: { slug_in: $categories } }
        }
        last: 3
      ) {
        slug
        title
        createdAt
        featuredImage {
          url
        }
      }
    }
  `;

  const results = await request(graphqlAPI, query, { categories, slug });
  return results.posts;
};

export const getCategories = async () => {
  const query = gql`
    query GetCategories() {
      categories {
				name
				slug
			}		
    }
  `;

  const results = await request(graphqlAPI, query);
  return results.categories;
};

export const getPostDetails = async (slug: string) => {
  const query = gql`
    query GetPostDetail($slug: String!) {
      post(where: { slug: $slug }) {
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
        content {
          raw
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });
  return result.post;
};
