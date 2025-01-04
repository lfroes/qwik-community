export const GET_POSTS = `
  query GetPosts($options: PageQueryOptions) {
    posts(options: $options) {
      data {
        id
        title
        body
      }
      meta {
        totalCount
      }
    }
  }
`;

export const GET_POST = `
    query GetPost($id: ID!) {
      post(id: $id) {
        id
        title
        body
        user {
          username
        }
      }
    }
`;
